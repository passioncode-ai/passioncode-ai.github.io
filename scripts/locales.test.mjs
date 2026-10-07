// node --test scripts/locales.test.mjs (part of npm test and npm run check)
// The Russian site is generated from the English pages (scripts/locales.mjs); these tests pin the
// rules that keep the two in step: links, translatable text, verbatim values, structure, releases.
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { counterpartRoute, loadCatalog, localizePage, localizeUrl, skeleton, skeletonDiff, sourceUrl } from './locales.mjs'
import { NOINDEX, PAGES, SOURCE_PAGES, TRANSLATED_LOCALES } from './pages.mjs'
import { buildLocale } from './build-locale.mjs'
import { rewriteSource } from '../worker/live.js'
import { checkSwitchboardPage, MIT_HISTORY_BY_LOCALE, NOT_NOTARIZED_BY_LOCALE, renderSwitchboardPage } from './switchboard-release.mjs'

const root = resolve(import.meta.dirname, '..')
const read = path => readFileSync(resolve(root, path), 'utf8')
const catalogs = {}
const siteCatalog = locale => (catalogs[locale] ??= loadCatalog(root, locale))
const catalog = (strings = {}, common = {}) => ({ common, pages: { 'x/index.html': strings } })
const page = body => `<!doctype html>\n<html lang="en"><head><title>Hello</title><link rel="canonical" href="https://passioncode.ai/x/"><link rel="alternate" hreflang="en" href="https://passioncode.ai/x/"></head><body>${body}</body></html>`
const ru = (html, strings, common) => localizePage(html, { sourceFile: 'x/index.html', locale: 'ru', catalog: catalog(strings, common) })

test('page links move under /ru/; assets, the API, downloads and other sites do not', () => {
  for (const [from, to] of [['/', '/ru/'], ['/start/', '/ru/start/'], ['/#products', '/ru/#products'], ['/business/?a=1#request', '/ru/business/?a=1#request'], ['https://passioncode.ai/fabric/', 'https://passioncode.ai/ru/fabric/'], ['/404.html', '/ru/404.html']]) assert.equal(localizeUrl(from, 'ru'), to, from)
  for (const same of ['/assets/site.js', '/styles.css', '/api/leads', '/switchboard/download/macos', '/fabric/release.json', 'https://github.com/passioncode-ai/fabric/', '#main', 'mailto:commercial@passioncode.ai', '/ru/start/', '//cdn.example/x/']) assert.equal(localizeUrl(same, 'ru'), same, same)
  assert.equal(localizeUrl('/start/', 'en'), '/start/')
  assert.equal(sourceUrl('/ru/start/'), '/start/')
  assert.equal(sourceUrl('https://passioncode.ai/ru/'), 'https://passioncode.ai/')
  assert.equal(sourceUrl('/api/leads?lang=ru'), '/api/leads')
})

test('the language switch leads to the same page in the other language; the 404 page to the other home', () => {
  assert.equal(counterpartRoute('start/index.html', 'ru'), '/ru/start/')
  assert.equal(counterpartRoute('start/index.html', 'en'), '/start/')
  assert.equal(counterpartRoute('index.html', 'ru'), '/ru/')
  assert.equal(counterpartRoute('404.html', 'ru'), '/ru/')
  assert.equal(counterpartRoute('404.html', 'en'), '/')
})

test('text, attributes, meta and JSON-LD prose are translated; code, live values and identifiers are not', () => {
  const html = page('<meta name="description" content="A page."><a class="lang-switch" href="/ru/x/" hreflang="ru" lang="ru">Русский</a><p>Run <code>npm test</code> now</p><img alt="A mark" src="/assets/m.svg"><span data-live="fabric.version">0.3.1</span><a href="/start/">Start</a><form action="/api/leads"></form><script type="application/ld+json">{"@type": "WebPage", "@id": "https://passioncode.ai/#org", "name": "Hello", "url": "https://passioncode.ai/x/", "contactType": "sales"}</script>')
  const { html: out, missing } = ru(html, { Hello: 'Привет', 'A page.': 'Страница.', Run: 'Запустите', now: 'сейчас', 'A mark': 'Знак', Start: 'Начать' })
  assert.deepEqual(missing, [])
  assert.match(out, /<html lang="ru">/)
  assert.match(out, /<title>Привет<\/title>/)
  assert.match(out, /content="Страница\."/)
  assert.match(out, /<p>Запустите <code>npm test<\/code> сейчас<\/p>/, 'surrounding spaces of a fragment are kept')
  assert.match(out, /alt="Знак"/)
  assert.match(out, /<span data-live="fabric.version">0.3.1<\/span>/, 'a live value is never translated')
  assert.match(out, /<a href="\/ru\/start\/">Начать<\/a>/)
  assert.match(out, /<form action="\/api\/leads\?lang=ru">/, 'the form tells the Worker its language')
  assert.match(out, /<a class="lang-switch" href="\/x\/" hreflang="en" lang="en">English<\/a>/)
  assert.match(out, /rel="canonical" href="https:\/\/passioncode.ai\/ru\/x\/"/)
  assert.match(out, /rel="alternate" hreflang="en" href="https:\/\/passioncode.ai\/x\/"/, 'an alternate keeps its own address')
  const ld = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(out)[1])
  assert.deepEqual(ld, { '@type': 'WebPage', '@id': 'https://passioncode.ai/#org', name: 'Привет', url: 'https://passioncode.ai/ru/x/', contactType: 'sales' })
})

