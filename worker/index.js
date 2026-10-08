// passioncode.ai — the Worker in front of the static pages (docs/DEPLOYMENT.md).
// Canonical host, always-current versions and downloads, and the commercial enquiry intake.
import policyFile from '../releases/products.json' with { type: 'json' }
import bundled from '../releases/current.json' with { type: 'json' }
import { fetchSnapshot, mergeSnapshots, validSnapshot } from './releases.js'
import { liveRewriter } from './live.js'
import { buildLead, checkFormToken, consumeFormToken, deliver, findLead, formPage, formToObject, issueFormToken, issueMessage, knownFields, leadLocale, MAX_BODY_BYTES, platformSignature, retryDue, sha256, storeLead } from './leads.js'
import { M } from './messages.js'
import { LOCALES, SOURCE_LOCALE, t } from './i18n.js'

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
  const snapshot = mergeSnapshots(bundled, live, policies)
  memory = { at: now, snapshot }
  return snapshot
}

// A fetched (or pushed) snapshot becomes the stored one. A product it lacks keeps what the last
// good answer said; one it carries is taken as given, so a release withdrawn on GitHub leaves the
// site too (down to the bundled floor, never below it).
async function storeSnapshot (env, fetched, errors, { at, source, extra = [] }) {
  const previous = await env.DB.prepare('SELECT data FROM release_snapshot WHERE id = 1').first()
  const missing = new Set(Object.keys(policies).filter(key => !fetched.products?.[key]))
  const kept = previous ? Object.entries(JSON.parse(previous.data).products || {}).filter(([key]) => missing.has(key)) : []
  const merged = mergeSnapshots(mergeSnapshots(bundled, { products: Object.fromEntries(kept) }, policies), fetched, policies)
  if (!validSnapshot(merged, policies)) return { ok: false, errors }
  await env.DB.batch([
    env.DB.prepare("INSERT INTO release_snapshot (id, data, fetched_at, errors, source) VALUES (1, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data, fetched_at = excluded.fetched_at, errors = excluded.errors, source = excluded.source")
      .bind(JSON.stringify(merged), at, JSON.stringify(errors), source),
    ...extra
  ])
  memory = { at: 0, snapshot: null }
  return { ok: true, errors, snapshot: merged }
}

const versionsOf = snapshot => Object.fromEntries(Object.entries(snapshot.products).map(([k, v]) => [k, v.version]))
export const PUSH_FRESH_MS = 2 * 60 * 60 * 1000

export async function refreshReleases (env, { fetch: fetchImpl = fetch, now = () => new Date() } = {}) {
  // Without a token the Worker's shared egress addresses are rate-limited by GitHub, so while the
  // hourly job keeps pushing fresh snapshots the cron does not ask (docs/DEPLOYMENT.md).
  if (!env.GITHUB_TOKEN) {
    const last = await env.DB.prepare('SELECT fetched_at, source FROM release_snapshot WHERE id = 1').first()
    if (last?.source === 'push' && now().getTime() - Date.parse(last.fetched_at) < PUSH_FRESH_MS) {
      log('releases.refresh_skipped', { reason: 'fresh pushed snapshot', fetched_at: last.fetched_at })
      return { ok: true, skipped: true, errors: [] }
    }
  }
  const cache = {}
  const { results = [] } = await env.DB.prepare('SELECT repository, etag, body FROM release_cache').all()
  for (const r of results) cache[r.repository] = { etag: r.etag, body: r.body }
  const { snapshot, errors, cache: next } = await fetchSnapshot({ policies, fetch: fetchImpl, token: env.GITHUB_TOKEN, cache, now })
  // Nothing answered (the anonymous 403 case): the stored snapshot stays as it was, with its own
  // time, so /api/releases never presents an old answer as a fresh one.
  if (Object.keys(snapshot.products).length === 0) {
    for (const e of errors) log('releases.product_failed', e)
    log('releases.refresh_failed', { failed: errors.length })
    return { ok: false, errors }
  }
  const at = now().toISOString()
  const extra = []
  for (const [repository, { etag, body }] of Object.entries(next)) {
    if (cache[repository]?.etag === etag && cache[repository]?.body === body) continue
    extra.push(env.DB.prepare('INSERT INTO release_cache (repository, etag, body, fetched_at) VALUES (?, ?, ?, ?) ON CONFLICT(repository) DO UPDATE SET etag = excluded.etag, body = excluded.body, fetched_at = excluded.fetched_at').bind(repository, etag, body, at))
  }
  const result = await storeSnapshot(env, snapshot, errors, { at, source: 'cron', extra })
  if (!result.ok) { log('releases.refresh_invalid', { errors }); return result }
  for (const e of errors) log('releases.product_failed', e)
  log('releases.refreshed', { versions: versionsOf(result.snapshot), failed: errors.length })
  return result
}

