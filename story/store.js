// The one clock (SITE-068, sheleg-design §2). Every layer reads this store; none measures scroll itself.
// One requestAnimationFrame loop runs the consumers in order; only chapter changes notify subscribers.
export const CHAPTERS = 11
export const HOLD = 0.82

// The storyboard as data: one row per chapter. formation names map to builders in field.js.
export const SCENES = [
  { formation: 'chaos', focusX: 0.66, energy: 0.35 },   // 0 your business today
  { formation: 'beam', focusX: 0.66, energy: 0.6 },     // 1 Morpheus joins
  { formation: 'orbit', focusX: 0.66, energy: 0.5 },    // 2 onboarding
  { formation: 'goals', focusX: 0.66, energy: 0.5 },    // 3 goals
  { formation: 'line', focusX: 0.66, energy: 0.55 },    // 4 assessment
  { formation: 'depts', focusX: 0.66, energy: 0.6 },    // 5 departments
  { formation: 'depts', focusX: 0.66, energy: 0.7 },    // 6 agents arrive
  { formation: 'flow', focusX: 0.66, energy: 0.9 },     // 7 a task travels
  { formation: 'split', focusX: 0.66, energy: 0.6 },    // 8 old vs new
  { formation: 'curve', focusX: 0.66, energy: 0.8 },    // 9 metrics
  { formation: 'glyph', focusX: 0.66, energy: 1 }       // 10 apply
]

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const smooth = t => t * t * (3 - 2 * t)
export const seg = (v, a, b) => clamp((v - a) / (b - a))

const state = {
  hero: 0,      // 0..1 across the first screen
  raw: 0,       // 0..1 across the story track
  g: 0,         // chapter index + progress, 0..CHAPTERS
  ch: 0, p: 0,  // current chapter and progress inside it
  form: -1,     // held formation index with an eased tail at each seam; -1 is the hero cloud
  vel: 0,       // scroll speed, roughly -1..1, decays
  finale: 0,    // 0..1 scrubbed epilogue in the last chapter
  w: innerWidth, h: innerHeight, narrow: innerWidth < 860
}
export const getState = () => state

const consumers = []
const actListeners = []
export const onFrame = fn => consumers.push(fn)
export const subscribeAct = fn => actListeners.push(fn)

let story, top = 0, travel = 1, lastY = scrollY, lastAct = -2
const measure = () => {
  story = story || document.getElementById('story')
  const r = story.getBoundingClientRect()
  top = r.top + scrollY
  travel = Math.max(1, story.offsetHeight - innerHeight)
  state.w = innerWidth; state.h = innerHeight; state.narrow = innerWidth < 860
}

const tick = () => {
  const y = scrollY
  state.hero = clamp(y / innerHeight)
  state.raw = clamp((y - top) / travel)
  state.g = state.raw * CHAPTERS
  state.ch = Math.min(CHAPTERS - 1, Math.floor(state.g))
  state.p = state.g - state.ch
  // Hold the formation for 82% of a chapter, then smoothstep into the next one.
  const tail = smooth(seg(state.p, HOLD, 1))
  const heroForm = smooth(seg(state.hero, 0.35, 1)) - 1          // -1 hero cloud → 0 chaos
  state.form = y < top ? heroForm : Math.min(CHAPTERS - 1, state.ch + (state.ch < CHAPTERS - 1 ? tail : 0))
  state.finale = state.ch === CHAPTERS - 1 ? seg(state.p, 0.25, 0.9) : 0
  const dv = (y - lastY) / innerHeight * 8
  state.vel = clamp(state.vel * 0.9 + dv * 0.1, -1, 1)
  lastY = y
  const act = y < top ? -1 : state.ch
  if (act !== lastAct) { lastAct = act; actListeners.forEach(fn => fn(act)) }
  for (const fn of consumers) fn(state)
  requestAnimationFrame(tick)
}

export const start = () => {
  measure()
  addEventListener('resize', measure)
  new ResizeObserver(measure).observe(document.body)
  requestAnimationFrame(tick)
}
