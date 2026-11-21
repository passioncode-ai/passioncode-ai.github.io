# SITE-079: the site after Humanless, a spec by sub-flows

Status: spec, plan and board rows written 2026-11-21; nothing is built and the live site is unchanged. Build and
deploy start by the strategic plan (fabric-workspace `docs/plans/2026-11-21-system-design/`, session `2d03ce15`,
wave 3) unless the plan or the owner puts a row earlier. Written on Claude Fable 5.2
(`claude-fable-5-2`), as the owner asked for this spec («составим спеку через Fable 5.2», Telegram 2026-11-21 03:09).

Companion files: [SEO brief](../../seo/brief-2026-11-21.md) · [commerce backlog](commerce-backlog.md) ·
scenarios SCN-030 to SCN-039 in [scenarios](../../ux/scenarios.md) · flows FLW-10 to FLW-13 in
[flows](../../ux/flows.md) · screens SCR-18 to SCR-24 in [screens](../../ux/screens.md) · backlog rows SITE-079 to
SITE-090 in [backlog](../../backlog.md).

## 1. The order

The owner, Telegram 2026-11-21 03:09 Warsaw (message `a99de7a1`, CEO board request `a72e1941`, thread `c62a3bf3`;
voice transcribed by the bot), verbatim:

> «Также давай соберём в эту коммерцию, которую мы там обсудили, весь backlog. Давай сразу обновим наш веб-сайт с
> учётом того, как у нас развернулся продукт. Покажем, что у нас теперь основана фабрика, там больше места. Это
> SEO-агент, который строит бизнес: он управляет всем рабочим местом, агентами, сессиями, терминалами. Потом всю эту
> историю про разные вещи, из которых состоит продукт. Про отдельные ценные части: каждый продукт из составной части по
> отдельной страничке. Ещё про отдельный продукт, какие фичи, отдельные страницы. Подумать качественную SEO-структуру.
>
> Vision, первая страничка, оставляем её, и она конвертит то, что мы продаём: свободу, свободу от участия. Мы теперь
> отдаём всё, типа humanless AI. В любом случае, будь ты founder, программист, инженер или маркетолог, ты освобождаешь
> время для творчества. И это система, agent-agnostic, безопасность, вот все эти штуки, которые лежат под капотом. Не
> забывай, что мы их должны описывать и продавать. Облачный рání́нг, про всё это. И что это всё бесплатно, open source,
> и мы конвертим это всё. Попробуем сразу персональную бесплатную версию, это наш главный call to action.
>
> Отдельно для организаций, и отдельно компания assessment: "Assessment your company", какая-нибудь такая, с белым
> кроликом. И, наверное, под ней переходим уже туда, на self-guiding, который с ассессментом.
>
> Дальше. На страничке формулируем и продаём эту историю: мы можем текущий бизнес сделать humanless, оставить команду
> полностью. Или ты как founder запускаешь новый бизнес, тебе нужна команда. Или подготовить бизнес к продаже. Нужно
> проработать основные кейсы, которые мы обсуждали, и сделать их позиционирование.
>
> Начать с ассессмента, то есть с pain бизнеса. Они не понимают, как работает командная эффективность, где у них боли,
> как заскейлиться. Они боятся упустить фейлы в процессе. Мы должны грамотно проработать эти pain и конвертировать их в
> лида либо сразу в ассессмент.
>
> Давайте по sub-flows грамотно составим спеку на всё это и дальше передадим на доску для обновления.»

The CEO's reading, kept with the order (brief `ceo/inbox/2026-11-21-website-humanless-seo-structure-brief.md`):
«SEO-агент» is the CEO agent of Fabric; «облачный ранинг» is cloud running; «фабрика» is Fabric. The order extends the
order of 2026-11-19 (SITE-078, board request `400b3050`) and replaces it as the source of the structure.