// The hourly GitHub Actions job (scripts/push-releases.mjs) resolves the releases with the
// Actions token and sends the snapshot here, signed like an enquiry is to the Platform:
// HMAC-SHA256(RELEASES_INGEST_SECRET, "<X-PC-Timestamp>.<body>"), within five minutes.
export const INGEST_MAX_BYTES = 512 * 1024
export async function ingestReleases (request, env, { now = () => new Date() } = {}) {
  if (!env.RELEASES_INGEST_SECRET || !env.DB) return json({ error: 'not_configured' }, 503)
  const ts = request.headers.get('x-pc-timestamp') || ''
  const signature = request.headers.get('x-pc-signature') || ''
  const raw = await readCapped(request, INGEST_MAX_BYTES)
  if (raw === null) return json({ error: 'too_large' }, 413)
  if (!/^\d{10}$/.test(ts) || Math.abs(now().getTime() / 1000 - Number(ts)) > 300) return json({ error: 'stale' }, 401)
  const expected = await platformSignature(env.RELEASES_INGEST_SECRET, ts, raw)
  if (expected.length !== signature.length || (await sha256(expected)) !== (await sha256(signature))) return json({ error: 'bad_signature' }, 401)
  let pushed
  try { pushed = JSON.parse(raw) } catch { return json({ error: 'invalid' }, 400) }
  const products = pushed?.products && typeof pushed.products === 'object' ? pushed.products : null
  if (pushed?.schema !== 'releases/1' || !products || !validSnapshot({ schema: 'releases/1', products }, policies)) return json({ error: 'invalid' }, 400)
  const errors = Array.isArray(pushed.errors) ? pushed.errors.filter(e => e && typeof e.product === 'string').slice(0, 20).map(e => ({ product: e.product, error: String(e.error || '').slice(0, 200) })) : []
  const result = await storeSnapshot(env, { schema: 'releases/1', generatedAt: pushed.generatedAt || null, products }, errors, { at: now().toISOString(), source: 'push' })
  if (!result.ok) return json({ error: 'invalid' }, 400)
  log('releases.pushed', { versions: versionsOf(result.snapshot), failed: errors.length })
  return json({ stored: true, versions: versionsOf(result.snapshot) })
}
// #endregion snapshot

// #region headers — docs: docs/DEPLOYMENT.md#security-headers
const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'X-Frame-Options': 'DENY',
  // Two years, subdomains included (api. and wiki. answer over HTTPS); no preload commitment.
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains'
}
// The site's languages other than English, each under /<locale>/ (i18n/locales.json).
const TRANSLATED = Object.keys(LOCALES).filter(l => l !== SOURCE_LOCALE)
const LOCALE_PREFIX = TRANSLATED.length ? `(?:(?:${TRANSLATED.join('|')})\\/)?` : ''
const NOT_FOUND_PAGE = new RegExp(`^\\/${LOCALE_PREFIX}404(?:\\.html|\\/)?$`)
export const MISSING_PATH = '/__not-found__/'
// An address under /<locale>/ that has no page gets that language's not-found page
// (<locale>/404.html), still 404.
export const localeOfPath = path => TRANSLATED.find(l => path === `/${l}` || path.startsWith(`/${l}/`)) || SOURCE_LOCALE
export const notFoundPath = locale => `/${locale}/404`
const BUSINESS_PAGE = new RegExp(`^\\/${LOCALE_PREFIX}business\\/?$`)

function withHeaders (response, extra = {}) {
  const out = new Response(response.body, response)
  for (const [k, v] of Object.entries({ ...SECURITY_HEADERS, ...extra })) out.headers.set(k, v)
  return out
}
const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data, null, 2), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } })
// #endregion headers

