// The Worker's unit tests: config, canonical host, live downloads, /api/releases, the
// enquiry intake end to end against a real SQLite with the D1 migrations, delivery and
// retries. The HTMLRewriter path is exercised for real by scripts/check-local-worker.mjs.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import worker, { currentSnapshot, ingestReleases, refreshReleases } from '../worker/index.js'
import { pushReleases } from './push-releases.mjs'
import { buildLead, checkFormToken, deliver, formToObject, issueFormToken, knownFields, platformSignature, RECEIPTS_PER_HOUR, retryDue, storeLead } from '../worker/leads.js'
import bundled from '../releases/current.json' with { type: 'json' }
import { d1 } from './d1-shim.mjs'

const config = JSON.parse(readFileSync(new URL('../wrangler.json', import.meta.url)))

// Minimal stand-in: the edge rewriter is tested in workerd; here only that HTML passes through it.
globalThis.HTMLRewriter = class { on () { return this } transform (r) { return r } }

const ctx = () => { const waits = []; return { waits, waitUntil: p => waits.push(p), done: () => Promise.all(waits) } }
const assets = { fetch: async request => new Response(`asset ${new URL(request.url).pathname}`, { status: new URL(request.url).pathname === '/missing' ? 404 : 200, headers: { 'Content-Type': new URL(request.url).pathname.endsWith('/') ? 'text/html; charset=utf-8' : 'text/plain', ETag: '"asset-1"', ...(request.headers.get('if-none-match') ? { 'X-Saw-Conditional': '1' } : {}) } }) }
const mailer = () => { const sent = []; return { sent, send: async m => { sent.push(m); return { messageId: `m${sent.length}` } } } }
const baseEnv = (extra = {}) => ({ ASSETS: assets, DB: d1(), EMAIL: mailer(), FORM_TOKEN_SECRET: 'form-secret', IP_HASH_SALT: 'salt', LEAD_NOTIFY_TO: 'commercial@passioncode.ai', ...extra })

test('wrangler config: no account id, assets behind the Worker, D1, mail, limiter, cron', () => {
  assert.equal(config.name, 'passioncode-ai')
  assert.equal(config.account_id, undefined, 'wrangler.json carries no account id; deploy with CLOUDFLARE_ACCOUNT_ID')
  assert.equal(config.assets.directory, './dist')
  assert.equal(config.assets.run_worker_first, true)
  assert.deepEqual(config.routes, [{ pattern: 'passioncode.ai', custom_domain: true }, { pattern: 'www.passioncode.ai', custom_domain: true }])
  assert.equal(config.d1_databases[0].binding, 'DB')
  assert.equal(config.d1_databases[0].migrations_dir, 'migrations')
  assert.match(config.d1_databases[0].database_id, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, 'the D1 id is set (docs/DEPLOYMENT.md#storage)')
  assert.notEqual(config.d1_databases[0].database_id, '00000000-0000-0000-0000-000000000000', 'not the placeholder')
  assert.deepEqual(config.send_email, [{ name: 'EMAIL' }])
  assert.equal(config.ratelimits[0].name, 'LEAD_LIMITER')
  assert.deepEqual(config.triggers.crons, ['*/15 * * * *'])
  for (const key of ['FORM_TOKEN_SECRET', 'IP_HASH_SALT', 'PLATFORM_INTAKE_SECRET', 'GITHUB_TOKEN']) assert.equal(config.vars[key], undefined, `${key} is a secret, never a var`)
})

test('www redirects to the apex with path and query', async () => {
  const r = await worker.fetch(new Request('https://www.passioncode.ai/switchboard/?q=1'), baseEnv(), ctx())
  assert.equal(r.status, 301)
  assert.equal(r.headers.get('location'), 'https://passioncode.ai/switchboard/?q=1')
})

test('downloads redirect to the current release asset, ignore the query, and fall through when unknown', async () => {
  const env = baseEnv({ DB: undefined })
  const cases = [['switchboard', 'macos'], ['switchboard', 'windows'], ['fabric', 'macos'], ['inbox', 'macos'], ['dashboards', 'macos'], ['observatory', 'macos'], ['observatory', 'wheel']]
  for (const [product, platform] of cases) {
    for (const suffix of ['', '/', '?next=https://example.com']) {
      const r = await worker.fetch(new Request(`https://passioncode.ai/${product}/download/${platform}${suffix}`), env, ctx())
      assert.equal(r.status, 302, `${product}/${platform}${suffix}`)
      assert.equal(r.headers.get('location'), bundled.products[product].assets[platform].url)
      assert.equal(r.headers.get('cache-control'), 'no-store')
      assert.equal(r.headers.get('x-robots-tag'), 'noindex')
    }
  }
  for (const path of ['/switchboard/download/linux', '/fabric/download/windows', '/inbox/download/macos/extra', '/adapter/download/macos']) {
    const r = await worker.fetch(new Request(`https://passioncode.ai${path}`), env, ctx())
    assert.equal(await r.text(), `asset ${path}`)
  }
})

