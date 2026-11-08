// SITE-049: the site's own analytics, sent through this Worker so the page loads no third-party script and writes nothing
// on the visitor's device (docs/tasks/2026-11-06-ai-native-org-design.md §4, §7; catalogue docs/analytics/events.md).
// - The page posts a small batch to /api/e; only the events and values listed here pass, anything else becomes `other`
//   or is dropped, so a free string can never carry a name, a path or an address.
// - `iid` is a visitor-day: a UUIDv8 (RFC 9562) from an HMAC of the day's random salt, the IP and the User-Agent. The
//   salt lives in D1 for one UTC day and the cron deletes older ones; IP and User-Agent never leave the Worker.
// - Do Not Track or Global Privacy Control in the request: nothing is sent. No App Key (a preview, a test): nothing is sent.
export const HOST = 'https://analytics.passioncode.ai'
export const SDK_VERSION = 'passioncode-site-analytics@1'
export const MAX_BODY = 4096
export const MAX_EVENTS = 20

const PAGES = ['home', 'vision', 'start', 'business', 'business-thanks', 'privacy', 'switchboard', 'switchboard-agents',
  'fabric', 'fabric-agents', 'inbox', 'dashboards', 'observatory', 'design-system', 'not-found',
  // SITE-056: the agent templates, guides and blog
  'agents', 'agent-template', 'guides', 'guide', 'blog', 'blog-post', 'other']
const LOCATIONS = ['header', 'hero', 'video', 'problem', 'shift', 'fabric', 'system', 'agents', 'grow', 'doors', 'products',
  'source', 'faq', 'about', 'investors', 'footer', 'start', 'business', 'request', 'marketplace', 'template', 'guide', 'blog', 'other']
const TARGETS = ['business', 'start', 'setup', 'github', 'investors', 'mail', 'fabric', 'products', 'vision', 'switchboard',
  'dashboards', 'observatory', 'inbox', 'x', 'download', 'agents', 'guides', 'blog', 'other']
// SITE-056: the agent templates (scripts/site-content.mjs), by their public slug.
const TEMPLATES = ['company-assessment', 'organization-administrator', 'data-room', 'host-operations', 'messenger-gateway', 'sales-and-leads', 'marketing-analyst', 'growth-analytics', 'search-traffic', 'app-store-publisher', 'brand-and-content', 'support-answerer', 'chat-assistant', 'telegram-product-bot', 'customer-listening', 'media-production', 'research', 'web-quality-monitor', 'other']
const PERCENTS = ['0', '25', '50', '100']
const LEAD_PATHS = ['agent', 'form']

// Each event and the closed values of each property. A value outside its list is sent as `other` (or the event is
// dropped where no `other` exists), never as written.
export const EVENTS = {
  page_view: { page: PAGES },
  cta_click: { page: PAGES, location: LOCATIONS, target: TARGETS },
  video_progress: { page: PAGES, percent: PERCENTS },
  command_copy: { page: PAGES },
  lead_started: { page: PAGES },
  lead_sent: { page: PAGES, path: LEAD_PATHS },
  lang_switch: { page: PAGES },
  template_request: { page: PAGES, template: TEMPLATES }
}

const enc = new TextEncoder()
const hex = bytes => [...bytes].map(b => b.toString(16).padStart(2, '0')).join('')

// The visitor-day id: the first 16 bytes of HMAC-SHA256(salt, ip + "\n" + ua), shaped as a UUIDv8 (version nibble 8,
// variant bits 10), lower case, so growth counts it (it accepts only UUID ids).
export async function visitorId (salt, ip, ua) {
  const key = await crypto.subtle.importKey('raw', enc.encode(salt), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const b = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(`${ip}\n${ua}`))).slice(0, 16)
  b[6] = (b[6] & 0x0f) | 0x80
  b[8] = (b[8] & 0x3f) | 0x80
  const h = hex(b)
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

// Today's salt (UTC), made once a day by whichever request comes first.
export async function saltFor (db, now = new Date()) {
  const day = now.toISOString().slice(0, 10)
  const found = await db.prepare('SELECT salt FROM analytics_salts WHERE day = ?').bind(day).first()
  if (found) return found.salt
  const salt = hex(crypto.getRandomValues(new Uint8Array(32)))
  await db.prepare('INSERT OR IGNORE INTO analytics_salts (day, salt) VALUES (?, ?)').bind(day, salt).run()
  return (await db.prepare('SELECT salt FROM analytics_salts WHERE day = ?').bind(day).first()).salt
}

// The cron's half: every salt older than today goes, so an old id can never be made again.
export async function forgetOldSalts (db, now = new Date()) {
  const day = now.toISOString().slice(0, 10)
  const r = await db.prepare('DELETE FROM analytics_salts WHERE day < ?').bind(day).run()
  return r.meta.changes
}

// One raw event from the page → its clean form, or null when the event is not in the catalogue.
export function clean (raw, locales) {
  if (!raw || typeof raw !== 'object') return null
  const spec = EVENTS[raw.n]
  if (!spec) return null
  const props = {}
  const given = raw.p && typeof raw.p === 'object' ? raw.p : {}
  for (const [key, values] of Object.entries(spec)) {
    const v = String(given[key] ?? '')
    if (values.includes(v)) props[key] = v
    else if (values.includes('other')) props[key] = 'other'
    else return null // a closed list with no `other` (percent, path): a wrong value drops the event
  }
  if (raw.n === 'lang_switch') {
    const to = String(given.to ?? '')
    props.to = locales.includes(to) ? to : 'other'
  }
  return { name: raw.n, props }
}

// The page's language, checked against the site's locales.
const langOf = (value, locales) => (locales.includes(String(value)) ? String(value) : 'other')

// POST /api/e: { lang, events: [{ n, p }] } → 204. Never an error the page has to handle, never a body.
export async function collect (request, env, ctx, { locales, now = new Date(), fetchImpl = globalThis.fetch } = {}) {
  const none = new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
  if (request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1') return none
  const length = Number(request.headers.get('content-length') || 0)
  if (length > MAX_BODY) return none
  let body
  try {
    const text = await request.text()
    if (text.length > MAX_BODY) return none
    body = JSON.parse(text)
  } catch (_) { return none }
  const events = (Array.isArray(body?.events) ? body.events : []).slice(0, MAX_EVENTS).map(e => clean(e, locales)).filter(Boolean)
  if (!events.length || !env.ANALYTICS_APP_KEY || !env.DB) return none
  const url = new URL(request.url)
  const environment = url.hostname === 'passioncode.ai' ? 'production' : 'sandbox'
  const ip = request.headers.get('cf-connecting-ip') || ''
  const ua = request.headers.get('user-agent') || ''
  const send = (async () => {
    const iid = await visitorId(await saltFor(env.DB, now), ip, ua)
    const lang = langOf(body.lang, locales)
    const timestamp = now.toISOString()
    const payload = events.map(e => ({
      timestamp,
      sessionId: iid,
      eventName: e.name,
      systemProps: { isDebug: environment !== 'production', locale: lang, appVersion: '', appBuildNumber: '', sdkVersion: SDK_VERSION },
      props: { ...e.props, lang, iid, environment, platform: 'web' }
    }))
    await fetchImpl(`${HOST}/api/v0/events`, {
      method: 'POST',
      headers: { 'App-Key': env.ANALYTICS_APP_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000)
    })
  })().catch(() => {}) // a failed send is dropped, never retried or kept
  if (ctx?.waitUntil) ctx.waitUntil(send)
  else await send
  return none
}
