// #region locales — docs: docs/DEPLOYMENT.md#languages
// The site in a second language, with English as the source and the key (fabric-workspace
// knowledge/localization.md, L10N-02). A Russian page is GENERATED: the English page, its markup
// unchanged, with every visible text fragment, translatable attribute and JSON-LD string looked up
// in a catalog (i18n/ru/*.json) and every internal page link moved under /ru/. So the two pages
// cannot drift apart in structure — the release sync, the Worker's live rewriter and the form all
// see the same hooks — and an English fragment that changes fails the gate until it is translated.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

export const ORIGIN = 'https://passioncode.ai'
export const SOURCE_LOCALE = 'en'
export const LOCALES = ['en', 'ru']
// The language switch's visible label in each language: always the language's own name.
export const LANGUAGE_NAMES = { en: 'English', ru: 'Русский' }

// ---- tokens --------------------------------------------------------------------------------

const TOKEN = /<!--[\s\S]*?-->|<![^>]*>|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<\/?[a-zA-Z][^>]*>|[^<]+|</g
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
// Text inside these is a command, a value or a version: it is the same in every language.
const VERBATIM_TAGS = new Set(['code', 'pre', 'kbd', 'samp'])
const VERBATIM_ATTRS = ['data-live', 'data-release-version', 'data-release-sha256']
const TEXT_ATTRS = ['alt', 'aria-label', 'title', 'placeholder', 'label']
const TEXT_META = new Set(['description', 'twitter:title', 'twitter:description', 'og:title', 'og:description', 'og:image:alt'])
// JSON-LD values that are identifiers, URLs, versions or codes, never prose.
const LD_VERBATIM_KEYS = new Set(['@context', '@type', '@id', 'url', 'item', 'image', 'logo', 'sameAs', 'downloadUrl', 'installUrl', 'softwareVersion', 'license', 'operatingSystem', 'applicationCategory', 'email', 'telephone', 'priceCurrency', 'price', 'inLanguage', 'datePublished', 'dateModified', 'totalTime', 'codeRepository', 'contentUrl', 'fileSize', 'availability', 'areaServed', 'memoryRequirements', 'processorRequirements', 'storageRequirements', 'programmingLanguage', 'runtimePlatform', 'targetProduct', 'position', 'contactType'])
const HAS_LETTER = /[A-Za-z]/
// Prose in any language, for comparing the two versions' structure.
const ANY_LETTER = /\p{L}/u

export function tokenize (html) {
  return html.match(TOKEN) || []
}
const tagName = token => /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/.exec(token)?.[1].toLowerCase()
const isClose = token => token.startsWith('</')
const attr = (token, name) => {
  const m = new RegExp(`\\s${name}="([^"]*)"`).exec(token)
  return m ? m[1] : undefined
}
const setAttr = (token, name, value) => new RegExp(`\\s${name}="`).test(token)
  ? token.replace(new RegExp(`(\\s${name}=")[^"]*(")`), (_, a, b) => a + value + b)
  : token.replace(/\s*\/?>$/, end => ` ${name}="${value}"${end}`)
const hasClass = (token, name) => (attr(token, 'class') || '').split(/\s+/).includes(name)

// ---- paths ---------------------------------------------------------------------------------

// `index.html` → `/`, `start/index.html` → `/start/`, `404.html` → `/404.html`.
export const routeOf = file => '/' + file.replace(/index\.html$/, '')
export const localizedFile = (file, locale) => locale === SOURCE_LOCALE ? file : `${locale}/${file}`
export const localeOfFile = file => LOCALES.find(l => l !== SOURCE_LOCALE && file.startsWith(`${l}/`)) || SOURCE_LOCALE
export const sourceFileOf = file => { const l = localeOfFile(file); return l === SOURCE_LOCALE ? file : file.slice(l.length + 1) }

