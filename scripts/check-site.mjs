import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { AGPL_LICENSE_URL, checkSwitchboardPage, releaseFacts } from './switchboard-release.mjs'
import { PAGES, NOINDEX } from './pages.mjs'
import { LEAD_OPTIONS } from '../assets/lead-options.js'
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
const downloadPaths = new Set(['/switchboard/download/macos', '/switchboard/download/windows', '/fabric/download/macos', '/inbox/download/macos', '/dashboards/download/macos', '/observatory/download/macos', '/observatory/download/wheel'])
const apiPaths = new Set(['/api/releases', '/api/leads'])
// The only scripts a page may load: the site's own progressive enhancement. Content never
// depends on them (each page is complete without JavaScript).
const ALLOWED_SCRIPTS = new Set(['/assets/site.js', '/assets/business.js'])

for (const file of PAGES) {
  const html = read(file)
  const route = file.replace(/index.html$/, '')
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: exactly one h1`)
  assert.ok(html.includes(`rel="canonical" href="https://passioncode.ai/${route}"`), `${file}: canonical`)
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
    const expected = file === 'switchboard/index.html' ? releaseFacts(release).license : AGPL_LICENSE_URL
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
  assert.ok(!/source[- ]available/i.test(words), `${file}: the tools are open source under AGPL-3.0, no longer source-available (ADR-0092)`)
  assert.ok(!/PolyForm|\bMIT\b/.test(words), `${file}: MIT and PolyForm name only released versions, inside a license-history region`)
  assert.ok(!/AI-native work\b/.test(words), `${file}: the tagline is "AI-native teams"`)
  assert.ok(!/\bseamless|fully autonomous\b/i.test(words), `${file}: banned phrase (docs/brand/terminology.md)`)
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
  if (file !== 'inbox/index.html') assert.ok(html.includes('<nav aria-label="Primary navigation"><a href="/#products">The tools</a><a href="/#toolkit">Your workflow</a><a href="/#extend">For builders</a><a href="/#about">About</a></nav>'), `${file}: primary navigation`)
  assert.equal((html.match(/aria-label="Footer navigation"/g) || []).length, 1, `${file}: one footer navigation landmark`)
  for (const path of ['/start/', '/business/', '/privacy/']) assert.ok(html.includes(`<a href="${path}">`), `${file}: footer links ${path}`)
  assert.ok(html.includes('href="https://x.com/sshlg93"'), `${file}: author link`)
  assert.ok(!/href="https:\/\/github.com\/passioncode-ai\/(?:fabric-workspace|org-index|passioncode-platform)(?:["/#])/.test(html), `${file}: private repository visitor link`)
  assert.ok(html.includes('href="/design-system/tokens.css"'))
}
assert.match(css, /@media \(max-width: 620px\)/)
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/)
assert.ok(!/ease-in[;)\s,]/.test(css.replace(/ease-in-out/g, '')), 'no ease-in in UI motion (motion doctrine)')
const sitemap = read('sitemap.xml')
for (const file of PAGES) {
  const loc = `<loc>https://passioncode.ai/${file.replace(/index.html$/, '')}</loc>`
  assert.equal(sitemap.includes(loc), !NOINDEX.has(file), `sitemap: ${loc} ${NOINDEX.has(file) ? 'must not be listed' : 'missing'}`)
}
console.log(`PASS: ${PAGES.length} static pages, metadata, CSP-safe markup, anchors, live values, shared header and footer`)

// ---- the homepage: vision, onboarding, three paths, honest previews --------------------------
const home = read('index.html')
for (const text of ['The agent-agnostic operating system for', 'AI-native teams', 'From vibe coding to passion coding', 'CEO AI agent', 'Do what you love', 'is where Fabric is heading', 'does not reply yet', 'real-model replies are not yet verified', 'Fabric will do this for you from a conversation', 'href="/start/"', 'href="/business/"', 'href="/start/#contribute"', 'Fabric, Fabric Inbox, Switchboard, Observatory and Fabric Dashboards are open source under AGPL-3.0', 'A commercial license is available']) assert.ok(home.includes(text), `homepage missing ${text}`)
for (const id of ['vision', 'toolkit', 'start', 'products', 'extend', 'companies', 'source', 'faq', 'about', 'launcher']) assert.ok(home.includes(`id="${id}"`), `homepage section #${id}`)
for (const name of ['PassionCode.ai launcher', 'Fabric Agent Adapter', 'Fabric Agent Contract', 'Fabric VR', 'Okolos', 'Fabric Dashboards', 'Project Observatory', 'Fabric Inbox', 'Fabric Switchboard']) assert.ok(home.includes(name), `homepage names ${name}`)
for (const path of ['/switchboard/', '/dashboards/', '/observatory/', '/inbox/', '/fabric/']) assert.ok(home.includes(`href="${path}"`), `homepage links ${path}`)
assert.match(home, /<meta name="description" content="[^"]*Project Observatory/, 'homepage description names Observatory')
assert.ok(home.includes('"@type": "FAQPage"'), 'homepage FAQ structured data')

