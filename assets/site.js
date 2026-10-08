// #region site-enhancement — docs: docs/ux/foundation.md#motion
// Progressive enhancement for every page. Without it the page is complete: content is
// visible, links work, commands can be selected by hand. With it: entrances on scroll,
// the header's scrolled state and copy buttons. Motion only when the visitor allows it.
// The copy buttons' words, in the page's language (<html lang>, assets/messages.js).
import { M } from './messages.js'
import { resolveLocale, t as translate } from './i18n.js'

const root = document.documentElement
const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')

function enableReveals () {
  const items = document.querySelectorAll('.reveal')
  if (!motion.matches || !('IntersectionObserver' in window) || !items.length) return
  // Content is hidden only from here on, and only below the fold: what is on screen
  // at load never flashes.
  root.classList.add('js-motion')
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  for (const item of items) {
    if (item.getBoundingClientRect().top < window.innerHeight) item.classList.add('is-visible')
    else observer.observe(item)
  }
  // A visitor who turns motion off mid-visit gets everything at once.
  motion.addEventListener('change', () => { if (!motion.matches) for (const item of items) item.classList.add('is-visible') })
}

function headerState () {
  const header = document.querySelector('.site-header')
  if (!header) return
  let ticking = false
  const update = () => { header.classList.toggle('is-scrolled', window.scrollY > 8); ticking = false }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }, { passive: true })
  update()
}

function copyButtons () {
  if (!navigator.clipboard) return
  const locale = resolveLocale(root.lang)
  const t = (message, params) => translate(locale, message, params)
  for (const pre of document.querySelectorAll('pre.copyable, .onboarding-steps pre, .setup-panel pre')) {
    const code = pre.querySelector('code')
    if (!code) continue
    pre.classList.add('copyable')
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'copy-button'
    button.textContent = t(M.copy)
    button.setAttribute('aria-label', t(M.copyLabel, { text: code.textContent.trim().slice(0, 60) }))
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent.trim())
        button.textContent = t(M.copied)
      } catch {
        button.textContent = t(M.copyManual)
      }
      setTimeout(() => { button.textContent = t(M.copy) }, 1800)
    })
    pre.append(button)
  }
}

enableReveals()
headerState()
copyButtons()
// #endregion site-enhancement
