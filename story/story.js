// The story demo (SITE-068): DOM choreography. Reads the one clock (store.js); the agent field
// (field.js) and the pixel seam are layers on the same frame. Reduced motion: a static, legible page.
import { CHAPTERS, getState, onFrame, subscribeAct, start, clamp, seg } from './store.js'
import { mountField } from './field.js'

const root = document.documentElement
const $ = id => document.getElementById(id)
const lerp = (a, b, t) => a + (b - a) * t
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

// Language: ?lang=, then the saved choice, then the browser. The switch overrides.
const setLang = lang => {
  root.dataset.lang = lang; root.lang = lang
  document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)))
  try { localStorage.setItem('story-lang', lang) } catch {}
}
let saved = null
try { saved = localStorage.getItem('story-lang') } catch {}
setLang(new URLSearchParams(location.search).get('lang') || saved || ((navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en'))
document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)))

// The chapter rail: deep links, built from the captions so the titles stay in one place.
const rail = $('rail')
const caps = [...document.querySelectorAll('.cap')]
caps.forEach((c, i) => {
  const a = document.createElement('a')
  a.href = '#story'; a.dataset.i = i
  a.innerHTML = `<span class="tick"></span><span class="lbl">${c.querySelector('h2').innerHTML}</span>`
  a.addEventListener('click', e => {
    e.preventDefault()
    const story = $('story')
    const y = story.offsetTop + ((i + 0.45) / CHAPTERS) * (story.offsetHeight - innerHeight)
    scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
  })
  rail.appendChild(a)
})
const railLinks = [...rail.children]

