// npm run locales [-- --check | --missing]
// Writes everything the site's languages (i18n/locales.json) decide, from the English pages and
// the catalogs in i18n/<locale>/ (scripts/locales.mjs, docs/DEPLOYMENT.md#languages):
//   - every translated page (<locale>/…), generated from its English page;
//   - the chrome of the English pages themselves: <html lang>, canonical, hreflang alternates,
//     og:locale and the language switch;
//   - assets/i18n.js and worker/i18n.js, the scripts' and the Worker's message catalogs;
//   - sitemap.xml with every language version of every indexed page;
//   - the "Languages" section of llms.txt.
// Refuses to write while any English fragment or message has no translation, and lists them.
//   --check    changes nothing; fails when a file differs from what it would write, a fragment or
//              message is untranslated, a catalog entry is no longer used, a translation changes
//              its placeholders or plural forms, or two language versions of a page differ in
//              structure.
//   --missing  prints the untranslated fragments as catalog JSON, file by file, to fill in.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { NOINDEX, REGISTRY, SOURCE_PAGES } from './pages.mjs'
import { alternates, catalogFileOf, LANGUAGE_NAMES, LOCALES, loadCatalog, localizePage, localizedFile, ORIGIN, pageRoute, skeleton, skeletonDiff, SOURCE_LOCALE, TRANSLATED_LOCALES, translateMessages } from './locales.mjs'
import { renderSwitchboardPage } from './switchboard-release.mjs'
import { M as SCRIPT_MESSAGES } from '../assets/messages.js'
import { ISSUES, M as WORKER_MESSAGES } from '../worker/messages.js'

const ROOT = resolve(import.meta.dirname, '..')

// Every variant of Switchboard's release-bound regions a release can produce
// (scripts/switchboard-release.mjs): an MIT, a PolyForm and an AGPL release, notarized or not,
// with or without checksums and the launcher plugin. A translation must exist for each, so a
// release sync never meets an untranslated region.
function switchboardVariants (manifest) {
  const out = []
  for (const version of ['0.3.1-beta.1', '0.4.0-beta.1', manifest.version]) {
    for (const macosNotarized of [true, false]) {
      for (const launcherPlugin of [true, false]) {
        for (const sha256 of [{ macos: '0'.repeat(64), windows: '1'.repeat(64) }, {}]) out.push({ ...manifest, version, macosNotarized, launcherPlugin, sha256 })
      }
    }
  }
  return out
}

// The English pages with their chrome, and every translated page, in memory.
export function buildLocale (locale, { root = ROOT, manifest } = {}) {
  manifest ??= JSON.parse(readFileSync(resolve(root, 'switchboard/release.json'), 'utf8'))
  const catalog = loadCatalog(root, locale)
  const pages = []
  const missing = {}
  const used = new Set()
  const note = (sourceFile, result) => {
    for (const key of result.used) used.add(key)
    for (const m of result.missing) {
      const list = (missing[sourceFile] ??= [])
      if (!list.some(e => e.key === m.key)) list.push(m)
    }
  }
  for (const sourceFile of SOURCE_PAGES) {
    const source = readFileSync(resolve(root, sourceFile), 'utf8')
    const result = localizePage(source, { sourceFile, locale, catalog })
    note(sourceFile, result)
    if (sourceFile === 'switchboard/index.html' && locale !== SOURCE_LOCALE) {
      for (const variant of switchboardVariants(manifest)) note(sourceFile, localizePage(renderSwitchboardPage(source, variant), { sourceFile, locale, catalog }))
    }
    pages.push({ sourceFile, file: localizedFile(sourceFile, locale), source, html: result.html })
  }
  const problems = []
  let scripts = {}
  let worker = {}
  if (locale !== SOURCE_LOCALE) {
    const browser = translateMessages(SCRIPT_MESSAGES, catalog.scripts, locale)
    const edge = translateMessages({ ...WORKER_MESSAGES, ...ISSUES }, catalog.scripts, locale)
    for (const r of [browser, edge]) {
      problems.push(...r.problems)
      for (const m of r.missing) (missing['_scripts'] ??= []).some(e => e.key === m.key) || missing['_scripts'].push(m)
      for (const key of r.used) used.add(`_scripts\u0000${key}`)
    }
    scripts = browser.table
    worker = edge.table
    if (!catalog.checks) problems.push(`i18n/${locale}/_checks.json is missing: the gate's banned phrases and disclosures in this language (scripts/check-site.mjs)`)
  }
  const unused = [
    ...Object.keys(catalog.common).filter(k => !used.has(`\u0000${k}`)).map(k => `_common: ${k}`),
    ...Object.keys(catalog.scripts).filter(k => !used.has(`_scripts\u0000${k}`)).map(k => `_scripts: ${k}`),
    ...Object.entries(catalog.pages).flatMap(([page, strings]) => Object.keys(strings).filter(k => !used.has(`${page}\u0000${k}`)).map(k => `${page}: ${k}`))
  ]
  return { pages, missing, unused, problems, scripts, worker }
}