test('a newer snapshot in D1 moves the download; an older or invalid one does not', async () => {
  const env = baseEnv()
  const newer = structuredClone(bundled)
  const sb = newer.products.switchboard
  sb.version = '99.0.0'; sb.tag = 'v99.0.0'
  sb.assets.macos.url = 'https://github.com/passioncode-ai/fabric-switchboard/releases/download/v99.0.0/Fabric-Switchboard-99.0.0-macos-universal.zip'
  await env.DB.prepare('INSERT INTO release_snapshot (id, data, fetched_at) VALUES (1, ?, ?)').bind(JSON.stringify(newer), 'now').run()
  assert.equal((await currentSnapshot(env, Date.now() + 1e9)).products.switchboard.version, '99.0.0')
  const r = await worker.fetch(new Request('https://passioncode.ai/switchboard/download/macos'), env, ctx())
  assert.equal(r.headers.get('location'), sb.assets.macos.url)

  const evil = structuredClone(newer); evil.products.switchboard.assets.macos.url = 'https://example.com/x.zip'
  await env.DB.prepare('UPDATE release_snapshot SET data = ? WHERE id = 1').bind(JSON.stringify(evil)).run()
  assert.equal((await currentSnapshot(env, Date.now() + 2e9)).products.switchboard.version, bundled.products.switchboard.version, 'an invalid snapshot is ignored')

  const older = structuredClone(bundled); older.products.switchboard.version = '0.0.1'
  await env.DB.prepare('UPDATE release_snapshot SET data = ? WHERE id = 1').bind(JSON.stringify(older)).run()
  assert.equal((await currentSnapshot(env, Date.now() + 3e9)).products.switchboard.version, bundled.products.switchboard.version, 'never below the bundled floor')
})

test('/api/releases answers the snapshot, cacheable and cross-origin readable', async () => {
  const r = await worker.fetch(new Request('https://passioncode.ai/api/releases'), baseEnv({ DB: undefined }), ctx())
  assert.equal(r.status, 200)
  assert.equal(r.headers.get('access-control-allow-origin'), '*')
  const body = await r.json()
  assert.equal(body.schema, 'releases/1')
  assert.deepEqual(Object.keys(body.products).sort(), ['adapter', 'dashboards', 'fabric', 'inbox', 'launcher', 'observatory', 'switchboard'])
  assert.equal((await worker.fetch(new Request('https://passioncode.ai/api/releases', { method: 'POST' }), baseEnv(), ctx())).status, 405)
})

test('HTML responses carry the security headers; other assets are untouched', async () => {
  const html = await worker.fetch(new Request('https://passioncode.ai/start/'), baseEnv({ DB: undefined }), ctx())
  assert.match(html.headers.get('content-security-policy'), /script-src 'self'/)
  assert.equal(html.headers.get('x-frame-options'), 'DENY')
  const css = await worker.fetch(new Request('https://passioncode.ai/styles.css'), baseEnv({ DB: undefined }), ctx())
  assert.equal(css.headers.get('content-security-policy'), null)
})

