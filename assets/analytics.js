// SITE-049: the page's half of the site analytics (catalogue docs/analytics/events.md, Worker worker/analytics.js).
// It sends fixed words only (the page, a section, a target, a percent), never text, a URL, an address or anything typed,
// in one small batch to the same origin; it reads and writes nothing on the device. The Worker decides what passes.
const ENDPOINT = '/api/e'
const queue = []
let timer

// The page's language as the site names it (pt-BR → pt-br, zh-Hans → zh-hans).
export const lang = () => (document.documentElement.lang || 'en').toLowerCase()

// The page's id from its path, without the language prefix.
export function pageOf (pathname, locales = ['ru', 'de', 'fr', 'pl', 'ko', 'es', 'pt-br', 'zh-hans', 'ja']) {
  const parts = pathname.split('/').filter(Boolean)
  if (locales.includes(parts[0])) parts.shift()
  if (!parts.length) return 'home'
  const known = ['vision', 'start', 'business', 'privacy', 'switchboard', 'fabric', 'inbox', 'dashboards', 'observatory', 'design-system']
  if (parts[0] === 'business' && parts[1] === 'thanks') return 'business-thanks'
  if ((parts[0] === 'switchboard' || parts[0] === 'fabric') && parts[1] === 'agents') return `${parts[0]}-agents`
  // SITE-056: the agent templates, guides and blog; a page under each is one kind, the slug is not a page name.
  const sections = { agents: 'agent-template', guides: 'guide', blog: 'blog-post' }
  if (sections[parts[0]]) return parts.length === 1 ? parts[0] : parts.length === 2 ? sections[parts[0]] : 'other'
  return known.includes(parts[0]) && parts.length === 1 ? parts[0] : 'other'
}

const page = () => pageOf(location.pathname)

function flush () {
  clearTimeout(timer)
  if (!queue.length) return
  const body = JSON.stringify({ lang: lang(), events: queue.splice(0, queue.length) })
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return
    fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {})
  } catch (_) { /* never in the visitor's way */ }
}

// Queue one event; the batch leaves after two seconds, or when the page is hidden.
export function track (name, props = {}) {
  queue.push({ n: name, p: { page: page(), ...props } })
  clearTimeout(timer)
  timer = setTimeout(flush, 2000)
}

function wire () {
  track('page_view')
  addEventListener('pagehide', flush)
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush() })
  document.addEventListener('click', event => {
    const el = event.target.closest?.('[data-cta], .copy-button, .copy-prompt, .lang-switch a[hreflang]')
    if (!el) return
    if (el.matches('[data-cta]')) {
      track('cta_click', { location: el.dataset.ctaLocation || 'other', target: el.dataset.cta })
      // SITE-056: which agent template a visitor asked for (catalogue: template_request).
      if (el.dataset.template) track('template_request', { template: el.dataset.template })
    }
    else if (el.matches('.copy-button, .copy-prompt')) track('command_copy')
    else track('lang_switch', { to: (el.getAttribute('hreflang') || '').toLowerCase() })
  })
  const video = document.querySelector('#video video')
  if (video) {
    const sent = new Set()
    const mark = percent => { if (!sent.has(percent)) { sent.add(percent); track('video_progress', { percent }) } }
    video.addEventListener('play', () => mark('0'))
    video.addEventListener('timeupdate', () => {
      if (!video.duration) return
      const share = video.currentTime / video.duration
      if (share >= 0.25) mark('25')
      if (share >= 0.5) mark('50')
    })
    video.addEventListener('ended', () => mark('100'))
  }
}

if (typeof document !== 'undefined') wire()
