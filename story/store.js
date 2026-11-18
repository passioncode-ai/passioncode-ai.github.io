// The one clock (SITE-068, sheleg-design §2). Every layer reads this store; none measures scroll itself.
// One requestAnimationFrame loop runs the consumers in order; only chapter changes notify subscribers.
export const CHAPTERS = 11
export const HOLD = 0.82

// The storyboard as data (v2, docs/tasks/2026-11-17-story-landing-v2.md): one row per chapter. formation names map to
// builders in field.js. Every chapter plays in beats, never two at once (D3): the chat speaks first (`chat`, the scene
// holds), then the scene acts (`scene`, the chat holds), then both hold. A chapter with no messages has `chat: null`.
// `seam` draws the pixel seam at the boundary into this chapter; `el` names the scene element that plays it.
const BEATS = { chat: [0.04, 0.36], scene: [0.42, 0.9] }
const SCENE_ONLY = { chat: null, scene: [0.08, 0.9] }
export const SCENES = [
  { id: 'pain',     formation: 'chaos', energy: 0.35, el: 0, seam: false, ...BEATS },
  { id: 'morpheus', formation: 'beam',  energy: 0.6,  el: 1, seam: true,  ...BEATS },
  { id: 'goals',    formation: 'orbit', energy: 0.5,  el: 2, seam: true,  ...BEATS },
  { id: 'trinity',  formation: 'line',  energy: 0.55, el: 3, seam: true,  ...BEATS },
  { id: 'plan',     formation: 'goals', energy: 0.5,  el: 4, seam: true,  ...BEATS },
  { id: 'neo',      formation: 'flow',  energy: 0.7,  el: 5, seam: true,  ...BEATS },
  { id: 'matrix',   formation: 'depts', energy: 0.8,  el: 6, seam: true,  ...BEATS },
  { id: 'flows',    formation: 'depts', energy: 0.9,  el: 6, seam: false, ...BEATS },
  { id: 'collapse', formation: 'beam',  energy: 1,    el: 6, seam: false, ...SCENE_ONLY },
  { id: 'report',   formation: 'curve', energy: 0.8,  el: 9, seam: true,  ...BEATS },
  { id: 'apply',    formation: 'glyph', energy: 1,    el: 10, seam: true, ...BEATS }
].map(r => ({ focusX: 0.66, ...r }))

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const smooth = t => t * t * (3 - 2 * t)
export const seg = (v, a, b) => clamp((v - a) / (b - a))

const state = {
  hero: 0,      // 0..1 across the first screen
  raw: 0,       // 0..1 across the story track
  g: 0,         // chapter index + progress, 0..CHAPTERS
  ch: 0, p: 0,  // current chapter and progress inside it
  chatP: 0,     // 0..1 across the chapter's chat beat (1 once it is over)
  sceneP: 0,    // 0..1 across the chapter's scene beat (0 until it starts)
  beat: 'chat', // which side moves now: chat, scene or hold (D3)
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
  const row = SCENES[state.ch]
  state.chatP = row.chat ? seg(state.p, row.chat[0], row.chat[1]) : 1
  state.sceneP = seg(state.p, row.scene[0], row.scene[1])
  state.beat = row.chat && state.p < row.chat[1] ? 'chat' : state.p < row.scene[1] ? 'scene' : 'hold'
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
