// SITE-068 v5, the comic. Act 0 is one scroll clock over a pinned stage (chat, then Morpheus rising, then the pills);
// the page ends there until a pill is chosen. v5 (the operator, 2026-11-18): the page leafs one frame per gesture
// (pager.js), a frame holds while its line speaks (sound.js), a side diagram draws the chain as the reader goes and the
// white rabbit leads it (rail.js); the rabbit peeks under the pills and jumps toward the one pressed. Blue opens the
// film over the whole screen; at its end Morpheus offers the pills again: blue plays it again, red follows the rabbit.
// Reduced motion: every state shown, nothing pinned, nothing leafed.
import { mountCast } from '../cast.js'
import { mountRain } from '../rain.js'
import { mountSound } from './sound.js'
import { mountPager } from './pager.js'
import { mountRail, RABBIT } from './rail.js'

const root = document.documentElement
const $ = s => document.querySelector(s)
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (v, a, b) => clamp((v - a) / (b - a))
mountCast()
const sound = mountSound({ reduce })
// The header as on the story page: one staggered reveal; its preview chat shows its last state.
requestAnimationFrame(() => root.classList.add('ready'))
document.querySelectorAll('#mini li').forEach(li => li.classList.add('on'))

// Language: ?lang=, then the saved choice, then the browser; ten languages (scripts/comic-i18n.py), the menu switches.
const LANGS = ['en', 'ru', 'de', 'es', 'fr', 'ja', 'ko', 'pl', 'pt-BR', 'zh-Hans']
const pick = v => LANGS.find(l => l.toLowerCase() === String(v || '').toLowerCase())
  || LANGS.find(l => l.slice(0, 2) === String(v || '').toLowerCase().slice(0, 2))
const menu = $('#lang-menu')
const setLang = lang => {
  root.dataset.lang = lang; root.lang = lang
  if (menu) menu.value = (lang === 'en' || lang === 'ru') ? '' : lang
  document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)))
  try { localStorage.setItem('story-lang', lang) } catch {}
}
let saved = null
try { saved = localStorage.getItem('story-lang') } catch {}
setLang(pick(new URLSearchParams(location.search).get('lang')) || pick(saved) || pick(navigator.language) || 'en')
menu?.addEventListener('change', () => setLang(menu.value))
document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)))

// Speech in a panel pops in order: the n-th line waits n * 450 ms after the panel enters.
document.querySelectorAll('.panel').forEach(p => p.querySelectorAll('.say').forEach((s, i) => s.style.setProperty('--d', 250 + i * 450)))

const after = $('#after'), film = $('#film'), act0 = $('#act0'), video = film.querySelector('video'), end = film.querySelector('.film-end')
const panels = [...document.querySelectorAll('.panel'), $('#final')]
const sticky = $('#sticky-cta')

// The side diagram and the white rabbit: one node per frame, the final choice last.
const rail = mountRail({ panels, labelOf: p => p.querySelector('h2')?.innerHTML || '' })
rail.el.addEventListener('rail:go', e => { const s = pager?.list().findIndex(x => x.el === panels[e.detail]); if (s >= 0) pager.go(s) })

// The rabbit under the pills: it peeks while the pills are offered and jumps toward the one pressed.
const rise = act0.querySelector('.rise')
const bunny = document.createElement('span')
bunny.className = 'rabbit act0-rabbit'
bunny.innerHTML = RABBIT
rise.appendChild(bunny)
act0.querySelectorAll('[data-pill]').forEach(b => b.addEventListener('pointerenter', () => { bunny.dataset.look = b.dataset.pill }))

// Panels and arrows: revealed once, as they come into view (and on arrival, when the pager brings them).
const reveal = el => { if (el && !el.classList.contains('in')) { el.classList.add('in'); if (!el.matches('.arrow')) sound.panel(el) } }
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target) } }), { threshold: 0.55 })
const ioArrow = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ioArrow.unobserve(e.target) } }), { threshold: 0.28 })
document.querySelectorAll('.panel, .final-choice').forEach(el => reduce ? el.classList.add('in') : io.observe(el))
document.querySelectorAll('.arrow').forEach(el => reduce ? el.classList.add('in') : ioArrow.observe(el))

