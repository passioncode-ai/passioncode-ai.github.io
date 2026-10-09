// #region locales — docs: docs/DEPLOYMENT.md#languages
// The site in several languages, with English as the source and the key (fabric-workspace
// knowledge/localization.md, L10N-02). The languages are i18n/locales.json. A page in another
// language is GENERATED: the English page, its markup unchanged, with every visible text
// fragment, translatable attribute and JSON-LD string looked up in that language's catalog
// (i18n/<locale>/*.json) and every internal page link moved under /<locale>/. So the language
// versions cannot drift apart in structure — the release sync, the Worker's live rewriter and the
// form all see the same hooks — and an English fragment that changes fails the gate until it is
// translated. The parts that name the languages themselves — <html lang>, the hreflang alternates,
// og:locale and the language switch — are the page's "chrome", written from the registry on every
// page, English included (applyChrome).
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { LOCALES, NOINDEX, REGISTRY, SOURCE_LOCALE, TRANSLATED_LOCALES } from './pages.mjs'

export { LOCALES, SOURCE_LOCALE, TRANSLATED_LOCALES }
export const ORIGIN = 'https://passioncode.ai'
export const localeInfo = locale => {
  const info = REGISTRY.locales[locale]
  if (!info) throw new Error(`Unknown locale ${locale} (i18n/locales.json)`)
  return info
}
// The language switch's visible label in each language: always the language's own name.
export const LANGUAGE_NAMES = Object.fromEntries(LOCALES.map(l => [l, localeInfo(l).name]))
export const OG_LOCALES = Object.fromEntries(LOCALES.map(l => [l, localeInfo(l).og]))

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
// Prose in any language, for comparing the language versions' structure.
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
const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ---- paths ---------------------------------------------------------------------------------

// `index.html` → `/`, `start/index.html` → `/start/`, `404.html` → `/404.html`.
export const routeOf = file => '/' + file.replace(/index\.html$/, '')
export const prefixOf = locale => locale === SOURCE_LOCALE ? '' : `/${locale}`
export const localizedFile = (file, locale) => locale === SOURCE_LOCALE ? file : `${locale}/${file}`
export const localeOfFile = file => TRANSLATED_LOCALES.find(l => file.startsWith(`${l}/`)) || SOURCE_LOCALE
export const sourceFileOf = file => { const l = localeOfFile(file); return l === SOURCE_LOCALE ? file : file.slice(l.length + 1) }
// A page's own address in a language: `/ru/start/`.
export const pageRoute = (sourceFile, locale) => prefixOf(locale) + routeOf(sourceFile)