const json = value => JSON.stringify(value, null, 2)
const HEADER = 'GENERATED by scripts/build-locale.mjs from i18n/locales.json and i18n/<locale>/_scripts.json; edit those, then run npm run locales (docs/DEPLOYMENT.md#languages).'
function messageModules (builds) {
  const browserLocales = Object.fromEntries(LOCALES.map(l => [l, { intl: REGISTRY.locales[l].intl }]))
  const workerLocales = Object.fromEntries(LOCALES.map(l => [l, { name: REGISTRY.locales[l].name, englishName: REGISTRY.locales[l].englishName, intl: REGISTRY.locales[l].intl }]))
  const browserCatalogs = Object.fromEntries(TRANSLATED_LOCALES.map(l => [l, builds[l].scripts]))
  const workerCatalogs = Object.fromEntries(TRANSLATED_LOCALES.map(l => [l, builds[l].worker]))
  return {
    'assets/i18n.js': `// ${HEADER}\nimport { translator } from './translate.js'\n\nexport const SOURCE_LOCALE = ${JSON.stringify(SOURCE_LOCALE)}\nexport const LOCALES = ${json(browserLocales)}\nexport const CATALOGS = ${json(browserCatalogs)}\nexport const { resolveLocale, t, tn } = translator({ source: SOURCE_LOCALE, locales: LOCALES, catalogs: CATALOGS })\n`,
    'worker/i18n.js': `// ${HEADER}\nimport { translator } from '../assets/translate.js'\n\nexport const SOURCE_LOCALE = ${JSON.stringify(SOURCE_LOCALE)}\nexport const LOCALES = ${json(workerLocales)}\nexport const CATALOGS = ${json(workerCatalogs)}\nexport const { resolveLocale, t, tn } = translator({ source: SOURCE_LOCALE, locales: LOCALES, catalogs: CATALOGS })\n`
  }
}