// The frames the pager leafs: the header, the beats of act 0, then (after the choice) each panel, strip and the end.
const BEATS = [0.08, 0.15, 0.22, 0.29, 0.38, 0.46, 0.7, 0.86]
const stops = () => {
  const list = [{ y: 0, el: null }]
  const top = act0.offsetTop, travel = act0.offsetHeight - innerHeight
  BEATS.forEach(p => list.push({ y: top + p * travel, el: act0, beat: p }))
  if (!after.hidden) after.querySelectorAll('.panel, .cta-strip, .final-choice, .onboard').forEach(el => {
    const r = el.getBoundingClientRect(), y = r.top + scrollY, h = r.height, vh = innerHeight
    if (h <= vh * 0.92) list.push({ y: Math.max(0, y + h / 2 - vh / 2), el })
    else { list.push({ y: y - vh * 0.06, el }); list.push({ y: y + h - vh * 0.94, el, tail: true }) }
  })
  return list
}
const filmOpen = () => !film.hidden
const holdBar = document.body.appendChild(Object.assign(document.createElement('div'), { className: 'hold-bar', innerHTML: '<i></i>' }))
holdBar.setAttribute('aria-hidden', 'true')
const pager = reduce ? null : mountPager({
  stops, busy: () => sound.busy(), enabled: () => !filmOpen(),
  onArrive: s => { if (!s.el || s.el === act0) return; reveal(s.el); const i = panels.indexOf(s.el); if (i >= 0) rail.set(i) },
  // a gesture made while Morpheus speaks waits for the line; the bar shows how long (a second gesture goes on at once)
  onWait: () => { holdBar.style.setProperty('--ms', Math.max(400, sound.left()) + 'ms'); holdBar.classList.remove('on'); void holdBar.offsetWidth; holdBar.classList.add('on') },
  onWaitEnd: () => holdBar.classList.remove('on'),
  onBlocked: () => { if (after.hidden) { bunny.classList.remove('nudge'); void bunny.offsetWidth; bunny.classList.add('nudge') } },
})

if (new URLSearchParams(location.search).has('debug')) window.__pager = pager  // checks only
// The rail follows a reader who scrolls by hand too (the scrollbar, a reduced-motion reader).
const railIo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const i = panels.indexOf(e.target); if (i >= 0) rail.set(i) } }), { threshold: 0.6 })
panels.forEach(p => railIo.observe(p))

// The choice: the rest of the page stays hidden until a pill is chosen, so the scroll ends at the pills (the operator:
// «стоим и ждем пока он нажмет на таблетку»). Red goes into the Matrix after the rabbit, blue opens the film.
const firstPanelStop = () => pager?.list().findIndex(s => s.el === panels[0]) ?? -1
const enterMatrix = ({ jump = true } = {}) => {
  after.hidden = false
  sticky.hidden = false
  act0.classList.add('chosen')
  rail.show(true)
  rail.set(0)
  // the rabbit leaves the pills for the diagram: it jumps to the red pill's side and off, the rail's rabbit lands
  if (jump && !reduce) {
    bunny.classList.add('jump-red')
    rail.bunny.classList.add('land')
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (pager) { pager.refresh(); const i = firstPanelStop(); if (i >= 0) pager.go(i) }
    else $('#comic').scrollIntoView({ behavior: 'auto' })
  }))
}
// The film's sound: Russian or English voices; other languages hear the English track and read the captions.
const subs = [...film.querySelectorAll('.film-subs li')]
const filmSrc = () => video.dataset[root.dataset.lang === 'ru' ? 'srcRu' : 'srcEn']
video.addEventListener('timeupdate', () => subs.forEach(li => li.classList.toggle('on', video.currentTime >= +li.dataset.from && video.currentTime < +li.dataset.to)))
const openFilm = () => {
  if (video.getAttribute('src') !== filmSrc()) video.src = filmSrc()
  video.muted = !sound.live()
  film.hidden = false
  end.hidden = true
  root.classList.add('film-open')
  if (!reduce) bunny.classList.add('jump-blue')
  try { if (film.requestFullscreen && !document.fullscreenElement) film.requestFullscreen().catch(() => {}) } catch {}
  video.preload = 'auto'; video.currentTime = 0
  video.play().catch(() => { video.controls = true })  // a browser that refuses to play shows the player's own button
}
const closeFilm = () => {
  video.pause()
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
  film.hidden = true
  root.classList.remove('film-open')
  bunny.classList.remove('jump-blue')
}
video.addEventListener('ended', () => { end.hidden = false; sound.say('again') })
film.addEventListener('click', e => {
  const b = e.target.closest('[data-film]')
  if (!b) return
  const which = b.dataset.film
  if (which === 'blue') {        // wakes at the desk again: the film plays from the start
    sound.forget('again')
    end.hidden = true; video.currentTime = 0; video.play().catch(() => {})
  } else if (which === 'red') {  // follows the white rabbit into the Matrix
    closeFilm(); enterMatrix({ jump: false })
  } else {                        // closed: back to the pills
    closeFilm()
    if (pager) { const i = pager.list().length - 1; pager.go(i) }
  }
})
addEventListener('keydown', e => { if (e.key === 'Escape' && filmOpen()) { closeFilm(); if (pager) pager.go(pager.list().length - 1) } })
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && filmOpen() && !video.paused && !end.hidden) closeFilm() })

