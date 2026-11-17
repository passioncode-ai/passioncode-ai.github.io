// The story demo (SITE-068): scroll position drives one sticky stage.
// g = chapter index + progress inside it (0..11); every animation reads g or the chapter's --p.
(() => {
  const CHAPTERS = 11
  const root = document.documentElement
  const story = document.getElementById('story')
  const stage = document.getElementById('stage')
  const scenes = [...document.querySelectorAll('.scene')]
  const caps = [...document.querySelectorAll('.cap')]
  const msgs = [...document.querySelectorAll('.msg')]
  const chNum = document.getElementById('ch-num')
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const $ = id => document.getElementById(id)
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
  const seg = (v, a, b) => clamp((v - a) / (b - a))
  const lerp = (a, b, t) => a + (b - a) * t

  // Language: ?lang=ru, then the browser, then English. The switch overrides.
  const setLang = lang => {
    root.dataset.lang = lang
    root.lang = lang
    document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)))
    try { localStorage.setItem('story-lang', lang) } catch {}
  }
  const asked = new URLSearchParams(location.search).get('lang')
  let saved = null
  try { saved = localStorage.getItem('story-lang') } catch {}
  setLang(asked || saved || ((navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en'))
  document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)))

  if (reduce) { scenes.forEach(s => s.classList.add('on')); caps.forEach(c => c.classList.add('on')); return }

  // Pixel dissolve between chapters: a grid of brand-coloured blocks, each with its own threshold.
  const canvas = $('pixels')
  const ctx = canvas.getContext('2d')
  const COLORS = ['#41054b', '#f20673', '#ffd21a', '#1b1420', '#0a070d', '#6f2a7a']
  let cells = [], cols = 0, rows = 0, size = 28
  const resize = () => {
    const r = stage.getBoundingClientRect()
    canvas.width = r.width; canvas.height = r.height
    size = r.width < 700 ? 18 : 28
    cols = Math.ceil(r.width / size); rows = Math.ceil(r.height / size)
    cells = Array.from({ length: cols * rows }, (_, i) => {
      const x = i % cols, y = (i / cols) | 0
      // Thresholds lean on a diagonal so the dissolve sweeps, with noise so it reads as pixels.
      const t = 0.55 * ((x / cols + y / rows) / 2) + 0.45 * Math.random()
      return { t, c: COLORS[(Math.random() * COLORS.length) | 0] }
    })
  }
  const drawPixels = amount => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (amount <= 0.001) return
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i]
      if (cell.t > amount) continue
      ctx.fillStyle = cell.c
      ctx.fillRect((i % cols) * size, ((i / cols) | 0) * size, size - 1, size - 1)
    }
  }

  // Chapter-local effects. Each takes the chapter progress p (0..1) and the global g.
  const lerpText = (el, text) => { if (el && el.textContent !== text) el.textContent = text }
  const route = document.getElementById('route')
  const token = document.getElementById('token')
  const routeLen = route ? route.getTotalLength() : 0
  const stamps = [...document.querySelectorAll('.stamp')]
  const agents = [...document.querySelectorAll('.ag')]
  const hot = [...document.querySelectorAll('.box.hot')]
  const sideItems = [...document.querySelectorAll('.side.old li')].map((li, i) => [li, document.querySelectorAll('.side.new li')[i]])

  const effects = {
    0: p => { lerpText($('notif'), String(Math.round(lerp(1, 27, p)))) },
    2: p => {
      document.querySelectorAll('.sat').forEach((s, i) => {
        const v = seg(p, 0.1 + i * 0.12, 0.35 + i * 0.12)
        s.style.setProperty('--in', v)
        s.style.setProperty('--stamp', seg(p, 0.45 + i * 0.1, 0.55 + i * 0.1))
      })
      stage.style.setProperty('--vault', seg(p, 0.75, 0.9))
      lerpText($('members'), String(1 + Math.round(seg(p, 0.1, 0.7) * 4)))
    },
    3: p => document.querySelectorAll('.goal').forEach((g, i) => g.style.setProperty('--in', seg(p, 0.1 + i * 0.2, 0.4 + i * 0.2))),
    4: p => {
      hot.forEach((b, i) => b.classList.toggle('lit', p > 0.25 + i * 0.22))
      lerpText($('r-classes'), String(Math.round(seg(p, 0, 0.8) * 38)))
      lerpText($('r-hand'), String(Math.round(seg(p, 0.1, 0.85) * 64)))
      lerpText($('r-wait'), String(Math.round(seg(p, 0.2, 0.9) * 46)))
    }
  }

  // Chapters 5, 6 and 7 share one scene: the org grows, agents boot, the task travels.
  const org = (g) => {
    const s = document.querySelector('.scene[data-s="5"]')
    s.style.setProperty('--branch', seg(g, 5.05, 5.45))
    s.style.setProperty('--dept', seg(g, 5.35, 5.8))
    s.style.setProperty('--ag', seg(g, 6.0, 6.25))
    agents.forEach((a, i) => a.classList.toggle('live', g > 6.2 + i * 0.07))
    const r = seg(g, 7.0, 7.95)
    s.style.setProperty('--route', seg(g, 6.85, 7.05))
    if (route) {
      const pt = route.getPointAtLength(r * routeLen)
      token.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    }
    stamps.forEach((st, i) => st.classList.toggle('on', r > 0.18 + i * 0.25))
    const secs = Math.round(r * 42)
    lerpText($('timer'), `00:${String(secs).padStart(2, '0')}`)
  }

  const hud = g => {
    const t = seg(g, 6.8, 9.8)
    const reply = lerp(360, 0.5, t) // minutes
    lerpText($('h-reply'), reply >= 60 ? `${Math.round(reply / 60)} h` : reply >= 1 ? `${Math.round(reply)} min` : '30 s')
    const rel = lerp(21, 1, t)
    lerpText($('h-release'), rel >= 1.5 ? `${Math.round(rel)} d` : '< 1 d')
    lerpText($('h-streams'), String(Math.round(lerp(4, 120, t))))
    lerpText($('h-cost'), `$${lerp(100, 3, t).toFixed(t > 0.5 ? 1 : 0)}`)
    document.querySelectorAll('.hud b').forEach(b => b.classList.toggle('good', t > 0.6))
  }

  let last = -1
  const frame = () => {
    const r = story.getBoundingClientRect()
    const travel = story.offsetHeight - innerHeight
    const raw = clamp(-r.top / travel)
    const g = raw * CHAPTERS
    if (Math.abs(g - last) > 0.0005) {
      last = g
      root.style.setProperty('--story', raw)
      const ch = Math.min(CHAPTERS - 1, Math.floor(g))
      const p = g - ch
      const sceneIdx = ch >= 5 && ch <= 7 ? 5 : ch
      scenes.forEach(s => {
        const on = Number(s.dataset.s) === sceneIdx
        s.classList.toggle('on', on)
        if (on) s.style.setProperty('--p', p)
      })
      caps.forEach(c => c.classList.toggle('on', Number(c.dataset.c) === ch))
      chNum.textContent = String(ch).padStart(2, '0')
      msgs.forEach(m => m.classList.toggle('on', g >= Number(m.dataset.at)))
      // Someone is typing just before the next message lands.
      const next = msgs.find(m => g < Number(m.dataset.at))
      stage.style.setProperty('--typing', next && Number(next.dataset.at) - g < 0.15 ? 1 : 0)
      if (effects[ch]) effects[ch](p, g)
      if (ch >= 5 && ch <= 7) org(g)
      if (ch === 8) sideItems.forEach(([o, n], i) => { const on = p > 0.15 + i * 0.1; o.classList.toggle('on', on); n && n.classList.toggle('on', on) })
      hud(g)
      // The dissolve peaks at each chapter boundary.
      // Boundaries inside the org scene (6 and 7) keep the picture: no dissolve there.
      const near = Math.round(g)
      const d = Math.abs(g - near)
      const dissolve = near >= 1 && near <= CHAPTERS - 1 && near !== 6 && near !== 7
      drawPixels(dissolve ? clamp(1 - d / 0.07) : 0)
    }
    requestAnimationFrame(frame)
  }
  addEventListener('resize', () => { resize(); last = -1 })
  resize()
  requestAnimationFrame(frame)
})()
