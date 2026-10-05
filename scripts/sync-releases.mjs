// npm run releases:sync [-- --check]
// Resolves every product in releases/products.json against GitHub and npm, writes
// releases/current.json and rewrites the `data-live` markers in the pages, so the source
// equals what the Worker serves. --check changes nothing and exits 1 when anything would
// change (the nightly drift check). The token, when present, comes from GITHUB_TOKEN or
// `gh auth token` and is held in memory only.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fetchSnapshot, mergeSnapshots, validSnapshot } from '../worker/releases.js'
import { rewriteSource } from '../worker/live.js'
import { PAGES } from './pages.mjs'

const root = resolve(import.meta.dirname, '..')
const check = process.argv.includes('--check')
const policies = JSON.parse(readFileSync(resolve(root, 'releases/products.json'), 'utf8')).products
const currentPath = resolve(root, 'releases/current.json')
const bundled = JSON.parse(readFileSync(currentPath, 'utf8'))

let token = process.env.GITHUB_TOKEN || ''
if (!token) {
  try { token = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() } catch {}
}

const { snapshot, errors } = await fetchSnapshot({ policies, fetch, token })
for (const e of errors) console.error(`WARN: ${e.product}: ${e.error} — keeping ${bundled.products[e.product]?.version ?? 'nothing'}`)
const merged = mergeSnapshots(bundled, snapshot)
if (!validSnapshot(merged, policies)) { console.error('FAIL: resolved snapshot does not validate against releases/products.json'); process.exit(1) }

// generatedAt alone never counts as a change.
const comparable = s => JSON.stringify({ ...s, generatedAt: null })
const changed = []
if (comparable(merged) !== comparable(bundled)) changed.push('releases/current.json')
const pageOutputs = PAGES.map(page => {
  const before = readFileSync(resolve(root, page), 'utf8')
  const after = rewriteSource(before, merged)
  if (after !== before) changed.push(page)
  return [page, after]
})

for (const [key, entry] of Object.entries(merged.products)) {
  const was = bundled.products[key]?.version
  console.log(`${key.padEnd(12)} ${entry.version}${was && was !== entry.version ? `  (was ${was})` : ''}`)
}
if (check) {
  if (changed.length) { console.error(`DRIFT: ${changed.join(', ')} — run npm run releases:sync`); process.exit(1) }
  console.log('PASS: pages and releases/current.json match the published releases')
  process.exit(errors.length ? 2 : 0)
}
if (comparable(merged) !== comparable(bundled)) writeFileSync(currentPath, JSON.stringify(merged, null, 2) + '\n')
for (const [page, html] of pageOutputs) writeFileSync(resolve(root, page), html)
console.log(changed.length ? `UPDATED: ${changed.join(', ')}` : 'UNCHANGED')
