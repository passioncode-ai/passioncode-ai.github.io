// SITE-068 v4, the comic. Act 0 is one scroll clock over a pinned stage (chat, then Morpheus rising, then the pills);
// the page ends there until a pill is chosen. The comic panels below reveal as they enter the screen, one event each,
// an arrow drawn to the next. Reduced motion: every state shown, nothing pinned.
import { mountCast } from '../cast.js'
import { mountRain } from '../rain.js'
import { mountSound } from './sound.js'

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
  if (menu) menu.value = lang
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

// The choice: the rest of the page stays hidden until a pill is chosen, so the scroll ends at the pills (the operator:
// «стоим и ждем пока он нажмет на таблетку»). Red goes to the comic, blue to the film first.
const after = $('#after'), film = $('#film'), act0 = $('#act0')
const choose = which => {
  after.hidden = false
  $('#sticky-cta').hidden = false
  act0.classList.add('chosen')
  film.hidden = which !== 'blue'
  if (which === 'blue') { const v = film.querySelector('video'); v.preload = 'auto'; v.play().catch(() => {}) }
  requestAnimationFrame(() => (which === 'blue' ? film : $('#comic')).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }))
}
document.querySelectorAll('[data-pill]').forEach(b => b.addEventListener('click', () => choose(b.dataset.pill)))
// A shared link can skip the choice: ?pill=red opens the comic (and #pN its panel), ?pill=blue the film.
const preset = new URLSearchParams(location.search).get('pill')
if (preset === 'red' || preset === 'blue') {
  choose(preset)
  const target = location.hash && document.querySelector(location.hash)
  if (target) requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto' })))
}
document.querySelector('.final-choice .pill.blue')?.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }) })

// The sticky button steps aside while the onboarding itself is on screen.
const sticky = $('#sticky-cta')
new IntersectionObserver(([e]) => sticky.classList.toggle('away', e.isIntersecting)).observe($('#onboard'))

// Panels and arrows: revealed once, as they enter the screen.
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return
  e.target.classList.add('in'); io.unobserve(e.target)
  if (!e.target.matches('.arrow')) sound.panel(e.target)
}), { threshold: 0.28 })
document.querySelectorAll('.panel, .arrow, .final-choice').forEach(el => reduce ? el.classList.add('in') : io.observe(el))
// Under reduced motion nothing reveals, so a line is spoken when its panel is mostly on screen.
if (reduce) {
  const quiet = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { sound.panel(e.target); quiet.unobserve(e.target) } }), { threshold: 0.5 })
  document.querySelectorAll('.panel, .final-choice').forEach(el => quiet.observe(el))
}

if (reduce) {
  root.classList.add('calm')
  document.querySelectorAll('.cchat .m').forEach(m => m.classList.add('on'))
  act0.style.setProperty('--rise', 1); act0.style.setProperty('--offer', 1)
} else {
  const rain = mountRain($('#rain'), () => state)
  const msgs = [...document.querySelectorAll('.cchat .m')]
  const state = { vel: 0, raw: 0 }
  let offered = false
  let lastY = scrollY
  const tick = () => {
    const r = act0.getBoundingClientRect(), travel = act0.offsetHeight - innerHeight
    const p = clamp(-r.top / travel)
    // beats: the chat speaks (0..0.46), the chat leaves and Morpheus rises (0.5..0.68), the pills come out (0.7..0.82)
    msgs.forEach(m => {
      const was = m.classList.contains('on'), now = p >= Number(m.dataset.at)
      m.classList.toggle('on', now)
      if (now && !was) (m.classList.contains('sys') ? sound.typing() : sound.message(m))
    })
    if (!offered && p >= 0.8) { offered = true; sound.say('choice') }
    act0.style.setProperty('--leave', seg(p, 0.5, 0.66))
    act0.style.setProperty('--rise', seg(p, 0.54, 0.7))
    act0.style.setProperty('--offer', seg(p, 0.72, 0.84))
    state.vel = clamp(state.vel * 0.9 + (scrollY - lastY) / innerHeight * 0.8, -1, 1); lastY = scrollY
    rain(state)
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
