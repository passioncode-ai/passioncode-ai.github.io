// SITE-049: the site's analytics in the Worker (worker/analytics.js): closed values, the visitor-day id, the daily salt,
// Do Not Track, no key, batching and size limits. The catalogue (docs/analytics/events.md) is checked against EVENTS.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { clean, collect, EVENTS, forgetOldSalts, HOST, MAX_EVENTS, saltFor, visitorId } from '../worker/analytics.js'
import { d1 } from './d1-shim.mjs'

const LOCALES = ['en', 'ru', 'de']
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/ // growth's pattern
const req = (body, headers = {}, host = 'passioncode.ai') => new Request(`https://${host}/api/e`, {
  method: 'POST', headers: { 'content-type': 'text/plain', 'cf-connecting-ip': '203.0.113.7', 'user-agent': 'UA/1', ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body)
})
const sink = () => { const calls = []; return { calls, fetch: async (url, init) => { calls.push({ url, init, body: JSON.parse(init.body) }); return new Response(null, { status: 200 }) } } }
const env = (extra = {}) => ({ DB: d1(), ANALYTICS_APP_KEY: 'A-EU-1234567890', ...extra })

test('visitorId is a UUIDv8 growth accepts, stable for one salt, ip and ua, different otherwise', async () => {
  const a = await visitorId('salt-1', '203.0.113.7', 'UA/1')
  assert.match(a, UUID)
  assert.equal(a[14], '8', 'version nibble 8')
  assert.equal(await visitorId('salt-1', '203.0.113.7', 'UA/1'), a)
  assert.notEqual(await visitorId('salt-2', '203.0.113.7', 'UA/1'), a, 'a new day salt gives a new id')
  assert.notEqual(await visitorId('salt-1', '203.0.113.8', 'UA/1'), a)
})

test('one salt per UTC day, and the cron forgets older days', async () => {
  const db = d1()
  const day1 = new Date('2026-11-06T10:00:00Z')
  const s1 = await saltFor(db, day1)
  assert.equal(await saltFor(db, new Date('2026-11-06T23:59:00Z')), s1, 'same day, same salt')
  const s2 = await saltFor(db, new Date('2026-11-07T00:01:00Z'))
  assert.notEqual(s2, s1)
  assert.equal(await forgetOldSalts(db, new Date('2026-11-07T00:15:00Z')), 1)
  assert.equal(db.raw.prepare('SELECT count(*) AS n FROM analytics_salts').get().n, 1)
})

test('clean keeps closed values, maps unknown ones to other, drops what has no other', () => {
  assert.deepEqual(clean({ n: 'cta_click', p: { page: 'home', location: 'doors', target: 'business' } }, LOCALES),
    { name: 'cta_click', props: { page: 'home', location: 'doors', target: 'business' } })
  assert.deepEqual(clean({ n: 'cta_click', p: { page: '/secret/path', location: 'x@y.z', target: 'https://evil' } }, LOCALES).props,
    { page: 'other', location: 'other', target: 'other' })
  assert.equal(clean({ n: 'video_progress', p: { page: 'home', percent: '33' } }, LOCALES), null, 'percent has no other')
  assert.equal(clean({ n: 'video_progress', p: { page: 'home', percent: 25 } }, LOCALES).props.percent, '25', 'a number is sent as its string')
  assert.equal(clean({ n: 'unknown_event', p: {} }, LOCALES), null)
  assert.equal(clean({ n: 'lang_switch', p: { page: 'home', to: 'ru' } }, LOCALES).props.to, 'ru')
  assert.equal(clean({ n: 'lang_switch', p: { page: 'home', to: 'xx' } }, LOCALES).props.to, 'other')
})

test('a batch goes to the organization Aptabase in one request, with iid, environment and platform', async () => {
  const s = sink()
  const e = env()
  const res = await collect(req({ lang: 'ru', events: [{ n: 'page_view', p: { page: 'home' } }, { n: 'cta_click', p: { page: 'home', location: 'hero', target: 'business' } }] }), e, null,
    { locales: LOCALES, fetchImpl: s.fetch, now: new Date('2026-11-06T12:00:00Z') })
  assert.equal(res.status, 204)
  assert.equal(s.calls.length, 1, 'one request per page batch')
  assert.equal(s.calls[0].url, `${HOST}/api/v0/events`)
  assert.equal(s.calls[0].init.headers['App-Key'], 'A-EU-1234567890')
  const [view, click] = s.calls[0].body
  assert.equal(view.eventName, 'page_view')
  assert.match(view.props.iid, UUID)
  assert.equal(view.props.iid, click.props.iid, 'one visitor across events of a batch')
  assert.deepEqual({ env: view.props.environment, platform: view.props.platform, lang: view.props.lang }, { env: 'production', platform: 'web', lang: 'ru' })
  assert.equal(JSON.stringify(s.calls[0].body).includes('203.0.113.7'), false, 'the IP never leaves the Worker')
  assert.equal(JSON.stringify(s.calls[0].body).includes('UA/1'), false, 'the User-Agent never leaves the Worker')
})

