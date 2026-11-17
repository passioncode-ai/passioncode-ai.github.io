// The agent field (SITE-068, sheleg-design §4 and §5): a 2D canvas swarm that reads the one clock.
// Each chapter holds a formation; at the seam every point flies to its new post on a
// phase-staggered, arc-curved path. No crossfades. aria-hidden: the story's meaning lives in the DOM.
import { SCENES, clamp, smooth, seg } from './store.js'

const PALETTE = {
  grey: [111, 94, 119], gold: [255, 210, 26], magenta: [242, 6, 115],
  blue: [166, 191, 255], green: [121, 212, 154], white: [255, 249, 240]
}
// The Matrix look (html.matrix) recolours the swarm in phosphor greens; the main palette stays for the default look.
if (document.documentElement.classList.contains('matrix')) Object.assign(PALETTE, {
  grey: [40, 90, 60], gold: [180, 255, 120], magenta: [0, 255, 102], blue: [60, 200, 140], green: [0, 255, 102], white: [214, 255, 226]
})
const TAU = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t
const along = (pts, t) => { // a point at t (0..1) along a polyline
  const segs = pts.length - 1, f = clamp(t) * segs, k = Math.min(segs - 1, Math.floor(f)), u = f - k
  return [lerp(pts[k][0], pts[k + 1][0], u), lerp(pts[k][1], pts[k + 1][1], u)]
}
const DEPTS = [[0.2, 0.4], [0.5, 0.4], [0.8, 0.4], [0.5, 0.82]]
const LOOP = [DEPTS[0], DEPTS[1], DEPTS[2], DEPTS[3], DEPTS[0]]
const M = [[0.18, 0.86], [0.18, 0.14], [0.5, 0.56], [0.82, 0.14], [0.82, 0.86]]

// Formation builders: (point, time) -> { x, y in 0..1 of the box, c colour, drift, lattice }
const FORMS = {
  cloud: (q, t) => {
    const a = q.i * 2.39996 + t * 0.05, r = Math.sqrt(q.u) * 0.46
    return { x: 0.5 + Math.cos(a) * r, y: 0.5 + Math.sin(a) * r * 0.9, c: q.i % 7 === 0 ? 'gold' : q.i % 5 === 0 ? 'magenta' : 'blue', drift: 0.6 }
  },
  chaos: q => ({ x: q.r1, y: q.r2, c: q.i % 9 === 0 ? 'magenta' : 'grey', drift: 1.6 }),
  beam: q => ({ x: 0.5 + (q.r1 - 0.5) * 0.14 * (0.4 + q.r2), y: q.r2, c: q.i % 3 ? 'magenta' : 'gold', drift: 0.35 }),
  orbit: (q, t) => {
    if (q.u < 0.18) { const a = q.r1 * TAU; return { x: 0.5 + Math.cos(a) * 0.05 * q.r2, y: 0.5 + Math.sin(a) * 0.05 * q.r2, c: 'magenta', drift: 0.2 } }
    const a = q.u * TAU * 3 + t * 0.12 * (q.i % 2 ? 1 : -1), r = 0.24 + (q.i % 3) * 0.07
    return { x: 0.5 + Math.cos(a) * r, y: 0.5 + Math.sin(a) * r, c: q.i % 4 === 0 ? 'gold' : 'blue', drift: 0.2 }
  },
  goals: q => {
    const k = q.i % 3, a = q.r1 * TAU, r = Math.sqrt(q.r2) * 0.09
    return { x: [0.2, 0.5, 0.8][k] + Math.cos(a) * r, y: 0.5 + Math.sin(a) * r * 1.4, c: ['gold', 'green', 'blue'][k], drift: 0.25 }
  },
  line: (q, t) => {
    const x = 0.05 + q.u * 0.9, hot = [0.32, 0.68, 0.92].some(h => Math.abs(q.u - h) < 0.04)
    return { x, y: 0.42 + (q.r1 - 0.5) * (hot ? 0.16 : 0.04), c: hot ? 'magenta' : 'blue', drift: hot ? 1.2 : 0.2 }
  },
  depts: q => {
    const k = q.i % 4, a = q.r1 * TAU, r = Math.sqrt(q.r2) * (k === 3 ? 0.07 : 0.1)
    return { x: DEPTS[k][0] + Math.cos(a) * r, y: DEPTS[k][1] + Math.sin(a) * r, c: ['gold', 'green', 'blue', 'white'][k], drift: 0.25, hub: DEPTS[k] }
  },
  flow: (q, t) => {
    if (q.u < 0.68) return FORMS.depts(q, t)
    const [x, y] = along(LOOP, (t * 0.09 + q.r1) % 1)
    return { x: x + (q.r2 - 0.5) * 0.02, y: y + (q.r1 - 0.5) * 0.02, c: 'gold', drift: 0.05 }
  },
  split: (q, t) => {
    if (q.i % 2) return { x: 0.06 + (q.i % 13) / 13 * 0.36, y: 0.15 + ((q.i / 13) | 0) % 10 / 10 * 0.7, c: 'grey', drift: 0.02 }
    const a = q.r1 * TAU + t * 0.5, r = 0.08 + q.r2 * 0.2
    return { x: 0.75 + Math.cos(a) * r * 0.8, y: 0.5 + Math.sin(a) * r, c: q.i % 4 ? 'green' : 'gold', drift: 0.2 }
  },
  curve: q => {
    const x = q.u, up = q.i % 4 !== 0
    const y = up ? 0.86 - 0.72 * Math.pow(x, 1.5) : 0.18 + 0.68 * Math.pow(x, 0.7)
    return { x, y: y + (q.r1 - 0.5) * 0.03, c: up ? 'green' : 'magenta', drift: 0.15 }
  },
  glyph: q => { const [x, y] = along(M, q.u); return { x: x + (q.r1 - 0.5) * 0.03, y: y + (q.r2 - 0.5) * 0.03, c: q.i % 3 ? 'gold' : 'magenta', drift: 0.1 } }
}
const ORDER = ['cloud', ...SCENES.map(s => s.formation)] // index = form + 1