test('the cron refresh stores the snapshot and ETags, and keeps a product that failed', async () => {
  const env = baseEnv()
  const calls = []
  const fetchImpl = async (url, init) => {
    calls.push([url, init?.headers?.['If-None-Match']])
    if (url.includes('registry.npmjs.org')) return new Response(JSON.stringify({ version: url.includes('adapter') ? bundled.products.adapter.version : bundled.products.launcher.version }))
    if (url.includes('fabric-inbox')) return new Response('down', { status: 502 })
    const repo = url.match(/repos\/(.+)\/releases/)[1]
    const entry = Object.values(bundled.products).find(p => p.repository === repo)
    const assetsList = Object.values(entry.assets).map(a => ({ name: a.name, browser_download_url: a.url, digest: `sha256:${a.sha256}`, state: 'uploaded', size: a.size }))
    return new Response(JSON.stringify([{ tag_name: entry.tag, prerelease: entry.prerelease, draft: false, published_at: entry.publishedAt, assets: assetsList }]), { headers: { etag: `"${repo}"` } })
  }
  const first = await refreshReleases(env, { fetch: fetchImpl })
  assert.equal(first.ok, true)
  assert.deepEqual(first.errors.map(e => e.product), ['inbox'])
  assert.equal(first.snapshot.products.inbox.version, bundled.products.inbox.version, 'a failed product keeps the last good version')
  const row = await env.DB.prepare('SELECT data, errors FROM release_snapshot WHERE id = 1').first()
  assert.equal(JSON.parse(row.errors)[0].product, 'inbox')
  assert.ok((await env.DB.prepare('SELECT COUNT(*) AS n FROM release_cache').first()).n >= 5)
  // A withdrawn release: D1 says 99.0.0, GitHub now answers the bundled version — the site follows GitHub.
  const withdrawn = structuredClone(first.snapshot); withdrawn.products.dashboards.version = '99.0.0'; withdrawn.products.dashboards.tag = 'v99.0.0'
  await env.DB.prepare('UPDATE release_snapshot SET data = ? WHERE id = 1').bind(JSON.stringify(withdrawn)).run()
  const after = await refreshReleases(env, { fetch: fetchImpl })
  assert.equal(after.snapshot.products.dashboards.version, bundled.products.dashboards.version, 'a withdrawn release leaves the site')
  calls.length = 0
  await refreshReleases(env, { fetch: fetchImpl })
  assert.ok(calls.some(([u, etag]) => u.includes('fabric-switchboard') && etag === '"passioncode-ai/fabric-switchboard"'), 'the second run sends If-None-Match')
})

// ---- enquiries -------------------------------------------------------------------------

const answers = () => ({
  goals: ['automate_operations', 'custom_agents'],
  company: { name: 'Example Studio', website: 'example.com', industry: 'mobile_publishing', industryOther: '', size: '11_50', agentUsers: '12' },
  processes: { areas: ['release_publishing', 'marketing_creatives', 'support_inbox'], other: '', currentState: 'manual', tools: ['claude_code'], hoursPerWeek: '40', hourlyCost: '50', currency: 'USD' },
  setup: { mode: 'guided', hosting: 'own_cloud', constraints: ['eu_residency'] },
  budget: { monthly: '5k_20k', setup: '5k_20k', timeline: 'this_quarter' },
  contact: { name: 'Alex Example', role: 'COO', email: 'Alex@Example.com', phone: '', telegram: '', message: 'We publish 12 apps.' },
  consent: { privacy: true, marketing: false }
})
const oldToken = async (secret = 'form-secret') => issueFormToken(secret, Date.now() - 60_000)
const post = async (env, body, { type = 'application/json', c = ctx(), headers = {} } = {}) => {
  const r = await worker.fetch(new Request('https://passioncode.ai/api/leads', { method: 'POST', headers: { 'content-type': type, 'cf-connecting-ip': '203.0.113.7', origin: 'https://passioncode.ai', ...headers }, body }), env, c)
  await c.done()
  return r
}

test('form token: too fast, expired, forged and valid', async () => {
  const now = Date.now()
  assert.equal(await checkFormToken('s', await issueFormToken('s', now - 1000), now), 'too_fast')
  assert.equal(await checkFormToken('s', await issueFormToken('s', now - 25 * 3600e3), now), 'expired')
  assert.equal(await checkFormToken('s', await issueFormToken('other', now - 60e3), now), 'invalid')
  assert.equal(await checkFormToken('s', 'garbage', now), 'missing')
  assert.equal(await checkFormToken('s', await issueFormToken('s', now - 60e3), now), 'ok')
})

