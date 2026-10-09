// node --test scripts/locales.test.mjs (part of npm test and npm run check)
// Every language but English is generated from the English pages (scripts/locales.mjs); these
// tests pin the rules that keep them in step — links, translatable text, verbatim values,
// structure, chrome, catalogs, releases — and that a new language needs only a registry entry and
// its catalogs.
import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { alternates, applyChrome, counterpartRoute, langTag, LANG_TAGS, languageSwitch, loadCatalog, localizePage, localizeUrl, placeholders, skeleton, skeletonDiff, sourceUrl, translateMessages } from './locales.mjs'
import { LOCALES, NOINDEX, PAGES, SOURCE_PAGES, TRANSLATED_LOCALES } from './pages.mjs'
import { buildLocale, generate } from './build-locale.mjs'
import { rewriteSource } from '../worker/live.js'
import { renderSwitchboardPage } from './switchboard-release.mjs'

const root = resolve(import.meta.dirname, '..')
const read = path => readFileSync(resolve(root, path), 'utf8')
const catalogs = {}
const siteCatalog = locale => (catalogs[locale] ??= loadCatalog(root, locale))
const catalog = (strings = {}, common = {}) => ({ common, pages: { 'x/index.html': strings }, scripts: {} })
const page = body => `<!doctype html>\n<html lang="en"><head><title>Hello</title><link rel="canonical" href="https://passioncode.ai/x/">\n  <link rel="alternate" hreflang="en" href="https://passioncode.ai/x/"></head><body><header><a class="lang-switch" href="/ru/x/" hreflang="ru" lang="ru">Русский</a></header>${body}</body></html>`
const ru = (html, strings, common) => localizePage(html, { sourceFile: 'x/index.html', locale: 'ru', catalog: catalog({ Hello: 'Привет', ...strings }, common) })

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

