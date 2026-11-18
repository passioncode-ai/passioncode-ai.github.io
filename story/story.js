// The story demo (SITE-068): DOM choreography. Reads the one clock (store.js); the agent field
// (field.js) and the pixel seam are layers on the same frame. Reduced motion: a static, legible page.
import { CHAPTERS, SCENES, getState, onFrame, subscribeAct, start, clamp, seg } from './store.js'
import { mountCast, avatar } from './cast.js'
import { mountField } from './field.js'
import { mountRain } from './rain.js'
import { mountVoice } from './voice.js'

const root = document.documentElement
const $ = id => document.getElementById(id)
const lerp = (a, b, t) => a + (b - a) * t
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
mountCast()

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

// The dashboard Morpheus returns (chapter 9) is interactive in every mode (R9): tabs switch the panel.
const dash = $('dash')
if (dash) {
  const tabs = [...dash.querySelectorAll('[data-tab]')]
  tabs.forEach(b => b.addEventListener('click', () => {
    tabs.forEach(x => x.setAttribute('aria-selected', String(x === b)))
    dash.querySelectorAll('[data-panel]').forEach(pn => { pn.hidden = pn.dataset.panel !== b.dataset.tab })
  }))
}

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
  // Before the story top (act -1) the sticky stage is already entering the screen: it shows chapter 0, not an
  // empty panel (F3, refactor 2026-11-17).
  subscribeAct(act => {
    const shown = Math.max(0, act)
    const sceneIdx = SCENES[shown].el
    scenes.forEach(s => s.classList.toggle('on', Number(s.dataset.s) === sceneIdx))
    caps.forEach(c => c.classList.toggle('on', Number(c.dataset.c) === shown))
    railLinks.forEach((a, i) => { a.classList.toggle('on', i === act); a.classList.toggle('past', i < act) })
    rail.classList.toggle('show', act >= 0)
    $('final').classList.toggle('on', act === CHAPTERS - 1)
    $('ch-num').textContent = String(Math.max(0, act)).padStart(2, '0')
  })

  // The pixel seam: brand blocks that peel on at each chapter boundary in a diagonal wave. It is an accent, not a
  // curtain (F5): drawn only inside the scene panel, never over the caption or the chat, and capped at SEAM_MAX.
  const SEAM_MAX = 0.38, SEAM_SPAN = 0.03
  const canvas = $('pixels'), ctx = canvas.getContext('2d')
  const panel = document.querySelector('.scenes')
  let box = { x: 0, y: 0, w: 0, h: 0 }
  const COLORS = root.classList.contains('matrix')
    ? ['#003b14', '#00ff66', '#0a1a10', '#00c24e', '#020604', '#d6ffe2']
    : ['#41054b', '#f20673', '#ffd21a', '#1b1420', '#0a070d', '#6f2a7a']
  let cells = [], cols = 0, size = 28
  const resizePixels = () => {
    const r = stage.getBoundingClientRect(), pr = panel.getBoundingClientRect()
    canvas.width = r.width; canvas.height = r.height
    box = { x: pr.left - r.left, y: pr.top - r.top, w: pr.width, h: pr.height }
    size = r.width < 700 ? 14 : 22
    cols = Math.ceil(box.w / size)
    const rows = Math.ceil(box.h / size)
    cells = Array.from({ length: cols * rows }, (_, i) => ({
      t: 0.6 * (((i % cols) / cols + ((i / cols) | 0) / rows) / 2) + 0.4 * Math.random(),
      c: COLORS[(Math.random() * COLORS.length) | 0]
    }))
  }
  resizePixels(); addEventListener('resize', resizePixels); new ResizeObserver(() => { resizePixels(); lastAmount = -1 }).observe(panel)
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
      const x = (i % cols) * size, y = ((i / cols) | 0) * size
      ctx.fillRect(box.x + x, box.y + y, Math.min(size - 1, box.w - x), Math.min(size - 1, box.h - y))
    }
  }

  // Chapter-local instruments. Each reads only the scene beat's progress q (0..1), so nothing in a scene moves while
  // the chat speaks (D3, R3). Chapters 6 to 8 share one scene (the Matrix grid), each with its own q.
  const text = (el, v) => { if (el && el.textContent !== v) el.textContent = v }
  const conns = [...document.querySelectorAll('.conn')]
  const phases = [...document.querySelectorAll('.ph')]
  const layers = [...document.querySelectorAll('.ly')]
  const depts = [...document.querySelectorAll('.dept-cell')]
  const sc = i => document.querySelector(`.scene[data-s="${i}"]`)
  const s2 = sc(2), s3 = sc(3), s4 = sc(4), s5 = sc(5), s6 = sc(6), s9 = sc(9)
  const CLONES = 6
  depts.forEach(c => { c.querySelector('.clones').innerHTML = Array.from({ length: CLONES }, () => avatar('smith')).join('') })
  const clones = depts.map(c => [...c.querySelectorAll('.clones .av')])
  const grid = (fill, flow, fold) => {
    // fill: how many cells hold agents and how many clones each (ch 6); flow: links and status (ch 7); fold: collapse (ch 8)
    let n = 0
    depts.forEach((c, i) => {
      const lit = fill > i / depts.length
      c.classList.toggle('lit', lit)
      const k = lit ? Math.min(CLONES, Math.ceil(clamp(fill * depts.length - i, 0, 1.6) / 1.6 * CLONES)) : 0
      clones[i].forEach((a, j) => a.classList.toggle('on', j < k))
      n += k
      c.classList.toggle('flow', flow > (i % 4) / 4 + 0.05)
    })
    s6.style.setProperty('--flow', flow)
    s6.style.setProperty('--fold', fold)
    s6.classList.toggle('folding', fold > 0)
    text($('agents-n'), String(n + Math.round(flow * 48)))
    return n
  }
  const local = {
    0: q => text($('notif'), String(Math.round(lerp(1, 27, q)))),
    2: q => {
      document.querySelectorAll('.sat').forEach((st, i) => {
        st.style.setProperty('--in', seg(q, 0.04 + i * 0.12, 0.28 + i * 0.12))
        st.style.setProperty('--stamp', seg(q, 0.36 + i * 0.1, 0.46 + i * 0.1))
      })
      s2.style.setProperty('--vault', seg(q, 0.62, 0.76))
      document.querySelectorAll('.goal').forEach((g, i) => g.style.setProperty('--in', seg(q, 0.7 + i * 0.08, 0.86 + i * 0.08)))
      text($('members'), String(1 + Math.round(seg(q, 0.04, 0.6) * 4)))
    },
    3: q => {
      const on = conns.filter((c, i) => { const v = q > 0.06 + i * 0.12; c.classList.toggle('on', v); return v }).length
      const prec = Math.round(28 + on * 13)
      $('gauge').style.strokeDasharray = `${on ? prec : 0} 100`
      text($('precision'), on ? `${prec}%` : '0%')
      text($('r-hours'), String(Math.round(seg(q, 0.3, 0.8) * 1240)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
      text($('r-share'), `${Math.round(seg(q, 0.3, 0.8) * 68)}%`)
      s3.classList.toggle('forecast-on', on === conns.length && q > 0.66)
    },
    4: q => {
      phases.forEach((ph, i) => ph.classList.toggle('on', q > 0.05 + i * 0.14))
      text($('cost'), `$${Math.round(seg(q, 0.55, 0.75) * 24)}k`)
      s4.classList.toggle('scaled', q > 0.72)
      s4.classList.toggle('stamped', q > 0.86)
    },
    5: q => {
      layers.forEach((l, i) => { l.classList.toggle('on', q > 0.05 + i * 0.12); l.classList.toggle('locked', q > 0.12 + i * 0.12) })
      s5.classList.toggle('sealed', q > 0.72)
      s5.style.setProperty('--door', seg(q, 0.8, 1))
    },
    6: q => grid(q, 0, 0),
    7: q => grid(1, q, 0),
    8: q => grid(1, 1, q),
    9: q => s9.style.setProperty('--open', seg(q, 0, 0.5))
  }
  const hud = s => {
    // The counters move only in the scene beats of chapters 6 to 9 (old process to new), labelled illustrative.
    const t = s.ch < 6 ? 0 : s.ch > 9 ? 1 : (s.ch - 6 + s.sceneP) / 4
    const reply = lerp(360, 0.5, t)
    text($('h-reply'), reply >= 60 ? `${Math.round(reply / 60)} h` : reply >= 1 ? `${Math.round(reply)} min` : '30 s')
    const rel = lerp(21, 1, t)
    text($('h-release'), rel >= 1.5 ? `${Math.round(rel)} d` : '< 1 d')
    text($('h-streams'), String(Math.round(lerp(4, 120, t))))
    text($('h-cost'), `$${lerp(100, 3, t).toFixed(t > 0.5 ? 1 : 0)}`)
    stage.classList.toggle('good', t > 0.6)
  }

  // The chat speaks on its own beat: the messages of the current chapter appear one by one across the chat beat,
  // earlier chapters stay, later ones wait (D3).
  const byCh = msgs.reduce((m, el) => ((m[el.dataset.ch] ||= []).push(el), m), {})
  const chatFrame = s => {
    let typing = 0
    msgs.forEach(el => {
      const c = Number(el.dataset.ch)
      if (c !== s.ch) { el.classList.toggle('on', c < s.ch); return }
      const n = byCh[c].length, k = Number(el.dataset.k)
      const at = (k + 0.6) / n
      el.classList.toggle('on', s.chatP >= at)
      if (s.chatP < at && s.chatP >= at - 0.6 / n && s.beat === 'chat') typing = 1
    })
    stage.style.setProperty('--typing', typing)
  }

  onFrame(mountRain($('rain'), getState))
  onFrame(mountField($('field'), getState))
  onFrame(s => {
    root.style.setProperty('--story', s.raw)
    root.style.setProperty('--vel', Math.abs(s.vel).toFixed(3))
    // The hero hands over to the story: the preview drifts up (the one parallax figure) and dims.
    hero.style.setProperty('--h', s.hero)
    heroDemo.style.transform = `translate3d(0, ${-s.hero * 90}px, 0) scale(${1 - s.hero * 0.06})`
    if (s.raw <= 0) { drawPixels(0); return }
    if (stage.dataset.beat !== s.beat) stage.dataset.beat = s.beat
    const active = scenes.find(sc => sc.classList.contains('on'))
    if (active) active.style.setProperty('--p', s.sceneP)
    chatFrame(s)
    if (local[s.ch]) local[s.ch](s.sceneP)
    hud(s)
    // The seam peaks at a chapter boundary the storyboard marks; it never runs over a beat that moves.
    const near = Math.round(s.g), d = Math.abs(s.g - near)
    const seam = near >= 1 && near <= CHAPTERS - 1 && SCENES[near].seam
    drawPixels(seam ? SEAM_MAX * clamp(1 - d / SEAM_SPAN) : 0)
  })
  start()
}
mountVoice({ button: $('voice'), subtitle: $('vo-sub'), subscribeAct })
