// SITE-073: what scripts/verify-live.py should find at each address of a built dist/, given the release
// snapshot the Worker serves now (GET /api/releases). The Worker rewrites every HTML page with that snapshot
// (worker/live.js liveRewriter); rewriteSource is the same rule over a file, so the expected bytes of a page
// are the built file rewritten with the live snapshot, and a newer release on the edge is not a regression.
// It also names each page's language and the hreflang list it must carry: the site's languages
// (i18n/locales.json), the guide-only ones for the pages they have and without a held version
// (i18n/scoped-locales.json, SITE-070, SITE-071), and none on the English-only digest (SITE-068A).
//
// Usage: node scripts/verify-live-expect.mjs <snapshot.json> [dist]  ->  JSON on stdout
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { rewriteSource } from '../worker/live.js'
import { NOINDEX, PAGES, SCOPED, SCOPED_PAGES, SOURCE_LOCALE } from './pages.mjs'
import { alternates, langTag, localeOfFile, sourceFileOf } from './locales.mjs'
import { DIGEST_FILES } from './build-digest.mjs'

let digestFiles
const isDigest = file => (digestFiles ||= new Set(DIGEST_FILES())).has(file)
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')

function walk (dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

// The expected answer for one built file. `hreflang` is null where no list is asserted (a file that is no
// page of the catalogue), [] where the page must carry none.
export function expectFile (file, bytes, snapshot) {
  const html = file.endsWith('.html')
  const expected = html ? Buffer.from(rewriteSource(bytes.toString('utf8'), snapshot), 'utf8') : bytes
  const row = { file, sha256: sha256(expected), rewritten: html && !expected.equals(bytes) }
  if (!html) return row
  const digest = isDigest(file)
  const locale = digest ? SOURCE_LOCALE : localeOfFile(file)
  row.locale = locale
  row.scoped = Object.hasOwn(SCOPED.locales, locale)
  row.lang = langTag(locale)
  row.dir = SCOPED.locales[locale]?.dir === 'rtl' ? 'rtl' : null
  if (digest) row.hreflang = []
  else if (PAGES.includes(file) || SCOPED_PAGES.includes(file)) {
    row.hreflang = NOINDEX.has(file) ? [] : alternates(sourceFileOf(file)).map(([l, href]) => `${l} ${href}`)
    row.held = NOINDEX.has(file) && !NOINDEX.has(sourceFileOf(file))
  } else row.hreflang = null
  return row
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const [snapshotPath, distArg] = process.argv.slice(2)
  if (!snapshotPath) {
    console.error('usage: node scripts/verify-live-expect.mjs <snapshot.json> [dist]')
    process.exit(2)
  }
  const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'))
  const dist = resolve(distArg || join(import.meta.dirname, '..', 'dist'))
  const rows = walk(dist).sort().map(path => expectFile(relative(dist, path).split('\\').join('/'), readFileSync(path), snapshot))
  process.stdout.write(JSON.stringify(rows) + '\n')
}
