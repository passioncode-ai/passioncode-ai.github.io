import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { AGPL_LICENSE_URL, checkSwitchboardPage, releaseFacts } from './switchboard-release.mjs'
import { PAGES, NOINDEX, SOURCE_PAGES, TRANSLATED_LOCALES } from './pages.mjs'
import { LEAD_OPTIONS } from '../assets/lead-options.js'
import { alternates, isoDuration, langTag, languageSwitch, LOCALES, mp4Seconds, vttText, loadCatalog, localeOfFile, localizeUrl, OG_LOCALES, ORIGIN, pageRoute, prefixOf, sourceFileOf } from './locales.mjs'
import { liveValue } from '../worker/live.js'

const root = resolve(import.meta.dirname, '..')
const read = path => readFileSync(resolve(root, path), 'utf8')
const css = read('styles.css')
const snapshot = JSON.parse(read('releases/current.json'))
const release = JSON.parse(read('switchboard/release.json'))
// Every repository is open source under AGPL-3.0 or available under a commercial license
// (Fabric ADR-0092). Each product page says so; MIT and PolyForm appear only inside
// <!-- license-history --> regions, because a released version keeps its license.
const LICENSE_WORDING = ['open source under the GNU AGPL-3.0', 'commercial license is available', 'href="/business/"']
// The words a visitor or a crawler reads: no JSON-LD, no id/href attributes, no license history.
const currentWords = html => html
  .replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/<!-- license-history -->[\s\S]*?<!-- \/license-history -->/g, '')
  .replace(/\s(?:id|href)="[^"]*"/g, '')
  .replace(/\u00a0/g, ' ')
const downloadPaths = new Set(['/switchboard/download/macos', '/switchboard/download/windows', '/fabric/download/macos', ...['windows-x64', 'windows-arm64', 'linux-x64-deb', 'linux-arm64-deb', 'linux-x64-appimage', 'linux-arm64-appimage'].map(p => `/fabric/download/${p}`), '/inbox/download/macos', '/dashboards/download/macos', '/observatory/download/macos', '/observatory/download/wheel'])
const apiPaths = new Set(['/api/releases', '/api/leads'])
// The only scripts a page may load: the site's own progressive enhancement. Content never
// depends on them (each page is complete without JavaScript).
const ALLOWED_SCRIPTS = new Set(['/assets/site.js', '/assets/business.js'])
// The header every page carries (the Inbox page keeps its own product navigation until its
// redesign, docs/backlog.md SITE-009). In another language it is the same navigation, its links
// under /<locale>/ and its words from the catalog.
const PRIMARY_NAV = '<nav aria-label="Primary navigation"><a href="/vision/">Vision</a><a href="/start/">For you</a><a href="/business/">For organizations</a><a href="/#products">The tools</a><a href="/#about">About</a></nav>'
const primaryNav = locale => {
  if (locale === 'en') return PRIMARY_NAV
  const { common } = loadCatalog(root, locale)
  return PRIMARY_NAV.replace(/href="([^"]+)"/g, (_, href) => `href="${localizeUrl(href, locale)}"`).replace(/aria-label="([^"]+)"/, (_, label) => `aria-label="${common[label]}"`).replace(/>([^<]+)</g, (_, text) => `>${common[text]}<`)
}
// Each translated language's own assertions (i18n/<locale>/_checks.json): its banned phrases and
// the disclosures its pages must keep — a translation may not soften a limitation.
const CHECKS = Object.fromEntries(TRANSLATED_LOCALES.map(locale => [locale, JSON.parse(read(`i18n/${locale}/_checks.json`))]))