Course check (rules §0): North Star section 9 (the company assessment is the first step of a company's path) and gap
G9 (the product's organization assessment does not exist yet); plan Layer F "Monetization and entry points" (entry
point 1: site, install Fabric free; entry point 5: the free one-week assessment leads to Enterprise or services);
plan wave 3 names the site among its projects. Roadmap tracks: RM-15 (site onboarding), RM-14 (commercial intake),
RM-24 (assessment), RM-32 (tiers).

## 2. The request as rows (REQ)

| REQ | The owner's words | Carried by | Verified by |
|---|---|---|---|
| R1 | «Vision, первая страничка, оставляем её, и она конвертит ... свободу от участия ... humanless AI» | SF-2 | SCN-030; the home's h1 and first screen in `check-site.mjs` |
| R2 | «founder, программист, инженер или маркетолог, ты освобождаешь время для творчества» | SF-2 | SCN-030 step 1 |
| R3 | «agent-agnostic, безопасность ... под капотом ... описывать и продавать. Облачный ранинг» | SF-2, SF-5 | SCN-033; one page per feature in the brief's table |
| R4 | «бесплатно, open source ... персональную бесплатную версию, это наш главный call to action» | SF-2, SF-5, SF-10 | SCN-030 step 1, SCN-039; `cta_click` target `start` is the hero's first button |
| R5 | «у нас теперь основана фабрика ... SEO-агент ... управляет всем рабочим местом, агентами, сессиями, терминалами» | SF-3 | SCN-031 |
| R6 | «каждый продукт из составной части по отдельной страничке» | SF-4 | SCN-032; every public part in §4 has a URL |
| R7 | «какие фичи, отдельные страницы» | SF-5 | SCN-033 |
| R8 | «Подумать качественную SEO-структуру» | SF-1, the SEO brief | the first audit after launch is the brief's acceptance run |
| R9 | «Отдельно для организаций» | SF-6 | SCN-034 |
| R10 | «"Assessment your company" ... с белым кроликом ... переходим ... на self-guiding, который с ассессментом» | SF-7 | SCN-035, SCN-036 |
| R11 | Three cases: the current business humanless with the team kept; a founder's new business that needs a team; a business prepared for sale; «сделать их позиционирование» | SF-8 | SCN-037; §6 positioning |
| R12 | «Начать с ... pain бизнеса ... конвертировать их в лида либо сразу в ассессмент» | SF-9 | SCN-038; funnel «Pain to assessment» |
| R13 | «соберём в эту коммерцию ... весь backlog» | [commerce-backlog.md](commerce-backlog.md) (the site's view) and the full backlog in the private workspace (fabric-workspace `docs/plans/2026-11-21-commerce-backlog/README.md`, pull request 945) | every row names its owner and source |
| R14 | «по sub-flows ... составим спеку ... и дальше передадим на доску» | this file; backlog SITE-080 to SITE-090; Fabric tasks; board requests | §10 |

What the owner left unsaid and the product needs, added here (owner's rule of 2026-11-21): the pricing page and the
account links (SF-10), measurement and indexing (SF-11), redirects and the sitemap (SF-1), the brand pack update for
the word «humanless», translations in every site language, compliance metadata for claims the build cannot back yet.

## 3. Decisions

| ID | Decision | Reason |
|---|---|---|
| D1 | The home's first button becomes «Try Fabric free» (to `/start/`); «Assess your company» is the second button and keeps the small white rabbit. On organization pages the order is reversed: the assessment first | The owner, 2026-11-21: the free personal version «это наш главный call to action». It replaces the order of SITE-075 for the home only; organizations still start with the assessment (the same order, «Начать с ассессмента») |
| D2 | The site describes the final product: Fabric as one application with the CEO agent, Memory, sessions, Create, Reports, mobile and cloud, and the tiers of plan Layer F | Owner's rule of 2026-11-19 (a site describes the final product). What a release cannot back on the day of deploy is listed in §9 as compliance metadata, never cut from the page |
| D3 | «Humanless» is used as the owner's word, always with its meaning beside it at first use: no person in the routine flow; people keep direction, control and expertise (North Star, 2026-11-17). «Fully autonomous» stays banned | The brand pack bans promises of unchecked autonomy; the owner's later word wins and the gloss keeps it true. `docs/brand/terminology.md` and `facts.md` take the row at build (SITE-081) through brand-voice |
| D4 | No live URL changes. New pages are added beside the existing ones; `/business/` stays the organizations' home, `/start/` the personal start, `/vision/` the long vision | A stable URL plan is the migration nobody has to run (brief N1). The header label «Vision» keeps pointing at `/vision/`; the home is the vision's short, selling form |
| D5 | Pain pages are guides (`/guides/<slug>/`), built by the SITE-056 machinery; two of the four pains extend guides that are already live | One question per page; no second section answering the same questions (brief N2) |
| D6 | `/assessment/` is the page that sells and starts the assessment; `assessment.passioncode.ai` (the story landing, SITE-068) is the self-guided part it leads into; `/guides/free-assessment/` stays the explanation of the week | The owner: «под ней переходим уже туда, на self-guiding». Three questions, three pages |
| D7 | The chat on `/assessment/` is the product's assessment agent (gap G9, RM-24), built from the `assessment` etalon with the `sales-leads` template's `site-concierge` variant for the public edge. It is not company-assessment-agent, which stays closed inside one organization | company-assessment-agent's reply on thread `c17cf2e5` (message `e657689b`, its row CA-776); the architect's consult of 2026-11-21 (agents database, `audit.py consult`) |
| D8 | Until that agent exists, the page's chat slot holds the two working doors: the self-guided landing and Morpheus's bot, with the form as the third | Nothing that works today is removed; the page ships before G9 has an owner |
| D9 | Self-serve prices (Free, Personal cloud) are shown on `/pricing/` when the platform's account is live; Organization, Enterprise and services read «by offer after the assessment» until both owners set them | Plan Layer F («The price conflict resolved»), D-46, and passioncode-platform's message `ed815368` (the organization licence price is not published until the owners set it). The figures in the plan are defaults, not yet the owners' answer |
| D10 | The CEO agent is named «the CEO agent» on its own page and in Fabric's section; Fabric's line stays «the home for your projects and their agents» where it describes today's release | Operator decision D-T5 (2026-10-10) kept the word «CEO» to one place; the order of 2026-11-21 puts the CEO agent at the centre, so the rule is widened to its page and Fabric's section and recorded in terminology at build |
| D11 | New pages ship in the site's ten languages, English first; a page may go live in English with the others following in the same row before the row closes | Site rule (DOCMAP Propagation); Copylot adapts, never a calque |
| D12 | Fabric VR, PassionView, Vesta, the platform and the agents database get no page | Private or without a release; listed in the brief's «Do not build» |

## 4. SF-1: structure of pages and URLs

Legend: **live** exists today · **change** exists, content changes · **new** to build.

| URL | State | Page | Sub-flow |
|---|---|---|---|
| `/` | change | Vision home: freedom from the routine, the two doors, the big White Rabbit | SF-2 |
| `/vision/` | live | the long vision (principles, stages) | SF-2 links to it |
| `/start/` | change | the free personal version: one command, what you get, what stays free | SF-2, SF-10 |
| `/fabric/` | change | Fabric, one application for a virtual company | SF-3 |
| `/fabric/ceo/` | new | the CEO agent | SF-3 |
| `/fabric/sessions/` | new | sessions, agents and terminals on every machine | SF-5 |
| `/fabric/memory/` | new | Memory: what the workplace remembers and how agents use it | SF-5 |
| `/fabric/board/` | new | the board: tasks between projects and agents, with receipts | SF-5 |
| `/fabric/create/` | new | create an agent or a project from a template | SF-5 |
| `/fabric/reports/` | new | Reports and dashboards for people | SF-5 |
| `/fabric/mobile/` | new | Fabric on a phone | SF-5 |
| `/fabric/agents/` | change | agent-agnostic: which coding agents Fabric works with | SF-5 |
| `/switchboard/`, `/switchboard/agents/` | live | Fabric Switchboard | SF-4 |
| `/inbox/` | live | Fabric Inbox | SF-4 |
| `/dashboards/` | live | Fabric Dashboards | SF-4 |
| `/observatory/` | live | Project Observatory | SF-4 |
| `/adapter/` | new | Fabric Agent Contract and Adapter: how any agent joins | SF-4 |
| `/launcher/` | new | the launcher: one command that installs and updates the workplace | SF-4 |
| `/relay/` | new | Fabric Relay: sealed messages between your machines | SF-4 |
| `/okolos/` | new | Okolos: the browser extension that guards an agent's browsing | SF-4 |
| `/security/` | new | how the workplace is kept safe | SF-5 |
| `/cloud/` | new | cloud running: personal cloud, organization cloud, cloud instance | SF-5 |
| `/open-source/` | new | free and open source: the licence in plain words | SF-5 |
| `/pricing/` | new | what is free and what is paid | SF-10 |
| `/business/` | change | for organizations | SF-6 |
| `/business/humanless-business/` | new | case 1 | SF-8 |
| `/business/founder-team/` | new | case 2 | SF-8 |
| `/business/sale-ready/` | new | case 3 | SF-8 |
| `/assessment/` | new | Assess your company, with the White Rabbit and the chat | SF-7 |
| `assessment.passioncode.ai` | live | the self-guided assessment (story landing) | SF-7 |
| `/guides/where-team-time-goes/` | new | pain 1 | SF-9 |
| `/guides/why-tasks-stall-between-people/` | change | pain 2 (where it hurts) | SF-9 |
| `/guides/scale-without-hiring/` | new | pain 3 | SF-9 |
| `/guides/why-releases-slip/` | change | pain 4, with a new sibling `/guides/catch-process-failures/` (new) | SF-9 |
| `/agents/…`, `/guides/…`, `/blog/…`, `/privacy/`, `/design-system/` | live | unchanged | n/a |

Header (every page), in order: Product (`/fabric/`) · For you (`/start/`) · For organizations (`/business/`) ·
Assess your company (`/assessment/`, with the small rabbit) · Pricing (`/pricing/`) · Vision (`/vision/`) · language
switch · the action «Try Fabric free» (`/start/#setup`). «The tools» and «About» move to the footer. The footer gains
three columns: Product (Fabric, CEO agent, the features), The toolkit (every part of SF-4), Organizations (the three
cases, the assessment, pricing, the guides).

Mechanics: each new page is a row in `scripts/pages.mjs`; hand-written English source for `/`, `/fabric/…`,
`/assessment/`, `/pricing/`, `/security/`, `/cloud/`, `/open-source/`; the part pages, case pages and pain guides are
data in `scripts/site-content.mjs` rendered by `scripts/build-content-pages.mjs` (a new kind per group, never a change
to an existing kind); `npm run locales` writes the other languages, `sitemap.xml` and the `llms.txt` language section;
the build allow-list gains the new folders. No redirect is needed (D4).

## 5. The sub-flows

Each sub-flow names its visitor, the path, the page's one question (the SEO brief holds the full table), the one
action, the states and what it depends on. Working copy is in §7.

### SF-2: the Vision home (R1 to R4)

- **Visitor:** P-01 (a builder), P-03 (a founder or executive), and anyone who is «founder, программист, инженер или
  маркетолог».
- **Path (FLW-10):** hero → what goes to agents and what stays with you → under the hood (four cards, each a link to its
  feature page) → Fabric and the CEO agent (one screen, link to `/fabric/`) → two doors: «For you» (free, `/start/`)
  and «For your organization» (`/assessment/`) → proof (what we run on it ourselves, the pilot's figures already on the
  page) → FAQ → the big White Rabbit (SF-7).
- **One action:** «Try Fabric free». Second: «Assess your company».
- **Shorter:** the home drops to seven sections from fourteen. 02 problem, 03 shift, 05 one system and 06 agents at work
  move into `/vision/` and `/fabric/` (their text is kept there, not deleted); the tools grid moves to `/fabric/` and the
  footer; «How we got here» stays as About.
- **States:** static; the video stays click-to-play under the hero; without JavaScript every link and the whole
  argument work.
- **Depends on:** SF-5 pages existing (the four cards link to them), SF-7 (the foot).

### SF-3: Fabric and the CEO agent (R5)

- **Visitor:** P-01, P-03.
- **Path (FLW-11):** home or header «Product» → `/fabric/`: one application, the surfaces as a map (Home «Needs you»,
  the CEO, projects, sessions, Memory, machine, Create, Reports, mobile, cloud), each a link to its page → `/fabric/ceo/`
  → «Try Fabric free».
- **`/fabric/ceo/` answers:** what the CEO agent is and does. It runs the workplace: it takes what you say (text or
  voice), opens the project, picks the agent and the account, starts sessions and terminals, hands tasks out with a
  receipt for each, keeps its own board and plan per organization, and brings back only what needs you. What it never
  does: decide for you where a decision is yours, spend above a limit, or act outside the access you gave.
- **One action:** «Try Fabric free»; second on `/fabric/ceo/`: «See how a session runs» (`/fabric/sessions/`).
- **States:** the release line shows the current Fabric release from `/api/releases` as today; a surface that is not in
  that release carries the label «In development» beside it (§9).

### SF-4: a page per part of the product (R6)

- **Visitor:** P-01 choosing a tool; an engineer checking the boundary of each part.
- **Path (FLW-11):** `/fabric/` map or footer «The toolkit» → the part's page → install or source.
- **Parts and their state:** Fabric Switchboard, Fabric Inbox, Fabric Dashboards, Project Observatory (live pages, only
  the IN THE TOOLKIT line and the link back to `/fabric/` change); new pages: Agent Contract and Adapter (`/adapter/`),
  the launcher (`/launcher/`), Fabric Relay (`/relay/`), Okolos (`/okolos/`).
- **Every part page has the same six blocks:** what it does in one sentence; who needs it; what it does today (from the
  release); how it works with Fabric and alone; install (the launcher's command or the download); source and licence.
- **One action:** install (the launcher's command, copied) or «Download»; a part without a release (Okolos, Relay) has
  «Read the source» and says so.

### SF-5: a page per feature (R3, R7)

- **Visitor:** P-01, P-02, P-03 with one question about what is under the hood.
- **Features and their question:** agent-agnostic (`/fabric/agents/`); security (`/security/`); cloud running
  (`/cloud/`); free and open source (`/open-source/`); Memory (`/fabric/memory/`); sessions and terminals
  (`/fabric/sessions/`); the board (`/fabric/board/`); Create (`/fabric/create/`); Reports (`/fabric/reports/`); mobile
  (`/fabric/mobile/`).
- **Every feature page has the same five blocks:** the answer in the first paragraph; how it works (three to five steps
  or a diagram with a text twin); what it gives a person and what it gives an organization; the limits said plainly;
  the next step.
- **`/security/` covers:** work stays on your machines; keys are used by name and never shown to an agent; an agent
  asks for access and a person allows or denies it; spending, deletion and publication need a person; organizations'
  data never mixes; backup (local with a password, encrypted in the cloud); what scanning cannot prove.
- **`/cloud/` covers:** why (the work goes on when your computer sleeps; a second machine restores the whole setup);
  the three forms (personal cloud, the organization's cloud, a cloud instance with a ready team); what stays local.
- **One action:** «Try Fabric free»; on `/cloud/` the second action is «See pricing».

### SF-6: for organizations (R9)

- **Visitor:** P-02 (a company lead), P-03.
- **Path (FLW-12):** header «For organizations» → `/business/`: the promise (people leave the routine and stay in
  charge) → the three cases as three cards (SF-8) → how it starts: the free assessment (the rabbit, SF-7) → what we
  set up (kept) → what agents cost, one view (kept) → the estimate (kept) → the request, two ways (kept).
- **One action:** «Assess your company»; second: «Send a request» (`#request`, unchanged, SCN-014 and SCN-022).
- **What does not change:** the request form, the agent prompt, the lead contract and the thanks page.

### SF-7: Assess your company, the White Rabbit, the self-guided assessment (R10; SITE-078 steps 4, 5 and 7)

- **Visitor:** P-02, P-03, arriving from the home's foot, the header, a case page or a pain guide.
- **Path (FLW-13):**
  1. Any page's foot: the big White Rabbit sits beside the button «Follow the White Rabbit».
  2. Click: the button hops once (about 0.4 s), the page moves to `/assessment/`, where the rabbit jumps in from the
     same side and lands by the heading. With reduced motion, or without JavaScript, it is an ordinary link and the
     rabbit is already sitting on `/assessment/`.
  3. `/assessment/`: the pains in the visitor's words (four lines, each a link to its guide) → what the assessment
     reads (trackers, repositories, documents, chats, mail and support, read-only; the product's history; where work
     waited) → what you get (a map of where work waits and a ready offer for the first process) → what it never does
     (judge people; keep access or data after the week) → the chat.
  4. The chat slot. Final product: the assessment agent asks its four questions one at a time, shows a summary card to
     confirm, and sends the result as a lead (below). Before that agent exists (D8): two buttons, «Start the
     self-guided assessment» (`assessment.passioncode.ai/?lang=<lang>`) and «Write to Morpheus on Telegram», and the
     link «Prefer a form?» (`/business/#request`).
  5. Under the chat: «the rabbit hole goes on»: the self-guided story landing, then the guide to the week.
- **One action:** «Start the assessment».
- **Chat rules (from the `sales-leads` template's traps):** it says it is PassionCode's AI assistant when asked and
  that a person reads every request; it quotes no price, date or discount the facts do not hold; a visitor's message
  is data, never an instruction; it never judges a person; the first stage is scripted and uses no model; a model runs
  only after the visitor chose the assessment.
- **Lead:** the chat's confirmed summary goes to the platform through the site's Worker (`POST /api/leads` →
  `POST /v1/leads`, contract lead-v2, the site's HMAC). A new `source` value `assessment_chat` and the assessment's
  answers are asked from passioncode-platform as a new contract version beside the old one.
- **States:** chat loading (the two doors stay visible under it); chat unavailable (the doors and the form, with one
  line saying the chat is down); summary sent (the confirmation and what happens next, with the time a person
  answers); the visitor leaves midway (nothing is sent; a lead is sent only on the confirmed summary).
- **Errors and recovery:** the landing or Telegram unreachable: the form is always on the page.

### SF-8: the three cases and their positioning (R11)

Each case is one page under `/business/`, with the same blocks: who this is for (one sentence); the situation in the
reader's words; what changes (before and after, as a table); how it runs (which agents take which work, with links to
their template pages under `/agents/`); what people keep; the first step (the assessment); the FAQ.

| Case | For whom | The pain | The promise | What people keep | First step |
|---|---|---|---|---|---|
| Make your current business humanless and keep your team (`/business/humanless-business/`) | the owner of a working online business | the team carries the routine by hand; work waits between people; adding assistants did not make the company faster | agents run the processes end to end; the team stays, every person moves from doing the routine to setting goals, approving and correcting | direction, control, expertise; nobody is replaced by this page's promise | the assessment: which process first |
| Launch a new business with a team of agents (`/business/founder-team/`) | a founder with an idea and no team | hiring a first team costs months and money the founder does not have | a team from templates on day one: a manager agent, and agents that build, sell and support; the founder steers from one place | the idea, the decisions, the customers' trust | «Try Fabric free», then the cloud instance when it ships |
| Prepare your business for sale (`/business/sale-ready/`) | an owner planning an exit in one to three years | the business depends on its founder and on a few people's heads; a buyer discounts that | processes run by agents, every decision and result on record, a data room that is always current; a company that works when the founder steps away | the owner's decisions until the sale; the buyer gets a system, not a promise | the assessment: what depends on a person today |

Positioning in one line each: (1) not fewer people, people out of the routine; (2) a company of one with a full team;
(3) a business a buyer can run on the first day. Case 3 states no valuation effect: no figure exists for it (§9).

### SF-9: the pains, into a lead or straight into the assessment (R12)

| Pain (the owner's words) | The reader's question | Page | Primary action | Second action |
|---|---|---|---|---|
| «не понимают, как работает командная эффективность» | Where does my team's time go? | `/guides/where-team-time-goes/` (new) | «Assess your company» | «Send a request» |
| «где у них боли» | Where does our process hurt? | `/guides/why-tasks-stall-between-people/` (live; gains the answer-first paragraph and the two actions) | the same | the same |
| «как заскейлиться» | How do we scale without hiring for every new process? | `/guides/scale-without-hiring/` (new) | the same | the same |
| «боятся упустить фейлы в процессе» | How do we catch a failure before the customer does? | `/guides/catch-process-failures/` (new); `/guides/why-releases-slip/` (live) links to it | the same | the same |

Path (FLW-13): search, a post or the home → the guide: the answer in the first paragraph, the mechanism, one worked
example with a named source, what an assessment would show for this pain → «Assess your company» (`/assessment/` with
`?from=<guide slug>`, so the chat's first line names the pain) or «Send a request» (`/business/#request`). On
`/assessment/` the four pains are the opening lines, each a link back to its guide. On the home the pains do not get a
section of their own: the home sells freedom, the organization door carries them.

### SF-10: pricing and the account (added; R4, the commerce backlog)

- `/pricing/`: the line in one sentence (free for people, paid for organizations and the cloud); the tiers as a table
  (Free; Personal cloud; Organization; Enterprise; Cloud instance; Services) with what each carries; a price only where
  D9 allows; the licence in one line with the link to `/open-source/`; FAQ (what stays free forever, what the insights
  switch does, how to cancel).
- Buttons: Free → `/start/`; a self-serve tier → the platform's account (`/account/plan?offer=<id>`) when it is live;
  Organization and Enterprise → `/assessment/`. The header gains «Sign in» (`/account`) on the same day.
- Depends on passioncode-platform (the account's address, the offer ids), go-to-market-strategy (the offers' wording)
  and the owners' gates named in the commerce backlog (prices, payment, licence and insight terms).

### SF-11: measurement and indexing (added)

- Events (new values and new events only; nothing renamed, `docs/analytics/events.md` updated in the same change):
  `page_view` gains the page kinds `fabric-ceo`, `feature`, `part`, `case`, `assessment`, `pricing`; `cta_click` gains
  the targets `start-free`, `pricing`, `account` and the locations `foot-rabbit`, `case`, `pain`, `underhood`; new
  events `rabbit_jump` (the foot button's click, `motion`: hop, still), `assessment_chat_started`,
  `assessment_chat_summary` (`decision`: confirmed, edited, left) and `assessment_lead_sent` (`from`: the guide or case
  slug, or `direct`).
- Funnels: «Free start» (home `page_view` → `cta_click` start-free → `command_copy`); «Rabbit to assessment»
  (`rabbit_jump` → `page_view` assessment → `assessment_chat_started` → `assessment_lead_sent`); «Pain to assessment»
  (`page_view` guide → `cta_click` location pain → `assessment_lead_sent`).
- Indexing after each deploy: only URLs that answer 200 and sit in the sitemap, through SpeedyIndex (balance checked
  each run), IndexNow as the fallback; the task id goes into the row's evidence.

## 6. What the pages say, in one table (the message house for this change)

| Layer | Message | Proof the page shows |
|---|---|---|
| Promise | Freedom from the routine: the work runs, you keep the time for what you love | the vision line approved 2026-10-05 («do what you love, agents take the rest») |
| Who | a founder, a programmer, an engineer, a marketer; a person first, an organization second | the two doors |
| How | Fabric: one application, the CEO agent runs the workplace | the current release, the source |
| Under the hood | agent-agnostic; safe by design; runs in the cloud; free and open source | one page each, limits said plainly |
| For organizations | people leave the routine and stay in charge; three cases | the pilot's figures already published; the assessment |
| First step | a person: try it free; an organization: the assessment | one command; one week, read-only |

## 7. Working copy (English source)

Written with the copywriting skill from the brand pack (`docs/brand/voice.md` v3, `terminology.md`, `facts.md`),
surface `web`. Checked with `copylot_check_batch`, voice `93cd4851` v1, locale en-US, register web, 2026-11-21: every
string below passed with no blocking finding. These are the spec's working lines; the build writes each page in full,
runs `copylot_check` on every string in every language and has `copylot_prepare` adapt the translations.

Humanization: on (own pass): 3 markers at 1 density (two rule-of-three runs, one «free» without its condition), 3
addressed (the sentence rewritten; the condition line added under the button).

| Where | Role | Text | Copylot report |
|---|---|---|---|
| home | label over h1 | Humanless AI | `419e3a1b` |
| home | h1 | Free your time for the work you love | `fe738bb5` |
| home | lead | Fabric is the free, open-source workplace where a CEO agent runs your agents, their sessions and terminals. You set the direction and check the result. The routine runs without you. | `828a1b5e` (one advisory: «free» needs its condition; the caption below carries it) |
| home | audience line | Founder, programmer, engineer or marketer: the routine goes to agents, and your hours go back to creative work. | `2011ca4d` |
| home, header | first button | Try Fabric free | `4e2218f6` (same advisory) |
| home | caption under the button | Free for personal use on your own computers. Open source under AGPL-3.0. | `961ff228` |
| home, header, cases, guides | second button | Assess your company | `9643317b` |
| home | card heading | Works with the agents you already pay for | `2cdfb0b4` |
| home | card heading | Safe by design | `2fba4137` |
| home | card heading | Keeps working in the cloud when your computer sleeps | `bdf568d3` |
| home | card heading | Free for people and open source | `740bea82` |
| every page's foot | button | Follow the White Rabbit | `29a97ae8` |
| `/fabric/` | h1 | Fabric, one app to run your virtual company | `e04903dc` |
| `/fabric/`, `/fabric/ceo/` | heading | The CEO agent runs the workplace | `0547a18a` |
| `/fabric/ceo/` | lead | Tell the CEO agent what you want. It opens the project, picks the agent and the account, starts the sessions and terminals, and returns a receipt for every task it hands out. | `1b67a783` |
| `/business/` | h1 | Take people out of the routine, keep them in charge | `33deaeeb` |
| `/assessment/` | h1 | Assess your company | `2891f523` |
| `/assessment/` | lead | One week, read-only access, free. You get a map of where work waits and a ready offer for the first process to hand to agents. | `3ddaf862` |
| `/assessment/` | button | Start the assessment | `c30242ee` |
| case 1 | h1 | Make your current business humanless and keep your team | `d97d05ca` |
| case 1 | lead | Your team stops carrying the routine. Agents run the process end to end, and your people set goals, approve and correct. | `373a2584` |
| case 2 | h1 | Launch a new business with a team of agents | `35bcc2c4` |
| case 2 | lead | You have the idea and no team yet. Fabric gives you one from templates: a manager agent, the agents that build, sell and support, and one place to steer them. | `df574d6e` |
| case 3 | h1 | Prepare your business for sale | `364f10ef` |
| case 3 | lead | A buyer pays for a business that runs without its founder. Move the processes to agents, keep every decision on record, and show a company that works when you step away. | `de72a3e0` |
| pain 1 | h1 | Where does my team's time go? | `c8c2c8d2` |
| pain 2 | h1 (answer-first paragraph's question) | Where does our process hurt? | `26d5f427` |
| pain 3 | h1 | How do we scale without hiring for every new process? | `ee716a60` |
| pain 4 | h1 | How do we catch a failure before the customer does? | `59863488` |
| `/pricing/` | h1 | Free for people, paid for organizations and the cloud | `fce1f423` |
| `/pricing/`, `/business/` | button | Talk to us | `f6273ed3` |

Headline options not taken, kept for the build's judged pick: «Work that runs without you» (stronger, but reads as a
promise of unchecked autonomy next to the brand's ban); «Humanless AI: your business runs, you create» (the owner's
word in the h1, but it speaks to a business owner only, and the home's first reader is a person). The pick at build is
validated by a second model through `copylot_prepare` and recorded with the verdicts.

## 8. Design and motion

The visual layer goes through sheleg-design with the site's design system (`design-system/`, dark and gold): no new
palette, type or component family. New components: the four «under the hood» cards; the surfaces map on `/fabric/`
(a diagram with a text twin); the tier table; the case's before and after table; the chat frame; the foot rabbit.

The White Rabbit: one character everywhere (the story's rabbit; the calm asset of SITE-076 replaces the inline SVG).
The foot rabbit is large (about a third of the foot's height on a desktop, a quarter of the width on a phone), sits
still until the button is in view, and looks at the button. The click's hop and the landing on `/assessment/` use
transform and opacity only, never move the layout, never cover a click, and last under one second on each page;
`prefers-reduced-motion`, no JavaScript or no Web Animations: the rabbit sits. The animation asset comes from Asset
Foundry (or Frame Agent through it) to the brief in the row SITE-086.

## 9. Compliance metadata: what the page says against what a release backs today

Kept beside the pages on purpose (owner's rules of 2026-11-08 and 2026-11-19). It is context for the publishing
decision, never a reason to cut the page. Checked 2026-11-21 against the knowledge base's `products.md` and the plan.

| Claim on the page | State on 2026-11-21 | Rule that may apply | A variant that passes anywhere |
|---|---|---|---|
| The CEO agent runs the workplace: agents, sessions, terminals, receipts | Fabric 0.3.26 (prerelease) ships the «Ask the CEO» card; the dispatch with receipts and the launch menu are planned (plan rows SD-CEO-01 to 03) | misleading-advertising rules (EU UCPD 2005/29/EC, FTC Act §5) cover a described feature a buyer cannot get | the label «In development» beside the surface, with the release line showing what today's build does |
| Memory, Create, Reports, mobile as parts of Fabric | planned in the plan's wave 2; mobile in wave 4 | the same | the same label; mobile: «designed, not yet released» |
| Cloud running: personal cloud, organization cloud, cloud instance | not live; payment is not switched on (an owners' gate); the cloud instance is planned for wave 4 and has no price | the same; a price shown must be the price charged (EU Consumer Rights Directive, pre-contract information) | «Coming» with a waitlist link to the request form; no price before the owners set it |
| Prices on `/pricing/` | the plan holds default figures (kept in the private commerce backlog); they are not yet the owners' answer, and the platform asked that the organization licence price stays unpublished | the same | D9: only self-serve prices, only when the account is live |
| «Free» and «open source» | true: AGPL-3.0, free for a person; the plan adds anonymized technical insights on by default for free use, with a switch for people (needs both owners) | «free» with a condition must state the condition next to it (FTC «free» guides; GDPR Art. 6 and 13 for the insights notice) | the caption under the button, and the insights switch named on `/open-source/` and `/privacy/` |
| «Humanless» | the owner's word; people stay in direction, control and expertise | labour-law and works-council sensitivities in some markets (DE, FR) when a page reads as «a business without people» | the gloss at first use (D3); case 1's line «the team stays» |
| Case 3: a business prepared for sale | no measured effect on a sale price exists | unsubstantiated financial claims | no valuation figure; «a buyer discounts a business that depends on its founder» is stated as the reader's own concern, not as a number |
| The assessment chat on the site | the product's assessment agent does not exist (G9, owner not named); the self-guided landing and Morpheus's bot are live | AI-chat disclosure (EU AI Act Art. 50, in force for such systems from 2026-08) and GDPR for what a visitor types | D8 until it exists; then the chat says it is an AI assistant, and `/privacy/` names what the chat stores and for how long |
| The pilot's figures (9.8 days, 60 to 85%) | published since SITE-072 with their source line (one pilot company, not named) | none new | kept with the source line wherever they are repeated |

Open question recorded here, not held: whether the Organization tier shows a price. The plan's Layer F table names
one; its `decisions.md` puts Organization «by offer after the assessment». This spec takes the closed reading (D9).

## 10. Plan: rows, order and who does what

Order of construction, each row a unit with its own checks; rows in one wave can run in parallel.

| Wave | Row | Unit | Depends on |
|---|---|---|---|
| A (can start before the plan's wave 3: no product claim changes) | SITE-080 | SF-1: page registry, header and footer, content kinds, sitemap, `llms.txt`, allow-list; SF-11 events scaffold | none |
| A | SITE-088 | SF-9: the pain guides (two new, two extended, one sibling) | SITE-080 |
| B | SITE-081 | SF-2: the home; brand pack rows for «humanless» and the CEO agent | SITE-080; SITE-084 |
| B | SITE-082 | SF-3: `/fabric/` and `/fabric/ceo/` | SITE-080; Fabric's release facts (board request to fabric) |
| B | SITE-083 | SF-4: part pages | SITE-080; facts from each part's project |
| B | SITE-084 | SF-5: feature pages | SITE-080; facts from fabric, passioncode-platform |
| B | SITE-085 | SF-6: `/business/` | SITE-087 |
| B | SITE-087 | SF-8: the three case pages | SITE-080; go-to-market-strategy's offers |
| B | SITE-086 | SF-7: `/assessment/`, the foot rabbit and its jump, the chat slot with the two doors (D8), the lead source | SITE-080; Asset Foundry (the rabbit); passioncode-platform (lead source) |
| C | SITE-089 | SF-10: `/pricing/`, account links | passioncode-platform's account; the owners' gates |
| C | SITE-090 | SF-7's chat with the assessment agent (G9) | the agent's owner named; agents database (design through the architect) |
| each | n/a | SF-11 indexing and the funnel readout after every deploy | the deploy |

Every build row runs through task-pipeline with: super-ux scenarios validated before layout; `/seo-aeo-audit` after
the deploy as the brief's acceptance run; copywriting and `copylot_check` on every string in every language; the
event catalogue updated in the same change; `npm run check`, `npm run build`, the Worker preview, a WebKit readback
and `scripts/verify-live.py` after the deploy; DOCMAP Propagation (facts, scenarios, flows, screens, sitemap,
allow-list, handoff). A deploy to the live site serves real visitors and needs the owner's word for that deploy.

SITE-078 keeps its history; its remaining steps are carried by SITE-081 (the shorter home), SITE-086 (the assessment
page, the big rabbit, the lead) and SITE-090 (the chat), and its row says so.

## 11. Checks run for this unit

| Check | Result |
|---|---|
| `copylot_check_batch`, 32 strings, voice `93cd4851` v1, en-US, web | pass, no blocking finding; three advisories addressed (§7) |
| Em dash check (`grep` for U+2014) on the three new documents and on the added lines of the changed ones | 0 in the new documents; 1 in the added lines, inside the bot's quoted text in the SITE-078 row (a quotation, kept) |
| The repository's check workflow in CI on the pull request | see the pull request's run |
| Scenario integrity (ids sequential, index matches entries, personas and traces defined) | by hand: `docs/ux/lint.py` is not seeded in this repository (`/ux-init` is open setup) |

Not checked, and why: nothing was fetched from the live site (a brief carries no findings); search demand for the new
URLs was not measured (the brief's keyword cells stay blank, never zero); the plan's prices were not confirmed by the
owners.

## 12. Skills and agents used

task-pipeline (stages 0 to 4: intake, sources, sub-flow design, spec, plan) · super-ux (ux-scenarios, ux-flows:
SCN-030 to SCN-039, FLW-10 to FLW-13, SCR-18 to SCR-24; copywriting: §7) · seo-aeo-audit (brief mode) · Copylot
(`copylot_check_batch`) · the agent architect (`audit.py consult`: templates `sales-leads` variant `site-concierge`
and `assessment`) · Fabric board. Not used and why: sheleg-design (no layout in this unit; §8 is its brief),
Asset Foundry (the rabbit asset is ordered in SITE-086).