test('an untranslated fragment is reported, never shipped silently', () => {
  const { missing } = ru(page('<p>New sentence</p>'), { Hello: 'Привет' })
  assert.deepEqual(missing.map(m => m.key), ['New sentence'])
})

test('a translation decides its own edges: leading space, punctuation, or empty', () => {
  const html = page('<p>Read <a href="/x/">this</a> today, <a href="/y/">that</a>, then stop.</p>')
  const { html: out } = ru(html, { Hello: 'Привет', Read: 'Прочитайте', this: 'это', 'today,': ' сегодня,', that: 'то', ', then stop.': '— и всё.' })
  assert.match(out, /Прочитайте <a href="\/ru\/x\/">это<\/a> сегодня, <a href="\/ru\/y\/">то<\/a>— и всё\./)
  const { html: punct } = ru(page('<p><a href="/x/">Docs</a> if you prefer.</p>'), { Hello: 'Привет', Docs: 'Документация', 'if you prefer.': ', если хотите.' })
  assert.match(punct, /Документация<\/a>, если хотите\./, 'a translation opening with punctuation takes no leading space')
})

test('a translation that carries markup is refused', () => {
  assert.throws(() => ru(page('<p>Plain</p>'), { Hello: 'Привет', Plain: '<b>Жирный</b>' }), /markup/)
})

test('number ranges may be translated even without letters', () => {
  const { html: out, missing } = ru(page('<option value="x">201–1,000</option><span>→</span>'), { Hello: 'Привет', '201–1,000': '201–1 000' })
  assert.deepEqual(missing, [])
  assert.match(out, /201–1 000/)
  assert.match(out, /<span>→<\/span>/)
})

test('structure: generated pages match; a removed hook, a renamed field or a moved download do not', () => {
  const en = page('<form action="/api/leads"><input name="contact.email"></form><span data-live="x.version">1</span><a href="/switchboard/download/macos">Get</a>')
  const { html: out } = ru(en, { Hello: 'Привет', Get: 'Скачать' })
  assert.equal(skeletonDiff(skeleton(en), skeleton(out)), null)
  for (const broken of [out.replace(' data-live="x.version"', ''), out.replace('contact.email', 'contact.mail'), out.replace('/switchboard/download/macos', '/fabric/download/macos'), out.replace('<span', '<em><span').replace('</span>', '</span></em>')]) {
    assert.notEqual(skeletonDiff(skeleton(en), skeleton(broken)), null)
  }
})

test('every page exists in every language, and the page lists agree', () => {
  for (const locale of TRANSLATED_LOCALES) {
    for (const file of SOURCE_PAGES) {
      assert.ok(existsSync(resolve(root, locale, file)), `${locale}/${file} is missing`)
      assert.ok(PAGES.includes(`${locale}/${file}`))
      assert.equal(NOINDEX.has(`${locale}/${file}`), NOINDEX.has(file), `${locale}/${file}: same robots rule as the English page`)
    }
  }
})

test('the catalog covers every English fragment and every Russian page equals its generation', () => {
  for (const locale of TRANSLATED_LOCALES) {
    const { pages, missing, unused } = buildLocale(locale)
    assert.deepEqual(missing, {}, 'untranslated fragments — run npm run locales -- --missing')
    assert.deepEqual(unused, [], 'catalog entries no page uses')
    for (const p of pages) {
      assert.equal(read(p.file), p.html, `${p.file} is stale — run npm run locales`)
      assert.equal(skeletonDiff(skeleton(p.source), skeleton(p.html)), null, `${p.file}: structure`)
    }
  }
})

test('a release sync moves the same values on both languages (sync, then generate = generate, then sync)', () => {
  const snapshot = JSON.parse(read('releases/current.json'))
  const moved = structuredClone(snapshot)
  for (const entry of Object.values(moved.products)) entry.version = `${entry.version}-test`
  for (const locale of TRANSLATED_LOCALES) {
    const { pages } = buildLocale(locale)
    for (const p of pages.filter(p => p.sourceFile !== 'switchboard/index.html')) {
      const syncedSource = rewriteSource(p.source, moved)
      const regenerated = localizePage(syncedSource, { sourceFile: p.sourceFile, locale, catalog: siteCatalog(locale) }).html
      assert.equal(rewriteSource(p.html, moved), regenerated, `${p.file}: sync and generation commute`)
    }
  }
})

test('Switchboard release regions are written in each language and checked in it', () => {
  const release = JSON.parse(read('switchboard/release.json'))
  const html = read('ru/switchboard/index.html')
  assert.deepEqual(checkSwitchboardPage(html, release, 'ru'), [])
  assert.ok(html.includes(MIT_HISTORY_BY_LOCALE.ru))
  const notNotarized = renderSwitchboardPage(html, { ...release, macosNotarized: false }, 'ru')
  assert.ok(notNotarized.includes(NOT_NOTARIZED_BY_LOCALE.ru))
  assert.ok(!notNotarized.includes(NOT_NOTARIZED_BY_LOCALE.en))
  const notarized = renderSwitchboardPage(html, { ...release, macosNotarized: true }, 'ru')
  assert.ok(!notarized.includes(NOT_NOTARIZED_BY_LOCALE.ru))
  assert.match(notarized, /нотаризовано Apple/)
  // The English regions never leak into the Russian page.
  for (const phrase of ['The current download', 'Compare before opening', 'Your agent can see']) assert.ok(!html.includes(phrase), phrase)
  assert.throws(() => renderSwitchboardPage(html, release, 'de'), /No release regions/)
})