for (const file of PAGES) {
  const html = read(file)
  const route = file.replace(/index.html$/, '')
  const locale = localeOfFile(file)
  const source = sourceFileOf(file)
  const prefix = prefixOf(locale)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: exactly one h1`)
  assert.ok(html.includes(`rel="canonical" href="https://passioncode.ai/${route}"`), `${file}: canonical`)
  assert.ok(html.includes(`<html lang="${langTag(locale)}">`), `${file}: <html lang="${langTag(locale)}">`)
  // Every language version names all of them, English as x-default: the same list on every
  // version, so hreflang is reciprocal. Pages kept out of search carry none.
  const pageAlternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map(m => `${m[1]} ${m[2]}`)
  const expectedAlternates = NOINDEX.has(file) ? [] : alternates(source).map(([l, href]) => `${l} ${href}`)
  assert.deepEqual(pageAlternates, expectedAlternates, `${file}: hreflang alternates`)
  if (!NOINDEX.has(file)) assert.deepEqual(expectedAlternates.map(a => a.split(' ')[0]), [...LOCALES.map(langTag), 'x-default'], `${file}: every language and x-default`)
  assert.ok(html.includes(`rel="canonical" href="${ORIGIN}${pageRoute(source, locale)}"`), `${file}: canonical in its own language`)
  // One visible switch, leading to the same page in each other language.
  assert.equal((html.match(/class="lang-switch/g) || []).length, 1, `${file}: one language switch`)
  assert.ok(html.includes(languageSwitch(source, locale)), `${file}: the language switch leads to the same page in every other language`)
  if (html.includes('property="og:site_name"')) {
    assert.ok(html.includes(`<meta property="og:locale" content="${OG_LOCALES[locale]}">`), `${file}: og:locale`)
    for (const l of LOCALES.filter(l => l !== locale)) assert.ok(html.includes(`<meta property="og:locale:alternate" content="${OG_LOCALES[l]}">`), `${file}: og:locale:alternate ${l}`)
  }
  assert.match(html, /<meta name="description" content="[^"]+">/)
  assert.ok(html.includes(NOINDEX.has(file) ? 'content="noindex, follow"' : 'content="index, follow"'), `${file}: robots meta`)
  for (const [, src] of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)) assert.ok(ALLOWED_SCRIPTS.has(src), `${file}: unexpected script ${src}`)
  for (const tag of html.match(/<script\b(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>/g) || []) assert.fail(`${file}: inline executable script ${tag} (CSP script-src 'self')`)
  assert.ok(!/\sstyle="/.test(html), `${file}: inline style attribute (CSP style-src 'self')`)
  assert.ok(!/\son[a-z]+="/.test(html), `${file}: inline event handler (CSP)`)
  assert.ok(!/target="_blank"/i.test(html), 'do not force new tabs')
  assert.ok(html.includes('href="#main"'), `${file}: skip link`)
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`)
  for (const block of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(block[1])
    const expected = source === 'switchboard/index.html' ? releaseFacts(release).license : AGPL_LICENSE_URL
    if (data['@type'] === 'SoftwareApplication') assert.deepEqual(data.license, expected, `${file}: JSON-LD license must match the release it describes`)
  }
  // Live values: every marker names a real field, and the source carries the synced value.
  for (const m of html.matchAll(/<([a-z0-9]+)\b[^>]*\bdata-live="([^"]+)"[^>]*>([^<]*)<\/\1>/gi)) {
    const value = liveValue(snapshot, m[2])
    assert.notEqual(value, undefined, `${file}: data-live="${m[2]}" names nothing in releases/current.json`)
    assert.equal(m[3], value, `${file}: data-live="${m[2]}" says ${m[3]}, the snapshot ${value} — run npm run releases:sync`)
  }
  for (const m of html.matchAll(/<[a-z0-9]+\b[^>]*\bdata-live-href="([^"]+)"[^>]*>/gi)) {
    const value = liveValue(snapshot, m[1])
    assert.notEqual(value, undefined, `${file}: data-live-href="${m[1]}" names nothing`)
    assert.ok(m[0].includes(`href="${value}"`), `${file}: data-live-href="${m[1]}" is stale — run npm run releases:sync`)
  }
  assert.ok(!/aria-current/.test(html.slice(html.indexOf('<main'), html.indexOf('</main>'))), `${file}: aria-current inside main (navigation pasted into content?)`)
  const words = currentWords(html)
  if (locale === 'en') assert.ok(!/source[- ]available/i.test(words), `${file}: the tools are open source under AGPL-3.0, no longer source-available (ADR-0092)`)
  assert.ok(!/PolyForm|\bMIT\b/.test(words), `${file}: MIT and PolyForm name only released versions, inside a license-history region`)
  if (locale === 'en') assert.ok(!/AI-native work\b/.test(words), `${file}: the tagline is "AI-native teams"`)
  if (locale === 'en') assert.ok(!/\bseamless|fully autonomous\b/i.test(words), `${file}: banned phrase (docs/brand/terminology.md)`)
  if (locale !== 'en') for (const banned of CHECKS[locale].banned) assert.ok(!new RegExp(banned, 'iu').test(words), `${file}: banned phrase ${banned} (docs/brand/terminology.md, i18n/${locale}/_checks.json)`)
  for (const [, value] of html.matchAll(/(?:href|src|action)="([^"\s]+)"/g)) {
    if (!value.startsWith('/') && !value.startsWith('#')) continue
    const url = new URL(value, `https://passioncode.ai/${route}`)
    if (downloadPaths.has(url.pathname) || apiPaths.has(url.pathname)) continue
    const local = url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname
    assert.ok(existsSync(resolve(root, '.' + local)), `${file}: missing ${value}`)
    if (url.hash) assert.ok(read('.' + local).includes(`id="${url.hash.slice(1)}"`), `${file}: missing anchor ${value}`)
  }
  // The header is the site's; every page carries it unchanged. The Inbox page keeps its own
  // product navigation until its redesign (docs/backlog.md SITE-009).
  if (source !== 'inbox/index.html') assert.ok(html.includes(primaryNav(locale)), `${file}: primary navigation`)
  assert.equal((html.match(/<footer class="story-footer">/g) || []).length, 1, `${file}: one footer`)
  assert.equal((html.match(/<nav aria-label="[^"]+"><a href="[^"]*\/start\/">/g) || []).length, 1, `${file}: one footer navigation landmark`)
  for (const path of ['/start/', '/business/', '/privacy/']) assert.ok(html.includes(`<a href="${prefix}${path}">`), `${file}: footer links ${prefix}${path}`)
  // A translated page links to pages in its own language; only the language switch and the
  // hreflang alternates point to the others.
  if (locale !== 'en') {
    for (const [, value] of html.replace(languageSwitch(source, locale), '').replace(/<link rel="alternate"[^>]*>/g, '').matchAll(/\s(?:href|action)="(\/[^"]*)"/g)) {
      const path = value.split(/[?#]/, 1)[0]
      if (path === '/' || path.endsWith('/')) assert.ok(path.startsWith(`/${locale}/`), `${file}: ${value} leaves the ${locale} site`)
    }
  }
  assert.ok(html.includes('href="https://x.com/sshlg93"'), `${file}: author link`)
  assert.ok(!/href="https:\/\/github.com\/passioncode-ai\/(?:fabric-workspace|org-index|passioncode-platform)(?:["/#])/.test(html), `${file}: private repository visitor link`)
  assert.ok(html.includes('href="/design-system/tokens.css"'))
}
// Every module a shipped script imports is shipped too (scripts/build-site.mjs allow-list): a
// missing one breaks the copy buttons and the form on every page.
const shipped = new Set([...read('scripts/build-site.mjs').matchAll(/'(assets\/[^']+\.js)'/g)].map(m => m[1]))
for (const file of shipped) {
  // A syntax error in a shipped module silently turns off the copy buttons or the form's script.
  try { execFileSync(process.execPath, ['--check', resolve(root, file)], { stdio: 'pipe' }) } catch (error) { assert.fail(`${file} does not parse: ${String(error.stderr).split('\n').slice(0, 5).join(' ')}`) }
}
for (const file of shipped) for (const [, spec] of read(file).matchAll(/^\s*(?:import|export)\b[^'"]*from '(\.\/[^']+)'/gm)) assert.ok(shipped.has(`assets/${spec.slice(2)}`), `${file} imports ${spec}, which the build does not ship`)
assert.match(css, /@media \(max-width: 620px\)/)
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/)
assert.ok(!/ease-in[;)\s,]/.test(css.replace(/ease-in-out/g, '')), 'no ease-in in UI motion (motion doctrine)')
const sitemap = read('sitemap.xml')
for (const file of PAGES) {
  const loc = `<loc>https://passioncode.ai/${file.replace(/index.html$/, '')}</loc>`
  assert.equal(sitemap.includes(loc), !NOINDEX.has(file), `sitemap: ${loc} ${NOINDEX.has(file) ? 'must not be listed' : 'missing'}`)
}
// Each listed address names its language versions, as the pages' own hreflang links do.
for (const block of sitemap.match(/<url>[\s\S]*?<\/url>/g)) {
  const loc = /<loc>([^<]+)<\/loc>/.exec(block)[1]
  const file = PAGES.find(f => `${ORIGIN}${pageRoute(sourceFileOf(f), localeOfFile(f))}` === loc)
  assert.ok(file, `sitemap: ${loc} is not a page`)
  const links = [...block.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)].map(m => `${m[1]} ${m[2]}`)
  assert.deepEqual(links, alternates(sourceFileOf(file)).map(([l, href]) => `${l} ${href}`), `sitemap: ${loc} alternates`)
}
assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/, 'sitemap declares the xhtml namespace')
console.log(`PASS: ${PAGES.length} static pages, metadata, CSP-safe markup, anchors, live values, shared header and footer`)

// ---- the homepage: the hero, why, two doors, the tools, source, FAQ, the founder note ---------
// Simplified 2026-10-10 (operator): the hero and its narrative are unchanged; after it, one beat
// of problem and answer, the two doors, the tools with their status, the license line, a short
// FAQ and the founder note. Removed sections keep their addresses as legacy anchors.
const home = read('index.html')
for (const text of ['The agent-agnostic operating system for', 'AI-native teams', 'From vibe coding to passion coding', 'the home for your projects and their agents', 'does not reply yet', 'real-model replies are not yet verified', 'href="/start/"', 'href="/business/"', 'href="/vision/"', 'since version 0.3.2, Fabric send anonymous usage counts', 'Fabric, Fabric Inbox, Switchboard, Observatory and Fabric Dashboards are open source under AGPL-3.0', 'A commercial license is available', '<!-- license-history -->', 'local, open-source workspace', 'the subscription you already have', 'free for personal use; a commercial license covers what the AGPL does not']) assert.ok(home.includes(text), `homepage missing ${text}`)
// The founders' story (operator 2026-10-11, docs/brand/facts.md rows *founders*, *Nicegram installs*,
// *Ultimate Guitar scale*, *Serge Khurs*): first person, two co-founders, no links to publications or
// sources, Nicegram counted in installs and never as "founded", and the request link to /business/.
{
  const about = home.slice(home.indexOf('<section class="section about-section" id="about"'), home.indexOf('</section>', home.indexOf('id="about"')))
  for (const text of ['I’m Sergey Sheleg, co-founder and CPO of Nicegram', 'more than 57 million installs', 'whose apps reach more than 350 million people', 'Serge Khurs, co-founder and CTO of Teslasuit', 'It runs our own work today', 'href="/business/#request"', 'free for personal use; a commercial license covers what the AGPL does not', 'Follow on X', 'Sergey Sheleg · co-founder, PassionCode']) assert.ok(about.includes(text), `homepage #about missing ${text}`)
  assert.deepEqual([...about.matchAll(/href="(https?:[^"]+)"/g)].map(m => m[1]), ['https://x.com/sshlg93'], 'homepage #about: the only external link is the X profile (no publications or sources)')
  assert.ok(!/Nicegram[^.]{0,80}\busers\b|\b(?:founded|created) Nicegram|organic/i.test(about), 'homepage #about: Nicegram is counted in installs, never users or organic, and never "founded"')
  const org = JSON.parse(/<script type="application\/ld\+json">(\{[\s\S]*?"@graph"[\s\S]*?\})<\/script>/.exec(home)[1])['@graph'].find(n => n['@type'] === 'Organization')
  assert.deepEqual(org.founder.map(p => [p['@type'], p.name, (p.sameAs || []).join()]), [['Person', 'Sergey Sheleg', 'https://x.com/sshlg93'], ['Person', 'Serge Khurs', '']], 'homepage JSON-LD: the two co-founders')
  for (const file of SOURCE_PAGES) assert.ok(!/>Twitter <span/.test(read(file)), `${file}: the footer names X, not Twitter`)
}
for (const id of ['why', 'how', 'start', 'products', 'source', 'faq', 'about', 'path', 'vision', 'toolkit', 'extend', 'companies', 'launcher']) assert.ok(home.includes(`id="${id}"`), `homepage section or legacy anchor #${id}`)
// Sample-data mockups (SITE-028 W5, docs/evidence/2026-10-11-mockups/README.md): each rendered from a
// product's own interface with sample data, 2560×1600, a visible "Sample data" chip, an -ru twin for
// the Russian pages (scripts/locales.mjs localizedAsset), within the size budget, and published.
const MOCKUPS = ['journey-2-2.jpg', 'journey-3-1.jpg', 'journey-3-2.jpg', 'journey-3-3.jpg', 'journey-3-4.jpg', 'observatory-overview.jpg', 'inbox-overview.jpg']
{
  const built = read('scripts/build-site.mjs')
  const jpegSize = buf => { for (let i = 2; i < buf.length;) { const marker = buf[i + 1]; const len = buf.readUInt16BE(i + 2); if (marker >= 0xc0 && marker <= 0xc2) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]; i += 2 + len } return null }
  for (const image of MOCKUPS) for (const file of [image, image.replace(/\.jpg$/, '-ru.jpg')]) {
    const buf = readFileSync(resolve(root, 'assets', file))
    assert.deepEqual(jpegSize(buf), [2560, 1600], `assets/${file}: 1280×800 at 2x`)
    assert.ok(buf.length <= 320 * 1024, `assets/${file}: ${buf.length} bytes is over the 320 KB budget`)
    assert.ok(built.includes(`'assets/${file}'`), `assets/${file} is published by scripts/build-site.mjs`)
  }
  for (const file of SOURCE_PAGES) for (const [, image, alt] of read(file).matchAll(/<img src="\/assets\/([^"]+)"[^>]*alt="([^"]*)"/g)) {
    if (MOCKUPS.includes(image)) assert.match(alt, /Synthetic demo data\.$|A written example, not a recording\.$/, `${file}: ${image} says it shows sample data`)
  }
}
// How it works (SITE-028 W6, docs/ux/scenarios.md SCN-021): the six journey steps of
// docs/brand/narrative.md §3, each with its state label; pictures only from the synthetic shots the
// journey truth table marks reusable; the home video (W10) sits under the hero since SITE-039.
{
  const how = home.slice(home.indexOf('<section class="section journey" id="how"'), home.indexOf('</section>', home.indexOf('id="how"')))
  assert.ok(how.length > 100, 'homepage: the How it works section')
  const labels = [...how.matchAll(/<li class="reveal"><span class="cycle-number">0([1-6])<\/span><p class="availability">([^<]+)<\/p><h3>([^<]+)<\/h3>/g)].map(m => `${m[1]} ${m[3]}: ${m[2]}`)
  assert.deepEqual(labels, ['1 Enter: AVAILABLE NOW', '2 Onboard: PREVIEW', '3 First agent: AVAILABLE NOW', '4 Grow: AVAILABLE NOW', '5 Work together and watch: AVAILABLE NOW, IN PART', '6 Organization: DIRECTION'], 'homepage: six journey steps, each with its state')
  const SAFE = new Set(['dashboards-overview.jpg', 'fabric-board.jpg', 'fabric-home.jpg', 'fabric-releases.jpg', 'dashboards-service-dashboard.jpg', 'observatory-demo.jpg', 'switchboard-accounts.jpg', ...MOCKUPS])
  for (const [, image] of how.matchAll(/<img src="\/assets\/([^"]+)"/g)) assert.ok(SAFE.has(image), `homepage #how: ${image} is not a synthetic shot the journey truth table marks reusable`)
  // Since SITE-045 (operator 2026-10-14) step 01 teaches setup, the way to start: the launcher sets up the tools,
  // their MCP servers and the skills, or a coding agent runs it; Fabric still needs Docker and the Supabase CLI.
  for (const text of ['<code>npx @passioncode-ai/passioncode@latest setup</code>', 'or let your coding agent run it', 'Docker and the Supabase CLI', 'href="/start/#setup"']) assert.ok(how.includes(text), `homepage step 1: ${text}`)
  // The home video (SITE-028 W10; v2 since SITE-043, docs/video/2026-10-12-home-v2/README.md): click to play, never
  // autoplays or loops, loads nothing but its poster before play, captions on by default; the
  // Russian cut and every language's captions exist, are published and stay within budget.
  // Since SITE-039 (operator 2026-10-12) the player sits directly under the hero, before Why: the
  // hero's text stays the page's answer, and the video is the next thing a visitor meets.
  assert.ok(!how.includes('home-video'), 'homepage: the video moved out of #how (SITE-039)')
  const afterHero = home.slice(home.indexOf('</section>', home.indexOf('class="hero home-hero"')), home.indexOf('<section class="section" id="why"'))
  const video = /^<\/section>\s*<figure class="home-video" id="video">([\s\S]*?)<\/figure>\s*$/.exec(afterHero)?.[1]
  assert.ok(video, 'homepage: the video block directly under the hero, before #why (SITE-039)')
  assert.equal((video.match(/<video /g) || []).length, 1, 'homepage: one player')
  assert.ok(!/<iframe/.test(home), 'homepage: no embedded third-party player')
  const tag = /<video [^>]*>/.exec(video)[0]
  for (const a of ['controls', 'preload="none"', 'playsinline', 'poster="/assets/video/home.jpg"', 'width="1920"', 'height="1080"']) assert.ok(tag.includes(a), `homepage video: ${a}`)
  for (const a of ['autoplay', 'loop', 'muted']) assert.ok(!new RegExp(`\\s${a}\\b`).test(tag), `homepage video: no ${a} (motion doctrine: a rendered file owes a control and no autoplay)`)
  assert.ok(video.includes('<source src="/assets/video/home.webm" type="video/webm">') && video.includes('<source src="/assets/video/home.mp4" type="video/mp4">'), 'homepage video: WebM and MP4')
  assert.ok(/<track kind="captions" src="\/assets\/video\/home\.vtt" srclang="en" label="Captions" default>/.test(video), 'homepage video: English captions on by default')
  assert.match(video, /<figcaption id="video-note">[^<]*sample data[^<]*written example[^<]*<\/figcaption>/, 'homepage video: says it shows sample data and a written example')
  const built = read('scripts/build-site.mjs')
  assert.ok(built.includes('assets/video/home${suffix}.mp4') && built.includes('assets/video/home${locale === \'en\' ? \'\' : `-${locale}`}.vtt`).filter(file => existsSync'), 'scripts/build-site.mjs publishes the home video files')
  for (const suffix of ['', '-ru']) {
    for (const ext of ['mp4', 'webm']) {
      const size = statSync(resolve(root, `assets/video/home${suffix}.${ext}`)).size
      assert.ok(size <= 8 * 1024 * 1024, `assets/video/home${suffix}.${ext}: ${size} bytes is over the 8 MB budget`)
    }
    const poster = readFileSync(resolve(root, `assets/video/home${suffix}.jpg`))
    assert.ok(poster.length <= 320 * 1024, `assets/video/home${suffix}.jpg: ${poster.length} bytes is over the 320 KB budget`)
  }
  // Every language has its own captions (SITE-035, 2026-10-12). A language added later may start
  // without them: its page then shows the English captions marked srclang="en" (scripts/locales.mjs),
  // so only a language listed here is required.
  const CAPTIONED = ['en', 'ru', 'de', 'fr', 'pl', 'ko', 'es', 'pt-br', 'zh-hans', 'ja']
  for (const locale of LOCALES) {
    const file = `assets/video/home${locale === 'en' ? '' : `-${locale}`}.vtt`
    if (!CAPTIONED.includes(locale) && !existsSync(resolve(root, file))) continue
    const vtt = read(file)
    assert.ok(vtt.startsWith('WEBVTT\n'), `${file}: a WebVTT file`)
    assert.ok((vtt.match(/ --> /g) || []).length >= 8, `${file}: captions for the whole narration`)
    const last = Math.max(...[...vtt.matchAll(/--> 00:(\d\d):(\d\d\.\d{3})/g)].map(m => +m[1] * 60 + +m[2]))
    assert.ok(last > 78 && last < 98, `${file}: the last caption ends with the narration (${last} s; the v3 cut: en 91.6 s, ru 98.0 s)`)
    // Captions translated on the English cue timings keep every cue's timing (SITE-035).
    if (['pl', 'ko', 'pt-br', 'zh-hans', 'ja'].includes(locale)) {
      const timings = text => text.split('\n').filter(line => line.includes(' --> ')).join('\n')
      assert.equal(timings(vtt), timings(read('assets/video/home.vtt')), `${file}: every cue keeps home.vtt's timing`)
    }
  }
}
// Decided terms (operator 2026-10-10, docs/brand/terminology.md): Fabric is "the home for your
// projects and their agents" and "CEO" appears once, on /fabric/ (D-T5); the product pages say
// IN THE TOOLKIT (D-T4); "harness" is named on /vision/ only (D-T1).
for (const file of SOURCE_PAGES) {
  const words = read(file).replace(/https?:\/\/[^"\s]+/g, '')
  if (file !== 'fabric/index.html') assert.ok(!/\bCEO\b/.test(words), `${file}: "CEO" belongs to /fabric/ only (D-T5)`)
  assert.ok(!words.includes('IN THE FAMILY'), `${file}: the label is IN THE TOOLKIT (D-T4)`)
  if (!['vision/index.html', 'fabric/agents/index.html', 'switchboard/agents/index.html'].includes(file)) assert.ok(!/\bharness\b/i.test(words.replace(/id="harness"|#harness/g, '')), `${file}: "harness" is named on /vision/ only (D-T1)`)
}
for (const name of ['PassionCode.ai launcher', 'Fabric Dashboards', 'Project Observatory', 'Fabric Inbox', 'Fabric Switchboard']) assert.ok(home.includes(name), `homepage names ${name}`)
assert.equal((home.match(/<details><summary>/g) || []).length, 3, 'homepage: a short FAQ')
for (const path of ['/switchboard/', '/dashboards/', '/observatory/', '/inbox/', '/fabric/']) assert.ok(home.includes(`href="${path}"`), `homepage links ${path}`)
assert.match(home, /<meta name="description" content="[^"]*Project Observatory/, 'homepage description names Observatory')
assert.ok(home.includes('"@type": "FAQPage"'), 'homepage FAQ structured data')

// SITE-045 (operator decisions D1–D3, 2026-10-14; docs/brand/facts.md rows *homepage hero*, *one door to setup*,
// *investors note*): one door to setup on every page, Fabric first as the home, the About notes, the video's twins.
for (const file of SOURCE_PAGES) {
  const header = read(file).match(/<header class="site-header">[\s\S]*?<\/header>/)[0]
  assert.ok(header.includes('<a class="header-link header-download" href="/start/#setup">Set up <span aria-hidden="true">↓</span></a>'), `${file}: the header's one door is Set up → /start/#setup`)
  const footer = read(file).match(/<footer class="story-footer">[\s\S]*?<\/footer>/)[0]
  for (const href of ['/#investors', '/#contributors', '/#press']) assert.ok(footer.includes(`href="${href}"`), `${file}: the footer links ${href}`)
}
{
  assert.match(home, /<h1 id="hero-title">The agent-agnostic operating system for <em>AI-native teams<\/em><\/h1>/, 'homepage: the H1 stays (D1)')
  assert.ok(home.includes('<p class="hero-body">Fabric is the home for your projects and their agents. Switchboard, Dashboards, Observatory and Inbox work with it, and on their own. One command sets it all up today</p>'), 'homepage: the one subline under the H1 (D1)')
  assert.ok(!/\bmodules?\b/i.test(currentWords(home).replace(/<[^>]+>/g, ' ')), 'homepage: "module" is not a public word (D2)')
  const doors = home.slice(home.indexOf('id="start"'), home.indexOf('</section>', home.indexOf('id="start"')))
  assert.ok(doors.includes('<pre class="copyable"><code>npx @passioncode-ai/passioncode@latest setup</code></pre>'), 'homepage For you card: the setup command to copy')
  const tools = home.slice(home.indexOf('id="products"'), home.indexOf('</section>', home.indexOf('id="products"')))
  const order = [...tools.matchAll(/<a class="tool-choice[^"]*" href="([^"]+)"/g)].map(m => m[1])
  assert.deepEqual(order, ['/fabric/', '/switchboard/', '/dashboards/', '/observatory/', '/inbox/'], 'homepage #products: Fabric first, then the four; no launcher card')
  assert.ok(tools.includes('tool-choice-home') && tools.includes('Work with Fabric, and on their own'), 'homepage #products: Fabric as the home, the four work with it and on their own')
  const about = home.slice(home.indexOf('id="about"'), home.indexOf('</section>', home.indexOf('id="about"')))
  for (const id of ['investors', 'contributors', 'press']) assert.ok(about.includes(`id="${id}"`), `homepage #about: the ${id} note`)
  const investors = about.slice(about.indexOf('id="investors"'), about.indexOf('id="contributors"'))
  for (const text of ['open source under the GNU AGPL-3.0 and free for personal use', 'commercial license and our services', 'co-founders', 'mailto:commercial@passioncode.ai']) assert.ok(investors.includes(text), `homepage #investors: ${text} (D3)`)
  assert.ok(!/\$|€|\d+\s?%|\b(?:valuation|revenue|raise|round|ARR|MRR|price|term sheet)\b/i.test(investors.replace(/AGPL-3\.0/g, '')), 'homepage #investors: no figures, prices or terms (D3)')
  assert.ok(about.includes('href="/start/#contribute"'), 'homepage #contributors: links /start/#contribute')
  const press = about.slice(about.indexOf('id="press"'))
  for (const href of ['/#video', '/assets/passioncode-mark.svg', '/assets/icon-1024.png', 'mailto:commercial@passioncode.ai']) assert.ok(press.includes(`href="${href}"`), `homepage #press: ${href}`)
  // The video's twins come from its own files (scripts/locales.mjs applyVideo): the VideoObject and the transcript.
  const ld = [...home.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).find(d => d['@type'] === 'VideoObject')
  assert.ok(ld, 'homepage: VideoObject structured data')
  assert.equal(ld.contentUrl, 'https://passioncode.ai/assets/video/home.mp4', 'homepage VideoObject: the English cut')
  assert.equal(ld.thumbnailUrl, 'https://passioncode.ai/assets/video/home.jpg', 'homepage VideoObject: the poster')
  assert.equal(ld.duration, isoDuration(mp4Seconds(resolve(root, 'assets/video/home.mp4'))), 'homepage VideoObject: the duration of home.mp4 — run npm run locales')
  for (const key of ['name', 'description', 'uploadDate', 'inLanguage']) assert.ok(ld[key], `homepage VideoObject: ${key}`)
  const transcript = /<details class="video-transcript"><summary>Read the transcript<\/summary><!-- video-transcript[^>]*--><p>([^<]+)<\/p><!-- \/video-transcript --><\/details>/.exec(home)?.[1]
  assert.equal(transcript?.replace(/&amp;/g, '&'), vttText(read('assets/video/home.vtt'), 'en'), 'homepage: the transcript under the player is home.vtt — run npm run locales')
}
{
  // /fabric/ answers what Fabric is; what works with it is one short section, available now vs direction.
  const fabricPage = read('fabric/index.html')
  const app = [...fabricPage.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).find(d => d['@type'] === 'SoftwareApplication')
  assert.ok(app && app.name === 'Fabric' && app.softwareVersion === snapshot.products.fabric.version, '/fabric/: SoftwareApplication JSON-LD with the current version')
  const works = fabricPage.slice(fabricPage.indexOf('id="works-with"'), fabricPage.indexOf('</section>', fabricPage.indexOf('id="works-with"')))
  for (const href of ['/switchboard/', '/dashboards/', '/observatory/', '/inbox/', '/start/#setup']) assert.ok(works.includes(`href="${href}"`), `/fabric/ #works-with links ${href}`)
  assert.ok(/AVAILABLE NOW<\/p><h3>One command sets up all of it/.test(works) && /DIRECTION<\/p><h3>Add a tool from inside Fabric/.test(works), '/fabric/ #works-with: setup today, installing from inside Fabric as direction')
  for (const file of ['fabric/index.html', 'switchboard/index.html', 'dashboards/index.html', 'observatory/index.html', 'inbox/index.html']) assert.ok(read(file).includes('<p class="setup-line"><a href="/start/#setup">Set up everything with one command'), `${file}: one line to the setup`)
  const businessPage = read('business/index.html')
  const hero = businessPage.slice(businessPage.indexOf('business-hero'), businessPage.indexOf('</section>', businessPage.indexOf('business-hero')))
  assert.deepEqual([...hero.matchAll(/<a class="button[^"]*" href="([^"]+)"/g)].map(m => m[1]), ['#request'], '/business/: one hero action, to the request')
  assert.ok(businessPage.includes('href="/start/#setup">Try it on one machine first: setup, then doctor'), '/business/: the admin line to setup and doctor')
  assert.ok(!/1 to 1000 people/.test(businessPage), '/business/: the size line agrees with the 1000_plus answer')
}

// ---- /start/: install, create, convert, run, contribute --------------------------------------
const start = read('start/index.html')
for (const text of ['npx @passioncode-ai/passioncode@latest setup', 'href="/fabric/download/macos"', 'href="/dashboards/download/macos"', 'Docker and the Supabase CLI', 'does not reply yet', 'Adapt this repository to Fabric', 'CONTRIBUTING.md', 'CLA.md', '"@type": "HowTo"']) assert.ok(start.includes(text), `/start/ missing ${text}`)
for (const id of ['setup', 'setup-prompt', 'launcher', 'by-hand', 'fabric', 'dashboards', 'build', 'run', 'family', 'pipeline', 'contribute']) assert.ok(start.includes(`id="${id}"`), `/start/ #${id}`)
// The one command leads (operator 2026-10-13): setup for a new or an existing computer, doctor to
// check only, and the copy-prompt; the five steps stay below it as the manual path.
for (const text of ['<code>npx @passioncode-ai/passioncode@latest setup</code>', '<code>npx @passioncode-ai/passioncode@latest doctor</code>', 'npx --yes @passioncode-ai/passioncode@latest setup --yes --json', 'data-copy-prompt']) assert.ok(start.includes(text), `/start/ missing ${text}`)
assert.ok(start.indexOf('id="setup"') < start.indexOf('id="build"'), '/start/: the one command comes before the steps')
// SITE-045 (operator 2026-10-14): the command and the copy-prompt side by side; the manual downloads folded into one
// <details>; the launcher's `update` step gone (setup covers it); task-pipeline lives on /vision/ with one link here.
{
  const setup = start.slice(start.indexOf('id="setup"'), start.indexOf('</section>', start.indexOf('id="setup"')))
  const pair = setup.slice(setup.indexOf('<div class="setup-pair">'), setup.indexOf('<details'))
  assert.ok(pair.includes('id="setup-command"') && pair.includes('id="setup-prompt"'), '/start/: the command and the copy-prompt sit side by side')
  assert.match(setup, /<details class="manual-setup" id="by-hand"><summary>Prefer to do it by hand\?<\/summary>[\s\S]*id="fabric"[\s\S]*id="dashboards"[\s\S]*<\/details>/, '/start/: the manual downloads are folded into one details')
  assert.ok(!start.includes('npx sshlg-skills install'), '/start/: the task-pipeline install line lives on /vision/')
  assert.ok(start.includes('href="/vision/#pipeline"'), '/start/: one link to task-pipeline on /vision/')
  assert.ok(start.includes('"position": 4') && !start.includes('"position": 5'), '/start/: the HowTo has four steps')
}
// The terminal cards show the command without `--yes`; `--yes` belongs to the agent copy-prompt only (coordinator 2026-10-14).
for (const file of SOURCE_PAGES) assert.ok(!/<code>npx --yes /.test(read(file)), `${file}: a terminal card shows the command without --yes`)
// `update` updates the skills; it is never taught as the way to start (SITE-045).
for (const file of [...SOURCE_PAGES, 'llms.txt']) assert.ok(!read(file).includes('@passioncode-ai/passioncode@latest update'), `${file}: the way to start is setup, not update`)

// ---- /vision/: sources, the harness, the path, today against direction ------------------------
const vision = read('vision/index.html')
assert.ok(vision.includes('<pre class="copyable"><code>npx sshlg-skills install</code></pre>') && vision.includes('id="pipeline"'), '/vision/#pipeline: the task-pipeline recommendation and its install line (SITE-045)')
for (const text of ['https://www.mckinsey.com/', 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents', 'https://openai.com/index/harness-engineering/', 'https://github.com/ssheleg/sshlg-skills', 'Projects are the axis', 'The work improves itself', 'are the direction', 'Analytics, never surveillance', 'AVAILABLE NOW', 'DIRECTION', 'href="/start/"', 'href="/business/"', '"@type": "FAQPage"']) assert.ok(vision.includes(text), `/vision/ missing ${text}`)
for (const id of ['harness', 'beliefs', 'path', 'pipeline', 'faq', 'problem', 'today', 'trust', 'organizations']) assert.ok(vision.includes(`id="${id}"`), `/vision/ #${id}`)
assert.equal((vision.match(/<li class="reveal"><span class="cycle-number">0[1-6]<\/span><p class="availability">/g) || []).length, 6, '/vision/: every stage of the path says whether it works today')

// ---- /business/: the funnel form agrees with what the Worker accepts --------------------------
// The founders' short version (#founders, 2026-10-11) sits ahead of the form and links to /#about.
const business = read('business/index.html')
for (const text of ['action="/api/leads" method="post"', 'name="form_token"', 'name="pc_hp"', 'href="/privacy/"', 'mailto:commercial@passioncode.ai', 'An estimate, not a promise', '"@type": "Service"', '"@type": "FAQPage"', 'src="/assets/business.js"', 'PassionCode for Enterprise', 'Designed for one person to more than 1,000', 'id="organization"', 'id="founders"', 'href="/#about"', 'Serge Khurs, co-founder and CTO of Teslasuit', 'id="enterprise"', 'is in development', 'keys never leave the machine that holds them', 'on your machines or in your own cloud', 'there is no fixed package']) assert.ok(business.includes(text), `/business/ missing ${text}`)
// Analytics in public copy are about agents and outcomes; the page never frames them as a
// judgement of people (operator rule, docs/brand/terminology.md "PassionCode for Enterprise").
assert.ok(!/\b(?:employee|staff|people)\b[^.]{0,40}\b(?:scor|assess|evaluat|performance)/i.test(currentWords(business)), '/business/: analytics are about agents, never a judgement of people')
const selectValues = name => {
  const block = new RegExp(`<select name="${name.replace('.', '\\.')}"[^>]*>([\\s\\S]*?)</select>`).exec(business)
  assert.ok(block, `/business/ select ${name}`)
  return [...block[1].matchAll(/<option value="([^"]+)">/g)].map(m => m[1])
}
// Since 2026-10-11 (operator ON-3) the form asks for the minimum: what agents should do, a work
// email and an optional goal. No other answer, and no consent box (Art. 6(1)(b), /privacy/).
{
  const form = /<form class="lead-form"[\s\S]*?<\/form>/.exec(business)[0]
  const names = [...new Set([...form.matchAll(/\sname="([^"]+)"/g)].map(m => m[1]))]
  assert.deepEqual(names, ['form_token', 'pc_hp', 'contact.message', 'contact.email', 'goals'], '/business/: the short form carries exactly its three fields, the token and the trap')
  assert.ok(/<textarea name="contact\.message"[^>]*\brequired\b/.test(form) && /<input type="email" name="contact\.email"[^>]*\brequired\b/.test(form), '/business/: the text and the email are required')
  assert.ok(!/<select name="goals"[^>]*\brequired\b/.test(form), '/business/: the goal is optional')
  assert.deepEqual(selectValues('goals'), Object.keys(LEAD_OPTIONS.goals), '/business/: the goal list is assets/lead-options.js goals, in its order')
  assert.equal(selectValues('goals')[0], 'cost_and_results', '/business/: the finance goal comes first (ON-3)')
}
// The agent prompt (SCN-022) comes before the form, and the plain-text copy is linked.
assert.ok(business.indexOf('data-copy-prompt') > 0 && business.indexOf('data-copy-prompt') < business.indexOf('<form class="lead-form"'), '/business/: the agent prompt is ahead of the form')
assert.ok(business.indexOf('id="founders"') > 0 && business.indexOf('id="founders"') < business.indexOf('id="enterprise"'), '/business/: the founders\' short version comes right after the hero, ahead of the form')
for (const text of ['href="/business/agent-request.txt"', 'https://passioncode.ai/api/leads/token', "https://passioncode.ai/api/leads?dry_run=1", '"channel": "agent-prompt"', 'only after I say yes']) assert.ok(business.includes(text), `/business/ agent prompt missing ${text}`)
// ON-2: the job titles appear once; ON-4: no spend level of our own is ever published.
assert.equal((business.match(/\(the CFO and the CTO or CIO\)/g) || []).length, 1, '/business/: the champion\'s job titles appear once')
// ON-4: our own spend levels (an organization ceiling, per-project limits) are never public.
// ON-5: public copy stays at agents and workflows; no team-level views.
for (const file of ['index.html', 'business/index.html', 'vision/index.html', 'start/index.html', 'dashboards/index.html']) {
  const words = currentWords(read(file))
  assert.ok(!/(?:ceiling|cap|limit)s?\b[^.<]{0,40}\$\s?\d[\d,]*|\$\s?\d[\d,]*[^.<]{0,30}\b(?:ceiling|cap|limit)/i.test(words), `${file}: no spend level of our own is published (ON-4)`)
  assert.ok(!/\bteam[- ](?:level )?(?:views?|dashboards?|rankings?)\b/i.test(words), `${file}: no team-level views in public copy (ON-5)`)
}
// commercial@ is the contact, not the path: the page leads to the form.
assert.equal((business.match(/mailto:commercial@passioncode.ai/g) || []).length, 2, '/business/: the email appears once in the page and once in the footer')
// The English form shows every answer with the label assets/lead-options.js gives it: the visitor
// reads the words, the Worker receives the values. A translated form is generated from it
// (scripts/build-locale.mjs: same values, same field names, labels from the catalog).
{
  const shown = {}
  for (const o of /<select name="goals"[^>]*>([\s\S]*?)<\/select>/.exec(business)[1].matchAll(/<option value="([^"]+)">([^<]*)<\/option>/g)) shown[o[1]] = o[2].replace(/&amp;/g, '&').trim()
  assert.deepEqual(shown, LEAD_OPTIONS.goals, '/business/: the form\'s goal labels differ from assets/lead-options.js')
}
for (const locale of TRANSLATED_LOCALES) {
  const form = read(`${locale}/business/index.html`)
  for (const text of [`action="/api/leads?lang=${locale}" method="post"`, 'name="form_token"', 'name="pc_hp"', `href="/${locale}/privacy/"`, 'src="/assets/business.js"', `href="/${locale}/business/agent-request.txt"`, '"channel": "agent-prompt"', 'https://passioncode.ai/api/leads/token']) assert.ok(form.includes(text), `/${locale}/business/ missing ${text}`)
}
const privacy = read('privacy/index.html')
for (const text of ['GDPR Art. 6(1)(b)', '24 months', '30 days', 'Western Europe', 'Frankfurt', 'no cookies', 'VERSION 2026-10-11', 'since version 0.3.2, Fabric send anonymous usage counts']) assert.ok(privacy.includes(text), `/privacy/ missing ${text}`)
console.log('PASS: homepage vision and paths, /start/ guide, /business/ form ↔ Worker options, privacy notice')

// ---- product pages: honest disclosures stay -------------------------------------------------
const product = read('switchboard/index.html')
for (const text of [release.version, release.releaseUrl, 'Authenticode-signed since 0.6.16', 'tracked openly in the repository', 'Before you open it', 'href="/observatory/"', ...LICENSE_WORDING]) assert.ok(product.includes(text), `switchboard missing ${text}`)
assert.deepEqual(checkSwitchboardPage(product, release), [], 'switchboard/index.html: release-bound sections')
assert.equal(release.tag, snapshot.products.switchboard.tag, 'switchboard/release.json follows releases/current.json — run npm run releases:sync')
for (const os of ['macos', 'windows']) assert.ok(product.includes(`href="/switchboard/download/${os}"`))

const fabric = read('fabric/index.html')
assert.ok(fabric.includes('href="/fabric/download/macos"'), 'Fabric offers its macOS download through the Worker route')
// SITE-046: Fabric 0.3.5 ships Windows and Linux builds; the page offers every one of them through the Worker
// route, and says what each system needs (Fabric README "Quick start", v0.3.5 notes) and what is not there yet.
for (const platform of Object.keys(snapshot.products.fabric.assets)) assert.ok(fabric.includes(`href="/fabric/download/${platform}"`), `Fabric offers its ${platform} download through the Worker route`)
for (const text of ['Docker Desktop or OrbStack', 'Docker Desktop with WSL2', 'Docker Engine', 'scoop install supabase', 'brew install supabase/tap/supabase', 'Prefer the .deb', 'Not yet on Windows and Linux', 'Not yet on Windows:']) assert.ok(fabric.includes(text), `Fabric page must say: ${text}`)
assert.ok(fabric.includes('Early preview'), 'Fabric is labelled an early preview')
// Since 0.3.1 Fabric has a local agent hub (Fabric ADR-0115, facts.md "Fabric MCP"): the page says what it does,
// and the earlier "no MCP entry of its own" would now be false, so it must be gone.
for (const text of ['Apple silicon', 'Docker', 'Supabase CLI', 'does not reply yet', 'local agent hub', 'allow or deny each request', 'href="https://github.com/passioncode-ai/fabric"', ...LICENSE_WORDING]) assert.ok(fabric.includes(text), `Fabric page must say: ${text}`)
assert.ok(!fabric.includes('no MCP entry of its own'), 'the Fabric page no longer claims it has no agent entry: 0.3.1 ships the hub')
for (const image of ['fabric-home.jpg', 'fabric-board.jpg', 'fabric-releases.jpg']) assert.ok(fabric.includes(`/assets/${image}`), `Fabric preview ${image}`)
assert.equal((fabric.match(/\bCEO\b/g) || []).length, 1, 'Fabric names CEO once, as the direction (D-T5)')
assert.ok(fabric.includes('act as the CEO of your agents'), 'Fabric: CEO is the direction')
for (const action of ['Create an agent', 'Adapt an agent', 'Open a project', 'Create a project']) assert.ok(fabric.includes(`<dt>${action}</dt>`), `Fabric names its first screen's action: ${action}`)
assert.ok(!/source is private/i.test(fabric), 'Fabric source is public since 2026-09-30')

const inbox = read('inbox/index.html')
for (const text of ['Development preview', 'General IMAP and Outlook', 'not yet been tried with a real model call', 'href="/fabric/"', 'href="/inbox/download/macos"', 'Settings → Agent access', '/mcp', 'href="https://github.com/passioncode-ai/fabric-inbox"', 'Authenticode-signed since 0.14.1', 'a copy installed from the .deb does not', 'The Mac App Store version does not have the console', 'in 0.15.0 it could not start', 'revoked when the session ends', 'A Mac copy older than 0.15.2 cannot update itself', ...LICENSE_WORDING]) assert.ok(inbox.includes(text), `Inbox missing ${text}`)

const dashboards = read('dashboards/index.html')
for (const text of ['macOS 13', 'Apple silicon', 'Intel', 'list_services', 'Services are installed separately', 'Release 0.3.1 is the first under the AGPL', 'href="/dashboards/download/macos"', 'a copy installed from the .deb does not', ...LICENSE_WORDING]) assert.ok(dashboards.includes(text), `Dashboards missing ${text}`)
// Since 0.7.4 (SITE-033) the Windows app and the AppImage update themselves; the old macOS-only line is false.
assert.ok(!dashboards.includes('automatic on macOS only'), 'Dashboards still says updates are automatic on macOS only')

const observatory = read('observatory/index.html')
for (const text of ['requirements-full.lock', 'observatory_overview', 'notarized by Apple', 'first under the AGPL', '0.8.2 to 0.9.1 under PolyForm', 'SHA256SUMS', 'claude mcp add observatory', 'https://github.com/passioncode-ai/project-observatory-dashboard', ...LICENSE_WORDING, 'English or Russian', 'cannot find unknown secrets', 'Synthetic demo', 'it does not install the engine', 'Python 3.13 or newer']) assert.ok(observatory.includes(text), `observatory missing ${text}`)
assert.match(observatory, /id="get-started"[^>]*><span id="start"/, 'legacy #start lands in the Observatory setup section')
assert.ok(read('design-system/index.html').includes('/assets/dashboards-mark.svg'), 'design system shows the Fabric Dashboards mark')

// The same honesty in every language: a translation may not soften a limitation
// (docs/brand/voice.md, "Invariant in every language"). Each language names, in its own words,
// what the English checks above require of these pages.
const DISCLOSURE_PAGES = ['index.html', 'start/index.html', 'business/index.html', 'privacy/index.html', 'switchboard/index.html', 'fabric/index.html', 'inbox/index.html', 'dashboards/index.html', 'observatory/index.html']
for (const locale of TRANSLATED_LOCALES) {
  const { disclosures } = CHECKS[locale]
  assert.deepEqual(Object.keys(disclosures).sort(), [...DISCLOSURE_PAGES].sort(), `i18n/${locale}/_checks.json: disclosures for every product page`)
  for (const [page, texts] of Object.entries(disclosures)) {
    // A no-break space (U+00A0, the Russian typesetting after short words, W7) reads as a space here.
    const html = read(`${locale}/${page}`).replace(/\u00a0/g, ' ')
    for (const text of texts) assert.ok(html.includes(text), `${locale}/${page} must say: ${text}`)
  }
  // The live version is the same number in every language.
  assert.ok(read(`${locale}/switchboard/index.html`).includes(release.version), `${locale}/switchboard/index.html names ${release.version}`)
}

// The older manifests stay equal to the snapshot they are written from.
for (const key of ['fabric', 'inbox']) {
  const legacy = JSON.parse(read(`${key}/release.json`))
  assert.equal(legacy.version, snapshot.products[key].version, `${key}/release.json follows releases/current.json`)
  assert.equal(legacy.downloads.macos, snapshot.products[key].assets.macos.url)
  assert.equal(legacy.sha256, snapshot.products[key].assets.macos.sha256)
}
console.log('PASS: product pages keep their disclosures; manifests follow the release snapshot')

// /fabric/agents/ answers one question: which coding agents Fabric works with, and at which level.
// The levels are the operator's statement of 2026-10-05, moved by the Fabric 0.3.2 release on 2026-10-08 and the
// Fabric 0.3.5 release (2026-10-12: Codex and Kimi Code connect; recorded 2026-10-14, SITE-045)
// (docs/brand/facts.md, "Fabric coding agents");
// every agent sits in exactly one level, and the page never moves one up without a new fact row.
const agentsPage = read('fabric/agents/index.html')
const agentLevels = {
  connected: ['Claude Code', 'Codex', 'Kilo Code', 'Hermes Agent', 'Kimi Code'],
  'runs-in-fabric': ['Cline'],
  planned: ['omp (oh-my-pi)', 'pi', 'OpenClaw', 'OpenHands', 'Cursor CLI', 'Command Code', 'DeepSeek Harness', 'LangChain Deep Agents (dcode)', 'Letta', 'Strix', 'goose', 'Qwen Code', 'Gemini CLI', 'OpenCode', 'Zed', 'ZCode', 'Proto', 'CodeGPT', 'Freebuff', 'HackerAI']
}
const rowNames = html => [...html.matchAll(/<th scope="row">([^<]+)<\/th><td><a href="https:\/\/[^"]+">/g)].map(m => m[1])
const allRows = rowNames(agentsPage)
assert.equal(new Set(allRows).size, allRows.length, 'fabric/agents: an agent is listed in more than one row')
for (const [level, names] of Object.entries(agentLevels)) {
  const start = agentsPage.indexOf(`<section class="section" id="${level}"`)
  assert.ok(start > 0, `fabric/agents: missing section #${level}`)
  const section = agentsPage.slice(start, agentsPage.indexOf('</section>', start))
  assert.deepEqual(rowNames(section), names, `fabric/agents: #${level} must list exactly ${names.join(', ')}, in order, each with its official site`)
}
assert.deepEqual(allRows, Object.values(agentLevels).flat(), 'fabric/agents: no agent outside its level table')
for (const text of ['<time datetime="2026-10-14">14 October 2026</time>', 'the released app is Fabric 0.3.5', 'one-session credential', 'nothing is written into the agent’s own settings', '<code>KILO_CONFIG_CONTENT</code>', '<code>kilo.json</code>', 'Kilo 7.4.17', 'href="https://agentclientprotocol.com"', 'href="https://openrouter.ai/apps"', 'read on 5 October 2026', 'largest share', 'switches subscription accounts for Claude Code and Codex', 'href="/switchboard/agents/"', 'planned, not written yet']) assert.ok(agentsPage.includes(text), `fabric/agents must say: ${text}`)
assert.ok(!/\d+(?:\.\d+)?\s?%/.test(currentWords(agentsPage)), 'fabric/agents: OpenRouter shares are named as "largest", never as percentages')
assert.ok(fabric.includes('href="/fabric/agents/"'), 'the Fabric page links its supported coding agents')
console.log(`PASS: /fabric/agents/ lists ${allRows.length} agents, each at one level, as of 2026-10-14`)