test('validation names every problem and recomputes the estimate server-side', () => {
  const context = { newId: () => '00000000-0000-4000-8000-000000000009', now: new Date('2026-10-05T12:00:00Z'), ipHash: 'a'.repeat(64), country: 'PL', userAgent: 'test' }
  const good = buildLead({ ...answers(), estimate: { monthlySavings: [1e9, 1e9] } }, context)
  assert.equal(good.ok, true, JSON.stringify(good.issues))
  assert.equal(good.lead.contact.email, 'alex@example.com')
  assert.equal(good.lead.company.website, 'https://example.com/')
  assert.deepEqual(good.lead.estimate.hoursSavedPerMonth, [43, 87])
  assert.deepEqual(good.lead.estimate.monthlySavings, [2150, 4350], 'the client number is ignored')
  const bad = buildLead({ goals: ['x'], company: { industry: 'nope' }, contact: { email: 'no' }, consent: {} }, context)
  assert.equal(bad.ok, false)
  const paths = bad.issues.map(i => i.path)
  for (const p of ['goals', 'company.name', 'company.industry', 'contact.email', 'consent.privacy', 'budget.monthly']) assert.ok(paths.includes(p), `${p} reported`)
})

test('a no-JavaScript form submission maps dotted names and repeated checkboxes', () => {
  const o = formToObject(new URLSearchParams('goals=custom_agents&goals=team_onboarding&company.name=X&processes.areas=sales_crm&consent.privacy=yes'))
  assert.deepEqual(o.goals, ['custom_agents', 'team_onboarding'])
  assert.equal(o.company.name, 'X')
  assert.deepEqual(o.processes.areas, ['sales_crm'])
})

test('intake: stored first, then notification, receipt and (when connected) a signed forward', async () => {
  const forwarded = []
  const env = baseEnv({ PLATFORM_URL: 'https://api.example.test', PLATFORM_INTAKE_SECRET: 'intake-secret' })
  const realFetch = globalThis.fetch
  globalThis.fetch = async (url, init) => { forwarded.push({ url: String(url), init }); return new Response('{"status":"received"}', { status: 201 }) }
  try {
    const id = '11111111-1111-4111-8111-111111111111'
    const r = await post(env, JSON.stringify({ ...answers(), id, form_token: await oldToken() }))
    assert.equal(r.status, 201)
    const body = await r.json()
    assert.equal(body.id, id)
    assert.match(r.headers.get('content-security-policy'), /default-src/)
    const row = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first()
    assert.equal(row.notify_status, 'done')
    assert.equal(row.confirm_status, 'done')
    assert.equal(row.forward_status, 'done')
    const [notify, receipt] = env.EMAIL.sent
    assert.deepEqual(notify.to, ['commercial@passioncode.ai'])
    assert.equal(notify.replyTo, 'alex@example.com')
    assert.match(notify.text, /Example Studio/)
    assert.match(notify.text, /Estimate \(estimate\/1\): 43–87 h\/month/)
    assert.equal(receipt.to, 'alex@example.com')
    assert.match(receipt.text, /within two business days/)
    assert.equal(forwarded[0].url, 'https://api.example.test/v1/leads')
    const ts = forwarded[0].init.headers['X-PC-Timestamp']
    assert.equal(forwarded[0].init.headers['X-PC-Signature'], await platformSignature('intake-secret', ts, forwarded[0].init.body))
    assert.equal(JSON.parse(forwarded[0].init.body).schema, 'lead/1')

    const again = await post(env, JSON.stringify({ ...answers(), id, form_token: await oldToken() }))
    assert.equal(again.status, 200, 'the same answers again are a duplicate, not a second lead')
    assert.equal(env.EMAIL.sent.length, 2, 'a duplicate sends nothing')
    const changed = answers(); changed.company.name = 'Other'
    assert.equal((await post(env, JSON.stringify({ ...changed, id, form_token: await oldToken() }))).status, 409)
  } finally { globalThis.fetch = realFetch }
})

test('intake refuses: bad token, too fast, invalid answers, foreign origin, oversize; honeypot looks accepted', async () => {
  const env = baseEnv()
  assert.equal((await post(env, JSON.stringify({ ...answers(), form_token: 'x' }))).status, 400)
  assert.equal((await post(env, JSON.stringify({ ...answers(), form_token: await issueFormToken('form-secret') }))).status, 429)
  const invalid = await post(env, JSON.stringify({ goals: [], form_token: await oldToken() }))
  assert.equal(invalid.status, 400)
  assert.ok((await invalid.json()).issues.length > 3)
  assert.equal((await post(env, '{}', { headers: { origin: 'https://evil.example' } })).status, 403)
  assert.equal((await post(env, 'x'.repeat(40000))).status, 413)
  const trap = await post(env, JSON.stringify({ ...answers(), pc_hp: 'spam', form_token: await oldToken() }))
  assert.equal(trap.status, 201)
  assert.equal((await env.DB.prepare('SELECT COUNT(*) AS n FROM leads').first()).n, 0, 'nothing from the trap or the refusals is stored')
  assert.equal((await worker.fetch(new Request('https://passioncode.ai/api/leads'), env, ctx())).status, 405)
})