test('chrome: lang, canonical, reciprocal hreflang with x-default, og:locale and the switch come from the registry', () => {
  const en = applyChrome(page('<p>Hi</p>').replace('</title>', '</title><meta property="og:site_name" content="PassionCode.ai"><meta property="og:locale" content="xx_XX">'), { sourceFile: 'x/index.html', locale: 'en' })
  const links = [...en.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map(m => [m[1], m[2]])
  assert.deepEqual(links, alternates('x/index.html'))
  assert.deepEqual(links.map(l => l[0]), [...LOCALES.map(langTag), 'x-default'])
  assert.equal(links.at(-1)[1], 'https://passioncode.ai/x/', 'x-default is English')
  assert.match(en, /<meta property="og:locale" content="en_US"><meta property="og:locale:alternate" content="ru_RU">/)
  const back = applyChrome(en, { sourceFile: 'x/index.html', locale: 'ru' })
  assert.match(back, /<html lang="ru">/)
  assert.match(back, /rel="canonical" href="https:\/\/passioncode.ai\/ru\/x\/"/)
  assert.deepEqual([...back.matchAll(/hreflang="([^"]+)" href="([^"]+)">/g)].map(m => [m[1], m[2]]), links, 'the same alternates on every language version')
  assert.equal(applyChrome(back, { sourceFile: 'x/index.html', locale: 'en' }), en, 'chrome is idempotent and reversible')
  // A page kept out of search carries no alternates.
  for (const file of NOINDEX) if (!file.includes('/') || SOURCE_PAGES.includes(file)) assert.deepEqual(alternates(file), [])
  assert.throws(() => applyChrome('<html lang="en"><link rel="canonical" href="https://passioncode.ai/x/">', { sourceFile: 'x/index.html', locale: 'en' }), /language switch/)
})

test('with two languages the switch is one link; it never leads to its own language', () => {
  for (const locale of LOCALES) {
    const html = languageSwitch('start/index.html', locale)
    for (const other of LOCALES.filter(l => l !== locale)) assert.ok(html.includes(`href="${counterpartRoute('start/index.html', other)}" hreflang="${langTag(other)}" lang="${langTag(other)}"`), `${locale} → ${other}`)
    assert.ok(!html.includes(`hreflang="${langTag(locale)}"`), `${locale}: no link to itself`)
    if (LOCALES.length === 2) assert.match(html, /^<a class="lang-switch" [^>]+>[^<]+<\/a>$/)
  }
})

// The address prefix is the registry code, lowercase (`/pt-br/`); the language tag the version
// carries in <html lang>, hreflang and the switch is the registry's `lang` (`pt-BR`), the code when
// there is none. The page scripts and the Worker find the language by either.
test('a code with a region keeps a lowercase prefix and carries its BCP 47 tag', async () => {
  const registry = JSON.parse(read('i18n/locales.json'))
  for (const locale of LOCALES) {
    const tag = registry.locales[locale].lang ?? locale
    assert.equal(langTag(locale), tag)
    assert.equal(locale, locale.toLowerCase(), `${locale}: the prefix is lowercase`)
    assert.deepEqual(Intl.getCanonicalLocales(tag), [tag], `${locale}: ${tag} is a canonical BCP 47 tag`)
  }
  assert.ok(Object.values(LANG_TAGS).every(Boolean))
  const regional = LOCALES.filter(l => langTag(l) !== l)
  for (const locale of regional) {
    const tag = langTag(locale)
    const html = applyChrome(page('<p>Hi</p>'), { sourceFile: 'x/index.html', locale })
    assert.ok(html.includes(`<html lang="${tag}">`), `${locale}: <html lang="${tag}">`)
    assert.ok(html.includes(`<link rel="alternate" hreflang="${tag}" href="https://passioncode.ai/${locale}/x/">`), `${locale}: hreflang ${tag} at /${locale}/`)
    assert.ok(languageSwitch('x/index.html', 'en').includes(`href="/${locale}/x/" hreflang="${tag}" lang="${tag}"`), `${locale}: the switch`)
    assert.equal(localizeUrl('/start/', locale), `/${locale}/start/`)
    for (const module of ['../assets/i18n.js', '../worker/i18n.js']) {
      const { resolveLocale } = await import(module)
      for (const name of [locale, tag, tag.toUpperCase()]) assert.equal(resolveLocale(name), locale, `${module}: ${name}`)
    }
  }
  const { resolveLocale } = await import('../assets/i18n.js')
  for (const unknown of ['xx', 'pt', '', undefined, '__proto__']) assert.equal(resolveLocale(unknown), 'en', String(unknown))
})

test('text, attributes, meta and JSON-LD prose are translated; code, live values and identifiers are not', () => {
  const html = page('<meta name="description" content="A page."><p>Run <code>npm test</code> now</p><img alt="A mark" src="/assets/m.svg"><span data-live="fabric.version">0.3.1</span><a href="/start/">Start</a><form action="/api/leads"></form><script type="application/ld+json">{"@type": "WebPage", "@id": "https://passioncode.ai/#org", "name": "Hello", "url": "https://passioncode.ai/x/", "contactType": "sales"}</script>')
  const { html: out, missing } = ru(html, { 'A page.': 'Страница.', Run: 'Запустите', now: 'сейчас', 'A mark': 'Знак', Start: 'Начать' })
  assert.deepEqual(missing, [])
  assert.match(out, /<html lang="ru">/)
  assert.match(out, /<title>Привет<\/title>/)
  assert.match(out, /content="Страница\."/)
  assert.match(out, /<p>Запустите <code>npm test<\/code> сейчас<\/p>/, 'surrounding spaces of a fragment are kept')
  assert.match(out, /alt="Знак"/)
  assert.match(out, /<span data-live="fabric.version">0.3.1<\/span>/, 'a live value is never translated')
  assert.match(out, /<a href="\/ru\/start\/">Начать<\/a>/)
  assert.match(out, /<form action="\/api\/leads\?lang=ru">/, 'the form tells the Worker its language')
  assert.ok(out.includes(languageSwitch('x/index.html', 'ru')))
  assert.match(out, /rel="canonical" href="https:\/\/passioncode.ai\/ru\/x\/"/)
  assert.match(out, /rel="alternate" hreflang="en" href="https:\/\/passioncode.ai\/x\/"/, 'an alternate keeps its own address')
  const ld = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(out)[1])
  assert.deepEqual(ld, { '@type': 'WebPage', '@id': 'https://passioncode.ai/#org', name: 'Привет', url: 'https://passioncode.ai/ru/x/', contactType: 'sales' })
})

