// #region leads — docs: docs/DEPLOYMENT.md#commercial-enquiries
// A commercial enquiry from /business/: validated here, stored in D1 before anything else
// happens, then delivered three ways — a notification to the commercial mailbox, a receipt
// to the sender, and a signed copy to the PassionCode.ai Platform backend. Each delivery is
// retried by the cron from D1, so a lead is never lost to a backend or mail outage.
import { LEAD_OPTIONS, PRIVACY_VERSION } from '../assets/lead-options.js'
import { estimate } from '../assets/estimate.js'

export const LEAD_SCHEMA = 'lead/1'
export const MAX_BODY_BYTES = 32 * 1024
export const FORM_TOKEN_MIN_AGE_MS = 3000
export const FORM_TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000
export const MAX_ATTEMPTS = 12
// Receipts across all senders in one hour: a ceiling far above real traffic that stops the
// form from being used to mail many strangers.
export const RECEIPTS_PER_HOUR = 30

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
// The Platform's own rule (zod `z.regexes.email`, passioncode-platform src/modules/leads/schema.ts):
// an address this Worker accepts and the Platform refuses would be stored here and never delivered.
export const EMAIL = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/
// Statuses the Platform answers for a request that will never succeed as sent; anything else
// (401 during a secret rotation, 404 while a route deploys, 5xx) is retried with backoff.
export const FINAL_STATUSES = new Set([400, 409, 413, 415, 422])

// ---- input -------------------------------------------------------------------------------

// A no-JavaScript submission arrives form-encoded with dotted names (`company.name`,
// `goals` repeated); a scripted one arrives as the same shape in JSON.
// Only the form's own field names are read: a crafted name (`__proto__.x`) never reaches an
// object, and every node has a null prototype, so nothing can change the isolate's Object.
export const FORM_FIELDS = new Set([
  'id', 'form_token', 'pc_hp',
  'goals',
  'company.name', 'company.website', 'company.industry', 'company.industryOther', 'company.size', 'company.agentUsers',
  'processes.areas', 'processes.other', 'processes.currentState', 'processes.tools', 'processes.hoursPerWeek', 'processes.hourlyCost', 'processes.currency',
  'setup.mode', 'setup.hosting', 'setup.constraints',
  'budget.monthly', 'budget.setup', 'budget.timeline',
  'contact.name', 'contact.role', 'contact.email', 'contact.phone', 'contact.telegram', 'contact.message',
  'consent.privacy', 'consent.marketing',
  'source.referrer', 'source.utm.source', 'source.utm.medium', 'source.utm.campaign', 'source.utm.term', 'source.utm.content'
])
const ARRAY_FIELDS = new Set(['goals', 'processes.areas', 'processes.tools', 'setup.constraints'])
export function formToObject (params) {
  const out = Object.create(null)
  for (const [name, raw] of params) {
    if (typeof raw !== 'string' || !FORM_FIELDS.has(name)) continue
    const path = name.split('.')
    let node = out
    for (const part of path.slice(0, -1)) node = Object.hasOwn(node, part) ? node[part] : (node[part] = Object.create(null))
    const leaf = path.at(-1)
    if (ARRAY_FIELDS.has(name)) (Object.hasOwn(node, leaf) ? node[leaf] : (node[leaf] = [])).push(raw)
    else node[leaf] = raw
  }
  return out
}
// A JSON body is reduced to the same known fields, so both paths read one shape.
export function knownFields (input) {
  const params = []
  const walk = (value, prefix) => {
    if (value === null || value === undefined) return
    if (Array.isArray(value)) { for (const v of value) if (typeof v !== 'object') params.push([prefix, String(v)]); return }
    if (typeof value === 'object') { for (const key of Object.keys(value)) walk(value[key], prefix ? `${prefix}.${key}` : key); return }
    params.push([prefix, typeof value === 'boolean' ? (value ? 'yes' : '') : String(value)])
  }
  if (input && typeof input === 'object' && !Array.isArray(input)) walk(input, '')
  return formToObject(params)
}