test('intake is honest when it is not configured or rate-limited', async () => {
  const off = await post(baseEnv({ FORM_TOKEN_SECRET: undefined }), JSON.stringify(answers()))
  assert.equal(off.status, 503)
  assert.match((await off.json()).message, /commercial@passioncode.ai/)
  const limited = await post(baseEnv({ LEAD_LIMITER: { limit: async () => ({ success: false }) } }), JSON.stringify(answers()))
  assert.equal(limited.status, 429)
})

test('a no-JavaScript submission is redirected to the thanks page; an invalid one gets a readable page', async () => {
  const env = baseEnv()
  const params = new URLSearchParams()
  const a = answers()
  for (const g of a.goals) params.append('goals', g)
  for (const [k, v] of Object.entries(a.company)) params.append(`company.${k}`, v)
  for (const [k, v] of Object.entries(a.processes)) for (const x of [].concat(v)) params.append(`processes.${k}`, x)
  for (const [k, v] of Object.entries(a.setup)) for (const x of [].concat(v)) params.append(`setup.${k}`, x)
  for (const [k, v] of Object.entries(a.budget)) params.append(`budget.${k}`, v)
  for (const [k, v] of Object.entries(a.contact)) params.append(`contact.${k}`, v)
  params.append('consent.privacy', 'yes')
  params.append('form_token', await oldToken())
  const r = await post(env, params.toString(), { type: 'application/x-www-form-urlencoded' })
  assert.equal(r.status, 303)
  assert.match(r.headers.get('location'), /^https:\/\/passioncode.ai\/business\/thanks\/\?ref=[0-9a-f-]{36}$/)
  const bad = await post(env, 'company.name=&form_token=' + encodeURIComponent(await oldToken()), { type: 'application/x-www-form-urlencoded' })
  assert.equal(bad.status, 400)
  assert.match(await bad.text(), /Your request was not sent/)
})

test('delivery retries with backoff, waits for an unconnected backend, and gives up loudly', async () => {
  const env = baseEnv({ EMAIL: { send: async () => { throw new Error('mail down') } } })
  const id = '22222222-2222-4222-8222-222222222222'
  const r = await post(env, JSON.stringify({ ...answers(), id, form_token: await oldToken() }))
  assert.equal(r.status, 201, 'the person is told it arrived: it is stored')
  let row = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first()
  assert.equal(row.notify_status, 'pending')
  assert.equal(row.forward_status, 'pending', 'no backend yet: the lead waits')
  assert.equal(row.forward_attempts, 0)
  assert.ok(row.next_attempt_at > row.created_at)

  env.EMAIL = mailer()
  const later = new Date(Date.now() + 3 * 3600e3)
  const outcomes = await retryDue(env, { now: later })
  assert.deepEqual(outcomes.map(o => [o.notify, o.confirm, o.forward]), [['done', 'done', 'waiting']])

  env.PLATFORM_URL = 'https://api.example.test'; env.PLATFORM_INTAKE_SECRET = 'k'
  const outcomes2 = await retryDue(env, { now: new Date(later.getTime() + 7 * 3600e3), fetch: async () => new Response('', { status: 503 }) })
  assert.equal(outcomes2[0].forward, 'retry')
  await env.DB.prepare('UPDATE leads SET forward_attempts = 12 WHERE id = ?').bind(id).run()
  await retryDue(env, { now: new Date(later.getTime() + 30 * 3600e3) })
  row = await env.DB.prepare('SELECT forward_status, forward_error FROM leads WHERE id = ?').bind(id).first()
  assert.equal(row.forward_status, 'failed')
  assert.match(row.forward_error, /gave up/)
})

test('one receipt per address a day', async () => {
  const env = baseEnv()
  await post(env, JSON.stringify({ ...answers(), id: '33333333-3333-4333-8333-333333333333', form_token: await oldToken() }))
  await post(env, JSON.stringify({ ...answers(), id: '44444444-4444-4444-8444-444444444444', form_token: await oldToken() }))
  const receipts = env.EMAIL.sent.filter(m => m.to === 'alex@example.com')
  assert.equal(receipts.length, 1)
  const second = await env.DB.prepare('SELECT confirm_status FROM leads WHERE id = ?').bind('44444444-4444-4444-8444-444444444444').first()
  assert.equal(second.confirm_status, 'skipped')
})

