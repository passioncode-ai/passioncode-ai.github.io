// #region rabbit — docs: docs/tasks/2026-11-19-home-rabbit/README.md
// SITE-075 (operator 2026-11-19): a white rabbit hops across the home once, calmly, and sits on the button of the
// organization's free assessment. The rabbit is already in the page, seated (index.html .perch-rabbit, styles.css
// SITE-075): without this script, or with reduced motion, it just sits there. With motion allowed, it waits until the
// button is on screen, appears at the far edge of the window, makes a few soft low hops with one pause halfway, lands
// on the button and, if it came from the other side, turns to face the label. It never covers a click while it moves
// (pointer-events: none), never changes the layout (a transform only) and writes nothing on the visitor's device.
// Analytics: `rabbit_landed` once per page load when the seated rabbit is on screen (docs/analytics/events.md).
import { track } from './analytics.js'

const HOP_AIR = 470 // ms in the air per hop
const HOP_GROUND = 170 // ms on the ground between hops (the squash and the breath)
const PAUSE = 950 // ms the rabbit sits halfway, ears up, before it goes on
const TURN = 220 // ms to turn around on the button

// The hop's path in the rabbit's own frame (px from its seat, left to right on screen). Pure, so it can be tested.
export function plan ({ seatLeft, seatWidth, viewport, rtl, scale = 1 }) {
  const margin = 12
  const fromLeft = margin - seatLeft // the window's left edge, in the seat's frame
  const fromRight = viewport - margin - seatWidth - seatLeft // the right edge
  // Start at the far edge: the rabbit then crosses the screen, whichever side the button is on.
  const start = Math.abs(fromLeft) > Math.abs(fromRight) ? fromLeft : fromRight
  const distance = Math.abs(start)
  const stride = Math.max(80, Math.min(150, viewport * 0.11))
  const hops = Math.max(3, Math.min(7, Math.round(distance / stride)))
  const heights = [30, 24, 34, 26, 32, 22, 28].map(h => h * scale)
  const moving = start > 0 ? -1 : 1 // -1: right to left on screen
  const facing = rtl ? 1 : -1 // where the seated rabbit looks (styles.css: it faces the label)
  return {
    start,
    hops,
    xs: Array.from({ length: hops + 1 }, (_, i) => start * (1 - i / hops)),
    heights: heights.slice(0, hops),
    flip: moving === facing ? 1 : -1, // -1: it travels backwards to its seat's facing, so it turns at the end
    pauseAfter: Math.floor(hops / 2)
  }
}

// The keyframes of one calm crossing.
export function keyframes (path) {
  const frames = []
  let t = 0
  const at = (x, y, sx, sy, opacity, easing) => frames.push({ t, transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(sx * path.flip).toFixed(3)}, ${sy.toFixed(3)})`, opacity, easing })
  at(path.xs[0], 0, 1, 1, 0, 'ease-out')
  t += 260
  at(path.xs[0], 0, 1, 1, 1, 'cubic-bezier(.3,.7,.4,1)')
  for (let i = 0; i < path.hops; i++) {
    const a = path.xs[i]
    const b = path.xs[i + 1]
    t += HOP_AIR / 2
    at((a + b) / 2, -path.heights[i], 0.97, 1.04, 1, 'cubic-bezier(.6,0,.75,.4)')
    t += HOP_AIR / 2
    at(b, 0, 1.07, 0.92, 1, 'ease-out')
    t += HOP_GROUND
    at(b, 0, 1, 1, 1, i === path.pauseAfter - 1 ? 'linear' : 'cubic-bezier(.3,.7,.4,1)')
    if (i === path.pauseAfter - 1) { t += PAUSE; at(b, 0, 1, 1, 1, 'cubic-bezier(.3,.7,.4,1)') }
  }
  if (path.flip === -1) {
    // It came from the other side: a breath, then it turns to face the label.
    t += 260
    frames.push({ t, transform: 'translate(0px, 0px) scale(-1, 1)', opacity: 1, easing: 'ease-in-out' })
    t += TURN
    frames.push({ t, transform: 'translate(0px, 0px) scale(1, 1)', opacity: 1, easing: 'linear' })
  }
  const total = t
  return { duration: total, frames: frames.map(({ t, ...f }) => ({ ...f, offset: total ? t / total : 0 })) }
}

function mount (rabbit) {
  const button = rabbit.closest('a')
  const calm = window.matchMedia('(prefers-reduced-motion: no-preference)')
  let reported = false
  const report = motion => {
    if (reported) return
    reported = true
    track('rabbit_landed', { motion })
  }
  const seat = () => { rabbit.classList.remove('is-hopping'); rabbit.classList.add('is-seated') }
  const visible = (ratio, then) => {
    if (!('IntersectionObserver' in window)) return then()
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting && e.intersectionRatio >= ratio)) return
      io.disconnect()
      then()
    }, { threshold: [ratio] })
    io.observe(button)
  }
  if (!calm.matches || typeof rabbit.animate !== 'function') {
    seat()
    visible(0.5, () => report('still'))
    return
  }
  visible(0.5, () => setTimeout(() => {
    const rect = rabbit.getBoundingClientRect()
    const rtl = getComputedStyle(rabbit).direction === 'rtl'
    const path = plan({ seatLeft: rect.left, seatWidth: rect.width, viewport: document.documentElement.clientWidth, rtl, scale: rect.width / 54 })
    const { duration, frames } = keyframes(path)
    rabbit.classList.add('is-hopping')
    const hop = rabbit.animate(frames, { duration, fill: 'none' })
    const done = () => { seat(); report('hop') }
    hop.finished.then(done, done)
    calm.addEventListener('change', () => { if (!calm.matches) hop.finish() }, { once: true })
  }, 700))
}

if (typeof document !== 'undefined') {
  const rabbit = document.querySelector('.perch-rabbit')
  if (rabbit) mount(rabbit)
}
