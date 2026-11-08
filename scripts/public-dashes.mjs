// #region public-dashes — docs: docs/brand/README.md#dashes-in-public-text
// SITE-057: the words a person reads on passioncode.ai carry no em dash (U+2014) and no
// substitute for one: two hyphens, a hyphen or an en dash with a space on each side, used
// between words. The operator's rule for every text people read (2026-11-08); write a full
// stop, comma, colon or parentheses instead.
//
// What counts as read: text nodes and the attributes a visitor, a screen reader or a search
// result shows (alt, title, aria-label, placeholder, the content of description and Open Graph
// meta), the string values of JSON-LD, the translation catalogs, the browser and Worker
// messages, llms.txt and the published agent prompt.
// The allowlist, where a dash stays: code (code, pre, kbd, samp), scripts other than JSON-LD,
// styles, SVG, templates and HTML comments, because none of them is prose; ranges written with
// an unspaced en dash (25–50 %) and hyphenated words, because neither is a dash between words.
// The Worker's notice to the commercial mailbox (worker/leads.js) is internal and not checked.

// Each rule names what it found, so a failure says which character to rewrite.
export const DASH_RULES = [
  ['em dash', /\u2014/u],
  ['two hyphens used as a dash', /(?<=\S) -- (?=\S)/u],
  ['spaced hyphen used as a dash', /(?<=[\p{L}\p{N},.)»"”’]) - (?=[\p{L}\p{N}«"“‘(])/u],
  ['spaced en dash used as a dash', /(?<=[\p{L}\p{N},.)»"”’]) \u2013 (?=[\p{L}\p{N}«"“‘(])/u]
]

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '\u2014', ndash: '\u2013', hellip: '…', laquo: '«', raquo: '»', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', middot: '·', rarr: '→', larr: '←', copy: '©', thinsp: '\u2009', zwnj: '' }
export const decode = text => text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, name) => {
  if (name[0] === '#') return String.fromCodePoint(name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : Number(name.slice(1)))
  return ENTITIES[name.toLowerCase()] ?? whole
})

// Spaces of every width read as one space, so a no-break space next to a dash still counts.
const normalize = text => text.replace(/[\u00a0\u202f\u2009\s]+/g, ' ')

// The dash findings in one piece of text: [{ rule, excerpt }].
export function findDashes (text) {
  const flat = normalize(text)
  const found = []
  for (const [rule, pattern] of DASH_RULES) {
    const global = new RegExp(pattern.source, 'gu')
    for (const m of flat.matchAll(global)) found.push({ rule, excerpt: flat.slice(Math.max(0, m.index - 40), m.index + 40).trim() })
  }
  return found
}

const READ_ATTRIBUTES = ['alt', 'title', 'aria-label', 'placeholder']
const READ_META = /^(?:description|og:[a-z:_]+|twitter:[a-z:_]+)$/

// The pieces of an HTML page a person reads: [{ where, text }], entities decoded.
export function readableParts (html) {
  const parts = []
  for (const [, body] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const walk = (value, path) => {
      if (typeof value === 'string') parts.push({ where: `JSON-LD ${path}`, text: value })
      else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`))
      else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`)
    }
    walk(JSON.parse(body), '$')
  }
  const visible = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|svg|template|code|pre|kbd|samp)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  for (const [tag] of visible.matchAll(/<[a-z][a-z0-9-]*\b[^>]*>/gi)) {
    const attributes = Object.fromEntries([...tag.matchAll(/\s([a-z-:]+)="([^"]*)"/gi)].map(m => [m[1].toLowerCase(), m[2]]))
    for (const name of READ_ATTRIBUTES) if (attributes[name]) parts.push({ where: `${name}=`, text: decode(attributes[name]) })
    if (/^<meta\b/i.test(tag) && attributes.content && READ_META.test(attributes.name ?? attributes.property ?? '')) parts.push({ where: `meta ${attributes.name ?? attributes.property}`, text: decode(attributes.content) })
  }
  for (const text of visible.split(/<[^>]*>/)) if (text.trim()) parts.push({ where: 'text', text: decode(text) })
  return parts
}

// Every string value of a translation catalog (i18n/<locale>/*.json): its translations and its
// gate phrases. The keys are the English pages' words, checked on those pages.
export function catalogParts (data) {
  const parts = []
  const walk = (value, path) => {
    if (typeof value === 'string') parts.push({ where: path, text: value })
    else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`))
    else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) if (!k.startsWith('$')) walk(v, `${path}.${k}`)
  }
  walk(data, '$')
  return parts.filter(p => !/^\$\.(page|pages)$/.test(p.where))
}

// The quoted strings of a message module (assets/messages.js, worker/messages.js), comments
// left out.
export function moduleStringParts (source) {
  const code = source.split('\n').filter(line => !/^\s*\/\//.test(line)).join('\n')
  return [...code.matchAll(/'((?:[^'\\\n]|\\.)*)'/g)].map(m => ({ where: 'string', text: m[1] }))
}

// A plain-text file (llms.txt, the agent prompt), one part per line, Markdown list markers and
// headings left out (they open a line, they are not a dash between words).
export const textFileParts = source => source.split('\n')
  .map((line, i) => ({ where: `line ${i + 1}`, text: line.replace(/^\s*(?:[-*+]|#{1,6}|\d+\.)\s+/, '') }))
  .filter(part => part.text.trim())

// [{ where, rule, excerpt }] for a list of parts.
export const dashFindings = parts => parts.flatMap(({ where, text }) => findDashes(text).map(f => ({ where, ...f })))
// #endregion public-dashes
