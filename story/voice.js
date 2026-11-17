// Morpheus's voice-over (SITE-068). One line per chapter from voice/script.json, in the page's language.
// Off by default (a browser plays sound only after a click). Recorded lines live in voice/<lang>/<id>.mp3;
// a line with no recording yet is read by the browser's own speech engine and the subtitle says so.
const root = document.documentElement

export async function mountVoice({ button, subtitle, subscribeAct }) {
  let script = null
  try { script = await (await fetch('/story/voice/script.json')).json() } catch { button.hidden = true; return }
  const lines = Object.fromEntries(script.lines.map(l => [l.id, l]))
  let on = false, audio = null, current = null
  const stop = () => { if (audio) { audio.pause(); audio = null } if ('speechSynthesis' in window) speechSynthesis.cancel() }
  const say = id => {
    const l = lines[id]; if (!l || !on) return
    const lang = root.dataset.lang === 'ru' ? 'ru' : 'en'
    const text = l[lang]
    stop(); current = id
    subtitle.textContent = text; subtitle.classList.add('on')
    const a = new Audio(`/story/voice/${lang}/${id}.mp3`)
    a.onerror = () => { // no recording yet: the browser reads it, labelled as a draft voice
      subtitle.dataset.draft = '1'
      if (!('speechSynthesis' in window) || current !== id) return
      const u = new SpeechSynthesisUtterance(text)
      u.lang = lang === 'ru' ? 'ru-RU' : 'en-US'; u.rate = 0.86; u.pitch = 0.62
      const v = speechSynthesis.getVoices().filter(v => v.lang.startsWith(u.lang.slice(0, 2)))
      u.voice = v.find(v => /male|daniel|yuri|aaron|fred|alex/i.test(v.name)) || v[0] || null
      speechSynthesis.speak(u)
    }
    a.onplaying = () => { delete subtitle.dataset.draft }
    a.play().catch(() => {}); audio = a
  }
  const ids = script.lines.map(l => l.id).filter(id => id.startsWith('ch'))
  subscribeAct(act => { if (on && act >= 0) say(ids[act]) })
  button.addEventListener('click', () => {
    on = !on
    button.setAttribute('aria-pressed', String(on))
    if (!on) { stop(); subtitle.classList.remove('on'); return }
    const act = Number(document.getElementById('ch-num')?.textContent || 0)
    say(scrollY < innerHeight * 0.6 ? 'hero' : ids[act])
  })
  document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => { if (on && current) say(current) }))
}
