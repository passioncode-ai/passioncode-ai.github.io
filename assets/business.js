// #region business-form — docs: docs/ux/scenarios.md#scn-014-request-an-ai-workplace-for-a-company
// The /business/ request form, enhanced. Without this script the form is one long page that
// posts to /api/leads and lands on /business/thanks/. With it: five steps with a progress
// bar, the savings estimate as you type, validation per step, a draft kept in this browser,
// and a JSON submission that stays on the page.
import { estimate, formatMoney } from './estimate.js'

const form = document.getElementById('lead-form')
const DRAFT_KEY = 'passioncode.business.draft.v1'
const ARRAYS = new Set(['goals', 'processes.areas', 'processes.tools', 'setup.constraints'])

const storage = {
  get () { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null') } catch { return null } },
  set (value) { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(value)) } catch {} },
  clear () { try { localStorage.removeItem(DRAFT_KEY) } catch {} }
}

// The form's answers as the lead/1 shape the Worker validates (worker/leads.js).
function collect () {
  const out = {}
  for (const element of form.elements) {
    if (!element.name || element.name === 'form_token' || element.name === 'company_fax' || element.disabled) continue
    if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) continue
    const path = element.name.split('.')
    let node = out
    for (const part of path.slice(0, -1)) node = node[part] ??= {}
    const leaf = path.at(-1)
    let value = element.value
    if (element.name === 'consent.privacy' || element.name === 'consent.marketing') value = true
    if (ARRAYS.has(element.name)) (node[leaf] ??= []).push(value)
    else node[leaf] = value
  }
  for (const name of ARRAYS) {
    const [a, b] = name.split('.')
    if (b) { out[a] ??= {}; out[a][b] ??= [] } else out[a] ??= []
  }
  out.consent ??= {}
  out.consent.privacy = out.consent.privacy === true
  out.consent.marketing = out.consent.marketing === true
  const params = new URLSearchParams(location.search)
  out.source = { referrer: document.referrer || '', utm: Object.fromEntries(['source', 'medium', 'campaign', 'term', 'content'].map(k => [k, params.get(`utm_${k}`) || ''])) }
  return out
}

function restore (draft) {
  if (!draft) return
  for (const element of form.elements) {
    if (!element.name || !(element.name in draft)) continue
    const saved = draft[element.name]
    if (element.type === 'checkbox' || element.type === 'radio') element.checked = [].concat(saved).includes(element.value)
    else element.value = saved
  }
}
function snapshot () {
  const draft = {}
  for (const element of form.elements) {
    if (!element.name || element.name === 'form_token' || element.name === 'company_fax' || element.type === 'submit' || element.type === 'button') continue
    if (element.type === 'checkbox' || element.type === 'radio') {
      if (element.checked) draft[element.name] = element.type === 'checkbox' ? [...(draft[element.name] || []), element.value] : element.value
    } else if (element.value) draft[element.name] = element.value
  }
  return draft
}

// ---- estimate -------------------------------------------------------------------------
const output = form.querySelector('.estimate-output')
function renderEstimate () {
  const state = form.querySelector('[name="processes.currentState"]:checked')?.value
  const e = estimate({
    hoursPerWeek: form.elements['processes.hoursPerWeek'].value,
    hourlyCost: form.elements['processes.hourlyCost'].value,
    currentState: state,
    currency: form.elements['processes.currency'].value
  })
  output.classList.toggle('has-value', Boolean(e))
  output.replaceChildren()
  if (!e) {
    const span = document.createElement('span')
    span.className = 'estimate-empty'
    span.textContent = 'Fill in the hours, the cost and how the work runs today to see the estimate.'
    output.append(span)
    return
  }
  const lead = document.createElement('span')
  lead.textContent = 'Agents could take over about'
  const figure = document.createElement('strong')
  figure.textContent = `${formatMoney(e.monthlySavings[0], e.currency)}–${formatMoney(e.monthlySavings[1], e.currency)} a month`
  const detail = document.createElement('small')
  detail.textContent = `${e.hoursSavedPerMonth[0]}–${e.hoursSavedPerMonth[1]} hours a month. An estimate from the formula above, not a promise; the pilot measures the real number.`
  output.append(lead, figure, detail)
}

// ---- steps and validation ----------------------------------------------------------------
const steps = [...form.querySelectorAll('.form-step')]
const progress = [...form.querySelectorAll('.form-progress li')]
const back = form.querySelector('[data-action="back"]')
const next = form.querySelector('[data-action="next"]')
const submit = form.querySelector('[data-action="submit"]')
const status = form.querySelector('.form-status')
let current = 0

