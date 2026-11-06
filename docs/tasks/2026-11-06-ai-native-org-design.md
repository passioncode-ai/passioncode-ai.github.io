# Design: the home page and its video for AI-native organizations (stage 2, 2026-11-06)

Brief: [2026-11-06-ai-native-org.md](2026-11-06-ai-native-org.md). Source of every claim: fabric-workspace
`knowledge/north-star.md` at `6b7cd777` (cited «NS §n»). Today's status words stay the site's three: AVAILABLE NOW,
PREVIEW, DIRECTION.

## 1. The message house

| Part | Line (English source) | Source |
| --- | --- | --- |
| Promise | The workplace where agents run your organization's processes and people steer them. | NS «Why», §6 |
| Problem | Processes built around people keep the person as the bottleneck, however many AI assistants surround them; and every employee building agents their own way adds chaos, not speed. | NS «Why» |
| Shift | Agents do the work and hand it to each other; Fabric manages the process on its board; people set direction, approve what needs a person and bring the expertise. | NS «Why», §6 |
| How | One system: agents built one way, keys in one vault, every task and cost on the record, a dashboard for every role. | NS §4 «One system», §11 |
| Grow | Start on one machine; bring the team onto the organization's own device; clone the setup to the next team or company; PassionCode can run its administration. | NS §13, §12 |
| Proof today | Open-source tools released and versioned; Fabric's board and dispatch in preview; it runs our own work. | site facts rows; NS «Where we stand» |
| Measure | Verified work agents deliver per person, per month, at your quality bar. | NS §0 |
| Will not say | a savings or ROI figure; «fully autonomous»; that agents assess or replace people; a customer's name; that a DIRECTION item works today. | vision.md, voice.md, D6, D7 |

## 2. The home page, top to bottom

