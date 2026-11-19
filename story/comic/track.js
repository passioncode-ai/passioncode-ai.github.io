// SITE-068: the story's analytics (the operator, 2026-11-19: «переход за кроликом и переход потом по сайту и в бота
// надо трекать»). The same protocol as the site's assets/analytics.js: fixed words only (the page `story`, a pill, a
// film, a step, a target), never text, a URL or anything typed, in one small batch to the same origin's /api/e; it reads
// and writes nothing on the device, and the Worker (worker/analytics.js) decides what passes. Catalogue:
// docs/analytics/events.md.
const ENDPOINT = '/api/e'
const queue = []
const sent = new Set()   // an event that counts once per page load (a step reached, a film started) is sent once
let timer

const lang = () => (document.documentElement.lang || 'en').toLowerCase()

function flush () {
  clearTimeout(timer)
  if (!queue.length) return
  const body = JSON.stringify({ lang: lang(), events: queue.splice(0, queue.length) })
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return
    fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {})
  } catch (_) { /* never in the reader's way */ }
}

// One event; `once` names it for this page load so it is sent at most once. The batch leaves after two seconds, or
// when the page is hidden.
export function track (name, props = {}, once = null) {
  if (once) { if (sent.has(once)) return; sent.add(once) }
  queue.push({ n: name, p: { page: 'story', ...props } })
  if (window.__trackLog) window.__trackLog.push({ n: name, p: { page: 'story', ...props } })  // only a test sets it
  clearTimeout(timer)
  timer = setTimeout(flush, 2000)
}

addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush() })
addEventListener('pagehide', flush)
