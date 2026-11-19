// SITE-068 v6, the story (the operator, 2026-11-19). No header at first: the white rabbit hops in, Morpheus offers the
// pills, the page ends there. Blue: the film «Пробуждение» over the whole screen, and at its end the pills again (blue
// plays it again, red goes on). Red: the film «Предыстория» (Morpheus tells how the founders' world fell into chaos),
// then the big chat where Morpheus and Trinity explain why the release slipped, then the comic of sync, escalation and
// assessment, the company that runs on agents, and the end: Morpheus's chat in Telegram, X and LinkedIn.
// The page leafs one frame per gesture (pager.js), a frame holds while a line speaks (sound.js), the side diagram and
// the white rabbit follow the frames (rail.js). Reduced motion: every state shown, nothing pinned, nothing leafed.
import { mountCast } from '../cast.js'
import { mountRain } from '../rain.js'
import { mountSound } from './sound.js'
import { mountPager } from './pager.js'
import { mountRail, RABBIT } from './rail.js'

const root = document.documentElement
const $ = s => document.querySelector(s)
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const params = new URLSearchParams(location.search)
mountCast()
const sound = mountSound({ reduce })
requestAnimationFrame(() => root.classList.add('ready'))
root.classList.add('intro-state')

// Language: ?lang=, then the saved choice, then the browser; ten languages (scripts/comic-i18n.py), the menu switches.
// Morpheus's chat opens with the reader's language, so the bot greets them in it.
const LANGS = ['en', 'ru', 'de', 'es', 'fr', 'ja', 'ko', 'pl', 'pt-BR', 'zh-Hans']
const pick = v => LANGS.find(l => l.toLowerCase() === String(v || '').toLowerCase())
  || LANGS.find(l => l.slice(0, 2) === String(v || '').toLowerCase().slice(0, 2))
const menu = $('#lang-menu')
const setLang = lang => {
  root.dataset.lang = lang; root.lang = lang
  if (menu) menu.value = (lang === 'en' || lang === 'ru') ? '' : lang
  document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)))
  document.querySelectorAll('[data-tg]').forEach(a => { a.href = `https://t.me/MorpheusPMBot?start=lp_assessment_${lang === 'ru' ? 'ru' : 'en'}` })
  try { localStorage.setItem('story-lang', lang) } catch {}
}
let saved = null
try { saved = localStorage.getItem('story-lang') } catch {}
setLang(pick(params.get('lang')) || pick(saved) || pick(navigator.language) || 'en')
menu?.addEventListener('change', () => setLang(menu.value))
document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)))

const after = $('#after'), act0 = $('#act0'), chat = $('#chat')
const panels = [...document.querySelectorAll('.panel'), $('#final')]
const sticky = $('#sticky-cta')
const msgs = [...chat.querySelectorAll('.bc-msgs .m')]
chat.style.setProperty('--beats', msgs.length)

// The side diagram and the white rabbit: one node per frame, the end last.
const rail = mountRail({ panels, labelOf: p => p.querySelector('h2')?.innerHTML || p.querySelector('.final-line')?.innerHTML || '' })
rail.el.addEventListener('rail:go', e => { const s = pager?.list().findIndex(x => x.el === panels[e.detail]); if (s >= 0) pager.go(s) })

// The intro: the rabbit hops in from the left, then Morpheus rises with the pills.
const bunny = document.createElement('span')
bunny.className = 'rabbit intro-rabbit'
bunny.innerHTML = RABBIT
act0.querySelector('.act0-stage').appendChild(bunny)
act0.querySelectorAll('[data-pill]').forEach(b => b.addEventListener('pointerenter', () => { bunny.dataset.look = b.dataset.pill }))
const offer = () => { act0.classList.add('offered'); sound.say('choice') }
if (reduce) act0.classList.add('hopped', 'offered')
else { setTimeout(() => act0.classList.add('hopped'), 350); setTimeout(offer, 2000) }

// Frames revealed once, as they come into view (and on arrival, when the pager brings them): the line in them speaks.
const reveal = el => { if (el && !el.classList.contains('in')) { el.classList.add('in'); sound.panel(el) } }
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target) } }), { threshold: 0.55 })
document.querySelectorAll('.panel, .final-choice').forEach(el => io.observe(el))

