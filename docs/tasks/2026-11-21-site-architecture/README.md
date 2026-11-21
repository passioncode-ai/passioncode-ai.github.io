# SITE-091: the site's architecture for years

Status: spec written 2026-11-21 (part 1 of the owner's order of 2026-11-21 12:53 UTC). Nothing is built and the live
site is unchanged. It deepens [SITE-079](../2026-11-21-humanless-site/README.md): that spec stays the source for the
sub-flows, the working copy and the compliance table; this file replaces its section 4 (structure of pages and URLs)
and its header, and adds the page types, the video programme, the language rules and the rules for growing the site
without rebuilding it.

Files: [catalog.json](catalog.json) (the URL catalogue, the source) · [URL-CATALOG.md](URL-CATALOG.md) (the same,
rendered) · [render-catalog.mjs](render-catalog.mjs) (renders and checks it) · the SEO brief's
[addendum](../../seo/brief-2026-11-21.md#addendum-site-091-the-architecture-for-years) · scenarios SCN-040 to SCN-044
in [scenarios](../../ux/scenarios.md) · backlog rows SITE-091 to SITE-096 in [backlog](../../backlog.md).

## 1. The order

The owner, Telegram through Personal Communicator, 2026-11-21T12:53:26Z (message
`0ea75019-6fcb-4092-825a-bb49d55ac5cd`; relayed by the Fabric CEO as board request `72d64754`, thread
`005d3e3f-602a-45cf-aff9-95a159d0a168`), verbatim:

> «Давай максимально проработаем сайт относительно уже имеющегося vision, упакованного, с понятными фичами, и видео для
> организации. Дальше нужны обзорные видео на каждый продукт и на каждую подпродуктовую фичу, которая будет раскрываться
> на отдельной странице. На главной мы рассказываем про Fabric, for you, а внизу главной рассказываем про экосистему:
> Fabric состоит из этих модулей, и каждому модулю тоже отдельная страница.
>
> Нужно продумать всё грамотно и фундаментально, чтобы не пришлось перестраивать структуру сайта и страницы десять раз.
> Мы изначально строим проект на долгую перспективу: фундаментальную, технологичную, агентскую платформу, которая будет
> как cloud player, как ядро для всех будущих и текущих Humanless бизнесов. Главный инструмент для разработчиков и для
> фаундеров, для тех, кто создает продукты независимо от их роли в команде. Это инструмент именно для них.»

Kept with the order, as input and not as the owner's words: the bot's retelling (PassionCode is a system of control
and trust in agents, not vibe coding; gates explain why agents can be trusted; Humanless as agents that keep and grow a
system, with self-learning loops; Pro and Cloud; a page spec for vision, for you and for organizations; videos per
page; a White Rabbit button at the top that leads to another site in a special mode) and the CEO's directions (extend
SITE-079 and SITE-078, the full URL catalogue, page templates by type, the sitemap, the languages and the default
language's prefix with its reason, rules for adding a module or feature, videos through Asset Foundry and Frame Agent
with no choices handed to the owner, delivery in three parts).

Provenance, said plainly: this project does not take part in thread `005d3e3f` (`com.list` and `com.submit` answer
`not_authorized`), so the order was read from the text handed to the session and could not be compared with the board.
Status goes to thread `de1297d7` (this project, the Fabric CEO, fabric-workspace) until the site is added to the first
thread.

Course check (rules §0): North Star section 9 and gap G9 (the assessment as a company's first step); plan Layer F
(entry point 1: the site, install Fabric free; entry point 5: the assessment); roadmap RM-15 (site onboarding), RM-14
(commercial intake), RM-24 (assessment), RM-32 (tiers). The owner puts this work before wave 3 of the plan
(fabric-workspace `docs/plans/2026-11-21-system-design/`); fabric-workspace was told on thread `de1297d7`.

## 2. The request as rows

| REQ | The owner's words | Carried by | Verified by |
|---|---|---|---|
| A-R1 | «проработаем сайт относительно уже имеющегося vision, упакованного, с понятными фичами» | sections 4 to 6; one page per feature in the catalogue | every catalogue row has one question and one action; `render-catalog.mjs --check` |
| A-R2 | «видео для организации» | V-06 on `/business/` (section 7) | SCN-041; the video's record under `docs/video/` |
| A-R3 | «обзорные видео на каждый продукт» | V-11 (Fabric) and V-30 to V-37 (the modules) | every `product` and `module` row names a video; the check fails otherwise at build |
| A-R4 | «и на каждую подпродуктовую фичу, которая будет раскрываться на отдельной странице» | the `feature` and `subfeature` types, 21 pages with a clip or an overview each | the same check for `feature` and `subfeature` rows |
| A-R5 | «На главной мы рассказываем про Fabric, for you» | decision A7: the home's first sections | SCN-040 steps 1 to 3 |
| A-R6 | «внизу главной рассказываем про экосистему: Fabric состоит из этих модулей» | decision A7: the ecosystem section above the foot | SCN-040 step 5 |
| A-R7 | «каждому модулю тоже отдельная страница» | eight `module` rows; rule E1 for the ninth | the catalogue |
| A-R8 | «чтобы не пришлось перестраивать структуру сайта и страницы десять раз» | decisions A1 to A4, the URL rules (section 9), the extension rules (section 9), one registry | adding a page is one catalogue row; no rule asks for a move of a live URL |
| A-R9 | «фундаментальную, технологичную, агентскую платформу ... как ядро для всех будущих и текущих Humanless бизнесов» | the positioning line (section 3), `/humanless/`, `/fabric/` as the hub | brand facts row at build (SITE-081) |
| A-R10 | «Главный инструмент для разработчиков и для фаундеров, для тех, кто создает продукты независимо от их роли» | `/for-you/` and the reserved `/for-you/<role>/` | SCN-042 |

Added because the product needs it and the owner did not say it (owner's rule of 2026-11-21): watch pages and the
video library (video search needs a page whose main content is the video), the storage of video files, captions and
transcripts in every language, aliases for the names people guess, the reserved names, the checks that keep the
catalogue true, the content clusters for guides and posts.

## 3. Positioning this structure serves

Source: the owner's words above, over the brand facts row *positioning* (2026-11-06, «the workplace for AI-native
organizations») and SITE-079's message house, which stays.

| Layer | Line | Where it lives |
|---|---|---|
| What it is | Fabric is the agent platform a Humanless business runs on | `/`, `/fabric/`, `/humanless/` |
| For whom | the main tool for developers and founders, and for everyone who builds products, whatever their role | `/for-you/` |
| The promise (kept from SITE-079) | free your time for the work you love: the routine goes to agents | `/` |
| Why trust it | control is built in: gates, approvals, limits and a record of every action | `/fabric/gates/`, `/security/` |
| How it grows | every run leaves a lesson the next one reads (Fabric principle 11) | `/fabric/self-improvement/`, `/fabric/memory/` |
| For organizations | from the first process on agents to a Humanless business; the assessment is the first step | `/business/`, `/assessment/` |
| The ecosystem | Fabric is made of modules; each works with Fabric and on its own | `/#ecosystem`, `/fabric/#ecosystem`, the module pages |

«как cloud player» is read as «a platform of a cloud provider's weight: others build and run their businesses on it».
The reading is recorded in section 13 as a question for the CEO and changes no URL.

## 4. Decisions

Each decision names what it settles, the reason and what would reopen it. SITE-079's D1 to D12 stay in force unless a
row here says it replaces one.

| ID | Decision | Reason | Reopened by |
|---|---|---|---|
| A1 | **The default language keeps no prefix.** English stays at `/…`; every other language stays at `/<code>/…`; `/en/…` answers 301 to the same path without the prefix; `x-default` stays the English URL | (1) Current URLs: 416 sitemap rows and every inbound link are on unprefixed English URLs; a move is a redirect for each and a period of lost signals, for no gain. (2) hreflang: the set is already complete and reciprocal with `x-default` on the English URL, which the specification allows. (3) SEO: search engines treat a prefixed and an unprefixed default alike; what they punish is language detection that redirects the root, which a prefixed default invites. (4) Redirects: none are needed today; the only new one is the `/en/` alias. (5) Cost of keeping: the tooling treats English as the special case, which `scripts/pages.mjs` and `scripts/locales.mjs` already do | English stops being the source or the fallback, or a second English market (for example `en-gb`) gets its own offer. Then the new English variant gets its prefix beside the root; the root still does not move |
| A1b | **One English slug per page in every language** (`/ru/fabric/memory/`, never `/ru/fabric/pamyat/`) | one registry key per page, hreflang pairs by construction, no redirect map per language, links that survive a language switch. The cost is no keyword in the URL for non-Latin languages, a weak signal next to the title and the h1 | never, short of a market where local slugs are measured to matter; then by alias, not by a move |
| A2 | **No live URL moves.** `/business/` stays the organizations' home under the label «For organizations»; `/start/` stays the page with the command | SITE-079 D4 and brief N1; `/business/` carries the form, the thanks page and inbound links. The names people guess become aliases (`/for-organizations/`, `/organizations/`) | never |
| A3 | **A URL is an identity, a type is metadata.** A page's place in the path is fixed on the day it ships. If a feature later becomes its own module, or a module is folded into Fabric, its type changes in the catalogue and its URL stays; a new alias may point at it | this is the rule that makes «not ten rebuilds» true: reorganizing the product does not reorganize the site | never |
| A4 | **Fabric is the hub of the ecosystem; there is no `/ecosystem/` page.** The modules are listed in `/fabric/#ecosystem` and in the home's ecosystem section; their breadcrumb parent is `/fabric/` while their URLs stay at the root (`/switchboard/`, `/inbox/` …) | the owner: «Fabric состоит из этих модулей». A separate hub would answer the question `/fabric/` already answers (brief N2). Root URLs for modules are live for four of them and are kept short for the rest | a module that is not part of Fabric at all (then it still gets a root URL and another parent) |
| A5 | **The public words are «the ecosystem» and «modules».** «Fabric is made of modules; each works with Fabric and on its own.» «The toolkit» stays readable in older pages and is replaced as each page is touched | the owner's words of 2026-11-21 use «экосистема» and «модули»; they are later than decision D2 of 2026-10-14, which kept «modules» internal. `docs/brand/terminology.md` takes the row at build (SITE-081) through brand-voice | the owner |
| A6 | **Four kinds of product page, by one test each.** *Module*: has its own install and its own releases (root URL). *Feature*: a surface inside Fabric or inside a module (one level under it). *Sub-feature*: one part of a feature that answers its own question (one level deeper). *Capability*: a property of the whole platform that no single module owns (`/security/`, `/cloud/`, `/open-source/`; root URL) | a new thing always has exactly one place to go; the test is about the product, not about taste | never |
| A7 | **The home, top to bottom:** (1) the hero with the promise, the film V-01 and «Try Fabric free»; (2) Fabric: what it is, the CEO agent, a scroll-led walk through the product; (3) for you: what you keep and what goes to agents, with the door to `/for-you/`; (4) why you can trust it: four cards (works with your agents, gates, cloud, free and open source), each a link to its page; (5) for your organization: one screen and the door to `/business/` and `/assessment/`; (6) proof; (7) the ecosystem: «Fabric is made of these modules», one card per module with its page; (8) FAQ; (9) the big White Rabbit. Replaces the section list of SITE-079 SF-2; its «seven sections» become nine | the owner: «На главной мы рассказываем про Fabric, for you, а внизу главной рассказываем про экосистему» | the owner |
| A8 | **`/for-you/` is a new page; `/start/` stays the setup page.** `/for-you/` answers «what does this give me»; `/start/` answers «how do I start» and keeps the command. The header's «For you» points at `/for-you/` (it pointed at `/start/` in SITE-079); the action «Try Fabric free» keeps pointing at `/start/#setup`. `/for-you/<role>/` is reserved for developers and founders first | two questions, two pages (brief N2); the owner names the audience and its roles | never |
| A9 | **Video files live in object storage, not in Git.** The Worker serves them on the site's own origin under `/media/video/<id>/` (the cut, the poster, the caption tracks); Git holds each video's record under `docs/video/<date>-<id>/` (brief, script, narration text, captions' source, the picks and their verdicts, the render's checksum). The home video's files stay in `assets/video/` until its next cut | fifty videos in two cuts and two narrations are several gigabytes; the home video alone is 15 MB in the repository. Same-origin delivery keeps the privacy page true (no third-party player, no cookie) | a player the owners choose (for example YouTube embeds), which would also change `/privacy/` |
| A10 | **Every video has a watch page: `/videos/<slug>/`,** with the video as the main content, its transcript and one link to the page it belongs to; `/videos/` is the library | search engines index a video only on a page whose main content is that video; an embedded video on a product page is not eligible. The product page keeps the embedded player and its own `VideoObject` pointing at the same files; the watch page is the one in the video sitemap | never |
| A11 | **Narration in English and Russian, captions and transcript in every site language.** Films, overviews and how-tos are narrated; another language plays the English cut with its own captions. Clips have no narration and no words burnt into the picture except the product's own interface; their meaning is in the caption track and the page | the home video's standing practice (facts row *Home video*); ten narrations per video is ten times the render and review, for one tenth of the audience each | a language whose audience is measured to need its own voice |
| A12 | **Use cases and customer stories are two types.** A use case (`/business/<case>/`) says what we do for a kind of business. A customer story (`/cases/<slug>/`) says what happened in one organization, with its baseline, its figures and the customer's written consent. SITE-077's page becomes the first story, `/cases/how-an-organization-runs/`, on a neutral example | go-to-market-strategy's rule (thread `22217832`, message `ef81ecce`): every job leaves a case with a baseline and a consent; mixing the two types puts unproven promises next to evidence | never |
| A13 | **The header:** Fabric (`/fabric/`, opening a panel with Fabric's features and the ecosystem) · For you (`/for-you/`) · For organizations (`/business/`) · Pricing (`/pricing/`) · Resources (guides, blog, cases, videos, agent templates) · Vision (`/vision/`) · the White Rabbit button (A14) · language switch · «Try Fabric free» (`/start/#setup`). Replaces the header of SITE-079 section 4. The panel is a `details` element and works without JavaScript | six items carry the two audiences, the product, the money page and the content; the rabbit is a button of its own, as ordered | never, short of a seventh top-level audience |
| A14 | **The White Rabbit button in the header leads to `/assessment/`, and `/assessment/` leads into the other site.** The button is the rabbit with the words «Assess your company»; its hop and the page change are SITE-079 SF-7. The first action on `/assessment/` opens `assessment.passioncode.ai`, the rabbit's own mode | the retelling says the button leads to another site. Keeping one indexed page in between gives the offer a URL on this domain, keeps the funnel measurable (`rabbit_jump` → `page_view` → the start) and works without JavaScript; the special mode starts one click later | the owner asks for the direct jump; then the button's `href` changes and nothing else |
| A15 | **`/pro/` is the page of the paid personal plan.** It says what the plan opens beyond the free version; `/cloud/` says what the cloud gives and how it works; `/pricing/` holds every price. The plan's recorded name is «Personal cloud» (report `fabric/2026-10-19-tiers-and-onboarding`, TD-01); the page's h1 uses the name the owners set | the retelling names «Pro»; the tiers on record are Free, Personal cloud, Organization, Enterprise. The URL is short and survives either name | the owners naming the plan (section 13) |
| A16 | **Three pages come from the retelling and stand on recorded decisions:** `/humanless/` (the term's own page: no person in the routine flow; people keep direction, control and expertise, North Star 2026-11-17 and SITE-079 D3), `/fabric/gates/` (spending, deletion and publication need a person; an agent asks for access and a person allows it) and `/fabric/self-improvement/` (principle 11: every run leaves a lesson the next one reads) | each owns one question no other page answers; `/humanless/` is also the entity home of the owner's word | the owner |
| A17 | **One registry.** At build, `catalog.json` moves to `site/catalog.json`; `scripts/pages.mjs`, the header panel, the footer, the breadcrumbs, `sitemap.xml`, `llms.txt`, the `VideoObject` data and `scripts/check-site.mjs` read it. A page that is not in the catalogue fails the check; a catalogue row without a page fails it too, unless its state is `reserved` or `external` | today the page list, the navigation and the sitemap are kept in step by hand and by separate scripts | never |

## 5. Page types

Twenty types. A type fixes the blocks and their order, the one action, the video slot, the structured data and the
languages. A new page picks a type; a new type is added only when a page has a question no type can carry, by a row
here and in `render-catalog.mjs`.

| Type | Used by | Blocks, in order | One action | Video slot | Structured data (visible facts only) |
|---|---|---|---|---|---|
| `home` | `/` | decision A7 | Try Fabric free | film, under the hero, click to play | `Organization`, `WebSite`, `VideoObject` |
| `concept` | `/vision/`, `/humanless/` | the answer in the first paragraph; the idea in three to five steps; what it is not; where it shows in the product; the next step | by page | film, after the first paragraph | `WebPage`, `BreadcrumbList`, `VideoObject` |
| `audience` | `/for-you/`, `/business/` | who this is for; the film; what changes for you; how it works (three steps); what you keep; proof; the paths (cards to features or cases); FAQ; the action | Try Fabric free, or Assess your company | film, second block | `WebPage`, `BreadcrumbList`, `VideoObject`; `/business/` keeps `Service` |
| `start` | `/start/` | the command; what it installs; what happens next; what stays free | Copy the command | how-to, beside the command | `HowTo` is not marked up (no rich result); `WebPage`, `VideoObject` |
| `product` | `/fabric/` | what it is in one sentence; the film; the surfaces as a map with a text twin; `#features` (a card per feature); `#ecosystem` (a card per module); the release line; the action | Try Fabric free | film, second block | `SoftwareApplication`, `VideoObject` |
| `module` | the eight modules | what it does in one sentence; the overview video; who needs it; what it does today (from the release); its features (cards, when it has pages for them); how it works with Fabric and alone; install; source and licence | Set up with one command, or Read the source for a module without a release | overview, second block | `SoftwareApplication`, `BreadcrumbList`, `VideoObject` |
| `feature` | `/fabric/<feature>/` | the answer in the first paragraph; the overview video; how it works (steps or a diagram with a text twin); its parts (cards to sub-features); what it gives a person and an organization; the limits, said plainly; two sibling features; the action | Try Fabric free | overview, second block | `WebPage`, `BreadcrumbList`, `VideoObject` |
| `subfeature` | `/fabric/<feature>/<sub>/`, `/<module>/<feature>/` | the answer in the first paragraph; the clip; how to use it (three steps); the limit; back to its feature and one sibling | Try Fabric free | clip, plays muted in view, stops under reduced motion | `WebPage`, `BreadcrumbList`, `VideoObject` |
| `capability` | `/security/`, `/cloud/`, `/open-source/` | the answer in the first paragraph; the overview video; the mechanism; what it covers and what it cannot prove; where it shows in each module; the action | Try Fabric free; `/cloud/`: See pricing | overview, second block | `WebPage`, `BreadcrumbList`, `VideoObject` |
| `plan` | `/pricing/`, `/pro/` | the line in one sentence; what the plan carries (a table); a price only where SITE-079 D9 allows; the licence line; FAQ | by tier | `/pro/`: overview; `/pricing/`: none | `Offer` only for a visible price |
| `usecase` | `/business/<case>/` | SITE-079 SF-8, with go-to-market-strategy's amendments (section 11) | Assess your company | overview, after the situation | `Service`, `BreadcrumbList`, `VideoObject` |
| `landing` | `/assessment/` | SITE-079 SF-7 | Start the assessment | film, beside the rabbit | `Service`, `BreadcrumbList`, `VideoObject` |
| `hub` | `/guides/`, `/blog/`, `/cases/`, `/agents/`, `/videos/` | one sentence on what the collection answers; the items by cluster; no second copy of an item's text | none of its own | none | `CollectionPage`, `BreadcrumbList` |
| `guide` | `/guides/<slug>/` | the brief of 2026-11-08: the answer first, the mechanism, one worked example with a named source, the next step | by cluster (section 10) | optional, never required | `Article` |
| `post` | `/blog/<slug>/` | dated; the claim first; sources; the next step | by post | optional | `Article` |
| `case` | `/cases/<slug>/` | who (or «a neutral example»); the baseline; what agents took; what people kept; the figures with their source and date; the consent line; the first step | Assess your company | film or overview when the customer agrees | `Article` |
| `agent` | `/agents/<slug>/` | unchanged (SITE-056) | Assess your company | none | as today |
| `watch` | `/videos/<slug>/` | the title; the player; the transcript; one paragraph on what it shows; the link to its page; three related videos | the action of the page it belongs to | the page itself | `VideoObject` with `contentUrl`, `thumbnailUrl`, `uploadDate`, `duration`, `transcript` |
| `legal` | `/privacy/`, `/terms/` | plain sections | none | none | `WebPage` |
| `utility` | 404, thanks, download redirects, `/design-system/` | as today | n/a | none | none; `noindex` where named |

Rules every type keeps: one h1 that names the question's subject; the answer in the served HTML (brief N3); breadcrumbs
below the root, following the catalogue's `parent`; one primary action with one label; every claim about a surface that
a release does not carry yet shows the label «In development» beside it and a row in the compliance table (SITE-079
section 9); the video never holds a fact the page's text lacks.

## 6. Navigation and links

- **Header:** decision A13. The Fabric panel lists the features in two groups (Run: the CEO agent, sessions, the board,
  create, mobile; Trust and grow: gates, memory, self-improvement, reports, the agents it works with) and the
  ecosystem (the eight modules), then Security, Cloud, Open source. The panel is generated from the catalogue.
- **Footer, five columns:** Fabric (the hub, its features) · The ecosystem (the modules, security, cloud, open source)
  · For you (for you, start, pricing, the paid personal plan) · For organizations (business, the cases, the
  assessment, agent templates, customer stories) · Resources (guides, blog, videos, vision, humanless, privacy).
- **Breadcrumbs:** from `parent`. A module's trail is Home › Fabric › Switchboard although its URL is `/switchboard/`.
- **Links between pages** (brief N8, kept): a feature links to Fabric and two siblings; a sub-feature to its feature
  and one sibling; a module to Fabric and to the capability pages that name it; a use case to its agents' template
  pages and to `/assessment/`; a guide to the page of its cluster (section 10); a watch page to the page it belongs to.
- **Click depth:** every page is at most three clicks from the home; every money page (`/start/`, `/assessment/`,
  `/pricing/`, `/business/`) is in the header or its action on every page.

## 7. The video programme

Fifty videos, one per page that sells or explains a product (the full list with ids is in
[URL-CATALOG.md](URL-CATALOG.md#videos)). Guides, posts, agent templates and hubs get none by default.

| Class | For | Length | Narration | Cuts |
|---|---|---|---|---|
| film (8) | the home, vision, humanless, for you, for organizations, the assessment, Fabric, the first customer story | 75 to 120 s | English and Russian | 16:9 for the page and the watch page, 9:16 for social |
| overview (25) | each module, each feature, each capability, the paid personal plan, each use case | 45 to 75 s | English and Russian | 16:9 and 9:16 |
| clip (16) | each sub-feature | 15 to 30 s, loops | none (A11) | 16:9; 1:1 when the page's layout asks |
| how-to (1) | `/start/` | 60 to 120 s | English and Russian | 16:9 |

What the owner named for the two audience films: **For you (V-04)**: the vision, then Fabric, then the system around
it. **For organizations (V-06)**: how to set up a business on agents, how a working company moves to agents, and a
Humanless business from zero. The product films follow his order: for you first, then Fabric itself (V-11), then its
parts, then each part on its own (V-30 to V-37 and the feature videos).

**One script shape for every overview:** the reader's question (5 s) → the answer in one sentence (5 s) → the product
doing it, three beats on the product's real interface with synthetic data (30 to 50 s) → what stays with you (5 s) →
the page's one action (5 s). A film adds the promise before and the proof after.

**Production route.** Every video is ordered through Asset Foundry; authored compositions are Frame Agent's
(HyperFrames) through Foundry, as the home video was. No provider is called directly. The order is «to the end,
autonomously»: no choices go to the owner. At every pick (the script's variant, the voice, the visual treatment, the
music bed, the poster frame) the ordering agent picks, a second model of another family judges the same candidates
against the brief, a disagreement goes to a third or to the stronger candidate by the brief's criteria, and the picks,
verdicts and reasons are written into the video's record. Words on screen and in narration go through the copywriting
skill and `copylot_check` in every language they ship in, with their role (title, label, caption).

**Per video, the record in Git** (`docs/video/<date>-<id>/`): the brief; the script; the narration text in English and
Russian; the caption tracks' source in ten languages; the picks with verdicts; Foundry's order id, estimate and actual
cost; the render's file names and SHA-256; the compliance notes (which claims are «In development», which platform
rule may apply to the 9:16 cut). **Outside Git** (A9): the cuts, the posters, the built caption files.

**On the page.** Click to play for films and overviews, never autoplay with sound; a poster image with the title as
text beside it; captions on by default in the page's language; the transcript under the player in a `details`
element; `VideoObject` built from the files (duration from the file, as `scripts/locales.mjs` `applyVideo` does for
the home). Clips play muted when in view and stop under `prefers-reduced-motion`, where the poster stays.

**Spending.** `foundry_estimate` before every batch, the estimate and the actual cost in the record. Asset Foundry
runs without a per-order line since 2026-11-18 (owner's rule); its emergency stop (USD 500 a day, 1,000 a month) and
the estate's monthly total still hold, so the fifty videos are ordered in batches that fit them: part 2 orders the 19
videos of its pages, part 3 the other 31. A batch whose estimate does not fit is split and the rest waits for the next
day, with the date written in the handoff.

**Order of production in part 2:** V-01 (home) and V-11 (Fabric) first, because every other video quotes their look;
then V-04 and V-06 (the two audiences); then the eight module overviews; then V-12, V-41, V-43, V-10, V-02, V-03, V-05.

## 8. Languages, hreflang and the sitemap

- **Languages:** the ten site languages for every page type; the guide-only languages (`i18n/scoped-locales.json`)
  for guides; English only for `compare`, `changelog`, `docs` and `press` when they are built. A translated page that
  has not passed its check is held (SITE-071) and stays out of hreflang and the sitemap.
- **Prefix:** decision A1. **Slugs:** decision A1b.
- **hreflang:** each published version names every other published version of the same page and `x-default` (the
  English URL), in the page and in the sitemap, as today. A page published in English first (SITE-079 D11) names only
  itself until the others pass.
- **Language switch:** to the same page in the other language, or to that language's home when the page is held.
- **No detection that redirects.** The Worker never redirects by `Accept-Language` or location; the switch is a link.
- **Sitemap:** today one `sitemap.xml` with 416 URLs. With this catalogue the site passes 1,000 URLs (about 100 pages
  in ten languages), still far under one file's limit of 50,000; it stays one file until 10,000, then becomes an
  index by type. A second file, `sitemap-video.xml`, lists the watch pages with their video entries. No `lastmod`
  (brief N11).
- **`llms.txt`:** sections follow the types: Product, The ecosystem, For you, For organizations, Guides, Videos.
- **Money and numbers:** one currency (USD) and the same offer in every language, so the versions are translations
  (brief N18).

## 9. Rules: URLs, and how the site grows

**URL rules.**

| ID | Rule |
|---|---|
| U1 | Lowercase English words joined by hyphens; a trailing slash on every page; no file extension, no query string in a canonical URL |
| U2 | At most three path segments after the language prefix |
| U3 | Nouns that name the thing (`/fabric/memory/`), never a campaign, a date, a version or a claim (`/new/`, `/2026/`, `/v2/`, `/best-agents/`) |
| U4 | A URL never moves and is never reused for another thing. A retired page answers 301 to the page that took over its question, and its catalogue row stays with the state `retired` and the date |
| U5 | The first segment is never a reserved root name (the list in the catalogue: the language codes, `api`, `assets`, `media`, `account` and the like) |
| U6 | One page per question; before a row is added, the catalogue is searched for the question, not for the slug |
| U7 | An alias is a redirect, never a second copy; every alias is a row in the catalogue with its reason |

**Extension rules.** Each says what is added and what must not be touched.

| ID | When | Do | Never |
|---|---|---|---|
| E1 | a new module (its own install and releases) | one `module` row at `/<name>/`, parent `/fabric/`; its card appears in `/fabric/#ecosystem`, the home's ecosystem section, the header panel and the footer from the catalogue; one overview video; a `release.json` when it has downloads | a change to another module's page; a new header item |
| E2 | a new surface of Fabric | one `feature` row at `/fabric/<name>/`; its card in `/fabric/#features` and the panel; one overview video; two sibling links | a root URL for something that lives inside Fabric |
| E3 | a part of a feature that answers its own question | one `subfeature` row one level under its feature; a card in the feature's «its parts» block; one clip | a fourth path segment; a sub-feature without its feature's page |
| E4 | a property of the whole platform | one `capability` row at the root | a capability that one module owns (that is a feature of the module) |
| E5 | a guide, a post or a customer story | one row under `/guides/`, `/blog/` or `/cases/`; its cluster (section 10); links to the cluster's page | a new top-level section for a topic |
| E6 | a new audience or role | `/for-you/<role>/` for a person's role; a `usecase` under `/business/` for an organization's situation | a new top-level audience without the owner's word |
| E7 | a new language | one entry in `i18n/locales.json` and its catalogs; every page follows by `npm run locales` | a language published for some pages only outside `scoped-locales.json` |
| E8 | a thing changes its nature (a feature becomes a module, a module is folded in) | change the row's `type` and `parent`; add an alias from the name people will now guess | a move of the URL (decision A3) |
| E9 | a page is no longer true | fix it; if the thing is gone, state `retired` and a 301 (U4) | a 404 or a 410 for a URL that was ever in the sitemap |

**What each addition costs, by construction:** one catalogue row, one page from its type's template, one video order
for the types that carry a video, the strings in ten languages through Copylot, the DOCMAP propagation (facts,
scenarios, events). The header, the footer, the breadcrumbs, the sitemap, `llms.txt` and the checks follow from the
row.

## 10. Content for search: guides, posts, customer stories

The brief of 2026-11-08 keeps governing `/agents/`, `/guides/` and `/blog/`; the brief of 2026-11-21 and its addendum
govern the rest. This section fixes where content goes, so it grows without a new section each time.

| Collection | Holds | Question shape | Links to | Cadence |
|---|---|---|---|---|
| `/guides/` | evergreen answers; no date in the URL; an «Updated» date only when the content changed | «why», «how do we», «where does» | the page of its cluster | by the content plan |
| `/blog/` | dated posts: opinion, the daily digest, release stories | «what happened», «what we think» | the feature or module the post is about | the digest daily; the rest as written |
| `/cases/` | customer stories (A12) | «how does a real organization» | the use case it proves and `/assessment/` | one per finished job with consent |
| `/videos/` | watch pages (A10) | «show me» | the page the video belongs to | with every video |
| `/compare/`, `/glossary/` | reserved | named alternatives; terms | n/a | not planned; built only with a checked source per claim |

Clusters: every guide belongs to one and links to its page, which links back to its three newest guides.

| Cluster | Its page | The reader | First guides |
|---|---|---|---|
| Team time and process pains | `/assessment/` | a company lead | the four pain guides of SITE-079 SF-9 |
| Running a business on agents | `/business/`, `/humanless/` | an owner, a founder | what a Humanless business is not; which process to move first |
| Starting a company with agents | `/business/founder-team/`, `/for-you/` | a founder | the first function from templates |
| The agent workplace | `/fabric/`, `/start/` | a developer | `/guides/start-agent-workplace/` (live); running several agents on one project |
| Control and safety | `/fabric/gates/`, `/security/` | a developer, a security lead | what an agent may do without asking; keys an agent never sees |
| Memory and learning | `/fabric/memory/`, `/fabric/self-improvement/` | a developer | how an agent keeps context between sessions |
| Accounts and limits | `/switchboard/` | a developer | what to do when a coding agent hits its usage limit |

Search demand is not measured for any row (the brief's rule: a blank, never a zero). Part 3 orders the keyword pass
through the search tooling before the first guide of each new cluster is written.

## 11. Amendments to SITE-079

From go-to-market-strategy's answer (thread `22217832`, message `ef81ecce`, 2026-11-21), taken into SF-8 here and
applied to the pages at build:

1. Case 1, «What people keep»: «people leave the routine; how far is your choice after the assessment». The line
   «nobody is replaced by this page's promise» is dropped: it holds for one of the three formats only. The positioning
   line becomes «people out of the routine; how far is your choice after the assessment».
2. Case 2 has two readers. The founder without a budget for a team starts with «Try Fabric free»; the founder opening
   a company with a budget sends a request for the launch offer, without an assessment. The page shows both first steps.
3. Case 2 says «the first function is built from templates». «A team on day one» is a goal until a launch is measured;
   the compliance table gains the row.
4. Case 3: no customer and no measurement exist; no valuation effect and no due-diligence time is promised; the
   compliance table says so. «The buyer gets a system, not a promise» stays as a description of the mechanism.
5. All three: the subscription after the build is described as a model (what it covers, what its size depends on),
   without a figure.
6. The limit case (an owner left with agents only) gets no page; one FAQ line on case 1.

From passioncode-platform (thread `ff00de47`, message `0f2141ae`): the chat's lead will be contract `lead/3` beside
`lead/1` and `lead/2`, with `source.channel: "assessment_chat"`; until the platform says it is live, the site sends
`lead/2`. Its question «where to answer» is settled here: e-mail or Telegram, at least one, as the form has today.
Go-to-market-strategy asks for a `case=<slug>` field so a lead names its use case; it is asked of the platform with
`lead/3`.

From company-assessment-agent (thread `c17cf2e5`, message `e657689b`): SITE-078 step 4 reads «the chat of the
product's assessment agent (G9)», never company-assessment-agent. SITE-079 D7 already says so.

Replaced by this file: SITE-079 section 4 (the URL table and the header), the section count of SF-2 (A7) and the
target of the header's «For you» (A8). Everything else in SITE-079 stands.

## 12. Design and motion (the brief for sheleg-design)

The site keeps its design system (`design-system/`, dark and gold); part 2 runs `npx sshlg-skills pack design` and the
sheleg-design route before any layout. What the structure asks of the visual layer:

- **The scroll-led walk on the home and on `/fabric/`:** the product's interface assembles as the reader scrolls (the
  CEO agent's line, then a session, then the board, then a receipt). CSS scroll-driven animations with a static
  fallback; transform and opacity only; the layout never jumps; every state is real HTML that reads in order without
  JavaScript and under `prefers-reduced-motion`, where the finished state is shown.
- **The ecosystem section:** the modules as parts of one figure with Fabric at the centre; each part is a link with
  its name and one sentence as text, never text inside an image.
- **One motion language** for the header panel, the cards, the rabbit and the clips: the same easing and durations,
  taken from the tokens.
- **The White Rabbit:** SITE-079 section 8; the header button is the same character at a small size.
- **Performance:** the budget of the existing templates (frontend-performance); a video's poster is the only media
  loaded before a click; the scroll-led walk ships no library.

## 13. Compliance metadata and open questions

Context for the publishing decision, kept beside the pages and never a reason to cut one (owner's rules of 2026-11-08
and 2026-11-19). SITE-079 section 9 stays; these rows are added.

| Claim or element | State on 2026-11-21 | Rule that may apply | A variant that passes anywhere |
|---|---|---|---|
| A video shows a surface a release does not carry yet (the CEO agent's dispatch, Memory, Reports, mobile, the cloud) | the site describes the final product; the release line on the page shows today's build | misleading-advertising rules (EU UCPD 2005/29/EC, FTC Act §5) apply to video as to text; platforms' own ad rules apply to the 9:16 cuts if they are ever run as ads | a line «In development» on screen during the beat and in the transcript; the watch page's text says which release carries what |
| An AI narrator's voice | as the home video today | disclosure of synthetic media where a platform asks for it (YouTube's altered-content label; EU AI Act Art. 50 for content that could be taken for a real person) | the record names the voice as synthetic; the label is set at upload on platforms that ask |
| Sub-feature pages name surfaces by their working names (context packs, claims, access by request, spend limits) | the names come from Fabric's working surfaces; Fabric's release facts are asked on thread `be7f6de5` | the same as the first row | each page is built only after Fabric confirms the name and the release, or it carries «In development» |
| «the main tool for developers and founders» | the owner's positioning; no ranking or survey stands behind «main» | superlative and comparative claims need substantiation in some markets (DE UWG, UK CAP Code) | «a tool built for developers and founders» wherever a market's rule asks |
| Customer stories | none with a written consent on file | consent and confidentiality | a neutral example, said to be one (A12) |
| The paid personal plan's name and price | recorded as «Personal cloud»; the price waits for both owners (SITE-079 D9) | a shown price must be the price charged | the page without a price until the account is live |

Open questions. None stops part 1 or the start of part 2; each goes to the Fabric CEO first (owner's rule of
2026-11-21) and is settled here by its default until answered.

| # | Question | Default taken |
|---|---|---|
| Q1 | Is «Pro» the public name of the paid personal plan (recorded as «Personal cloud»)? | the URL is `/pro/`; the h1 says «Personal cloud» until the owners name it |
| Q2 | Does the header's White Rabbit button jump straight to the other site? | A14: through `/assessment/` |
| Q3 | «как cloud player»: a platform others run their businesses on, or a wording for the page? | the reading in section 3; the phrase is not used as copy |
| Q4 | A PassionCode YouTube channel for the 16:9 cuts (creating it is a sign-in; each upload a publication) | not part of this order; the watch pages carry the videos on the site |

## 14. Plan

| Part | Unit | Rows | Depends on |
|---|---|---|---|
| 1 (this change) | the architecture: catalogue, types, rules, the language decision, the video programme | SITE-091 | none |
| 2 | the registry and the shell (`site/catalog.json`, header panel, footer, breadcrumbs, aliases, `/media/`) | SITE-080 | SITE-091 |
| 2 | the home (A7), `/for-you/`, `/humanless/`, `/vision/` with its film, `/start/` | SITE-081, SITE-093 | SITE-080 |
| 2 | `/fabric/` and `/fabric/ceo/` | SITE-082 | SITE-080; Fabric's facts (thread `be7f6de5`) |
| 2 | the eight module pages | SITE-083 | SITE-080 |
| 2 | `/business/`, `/assessment/` with the rabbit, `/cloud/`, `/pro/` | SITE-085, SITE-086, SITE-084, SITE-089 | SITE-080; Asset Foundry (the rabbit) |
| 2 | the 19 videos of these pages, the storage and the player | SITE-092 | Asset Foundry, Frame Agent |
| 3 | the features and sub-features with their videos | SITE-084, SITE-094 | part 2; Fabric's facts |
| 3 | the use cases, `/security/`, `/open-source/`, `/pricing/` | SITE-087, SITE-084, SITE-089 | go-to-market-strategy; the platform's account for prices |
| 3 | the guides, `/cases/`, `/videos/` and the watch pages, the video sitemap | SITE-088, SITE-095, SITE-092 | part 2 |
| 3 | `/seo-aeo-audit` on the built site as the briefs' acceptance run | SITE-096 | the deploy |

Every build unit runs through task-pipeline with: scenarios validated before layout; sheleg-design for the visual
layer; copywriting and `copylot_check` on every string in every language; the event catalogue in the same change;
`npm run check`, `npm run build`, the Worker preview, a WebKit readback; DOCMAP propagation. Each part is a commit, a
pull request and an integration into `main`. A deploy to the live site serves real visitors and is a separate step
after each part.

## 15. Checks run for this unit

| Check | Result |
|---|---|
| `node docs/tasks/2026-11-21-site-architecture/render-catalog.mjs --check` | `catalogue ok: 92 rows, 50 videos, 14 aliases` (rules U1, U2, U5; every parent and video resolves; no alias shadows a page) |
| Count of sitemap URLs behind decision A1 | `grep -c '<loc>' sitemap.xml` → 416 |
| Home video's weight behind decision A9 | `du -sh assets/video` → 15M |
| Em dash check (U+2014) on the new files and on the added lines of the changed ones | see the pull request |
| `npm run check` and `npm run build` | see the pull request |

Not checked, and why: nothing was fetched from the live site (a spec carries no findings); search demand was not
measured; no video was estimated or ordered (part 2 starts with `foundry_estimate`); the sub-features' names were not
confirmed by Fabric; the owner's words were not compared with the board (section 1).

## 16. Skills and agents used

task-pipeline (stages 0 to 4: intake, sources, design, spec, plan) · super-ux (ux-scenarios: SCN-040 to SCN-044) ·
seo-aeo-audit (brief mode: the addendum) · Fabric board and the knowledge graph (the tiers on record, the earlier
decisions) · Asset Foundry (its catalogue of operations read, nothing ordered). Not used and why: sheleg-design (no
layout in this unit; section 12 is its brief), copywriting and Copylot (this unit adds no string a visitor reads; the
working lines of SITE-079 section 7 stand), the agent architect (no agent is built or changed in this unit; SITE-090's
consult of 2026-11-21 stands).