// `truncate` is for what the visitor never typed (referrer, UTM, user agent): it is cut to size
// silently, because an issue there is one the person cannot fix.
const str = (v, max, { min = 0, field, issues, multiline = false, truncate = false }) => {
  // A lone surrogate is not text: Postgres refuses it, so it would fail the lead downstream.
  const raw = (typeof v === 'string' ? v : (v == null ? '' : String(v))).toWellFormed()
  // Control characters never survive; a single-line field (it may reach an email subject)
  // loses line breaks too.
  const s = (multiline ? raw.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').replace(/[ \t]+\n/g, '\n') : raw.replace(/[\u0000-\u001f\u007f]+/g, ' ')).trim()
  if (s.length < min) issues.push({ path: field, message: min > 1 ? `at least ${min} characters` : 'required' })
  if (s.length > max && !truncate) issues.push({ path: field, message: `at most ${max} characters` })
  return s.slice(0, max)
}
const pick = (v, options, field, issues) => {
  if (typeof v === 'string' && Object.hasOwn(options, v)) return v
  issues.push({ path: field, message: 'choose one of the listed answers' })
  return null
}
const list = (v, options, field, issues, { min = 0 } = {}) => {
  const values = Array.isArray(v) ? v : (v == null || v === '' ? [] : [v])
  const out = [...new Set(values.filter(x => typeof x === 'string'))]
  if (out.some(x => !Object.hasOwn(options, x))) issues.push({ path: field, message: 'unknown answer' })
  if (out.length < min) issues.push({ path: field, message: min === 1 ? 'choose at least one' : `choose at least ${min}` })
  return out.filter(x => Object.hasOwn(options, x))
}
const num = (v, max, field, issues, { required = true } = {}) => {
  if ((v === '' || v == null) && !required) return 0
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[\s,]/g, ''))
  if (!Number.isFinite(n) || n < 0 || n > max) { issues.push({ path: field, message: `a number from 0 to ${max}` }); return 0 }
  return Math.round(n * 100) / 100
}
// The referrer is kept only as an http(s) address (an app referrer such as android-app:// is
// dropped), cut silently to the Platform's limit.
const referrer = v => {
  const s = str(v, 500, { field: 'source.referrer', issues: [], truncate: true })
  return /^https?:\/\/\S+$/i.test(s) ? s : ''
}
const url = (v, field, issues) => {
  const s = str(v, 300, { field, issues })
  if (!s) return ''
  try {
    const u = new URL(/^[a-z]+:\/\//i.test(s) ? s : `https://${s}`)
    if (!['http:', 'https:'].includes(u.protocol) || !u.hostname.includes('.')) throw new Error()
    return u.href
  } catch { issues.push({ path: field, message: 'a web address' }); return '' }
}

// Returns { ok, lead, issues }. `context` carries what the server knows and the client
// must not choose: id fallback, time, page, client hashes.
export function buildLead (input, context) {
  const issues = []
  const i = input && typeof input === 'object' ? input : {}
  const company = i.company || {}
  const processes = i.processes || {}
  const setup = i.setup || {}
  const budget = i.budget || {}
  const contact = i.contact || {}
  const consent = i.consent || {}
  const utm = i.source?.utm || {}

  const email = str(contact.email, 254, { min: 3, field: 'contact.email', issues }).toLowerCase()
  if (email && (!EMAIL.test(email) || email.split('@')[0].length > 64)) issues.push({ path: 'contact.email', message: 'a work email address' })
  const consentGiven = consent.privacy === true || consent.privacy === 'yes' || consent.privacy === 'on' || consent.privacy === 'true'
  if (!consentGiven) issues.push({ path: 'consent.privacy', message: 'agree to the privacy notice to send the request' })

  const currency = pick(processes.currency || 'USD', LEAD_OPTIONS.currency, 'processes.currency', issues) || 'USD'
  const lead = {
    schema: LEAD_SCHEMA,
    id: typeof i.id === 'string' && UUID.test(i.id) ? i.id : context.newId(),
    submittedAt: context.now.toISOString(),
    source: {
      page: '/business/',
      referrer: referrer(i.source?.referrer ?? context.referrer ?? ''),
      locale: 'en',
      utm: Object.fromEntries(['source', 'medium', 'campaign', 'term', 'content'].map(k => [k, str(utm[k], 120, { field: `source.utm.${k}`, issues, truncate: true })]))
    },
    goals: list(i.goals, LEAD_OPTIONS.goals, 'goals', issues, { min: 1 }),
    company: {
      name: str(company.name, 200, { min: 1, field: 'company.name', issues }),
      website: url(company.website, 'company.website', issues),
      industry: pick(company.industry, LEAD_OPTIONS.industry, 'company.industry', issues),
      industryOther: str(company.industryOther, 120, { field: 'company.industryOther', issues }),
      size: pick(company.size, LEAD_OPTIONS.size, 'company.size', issues),
      agentUsers: Math.round(num(company.agentUsers, 100000, 'company.agentUsers', issues, { required: false }))
    },
    processes: {
      areas: list(processes.areas, LEAD_OPTIONS.areas, 'processes.areas', issues, { min: 1 }),
      other: str(processes.other, 500, { field: 'processes.other', issues, multiline: true }),
      currentState: pick(processes.currentState, LEAD_OPTIONS.currentState, 'processes.currentState', issues),
      tools: list(processes.tools, LEAD_OPTIONS.tools, 'processes.tools', issues),
      hoursPerWeek: num(processes.hoursPerWeek, 10000, 'processes.hoursPerWeek', issues, { required: false }),
      hourlyCost: num(processes.hourlyCost, 10000, 'processes.hourlyCost', issues, { required: false }),
      currency
    },
    setup: {
      mode: pick(setup.mode, LEAD_OPTIONS.mode, 'setup.mode', issues),
      hosting: pick(setup.hosting, LEAD_OPTIONS.hosting, 'setup.hosting', issues),
      constraints: list(setup.constraints, LEAD_OPTIONS.constraints, 'setup.constraints', issues)
    },
    budget: {
      monthly: pick(budget.monthly, LEAD_OPTIONS.monthly, 'budget.monthly', issues),
      setup: pick(budget.setup, LEAD_OPTIONS.setup, 'budget.setup', issues),
      timeline: pick(budget.timeline, LEAD_OPTIONS.timeline, 'budget.timeline', issues)
    },
    contact: {
      name: str(contact.name, 120, { min: 1, field: 'contact.name', issues }),
      role: str(contact.role, 120, { field: 'contact.role', issues }),
      email,
      phone: str(contact.phone, 40, { field: 'contact.phone', issues }),
      telegram: str(contact.telegram, 64, { field: 'contact.telegram', issues }),
      message: str(contact.message, 4000, { field: 'contact.message', issues, multiline: true })
    },
    consent: { privacy: true, version: PRIVACY_VERSION, marketing: consent.marketing === true || consent.marketing === 'yes' || consent.marketing === 'on' || consent.marketing === 'true' },
    client: { ipHash: context.ipHash, country: /^[A-Za-z0-9]{2}$/.test(context.country || '') ? context.country : '', userAgent: str(context.userAgent || '', 400, { field: 'client.userAgent', issues, truncate: true }) }
  }
  const e = estimate(lead.processes)
  if (e) lead.estimate = e
  return { ok: issues.length === 0, lead, issues }
}

// ---- anti-abuse: a signed render time ------------------------------------------------------

const enc = new TextEncoder()
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
async function hmac (secret, message) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(message)))
}
export const sha256 = async text => hex(await crypto.subtle.digest('SHA-256', enc.encode(text)))
const sameString = (a, b) => {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// The /business/ page is served with a token naming when it was rendered; a submission
// faster than a person can fill the form, or replayed a day later, is refused.
// Each token carries a random nonce and is spent once (consumeFormToken), so one page load
// sends one request.
export async function issueFormToken (secret, now = Date.now(), nonce = hex(crypto.getRandomValues(new Uint8Array(12)))) {
  return `${now}.${nonce}.${await hmac(secret, `form.${now}.${nonce}`)}`
}
export function tokenNonce (token) { return String(token || '').split('.')[1] || '' }
export async function checkFormToken (secret, token, now = Date.now()) {
  const m = /^(\d{13})\.([0-9a-f]{24})\.([0-9a-f]{64})$/.exec(String(token || ''))
  if (!m) return 'missing'
  if (!sameString(m[3], await hmac(secret, `form.${m[1]}.${m[2]}`))) return 'invalid'
  const age = now - Number(m[1])
  if (age < FORM_TOKEN_MIN_AGE_MS) return 'too_fast'
  if (age > FORM_TOKEN_MAX_AGE_MS) return 'expired'
  return 'ok'
}
// True once per nonce; a replayed token answers false. Spent nonces older than the token's
// lifetime are pruned by the cron.
export async function consumeFormToken (db, token, now = new Date()) {
  const r = await db.prepare('INSERT INTO form_tokens (nonce, used_at) VALUES (?, ?) ON CONFLICT(nonce) DO NOTHING').bind(tokenNonce(token), now.toISOString()).run()
  return (r.meta?.changes ?? 0) === 1
}

// Same signature the Platform verifies: HMAC-SHA256(secret, `${timestamp}.${body}`).
export async function platformSignature (secret, timestamp, body) {
  return `v1=${await hmac(secret, `${timestamp}.${body}`)}`
}

// ---- storage -----------------------------------------------------------------------------

// Canonical JSON (sorted keys) so a retried submission hashes the same.
export function canonical (value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`
  return JSON.stringify(value)
}
// What identifies a submission for idempotency: everything the person chose — not the time, and
// not where they came from (a resend through another link is still the same request).
const identity = lead => canonical({ ...lead, submittedAt: null, client: null, source: null })

export const FIRST_RETRY_MS = 2 * 60 * 1000
export async function findLead (db, lead) {
  const existing = await db.prepare('SELECT payload_hash FROM leads WHERE id = ?').bind(lead.id).first()
  if (!existing) return null
  return existing.payload_hash === await sha256(identity(lead)) ? 'duplicate' : 'conflict'
}
// INSERT … ON CONFLICT: two requests with one id cannot both win, and the loser is told the
// truth (duplicate or conflict) rather than an error. The cron's first look waits two minutes,
// so it never races the request's own delivery.
export async function storeLead (db, lead) {
  const hash = await sha256(identity(lead))
  const firstRetry = new Date(Date.parse(lead.submittedAt) + FIRST_RETRY_MS).toISOString()
  const r = await db.prepare(`INSERT INTO leads (id, payload, payload_hash, email, created_at, next_attempt_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`)
    .bind(lead.id, JSON.stringify(lead), hash, lead.contact.email, lead.submittedAt, firstRetry).run()
  if ((r.meta?.changes ?? 0) === 1) return 'stored'
  const existing = await db.prepare('SELECT payload_hash FROM leads WHERE id = ?').bind(lead.id).first()
  return existing?.payload_hash === hash ? 'duplicate' : 'conflict'
}

// ---- delivery ----------------------------------------------------------------------------

const label = (group, value) => LEAD_OPTIONS[group]?.[value] ?? value ?? '—'
const labels = (group, values) => (values || []).map(v => label(group, v)).join(', ') || '—'
const money = (n, currency) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

export function notificationText (lead) {
  const e = lead.estimate
  return [
    `New enquiry from ${lead.contact.name}${lead.contact.role ? `, ${lead.contact.role}` : ''} at ${lead.company.name}`,
    '',
    `Email: ${lead.contact.email}`,
    lead.contact.phone && `Phone: ${lead.contact.phone}`,
    lead.contact.telegram && `Telegram: ${lead.contact.telegram}`,
    `Website: ${lead.company.website || '—'}`,
    `Industry: ${label('industry', lead.company.industry)}${lead.company.industryOther ? ` (${lead.company.industryOther})` : ''}`,
    `Company size: ${label('size', lead.company.size)} · people who would use agents: ${lead.company.agentUsers || '—'}`,
    '',
    `Goals: ${labels('goals', lead.goals)}`,
    `Processes: ${labels('areas', lead.processes.areas)}${lead.processes.other ? ` — ${lead.processes.other}` : ''}`,
    `Today: ${label('currentState', lead.processes.currentState)} · tools: ${labels('tools', lead.processes.tools)}`,
    `Hours a week on them: ${lead.processes.hoursPerWeek || '—'} · loaded hourly cost: ${lead.processes.hourlyCost ? money(lead.processes.hourlyCost, lead.processes.currency) : '—'}`,
    e ? `Estimate (${e.model}): ${e.hoursSavedPerMonth[0]}–${e.hoursSavedPerMonth[1]} h/month, ${money(e.monthlySavings[0], e.currency)}–${money(e.monthlySavings[1], e.currency)} a month` : 'Estimate: not enough data',
    '',
    `Setup: ${label('mode', lead.setup.mode)} · runs on: ${label('hosting', lead.setup.hosting)} · constraints: ${labels('constraints', lead.setup.constraints)}`,
    `Budget: ${label('monthly', lead.budget.monthly)} monthly, ${label('setup', lead.budget.setup)} setup · timeline: ${label('timeline', lead.budget.timeline)}`,
    '',
    lead.contact.message ? `Message:\n${lead.contact.message}` : 'No message.',
    '',
    `Lead ${lead.id} · ${lead.submittedAt} · country ${lead.client.country || '—'} · marketing consent ${lead.consent.marketing ? 'yes' : 'no'}`,
    lead.source.utm.source ? `UTM: ${Object.entries(lead.source.utm).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(' ')}` : null
  ].filter(x => x !== null && x !== undefined && x !== false).join('\n')
}

export function confirmationText (lead) {
  return [
    // No text the sender typed is repeated here: the receipt cannot carry someone else's words.
    'Hello,',
    '',
    'Thank you for your request. It reached PassionCode.ai.',
    '',
    'What happens next:',
    '1. We read what you sent and reply within two business days, usually with a few questions about the processes you named.',
    '2. If it fits, we suggest a short call to map one process and agree how to measure it.',
    '3. You get a written proposal: what we would set up, where it runs, and the license it needs.',
    '',
    'Everything PassionCode.ai builds is open source under the GNU AGPL-3.0, so you can also start on your own today: https://passioncode.ai/start/',
    '',
    'To add anything, reply to this email.',
    '',
    'PassionCode.ai',
    'https://passioncode.ai/business/',
    '',
    `Reference: ${lead.id}. We keep your request only to answer it: https://passioncode.ai/privacy/`
  ].join('\n')
}

const asHtml = text => `<pre style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>`

const COLUMNS = { notify: 'notify', confirm: 'confirm', forward: 'forward' }

// A delivery that ended for good is told to the commercial mailbox, so a lead never sits
// unseen in the buffer. Best effort: the row already records the failure.
export async function alertFailure (env, from, id, channel, error) {
  try {
    console.log(JSON.stringify({ event: 'leads.failed', id, channel }))
    // The commercial mailbox cannot be told that its own notification failed: the log carries it.
    if (!env.EMAIL || channel === 'notify') return
    const to = String(env.LEAD_NOTIFY_TO || 'commercial@passioncode.ai').split(',').map(s => s.trim()).filter(Boolean)
    const text = `Lead ${id}: delivery "${channel}" gave up.\n\n${String(error || '').slice(0, 500)}\n\nThe lead stays in D1 (table leads); docs/DEPLOYMENT.md#commercial-enquiries says how to re-queue it.`
    await env.EMAIL.send({ to, from, subject: `Enquiry delivery failed: ${channel} · ${id}`, text, html: asHtml(text) })
  } catch (e) { console.log(JSON.stringify({ event: 'leads.alert_failed', id, channel, error: e.message })) }
}

async function mark (db, id, channel, status, error = null) {
  const c = COLUMNS[channel]
  await db.prepare(`UPDATE leads SET ${c}_status = ?, ${c}_attempts = ${c}_attempts + 1, ${c}_error = ?, ${c}_at = CASE WHEN ? = 'done' THEN ? ELSE ${c}_at END WHERE id = ?`)
    .bind(status, error && String(error).slice(0, 500), status, new Date().toISOString(), id).run()
}

// One attempt at every channel still pending for a lead. Returns what happened per channel.
export async function deliver (env, id, { fetch: fetchImpl = fetch, now = new Date(), clock = () => Date.now() } = {}) {
  const row = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first()
  if (!row) return { missing: true }
  const lead = JSON.parse(row.payload)
  const result = {}
  const from = { email: env.LEAD_FROM || 'commercial@passioncode.ai', name: 'PassionCode.ai' }

  if (row.notify_status === 'pending') {
    try {
      if (!env.EMAIL) throw new Error('no EMAIL binding')
      const to = String(env.LEAD_NOTIFY_TO || 'commercial@passioncode.ai').split(',').map(s => s.trim()).filter(Boolean)
      const text = notificationText(lead)
      await env.EMAIL.send({ to, from, replyTo: lead.contact.email, subject: `Enquiry: ${lead.company.name} · ${label('industry', lead.company.industry)} · ${label('monthly', lead.budget.monthly)}`, text, html: asHtml(text) })
      await mark(env.DB, id, 'notify', 'done'); result.notify = 'done'
    } catch (error) { await mark(env.DB, id, 'notify', 'pending', error.message); result.notify = 'retry' }
  }

  if (row.confirm_status === 'pending') {
    try {
      // One receipt per address a day: the form cannot be used to mail a stranger repeatedly.
      const since = new Date(now.getTime() - 86400000).toISOString()
      const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM leads WHERE email = ? AND confirm_status = 'done' AND confirm_at > ? AND id != ?").bind(lead.contact.email, since, id).first()
      const hourAgo = new Date(now.getTime() - 3600000).toISOString()
      const lastHour = await env.DB.prepare("SELECT COUNT(*) AS n FROM leads WHERE confirm_status = 'done' AND confirm_at > ?").bind(hourAgo).first()
      if (recent?.n > 0) { await mark(env.DB, id, 'confirm', 'skipped', 'receipt already sent to this address today'); result.confirm = 'skipped' } else if (lastHour?.n >= RECEIPTS_PER_HOUR) {
        // The cap protects strangers' inboxes, not the sender: a receipt over it waits for the
        // next hour (the cron's backoff) instead of being dropped, so filling the cap with
        // scripted requests cannot deny real senders their receipt.
        // A deferral is not an attempt: attempts stay for real sending failures. After 24 hours
        // over the cap the receipt is dropped (skipped), so a flood cannot keep leads pending.
        if (now.getTime() - Date.parse(row.created_at) > 86400000) {
          await mark(env.DB, id, 'confirm', 'skipped', 'hourly receipt cap held for 24 hours'); result.confirm = 'skipped'
        } else {
          await env.DB.prepare('UPDATE leads SET confirm_error = ? WHERE id = ?').bind('hourly receipt cap reached; deferred', id).run()
          result.confirm = 'deferred'
        }
      } else {
        if (!env.EMAIL) throw new Error('no EMAIL binding')
        const text = confirmationText(lead)
        await env.EMAIL.send({ to: lead.contact.email, from, replyTo: env.LEAD_REPLY_TO || 'commercial@passioncode.ai', subject: 'We received your request — PassionCode.ai', text, html: asHtml(text) })
        await mark(env.DB, id, 'confirm', 'done'); result.confirm = 'done'
      }
    } catch (error) { await mark(env.DB, id, 'confirm', 'pending', error.message); result.confirm = 'retry' }
  }

  if (row.forward_status === 'pending') {
    if (!env.PLATFORM_URL || !env.PLATFORM_INTAKE_SECRET) {
      result.forward = 'waiting'   // the backend is not connected yet; the lead waits in D1
    } else {
      try {
        const body = row.payload
        // Signed at the moment of sending, not at the cron's start: a slow batch must not send a
        // timestamp outside the Platform's ±300 s window.
        const ts = String(Math.floor(clock() / 1000))
        const response = await fetchImpl(new URL('/v1/leads', env.PLATFORM_URL), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-PC-Timestamp': ts, 'X-PC-Signature': await platformSignature(env.PLATFORM_INTAKE_SECRET, ts, body) },
          body,
          signal: AbortSignal.timeout(10000)
        })
        if (response.status === 200 || response.status === 201) { await mark(env.DB, id, 'forward', 'done'); result.forward = 'done' } else if (FINAL_STATUSES.has(response.status)) {
          const error = `platform ${response.status}: ${(await response.text()).slice(0, 300)}`
          await mark(env.DB, id, 'forward', 'failed', error); result.forward = 'failed'
          await alertFailure(env, from, id, 'forward', error)
        } else { await mark(env.DB, id, 'forward', 'pending', `platform ${response.status}`); result.forward = 'retry' }
      } catch (error) { await mark(env.DB, id, 'forward', 'pending', error.message); result.forward = 'retry' }
    }
  }

  // Exponential backoff for whatever is still pending: 2, 4, 8 … minutes, capped at 6 hours.
  const fresh = await env.DB.prepare('SELECT notify_attempts, confirm_attempts, forward_attempts FROM leads WHERE id = ?').bind(id).first()
  const attempts = Math.max(fresh.notify_attempts, fresh.confirm_attempts, fresh.forward_attempts)
  let next = now.getTime() + Math.min(2 ** Math.max(attempts, 1), 360) * 60000
  // A receipt deferred by the hourly cap is tried again at the top of the next hour, not sooner.
  if (result.confirm === 'deferred') next = Math.max(next, Math.floor(now.getTime() / 3600000 + 1) * 3600000)
  await env.DB.prepare('UPDATE leads SET next_attempt_at = ? WHERE id = ?').bind(new Date(next).toISOString(), id).run()
  return result
}