// #region intake — docs: docs/DEPLOYMENT.md#commercial-enquiries
// What the intake says to a person, in the language of the form they sent (/api/leads?lang=ru):
// worker/messages.js, translated through worker/i18n.js. `error` codes stay English: scripts
// compare them; people read `message`.
const COMMERCIAL = 'commercial@passioncode.ai'
const page = (locale, title, body, status) => new Response(`<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escape(title)} | PassionCode.ai</title><link rel="stylesheet" href="/design-system/tokens.css"><link rel="stylesheet" href="/styles.css"></head><body class="story-site"><main id="main" class="section notice-page">${body}<p><a class="button button-secondary" href="${formPage(locale)}#request">${escape(t(locale, M.back))}</a></p></main></body></html>`, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
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
  const locale = leadLocale(new URL(request.url).searchParams.get('lang'))
  // `text` is the English message (worker/messages.js); the visitor reads it in the form's
  // language, issues included (L10N-04).
  const fail = (status, error, text, rawIssues) => {
    const message = t(locale, text, { email: COMMERCIAL })
    const issues = rawIssues?.map(i => ({ path: i.path, message: issueMessage(i.message, locale) }))
    const mail = `<a href="mailto:${COMMERCIAL}">${COMMERCIAL}</a>`
    return scripted
      ? json({ error, message, issues }, status, { 'Cache-Control': 'no-store' })
      : page(locale, t(locale, M.notSentTitle), `<h1>${escape(t(locale, M.notSentHeading))}</h1><p>${escape(message)}</p>${issues?.length ? `<ul>${issues.map(i => `<li><code>${escape(i.path)}</code>: ${escape(i.message)}</li>`).join('')}</ul>` : ''}<p>${escape(t(locale, M.writeTo, { email: '\u0000' })).replace('\u0000', mail)}</p>`, status)
  }
  const thanks = id => new URL(`${formPage(locale)}thanks/${id ? `?ref=${id}` : ''}`, request.url)

  if (!env.DB || !env.FORM_TOKEN_SECRET || !env.IP_HASH_SALT) {
    log('leads.not_configured')
    return fail(503, 'unavailable', M.unavailable)
  }
  const ip = request.headers.get('cf-connecting-ip') || ''
  if (env.LEAD_LIMITER) {
    const { success } = await env.LEAD_LIMITER.limit({ key: `lead:${ip}` })
    if (!success) return fail(429, 'rate_limited', M.rateLimited)
  }
  const raw = await readCapped(request, MAX_BODY_BYTES)
  if (raw === null) return fail(413, 'too_large', M.tooLarge)

  let input
  try { input = scripted ? knownFields(JSON.parse(raw)) : formToObject(new URLSearchParams(raw)) } catch { return fail(400, 'invalid', M.invalidBody) }
  // A field people never see; anything in it is a bot filling every input. Counted in the logs
  // so a rise (or a browser that autofills it) shows up.
  if (input.pc_hp) { log('leads.honeypot'); return scripted ? json({ id: crypto.randomUUID(), status: 'received' }, 201) : Response.redirect(thanks(), 303) }
  const token = await checkFormToken(env.FORM_TOKEN_SECRET, input.form_token)
  if (token !== 'ok') {
    log('leads.token_refused', { reason: token })
    return fail(token === 'too_fast' ? 429 : 400, 'form_expired', token === 'too_fast' ? M.tooFast : M.formExpired)
  }

  const { ok, lead, issues } = buildLead(input, {
    newId: () => crypto.randomUUID(),
    now: new Date(),
    referrer: request.headers.get('referer') || '',
    ipHash: await sha256(`${env.IP_HASH_SALT}:${ip}`),
    country: request.cf?.country || '',
    userAgent: request.headers.get('user-agent') || '',
    locale
  })
  if (!ok) return fail(400, 'invalid', M.invalid, issues)

  let stored
  try {
    // A resend of a request that already arrived is recognised before the token is spent, so a
    // browser that lost the first answer gets the truth instead of "form used".
    stored = await findLead(env.DB, lead)
    if (!stored) {
      if (!(await consumeFormToken(env.DB, input.form_token))) {
        log('leads.token_refused', { reason: 'used' })
        return fail(409, 'form_used', M.formUsed)
      }
      stored = await storeLead(env.DB, lead)
    }
  } catch (error) {
    log('leads.store_failed', { id: lead.id, error: String(error.message || error) })
    return fail(503, 'unavailable', M.storeFailed)
  }
  if (stored === 'conflict') return fail(409, 'conflict', M.conflict)
  log('leads.received', { id: lead.id, stored })
  if (stored === 'stored') ctx.waitUntil(deliver(env, lead.id).then(r => log('leads.delivered', { id: lead.id, ...r })).catch(e => log('leads.deliver_failed', { id: lead.id, error: String(e.message || e) })))
  return scripted
    ? json({ id: lead.id, status: stored === 'duplicate' ? 'duplicate' : 'received', estimate: lead.estimate ?? null }, stored === 'duplicate' ? 200 : 201, { 'Cache-Control': 'no-store' })
    : Response.redirect(thanks(lead.id), 303)
}
// #endregion intake

