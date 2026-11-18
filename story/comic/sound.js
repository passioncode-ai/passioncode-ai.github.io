// SITE-068 W12, the comic's sound (treatment §5): Morpheus's recorded voice and the interface sounds, made in Asset Foundry
// (speech-line, sfx-oneshot, ambience-loop). Off until the reader's first action (a browser plays nothing before a
// gesture anyway); the header switch turns it off and on and is remembered. Interface sounds sit well under the voice;
// the room tone does not play under reduced motion. Voice plays in en and ru; other languages keep the captions only.
const BASE = '/story/comic/audio/'
const SFX = ['pill-hover', 'pill-choose', 'seam-glitch', 'msg-tick', 'typing', 'clone-click', 'tab-switch', 'cta-chord']
const VOICED = ['en', 'ru']
const VOL = { voice: 1, sfx: 0.32, bed: 0.12 }

export function mountSound({ reduce }) {
  const root = document.documentElement
  const btn = document.getElementById('sound')
  let pref = null
  try { pref = localStorage.getItem('story-sound') } catch {}
  let armed = false          // the reader acted, so the browser lets us play
  let on = pref !== 'off'    // the reader's choice; off only when they turned it off
  let ctx = null, bed = null
  const buffers = new Map()
  const played = new Set()   // a voice line is spoken once per page
  let voice = null           // the line now speaking: one at a time

  const live = () => armed && on
  // On a phone the switch shows only its bars (matrix.css hides its words), so its name comes from the label too
  const show = () => {
    if (!btn) return
    btn.setAttribute('aria-pressed', String(live()))
    const word = btn.querySelector(`[lang="${root.dataset.lang}"]`)?.textContent
    if (word) btn.setAttribute('aria-label', word)
  }
  document.getElementById('lang-menu')?.addEventListener('change', () => show())

  const load = async name => {
    if (buffers.has(name)) return buffers.get(name)
    const p = fetch(BASE + name).then(r => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.status))))
      .then(b => ctx.decodeAudioData(b)).catch(() => null)  // a missing file is silence, never an error on the page
    buffers.set(name, p)
    return p
  }
  const play = async (name, gain, { loop = false } = {}) => {
    if (!live()) return null
    const buf = await load(name)
    if (!buf || !live()) return null
    const src = ctx.createBufferSource(), g = ctx.createGain()
    src.buffer = buf; src.loop = loop; g.gain.value = gain
    // an mp3 carries encoder padding at both ends: loop inside it, or the bed clicks at the seam
    if (loop && buf.duration > 0.5) { src.loopStart = 0.05; src.loopEnd = buf.duration - 0.05 }
    src.connect(g).connect(ctx.destination); src.start()
    return { src, g }
  }

  const sfx = (name, gain = VOL.sfx) => play(`sfx/${name}.mp3`, gain)
  const say = key => {
    const lang = root.dataset.lang
    if (!VOICED.includes(lang) || played.has(key) || !live()) return
    played.add(key)
    if (voice) try { voice.src.stop() } catch {}
    play(`vo/${key}-${lang}.mp3`, VOL.voice).then(v => { voice = v })
  }
  const startBed = async () => {
    if (reduce || bed || !live()) return
    bed = await play('sfx/ambience.mp3', 0, { loop: true })
    if (bed) bed.g.gain.linearRampToValueAtTime(VOL.bed, ctx.currentTime + 2)
  }
  const stopAll = () => {
    if (bed) { try { bed.src.stop() } catch {} bed = null }
    if (voice) { try { voice.src.stop() } catch {} voice = null }
  }

  let armedBySwitch = false  // the press that armed the sound was on the switch: that press means «on», not a toggle
  const arm = e => {
    if (armed) return
    armed = true
    armedBySwitch = !!e?.target?.closest?.('#sound')
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) { armed = false; return }
    ctx = new AC()
    ctx.resume?.()
    SFX.forEach(n => load(`sfx/${n}.mp3`))
    show(); startBed()
  }
  ;['pointerdown', 'keydown', 'touchstart'].forEach(e => addEventListener(e, arm, { once: true, passive: true, capture: true }))

  btn?.addEventListener('click', e => {
    if (!armed) { arm(e); return }  // the first press turns the sound on
    if (armedBySwitch) { armedBySwitch = false; on = true; show(); return }
    e.stopPropagation()
    on = !live()
    try { localStorage.setItem('story-sound', on ? 'on' : 'off') } catch {}
    if (on) startBed(); else stopAll()
    show()
  })
  show()

  // interface sounds
  document.querySelectorAll('.pill').forEach(p => {
    p.addEventListener('pointerenter', () => sfx('pill-hover'))
    p.addEventListener('click', () => sfx('pill-choose', 0.45))
  })
  document.querySelectorAll('.cta, .sticky-cta').forEach(a => a.addEventListener('click', () => sfx('cta-chord', 0.4)))

  return {
    sfx, say,
    // a panel entered: the seam between beats, the clones' clicks, Morpheus's line in it
    panel(el) {
      sfx('seam-glitch', 0.22)
      if (el.querySelector('.clones')) [0, 1, 2, 3].forEach(i => setTimeout(() => sfx('clone-click', 0.2), 300 + i * 90))
      const line = el.querySelector('[data-vo]')
      if (line) setTimeout(() => say(line.dataset.vo), 600)
    },
    message(el) { sfx('msg-tick', 0.25); if (el.dataset.vo) setTimeout(() => say(el.dataset.vo), 250) },
    typing() { sfx('typing', 0.15) },
  }
}