| # | Section | Job | Door / CTA |
| --- | --- | --- | --- |
| 0 | **Header (kept)**: navigation, eyebrow, H1 «The agent-agnostic operating system for AI-native teams» | unchanged (D2); the subline under it becomes the promise | «For your organization ↗» first, «For you, free →» second |
| 0a | **Video** (new, about 90 s) | the whole story in one minute and a half | play |
| 1 | **01 / THE PROBLEM** «Your processes were built for people. More AI assistants do not change that.» Three cards: the person stays the bottleneck; meetings reconcile what assistants produced; everyone builds agents their own way (no record, keys everywhere). One line of market evidence with sources (facts row *agent sprawl sources*). | the founder recognises the pain | none |
| 2 | **02 / THE SHIFT** «Agents run the process. People steer it.» Old process against agentic process, side by side; the three roles of people (direction, control, expertise); «from zero to a few people run the system». | the idea in one look | none |
| 3 | **03 / FABRIC MANAGES THE PROCESS** the board as the agents' task tracker: assigns, routes, sets priorities, orders releases, one entry point for management; each duty with its status (NS §6 table). | the product at the centre, honestly labelled | «What Fabric does today» → /fabric/ |
| 4 | **04 / ONE SYSTEM** four cards: agents from templates and one contract; keys in one vault, isolation per organization and person; every task, run and cost on the record; a dashboard for every role. | why it holds together; answers «chaos» | «See the tools» → #products |
| 5 | **05 / AGENTS AT WORK** the diagram (owner and experts → Fabric's board → research, analytics, support, product, marketing and content → the data room; assessment, optimizer and security over the record) and three loops in one line each (a user's problem; market to hypothesis; content). | the «wow»: what an agentic company looks like | none |
| 6 | **06 / FROM A TEAM TO AN ORGANIZATION** four steps: one machine (free, today) → the organization's device with spaces, levels and the base agents → clone to the next team or company → scale, with PassionCode running the administration. | the path a buyer takes | «For your organization» → /business/ |
| 7 | **07 / FOUR DOORS** Founders and executives (→ /business/ request) · Investors (→ #investors, thesis and contact, no figures: facts *investors note*) · Engineers (→ /start/ and GitHub) · Solo founders (→ /start/, free). | each reader's next step | four CTAs |
| 8 | **08 / THE TOOLS** (kept, versions synced) | what you can install today | product pages |
| 9 | **09 / OPEN SOURCE** (kept) | trust | GitHub |
| 10 | **10 / QUESTIONS** kept three, plus «Does this replace my team?» (no: agents take the work, people decide; the assessment reads processes, never people) and «Where do my organization's agents and data live?» (its own device or cloud). | objections | |
| 11 | **ABOUT** (kept) | the team | |

Removed from the home: the six-step «How it works» list (its first three steps move into section 6 step 1 and /start/;
its steps 4 to 6 are covered by sections 3, 4 and 6). The «Two ways in» section is replaced by the four doors.

## 3. The video (about 90 s, narrated en and ru, captions in ten languages)

| Beat | Seconds | Picture | Narration (draft) |
| --- | --- | --- | --- |
| Old process | 0 to 14 | people as nodes passing tasks; around each, AI assistants piling output onto them; a meeting box where it all queues | Your company runs on people passing work to people. Give each of them AI assistants, and the work still waits for a person. |
| Chaos | 14 to 24 | each person builds their own agents; lines tangle, keys scatter, nothing is recorded | Everyone builds their own agents. Nothing connects, keys leak, and nobody can say what an agent did. |
| Shift | 24 to 40 | Fabric's board appears in the centre; agents take the tasks; people move to the edge as direction, control and expertise | In an AI-native organization, agents run the process. Fabric keeps the board: it assigns the work, sets priorities and orders the releases. People steer. |
| At work | 40 to 60 | support, analytics, product, marketing and content agents passing work through the board into the data room; a support question becomes a fix and a release | A user's question becomes a signal, a fix and a release, without a meeting. Every task, every cost, every result is on the record. |
| One system | 60 to 70 | one vault, one contract, a dashboard per role | Agents are built one way, keys live in one vault, and every role sees its own dashboard. |
| Grow | 70 to 84 | one machine → the organization's device with spaces → cloned to a second and third team → a grid | Start on one machine. Move the team onto your organization's own device. Clone it to the next team, and the next company. |
| Close | 84 to 92 | the mark and two doors | PassionCode.ai: the workplace for AI-native organizations. Start free, or bring your organization. |

Made as the v3 video was made: narration through Asset Foundry (the same voice), the composition as code
(`docs/video/2026-10-12-home-v2/harness` pattern, or Frame Agent through Foundry for an authored HyperFrames cut),
cues measured from a transcript, captions from one source file. The old video stays live until the new one passes
the browser check.

## 4. Funnels and analytics

| Funnel | Steps |
| --- | --- |
| Organization | home view → video play (25 / 50 / 100 %) → «For your organization» click → /business/ view → request started → request sent |
| Personal | home view → «For you, free» click → /start/ view → setup command copied → (launcher `command_run setup`, its own app) |
| Investor | home view → #investors door → commercial mail link clicked |
| Engineer | home view → engineers' door → GitHub or /start/ |

Events (all new, nothing to keep): `page_view {page, lang}`, `cta_click {location, target}`, `video_progress
{percent: 0|25|50|100}`, `command_copy {page}`, `lead_started`, `lead_sent {path: agent|form}`, `lang_switch {to}`.
Cookieless, no personal data, an `iid` per page load as growth already counts for a website; sent through the site's
Worker so no third-party script loads; the plan is posted to the analytics agent (capability `analytics.guidance`)
before it ships; the catalogue lives in `docs/analytics/events.md` with `file:line`.

## 5. Other pages

- **/vision/**: the North Star in public words: the measure, the problem, people's three roles, Fabric's board, the
  principles that are public (the organization owns its agents, keys and data; levels, not questions; isolation;
  analytics about work and agents, never about people).
- **/business/**: leads with the shift and Fabric; the three levels of access; standing up on the organization's own
  device; Enterprise with personal onboarding and PassionCode running the administration; the request (unchanged
  form and Worker contract).
- **/start/**: the engineers' and solo founders' door: unchanged steps, a first line that says where this leads.

## 6. Decided here

- Prices stay off the pages (voice: «no promised price»; facts *investors note*: no figures); the tiers are named
  without amounts on /business/. Revisit only on the operator's word.
- The pilot organization is not mentioned at all on public pages (D7); «It runs our own work» stays the proof.
- The brand voice gets a v3: the same rules, a register for executives and investors (plain, concrete, no sales
  ceremony), saved through Copylot as a new voice and recorded in `docs/brand/voice.md`.

## 7. Analytics, as agreed on the board (thread `90a63b21`, 2026-11-06)

- Reviewed by sshlg-analytics-agent against its `docs/guidance/events.md` (record `78973b8`): `cta_click` carries
  `page` as well as `location`; `video_progress.percent` is a string (`"0"`, `"25"`, `"50"`, `"100"`); `platform: web`
  on every event.
- **`iid` is a daily visitor, not an installation.** The Worker computes it as an HMAC of a daily salt, the IP and the
  User-Agent; the salt changes every UTC day and the old one is not kept; nothing is written on the device; IP and
  User-Agent never leave the Worker. Funnels across pages hold within a day; there is no link across days. Reason: a
  per-page `iid` makes every cross-page funnel read zero at its second step (growth links steps by one id), and a
  stored visit id would need consent.
- sshlg-growth created the Aptabase app «PassionCode Site» on the organization's `analytics.passioncode.ai` and the
  growth app `passioncode-site`; the App Key is in the vault as
  `passioncode-platform/prod/APTABASE_APP_KEY_PASSIONCODE_SITE` (never printed). Growth reads it once the platform's
  PR #134 is deployed; events are kept in Aptabase meanwhile.
- **Second round (2026-11-06 19:00, `a0e2e873`, `34afe50d`), taken:** `iid` is formatted as a UUIDv8 (RFC 9562) from the
  first 16 bytes of the HMAC (version nibble 8, variant bits 10, lower case), because growth counts only UUID ids
  (`src/analytics/query.ts:106`). The catalogue states, next to the definition: an `iid` is a visitor-day, never a
  person (growth's `uniqueInstalls` over several days counts visitor-days; read `dailyVisitors` and never add days);
  people behind one NAT with one User-Agent merge, a phone changing network splits, midnight UTC cuts a path; growth's
  own A/B assignment does not fit the site (a new id every day): a test on the site assigns its arm itself
  (`assignment: external`, `experiment_exposure`) and measures within one visit. Events are batched per page in one
  Aptabase request (the organization's intake limits requests per IP, and every visitor reaches it from Cloudflare).
- **Legal basis (decided by the coordinator, the operator may reverse it before the deploy he approves):** legitimate
  interest in measuring the site, disclosed on /privacy/; nothing is read from or written to the visitor's device
  beyond the page request itself; the daily salt is discarded, so a hash cannot be linked across days or reversed to an
  IP. This is the model of the cookieless analytics in common use; an EU authority may still treat it as needing
  consent, and if the operator prefers that reading the fallback is counters only (`dailyVisitors` and step counts,
  no conversion), decided before the first event so no series breaks.
