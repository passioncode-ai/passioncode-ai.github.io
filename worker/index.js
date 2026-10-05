// passioncode.ai — the Worker in front of the static pages (docs/DEPLOYMENT.md).
// Canonical host, always-current versions and downloads, and the commercial enquiry intake.
import policyFile from '../releases/products.json' with { type: 'json' }
import bundled from '../releases/current.json' with { type: 'json' }
import { fetchSnapshot, mergeSnapshots, validSnapshot } from './releases.js'
import { liveRewriter } from './live.js'
import { buildLead, checkFormToken, consumeFormToken, deliver, findLead, formToObject, issueFormToken, knownFields, MAX_BODY_BYTES, retryDue, sha256, storeLead } from './leads.js'

const policies = policyFile.products
const SNAPSHOT_TTL_MS = 60_000
let memory = { at: 0, snapshot: null }

const log = (event, fields = {}) => console.log(JSON.stringify({ event, ...fields }))

// #region snapshot — docs: docs/DEPLOYMENT.md#always-current-versions
// Memory (60 s per isolate) → D1 (the cron's last answer) → the snapshot bundled at build.
export async function currentSnapshot (env, now = Date.now()) {
  if (memory.snapshot && now - memory.at < SNAPSHOT_TTL_MS) return memory.snapshot
  let live = null
  if (env.DB) {
    try {
      const row = await env.DB.prepare('SELECT data FROM release_snapshot WHERE id = 1').first()
      if (row) {
        const parsed = JSON.parse(row.data)
        if (validSnapshot(parsed, policies)) live = parsed
        else log('releases.snapshot_invalid')
      }
    } catch (error) { log('releases.snapshot_read_failed', { error: String(error.message || error) }) }
  }
  const snapshot = mergeSnapshots(bundled, live)
  memory = { at: now, snapshot }
  return snapshot
}

export async function refreshReleases (env, { fetch: fetchImpl = fetch, now = () => new Date() } = {}) {
  const cache = {}
  const { results = [] } = await env.DB.prepare('SELECT repository, etag, body FROM release_cache').all()
  for (const r of results) cache[r.repository] = { etag: r.etag, body: r.body }
  const previous = await env.DB.prepare('SELECT data FROM release_snapshot WHERE id = 1').first()
  const { snapshot, errors, cache: next } = await fetchSnapshot({ policies, fetch: fetchImpl, token: env.GITHUB_TOKEN, cache, now })
  // A product that failed this time keeps what the last good answer said. One that answered
  // is taken as answered, so a release withdrawn on GitHub leaves the site too (down to the
  // bundled floor, never below it).
  const failed = new Set(errors.map(e => e.product))
  const kept = previous ? Object.entries(JSON.parse(previous.data).products || {}).filter(([key]) => failed.has(key)) : []
  const merged = mergeSnapshots(mergeSnapshots(bundled, { products: Object.fromEntries(kept) }), snapshot)
  if (!validSnapshot(merged, policies)) { log('releases.refresh_invalid', { errors }); return { ok: false, errors } }
  const at = now().toISOString()
  const statements = [env.DB.prepare('INSERT INTO release_snapshot (id, data, fetched_at, errors) VALUES (1, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data, fetched_at = excluded.fetched_at, errors = excluded.errors')
    .bind(JSON.stringify(merged), at, JSON.stringify(errors))]
  for (const [repository, { etag, body }] of Object.entries(next)) {
    if (cache[repository]?.etag === etag && cache[repository]?.body === body) continue
    statements.push(env.DB.prepare('INSERT INTO release_cache (repository, etag, body, fetched_at) VALUES (?, ?, ?, ?) ON CONFLICT(repository) DO UPDATE SET etag = excluded.etag, body = excluded.body, fetched_at = excluded.fetched_at').bind(repository, etag, body, at))
  }
  await env.DB.batch(statements)
  memory = { at: 0, snapshot: null }
  for (const e of errors) log('releases.product_failed', e)
  log('releases.refreshed', { versions: Object.fromEntries(Object.entries(merged.products).map(([k, v]) => [k, v.version])), failed: errors.length })
  return { ok: true, errors, snapshot: merged }
}
// #endregion snapshot

// #region headers — docs: docs/DEPLOYMENT.md#security-headers
const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'X-Frame-Options': 'DENY'
}
function withHeaders (response, extra = {}) {
  const out = new Response(response.body, response)
  for (const [k, v] of Object.entries({ ...SECURITY_HEADERS, ...extra })) out.headers.set(k, v)
  return out
}
const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data, null, 2), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } })
// #endregion headers