test('a forwarded lead leaves the buffer after 30 days; nothing stays past 24 months', async () => {
  const env = baseEnv({ PLATFORM_URL: 'https://api.example.test', PLATFORM_INTAKE_SECRET: 'k' })
  const realFetch = globalThis.fetch
  globalThis.fetch = async () => new Response('{}', { status: 201 })
  try { await post(env, JSON.stringify({ ...answers(), id: '55555555-5555-4555-8555-555555555555', form_token: await oldToken() })) } finally { globalThis.fetch = realFetch }
  await retryDue(env, { now: new Date(Date.now() + 31 * 86400e3) })
  assert.equal((await env.DB.prepare('SELECT COUNT(*) AS n FROM leads').first()).n, 0)
})

test('deliver on an unknown id is a no-op', async () => {
  assert.deepEqual(await deliver(baseEnv(), 'nope'), { missing: true })
})

// ---- regressions from the 2026-10-05 pre-deploy review -------------------------------------

test('a crafted field name cannot reach Object.prototype (form or JSON), and real leads still arrive', async () => {
  const env = baseEnv()
  await post(env, '__proto__.pc_hp=1&constructor.prototype.privacy=yes&company.__proto__.x=1', { type: 'application/x-www-form-urlencoded' })
  await post(env, '{"__proto__":{"pc_hp":"1"},"constructor":{"prototype":{"pc_hp":"1"}}}')
  assert.equal(({}).pc_hp, undefined)
  assert.equal(({}).privacy, undefined)
  assert.equal(Object.getPrototypeOf(formToObject(new URLSearchParams('company.name=x'))), null)
  assert.equal(knownFields({ company: { name: 'x', evil: 'y' }, nope: 1 }).nope, undefined)
  const r = await post(env, JSON.stringify({ ...answers(), form_token: await oldToken() }))
  assert.equal(r.status, 201)
  assert.equal((await env.DB.prepare('SELECT COUNT(*) AS n FROM leads').first()).n, 1)
  assert.equal(env.EMAIL.sent.length, 2)
})

test('line breaks never reach a single-line field or the email subject; the message keeps them', async () => {
  const env = baseEnv()
  const a = answers(); a.company.name = 'Evil\r\nBcc: victim@example.com'; a.contact.message = 'line one\nline two'
  assert.equal((await post(env, JSON.stringify({ ...a, form_token: await oldToken() }))).status, 201)
  const [notify] = env.EMAIL.sent
  assert.ok(!/[\r\n]/.test(notify.subject), notify.subject)
  assert.match(notify.text, /line one\nline two/)
})

test('a form token is spent once; a resend of the same request is a duplicate, not a refusal', async () => {
  const env = baseEnv()
  const token = await oldToken()
  const id = '66666666-6666-4666-8666-666666666666'
  assert.equal((await post(env, JSON.stringify({ ...answers(), id, form_token: token }))).status, 201)
  assert.equal((await post(env, JSON.stringify({ ...answers(), id, form_token: token }))).status, 200, 'same request again: duplicate')
  const other = await post(env, JSON.stringify({ ...answers(), id: '77777777-7777-4777-8777-777777777777', form_token: token }))
  assert.equal(other.status, 409)
  assert.equal((await other.json()).error, 'form_used')
})

test('two stores of one id: one wins, the other is told duplicate or conflict', async () => {
  const env = baseEnv()
  const context = { newId: () => '88888888-8888-4888-8888-888888888888', now: new Date(), ipHash: 'a'.repeat(64), country: '', userAgent: '' }
  const { lead } = buildLead(answers(), context)
  const [x, y] = await Promise.all([storeLead(env.DB, lead), storeLead(env.DB, lead)])
  assert.deepEqual([x, y].sort(), ['duplicate', 'stored'])
  const changed = { ...lead, company: { ...lead.company, name: 'Other' } }
  assert.equal(await storeLead(env.DB, changed), 'conflict')
})