// The cron: retry due leads, give up loudly after MAX_ATTEMPTS, and keep D1 small — a lead
// the Platform holds is removed from the buffer after 30 days.
export async function retryDue (env, { now = new Date(), fetch: fetchImpl = fetch, limit = 20 } = {}) {
  const at = now.toISOString()
  const { results = [] } = await env.DB.prepare(`SELECT id FROM leads WHERE next_attempt_at <= ? AND (
      (notify_status = 'pending' AND notify_attempts < ?) OR (confirm_status = 'pending' AND confirm_attempts < ?) OR
      (forward_status = 'pending' AND forward_attempts < ? AND ? = 1)) ORDER BY next_attempt_at LIMIT ?`)
    .bind(at, MAX_ATTEMPTS, MAX_ATTEMPTS, MAX_ATTEMPTS, env.PLATFORM_URL && env.PLATFORM_INTAKE_SECRET ? 1 : 0, limit).all()
  const outcomes = []
  for (const { id } of results) outcomes.push({ id, ...(await deliver(env, id, { now, fetch: fetchImpl })) })
  for (const c of ['notify', 'confirm', 'forward']) {
    const { results: exhausted = [] } = await env.DB.prepare(`SELECT id, ${c}_error AS error FROM leads WHERE ${c}_status = 'pending' AND ${c}_attempts >= ?`).bind(MAX_ATTEMPTS).all()
    await env.DB.prepare(`UPDATE leads SET ${c}_status = 'failed', ${c}_error = COALESCE(${c}_error, '') || ' (gave up)' WHERE ${c}_status = 'pending' AND ${c}_attempts >= ?`).bind(MAX_ATTEMPTS).run()
    for (const row of exhausted) await alertFailure(env, { email: env.LEAD_FROM || 'commercial@passioncode.ai', name: 'PassionCode.ai' }, row.id, c, `${row.error || ''} (gave up after ${MAX_ATTEMPTS} attempts)`)
  }
  const cutoff = new Date(now.getTime() - 30 * 86400000).toISOString()
  await env.DB.prepare("DELETE FROM leads WHERE forward_status = 'done' AND created_at < ?").bind(cutoff).run()
  await env.DB.prepare('DELETE FROM form_tokens WHERE used_at < ?').bind(new Date(now.getTime() - 2 * 86400000).toISOString()).run()
  // The privacy notice's ceiling: nothing stays in the buffer longer than 24 months.
  const ceiling = new Date(now.getTime() - 730 * 86400000).toISOString()
  await env.DB.prepare('DELETE FROM leads WHERE created_at < ?').bind(ceiling).run()
  return outcomes
}
// #endregion leads
