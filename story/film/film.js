// Variant B (SITE-068): the scroll cartoon. scrolly-video (MIT, vendored) decodes the film and follows the track's
// scroll; this file adds the chapter captions and Morpheus's voice-over on the same progress. The film is
// /story/film/cut.mp4 when the generated cartoon exists, else the draft cut standin.mp4.
import { mountRain } from '../rain.js'
import { mountVoice } from '../voice.js'

const CHAPTERS = 11
const root = document.documentElement
const $ = id => document.getElementById(id)
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

const setLang = lang => {
  root.dataset.lang = lang; root.lang = lang
  document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)))
  try { localStorage.setItem('story-lang', lang) } catch {}
}
let saved = null
try { saved = localStorage.getItem('story-lang') } catch {}
setLang(new URLSearchParams(location.search).get('lang') || saved || ((navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en'))
document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)))

// Captions: the comic's own chapter titles, so the two variants tell one story in the same words.
const TITLES = [
  ['Your business today', 'Ваш бизнес сегодня'], ['Morpheus joins the chat', 'В чат приходит Морфеус'],
  ['He onboards the team', 'Он онбордит команду'], ['Goals, not tasks', 'Цели, а не задачи'],
  ['Assessment', 'Ассессмент'], ['Departments form', 'Формируются отделы'], ['Agents arrive', 'Приходят агенты'],
  ['A task travels', 'Задача идёт по отделам'], ['Old process, new process', 'Старый процесс и новый'],
  ['People correct, the system learns', 'Люди поправляют, система учится'], ['Your turn', 'Ваша очередь']
]
const caps = $('captions')
TITLES.forEach(([en, ru], i) => {
  const d = document.createElement('div'); d.className = 'cap'; d.dataset.c = i
  d.innerHTML = `<h2><span lang="en">${en}</span><span lang="ru">${ru}</span></h2>`
  caps.appendChild(d)
})
const capEls = [...caps.children]

const listeners = []
const subscribeAct = fn => listeners.push(fn)
let lastAct = -2, vel = 0, lastY = scrollY
const track = $('track')
const state = { vel: 0 }
const tick = () => {
  const r = track.getBoundingClientRect()
  const p = Math.min(1, Math.max(0, -r.top / Math.max(1, track.offsetHeight - innerHeight)))
  root.style.setProperty('--story', p)
  const inside = r.top <= 0 && r.bottom > innerHeight * 0.5
  const act = inside ? Math.min(CHAPTERS - 1, Math.floor(p * CHAPTERS)) : -1
  vel = vel * 0.9 + ((scrollY - lastY) / innerHeight) * 0.1; lastY = scrollY; state.vel = vel
  if (act !== lastAct) {
    lastAct = act
    capEls.forEach((c, i) => c.classList.toggle('on', i === act))
    $('ch-num').textContent = String(Math.max(0, act)).padStart(2, '0')
    listeners.forEach(fn => fn(act))
  }
  if (!reduce) rain()
  requestAnimationFrame(tick)
}
const rain = reduce ? () => {} : mountRain($('rain'), () => state)

// The generated cut wins when it exists; the draft cut stands in until then.
const pickSrc = async () => {
  try { const r = await fetch('/story/film/cut.mp4', { method: 'HEAD' }); if (r.ok && (r.headers.get('content-type') || '').startsWith('video/')) { $('draft-note').hidden = true; return '/story/film/cut.mp4' } } catch {}
  return '/story/film/standin.mp4'
}
pickSrc().then(src => {
  new window.ScrollyVideo({ scrollyVideoContainer: 'scrolly', src, cover: true, sticky: true, full: true, trackScroll: true, useWebCodecs: true, transitionSpeed: 10 })
})
mountVoice({ button: $('voice'), subtitle: $('vo-sub'), subscribeAct })
requestAnimationFrame(tick)