// The chat: one message per leaf; a message from Morpheus or Trinity speaks, and the page waits for it.
const chatTravel = () => chat.offsetHeight - innerHeight
const chatTop = () => chat.getBoundingClientRect().top + scrollY
const chatStops = () => msgs.map(m => ({ y: chatTop() + Number(m.dataset.at) * chatTravel() + 2, el: chat, msg: m }))
const showMsgs = p => msgs.forEach(m => {
  const was = m.classList.contains('on'), now = reduce || p >= Number(m.dataset.at)
  m.classList.toggle('on', now)
  if (now && !was && !reduce) (m.classList.contains('sys') ? sound.typing() : sound.message(m))
})

// The frames the pager leafs: the intro, then (after the choice) each chat message, each panel and the end.
const stops = () => {
  const list = [{ y: 0, el: act0 }]
  if (after.hidden) return list
  list.push(...chatStops())
  after.querySelectorAll('.panel, .final-choice').forEach(el => {
    const r = el.getBoundingClientRect(), y = r.top + scrollY, h = r.height, vh = innerHeight
    if (h <= vh * 0.92) list.push({ y: Math.max(0, y + h / 2 - vh / 2), el })
    else { list.push({ y: y - vh * 0.06, el }); list.push({ y: y + h - vh * 0.94, el, tail: true }) }
  })
  return list
}
const filmOpen = () => !!document.querySelector('.film-full:not([hidden])')
const holdBar = document.body.appendChild(Object.assign(document.createElement('div'), { className: 'hold-bar', innerHTML: '<i></i>' }))
holdBar.setAttribute('aria-hidden', 'true')
const pager = reduce ? null : mountPager({
  stops, busy: () => sound.busy(), enabled: () => !filmOpen(),
  onArrive: s => {
    if (s.msg) { showMsgs(Number(s.msg.dataset.at)); return }
    if (!s.el || s.el === act0) return
    reveal(s.el); const i = panels.indexOf(s.el); if (i >= 0) rail.set(i)
  },
  // a gesture made while a line speaks waits for it; the bar shows how long (a second gesture goes on at once)
  onWait: () => { holdBar.style.setProperty('--ms', Math.max(400, sound.left()) + 'ms'); holdBar.classList.remove('on'); void holdBar.offsetWidth; holdBar.classList.add('on') },
  onWaitEnd: () => holdBar.classList.remove('on'),
  onBlocked: () => { if (after.hidden) { bunny.classList.remove('nudge'); void bunny.offsetWidth; bunny.classList.add('nudge') } },
})
if (params.has('debug') || window.__pagerLog) window.__pager = pager  // checks only (a test sets __pagerLog)
// The rail follows a reader who scrolls by hand too (the scrollbar, a reduced-motion reader).
const railIo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const i = panels.indexOf(e.target); if (i >= 0) rail.set(i) } }), { threshold: 0.6 })
panels.forEach(p => railIo.observe(p))

// Red: into the story. The chat, the comic and the end appear; the page leafs to the first message.
const enterMatrix = () => {
  after.hidden = false
  sticky.hidden = false
  root.classList.remove('intro-state')
  act0.classList.add('chosen')
  rail.show(true)
  rail.set(0)
  if (reduce) showMsgs(1)
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (pager) { pager.refresh(); pager.go(1) } else chat.scrollIntoView({ behavior: 'auto' })
  }))
}

// A film over the whole screen, in the reader's language (Russian or English voices; the other languages hear English
// and read the captions). On a phone held upright the player turns to landscape (v6.css), or the screen locks to it.
const mountFilm = (sec, onEnd) => {
  const video = sec.querySelector('video'), subs = [...sec.querySelectorAll('.film-subs li')]
  const src = () => video.dataset[root.dataset.lang === 'ru' ? 'srcRu' : 'srcEn']
  video.addEventListener('timeupdate', () => subs.forEach(li => li.classList.toggle('on', video.currentTime >= +li.dataset.from && video.currentTime < +li.dataset.to)))
  video.addEventListener('ended', onEnd)
  const open = () => {
    if (video.getAttribute('src') !== src()) video.src = src()
    video.muted = !sound.live()
    sec.hidden = false
    const end = sec.querySelector('.film-end'); if (end) end.hidden = true
    root.classList.add('film-open')
    sound.hush(true)
    try {
      if (sec.requestFullscreen && !document.fullscreenElement) {
        sec.requestFullscreen().then(() => screen.orientation?.lock?.('landscape')).catch(() => {})
      }
    } catch {}
    video.preload = 'auto'; video.currentTime = 0
    video.play().catch(() => { video.controls = true })  // a browser that refuses to play shows the player's own button
  }
  const close = () => {
    video.pause()
    try { screen.orientation?.unlock?.() } catch {}
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    sec.hidden = true
    if (!filmOpen()) root.classList.remove('film-open')
    sound.hush(false)
  }
  return { sec, video, open, close, isOpen: () => !sec.hidden }
}

