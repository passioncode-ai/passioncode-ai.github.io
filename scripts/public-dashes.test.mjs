// SITE-057: the dash rule in scripts/public-dashes.mjs, planted regressions and its allowlist.
import assert from 'node:assert/strict'
import test from 'node:test'
import { catalogParts, dashFindings, findDashes, moduleStringParts, readableParts, textFileParts } from './public-dashes.mjs'

const rules = parts => dashFindings(parts).map(f => f.rule)
const page = body => `<!doctype html><html lang="en"><head><title>T</title></head><body>${body}</body></html>`

test('an em dash in visible text fails, as a character and as an entity', () => {
  assert.deepEqual(rules(readableParts(page('<p>Fabric \u2014 the home</p>'))), ['em dash'])
  assert.deepEqual(rules(readableParts(page('<p>Fabric &mdash; the home</p>'))), ['em dash'])
  assert.deepEqual(rules(readableParts(page('<p>Fabric &#8212; the home &#x2014; twice</p>'))), ['em dash', 'em dash'])
  assert.deepEqual(rules(readableParts(page('<h2>Окно или терминал\u00a0\u2014 как удобнее</h2>'))), ['em dash'])
})

test('the substitutes fail: two hyphens, a spaced hyphen, a spaced en dash', () => {
  assert.deepEqual(rules(readableParts(page('<p>Send it again -- your answers stay.</p>'))), ['two hyphens used as a dash'])
  assert.deepEqual(rules(readableParts(page('<p>Send it again - your answers stay.</p>'))), ['spaced hyphen used as a dash'])
  assert.deepEqual(rules(readableParts(page('<p>Danke \u2013 deine Anfrage ist da.</p>'))), ['spaced en dash used as a dash'])
})

test('what a visitor, a screen reader or a search result shows is read too', () => {
  assert.deepEqual(rules(readableParts(page('<img src="/a.svg" alt="Mark \u2014 passion fruit">'))), ['em dash'])
  assert.deepEqual(rules(readableParts(page('<a href="/" aria-label="PassionCode.ai \u2014 home">x</a>'))), ['em dash'])
  assert.deepEqual(rules(readableParts('<head><meta property="og:image:alt" content="PassionCode.ai \u2014 a toolkit"></head>')), ['em dash'])
  assert.deepEqual(rules(readableParts('<head><meta name="description" content="One &mdash; two"></head>')), ['em dash'])
  assert.deepEqual(rules(readableParts('<script type="application/ld+json">{"@type":"Question","name":"Is it free \u2014 really?"}</script>')), ['em dash'])
})

test('the allowlist: code, scripts, styles, SVG, comments, ranges and hyphenated words pass', () => {
  const clean = page([
    '<pre><code>git log -- docs</code></pre>',
    '<p>Run <code>pip install --no-deps</code> and use <code>--pc-link</code> then stop.</p>',
    '<kbd>a -- b</kbd><samp>x \u2014 y</samp>',
    '<script src="/assets/site.js"></script><style>a::after{content:"\u2014"}</style>',
    '<svg><title>a \u2014 b</title></svg><template><p>a \u2014 b</p></template><!-- a \u2014 b -->',
    '<p>Agents take 25\u201350 % of the time, a ready-made agent, AI-native teams, x64-only.</p>',
    '<p>The flag --no-deps and the token --pc-focus.</p>',
    '<img src="/a.svg" width="40" height="40" alt="">'
  ].join(''))
  assert.deepEqual(dashFindings(readableParts(clean)), [])
})

test('catalog values, message modules and text files are read; keys, comments and list markers are not', () => {
  const catalog = { $comment: 'Notes \u2014 for maintainers', page: 'index.html', strings: { 'Thank you \u2014 it reached us': 'Спасибо, заявка у нас' }, disclosures: { 'x.html': ['Релиз 0.3.1 \u2014 первый'] } }
  assert.deepEqual(dashFindings(catalogParts(catalog)).map(f => f.where), ['$.disclosures.x.html[0]'])
  assert.deepEqual(rules(moduleStringParts("// #region messages \u2014 docs\nexport const M = {\n  done: 'Thank you \u2014 it reached us',\n  ok: 'Saved'\n}\n")), ['em dash'])
  assert.deepEqual(rules(textFileParts('# Title\n- [Vision](https://x/): one\n- Two \u2014 three\n1. Four\n')), ['em dash'])
  assert.deepEqual(dashFindings(textFileParts('## Languages\n- Every page - nothing else\n')), [{ where: 'line 2', rule: 'spaced hyphen used as a dash', excerpt: 'Every page - nothing else' }])
})

test('findDashes reports each occurrence with an excerpt', () => {
  const found = findDashes('one \u2014 two \u2014 three')
  assert.equal(found.length, 2)
  assert.ok(found.every(f => f.excerpt.includes('\u2014')))
  assert.deepEqual(findDashes('one, two: three (four).'), [])
})