// A link to a page of this site (not an asset, an API route or a download redirect): the root,
// anything ending in a slash, or the not-found page's own file.
function pagePath (path) {
  return path === '/' || path.endsWith('/') || path === '/404.html'
}
// Moves a site-relative or absolute passioncode.ai page URL under /<locale>/; anything else is kept.
export function localizeUrl (value, locale) {
  if (locale === SOURCE_LOCALE) return value
  const absolute = value.startsWith(ORIGIN + '/')
  const rest = absolute ? value.slice(ORIGIN.length) : value
  if (!rest.startsWith('/') || rest.startsWith('//')) return value
  const path = rest.split(/[?#]/, 1)[0]
  if (!pagePath(path) || path.startsWith(`/${locale}/`)) return value
  return (absolute ? ORIGIN : '') + `/${locale}` + rest
}
// The inverse, for comparing two pages' structure.
export function sourceUrl (value) {
  for (const locale of LOCALES) {
    if (locale === SOURCE_LOCALE) continue
    for (const prefix of [`${ORIGIN}/${locale}/`, `/${locale}/`]) {
      if (value.startsWith(prefix)) return value.slice(0, prefix.length - locale.length - 2) + '/' + value.slice(prefix.length)
    }
  }
  return value.replace(/\?lang=[a-z]{2}$/, '')
}
// Where the language switch of a page leads: the same page in the other language; the not-found
// page (served at any unknown address) leads to the other language's home page.
export function counterpartRoute (sourceFile, locale) {
  if (sourceFile === '404.html') return locale === SOURCE_LOCALE ? '/' : `/${locale}/`
  return locale === SOURCE_LOCALE ? routeOf(sourceFile) : `/${locale}${routeOf(sourceFile)}`
}

// ---- catalogs ------------------------------------------------------------------------------

export const catalogKey = text => text.replace(/\s+/g, ' ').trim()

// i18n/<locale>/_common.json holds what several pages share (navigation, footer, names);
// i18n/<locale>/<page>.json what one page says. A page entry wins over a common one.
export function loadCatalog (root, locale) {
  const dir = resolve(root, 'i18n', locale)
  const common = {}
  const pages = {}
  if (!existsSync(dir)) return { common, pages }
  for (const name of readdirSync(dir).filter(n => n.endsWith('.json')).sort()) {
    const data = JSON.parse(readFileSync(resolve(dir, name), 'utf8'))
    if (name === '_common.json') Object.assign(common, data.strings || {})
    else pages[data.page] = data.strings || {}
  }
  return { common, pages }
}
export const catalogFileOf = sourceFile => sourceFile.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\//g, '-') || 'home'

// ---- generation ----------------------------------------------------------------------------

const escapeText = s => s.replace(/&(?!(?:[a-z]+|#\d+|#x[0-9a-f]+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Returns { html, missing, used }: the page in `locale`, the English fragments with no
// translation, and the catalog keys it read. `render` finishes release-bound regions.
export function localizePage (html, { sourceFile, locale, catalog }) {
  const own = catalog.pages[sourceFile] || {}
  const missing = []
  const used = new Set()
  const translate = (text, where) => {
    const key = catalogKey(text)
    if (!key) return text
    // A fragment without letters (a number range, an arrow) needs no translation, but may have
    // one: Russian writes 1 000 where English writes 1,000.
    if (!HAS_LETTER.test(key) && !Object.hasOwn(own, key) && !Object.hasOwn(catalog.common, key)) return text
    let value
    if (Object.hasOwn(own, key)) { value = own[key]; used.add(`${sourceFile}\u0000${key}`) } else if (Object.hasOwn(catalog.common, key)) { value = catalog.common[key]; used.add(`\u0000${key}`) }
    if (value === undefined) { missing.push({ key, where }); return text }
    if (/[<>]/.test(value)) throw new Error(`${sourceFile}: the translation of "${key}" carries markup; translations are text only`)
    // The English fragment's surrounding spaces are kept, unless the translation says otherwise:
    // its own leading or trailing space wins, and one that opens with punctuation takes none.
    const lead = /^\s/.test(value) || /^[,.;:!?)»]/.test(value) ? '' : /^\s*/.exec(text)[0]
    const trail = /\s$/.test(value) || value === '' ? '' : /\s*$/.exec(text)[0]
    return lead + escapeText(value) + trail
  }

  const out = []
  const stack = []
  let region = null
  let languageSwitch = false
  const verbatim = () => region || stack.some(e => e.verbatim)
  for (const token of tokenize(html)) {
    if (token.startsWith('<!--')) {
      const open = /^<!-- release:([a-z-]+) -->$/.exec(token)
      const close = /^<!-- \/release:([a-z-]+) -->$/.exec(token)
      if (open) region = open[1]
      else if (close && close[1] === region) region = null
      out.push(token)
      continue
    }
    if (token.startsWith('<script')) {
      out.push(/type="application\/ld\+json"/.test(token) ? localizeJsonLd(token, locale, translate, sourceFile) : token)
      continue
    }
    if (token.startsWith('<style') || token.startsWith('<!') || token === '<') { out.push(token); continue }
    if (token.startsWith('<')) {
      const name = tagName(token)
      if (isClose(token)) {
        const at = stack.map(e => e.name).lastIndexOf(name)
        if (at >= 0) {
          if (stack[at].languageSwitch) languageSwitch = false
          stack.length = at
        }
        out.push(token)
        continue
      }
      let tag = token
      if (name === 'html') tag = setAttr(tag, 'lang', locale)
      const isSwitch = name === 'a' && hasClass(tag, 'lang-switch')
      if (isSwitch) {
        tag = setAttr(setAttr(setAttr(tag, 'href', counterpartRoute(sourceFile, SOURCE_LOCALE)), 'hreflang', SOURCE_LOCALE), 'lang', SOURCE_LOCALE)
      } else if (attr(tag, 'hreflang') === undefined) {
        // An alternate link already names each language's address; everything else moves.
        for (const a of ['href', 'action']) {
          const value = attr(tag, a)
          if (value === undefined) continue
          let next = localizeUrl(value, locale)
          if (a === 'action' && value === '/api/leads') next = `/api/leads?lang=${locale}`
          if (next !== value) tag = setAttr(tag, a, next)
        }
        if (name === 'meta' && attr(tag, 'property') === 'og:url') tag = setAttr(tag, 'content', localizeUrl(attr(tag, 'content'), locale))
      }
      if (!verbatim()) {
        for (const a of TEXT_ATTRS) {
          const value = attr(tag, a)
          if (value !== undefined && HAS_LETTER.test(value)) tag = setAttr(tag, a, translate(value, `${name}[${a}]`))
        }
        if (name === 'meta' && TEXT_META.has(attr(tag, 'name') || attr(tag, 'property'))) tag = setAttr(tag, 'content', translate(attr(tag, 'content'), `meta ${attr(tag, 'name') || attr(tag, 'property')}`))
      }
      if (name === 'meta' && attr(tag, 'property') === 'og:locale') tag = setAttr(tag, 'content', OG_LOCALES[locale])
      if (name === 'meta' && attr(tag, 'property') === 'og:locale:alternate') tag = setAttr(tag, 'content', OG_LOCALES[SOURCE_LOCALE])
      out.push(tag)
      if (!VOID.has(name) && !token.endsWith('/>')) {
        stack.push({ name, languageSwitch: isSwitch, verbatim: VERBATIM_TAGS.has(name) || VERBATIM_ATTRS.some(a => attr(token, a) !== undefined) })
        if (isSwitch) languageSwitch = true
      }
      continue
    }
    if (languageSwitch) { out.push(token.replace(catalogKey(token), LANGUAGE_NAMES[SOURCE_LOCALE])); continue }
    out.push(verbatim() ? token : translate(token, stack.at(-1)?.name || 'text'))
  }
  return { html: out.join(''), missing, used }
}
export const OG_LOCALES = { en: 'en_US', ru: 'ru_RU' }

// JSON-LD keeps its formatting: string literals are replaced in place. A literal followed by a
// colon is a key; a value's key decides whether it is prose (translated) or an identifier (kept;
// page URLs under url/item move with the page).
function localizeJsonLd (token, locale, translate, sourceFile) {
  const open = /^<script\b[^>]*>/.exec(token)[0]
  const body = token.slice(open.length, -'</script>'.length)
  JSON.parse(body) // refuse to touch a block that does not parse
  let key = null
  const out = body.replace(/"(?:[^"\\]|\\.)*"/g, (literal, offset) => {
    const after = body.slice(offset + literal.length).match(/^\s*(.)/)?.[1]
    const value = JSON.parse(literal)
    if (after === ':') { key = value; return literal }
    if (key === 'url' || key === 'item') return JSON.stringify(localizeUrl(value, locale))
    if (LD_VERBATIM_KEYS.has(key) || !HAS_LETTER.test(value) || /^(?:https?:|mailto:)/.test(value)) return literal
    const next = translate(value, `json-ld ${key}`)
    return next === value ? literal : JSON.stringify(next).replace(/</g, '\\u003c')
  })
  JSON.parse(out)
  return open + out + '</script>'
}

// ---- structure -----------------------------------------------------------------------------

const DROPPED_ATTRS = new Set([...TEXT_ATTRS, 'lang', 'hreflang'])
// The element skeleton two language versions must share: every tag in order, with its attributes
// except the translatable ones, links compared in the source language, and JSON-LD reduced to its
// keys and identifiers. Text is not part of it.
export function skeleton (html) {
  const out = []
  for (const token of tokenize(html)) {
    if (token.startsWith('<script') && /type="application\/ld\+json"/.test(token)) {
      const body = token.slice(/^<script\b[^>]*>/.exec(token)[0].length, -'</script>'.length)
      const walk = (node, key) => {
        if (Array.isArray(node)) return node.map(v => walk(v, key))
        if (node && typeof node === 'object') return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v, k)]))
        if (typeof node !== 'string') return node
        if (key === 'url' || key === 'item') return sourceUrl(node)
        return LD_VERBATIM_KEYS.has(key) || !ANY_LETTER.test(node) || /^(?:https?:|mailto:)/.test(node) ? node : '*'
      }
      out.push(`ld:${JSON.stringify(walk(JSON.parse(body)))}`)
      continue
    }
    if (token.startsWith('<!--')) { if (/^<!-- \/?release:/.test(token)) out.push(token); continue }
    if (!token.startsWith('<') || token === '<' || token.startsWith('<style') || token.startsWith('<!')) continue
    const name = tagName(token)
    if (isClose(token)) { out.push(`</${name}>`); continue }
    const attrs = [...token.matchAll(/\s([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:="([^"]*)")?/g)]
      .filter(([, a]) => !DROPPED_ATTRS.has(a))
      .filter(([, a]) => !(name === 'meta' && a === 'content' && (TEXT_META.has(attr(token, 'name') || attr(token, 'property')) || /^og:locale/.test(attr(token, 'property') || ''))))
      .filter(([, a]) => !(hasClass(token, 'lang-switch') && a === 'href'))
      .map(([, a, v = '']) => `${a}=${['href', 'action'].includes(a) || (a === 'content' && attr(token, 'property') === 'og:url') ? sourceUrl(v) : v}`)
      .sort()
    out.push(`<${name}${attrs.length ? ' ' + attrs.join(' ') : ''}>`)
  }
  return out
}

// The first difference between two skeletons, or null.
export function skeletonDiff (a, b) {
  const n = Math.max(a.length, b.length)
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) return { index: i, source: a[i], localized: b[i] }
  return null
}
// #endregion locales
