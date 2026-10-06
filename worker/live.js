// #region live-values — docs: docs/DEPLOYMENT.md#always-current-versions
// What a `data-live` marker in a page means. The Worker applies it at the edge with
// HTMLRewriter; scripts/sync-releases.mjs applies the same rule to the source files, so the
// bytes in Git equal the last synced snapshot and a request equals the current one.
import { lookup } from './releases.js'

// A path is `<product>.<field>[.<field>]`; `date` is the release day.
export function liveValue (snapshot, path) {
  if (path.endsWith('.date')) {
    const at = lookup(snapshot, path.replace(/\.date$/, '.publishedAt'))
    return typeof at === 'string' ? at.slice(0, 10) : undefined
  }
  const value = lookup(snapshot, path)
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined
}

// JSON-LD blocks carry `data-live-ld="<product>"`; only softwareVersion and downloadUrl move.
export function liveJsonLd (snapshot, product, json) {
  const entry = snapshot?.products?.[product]
  if (!entry) return json
  const data = JSON.parse(json)
  const apply = node => {
    if (!node || typeof node !== 'object') return
    if (node['@type'] === 'SoftwareApplication' && (node.name === entry.name || node['@id']?.endsWith(`#${product}`))) {
      if ('softwareVersion' in node) node.softwareVersion = entry.version
      if ('downloadUrl' in node && entry.assets?.macos?.url) node.downloadUrl = entry.assets.macos.url
    }
    for (const value of Object.values(node)) if (typeof value === 'object') apply(value)
  }
  apply(data)
  // Inserted as raw HTML inside <script>: a "<" in any value must not close the element.
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c')
}

const escapeText = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeAttr = s => escapeText(s).replace(/"/g, '&quot;')

// Source-file form of the rewrite: text-only elements and attributes, nothing else touched.
export function rewriteSource (html, snapshot) {
  let out = html.replace(/(<([a-z0-9]+)\b[^>]*\bdata-live="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/gi, (all, open, tag, path, text, close) => {
    const value = liveValue(snapshot, path)
    return value === undefined ? all : open + escapeText(value) + close
  })
  out = out.replace(/<[a-z0-9]+\b[^>]*\bdata-live-href="([^"]+)"[^>]*>/gi, (tag, path) => {
    const value = liveValue(snapshot, path)
    return value === undefined ? tag : tag.replace(/\shref="[^"]*"/, ` href="${escapeAttr(value)}"`)
  })
  out = out.replace(/(<script type="application\/ld\+json" data-live-ld="([a-z]+)">)([\s\S]*?)(<\/script>)/g, (all, open, product, json, close) => {
    try { return open + liveJsonLd(snapshot, product, json) + close } catch { return all }
  })
  return out
}

// Edge form: an HTMLRewriter that applies the same three rules to a streamed response.
export function liveRewriter (HTMLRewriterClass, snapshot) {
  return new HTMLRewriterClass()
    .on('[data-live]', {
      element (el) {
        const value = liveValue(snapshot, el.getAttribute('data-live'))
        if (value !== undefined) el.setInnerContent(value)
      }
    })
    .on('[data-live-href]', {
      element (el) {
        const value = liveValue(snapshot, el.getAttribute('data-live-href'))
        if (value !== undefined) el.setAttribute('href', value)
      }
    })
    .on('script[data-live-ld]', {
      element (el) { this.product = el.getAttribute('data-live-ld'); this.buffer = '' },
      text (chunk) {
        this.buffer += chunk.text
        chunk.remove()
        if (chunk.lastInTextNode) {
          let json = this.buffer
          try { json = liveJsonLd(snapshot, this.product, this.buffer) } catch {}
          chunk.after(json, { html: true })
        }
      }
    })
}
// #endregion live-values