test('the receipt repeats nothing the sender typed, and receipts stop at the hourly cap', async () => {
  const env = baseEnv()
  const a = answers(); a.company.name = 'Visit evil.example now'; a.contact.name = 'Click evil.example'
  await post(env, JSON.stringify({ ...a, form_token: await oldToken() }))
  const receipt = env.EMAIL.sent.find(m => m.to === 'alex@example.com')
  assert.ok(!receipt.text.includes('evil.example'))
  const at = new Date().toISOString()
  for (let i = 0; i < RECEIPTS_PER_HOUR; i++) {
    await env.DB.prepare("INSERT INTO leads (id, payload, payload_hash, email, created_at, next_attempt_at, confirm_status, confirm_at) VALUES (?, '{}', 'h', ?, ?, ?, 'done', ?)").bind(`00000000-0000-4000-8000-${String(i).padStart(12, '0')}`, `p${i}@example.com`, at, at, at).run()
  }
  const b = answers(); b.contact.email = 'new@example.com'
  await post(env, JSON.stringify({ ...b, id: '99999999-9999-4999-8999-999999999999', form_token: await oldToken() }))
  const row = await env.DB.prepare('SELECT confirm_status, confirm_error FROM leads WHERE id = ?').bind('99999999-9999-4999-8999-999999999999').first()
  assert.equal(row.confirm_status, 'skipped')
  assert.match(row.confirm_error, /hourly receipt cap/)
})

