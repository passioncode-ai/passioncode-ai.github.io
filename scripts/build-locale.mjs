// npm run locales [-- --check | --missing]
// Writes every translated page (ru/…) from its English source page and the catalog in
// i18n/<locale>/ (scripts/locales.mjs, docs/DEPLOYMENT.md#languages). Refuses to write while any
// English fragment has no translation, and lists them.
//   --check    changes nothing; fails when a translated page differs from what it would write,
//              a fragment is untranslated, a catalog entry is no longer used, or the two
//              language versions of a page differ in structure.
//   --missing  prints the untranslated fragments as catalog JSON, page by page, to fill in.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { SOURCE_PAGES, TRANSLATED_LOCALES } from './pages.mjs'
import { catalogFileOf, loadCatalog, localizePage, localizedFile, skeleton, skeletonDiff } from './locales.mjs'
import { renderSwitchboardPage } from './switchboard-release.mjs'

const root = resolve(import.meta.dirname, '..')
const check = process.argv.includes('--check')
const listMissing = process.argv.includes('--missing')
const release = JSON.parse(readFileSync(resolve(root, 'switchboard/release.json'), 'utf8'))

export function buildLocale (locale, { root: base = root, manifest = release } = {}) {
  const catalog = loadCatalog(base, locale)
  const pages = []
  const missing = {}
  const used = new Set()
  for (const sourceFile of SOURCE_PAGES) {
    const source = readFileSync(resolve(base, sourceFile), 'utf8')
    const result = localizePage(source, { sourceFile, locale, catalog })
    for (const key of result.used) used.add(key)
    if (result.missing.length) missing[sourceFile] = result.missing
    let html = result.html
    // Switchboard's release-bound regions are written by its renderer, in this language.
    if (sourceFile === 'switchboard/index.html') html = renderSwitchboardPage(html, manifest, locale)
    pages.push({ sourceFile, file: localizedFile(sourceFile, locale), source, html })
  }
  const unused = [
    ...Object.keys(catalog.common).filter(k => !used.has(`\u0000${k}`)).map(k => `_common: ${k}`),
    ...Object.entries(catalog.pages).flatMap(([page, strings]) => Object.keys(strings).filter(k => !used.has(`${page}\u0000${k}`)).map(k => `${page}: ${k}`))
  ]
  return { pages, missing, unused }
}

if (import.meta.main ?? process.argv[1] === import.meta.filename) {
  const problems = []
  for (const locale of TRANSLATED_LOCALES) {
    const { pages, missing, unused } = buildLocale(locale)
    if (listMissing) {
      for (const [page, entries] of Object.entries(missing)) {
        console.log(`// i18n/${locale}/${catalogFileOf(page)}.json`)
        console.log(JSON.stringify({ page, strings: Object.fromEntries(entries.map(e => [e.key, ''])) }, null, 2))
      }
      continue
    }
    for (const [page, entries] of Object.entries(missing)) {
      for (const e of entries) problems.push(`${locale}/${page}: untranslated (${e.where}): ${e.key}`)
    }
    for (const entry of unused) problems.push(`i18n/${locale}: unused entry — ${entry}`)
    for (const { sourceFile, file, source, html } of pages) {
      const diff = skeletonDiff(skeleton(source), skeleton(html))
      if (diff) problems.push(`${file}: structure differs from ${sourceFile} at element ${diff.index}: ${diff.source} ≠ ${diff.localized}`)
      const target = resolve(root, file)
      const current = existsSync(target) ? readFileSync(target, 'utf8') : null
      if (check) {
        if (current !== html) problems.push(`${file}: ${current === null ? 'missing' : 'out of date with its English page or the catalog'} — run npm run locales`)
      } else if (!Object.keys(missing).length && current !== html) {
        mkdirSync(dirname(target), { recursive: true })
        writeFileSync(target, html)
        console.log(`WROTE: ${file}`)
      }
    }
  }
  if (listMissing) process.exit(0)
  if (problems.length) {
    console.error(problems.slice(0, 200).join('\n') + (problems.length > 200 ? `\n… and ${problems.length - 200} more` : ''))
    console.error(`FAIL: ${problems.length} localization problem(s)`)
    process.exit(1)
  }
  console.log(`PASS: ${TRANSLATED_LOCALES.length} translated locale(s), ${SOURCE_PAGES.length} pages each, generated from the English pages and in step with them`)
}
