// #region business-form — docs: docs/ux/scenarios.md#scn-014-request-an-ai-workplace-for-a-company
// The /business/ request form, enhanced. Without this script the form is one long page that
// posts to /api/leads and lands on /business/thanks/. With it: five steps with a progress
// bar, the savings estimate as you type, validation per step, a draft kept in this browser,
// and a JSON submission that stays on the page.
import { estimate, formatMoney } from './estimate.js'

// What this script says, in the page's language (<html lang>, /ru/business/ is Russian). The form's
// own labels are in the HTML; these are the words the script adds.
const TEXT = {
  en: {
    estimateEmpty: 'Fill in the hours, the cost and how the work runs today to see the estimate.',
    estimateLead: 'Agents could take over about',
    perMonth: 'a month',
    estimateDetail: (low, high) => `${low}–${high} hours a month. An estimate from the formula above, not a promise; the pilot measures the real number.`,
    chooseAny: 'Choose at least one.',
    chooseOne: 'Choose one.',
    required: 'Required.',
    email: 'A work email address.',
    consent: 'Agree to the privacy notice to send the request.',
    sending: 'Sending…',
    doneTitle: 'Thank you — it reached us',
    doneBody: 'We reply within two business days. A confirmation email usually follows within minutes.',
    reference: id => `Reference: ${id}`,
    notSent: 'The request was not sent.',
    offline: 'The request did not leave your browser — check your connection and send it again. Your answers are kept here.'
  },
  ru: {
    estimateEmpty: 'Укажите часы, стоимость и то, как работа устроена сегодня, — и увидите оценку.',
    estimateLead: 'Агенты могли бы взять на себя примерно',
    perMonth: 'в месяц',
    estimateDetail: (low, high) => `${low}–${high} ч в месяц. Это оценка по формуле выше, а не обещание; реальную цифру измерит пилот.`,
    chooseAny: 'Выберите хотя бы один вариант.',
    chooseOne: 'Выберите один вариант.',
    required: 'Обязательное поле.',
    email: 'Нужен рабочий адрес почты.',
    consent: 'Чтобы отправить заявку, согласитесь с уведомлением о конфиденциальности.',
    sending: 'Отправляем…',
    doneTitle: 'Спасибо, заявка у нас',
    doneBody: 'Мы ответим в течение двух рабочих дней. Письмо-подтверждение обычно приходит в течение нескольких минут.',
    reference: id => `Номер заявки: ${id}`,
    notSent: 'Заявка не отправлена.',
    offline: 'Заявка не ушла из браузера — проверьте подключение и отправьте её снова. Ответы сохранены здесь.'
  }
}
const locale = document.documentElement.lang === 'ru' ? 'ru' : 'en'
const t = TEXT[locale]

const form = document.getElementById('lead-form')
const DRAFT_KEY = 'passioncode.business.draft.v1'
const ID_KEY = 'passioncode.business.request-id.v1'
const ARRAYS = new Set(['goals', 'processes.areas', 'processes.tools', 'setup.constraints'])

const storage = {
  get () { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null') } catch { return null } },
  set (value) { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(value)) } catch {} },
  clear () { try { localStorage.removeItem(DRAFT_KEY); localStorage.removeItem(ID_KEY) } catch {} }
}
// One id per request, kept with the draft: a resend after a lost answer is recognised by the
// Worker as the same request, not a second one.
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
const SAFE_NAME = /^[a-z]+(?:\.[a-zA-Z]+)*$/

// The form's answers as the lead/1 shape the Worker validates (worker/leads.js).
function collect () {
  const out = {}
  for (const element of form.elements) {
    if (!element.name || element.name === 'form_token' || element.name === 'pc_hp' || element.disabled || !SAFE_NAME.test(element.name)) continue
    if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) continue
    const path = element.name.split('.')
    let node = out
    for (const part of path.slice(0, -1)) node = Object.hasOwn(node, part) ? node[part] : (node[part] = {})
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
    if (!element.name || element.name === 'form_token' || element.name === 'pc_hp' || element.type === 'submit' || element.type === 'button') continue
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
    span.textContent = t.estimateEmpty
    output.append(span)
    return
  }
  const lead = document.createElement('span')
  lead.textContent = t.estimateLead
  const figure = document.createElement('strong')
  figure.textContent = `${formatMoney(e.monthlySavings[0], e.currency, locale)}–${formatMoney(e.monthlySavings[1], e.currency, locale)} ${t.perMonth}`
  const detail = document.createElement('small')
  detail.textContent = t.estimateDetail(e.hoursSavedPerMonth[0], e.hoursSavedPerMonth[1])
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
    if ((name === 'goals' || name === 'processes.areas') && !group.querySelector('input:checked')) fail(group, t.chooseAny, group.querySelector('input'))
  }
  for (const group of step.querySelectorAll('.choices[role="radiogroup"]')) {
    if (group.querySelector('input[required]') && !group.querySelector('input:checked')) fail(group, t.chooseOne, group.querySelector('input'))
  }
  for (const field of step.querySelectorAll('input[required]:not([type="radio"]):not([type="checkbox"]), select[required]')) {
    if (!field.value.trim()) fail(field, t.required)
    else if (field.type === 'email' && !field.validity.valid) fail(field, t.email)
  }
  const consent = step.querySelector('[name="consent.privacy"]')
  if (consent && !consent.checked) fail(consent.closest('.consent'), t.consent, consent)
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
  status.textContent = t.sending
  try {
    const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...collect(), id: requestId(), form_token: form.elements.form_token.value, pc_hp: form.elements.pc_hp.value }) })
    const body = await response.json().catch(() => ({}))
    if (response.ok) {
      storage.clear()
      const done = document.createElement('div')
      done.className = 'request-done'
      done.setAttribute('tabindex', '-1')
      const h = document.createElement('h3'); h.textContent = t.doneTitle
      const p = document.createElement('p'); p.textContent = t.doneBody
      const ref = document.createElement('p'); ref.className = 'section-note'; ref.textContent = t.reference(body.id)
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
    status.textContent = `${body.message || t.notSent}${issues ? ` (${issues})` : ''}`
  } catch {
    status.className = 'form-status is-error'
    status.textContent = t.offline
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
