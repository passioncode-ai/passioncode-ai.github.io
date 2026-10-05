// Renders switchboard/agents/index.html from switchboard/agents.json — a copy of
// passioncode-ai/fabric-switchboard catalog/agents.json (the one source for the app, the CLI and
// docs/AGENT-SUPPORT.md). Head, header and footer come from switchboard/index.html.
//   node scripts/build-switchboard-agents.mjs [--check]
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const catalog = JSON.parse(readFileSync(resolve(root, 'switchboard/agents.json'), 'utf8'))
const product = readFileSync(resolve(root, 'switchboard/index.html'), 'utf8')
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const level = { launch: 'Launch from Switchboard', proxy: 'Through Switchboard', mcp: 'Tools only' }
const title = 'Switchboard agents | Hermes, Kilo Code, Cline, Goose and more | PassionCode.ai'
const description = 'Which coding agents work with Switchboard: tools for every one of the 30 popular agents, account switching through Switchboard for those that accept an endpoint, launch from Switchboard for some.'

// Every anchor must exist: a missing one makes slice() swallow the whole product page.
const at = (marker) => { const i = product.indexOf(marker); if (i < 0) throw new Error(`switchboard/index.html: anchor not found: ${marker}`); return i }
let head = product.slice(0, at('<script type="application/ld+json"')) + '</head>\n'
head = head.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(description)}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(title)}`)
  .replace(/https:\/\/passioncode\.ai\/switchboard\/"/g, 'https://passioncode.ai/switchboard/agents/"')
const header = product.slice(at('<body'), at('<main id="main">'))
const footer = product.slice(at('</main>'))

const rows = catalog.agents.map((a, i) => {
  const an = a.anthropic || {}; const oa = a.openai || {}
  const endpoint = a.proxy_ok === false ? 'Its own service' : a.proxy_ok !== true ? 'Unverified with a local endpoint' : [an.supported ? 'Anthropic' : '', oa.responses ? 'OpenAI Responses' : '', oa.chat_completions ? 'Chat Completions' : ''].filter(Boolean).join(', ') || '—'
  const rank = a.openrouter_rank ? ` <span class="agent-rank">#${a.openrouter_rank}</span>` : ''
  return `  <tr><td>${i + 1}</td><td><a href="${esc(a.url)}">${esc(a.name)}</a>${rank}</td><td>${level[a.level]}</td><td>${a.mcp.supported ? 'Yes' : 'No'}</td><td>${esc(endpoint)}</td></tr>`
}).join('\n')

const main = `<main id="main">
<section class="hero" aria-labelledby="hero-title">
 <div class="hero-copy"><p class="eyebrow"><span></span> FABRIC SWITCHBOARD · AGENTS</p><h1 id="hero-title">Works with<br><em>your agents</em></h1><p class="hero-body">Switchboard works with Claude Code, Codex and the other popular coding agents: Hermes, Kilo Code, Cline, Goose, OpenCode and more</p><div class="hero-actions"><a class="button button-primary" href="/switchboard/#download">Download Switchboard <span aria-hidden="true">↓</span></a><a class="text-link" href="https://github.com/passioncode-ai/fabric-switchboard/blob/main/docs/AGENT-SUPPORT.md">Setup for each agent <span aria-hidden="true">↗</span></a></div></div>
</section>
<section class="section" aria-labelledby="levels-title"><div class="section-heading"><p class="section-number">THREE WAYS IN</p><h2 id="levels-title">How each agent connects</h2><p>Every agent below can use Switchboard's tools: it sees which account handles its requests and how much quota is left, and it can switch accounts. Agents that accept a custom endpoint can also send their requests through Switchboard, which switches accounts for them. Some can be launched from Switchboard directly.</p></div>
 <ul class="requirements"><li><strong>Tools only.</strong> The agent connects to Switchboard's tools; its requests go to its own service.</li><li><strong>Through Switchboard.</strong> Set up once in the agent; Switchboard prints the exact lines.</li><li><strong>Launch from Switchboard.</strong> Switchboard starts the agent in a project folder, on that folder's accounts.</li></ul>
 <p class="section-note">Subscription sign-ins stay with Claude Code and Codex, as Anthropic and OpenAI require. Other agents use API-key accounts. A project's accounts serve only that project's folders.</p>
</section>
<section class="section" aria-labelledby="agents-title"><div class="section-heading"><p class="section-number">${catalog.agents.length} AGENTS</p><h2 id="agents-title">The list</h2><p>The first thirteen follow OpenRouter's app ranking. Every entry links to the agent, and the setup page cites its sources.</p></div>
<div class="agent-table-wrap"><table class="agent-table"><thead><tr><th>#</th><th>Agent</th><th>With Switchboard</th><th>Tools</th><th>Endpoint</th></tr></thead><tbody>
${rows}
</tbody></table></div>
<p class="section-note">From the command line: <code>switchboard agents list</code>, <code>switchboard agents connect hermes</code>, <code>switchboard agents launch goose --dir ~/project</code>.</p>
</section>
`
const html = head + header + main + footer
const out = resolve(root, 'switchboard/agents/index.html')
if (process.argv.includes('--check')) {
  if (!existsSync(out) || readFileSync(out, 'utf8') !== html) { console.error('switchboard/agents/index.html is stale; run node scripts/build-switchboard-agents.mjs'); process.exit(1) }
  console.log('PASS: switchboard/agents/index.html is current')
} else { writeFileSync(out, html); console.log(`wrote switchboard/agents/index.html (${catalog.agents.length} agents)`) }