function clearErrors (scope) {
  for (const e of scope.querySelectorAll('.field-error')) e.remove()
  for (const e of scope.querySelectorAll('[aria-invalid]')) e.removeAttribute('aria-invalid')
  for (const e of scope.querySelectorAll('.is-invalid')) e.classList.remove('is-invalid')
}
function flag (target, message) {
  const note = document.createElement('span')
  note.className = 'field-error'
  note.id = `err-${Math.random().toString(36).slice(2, 8)}`
  note.textContent = message
  if (target.matches('input, select, textarea')) {
    target.setAttribute('aria-invalid', 'true')
    target.setAttribute('aria-describedby', note.id)
    target.closest('label')?.append(note)
  } else {
    target.classList.add('is-invalid')
    target.after(note)
  }
}
function validate (step) {
  clearErrors(step)
  let first = null
  const fail = (target, message, focus) => { flag(target, message); first ??= focus || target }
  for (const group of step.querySelectorAll('.choices[role="group"]')) {
    const name = group.querySelector('input')?.name
    if ((name === 'goals' || name === 'processes.areas') && !group.querySelector('input:checked')) fail(group, 'Choose at least one.', group.querySelector('input'))
  }
  for (const group of step.querySelectorAll('.choices[role="radiogroup"]')) {
    if (group.querySelector('input[required]') && !group.querySelector('input:checked')) fail(group, 'Choose one.', group.querySelector('input'))
  }
  for (const field of step.querySelectorAll('input[required]:not([type="radio"]):not([type="checkbox"]), select[required]')) {
    if (!field.value.trim()) fail(field, 'Required.')
    else if (field.type === 'email' && !field.validity.valid) fail(field, 'A work email address.')
  }
  const consent = step.querySelector('[name="consent.privacy"]')
  if (consent && !consent.checked) fail(consent.closest('.consent'), 'Agree to the privacy notice to send the request.', consent)
  first?.focus()
  return !first
}

function show (index) {
  current = index
  steps.forEach((step, i) => step.classList.toggle('is-current', i === index))
  progress.forEach((item, i) => { item.classList.toggle('is-current', i === index); item.classList.toggle('is-done', i < index) })
  back.hidden = index === 0
  next.hidden = index === steps.length - 1
  submit.hidden = index !== steps.length - 1
}

back.addEventListener('click', () => { show(Math.max(0, current - 1)); steps[current].querySelector('legend')?.scrollIntoView({ block: 'nearest' }) })
next.addEventListener('click', () => {
  if (!validate(steps[current])) return
  show(Math.min(steps.length - 1, current + 1))
  const firstInput = steps[current].querySelector('input:not([type="hidden"]), select, textarea')
  firstInput?.focus({ preventScroll: true })
  form.scrollIntoView({ block: 'start' })
})

form.addEventListener('submit', async event => {
  event.preventDefault()
  for (const [i, step] of steps.entries()) if (!validate(step)) { show(i); return }
  submit.disabled = true
  status.className = 'form-status'
  status.textContent = 'Sending…'
  try {
    const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...collect(), form_token: form.elements.form_token.value, company_fax: form.elements.company_fax.value }) })
    const body = await response.json().catch(() => ({}))
    if (response.ok) {
      storage.clear()
      const done = document.createElement('div')
      done.className = 'request-done'
      done.setAttribute('tabindex', '-1')
      const h = document.createElement('h3'); h.textContent = 'Thank you — it reached us'
      const p = document.createElement('p'); p.textContent = 'We reply within two business days. A copy with your reference is on its way to your inbox.'
      const ref = document.createElement('p'); ref.className = 'section-note'; ref.textContent = `Reference: ${body.id}`
      done.append(h, p, ref)
      form.replaceChildren(done)
      done.focus()
      return
    }
    const issues = (body.issues || []).map(i => `${i.path}: ${i.message}`).join('; ')
    status.className = 'form-status is-error'
    status.textContent = `${body.message || 'The request was not sent.'}${issues ? ` (${issues})` : ''}`
  } catch {
    status.className = 'form-status is-error'
    status.textContent = 'The request did not leave your browser — check your connection and send it again. Your answers are kept here.'
  } finally {
    submit.disabled = false
  }
})

let saveTimer
form.addEventListener('input', () => { renderEstimate(); clearTimeout(saveTimer); saveTimer = setTimeout(() => storage.set(snapshot()), 300) })
form.addEventListener('change', renderEstimate)

restore(storage.get())
renderEstimate()
form.classList.add('is-stepped')
show(0)
// #endregion business-form