const DOWNLOAD = /^\/(fabric|switchboard|inbox|dashboards|observatory)\/download\/([a-z]+)\/?$/

export default {
  async fetch (request, env, ctx) {
    const url = new URL(request.url)
    // One canonical origin, encrypted: http:// and www. both go to https://passioncode.ai in one
    // hop, so the /business/ form can never post personal data in cleartext.
    if (url.hostname === 'www.passioncode.ai' || url.protocol === 'http:') {
      if (url.hostname === 'www.passioncode.ai') url.hostname = 'passioncode.ai'
      url.protocol = 'https:'
      return Response.redirect(url, 301)
    }

    const download = DOWNLOAD.exec(url.pathname)
    if (download) {
      const snapshot = await currentSnapshot(env)
      const asset = snapshot.products[download[1]]?.assets?.[download[2]]
      if (asset) return new Response(null, { status: 302, headers: { Location: asset.url, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
    }

    if (url.pathname === '/api/releases/ingest') {
      if (request.method !== 'POST') return withHeaders(json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' }))
      return withHeaders(await ingestReleases(request, env))
    }

    if (url.pathname === '/api/releases' || url.pathname === '/api/releases/') {
      if (request.method !== 'GET' && request.method !== 'HEAD') return withHeaders(json({ error: 'method_not_allowed' }, 405, { Allow: 'GET, HEAD' }))
      const snapshot = await currentSnapshot(env)
      return withHeaders(json(snapshot, 200, { 'Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*' }))
    }

    if (url.pathname === '/api/leads' || url.pathname === '/api/leads/') {
      if (request.method !== 'POST') return withHeaders(json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' }))
      if (request.headers.get('origin') && request.headers.get('origin') !== url.origin) return withHeaders(json({ error: 'forbidden_origin' }, 403))
      return withHeaders(await intake(request, env, ctx))
    }

    // Conditional headers never reach the assets for a page: the stored file's ETag does not
    // change when a release does, so a 304 would keep an old version in the browser.
    const conditional = new Headers(request.headers)
    const ifNoneMatch = conditional.get('if-none-match')
    conditional.delete('if-none-match')
    conditional.delete('if-modified-since')
    // The not-found page is a file (404.html), so the assets would serve /404 and /404.html as an
    // ordinary page with 200; ask for a path that cannot exist instead, which answers 404 with it.
    const assetRequest = NOT_FOUND_PAGE.test(url.pathname)
      ? new Request(new URL(MISSING_PATH, url), { method: request.method, headers: conditional })
      : new Request(request, { headers: conditional })
    let response = await env.ASSETS.fetch(assetRequest)
    const pathLocale = localeOfPath(url.pathname)
    if (response.status === 404 && pathLocale !== SOURCE_LOCALE) {
      const own = await env.ASSETS.fetch(new Request(new URL(notFoundPath(pathLocale), url), { method: request.method, headers: conditional }))
      if (own.ok) response = new Response(own.body, { status: 404, headers: own.headers })
    }
    if (!(response.headers.get('content-type') || '').includes('text/html')) {
      const asset = ifNoneMatch ? await env.ASSETS.fetch(request) : response
      // Plain-text assets (llms.txt, robots.txt) carry non-ASCII text: name the charset.
      const type = asset.headers.get('content-type') || ''
      return withHeaders(asset, type.startsWith('text/plain') && !/charset/i.test(type) ? { 'Content-Type': 'text/plain; charset=utf-8' } : {})
    }
    const snapshot = await currentSnapshot(env)
    let rewriter = liveRewriter(HTMLRewriter, snapshot)
    const business = BUSINESS_PAGE.test(url.pathname)
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