test('an untranslated fragment is reported, never shipped silently', () => {
  const { missing } = ru(page('<p>New sentence</p>'), {})
  assert.deepEqual(missing.map(m => m.key), ['New sentence'])
})

test('a changed English fragment is reported untranslated until its catalog entry follows', () => {
  const strings = { 'Fabric connects Claude Code.': 'Fabric подключает Claude Code.' }
  assert.deepEqual(ru(page('<p>Fabric connects Claude Code.</p>'), strings).missing, [])
  assert.deepEqual(ru(page('<p>Fabric connects Claude Code and Kilo Code.</p>'), strings).missing.map(m => m.key), ['Fabric connects Claude Code and Kilo Code.'])
})

test('a translation decides its own edges: leading space, punctuation, or empty', () => {
  const html = page('<p>Read <a href="/x/">this</a> today, <a href="/y/">that</a>, then stop.</p>')
  const { html: out } = ru(html, { Read: 'Прочитайте', this: 'это', 'today,': ' сегодня,', that: 'то', ', then stop.': '— и всё.' })
  assert.match(out, /Прочитайте <a href="\/ru\/x\/">это<\/a> сегодня, <a href="\/ru\/y\/">то<\/a>— и всё\./)
  const { html: punct } = ru(page('<p><a href="/x/">Docs</a> if you prefer.</p>'), { Docs: 'Документация', 'if you prefer.': ', если хотите.' })
  assert.match(punct, /Документация<\/a>, если хотите\./, 'a translation opening with punctuation takes no leading space')
})

test('a translation that carries markup or changes its placeholders is refused', () => {
  assert.throws(() => ru(page('<p>Plain</p>'), { Plain: '<b>Жирный</b>' }), /markup/)
  assert.throws(() => ru(page('<p>Hi {name}</p>'), { 'Hi {name}': 'Привет, {имя}' }), /placeholders/)
  assert.deepEqual(placeholders('{low}–{high} a month'), ['high', 'low'])
})

test('script messages: missing, placeholders and plural forms are checked per language (L10N-02, L10N-03)', () => {
  const messages = { a: 'Reference: {id}', b: { one: '{n} file', other: '{n} files' }, c: 'Untranslated' }
  const good = translateMessages(messages, { 'Reference: {id}': 'Номер: {id}', '{n} files': { one: '{n} файл', few: '{n} файла', many: '{n} файлов', other: '{n} файла' } }, 'ru')
  assert.deepEqual(good.problems, [])
  assert.deepEqual(good.missing.map(m => m.key), ['Untranslated'])
  const bad = translateMessages(messages, { 'Reference: {id}': 'Номер: {ref}', '{n} files': { one: '{n} файл', other: '{n} файлов' }, Untranslated: 'x' }, 'ru')
  assert.equal(bad.problems.length, 2)
  assert.match(bad.problems.join('\n'), /placeholders differ/)
  assert.match(bad.problems.join('\n'), /few, many, one, other/)
})

test('number ranges may be translated even without letters', () => {
  const { html: out, missing } = ru(page('<option value="x">201–1,000</option><span>→</span>'), { '201–1,000': '201–1 000' })
  assert.deepEqual(missing, [])
  assert.match(out, /201–1 000/)
  assert.match(out, /<span>→<\/span>/)
})