// Every indexed page in every language, each naming all its versions (the same list its own
// hreflang links give).
export function sitemap () {
  const urls = LOCALES.flatMap(locale => SOURCE_PAGES.filter(page => !NOINDEX.has(page)).map(page => {
    const links = alternates(page).map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`).join('\n')
    return `  <url><loc>${ORIGIN}${pageRoute(page, locale)}</loc>\n${links}\n  </url>`
  }))
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

// llms.txt names the languages, from the registry, between its "## Languages" heading and the
// next section.
export function llmsText (current) {
  const others = TRANSLATED_LOCALES.map(l => `${REGISTRY.locales[l].englishName} (${LANGUAGE_NAMES[l]}) under /${l}/ — for example ${ORIGIN}/${l}/start/`)
  const line = others.length
    ? `- Every page is published in English and in ${others.length === 1 ? 'one more language' : `${others.length} more languages`}, at the same path under the language's prefix: ${others.join('; ')}. Each page names all its versions with hreflang, English as x-default, and sitemap.xml lists every version. English is the source; where a translated privacy notice differs, the English version prevails.`
    : '- Every page is published in English.'
  const section = `## Languages\n${line}\n`
  if (!/^## Languages\n[\s\S]*?\n(?=## )/m.test(current)) throw new Error('llms.txt: no "## Languages" section followed by another section')
  return current.replace(/^## Languages\n[\s\S]*?\n(?=## )/m, section + '\n')
}

// Everything this script writes, as { file: content }, plus the problems found on the way.
export function generate ({ root = ROOT, manifest } = {}) {
  const builds = {}
  const problems = []
  const missing = {}
  const files = {}
  for (const locale of LOCALES) {
    const b = builds[locale] = buildLocale(locale, { root, manifest })
    problems.push(...b.problems)
    for (const [file, entries] of Object.entries(b.missing)) {
      (missing[locale] ??= {})[file] = entries
      for (const e of entries) problems.push(`${locale}/${file}: untranslated (${e.where}): ${e.key}`)
    }
    for (const entry of b.unused) problems.push(`i18n/${locale}: unused entry — ${entry}`)
    for (const { sourceFile, file, source, html } of b.pages) {
      if (locale !== SOURCE_LOCALE) {
        const diff = skeletonDiff(skeleton(source), skeleton(html))
        if (diff) problems.push(`${file}: structure differs from ${sourceFile} at element ${diff.index}: ${diff.source} ≠ ${diff.localized}`)
      }
      files[file] = html
    }
  }
  Object.assign(files, messageModules(builds))
  files['sitemap.xml'] = sitemap()
  files['llms.txt'] = llmsText(readFileSync(resolve(root, 'llms.txt'), 'utf8'))
  return { files, problems, missing }
}

// Writes (or, with check, compares) every generated file. Returns the problems; nothing is
// written while there is one.
export function writeLocales ({ root = ROOT, manifest, check = false, log = console.log } = {}) {
  const { files, problems } = generate({ root, manifest })
  const stale = []
  for (const [file, content] of Object.entries(files)) {
    const target = resolve(root, file)
    const current = existsSync(target) ? readFileSync(target, 'utf8') : null
    if (current !== content) stale.push([file, target, current === null])
  }
  if (check || problems.length) {
    if (check) for (const [file, , absent] of stale) problems.push(`${file}: ${absent ? 'missing' : 'out of date with the English pages, the registry or the catalogs'} — run npm run locales`)
    return problems
  }
  for (const [file, target] of stale) {
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, files[file])
    log(`WROTE: ${file}`)
  }
  return []
}

if (import.meta.main ?? process.argv[1] === import.meta.filename) {
  if (process.argv.includes('--missing')) {
    const { missing } = generate()
    for (const [locale, byFile] of Object.entries(missing)) {
      for (const [page, entries] of Object.entries(byFile)) {
        const scripts = page === '_scripts'
        console.log(`// i18n/${locale}/${scripts ? '_scripts' : catalogFileOf(page)}.json`)
        console.log(json(scripts ? { strings: Object.fromEntries(entries.map(e => [e.key, ''])) } : { page, strings: Object.fromEntries(entries.map(e => [e.key, ''])) }))
      }
    }
    process.exit(0)
  }
  const check = process.argv.includes('--check')
  const problems = writeLocales({ check })
  if (problems.length) {
    console.error(problems.slice(0, 200).join('\n') + (problems.length > 200 ? `\n… and ${problems.length - 200} more` : ''))
    console.error(`FAIL: ${problems.length} localization problem(s)`)
    process.exit(1)
  }
  console.log(`PASS: ${LOCALES.length} languages (${LOCALES.join(', ')}), ${SOURCE_PAGES.length} pages each, generated from the English pages and in step with them; script and Worker messages, sitemap and llms.txt follow`)
}