export function mountField(canvas, getState) {
  const ctx = canvas.getContext('2d')
  const coarse = matchMedia('(pointer: coarse)').matches
  let pts = [], dpr = 1
  const seed = n => { let s = n * 9301 + 49297; return () => ((s = (s * 233280 + 49297) % 2147483647) / 2147483647) }
  const build = () => {
    dpr = Math.min(1.75, devicePixelRatio || 1)
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr
    const n = coarse || innerWidth < 860 ? 150 : 280
    const rnd = seed(7)
    pts = Array.from({ length: n }, (_, i) => ({
      i, u: i / n, r1: rnd(), r2: rnd(), phase: rnd() * TAU, size: 1.4 + rnd() * 1.8,
      burst: [Math.cos(rnd() * TAU), Math.sin(rnd() * TAU)], x: innerWidth / 2, y: innerHeight / 2
    }))
  }
  build()
  addEventListener('resize', build)

  // The box a formation lives in: the stage's scene area (right of the chat) or the hero's right half.
  const box = (s, heroish) => {
    const W = innerWidth, H = innerHeight
    if (s.narrow) return heroish ? { x: 0.05 * W, y: 0.08 * H, w: 0.9 * W, h: 0.5 * H } : { x: 0.05 * W, y: 0.2 * H, w: 0.9 * W, h: 0.42 * H }
    return heroish ? { x: 0.5 * W, y: 0.14 * H, w: 0.46 * W, h: 0.72 * H } : { x: 0.36 * W, y: 0.22 * H, w: 0.6 * W, h: 0.62 * H }
  }

  return s => {
    const t = performance.now() / 1000
    const f = s.form + 1
    const a = Math.max(0, Math.floor(f)), b = Math.min(ORDER.length - 1, a + 1), mix = f - a
    const boxA = box(s, a === 0), boxB = box(s, b === 0)
    const energy = lerp(SCENES[Math.max(0, a - 1)].energy, SCENES[Math.max(0, b - 1)].energy, mix)
    const breathe = 1 + Math.abs(s.vel) * 3
    const charge = seg(s.finale, 0, 0.55), burst = seg(s.finale, 0.55, 0.85)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.globalCompositeOperation = 'lighter'
    const cx = boxB.x + boxB.w / 2, cy = boxB.y + boxB.h / 2
    for (const q of pts) {
      const A = FORMS[ORDER[a]](q, t), B = FORMS[ORDER[b]](q, t)
      const ax = boxA.x + A.x * boxA.w, ay = boxA.y + A.y * boxA.h
      const bx = boxB.x + B.x * boxB.w, by = boxB.y + B.y * boxB.h
      // Phase-staggered smoothstep: points peel off in a wave, then ease into their posts.
      const m = smooth(clamp((mix - (q.phase / TAU) * 0.5) / 0.5))
      let x = lerp(ax, bx, m), y = lerp(ay, by, m)
      if (m > 0.001 && m < 0.999) {
        const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1
        const arc = Math.sin(m * Math.PI) * Math.min(120, d * 0.35) * (q.phase > Math.PI ? 1 : -1)
        x += (-dy / d) * arc; y += (dx / d) * arc
      }
      const drift = lerp(A.drift, B.drift, m) * breathe
      x += Math.sin(t * 0.7 + q.phase) * 4 * drift
      y += Math.cos(t * 0.6 + q.phase * 1.3) * 4 * drift
      let alpha = 0.55 + 0.35 * energy
      if (s.finale > 0) { // charge toward the core and tremble, then burst along each point's vector
        x = lerp(x, cx, charge * 0.35) + Math.sin(t * 40 + q.phase) * charge * 3
        y = lerp(y, cy, charge * 0.35) + Math.cos(t * 37 + q.phase) * charge * 3
        x += q.burst[0] * burst * innerWidth * 0.7; y += q.burst[1] * burst * innerHeight * 0.7
        alpha *= burst > 0 ? 1 - burst * 0.85 : 1 + charge * 0.6
      }
      q.x = x; q.y = y
      const ca = PALETTE[A.c], cb = PALETTE[B.c]
      const r = lerp(ca[0], cb[0], m) | 0, g = lerp(ca[1], cb[1], m) | 0, bl = lerp(ca[2], cb[2], m) | 0
      const size = q.size * (1 + charge * 0.8)
      ctx.fillStyle = `rgba(${r},${g},${bl},${alpha * 0.14})`
      ctx.fillRect(x - size * 2.5, y - size * 2.5, size * 5, size * 5)
      ctx.fillStyle = `rgba(${r},${g},${bl},${alpha})`
      ctx.fillRect(x - size / 2, y - size / 2, size, size)
      const hub = B.hub && m > 0.95 ? B.hub : null
      if (hub && q.i % 3 === 0) { // department wiring, only while a formation holds
        ctx.strokeStyle = `rgba(${r},${g},${bl},0.07)`
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(boxB.x + hub[0] * boxB.w, boxB.y + hub[1] * boxB.h); ctx.stroke()
      }
    }
    ctx.globalCompositeOperation = 'source-over'
  }
}
