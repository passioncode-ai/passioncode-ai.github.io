// #region business-form — docs: docs/ux/scenarios.md#scn-014-request-an-ai-workplace-for-an-organization
// The /business/ short request form, enhanced. Without this script the form posts its three
// fields to /api/leads and lands on /business/thanks/. With it: the text kept in this browser
// until it is sent, the fields checked before sending, one request id per draft (a resend after
// a lost answer is the same request), and a JSON submission that stays on the page.
// The agent prompt beside the form (SCN-022) is copied by assets/site.js.

// What this script says, in the page's language (<html lang>): English in assets/messages.js,
// translated through assets/i18n.js (generated from i18n/<locale>/_scripts.json).
import { M } from './messages.js'
import { resolveLocale, t as translate } from './i18n.js'
const locale = resolveLocale(document.documentElement.lang)
const t = (message, params) => translate(locale, message, params)

const form = document.getElementById('lead-form')
// v2: the short form's draft; a draft of the former five-step form (v1) is not restored.
const DRAFT_KEY = 'passioncode.business.draft.v2'
const ID_KEY = 'passioncode.business.request-id.v2'
const FIELDS = ['contact.message', 'contact.email', 'goals']

const storage = {
  get () { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null') } catch { return null } },
  set (value) { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(value)) } catch {} },
  clear () { try { localStorage.removeItem(DRAFT_KEY); localStorage.removeItem(ID_KEY) } catch {} }
}
let memoryId
function requestId () {
  try {
    const kept = localStorage.getItem(ID_KEY)
    if (kept) return kept
    const id = crypto.randomUUID()
    localStorage.setItem(ID_KEY, id)
    return id
  } catch { return (memoryId ??= crypto.randomUUID()) }
}

const field = name => form.elements[name]
// The lead/2 shape the Worker validates (worker/leads.js buildShortLead).
function collect () {
  const params = new URLSearchParams(location.search)
  const goal = field('goals').value
  return {
    contact: { message: field('contact.message').value, email: field('contact.email').value },
    goals: goal ? [goal] : [],
    source: { channel: 'form', referrer: document.referrer || '', utm: Object.fromEntries(['source', 'medium', 'campaign', 'term', 'content'].map(k => [k, params.get(`utm_${k}`) || ''])) }
  }
}
function restore (draft) {
  if (!draft) return
  for (const name of FIELDS) if (typeof draft[name] === 'string' && field(name)) field(name).value = draft[name]
}
const snapshot = () => Object.fromEntries(FIELDS.map(name => [name, field(name).value]).filter(([, v]) => v))

const submit = form.querySelector('[data-action="submit"]')
const status = form.querySelector('.form-status')

function clearErrors () {
  for (const e of form.querySelectorAll('.field-error')) e.remove()
  for (const e of form.querySelectorAll('[aria-invalid]')) { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-describedby') }
}
function flag (target, message) {
  const note = document.createElement('span')
  note.className = 'field-error'
  note.id = `err-${target.name.replace(/\W/g, '-')}`
  note.textContent = message
  target.setAttribute('aria-invalid', 'true')
  target.setAttribute('aria-describedby', note.id)
  target.closest('label')?.append(note)
}
function validate () {
  clearErrors()
  let first = null
  const fail = (target, message) => { flag(target, message); first ??= target }
  const message = field('contact.message')
  if (message.value.trim().length < 3) fail(message, t(M.required))
  const email = field('contact.email')
  if (!email.value.trim()) fail(email, t(M.required))
  else if (!email.validity.valid) fail(email, t(M.email))
  first?.focus()
  return !first
}

form.addEventListener('submit', async event => {
  event.preventDefault()
  if (!validate()) return
  submit.disabled = true
  status.className = 'form-status'
  status.textContent = t(M.sending)
  try {
    const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...collect(), id: requestId(), form_token: field('form_token').value, pc_hp: field('pc_hp').value }) })
    const body = await response.json().catch(() => ({}))
    if (response.ok) {
      storage.clear()
      const done = document.createElement('div')
      done.className = 'request-done'
      done.setAttribute('tabindex', '-1')
      const h = document.createElement('h3'); h.textContent = t(M.doneTitle)
      const p = document.createElement('p'); p.textContent = t(M.doneBody)
      const ref = document.createElement('p'); ref.className = 'section-note'; ref.textContent = t(M.reference, { id: body.id })
      done.append(h, p, ref)
      form.replaceChildren(done)
      done.focus()
      return
    }
    // A conflict means this id was already used for other answers: drop it, so the next send is
    // a new request instead of the same refusal forever.
    if (response.status === 409) { try { localStorage.removeItem(ID_KEY) } catch {} memoryId = undefined }
    const issues = (body.issues || []).map(i => `${i.path}: ${i.message}`).join('; ')
    status.className = 'form-status is-error'
    // The Worker answers in the form's language (/api/leads?lang=…, the form's action).
    status.textContent = `${body.message || t(M.notSent)}${issues ? ` (${issues})` : ''}`
  } catch {
    status.className = 'form-status is-error'
    status.textContent = t(M.offline)
  } finally {
    submit.disabled = false
  }
})

let saveTimer
form.addEventListener('input', () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => storage.set(snapshot()), 300) })

restore(storage.get())
// #endregion business-form
