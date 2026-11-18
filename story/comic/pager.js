// SITE-068 v5, leafing (the operator, 2026-11-18: «это должно листаться ... плавное ... инерция ... не перескакивали сразу
// две-три сцены ... переключать только одну, если быстро скроллить»). One gesture (a wheel or trackpad swipe, a key, a
// touch swipe) turns exactly one frame: an eased scroll to the next stop, then a hold while the frame's line speaks.
// The tail of a trackpad's inertia and a fast burst of wheel notches are one gesture, so they turn one frame, never
// three. Under reduced motion the page scrolls natively and nothing is held.
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function mountPager({ stops, busy = () => false, enabled = () => true, onArrive = () => {}, onBlocked = () => {} }) {
  let list = []           // sorted scroll positions, each {y, el}
  let locked = false, animating = false
  let lastWheel = 0, lastAbs = 0
  const MIN_HOLD = 420    // a frame is on screen at least this long before the next gesture can turn it
  const MAX_HOLD = 10000  // a line longer than this does not hold the reader

  const refresh = () => { list = stops().filter(s => Number.isFinite(s.y)).sort((a, b) => a.y - b.y) }
  const nearest = () => list.reduce((best, s, i) => (Math.abs(s.y - scrollY) < Math.abs(list[best].y - scrollY) ? i : best), 0)

  const scrollTo = (y, ms) => new Promise(resolve => {
    const from = scrollY, dist = y - from, t0 = performance.now()
    animating = true
    const frame = now => {
      const t = clamp((now - t0) / ms, 0, 1)
      window.scrollTo(0, from + dist * ease(t))
      if (t < 1) requestAnimationFrame(frame)
      else { animating = false; resolve() }
    }
    requestAnimationFrame(frame)
  })

  const hold = () => new Promise(resolve => {
    const t0 = performance.now()
    const check = () => {
      const t = performance.now() - t0
      if ((t >= MIN_HOLD && !busy()) || t >= MAX_HOLD) resolve()
      else setTimeout(check, 100)
    }
    setTimeout(check, MIN_HOLD)
  })

  const go = async (index) => {
    if (!list.length) refresh()
    const target = list[clamp(index, 0, list.length - 1)]
    if (!target) return
    locked = true
    const dist = Math.abs(target.y - scrollY)
    if (dist > 2) await scrollTo(target.y, clamp(520 + dist * 0.22, 620, 1150))
    onArrive(target, list.indexOf(target))
    refresh()  // a panel revealed on arrival may change height: the next stop is measured from the page as it is now
    await hold()
    locked = false
    unlockedAt = performance.now()
  }

  const step = dir => {
    if (locked) return
    refresh()
    if (!list.length) return
    const i = dir > 0 ? list.findIndex(s => s.y > scrollY + 6) : findLast(list, s => s.y < scrollY - 6)
    if (i < 0) { if (dir > 0) onBlocked(); return }
    go(i)
  }

  // A gesture ends only when the wheel has been quiet for QUIET ms. Every event, during a turn too, restarts that
  // silence, so a long trackpad inertia tail or a fast run of flicks (events arriving slowly on a loaded machine
  // included) turns one frame; the next frame needs a pause first.
  const QUIET = 300
  let unlockedAt = 0
  const onWheel = e => {
    if (e.ctrlKey || !enabled()) return  // pinch zoom on a trackpad; a layer above the page (the film) owns the wheel
    e.preventDefault()
    const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY
    const now = performance.now(), quiet = now - lastWheel > QUIET
    lastWheel = now; lastAbs = Math.abs(dy)
    if (quiet && !locked && now - unlockedAt > 120 && lastAbs > 3) step(Math.sign(dy))
  }

  const typing = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
  const onKey = e => {
    if (e.altKey || e.metaKey || e.ctrlKey || !enabled() || typing(document.activeElement)) return
    const onControl = document.activeElement && document.activeElement !== document.body && /^(BUTTON|A)$/.test(document.activeElement.tagName)
    let dir = 0
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey && !onControl)) dir = 1
    else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey && !onControl)) dir = -1
    else if (e.key === 'Home') { e.preventDefault(); if (!locked) go(0); return }
    else if (e.key === 'End') { e.preventDefault(); refresh(); if (!locked) go(list.length - 1); return }
    if (!dir) return
    e.preventDefault()
    step(dir)
  }

  let y0 = null
  const onTouchStart = e => { y0 = e.touches.length === 1 && enabled() ? e.touches[0].clientY : null }
  const onTouchMove = e => { if (y0 !== null && e.cancelable) e.preventDefault() }
  const onTouchEnd = e => {
    if (y0 === null) return
    const dy = y0 - (e.changedTouches[0]?.clientY ?? y0)
    y0 = null
    if (Math.abs(dy) > 36) step(Math.sign(dy))
  }

  addEventListener('wheel', onWheel, { passive: false })
  addEventListener('keydown', onKey)
  addEventListener('touchstart', onTouchStart, { passive: true })
  addEventListener('touchmove', onTouchMove, { passive: false })
  addEventListener('touchend', onTouchEnd, { passive: true })
  addEventListener('resize', refresh)
  refresh()
  return { refresh, go, step, index: () => (refresh(), nearest()), list: () => list, locked: () => locked || animating }
}

function findLast(arr, fn) { for (let i = arr.length - 1; i >= 0; i--) if (fn(arr[i])) return i; return -1 }
