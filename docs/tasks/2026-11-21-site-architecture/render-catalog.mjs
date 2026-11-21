// SITE-091: renders URL-CATALOG.md from catalog.json and checks the catalogue's own rules.
// Run: node docs/tasks/2026-11-21-site-architecture/render-catalog.mjs [--check]
// --check writes nothing and exits 1 when URL-CATALOG.md is stale or a rule fails.
import { readFileSync, writeFileSync } from 'node:fs'

const here = new URL('./', import.meta.url)
const catalog = JSON.parse(readFileSync(new URL('catalog.json', here), 'utf8'))
const errors = []
const TYPES = ['home', 'concept', 'audience', 'start', 'product', 'feature', 'subfeature', 'module', 'capability', 'plan', 'usecase', 'landing', 'hub', 'guide', 'post', 'case', 'agent', 'watch', 'legal', 'utility']
const STATES = ['live', 'change', 'new', 'reserved', 'external']
const paths = new Set()
for (const page of catalog.pages) {
  if (paths.has(page.path)) errors.push(`duplicate path ${page.path}`)
  paths.add(page.path)
  if (!TYPES.includes(page.type)) errors.push(`${page.path}: unknown type ${page.type}`)
  if (!STATES.includes(page.state)) errors.push(`${page.path}: unknown state ${page.state}`)
  if (page.state !== 'external') {
    // Rule U1 to U3: lowercase, hyphenated, at most three segments, a trailing slash on a page.
    const bare = page.path.replace(/<[a-z-]+>/g, 'x')
    if (bare !== bare.toLowerCase()) errors.push(`${page.path}: not lowercase`)
    if (!/^\/[a-z0-9\-/.]*$/.test(bare)) errors.push(`${page.path}: characters outside a-z, 0-9 and the hyphen`)
    if (bare.split('/').filter(Boolean).length > 3) errors.push(`${page.path}: deeper than three segments`)
    const first = page.path.split('/').filter(Boolean)[0]
    if (first && !first.startsWith('<') && catalog.reservedRootNames.includes(first)) errors.push(`${page.path}: ${first} is a reserved root name`)
  }
  if (page.parent && !paths.has(page.parent) && !catalog.pages.some(p => p.path === page.parent)) errors.push(`${page.path}: parent ${page.parent} is not in the catalogue`)
  if (page.video && page.video !== 'self' && !catalog.videos[page.video]) errors.push(`${page.path}: video ${page.video} is not in videos`)
}
for (const [id, video] of Object.entries(catalog.videos)) {
  const page = catalog.pages.find(p => p.path === video.page)
  if (!page) errors.push(`${id}: page ${video.page} is not in the catalogue`)
  else if (page.video !== id) errors.push(`${id}: page ${video.page} names ${page.video}`)
  if (!['film', 'overview', 'clip', 'howto'].includes(video.class)) errors.push(`${id}: unknown class ${video.class}`)
}
for (const alias of catalog.aliases) {
  const target = alias.to.replace(/#.*$/, '').replace(/\*$/, '')
  if (target !== '/' && !catalog.pages.some(p => p.path === target)) errors.push(`alias ${alias.from}: target ${alias.to} is not in the catalogue`)
  if (alias.status === 301 && catalog.pages.some(p => p.path === alias.from)) errors.push(`alias ${alias.from} is also a page`)
}

const count = (list, key) => list.reduce((acc, item) => ({ ...acc, [item[key]]: (acc[item[key]] || 0) + 1 }), {})
const cell = text => String(text ?? '').replace(/\|/g, '\\|')
const code = text => '`' + text + '`'
const states = count(catalog.pages, 'state')
const classes = count(Object.values(catalog.videos), 'class')
const parts = count(Object.values(catalog.videos), 'part')
const lines = [
  '# SITE-091: URL catalogue',
  '',
  'Generated from [catalog.json](catalog.json) by `node docs/tasks/2026-11-21-site-architecture/render-catalog.mjs`;',
  'edit the JSON, never this file. The rules and the reasons are in the [spec](README.md).',
  '',
  `Rows: ${catalog.pages.length} (${STATES.filter(s => states[s]).map(s => `${states[s]} ${s}`).join(', ')}). ` +
    `Videos: ${Object.keys(catalog.videos).length} (${Object.entries(classes).map(([k, v]) => `${v} ${k}`).join(', ')}; ` +
    `part 2: ${parts['2'] || 0}, part 3: ${parts['3'] || 0}).`,
  '',
  '## Pages',
  '',
  '| URL | Type | State | Breadcrumb parent | The one question | The one action | Video | Languages | Part | Row |',
  '|---|---|---|---|---|---|---|---|---|---|',
  ...catalog.pages.map(p => `| ${code(p.path)} | ${p.type} | ${p.state} | ${p.parent ? code(p.parent) : 'n/a'} | ${cell(p.question)} | ${cell(p.action)} | ${p.video === 'self' ? 'the page itself' : (p.video || 'none')} | ${p.locales} | ${p.part} | ${p.row} |`),
  '',
  '## Machine URLs',
  '',
  '| URL | Note |',
  '|---|---|',
  ...catalog.machine.map(m => `| ${code(m.path)} | ${cell(m.note)} |`),
  '',
  '## Aliases (redirects the Worker serves)',
  '',
  '| From | To | Status | Why |',
  '|---|---|---|---|',
  ...catalog.aliases.map(a => `| ${code(a.from)} | ${code(a.to)} | ${a.status} | ${cell(a.why)} |`),
  '',
  '## Reserved root names',
  '',
  'No page, module or content slug may take one of these as its first path segment: ' + catalog.reservedRootNames.map(code).join(', ') + '.',
  '',
  '## Videos',
  '',
  '| ID | Title (working) | Class | Page | Part |',
  '|---|---|---|---|---|',
  ...Object.entries(catalog.videos).map(([id, v]) => `| ${id} | ${cell(v.title)} | ${v.class} | ${code(v.page)} | ${v.part} |`),
  ''
]
const out = lines.join('\n')
const target = new URL('URL-CATALOG.md', here)
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
if (process.argv.includes('--check')) {
  let current = ''
  try { current = readFileSync(target, 'utf8') } catch {}
  if (current !== out) { console.error('URL-CATALOG.md is stale: run the script without --check'); process.exit(1) }
  console.log(`catalogue ok: ${catalog.pages.length} rows, ${Object.keys(catalog.videos).length} videos, ${catalog.aliases.length} aliases`)
} else {
  writeFileSync(target, out)
  console.log(`wrote URL-CATALOG.md: ${catalog.pages.length} rows, ${Object.keys(catalog.videos).length} videos, ${catalog.aliases.length} aliases`)
}