if (reduce) {
  root.classList.add('calm')
  document.querySelectorAll('.scene, .cap, .msg, .mini-msgs li').forEach(el => el.classList.add('on'))
} else {
  // Hero entrance: one staggered reveal, under 500 ms per item; content never waits on it.
  requestAnimationFrame(() => root.classList.add('ready'))

  // The hero's live preview loops only while it is on screen.
  const mini = [...document.querySelectorAll('#mini li')]
  const typing = document.querySelector('.mini-typing')
  let step = 3, timer = null
  const play = () => {
    mini.forEach((li, i) => li.classList.toggle('on', i < step))
    typing.classList.toggle('on', step < mini.length)
    step = step >= mini.length + 2 ? 1 : step + 1
    timer = setTimeout(play, step === 2 ? 900 : 1500)
  }
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !timer) play()
    if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null }
  }).observe($('mini'))

  const stage = $('stage')
  const scenes = [...document.querySelectorAll('.scene')]
  const msgs = [...document.querySelectorAll('.msg')]
  const hero = document.querySelector('.hero')
  const heroDemo = document.querySelector('.hero-demo')

  // Coarse changes only: which chapter is the reading focus.
  subscribeAct(act => {
    const sceneIdx = act >= 5 && act <= 7 ? 5 : act
    scenes.forEach(s => s.classList.toggle('on', Number(s.dataset.s) === sceneIdx))
    caps.forEach(c => c.classList.toggle('on', Number(c.dataset.c) === act))
    railLinks.forEach((a, i) => { a.classList.toggle('on', i === act); a.classList.toggle('past', i < act) })
    rail.classList.toggle('show', act >= 0)
    $('final').classList.toggle('on', act === CHAPTERS - 1)
    $('ch-num').textContent = String(Math.max(0, act)).padStart(2, '0')
  })

  // The pixel seam: brand blocks that peel on at each chapter boundary in a diagonal wave.
  const canvas = $('pixels'), ctx = canvas.getContext('2d')
  const COLORS = ['#41054b', '#f20673', '#ffd21a', '#1b1420', '#0a070d', '#6f2a7a']
  let cells = [], cols = 0, size = 28
  const resizePixels = () => {
    const r = stage.getBoundingClientRect()
    canvas.width = r.width; canvas.height = r.height
    size = r.width < 700 ? 18 : 26
    cols = Math.ceil(r.width / size)
    const rows = Math.ceil(r.height / size)
    cells = Array.from({ length: cols * rows }, (_, i) => ({
      t: 0.6 * (((i % cols) / cols + ((i / cols) | 0) / rows) / 2) + 0.4 * Math.random(),
      c: COLORS[(Math.random() * COLORS.length) | 0]
    }))
  }
  resizePixels(); addEventListener('resize', resizePixels)
  let lastAmount = -1
  const drawPixels = amount => {
    if (Math.abs(amount - lastAmount) < 0.004) return
    lastAmount = amount
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (amount <= 0.001) return
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i]
      if (cell.t > amount) continue
      ctx.fillStyle = cell.c
      ctx.fillRect((i % cols) * size, ((i / cols) | 0) * size, size - 1, size - 1)
    }
  }

  // Chapter-local instruments. Each reads p (0..1 inside the chapter) or g.
  const text = (el, v) => { if (el && el.textContent !== v) el.textContent = v }
  const route = $('route'), token = $('token')
  const routeLen = route ? route.getTotalLength() : 0
  const stamps = [...document.querySelectorAll('.stamp')]
  const agents = [...document.querySelectorAll('.ag')]
  const hot = [...document.querySelectorAll('.box.hot')]
  const newItems = [...document.querySelectorAll('.side.new li')]
  const sideItems = [...document.querySelectorAll('.side.old li')].map((li, i) => [li, newItems[i]])
  const org = document.querySelector('.scene[data-s="5"]')
  const local = {
    0: p => text($('notif'), String(Math.round(lerp(1, 27, p)))),
    2: p => {
      document.querySelectorAll('.sat').forEach((s, i) => {
        s.style.setProperty('--in', seg(p, 0.08 + i * 0.12, 0.32 + i * 0.12))
        s.style.setProperty('--stamp', seg(p, 0.42 + i * 0.1, 0.52 + i * 0.1))
      })
      stage.style.setProperty('--vault', seg(p, 0.72, 0.86))
      text($('members'), String(1 + Math.round(seg(p, 0.08, 0.7) * 4)))
    },
    3: p => document.querySelectorAll('.goal').forEach((g, i) => g.style.setProperty('--in', seg(p, 0.08 + i * 0.18, 0.36 + i * 0.18))),
    4: p => {
      hot.forEach((b, i) => b.classList.toggle('lit', p > 0.22 + i * 0.2))
      text($('r-classes'), String(Math.round(seg(p, 0, 0.75) * 38)))
      text($('r-hand'), String(Math.round(seg(p, 0.08, 0.8) * 64)))
      text($('r-wait'), String(Math.round(seg(p, 0.16, 0.85) * 46)))
    },
    8: p => sideItems.forEach(([o, n], i) => { const on = p > 0.12 + i * 0.09; o.classList.toggle('on', on); n && n.classList.toggle('on', on) })
  }
  const orgFrame = g => {
    org.style.setProperty('--branch', seg(g, 5.05, 5.4))
    org.style.setProperty('--dept', seg(g, 5.3, 5.7))
    org.style.setProperty('--ag', seg(g, 5.95, 6.2))
    agents.forEach((a, i) => a.classList.toggle('live', g > 6.15 + i * 0.07))
    const r = seg(g, 6.95, 7.8)
    org.style.setProperty('--route', seg(g, 6.8, 7.0))
    if (route) {
      const pt = route.getPointAtLength(r * routeLen)
      token.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    }
    stamps.forEach((st, i) => st.classList.toggle('on', r > 0.18 + i * 0.25))
    text($('timer'), `00:${String(Math.round(r * 42)).padStart(2, '0')}`)
  }
  const hud = g => {
    const t = seg(g, 6.8, 9.8)
    const reply = lerp(360, 0.5, t)
    text($('h-reply'), reply >= 60 ? `${Math.round(reply / 60)} h` : reply >= 1 ? `${Math.round(reply)} min` : '30 s')
    const rel = lerp(21, 1, t)
    text($('h-release'), rel >= 1.5 ? `${Math.round(rel)} d` : '< 1 d')
    text($('h-streams'), String(Math.round(lerp(4, 120, t))))
    text($('h-cost'), `$${lerp(100, 3, t).toFixed(t > 0.5 ? 1 : 0)}`)
    stage.classList.toggle('good', t > 0.6)
  }

  onFrame(mountField($('field'), getState))
  onFrame(s => {
    root.style.setProperty('--story', s.raw)
    root.style.setProperty('--vel', Math.abs(s.vel).toFixed(3))
    // The hero hands over to the story: the preview drifts up (the one parallax figure) and dims.
    hero.style.setProperty('--h', s.hero)
    heroDemo.style.transform = `translate3d(0, ${-s.hero * 90}px, 0) scale(${1 - s.hero * 0.06})`
    if (s.raw <= 0) { drawPixels(0); return }
    const g = s.g, ch = s.ch, p = s.p
    const active = scenes.find(sc => sc.classList.contains('on'))
    if (active) active.style.setProperty('--p', p)
    msgs.forEach(m => m.classList.toggle('on', g >= Number(m.dataset.at)))
    const next = msgs.find(m => g < Number(m.dataset.at))
    stage.style.setProperty('--typing', next && Number(next.dataset.at) - g < 0.15 ? 1 : 0)
    if (local[ch]) local[ch](p)
    if (ch >= 5 && ch <= 7) orgFrame(g)
    hud(g)
    // The seam peaks at each chapter boundary; inside the org scene (6 and 7) the picture stays.
    const near = Math.round(g), d = Math.abs(g - near)
    const seam = near >= 1 && near <= CHAPTERS - 1 && near !== 6 && near !== 7
    drawPixels(seam ? clamp(1 - d / 0.06) : 0)
  })
  start()
}