test('structure: generated pages match; a removed hook, a renamed field or a moved download do not', () => {
  const en = page('<form action="/api/leads"><input name="contact.email"></form><span data-live="x.version">1</span><a href="/switchboard/download/macos">Get</a>')
  const { html: out } = ru(en, { Get: 'Скачать' })
  assert.equal(skeletonDiff(skeleton(en), skeleton(out)), null, 'the chrome differs by design and is not compared')
  for (const broken of [out.replace(' data-live="x.version"', ''), out.replace('contact.email', 'contact.mail'), out.replace('/switchboard/download/macos', '/fabric/download/macos'), out.replace('<span data-live="x.version">1</span>', '<em><span data-live="x.version">1</span></em>')]) {
    assert.notEqual(skeletonDiff(skeleton(en), skeleton(broken)), null)
  }
})

test('every page exists in every language, indexed exactly where English is', () => {
  for (const locale of TRANSLATED_LOCALES) {
    for (const file of SOURCE_PAGES) {
      assert.ok(existsSync(resolve(root, locale, file)), `${locale}/${file} is missing`)
      assert.ok(PAGES.includes(`${locale}/${file}`))
      assert.equal(NOINDEX.has(`${locale}/${file}`), NOINDEX.has(file), `${locale}/${file}: same robots rule as the English page`)
      assert.ok(read(`${locale}/${file}`).includes(NOINDEX.has(file) ? 'content="noindex, follow"' : 'content="index, follow"'), `${locale}/${file}: robots meta`)
    }
  }
  assert.deepEqual([...NOINDEX].filter(f => SOURCE_PAGES.includes(f)).sort(), ['404.html', 'business/thanks/index.html'], 'only the thanks and 404 pages are kept out of search')
})

test('the catalogs cover every English fragment and message, and every generated file is current', () => {
  const { files, problems } = generate()
  assert.deepEqual(problems, [], 'run npm run locales -- --missing')
  for (const [file, content] of Object.entries(files)) assert.equal(read(file), content, `${file} is stale — run npm run locales`)
})

test('every Switchboard release variant is translated, so a release sync never meets an untranslated region', () => {
  const release = JSON.parse(read('switchboard/release.json'))
  for (const locale of TRANSLATED_LOCALES) {
    assert.deepEqual(buildLocale(locale).missing, {})
    const source = read('switchboard/index.html')
    for (const variant of [{ ...release, macosNotarized: !release.macosNotarized }, { ...release, version: '0.4.0-beta.1' }, { ...release, version: '0.3.1-beta.1', sha256: {} }]) {
      const { html, missing } = localizePage(renderSwitchboardPage(source, variant), { sourceFile: 'switchboard/index.html', locale, catalog: siteCatalog(locale) })
      assert.deepEqual(missing, [], `${locale}: ${JSON.stringify({ version: variant.version, notarized: variant.macosNotarized })}`)
      for (const phrase of ['The current download', 'Compare before opening', 'Your agent can see', 'Not yet notarized', 'notarized by Apple']) assert.ok(!html.includes(phrase), `${locale}: English region text "${phrase}" leaked`)
    }
  }
})

test('a release sync moves the same values in every language (sync, then generate = generate, then sync)', () => {
  const snapshot = JSON.parse(read('releases/current.json'))
  const moved = structuredClone(snapshot)
  for (const entry of Object.values(moved.products)) entry.version = `${entry.version}-test`
  for (const locale of TRANSLATED_LOCALES) {
    const { pages } = buildLocale(locale)
    for (const p of pages) {
      const syncedSource = rewriteSource(p.source, moved)
      const regenerated = localizePage(syncedSource, { sourceFile: p.sourceFile, locale, catalog: siteCatalog(locale) }).html
      assert.equal(rewriteSource(p.html, moved), regenerated, `${p.file}: sync and generation commute`)
      if (/data-live="[a-z]+\.version"/.test(p.source)) assert.match(rewriteSource(p.html, moved), /-test</, `${p.file}: the live values move`)
    }
  }
})