test('the same visitor on two pages of one day keeps one iid, so a funnel across pages holds', async () => {
  const s = sink()
  const e = env()
  const now = new Date('2026-11-06T12:00:00Z')
  await collect(req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'home' } }] }), e, null, { locales: LOCALES, fetchImpl: s.fetch, now })
  await collect(req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'business' } }] }), e, null, { locales: LOCALES, fetchImpl: s.fetch, now })
  assert.equal(s.calls[0].body[0].props.iid, s.calls[1].body[0].props.iid)
})

test('a preview host is sandbox', async () => {
  const s = sink()
  await collect(req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'home' } }] }, {}, 'localhost'), env(), null, { locales: LOCALES, fetchImpl: s.fetch })
  assert.equal(s.calls[0].body[0].props.environment, 'sandbox')
})

test('nothing is sent: Do Not Track, Global Privacy Control, no key, no valid event, a body too large, broken JSON', async () => {
  const cases = [
    [req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'home' } }] }, { dnt: '1' }), env()],
    [req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'home' } }] }, { 'sec-gpc': '1' }), env()],
    [req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'home' } }] }), env({ ANALYTICS_APP_KEY: undefined })],
    [req({ lang: 'en', events: [{ n: 'nope' }] }), env()],
    [req('x'.repeat(5000)), env()],
    [req('{not json'), env()]
  ]
  for (const [r, e] of cases) {
    const s = sink()
    const res = await collect(r, e, null, { locales: LOCALES, fetchImpl: s.fetch })
    assert.equal(res.status, 204)
    assert.equal(s.calls.length, 0)
  }
})

test('a batch is capped', async () => {
  const s = sink()
  const events = Array.from({ length: MAX_EVENTS + 5 }, () => ({ n: 'page_view', p: { page: 'home' } }))
  await collect(req({ lang: 'en', events }), env(), null, { locales: LOCALES, fetchImpl: s.fetch })
  assert.equal(s.calls[0].body.length, MAX_EVENTS)
})

test('a failed send never fails the page', async () => {
  const res = await collect(req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'home' } }] }), env(), null,
    { locales: LOCALES, fetchImpl: async () => { throw new Error('down') } })
  assert.equal(res.status, 204)
})

test('the catalogue names every event and property the Worker accepts', () => {
  const catalogue = readFileSync(new URL('../docs/analytics/events.md', import.meta.url), 'utf8')
  for (const [name, props] of Object.entries(EVENTS)) {
    assert.match(catalogue, new RegExp(`\\| \`${name}\` \\|`), `catalogue row for ${name}`)
    for (const key of Object.keys(props)) assert.ok(catalogue.includes(`\`${key}\``), `${name}.${key} in the catalogue`)
  }
})

test('the Worker routes /api/e: POST only, same origin, 204', async () => {
  globalThis.HTMLRewriter ??= class { on () { return this } transform (r) { return r } }
  const { default: worker } = await import('../worker/index.js')
  const assets = { fetch: async () => new Response('asset', { status: 200 }) }
  const e = { ...env(), ASSETS: assets, ANALYTICS_APP_KEY: undefined }
  const ctx = { waitUntil: () => {} }
  const get = await worker.fetch(new Request('https://passioncode.ai/api/e'), e, ctx)
  assert.equal(get.status, 405)
  const post = await worker.fetch(req({ lang: 'en', events: [{ n: 'page_view', p: { page: 'home' } }] }), e, ctx)
  assert.equal(post.status, 204)
  const foreign = await worker.fetch(req({ lang: 'en', events: [] }, { origin: 'https://evil.example' }), e, ctx)
  assert.equal(foreign.status, 204)
})

test('the page names every page of the site the way the Worker accepts it', async () => {
  const { pageOf } = await import('../assets/analytics.js')
  const cases = { '/': 'home', '/ru/': 'home', '/vision/': 'vision', '/de/business/': 'business', '/business/thanks/': 'business-thanks',
    '/zh-hans/fabric/agents/': 'fabric-agents', '/switchboard/agents/': 'switchboard-agents', '/pt-br/start/': 'start',
    '/design-system/': 'design-system', '/secret/path/': 'other', '/fabric/download/macos': 'other',
    '/agents/': 'agents', '/ja/agents/data-room/': 'agent-template', '/guides/': 'guides', '/ru/guides/free-assessment/': 'guide',
    '/blog/': 'blog', '/blog/what-is-an-ai-native-organization/': 'blog-post', '/agents/data-room/extra/': 'other' }
  for (const [path, id] of Object.entries(cases)) {
    assert.equal(pageOf(path), id, path)
    assert.ok(EVENTS.page_view.page.includes(id), `${id} is a value the Worker accepts`)
  }
})

test('SITE-056: every template a page can ask for is a value the Worker accepts, and nothing else is', async () => {
  const { TEMPLATES } = await import('./site-content.mjs')
  const accepted = EVENTS.template_request.template.filter(t => t !== 'other')
  assert.deepEqual(accepted, TEMPLATES.map(t => t.slug), 'worker/analytics.js TEMPLATES follows scripts/site-content.mjs')
  assert.deepEqual(clean({ n: 'template_request', p: { page: 'agent-template', template: 'data-room' } }, LOCALES).props, { page: 'agent-template', template: 'data-room' })
  assert.equal(clean({ n: 'template_request', p: { page: 'agent-template', template: 'someone@example.com' } }, LOCALES).props.template, 'other')
})