// A link to a page of this site (not an asset, an API route or a download redirect): the root,
// anything ending in a slash, or the not-found page's own file.
function pagePath (path) {
  return path === '/' || path.endsWith('/') || path === '/404.html'
}
const inLocale = path => TRANSLATED_LOCALES.some(l => path === `/${l}/` || path.startsWith(`/${l}/`))
// Moves a site-relative or absolute passioncode.ai page URL under /<locale>/; anything else is kept.
export function localizeUrl (value, locale) {
  if (locale === SOURCE_LOCALE) return value
  const absolute = value.startsWith(ORIGIN + '/')
  const rest = absolute ? value.slice(ORIGIN.length) : value
  if (!rest.startsWith('/') || rest.startsWith('//')) return value
  const path = rest.split(/[?#]/, 1)[0]
  if (!pagePath(path) || inLocale(path)) return value
  return (absolute ? ORIGIN : '') + `/${locale}` + rest
}
// The inverse, for comparing two pages' structure.
export function sourceUrl (value) {
  for (const locale of TRANSLATED_LOCALES) {
    for (const prefix of [`${ORIGIN}/${locale}/`, `/${locale}/`]) {
      if (value.startsWith(prefix)) return value.slice(0, prefix.length - locale.length - 2) + '/' + value.slice(prefix.length)
    }
  }
  return value.replace(/\?lang=[a-z]{2,3}(?:-[A-Za-z0-9]+)?$/, '')
}
// Where the language switch of a page leads: the same page in that language; the not-found page
// (served at any unknown address) leads to that language's home page.
export function counterpartRoute (sourceFile, locale) {
  return sourceFile === '404.html' ? `${prefixOf(locale)}/` : pageRoute(sourceFile, locale)
}

// ---- chrome: what names the languages ------------------------------------------------------

// Every language version of an indexed page, then x-default (English): the same list on every
// version, so hreflang is reciprocal. Pages kept out of search carry none.
export function alternates (sourceFile) {
  if (NOINDEX.has(sourceFile)) return []
  return [...LOCALES.map(l => [l, ORIGIN + pageRoute(sourceFile, l)]), ['x-default', ORIGIN + pageRoute(sourceFile, SOURCE_LOCALE)]]
}
// The visible switch. With two languages it is one link to the other; with more, a disclosure
// that lists them all (it works without JavaScript: <details>). Each link leads to the same page
// in that language and carries its hreflang and lang.
export function languageSwitch (sourceFile, locale) {
  const others = LOCALES.filter(l => l !== locale)
  const link = (l, cls = '') => `<a${cls} href="${counterpartRoute(sourceFile, l)}" hreflang="${l}" lang="${l}">${escapeHtml(LANGUAGE_NAMES[l])}</a>`
  if (others.length === 1) return link(others[0], ' class="lang-switch"')
  const label = `${localeInfo(locale).switchLabel}: ${LANGUAGE_NAMES[locale]}`
  return `<details class="lang-switch lang-menu"><summary aria-label="${escapeHtml(label)}"><span lang="${locale}">${escapeHtml(LANGUAGE_NAMES[locale])}</span></summary><ul>${others.map(l => `<li>${link(l)}</li>`).join('')}</ul></details>`
}
const SWITCH = /<a class="lang-switch"[^>]*>[^<]*<\/a>|<details class="lang-switch[^"]*">[\s\S]*?<\/details>/g
const CANONICAL = /(<link rel="canonical" href=")[^"]*(">)((?:\n\s*)?(?:<link rel="alternate" hreflang="[^"]*" href="[^"]*">)+)?/
const OG_LOCALE = /(<meta property="og:site_name" content="[^"]*">)(?:<meta property="og:locale(?::alternate)?" content="[^"]*">)*/
// Writes the chrome of `sourceFile` in `locale` into a page: <html lang>, the canonical address,
// the hreflang alternates, og:locale with every other language as og:locale:alternate, and the
// language switch. Refuses a page that lacks one of the places they go.
export function applyChrome (html, { sourceFile, locale }) {
  const where = localizedFile(sourceFile, locale)
  if (!/<html lang="[^"]*">/.test(html)) throw new Error(`${where}: no <html lang>`)
  if (!CANONICAL.test(html)) throw new Error(`${where}: no canonical link`)
  if ((html.match(SWITCH) || []).length !== 1) throw new Error(`${where}: expected one language switch (class="lang-switch")`)
  const links = alternates(sourceFile).map(([l, href]) => `<link rel="alternate" hreflang="${l}" href="${href}">`).join('')
  let out = html
    .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(CANONICAL, (_, open, close) => open + ORIGIN + pageRoute(sourceFile, locale) + close + (links ? `\n  ${links}` : ''))
    .replace(SWITCH, () => languageSwitch(sourceFile, locale))
  if (OG_LOCALE.test(out)) out = out.replace(OG_LOCALE, (_, site) => site + `<meta property="og:locale" content="${OG_LOCALES[locale]}">` + LOCALES.filter(l => l !== locale).map(l => `<meta property="og:locale:alternate" content="${OG_LOCALES[l]}">`).join(''))
  if (/<link rel="alternate" hreflang=/.test(out.replace(links, ''))) throw new Error(`${where}: an hreflang alternate outside the generated list`)
  return out
}

// ---- catalogs ------------------------------------------------------------------------------

export const catalogKey = text => text.replace(/\s+/g, ' ').trim()

// i18n/<locale>/_common.json holds what several pages share (navigation, footer, names);
// i18n/<locale>/<page>.json what one page says (a page may have several files: Switchboard's
// release regions have their own). A page entry wins over a common one.
// i18n/<locale>/_scripts.json translates what the site's scripts and the Worker say
// (assets/messages.js, worker/messages.js). i18n/<locale>/_checks.json holds the gate's
// assertions in that language (scripts/check-site.mjs): banned phrases and the disclosures a
// translation may not soften.
export function loadCatalog (root, locale) {
  const dir = resolve(root, 'i18n', locale)
  const catalog = { common: {}, pages: {}, scripts: {}, checks: null, origin: {} }
  if (!existsSync(dir)) return catalog
  for (const name of readdirSync(dir).filter(n => n.endsWith('.json')).sort()) {
    const data = JSON.parse(readFileSync(resolve(dir, name), 'utf8'))
    if (name === '_checks.json') { catalog.checks = data; continue }
    const target = name === '_common.json' ? catalog.common : name === '_scripts.json' ? catalog.scripts : (catalog.pages[data.page] ??= {})
    if (!data.strings || typeof data.strings !== 'object') throw new Error(`i18n/${locale}/${name}: no "strings"`)
    for (const [key, value] of Object.entries(data.strings)) {
      if (key !== catalogKey(key)) throw new Error(`i18n/${locale}/${name}: the key "${key}" has extra spaces`)
      if (Object.hasOwn(target, key) && JSON.stringify(target[key]) !== JSON.stringify(value)) throw new Error(`i18n/${locale}/${name}: "${key}" is translated twice, differently (also in ${catalog.origin[`${data.page}\u0000${key}`]})`)
      target[key] = value
      catalog.origin[`${data.page}\u0000${key}`] = name
    }
  }
  return catalog
}
export const catalogFileOf = sourceFile => sourceFile.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\//g, '-') || 'home'

// Named placeholders (`{id}`, `{n}`) a translation must keep, exactly (L10N-02).
export const placeholders = text => [...String(text).matchAll(/\{([a-zA-Z]\w*)\}/g)].map(m => m[1]).sort()
export const pluralCategories = locale => new Intl.PluralRules(localeInfo(locale).intl).resolvedOptions().pluralCategories.slice().sort()

// The script and Worker messages of one language. `messages` is the English source
// ({ name: 'text' | { one, other } }); the catalog is keyed by the English text (a plural by its
// `other` form). Returns { table, missing, problems, used }: `table` maps each English text to its
// translation (a plural to its forms), ready to bundle.
export function translateMessages (messages, strings, locale) {
  const table = {}
  const missing = []
  const problems = []
  const used = new Set()
  const categories = pluralCategories(locale)
  for (const [name, english] of Object.entries(messages)) {
    const plural = typeof english === 'object'
    const key = plural ? english.other : english
    if (!Object.hasOwn(strings, key)) { missing.push({ key, where: `message ${name}` }); continue }
    used.add(key)
    const value = strings[key]
    const forms = plural ? value : { other: value }
    if (plural !== (typeof value === 'object')) { problems.push(`${locale}: "${key}" must be ${plural ? `an object of plural forms (${categories.join(', ')})` : 'a string'}`); continue }
    if (plural && JSON.stringify(Object.keys(value).sort()) !== JSON.stringify(categories)) problems.push(`${locale}: "${key}" has plural forms ${Object.keys(value).sort().join(', ')}, the language needs ${categories.join(', ')} (L10N-03)`)
    for (const form of Object.values(forms)) {
      if (typeof form !== 'string' || !form) problems.push(`${locale}: "${key}" has an empty form`)
      else if (JSON.stringify(placeholders(form)) !== JSON.stringify(placeholders(key))) problems.push(`${locale}: "${key}" → "${form}": placeholders differ (L10N-02)`)
    }
    table[key] = value
  }
  return { table, missing, problems, used }
}

// ---- generation ----------------------------------------------------------------------------

// Full-width punctuation (CJK): what may open a fragment without a space before it, and what may
// end one without a space after it.
const CJK_OPENS_WITH = /^[、。，．：；！？）」』】〕〉》]/u
const CJK_ENDS_WITH = /[、。，．：；！？（「『【〔〈《）」』】〕〉》]$/u
// Chinese and Japanese put no space between characters; the English source has one around a link
// or a name, which a translation inherits. Around links (and code, in Japanese) that space is
// removed where it would sit between CJK characters or beside full-width punctuation. Japanese
// (`latinSpacing: false` in the registry) also writes Latin names against CJK text without it.
const CJK_CHAR = '[\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}、。，．：；！？（）「」『』【】〔〕〈〉《》ー]'
const CJK_PUNCT = '[、。，．：；！？（）「」『』【】〔〕〈〉《》]'
export function tightenCjk (html, locale) {
  const C = CJK_CHAR
  const P = CJK_PUNCT
  const latin = localeInfo(locale).latinSpacing !== false
  const rules = [
    [`(${P}) +(?=<(?:a|code|em|strong|b)\\b)`, '$1'],
    [`(</(?:a|code|em|strong|b)>) +(?=${P})`, '$1'],
    [`(${C}) +(<a\\b[^>]*>)(?=${C})`, '$1$2'],
    [`(${C}</a>) +(?=${C})`, '$1']
  ]
  if (!latin) rules.push([`(${C}) +(?=<(?:a\\b|code\\b))`, '$1'], [`(</(?:a|code)>) +(?=${C})`, '$1'])
  let out = html
  for (const [pattern, replacement] of rules) out = out.replace(new RegExp(pattern, 'gu'), replacement)
  return out
}
const escapeText = s => s.replace(/&(?!(?:[a-z]+|#\d+|#x[0-9a-f]+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Returns { html, missing, used }: the page in `locale`, the English fragments with no
// translation, and the catalog keys it read.
export function localizePage (html, { sourceFile, locale, catalog }) {
  if (locale === SOURCE_LOCALE) return { html: applyChrome(html, { sourceFile, locale }), missing: [], used: new Set() }
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
    if (typeof value !== 'string') throw new Error(`${sourceFile}: the translation of "${key}" is not a string`)
    if (/[<>]/.test(value)) throw new Error(`${sourceFile}: the translation of "${key}" carries markup; translations are text only`)
    if (JSON.stringify(placeholders(value)) !== JSON.stringify(placeholders(key))) throw new Error(`${sourceFile}: the translation of "${key}" changes its placeholders`)
    // The English fragment's surrounding spaces are kept, unless the translation says otherwise:
    // its own leading or trailing space wins, and one that opens with punctuation takes none.
    // Chinese and Japanese full-width punctuation carries its own spacing, so a translation that
    // opens with closing punctuation (，。）) or ends with any (。、（) takes no space on that side.
    const lead = /^\s/.test(value) || /^[,.;:!?)»]/.test(value) || CJK_OPENS_WITH.test(value) ? '' : /^\s*/.exec(text)[0]
    const trail = /\s$/.test(value) || value === '' || CJK_ENDS_WITH.test(value) ? '' : /\s*$/.exec(text)[0]
    return lead + escapeText(value) + trail
  }

  const out = []
  const stack = []
  let region = null
  const verbatim = () => stack.some(e => e.verbatim)
  for (const token of tokenize(html)) {
    if (token.startsWith('<!--')) {
      // Release regions (scripts/switchboard-release.mjs) are written in English by the renderer
      // and translated here like the rest; build-locale.mjs requires every variant a release can
      // produce to be in the catalog.
      const open = /^<!-- release:([a-z-]+) -->$/.exec(token)
      const close = /^<!-- \/release:([a-z-]+) -->$/.exec(token)
      if (open) region = open[1]
      else if (close && close[1] === region) region = null
      out.push(token)
      continue
    }
    if (token.startsWith('<script')) {
      out.push(/type="application\/ld\+json"/.test(token) ? localizeJsonLd(token, locale, translate) : token)
      continue
    }
    if (token.startsWith('<style') || token.startsWith('<!') || token === '<') { out.push(token); continue }
    if (token.startsWith('<')) {
      const name = tagName(token)
      if (isClose(token)) {
        const at = stack.map(e => e.name).lastIndexOf(name)
        if (at >= 0) stack.length = at
        out.push(token)
        continue
      }
      let tag = token
      // The language switch and the alternates name each language's own address; the chrome
      // rewrites them below. Every other page link moves under /<locale>/.
      const isSwitch = hasClass(tag, 'lang-switch')
      if (!isSwitch && !verbatimSwitch(stack) && attr(tag, 'hreflang') === undefined) {
        for (const a of ['href', 'action']) {
          const value = attr(tag, a)
          if (value === undefined) continue
          let next = localizeUrl(value, locale)
          if (a === 'action' && value === '/api/leads') next = `/api/leads?lang=${locale}`
          if (next !== value) tag = setAttr(tag, a, next)
        }
        if (name === 'meta' && attr(tag, 'property') === 'og:url') tag = setAttr(tag, 'content', localizeUrl(attr(tag, 'content'), locale))
      }
      if (!verbatim() && !isSwitch) {
        for (const a of TEXT_ATTRS) {
          const value = attr(tag, a)
          if (value !== undefined && HAS_LETTER.test(value)) tag = setAttr(tag, a, translate(value, `${name}[${a}]`))
        }
        if (name === 'meta' && TEXT_META.has(attr(tag, 'name') || attr(tag, 'property'))) tag = setAttr(tag, 'content', translate(attr(tag, 'content'), `meta ${attr(tag, 'name') || attr(tag, 'property')}`))
      }
      out.push(tag)
      if (!VOID.has(name) && !token.endsWith('/>')) {
        stack.push({ name, switch: isSwitch, verbatim: isSwitch || VERBATIM_TAGS.has(name) || VERBATIM_ATTRS.some(a => attr(token, a) !== undefined) })
      }
      continue
    }
    out.push(verbatim() ? token : translate(token, `${region ? `release:${region} ` : ''}${stack.at(-1)?.name || 'text'}`))
  }
  return { html: applyChrome(tightenCjk(out.join(''), locale), { sourceFile, locale }), missing, used }
}
const verbatimSwitch = stack => stack.some(e => e.switch)

// JSON-LD keeps its formatting: string literals are replaced in place. A literal followed by a
// colon is a key; a value's key decides whether it is prose (translated) or an identifier (kept;
// page URLs under url/item move with the page).
function localizeJsonLd (token, locale, translate) {
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
// The element skeleton every language version must share: every tag in order, with its
// attributes except the translatable ones, links compared in the source language, and JSON-LD
// reduced to its keys and identifiers. Text is not part of it, nor the chrome (the language
// switch, the hreflang alternates, og:locale), which names the languages and differs by design.
export function skeleton (html) {
  const out = []
  let skip = 0
  const stack = []
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
      if (!skip) out.push(`ld:${JSON.stringify(walk(JSON.parse(body)))}`)
      continue
    }
    if (token.startsWith('<!--')) { if (!skip && /^<!-- \/?release:/.test(token)) out.push(token); continue }
    if (!token.startsWith('<') || token === '<' || token.startsWith('<style') || token.startsWith('<!')) continue
    const name = tagName(token)
    if (isClose(token)) {
      const at = stack.lastIndexOf(name)
      const skipping = skip > 0
      if (at >= 0) { if (skip && at < skip) skip = 0; stack.length = at }
      if (!skipping) out.push(`</${name}>`)
      continue
    }
    const opens = !VOID.has(name) && !token.endsWith('/>')
    if (!skip && hasClass(token, 'lang-switch')) {
      if (opens) { stack.push(name); skip = stack.length } else continue
      continue
    }
    if (opens) stack.push(name)
    if (skip) continue
    if (name === 'link' && attr(token, 'hreflang') !== undefined) continue
    if (name === 'meta' && /^og:locale/.test(attr(token, 'property') || '')) continue
    const attrs = [...token.matchAll(/\s([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:="([^"]*)")?/g)]
      .filter(([, a]) => !DROPPED_ATTRS.has(a))
      .filter(([, a]) => !(name === 'meta' && a === 'content' && TEXT_META.has(attr(token, 'name') || attr(token, 'property'))))
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