// A new language is a registry entry and its catalogs: in a copy of the site, a third language
// (its catalogs copied from Russian, its plural forms reduced to its own) builds, passes the site
// check and the Worker tests, and turns every language switch into a menu.
test('adding a language takes only i18n/locales.json and i18n/<locale>/', { timeout: 120000 }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'site-i18n-'))
  try {
    cpSync(root, dir, { recursive: true, filter: src => !/\/(?:node_modules|\.git|dist)(?:\/|$)/.test(src.slice(root.length)) })
    if (existsSync(resolve(root, 'node_modules'))) symlinkSync(resolve(root, 'node_modules'), join(dir, 'node_modules'))
    const registry = JSON.parse(readFileSync(join(dir, 'i18n/locales.json'), 'utf8'))
    // The probe is a language the site does not have yet, so the test stays valid as languages land.
    const probes = { sv: { name: 'Svenska', englishName: 'Swedish', og: 'sv_SE', intl: 'sv-SE', switchLabel: 'Språk' }, nl: { name: 'Nederlands', englishName: 'Dutch', og: 'nl_NL', intl: 'nl-NL', switchLabel: 'Taal' }, tr: { name: 'Türkçe', englishName: 'Turkish', og: 'tr_TR', intl: 'tr-TR', switchLabel: 'Dil' } }
    const code = Object.keys(probes).find(c => !registry.locales[c])
    const expected = Object.keys(registry.locales).length + 1
    registry.locales[code] = probes[code]
    writeFileSync(join(dir, 'i18n/locales.json'), JSON.stringify(registry, null, 2))
    cpSync(join(dir, 'i18n/ru'), join(dir, `i18n/${code}`), { recursive: true })
    const checksFile = join(dir, `i18n/${code}/_checks.json`)
    writeFileSync(checksFile, readFileSync(checksFile, 'utf8').replaceAll('/ru/', `/${code}/`))
    const scriptsFile = join(dir, `i18n/${code}/_scripts.json`)
    const scripts = JSON.parse(readFileSync(scriptsFile, 'utf8'))
    for (const [key, value] of Object.entries(scripts.strings)) if (typeof value === 'object') scripts.strings[key] = { one: value.one, other: value.many }
    writeFileSync(scriptsFile, JSON.stringify(scripts, null, 2))
    const run = (...args) => execFileSync('node', args, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    assert.match(run('scripts/build-locale.mjs'), new RegExp(`PASS: ${expected} languages \\(en, .*${code}\\)`))
    assert.match(run('scripts/build-locale.mjs', '--check'), new RegExp(`PASS: ${expected} languages`))
    assert.match(run('scripts/check-site.mjs'), new RegExp(`PASS: ${15 * expected} static pages`))
    run('--test', 'scripts/check-worker.mjs')
    const home = readFileSync(join(dir, 'ru/index.html'), 'utf8')
    assert.match(home, /<details class="lang-switch lang-menu"><summary aria-label="Язык: Русский">/)
    assert.match(home, new RegExp(`<a href="/${code}/" hreflang="${code}" lang="${code}">${probes[code].name}</a>`))
    assert.match(home, new RegExp(`<link rel="alternate" hreflang="${code}" href="https://passioncode.ai/${code}/">`))
    assert.match(readFileSync(join(dir, `${code}/business/index.html`), 'utf8'), new RegExp(`action="/api/leads\\?lang=${code}"`))
    assert.match(readFileSync(join(dir, 'sitemap.xml'), 'utf8'), new RegExp(`<loc>https://passioncode.ai/${code}/start/</loc>`))
    assert.match(readFileSync(join(dir, 'llms.txt'), 'utf8'), new RegExp(`${probes[code].englishName} \\(${probes[code].name}\\) under /${code}/`))
    assert.match(readFileSync(join(dir, 'worker/i18n.js'), 'utf8'), new RegExp(`"${code}": \\{`))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