// ---- /start/: install, create, convert, run, contribute --------------------------------------
const start = read('start/index.html')
for (const text of ['npx @passioncode-ai/passioncode@latest update', 'href="/fabric/download/macos"', 'href="/dashboards/download/macos"', 'Docker and the Supabase CLI', 'does not reply yet', 'Adapt this repository to Fabric', 'CONTRIBUTING.md', 'CLA.md', '"@type": "HowTo"']) assert.ok(start.includes(text), `/start/ missing ${text}`)
for (const id of ['launcher', 'fabric', 'build', 'run', 'contribute']) assert.ok(start.includes(`id="${id}"`), `/start/ #${id}`)

// ---- /business/: the funnel form agrees with what the Worker accepts --------------------------
const business = read('business/index.html')
for (const text of ['action="/api/leads" method="post"', 'name="form_token"', 'name="pc_hp"', 'href="/privacy/"', 'mailto:commercial@passioncode.ai', 'An estimate, not a promise', '"@type": "Service"', '"@type": "FAQPage"', 'src="/assets/business.js"']) assert.ok(business.includes(text), `/business/ missing ${text}`)
const formValues = name => [...business.matchAll(new RegExp(`name="${name.replace('.', '\\.')}" value="([^"]+)"`, 'g'))].map(m => m[1])
const selectValues = name => {
  const block = new RegExp(`<select name="${name.replace('.', '\\.')}"[^>]*>([\\s\\S]*?)</select>`).exec(business)
  assert.ok(block, `/business/ select ${name}`)
  return [...block[1].matchAll(/<option value="([^"]+)">/g)].map(m => m[1])
}
const same = (actual, group, where) => assert.deepEqual([...actual].sort(), Object.keys(LEAD_OPTIONS[group]).sort(), `${where}: the form's answers differ from assets/lead-options.js ${group}`)
same(formValues('goals'), 'goals', 'goals')
same(formValues('processes.areas'), 'areas', 'processes.areas')
same(formValues('processes.currentState'), 'currentState', 'processes.currentState')
same(formValues('processes.tools'), 'tools', 'processes.tools')
same(formValues('setup.mode'), 'mode', 'setup.mode')
same(formValues('setup.hosting'), 'hosting', 'setup.hosting')
same(formValues('setup.constraints'), 'constraints', 'setup.constraints')
same(selectValues('company.industry'), 'industry', 'company.industry')
same(selectValues('company.size'), 'size', 'company.size')
same(selectValues('processes.currency'), 'currency', 'processes.currency')
same(selectValues('budget.monthly'), 'monthly', 'budget.monthly')
same(selectValues('budget.setup'), 'setup', 'budget.setup')
same(selectValues('budget.timeline'), 'timeline', 'budget.timeline')
for (const name of ['company.name', 'company.website', 'company.industryOther', 'company.agentUsers', 'processes.other', 'processes.hoursPerWeek', 'processes.hourlyCost', 'contact.name', 'contact.role', 'contact.email', 'contact.phone', 'contact.telegram', 'contact.message', 'consent.privacy', 'consent.marketing']) assert.ok(business.includes(`name="${name}"`), `/business/ field ${name}`)
// commercial@ is the contact, not the path: the page leads to the form.
assert.equal((business.match(/mailto:commercial@passioncode.ai/g) || []).length, 2, '/business/: the email appears once in the page and once in the footer')
const privacy = read('privacy/index.html')
for (const text of ['GDPR Art. 6(1)(b)', '24 months', '30 days', 'Western Europe', 'Frankfurt', 'no cookies', 'VERSION 2026-10-05']) assert.ok(privacy.includes(text), `/privacy/ missing ${text}`)
console.log('PASS: homepage vision and paths, /start/ guide, /business/ form ↔ Worker options, privacy notice')

// ---- product pages: honest disclosures stay -------------------------------------------------
const product = read('switchboard/index.html')
for (const text of [release.version, release.releaseUrl, 'not yet Authenticode-signed', 'tracked openly in the repository', 'Before you open it', 'href="/observatory/"', ...LICENSE_WORDING]) assert.ok(product.includes(text), `switchboard missing ${text}`)
assert.deepEqual(checkSwitchboardPage(product, release), [], 'switchboard/index.html: release-bound sections')
assert.equal(release.tag, snapshot.products.switchboard.tag, 'switchboard/release.json follows releases/current.json — run npm run releases:sync')
for (const os of ['macos', 'windows']) assert.ok(product.includes(`href="/switchboard/download/${os}"`))

