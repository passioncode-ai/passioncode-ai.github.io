// SITE-068 v5, leafing (the operator, 2026-11-18: «это должно листаться ... плавное ... инерция ... не перескакивали сразу
// две-три сцены ... переключать только одну, если быстро скроллить»). One gesture (a wheel or trackpad swipe, a key, a
// touch swipe) turns exactly one frame: an eased scroll to the next stop, then a hold while the frame's line speaks.
// The tail of a trackpad's inertia and a fast burst of wheel notches are one gesture, so they turn one frame, never
// three. Under reduced motion the page scrolls natively and nothing is held.
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function mountPager({ stops, busy = () => false, enabled = () => true, onArrive = () => {}, onBlocked = () => {}, onWait = () => {}, onWaitEnd = () => {} }) {
  let list = []           // sorted scroll positions, each {y, el}
  let locked = false, animating = false
  let lastWheel = 0, lastAbs = 0
  let queued = 0          // a gesture made while a frame is held: it turns the next frame when the hold ends, never lost
  let holdStart = 0, release = false, waiting = false
  let jumpTo = null       // Home or End pressed during a hold: it ends the hold and goes there
  const INSIST = 420      // a second gesture this long into a hold turns the frame at once; the line plays on, uncut
  const MIN_HOLD = 420    // a frame is on screen at least this long before the next gesture can turn it
  const MAX_HOLD = 7000   // a line longer than this does not hold the reader

  const refresh = () => {
    list = stops().filter(s => Number.isFinite(s.y)).sort((a, b) => a.y - b.y)
    if (window.__pagerLog) window.__pagerStops = list.map(s => Math.round(s.y))  // only a test reads it
  }
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
    const t0 = holdStart = performance.now(); release = jumpTo !== null  // End pressed during the scroll ends the hold too
    const check = () => {
      const t = performance.now() - t0
      if ((t >= MIN_HOLD && !busy()) || t >= MAX_HOLD || release) resolve()
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
    window.__pagerLog?.push({ arrive: list.indexOf(target), y: Math.round(target.y), of: list.length })  // only a test sets it
    onArrive(target, list.indexOf(target))
    refresh()  // a panel revealed on arrival may change height: the next stop is measured from the page as it is now
    await hold()
    locked = false
    if (waiting) { waiting = false; onWaitEnd() }
    if (jumpTo !== null) { const j = jumpTo; jumpTo = null; queued = 0; go(j === 'end' ? list.length - 1 : 0); return }
    if (queued) { const d = queued; queued = 0; step(d) }
  }

  const step = dir => {
    window.__pagerLog?.push({ t: Math.round(performance.now()), dir, locked, queued, y: Math.round(scrollY) })  // only a test sets it
    if (locked) {           // one at most: three flicks during a line still turn one frame
      const held = !animating && holdStart && performance.now() - holdStart
      if (queued && held > INSIST) release = true   // the reader insists: go on, the line keeps playing
      queued = dir
      if (!waiting && !animating) { waiting = true; onWait() }
      return
    }
    refresh()
    if (!list.length) return
    const i = dir > 0 ? list.findIndex(s => s.y > scrollY + 6) : findLast(list, s => s.y < scrollY - 6)
    if (i < 0) { if (dir > 0) onBlocked(); return }
    go(i)
  }

  // A gesture ends when the wheel has been quiet for QUIET ms. Every event, during a turn too, restarts that
  // silence, so a long trackpad inertia tail or a fast run of flicks (events arriving slowly on a loaded machine
  // included) turns one frame; the next frame needs a pause first.
  // A new swipe made during the inertia tail of the last one is a gesture too: inertia only decays, so once the tail has
  // fallen below half its peak, a delta that jumps well above the tail's lowest point is the reader's finger again.
  // Times are the events' own (e.timeStamp, when the system made them), not when the page got to them: on a busy page
  // one swipe's events can reach the handler with gaps longer than QUIET, and must still read as one gesture.
  const QUIET = 300
  let lastTurn = -Infinity, peak = 0, tailMin = Infinity
  const onWheel = e => {
    if (e.ctrlKey || !enabled()) return  // pinch zoom on a trackpad; a layer above the page (the film) owns the wheel
    e.preventDefault()
    const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY
    const ts = e.timeStamp || performance.now(), abs = Math.abs(dy)
    const quiet = ts - lastWheel > QUIET
    const rise = !quiet && ts - lastTurn > 350 && abs >= 12 && tailMin < peak * 0.5 && abs > tailMin * 2 + 6
    window.__pagerLog?.push({ t: Math.round(ts), wheel: Math.round(abs), quiet, rise })
    lastWheel = ts; lastAbs = abs
    if (quiet || rise || abs >= peak) { peak = abs; tailMin = abs } else tailMin = Math.min(tailMin, abs)
    if ((quiet || rise) && abs > 3) {
      lastTurn = ts
      step(Math.sign(dy))  // during a hold it waits its turn (queued), so a gesture is never lost
    }
  }

  const typing = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
  const onKey = e => {
    if (e.altKey || e.metaKey || e.ctrlKey || !enabled() || typing(document.activeElement)) return
    const onControl = document.activeElement && document.activeElement !== document.body && /^(BUTTON|A)$/.test(document.activeElement.tagName)
    let dir = 0
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey && !onControl)) dir = 1
    else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey && !onControl)) dir = -1
    else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault(); refresh()
      if (locked) { jumpTo = e.key === 'End' ? 'end' : 'home'; release = true }  // ends a hold at once
      else go(e.key === 'End' ? list.length - 1 : 0)
      return
    }
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