const awake = mountFilm($('#film'), () => { awake.sec.querySelector('.film-end').hidden = false; sound.say('again') })
const story = mountFilm($('#backstory'), () => { story.close(); enterMatrix() })
const openBackstory = () => { bunny.classList.add('jump-red'); story.open() }
awake.sec.addEventListener('click', e => {
  const b = e.target.closest('[data-film]')
  if (!b) return
  const which = b.dataset.film
  if (which === 'blue') {        // wakes at the desk again: the film plays from the start
    sound.forget('again')
    awake.sec.querySelector('.film-end').hidden = true; awake.video.currentTime = 0; awake.video.play().catch(() => {})
  } else if (which === 'red') {  // goes on: the backstory, then the chat
    awake.close(); openBackstory()
  } else {                        // closed: back to the pills
    awake.close(); bunny.classList.remove('jump-blue'); pager?.go(0)
  }
})
story.sec.addEventListener('click', e => { if (e.target.closest('[data-film="skip"]')) { story.close(); enterMatrix() } })
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return
  if (story.isOpen()) { story.close(); enterMatrix() } else if (awake.isOpen()) { awake.close(); bunny.classList.remove('jump-blue'); pager?.go(0) }
})
// leaving full screen during a film: the backstory goes on into the chat, the awakening closes back to the pills
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) return
  if (story.isOpen()) { story.close(); enterMatrix() }
  else if (awake.isOpen() && awake.sec.querySelector('.film-end').hidden && !awake.video.ended) { awake.close(); bunny.classList.remove('jump-blue') }
})

const choose = which => {
  if (which === 'blue') { if (!reduce) bunny.classList.add('jump-blue'); awake.open() } else openBackstory()
}
act0.querySelectorAll('[data-pill]').forEach(b => b.addEventListener('click', () => choose(b.dataset.pill)))
// A shared link can skip the choice: ?pill=red opens the chat (and #pN its panel), ?pill=backstory and ?pill=blue a film.
const preset = params.get('pill')
if (preset === 'red') {
  enterMatrix()
  const target = location.hash && document.querySelector(location.hash)
  if (target) requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'auto' }); const i = panels.indexOf(target); if (i >= 0) rail.set(i)
  })))
} else if (preset === 'backstory') story.open()
else if (preset === 'blue') awake.open()

// The sticky button steps aside while the end itself is on screen.
new IntersectionObserver(([e]) => sticky.classList.toggle('away', e.isIntersecting)).observe($('#final'))

// the chat also follows plain scroll events: a page in a background or low-power tab gets few animation frames
const chatByScroll = () => {
  if (after.hidden || reduce) return
  const r = chat.getBoundingClientRect()
  if (r.bottom > 0 && r.top < innerHeight) showMsgs(clamp(-r.top / chatTravel()) + 0.001)
}
addEventListener('scroll', chatByScroll, { passive: true })

if (reduce) {
  root.classList.add('calm')
  showMsgs(1)
} else {
  const rain = mountRain($('#rain'), () => state)
  const state = { vel: 0, raw: 0 }
  let lastY = scrollY
  const tick = () => {
    // a reader who scrolls by hand (the scrollbar) still sees the chat speak in order
    if (!after.hidden) {
      const r = chat.getBoundingClientRect()
      if (r.bottom > 0 && r.top < innerHeight) showMsgs(clamp(-r.top / chatTravel()) + 0.001)
    }
    state.vel = clamp(state.vel * 0.9 + (scrollY - lastY) / innerHeight * 0.8, -1, 1); lastY = scrollY
    rain(state)
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
