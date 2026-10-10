Contract: brand-contract v1
# Narrative: the message house for passioncode.ai

Status: **approved by the operator on 2026-10-10**, with the six terms decided as recorded in §6 (D-T1…D-T6)
(plan [W1](../tasks/2026-10-10-narrative-l10n-video.md#3-workstreams), backlog SITE-028). W6 (structure) and W7 (en
and ru copy) apply it; W8 and W9 carry it into the other languages through the saved Tone of Voice (§8).

This file says *what* the site says and in which order. [voice.md](voice.md) says *how* it sounds,
[terminology.md](terminology.md) holds the words once decided, and [facts.md](facts.md) holds every number and
release. A claim below that has no proof beside it is not published.

Measured on `main` at `6e62d8f` (2026-10-10). Releases checked with `gh release list` the same day: Fabric
`v0.3.3` (pre-release, 2026-10-09), Switchboard `v0.6.15`, Fabric Dashboards `v0.6.7`, Project Observatory
`v0.21.0`, Fabric Inbox `v0.13.0`, launcher `v0.1.31` (npm `latest` 0.1.31), Fabric Agent Adapter npm `latest` 0.8.1.

## 1. Promise

The home hero, **verbatim** (operator rule, 2026-10-09 and 2026-10-10; plan decision D1). It is not rewritten here.

| | English (`index.html:65-66`) | Russian (`i18n/ru/home.json`) |
|---|---|---|
| Headline | The agent-agnostic operating system for AI-native teams | Операционная система для любых агентов в AI-native командах |
| Line under it | Build a workplace where agents do the work, and you see all of it | Соберите рабочее место, где работу делают агенты, а вы видите всё |

Three promises compete on the site today (plan finding N1). They stop competing when they are given one rank each:

1. **The promise** is the hero above. Every page title, meta description and intro line up under it.
2. **"Build your own workplace for AI agents"** (home `<title>` and meta) becomes a description of what the
   hero means, never a second headline. W7 aligns the home `<title>` and meta with the hero's words.
3. **"Do what you love — agents take the rest"** (fabric-workspace `knowledge/vision.md`, operator 2026-10-05) is
   the *reason* behind the product. It belongs in the founder note and the /vision/ closing, as direction, never
   in a hero.

## 2. Problem, in the reader's words

The reader is a builder who already runs one or two agents in Claude Code or Codex. The problem is what they
have already lived through, not our model of it.

> You set up an agent and it works for a week. Then it falls apart: it runs on the wrong account or hits a
> limit, it forgets what it learned yesterday, nobody can say what it changed, and the next agent you build
> starts from zero.

> Вы настроили агента, и неделю он работает. Потом всё расползается: он сидит не на том аккаунте или упирается
> в лимит, забывает то, что узнал вчера, никто не может сказать, что он поменял, а следующий агент начинается
> с нуля.

Each clause maps to one tool, which is how the journey below answers it: accounts and limits → Switchboard;
forgetting → the Fabric project (board, memory, hand-offs); "what did it change" → Observatory and the board;
"starts from zero" → the Fabric Agent Adapter skills and Fabric's four actions.

What the site says today, and why it changes: "Without a harness, agents rot" (`index.html` §Why) asks the reader
to know our word first, and "rot" reads blunt in translation (plan N2, N7). The facts stay; the words become the
reader's.

## 3. The journey: six steps

How a reader gets from nothing to a working set of agents. Each step carries one label, the same set the site
already uses ([terminology.md](terminology.md), "available now / direction"): **available** (a release anyone can
download today), **preview** (released, unfinished, its limits named on the page), **direction** (being built,
no date).

| # | Step | What the reader does and sees | Label | Proof |
|---|---|---|---|---|
| 1 | **Enter** | Runs one command; the launcher installs the Fabric Agent Adapter skills, Observatory Log and the working rules into Claude Code or Codex. No account, no key. Downloads Fabric | **available** (launcher); Fabric is **preview** | launcher [v0.1.31](https://github.com/passioncode-ai/passioncode/releases/tag/v0.1.31), npm `latest` 0.1.31; `start/index.html:56`; [facts.md](facts.md) row *Launcher* (`facts.md:52`). Fabric [v0.3.3](https://github.com/passioncode-ai/fabric/releases/tag/v0.3.3) is a GitHub pre-release; `fabric/release.json` |
| 2 | **Onboard** | Fabric's first screen offers four actions in two pairs. *Agent:* create one, or adapt one built elsewhere. *Project:* open one (a folder, or a folder of them), or create one | **preview** | Fabric [ADR-0129](https://github.com/passioncode-ai/fabric/blob/main/docs/adr/0129-onboarding-is-four-actions-and-agent-work-runs-in-the-coding-agents-console.md) §Decision 1; Fabric `CHANGELOG.md` §0.3.3 "Four actions to start"; release v0.3.3 |
| 3 | **First agent** | Create a new agent, or adapt one you already have. The work happens in the coding agent's own console (Claude Code, Codex and others), with the `creating-fabric-agents` or `adapting-projects-to-fabric` skill. The agent asks its questions there, shows its plan and waits for a yes; adapting works on a new `fabric-adapter` branch. The result is a contract, a dashboard, tests and a conformance report. The same skills also work without Fabric, straight from Claude Code or Codex | **available** (skills in the coding agent); **preview** (started from Fabric) | ADR-0129 §Decision 2–4; `start/index.html:58`; [facts.md](facts.md) row *creating and converting agents today* (`facts.md:61`), row *Adapter and contract* (`facts.md:53`) |
| 4 | **Grow** | Builds the next agent the same way. Each runs on the account it should with its limits in view (Switchboard), and appears in one window with its own dashboard, spend and a console beside it (Fabric Dashboards) | **available** | Switchboard [v0.6.15](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.6.15); Fabric Dashboards [v0.6.7](https://github.com/passioncode-ai/fabric-dashboards/releases/tag/v0.6.7); `start/index.html:59`; [facts.md](facts.md) rows *Switchboard release* (`facts.md:11`), *Dashboards role and status* (`facts.md:40`) |
| 5 | **Work together and watch** | Agents connected to one Fabric project share its board, memory and hand-offs, so one picks up where the other stopped. Observatory shows what changed in every project and what needs attention, with the evidence. Inbox gives agents mail within the rules you set | **available, in part**: hand-offs through the board are **preview** (Fabric); Observatory is **available**; Inbox is **preview**; agents watching over each other and chains of agents are **direction** | `start/index.html:60`; `vision/index.html:86-88`; [facts.md](facts.md) row *Fabric coding agents* (`facts.md:10`: Claude Code, Kilo Code and Hermes Agent connect; Codex and Cline run inside); Observatory [v0.21.0](https://github.com/passioncode-ai/project-observatory-dashboard/releases/tag/v0.21.0); Inbox [v0.13.0](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.13.0) |
| 6 | **Organization** | The same thing across a team's machines: machines onboarded, agents rolled out per role, routing between machines, keys kept on the machine that holds them, analytics on agents and processes | **direction**: PassionCode for Enterprise is in development and offered on request; pilots run on the open-source tools today | `vision/index.html:89-90`; /business/; [facts.md](facts.md) row *commercial path* (`facts.md:62`) |

**Fabric's conversation does not reply yet.** Fabric 0.3.3 keeps the CEO chat; it saves messages and does not
answer ([facts.md](facts.md) row *CEO name and status*, `facts.md:7`; Fabric ADR-0123; `CHANGELOG.md` §0.3.3:
"The CEO chat itself stays in this release; it moves to a session in a later one"). No page, video or screenshot
may show Fabric answering, and step 2 is shown through the four actions, not through the chat.

**A known blocker for step 1, found while writing this (2026-10-10).** Fabric's `CHANGELOG.md` §0.3.4 says every
fresh install since 0.2.0 stopped before its first window ("identity could not be established", Fabric
ADR-0131). 0.3.4 fixes it and ships one universal DMG; on 2026-10-10 its tag exists and there is no GitHub
release yet (`gh release view v0.3.4` → not found), so the site still offers 0.3.3 (`fabric/release.json`). Until
0.3.4 is released, step 1 cannot promise that a new Mac reaches Fabric's first screen. This goes to the
operator and W4; this change does not touch the download.

Two lists of six on one site would confuse. The **journey** (this table) is how one person gets started, and it
belongs on home and /start/. The **path** on /vision/ (one agent → two agents that talk → a chain → agents that
look after each other → a team → an organization; "a family" became "agents" with D-T4) is how the work grows over months. W6 keeps the path on /vision/
only, and names each path stage's journey step where they meet (path 1 = step 3, path 2 = step 5, path 6 =
step 6).

## 4. Three proofs

Each one is something a reader can check, with the place they check it.

| # | Proof | Where it is proven |
|---|---|---|
| 1 | **It runs on your machines, as open source.** Every tool with a page is open source under the GNU AGPL-3.0; a commercial license covers what the AGPL does not | [facts.md](facts.md) rows *license* (`facts.md:18`) and *source availability* (`facts.md:30`); every repository's `LICENSE` |
| 2 | **It works with the agents and subscriptions you already have.** Claude Code, Kilo Code and Hermes Agent connect to Fabric; Codex and Cline run inside it; Switchboard manages Claude Code and Codex accounts and includes no provider subscription | [facts.md](facts.md) row *Fabric coding agents* (`facts.md:10`); `/fabric/agents/`; `switchboard/index.html` "Before you open it" |
| 3 | **What your agents did leaves a record you can open.** The project board keeps decisions, tasks and releases; Observatory lists what changed with the evidence and a next step; every download names its version and SHA-256, and the macOS builds are signed and notarized (the Windows build of Switchboard is not yet Authenticode-signed, and the page says so) | Observatory page §Findings; [facts.md](facts.md) rows *Fabric release*, *checksum algorithm*, *Windows support*, *versions on the site*. Retrospectives that turn the record into lessons are **direction** (`vision/index.html`, principle 2) |

Proof 3 says "a record you can open", not "every step leaves evidence" (plan §2): the stronger wording would
claim a coverage nobody has measured.

## 5. One question per page

Each page answers one question first. Anything that answers another question links to the page that owns it.

| Page | The one question | First answer on the page | Next door |
|---|---|---|---|
| `/` home | What is this, and is it for me? | The promise (hero), the problem in one beat, the journey in six steps, the three proofs | /start/ or /business/ |
| `/vision/` | Why do agents need this, and where is it going? | What holds an agent together over time, four principles, the path from one agent to an organization, each stage labelled | /start/ or /business/ |
| `/start/` | How do I get from nothing to my first working agent today? | Journey steps 1–5 as instructions, with the commands, downloads and their limits | the product pages, /business/ |
| `/business/` | What would it take, and cost, to run this across my organization? | What we set up, the estimate formula, the request form | the form |
| `/fabric/` | What does Fabric do today, and what is it becoming? | The four actions (preview), the project home, the board; the conversation that does not reply yet; the operating loop as direction | /fabric/agents/, /start/ |
| `/fabric/agents/` | Does my coding agent work with Fabric? | The three levels and which agent is at which | /fabric/ download |
| `/switchboard/` | How do I keep my agents' accounts and limits straight? | Accounts by provider, usage limits, the next request's account | download |
| `/dashboards/` | How do I see and control every agent I run? | One window: state, spend, each service's own dashboard, a console beside it | download |
| `/observatory/` | What changed across my projects, and what needs me? | Findings first, with their evidence and a next step | install |
| `/inbox/` | Can agents answer my mail without me losing control? | Important mail first; an agent answers only within the topics and limits you set, the rest waits as a draft | download |

## 6. Words we own, words we ban

### Words we own

One action, one name, in every language. Where the en and ru columns disagree with a page, the page changes in W7. The six terms decided on 2026-10-10 are added at the end of the table.

| English | Русский | Use for | Note |
|---|---|---|---|
| workplace for agents | рабочее место для агентов | what the reader builds | the hero's own word |
| project | проект | the axis every agent works for | |
| coding agent | агент для программирования | Claude Code, Codex and the others that build agents | |
| create an agent | создать агента | Fabric's first agent action, the `creating-fabric-agents` skill | |
| adapt an agent | адаптировать агента | Fabric's second agent action, the `adapting-projects-to-fabric` skill | "Adapt" (approved with the narrative, 2026-10-10), Fabric 0.3.3's own button ("Adapt an existing agent"), in place of "convert" on home and /start/. Russian already says «адаптировать» |
| available now / preview / direction | доступно сейчас / предварительная версия / направление | the label on every step, stage and tool | |
| open source under the GNU AGPL-3.0 | открытый код под GNU AGPL-3.0 | the license, every language | |
| on your machines | на ваших машинах | where it runs | |
| the subscription you already have | подписка, которая у вас уже есть | how agents are paid for | |
| board, hand-off | доска задач, передача работы | what agents share in a Fabric project | glossary: передача |
| account, limit | аккаунт, лимит | Switchboard | glossary: not «учётная запись» |
| estimate | оценка | the /business/ arithmetic | never "savings" |
| evidence | подтверждения | what an agent's work and a release leave behind | D-T2 |
| state | состояние | what is running, what needs you, what it costs | D-T3 |
| the tools; your agents; IN THE TOOLKIT | инструменты; ваши агенты; В НАБОРЕ | products; a person's agents; the product pages' label | D-T4 |
| Fabric, the home for your projects and their agents | Fabric — дом для ваших проектов и их агентов | Fabric, on every page but the one /fabric/ line that names the CEO direction | D-T5 |
| skills | навыки (first use «навыки (skills)») | the adapter's skills | D-T6 |

### Words we ban

| English | Русский | Why | Use instead |
|---|---|---|---|
| seamless | бесшовный | claims what nobody can show | the step that disappears |
| fully autonomous | полностью автономный | erases who decides | the scope the agent is allowed |
| guaranteed savings, ROI | гарантированная экономия | the estimate cannot keep it | an estimate the pilot measures |
| source-available | «исходники доступны» (as a license) | superseded by ADR-0092 | open source under the GNU AGPL-3.0 |
| AI transformation, digital workforce | ИИ-трансформация, цифровые сотрудники | sales ceremony | agent workplace (for companies) |
| swarm | рой агентов | hype; no product does it | your agents |
| rot (outside English idiom) | гниют | blunt in translation (plan N7) | fall apart / разваливаются, расползаются |
| revolutionary, game-changing, unlock, supercharge, leverage | революционный, раскройте потенциал, инновационный, уникальный | filler with no fact | the fact |
| Fabric coordinates your agents (as a present fact) | Fabric координирует ваших агентов | the conversation does not reply yet; coordination is direction | what Fabric keeps today: the project, the board, hand-offs |

### Decided: six terms (operator, 2026-10-10)

The operator decided all six on 2026-10-10; [terminology.md](terminology.md#decided-terms-operator-2026-10-10) holds
them as rules. Russian measured in `i18n/ru/*.json` on `6e62d8f` showed why they needed a decision: "evidence" was
rendered four ways («подтверждения», «доказательства», «следов», «основание») and "health" two ways («здоровье»,
«контроль состояния»).

| ID | Term | Decision | Against the recommendation |
|---|---|---|---|
| D-T1 | harness | Say it in the reader's words everywhere ("what keeps an agent working: its home, its accounts, its memory and a record of what it did"). "Harness" is named and defined **once, on /vision/ only**, with the labs' use linked; Russian there «обвязка (harness)» once, nowhere else | as recommended |
| D-T2 | evidence | English "evidence". Russian **«подтверждения» everywhere**: one word for an agent's record and a release's proof alike. «доказательства», «основание» and «следы работы» leave the site | the operator chose Alternative A over the recommended «следы работы» |
| D-T3 | health | English "state", Russian «состояние»: what is running, what needs you, what it costs (the word the Dashboards page already uses) | as recommended |
| D-T4 | family | Products are "the tools" («инструменты»); the product pages' "IN THE FAMILY" label becomes "IN THE TOOLKIT" («В НАБОРЕ»); a person's agents are "your agents" («ваши агенты») | as recommended |
| D-T5 | CEO AI agent | Lead with what Fabric does today: "Fabric, the home for your projects and their agents" («Fabric — дом для ваших проектов и их агентов»). "CEO" appears once, on /fabric/, as direction: "we are building it to act as the CEO of your agents". [facts.md](facts.md) row *CEO name and status* updated under lease the same day | as recommended |
| D-T6 | skills (ru) | «навыки»; the first use on a page is «навыки (skills)», because Claude Code and Codex print "skills" | as recommended |

## 7. What changes on each page (for W6 and W7)

A list of changes, not new copy. W7 writes the copy from this list.

| Page | Changes |
|---|---|
| `/` home | Hero unchanged. `<title>` and meta line up under the hero (§1). §Why: the problem in the reader's words (§2) in place of "Without a harness, agents rot". New "How it works" section: the six journey steps with one screenshot each (W5) and the label per step. The tool list maps each tool to its step. "Converts" → "adapts" (§6). The three proofs (§4) replace the three Why cards. D-T1, D-T2, D-T3, D-T5 applied |
| `/vision/` | Keeps the four parts. "Harness" named and defined once (D-T1); the four parts say "state" and "evidence" per D-T2 and D-T3. The path stays; each stage names its journey step (§3). Russian: no calques, one term per sense |
| `/start/` | The five steps follow journey steps 1–5. Step 2 shows Fabric's four actions (0.3.3) and says the agent work runs in the coding agent's console. "Convert" → "adapt". Fresh-install note until Fabric 0.3.4 is released (§3). Russian «навыки (skills)» per D-T6 |
| `/business/` | Answers one question (§5): the problem in an organization's words, then what we set up, the estimate, the form. Shorter prose before the form (plan N6). "CEO AI agent" per D-T5 |
| `/fabric/` | Leads with the four actions (preview) and the project home; screenshots of onboarding (SCR-70, -74, -75) from W5; the operating loop stays as direction; the conversation's limit stays in the hero area. D-T5 |
| `/fabric/agents/` | No change of message; "family" per D-T4 ("your agents", "the tools") |
| `/switchboard/`, `/dashboards/`, `/observatory/`, `/inbox/` | Each opens with its one question (§5) and names its journey step. "IN THE FAMILY" per D-T4. Dashboards: "health" per D-T3. Observatory: "evidence" / «подтверждения» per D-T2. 2–3 screenshots each (W6) |
| All languages | W8 and W9 translate from the approved English; the voice draft below carries the locale registers |

## 8. Tone of Voice (W2)

The PassionCode.ai Tone of Voice is **saved** (2026-10-10), after the operator approved this narrative. It lives in
our copy tool, which is internal and never named on a public page or in `llms.txt`. The receipt is in
[voice.md](voice.md#saved-tone-of-voice-2026-10-10).

| Field | Value |
|---|---|
| Saved voice | "PassionCode.ai — site voice", voiceId `c2ca25b8-aad6-4e92-9ada-b3b8a880cc7e`, version 1, content hash `29392ff21493342a027f022b41de081f5bcc1e432c5f849778412b85a1c4808d` |
| Saved from | a new draft, `bd778985-6cfe-4ea9-a99b-c6413fecec85` revision 1, re-derived from this file and [voice.md](voice.md) with the six decided terms (§6). The review draft `b4f63ab7-b080-406c-8cc8-9b20735163b0` revision 1 (operation `a832a2b5-89c4-4f84-93f1-76fccaf492ff`) predates the decisions and was not saved |
| Contents | primary locale en-US; the five axes and twelve secondary traits; 28 rules and 32 bans; 42 lexicon entries (every product name do-not-translate, the license wording required and the banned phrases forbidden, in each of the ten locales; the decided terms preferred and their rejected forms forbidden in en-US and ru-RU); overlays for ru-RU, de-DE, fr-FR, pl-PL, ko-KR, es-ES, pt-BR, ja-JP, zh-Hans-CN; channels web and ui; 4 positive examples (the hero, the problem in en and ru, Fabric today) and 4 negative (one live, three constructed) |
| Built from | [voice.md](voice.md) axes, locale registers and bans; this file's words, decided terms and proofs; `i18n/<code>/_checks.json` banned phrases and license wording |
| Used by | every W7 copy check (`voiceRef {voiceId, version: 1}`), and W8/W9 translations |

Registers measured in `i18n/<code>/*.json` on `6e62d8f` and carried into the draft's locale overlays: ru «вы»
(lowercase); de du; fr vous; pl ty (Twój, capitalised as in a letter); es tú (167 forms of tu/tus, no usted);
pt-BR você (86 occurrences); ko formal-polite -습니다 statements (214) with -세요 requests (80); ja です・ます
(453 ます); zh-Hans 你 (229, no 您). Money follows each language's `Intl` pattern ([voice.md](voice.md)).

## 9. Copy check of the current pages

The deterministic copy check (no model) of vision, start and business in English and Russian is recorded in
the plan, [§1 "Other pages"](../tasks/2026-10-10-narrative-l10n-video.md#other-pages).