// #region intake — docs: docs/DEPLOYMENT.md#commercial-enquiries
const page = (title, body, status) => new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} | PassionCode.ai</title><link rel="stylesheet" href="/design-system/tokens.css"><link rel="stylesheet" href="/styles.css"></head><body class="story-site"><main id="main" class="section notice-page">${body}<p><a class="button button-secondary" href="/business/#request">Back to the form</a></p></main></body></html>`, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
const escape = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

// The body, read with a byte counter: a chunked request without Content-Length cannot make
// the Worker buffer more than `limit` bytes. null when it is longer.
async function readCapped (request, limit) {
  if (Number(request.headers.get('content-length') || 0) > limit) return null
  if (!request.body) return ''
  const reader = request.body.getReader()
  const chunks = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > limit) { await reader.cancel(); return null }
    chunks.push(value)
  }
  const bytes = new Uint8Array(size)
  let at = 0
  for (const c of chunks) { bytes.set(c, at); at += c.byteLength }
  return new TextDecoder().decode(bytes)
}

async function intake (request, env, ctx) {
  const scripted = (request.headers.get('content-type') || '').includes('application/json')
  const fail = (status, error, message, issues) => scripted
    ? json({ error, message, issues }, status, { 'Cache-Control': 'no-store' })
    : page('Request not sent', `<h1>Your request was not sent</h1><p>${escape(message)}</p>${issues?.length ? `<ul>${issues.map(i => `<li><code>${escape(i.path)}</code>: ${escape(i.message)}</li>`).join('')}</ul>` : ''}<p>You can also write to <a href="mailto:commercial@passioncode.ai">commercial@passioncode.ai</a>.</p>`, status)

  if (!env.DB || !env.FORM_TOKEN_SECRET || !env.IP_HASH_SALT) {
    log('leads.not_configured')
    return fail(503, 'unavailable', 'The form is not accepting requests right now. Please write to commercial@passioncode.ai instead.')
  }
  const ip = request.headers.get('cf-connecting-ip') || ''
  if (env.LEAD_LIMITER) {
    const { success } = await env.LEAD_LIMITER.limit({ key: `lead:${ip}` })
    if (!success) return fail(429, 'rate_limited', 'Too many requests from your network in the last minute. Please wait a minute and try again.')
  }
  const raw = await readCapped(request, MAX_BODY_BYTES)
  if (raw === null) return fail(413, 'too_large', 'The request is too long.')

  let input
  try { input = scripted ? knownFields(JSON.parse(raw)) : formToObject(new URLSearchParams(raw)) } catch { return fail(400, 'invalid', 'The request could not be read.') }
  // A field people never see; anything in it is a bot filling every input. Counted in the logs
  // so a rise (or a browser that autofills it) shows up.
  if (input.pc_hp) { log('leads.honeypot'); return scripted ? json({ id: crypto.randomUUID(), status: 'received' }, 201) : Response.redirect(new URL('/business/thanks/', request.url), 303) }
  const token = await checkFormToken(env.FORM_TOKEN_SECRET, input.form_token)
  if (token !== 'ok') {
    log('leads.token_refused', { reason: token })
    return fail(token === 'too_fast' ? 429 : 400, 'form_expired', token === 'too_fast' ? 'That was faster than a person can fill the form. Please check your answers and send it again.' : 'The form has expired. Reload the page and send it again — your answers are kept in the browser.')
  }

  const { ok, lead, issues } = buildLead(input, {
    newId: () => crypto.randomUUID(),
    now: new Date(),
    referrer: request.headers.get('referer') || '',
    ipHash: await sha256(`${env.IP_HASH_SALT}:${ip}`),
    country: request.cf?.country || '',
    userAgent: request.headers.get('user-agent') || ''
  })
  if (!ok) return fail(400, 'invalid', 'Some answers need another look.', issues)

  let stored
  try {
    // A resend of a request that already arrived is recognised before the token is spent, so a
    // browser that lost the first answer gets the truth instead of "form used".
    stored = await findLead(env.DB, lead)
    if (!stored) {
      if (!(await consumeFormToken(env.DB, input.form_token))) {
        log('leads.token_refused', { reason: 'used' })
        return fail(409, 'form_used', 'This form was already sent once. Reload the page to send another request — your answers are kept in the browser.')
      }
      stored = await storeLead(env.DB, lead)
    }
  } catch (error) {
    log('leads.store_failed', { id: lead.id, error: String(error.message || error) })
    return fail(503, 'unavailable', 'We could not save your request. Nothing was sent. Please try again in a minute or write to commercial@passioncode.ai.')
  }
  if (stored === 'conflict') return fail(409, 'conflict', 'This request was already sent with different answers. Reload the page to start a new one.')
  log('leads.received', { id: lead.id, stored })
  if (stored === 'stored') ctx.waitUntil(deliver(env, lead.id).then(r => log('leads.delivered', { id: lead.id, ...r })).catch(e => log('leads.deliver_failed', { id: lead.id, error: String(e.message || e) })))
  return scripted
    ? json({ id: lead.id, status: stored === 'duplicate' ? 'duplicate' : 'received', estimate: lead.estimate ?? null }, stored === 'duplicate' ? 200 : 201, { 'Cache-Control': 'no-store' })
    : Response.redirect(new URL(`/business/thanks/?ref=${lead.id}`, request.url), 303)
}
// #endregion intake

const DOWNLOAD = /^\/(fabric|switchboard|inbox|dashboards|observatory)\/download\/([a-z]+)\/?$/

export default {
  async fetch (request, env, ctx) {
    const url = new URL(request.url)
    if (url.hostname === 'www.passioncode.ai') {
      url.hostname = 'passioncode.ai'
      return Response.redirect(url, 301)
    }

    const download = DOWNLOAD.exec(url.pathname)
    if (download) {
      const snapshot = await currentSnapshot(env)
      const asset = snapshot.products[download[1]]?.assets?.[download[2]]
      if (asset) return new Response(null, { status: 302, headers: { Location: asset.url, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
    }

    if (url.pathname === '/api/releases' || url.pathname === '/api/releases/') {
      if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'method_not_allowed' }, 405, { Allow: 'GET, HEAD' })
      const snapshot = await currentSnapshot(env)
      return withHeaders(json(snapshot, 200, { 'Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*' }))
    }

    if (url.pathname === '/api/leads' || url.pathname === '/api/leads/') {
      if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' })
      if (request.headers.get('origin') && request.headers.get('origin') !== url.origin) return json({ error: 'forbidden_origin' }, 403)
      return withHeaders(await intake(request, env, ctx))
    }

    // Conditional headers never reach the assets for a page: the stored file's ETag does not
    // change when a release does, so a 304 would keep an old version in the browser.
    const conditional = new Headers(request.headers)
    const ifNoneMatch = conditional.get('if-none-match')
    conditional.delete('if-none-match')
    conditional.delete('if-modified-since')
    const response = await env.ASSETS.fetch(new Request(request, { headers: conditional }))
    if (!(response.headers.get('content-type') || '').includes('text/html')) {
      return ifNoneMatch ? env.ASSETS.fetch(request) : response
    }
    const snapshot = await currentSnapshot(env)
    let rewriter = liveRewriter(HTMLRewriter, snapshot)
    const business = url.pathname === '/business/' || url.pathname === '/business'
    if (business && env.FORM_TOKEN_SECRET) {
      const token = await issueFormToken(env.FORM_TOKEN_SECRET)
      rewriter = rewriter.on('input[name="form_token"]', { element (el) { el.setAttribute('value', token) } })
    }
    if (business) {
      const out = withHeaders(rewriter.transform(response), { 'Cache-Control': 'no-store' })
      out.headers.delete('etag')
      out.headers.delete('last-modified')
      return out
    }
    // The page's identity is the stored file plus the release snapshot it is rewritten with.
    const etag = `W/"${(await sha256(`${response.headers.get('etag') || ''}|${JSON.stringify(snapshot.products)}`)).slice(0, 32)}"`
    if (ifNoneMatch && ifNoneMatch.split(/\s*,\s*/).includes(etag)) {
      return withHeaders(new Response(null, { status: 304, headers: { ETag: etag, 'Cache-Control': 'public, max-age=0, must-revalidate' } }))
    }
    const out = withHeaders(rewriter.transform(response), { ETag: etag, 'Cache-Control': 'public, max-age=0, must-revalidate' })
    out.headers.delete('last-modified')
    return out
  },

  async scheduled (event, env, ctx) {
    if (!env.DB) return log('cron.no_db')
    ctx.waitUntil((async () => {
      try { await refreshReleases(env) } catch (error) { log('releases.refresh_failed', { error: String(error.message || error) }) }
      try {
        const outcomes = await retryDue(env)
        if (outcomes.length) log('leads.retried', { count: outcomes.length, outcomes })
      } catch (error) { log('leads.retry_failed', { error: String(error.message || error) }) }
    })())
  }
}
