# Fabric: supported coding agents page, 2026-10-05

## Objective and scope

Operator request: a public page that answers one question, "Which coding agents does Fabric
work with, and what does 'works with' mean?", useful to a person and quotable by a machine.
Route `/fabric/agents/`, linked from the Fabric page, in the sitemap. Facts are the operator's
statement of 2026-10-05 and nothing more; the page states its as-of date. Serves SITE-012
(keep it true); no roadmap track is named in the brief.

Vision check: aligned. The page separates what the released app does (Claude Code connected)
from development (Kilo Code) and the plan (the rest), which is the brand invariant "do not
blur available beta capabilities with Fabric's development direction" (`docs/brand/voice.md`).

## What the page claims

- Three levels. **Connected**: Fabric starts the agent in a project's terminal and the agent
  gets Fabric's own tools (claims, hand-offs, memory, the board) for that session only, through
  a one-session credential; nothing is written into the agent's own settings. **Runs in
  Fabric**: started in the project folder, without Fabric's tools. **Planned**.
- Connected in the released app (Fabric 0.3): Claude Code. Connected in development, ships with
  the next release: Kilo Code; its session settings travel in `KILO_CONFIG_CONTENT`, which a
  project's own `kilo.json` cannot override (verified on Kilo 7.4.17, 2026-10-05).
- Runs in Fabric: Codex.
- Planned, in order: Cline; omp (oh-my-pi), pi, OpenClaw, OpenHands, Cursor CLI;
  then case by case Command Code, DeepSeek Harness, LangChain Deep Agents (dcode), Letta, Strix,
  goose, Qwen Code, Gemini CLI, OpenCode; through the Agent Client Protocol, whose session setup
  carries the session's MCP servers.
- Desktop apps and editors another program cannot start (Zed, ZCode, Proto, CodeGPT, Freebuff,
  HackerAI) can be clients of Fabric's local hub; each entry is planned and not documented yet.
- Why these: OpenRouter's public app ranking, read 2026-10-05; 15 of the daily top 30 are coding
  agents or agent harnesses; Hermes Agent has the largest share. No percentage is reproduced.
- Switchboard switches accounts for Claude Code and Codex today; the others are planned after
  the Fabric work.

Canonical row: `docs/brand/facts.md`, "Fabric coding agents" (review by 2026-11-05).

## Official sites, checked 2026-10-05

Every link was fetched with `curl -sL -A 'Mozilla/5.0' -w '%{http_code} %{url_effective}'` and
answered 200 at the URL on the page, and the page title was read to confirm the product:
claude.com/product/claude-code, kilo.ai, hermes-agent.nousresearch.com, cline.bot, omp.sh
(title "omp — a coding agent with the IDE wired in"; links github.com/can1357/oh-my-pi), pi.dev,
openclaw.ai, www.openhands.dev, cursor.com/cli, commandcode.ai, deepseek.com/harness/ (the
homepage of github.com/deepseek-ai/deepseek-harness), docs.langchain.com/oss/deepagents/code/overview
(the "Deep Agents Code" docs, installed as `dcode` per the deepagents README), www.letta.com,
www.strix.ai (homepage of github.com/usestrix/strix), goose-docs.ai (block.github.io/goose
redirects there), github.com/QwenLM/qwen-code, geminicli.com (linked from the gemini-cli README),
opencode.ai, zed.dev, zcode.z.ai, proto.erp.ai, www.codegpt.co, freebuff.com, hackerai.co,
agentclientprotocol.com, openrouter.ai/apps.

Codex links to github.com/openai/codex (200): `openai.com/codex/` answers 403 to scripted
requests and showed a bot challenge in headless Chrome, so it could not be verified to resolve.

OpenRouter: the fetched page's JSON-LD "Daily global app ranking" lists Hermes Agent at
position 1 (Kilo Code 2, Claude Code 3, Cline 4). That list carries 20 items, so the "15 of the
top 30" count is the operator's reading and was not recomputed here.

## Implementation

- `fabric/agents/index.html`: the head markup of the other pages (title, description,
  canonical, Open Graph, Twitter, WebPage JSON-LD with `dateModified` and a breadcrumb); the
  answer is in the first viewport as static text; one token-styled table per level.
- `fabric/index.html`: the "Before you open it" card links the page (that line is not touched
  by the concurrent Fabric 0.3.1 branch).
- Registers: `scripts/html_copy.py` PAGES, `scripts/check-site.mjs` pages and sitemap list,
  `scripts/build-site.mjs` allow-list, `sitemap.xml`, `scripts/check-browser.py` routes,
  generated `docs/brand/copy/fabric-agents-index.md`.
- `scripts/check-site.mjs`: each agent sits in exactly one level table, in order, with an
  official-site link; the date, the sources and the Kilo verification are present; no
  percentage appears; the Fabric page links the page. Planted defects watched being caught:
  Codex moved into Connected, a "largest share" sentence replaced by a percentage, a
  percentage added beside "largest share", and the Fabric link absent before it was added.
- `styles.css`: `.fabric-agent-table` and three small text rules, from existing tokens.
- Brand and UX: facts row, `strings.md` rows, SCN-013, SCR-08, FLW-03 branch, README line.

## Checks actually run

- `npm run check`: exit 0 (8 static pages; 25 agents at one level each; display copy 8 pages;
  8 projections fresh).
- `npm run build`: exit 0 (31 public entries).
- `scripts/check-browser.py --output-dir docs/evidence/2026-10-05-fabric-agents` with Python
  Playwright and the cached Chromium 1234: exit 0, 24 page/viewport checks, no overflow, no
  broken images, no console errors. [Receipt](../evidence/2026-10-05-fabric-agents/browser.json).
- `/fabric/agents/` at 1280, 390 and 320 px: no horizontal overflow, no table cell wider than
  its box; the Fabric page link opens `/fabric/agents/`. Screenshots:
  [1280](../evidence/2026-10-05-fabric-agents/agents-1280.png),
  [390](../evidence/2026-10-05-fabric-agents/agents-390.png),
  [320](../evidence/2026-10-05-fabric-agents/agents-320.png).

Not run: deployment (the operator asked for a pull request only), the live-site checks that
follow a deploy, and the super-ux brand linter.

## Found, not fixed here

- The Fabric page's closing still calls Switchboard "available in beta" although 0.6.0 is its
  first stable release; and the facts row "Fabric release" still names 0.2.0. Both belong to the
  concurrent Fabric 0.3.1 page update (branch `agent/fabric-0.3.1-20261005`), so they were left
  to it to avoid a conflicting edit.

## Next task

Review and merge the PR; deploy from `main` with `npm run deploy`. When the next Fabric
release ships Kilo Code, move it to "Released" with a new facts row and re-date the page
(SITE-012).

## Update 2026-10-05 (later the same day)

The page was rebuilt on the restructured `main` (central page list `scripts/pages.mjs`, shared header and
footer) after PR #43 fell behind, and its table class was renamed `.fabric-agent-table` because `main`
added `.agent-table` for the Switchboard agents page. Hermes Agent moved from "planned" to "connected in
development": Fabric connects it over ACP through its terminal shell and a stdio bridge, probed on Hermes
0.21.4 (Fabric ADR-0119 amendment 2; Fabric branch `agent/agent-support-20261005`, commit `489082c3`).
Checks: `npm run check` 0, `npm run build` 0, `extract-public-copy.py --check` pass; headless Chrome at
1280/390/320 px: no horizontal overflow, three connected rows, the shared footer present.
