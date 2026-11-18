// assessment.passioncode.ai: static assets, plus byte ranges for the media under /story/film/ and /story/comic/audio/.
// Static assets answer a Range request with the whole file (measured 2026-11-18: 200 on a cache miss and a hit), and
// Safari plays no MP4 without 206 while every browser needs one to seek. wrangler.assessment.json runs this Worker
// first only for those paths; every other request goes straight to the assets.

// [first, last] for a single 'bytes=' range of a file of `size` bytes, 'unsatisfiable', or null for none we serve
// (absent, not bytes, or several ranges: the whole file is a valid answer to those).
export function parseRange (header, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec((header || '').trim())
  if (!m || (m[1] === '' && m[2] === '')) return null
  let first, last
  if (m[1] === '') { first = Math.max(0, size - Number(m[2])); last = size - 1 }
  else { first = Number(m[1]); last = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1) }
  if (first >= size || first > last) return 'unsatisfiable'
  return [first, last]
}

export default {
  async fetch (request, env) {
    const url = new URL(request.url)
    if (!/^\/story\/(film|comic\/audio)\//.test(url.pathname)) return env.ASSETS.fetch(request)
    const headers = new Headers(request.headers); headers.delete('range'); headers.delete('if-range')
    const res = await env.ASSETS.fetch(new Request(request.url, { method: request.method === 'HEAD' ? 'GET' : request.method, headers }))
    if (res.status !== 200) return res
    const out = new Headers(res.headers); out.set('Accept-Ranges', 'bytes')
    const range = request.headers.get('range')
    if (!range) return new Response(request.method === 'HEAD' ? null : res.body, { status: 200, headers: out })
    const buf = await res.arrayBuffer()
    const r = parseRange(range, buf.byteLength)
    if (r === null) return new Response(request.method === 'HEAD' ? null : buf, { status: 200, headers: out })
    if (r === 'unsatisfiable') { out.set('Content-Range', `bytes */${buf.byteLength}`); out.delete('Content-Length'); return new Response(null, { status: 416, headers: out }) }
    const [first, last] = r
    out.set('Content-Range', `bytes ${first}-${last}/${buf.byteLength}`)
    out.set('Content-Length', String(last - first + 1))
    return new Response(request.method === 'HEAD' ? null : buf.slice(first, last + 1), { status: 206, headers: out })
  }
}