test('a chunked body with no Content-Length is capped by bytes', async () => {
  const big = new ReadableStream({ start (c) { for (let i = 0; i < 40; i++) c.enqueue(new TextEncoder().encode('x'.repeat(1024))); c.close() } })
  const r = await worker.fetch(new Request('https://passioncode.ai/api/leads', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://passioncode.ai' }, body: big, duplex: 'half' }), baseEnv(), ctx())
  assert.equal(r.status, 413)
})

test('a page is revalidated against the release snapshot, never against the stored file alone', async () => {
  const env = baseEnv({ DB: undefined })
  const first = await worker.fetch(new Request('https://passioncode.ai/start/'), env, ctx())
  const etag = first.headers.get('etag')
  assert.match(etag, /^W\/"[0-9a-f]{32}"$/)
  assert.notEqual(etag, '"asset-1"')
  assert.equal(first.headers.get('x-saw-conditional'), null, 'the asset fetch carried no conditional header')
  const again = await worker.fetch(new Request('https://passioncode.ai/start/', { headers: { 'If-None-Match': etag } }), env, ctx())
  assert.equal(again.status, 304)
  const stale = await worker.fetch(new Request('https://passioncode.ai/start/', { headers: { 'If-None-Match': '"asset-1"' } }), env, ctx())
  assert.equal(stale.status, 200, 'the stored file\'s own ETag no longer matches a page')
  const business = await worker.fetch(new Request('https://passioncode.ai/business/'), baseEnv({ DB: undefined }), ctx())
  assert.equal(business.headers.get('etag'), null)
  assert.equal(business.headers.get('cache-control'), 'no-store')
})

// ---- the hourly push from GitHub Actions --------------------------------------------------

const signedPush = async (body, { secret = 'ingest-secret', ts = Math.floor(Date.now() / 1000) } = {}) => {
  const raw = JSON.stringify(body)
  return new Request('https://passioncode.ai/api/releases/ingest', { method: 'POST', headers: { 'content-type': 'application/json', 'X-PC-Timestamp': String(ts), 'X-PC-Signature': await platformSignature(secret, String(ts), raw) }, body: raw })
}
const bumped = (key, version) => {
  const e = structuredClone(bundled.products[key])
  e.version = version; e.tag = `v${version}`
  for (const a of Object.values(e.assets)) a.url = a.url.replace(/\/download\/v[^/]+\//, `/download/v${version}/`)
  return e
}

test('a signed push is stored; a product it lacks keeps its last entry', async () => {
  const env = baseEnv({ RELEASES_INGEST_SECRET: 'ingest-secret' })
  const r = await ingestReleases(await signedPush({ schema: 'releases/1', generatedAt: 'x', products: { switchboard: bumped('switchboard', '9.0.0') } }), env)
  assert.equal(r.status, 200)
  assert.equal((await r.json()).versions.switchboard, '9.0.0')
  const row = await env.DB.prepare('SELECT source FROM release_snapshot WHERE id = 1').first()
  assert.equal(row.source, 'push')
  assert.equal((await currentSnapshot(env, Date.now() + 5e9)).products.switchboard.version, '9.0.0')
  assert.equal((await currentSnapshot(env, Date.now() + 5e9)).products.fabric.version, bundled.products.fabric.version, 'a missing product keeps its entry')
  // the same release withdrawn: the next push answers the bundled version and the site follows
  await ingestReleases(await signedPush({ schema: 'releases/1', products: { switchboard: bundled.products.switchboard } }), env)
  assert.equal((await currentSnapshot(env, Date.now() + 6e9)).products.switchboard.version, bundled.products.switchboard.version)
})

test('a push with a wrong or stale signature, or an invalid snapshot, changes nothing', async () => {
  const env = baseEnv({ RELEASES_INGEST_SECRET: 'ingest-secret' })
  const good = { schema: 'releases/1', products: { switchboard: bumped('switchboard', '9.0.0') } }
  assert.equal((await ingestReleases(await signedPush(good, { secret: 'other' }), env)).status, 401)
  assert.equal((await ingestReleases(await signedPush(good, { ts: Math.floor(Date.now() / 1000) - 900 }), env)).status, 401)
  const evil = structuredClone(good); evil.products.switchboard.assets.macos.url = 'https://example.com/x.zip'
  assert.equal((await ingestReleases(await signedPush(evil), env)).status, 400)
  assert.equal((await ingestReleases(await signedPush({ schema: 'other', products: {} }), env)).status, 400)
  assert.equal(await env.DB.prepare('SELECT COUNT(*) AS n FROM release_snapshot').first().then(r => r.n), 0)
  assert.equal((await ingestReleases(await signedPush(good), baseEnv())).status, 503, 'not configured without the secret')
  const viaRoute = await worker.fetch(await signedPush(good), env, ctx())
  assert.equal(viaRoute.status, 200)
  assert.equal((await worker.fetch(new Request('https://passioncode.ai/api/releases/ingest'), env, ctx())).status, 405)
})

test('without a token the cron does not ask GitHub while pushed snapshots are fresh', async () => {
  const env = baseEnv({ RELEASES_INGEST_SECRET: 'ingest-secret' })
  await ingestReleases(await signedPush({ schema: 'releases/1', products: { switchboard: bundled.products.switchboard } }), env)
  let asked = 0
  const r = await refreshReleases(env, { fetch: async () => { asked++; return new Response('[]') } })
  assert.equal(r.skipped, true)
  assert.equal(asked, 0)
  const later = await refreshReleases(env, { fetch: async () => { asked++; return new Response('x', { status: 403 }) }, now: () => new Date(Date.now() + 3 * 3600e3) })
  assert.equal(later.ok, true)
  assert.ok(asked > 0, 'a stale push lets the cron try again')
  const withToken = await refreshReleases({ ...env, GITHUB_TOKEN: 't' }, { fetch: async () => new Response('x', { status: 403 }) })
  assert.notEqual(withToken.skipped, true, 'a token makes the cron ask regardless')
})

test('the push script signs what it resolved and reports the answer', async () => {
  const sent = []
  const fakeFetch = async (url, init = {}) => {
    if (String(url).includes('registry.npmjs.org')) return new Response(JSON.stringify({ version: '1.0.0' }))
    if (String(url).includes('api.github.com')) {
      const repo = String(url).match(/repos\/(.+)\/releases/)[1]
      const entry = Object.values(bundled.products).find(p => p.repository === repo)
      return new Response(JSON.stringify([{ tag_name: entry.tag, prerelease: entry.prerelease, draft: false, published_at: entry.publishedAt, assets: Object.values(entry.assets).map(a => ({ name: a.name, browser_download_url: a.url, digest: `sha256:${a.sha256}`, state: 'uploaded', size: a.size })) }]))
    }
    sent.push({ url: String(url), init })
    return new Response(JSON.stringify({ stored: true, versions: {} }), { status: 200 })
  }
  const result = await pushReleases({ token: 't', secret: 's', url: 'https://example.test/ingest', fetch: fakeFetch })
  assert.equal(result.ok, true)
  assert.equal(sent.length, 1)
  const ts = sent[0].init.headers['X-PC-Timestamp']
  assert.equal(sent[0].init.headers['X-PC-Signature'], await platformSignature('s', ts, sent[0].init.body))
  assert.equal(JSON.parse(sent[0].init.body).schema, 'releases/1')
  const none = await pushReleases({ token: 't', secret: 's', url: 'https://example.test/ingest', fetch: async () => new Response('x', { status: 403 }) })
  assert.equal(none.ok, false)
  assert.equal(none.reason, 'no product answered')
  await assert.rejects(pushReleases({ url: 'x', fetch: fakeFetch }), /RELEASES_INGEST_SECRET/)
})