const fabric = read('fabric/index.html')
assert.ok(fabric.includes('href="/fabric/download/macos"'), 'Fabric offers its macOS download through the Worker route')
assert.ok(fabric.includes('Early preview'), 'Fabric is labelled an early preview')
// Since 0.3.1 Fabric has a local agent hub (Fabric ADR-0115, facts.md "Fabric MCP"): the page says what it does,
// and the earlier "no MCP entry of its own" would now be false, so it must be gone.
for (const text of ['Apple silicon', 'Docker', 'Supabase CLI', 'does not reply yet', 'local agent hub', 'allow or deny each request', 'href="https://github.com/passioncode-ai/fabric"', ...LICENSE_WORDING]) assert.ok(fabric.includes(text), `Fabric page must say: ${text}`)
assert.ok(!fabric.includes('no MCP entry of its own'), 'the Fabric page no longer claims it has no agent entry: 0.3.1 ships the hub')
for (const image of ['fabric-home.jpg', 'fabric-board.jpg', 'fabric-releases.jpg']) assert.ok(fabric.includes(`/assets/${image}`), `Fabric preview ${image}`)
assert.ok(!/source is private/i.test(fabric), 'Fabric source is public since 2026-09-30')

const inbox = read('inbox/index.html')
for (const text of ['Development preview', 'General IMAP and Outlook', 'not yet been tried with a real model call', 'href="/fabric/"', 'href="/inbox/download/macos"', 'Settings → Agent access', '/mcp', 'href="https://github.com/passioncode-ai/fabric-inbox"', ...LICENSE_WORDING]) assert.ok(inbox.includes(text), `Inbox missing ${text}`)

const dashboards = read('dashboards/index.html')
for (const text of ['macOS 13', 'Apple silicon', 'Intel', 'list_services', 'Services are installed separately', 'Release 0.3.1 is the first under the AGPL', 'href="/dashboards/download/macos"', ...LICENSE_WORDING]) assert.ok(dashboards.includes(text), `Dashboards missing ${text}`)

const observatory = read('observatory/index.html')
for (const text of ['requirements-full.lock', 'observatory_overview', 'notarized by Apple', 'first under the AGPL', '0.8.2 to 0.9.1 under PolyForm', 'SHA256SUMS', 'claude mcp add observatory', 'https://github.com/passioncode-ai/project-observatory-dashboard', ...LICENSE_WORDING, 'English or Russian', 'cannot find unknown secrets', 'Synthetic demo']) assert.ok(observatory.includes(text), `observatory missing ${text}`)
assert.match(observatory, /id="get-started"[^>]*><span id="start"/, 'legacy #start lands in the Observatory setup section')
assert.ok(read('design-system/index.html').includes('/assets/dashboards-mark.svg'), 'design system shows the Fabric Dashboards mark')

// The older manifests stay equal to the snapshot they are written from.
for (const key of ['fabric', 'inbox']) {
  const legacy = JSON.parse(read(`${key}/release.json`))
  assert.equal(legacy.version, snapshot.products[key].version, `${key}/release.json follows releases/current.json`)
  assert.equal(legacy.downloads.macos, snapshot.products[key].assets.macos.url)
  assert.equal(legacy.sha256, snapshot.products[key].assets.macos.sha256)
}
console.log('PASS: product pages keep their disclosures; manifests follow the release snapshot')

// /fabric/agents/ answers one question: which coding agents Fabric works with, and at which level.
// The levels are the operator's statement of 2026-10-05 (docs/brand/facts.md, "Fabric coding agents");
// every agent sits in exactly one level, and the page never moves one up without a new fact row.
const agentsPage = read('fabric/agents/index.html')
const agentLevels = {
  connected: ['Claude Code', 'Kilo Code', 'Hermes Agent'],
  'runs-in-fabric': ['Codex'],
  planned: ['Cline', 'omp (oh-my-pi)', 'pi', 'OpenClaw', 'OpenHands', 'Cursor CLI', 'Command Code', 'DeepSeek Harness', 'LangChain Deep Agents (dcode)', 'Letta', 'Strix', 'goose', 'Qwen Code', 'Gemini CLI', 'OpenCode', 'Zed', 'ZCode', 'Proto', 'CodeGPT', 'Freebuff', 'HackerAI']
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
for (const text of ['<time datetime="2026-10-05">5 October 2026</time>', 'one-session credential', 'nothing is written into the agent’s own settings', '<code>KILO_CONFIG_CONTENT</code>', '<code>kilo.json</code>', 'Kilo 7.4.17', 'href="https://agentclientprotocol.com"', 'href="https://openrouter.ai/apps"', 'read on 5 October 2026', 'largest share', 'switches accounts for Claude Code and Codex today', 'planned, not written yet']) assert.ok(agentsPage.includes(text), `fabric/agents must say: ${text}`)
assert.ok(!/\d+(?:\.\d+)?\s?%/.test(currentWords(agentsPage)), 'fabric/agents: OpenRouter shares are named as "largest", never as percentages')
assert.ok(fabric.includes('href="/fabric/agents/"'), 'the Fabric page links its supported coding agents')
console.log(`PASS: /fabric/agents/ lists ${allRows.length} agents, each at one level, as of 2026-10-05`)