const choose = which => (which === 'blue' ? openFilm() : enterMatrix())
act0.querySelectorAll('[data-pill]').forEach(b => b.addEventListener('click', () => choose(b.dataset.pill)))
// A shared link can skip the choice: ?pill=red opens the comic (and #pN its panel), ?pill=blue the film.
const preset = new URLSearchParams(location.search).get('pill')
if (preset === 'red') {
  enterMatrix({ jump: false })
  const target = location.hash && document.querySelector(location.hash)
  if (target) requestAnimationFrame(() => requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'auto' }); const i = panels.indexOf(target); if (i >= 0) rail.set(i)
  }))
} else if (preset === 'blue') openFilm()
document.querySelector('.final-choice .pill.blue')?.addEventListener('click', e => {
  e.preventDefault()
  if (pager) pager.go(0); else scrollTo({ top: 0, behavior: 'auto' })
})

// The sticky button steps aside while the onboarding itself is on screen.
new IntersectionObserver(([e]) => sticky.classList.toggle('away', e.isIntersecting)).observe($('#onboard'))

if (reduce) {
  root.classList.add('calm')
  document.querySelectorAll('.cchat .m').forEach(m => m.classList.add('on'))
  act0.style.setProperty('--rise', 1); act0.style.setProperty('--offer', 1)
} else {
  const rain = mountRain($('#rain'), () => state)
  const msgs = [...document.querySelectorAll('.cchat .m')]
  const state = { vel: 0, raw: 0 }
  let lastY = scrollY, offered = false
  const tick = () => {
    const r = act0.getBoundingClientRect(), travel = act0.offsetHeight - innerHeight
    const p = clamp(-r.top / travel)
    // beats: the chat speaks (0..0.46), the chat leaves and Morpheus rises (0.5..0.68), the pills come out (0.7..0.82)
    msgs.forEach(m => {
      const was = m.classList.contains('on'), now = p >= Number(m.dataset.at)
      m.classList.toggle('on', now)
      if (now && !was) (m.classList.contains('sys') ? sound.typing() : sound.message(m))
    })
    act0.style.setProperty('--leave', seg(p, 0.5, 0.66))
    act0.style.setProperty('--rise', seg(p, 0.54, 0.7))
    act0.style.setProperty('--offer', seg(p, 0.72, 0.84))
    bunny.classList.toggle('peek', p >= 0.8)
    if (!offered && p >= 0.8) { offered = true; sound.say('choice') }
    state.vel = clamp(state.vel * 0.9 + (scrollY - lastY) / innerHeight * 0.8, -1, 1); lastY = scrollY
    rain(state)
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
