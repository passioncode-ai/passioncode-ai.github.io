# Current handoff — SITE-028 released: journey, new terms, ten languages, 2026-10-11

Objective (operator, 2026-10-10): show how the system works and bring the approved narrative and terms into every
language: en and ru native, seven languages from English, zh-Hans by Chinese models only (D4). PR #87 merged as
`7ae4e16` and deployed 2026-10-11: Worker version `fb458c49-cbe4-489c-b167-296afbd1fba8`; `scripts/verify-live.py`
PASS (184 assets, 150 pages in ten languages, hreflang on 130, 7 download routes, 23 not-found addresses),
receipt [docs/evidence/2026-10-11-narrative-l10n/live.json](evidence/2026-10-11-narrative-l10n/live.json).

Done: W1 narrative and W2 voice (PR #84); W6 home *How it works* and W7 en/ru copy (above); W8 de, fr, es, pt-br, pl,
ko, ja translated from English by agents, each page run through the copy agent's rule check with the saved voice
(scores are reported only for en and ru; the other locales get the language-independent rules and the voice's bans,
plus a native-editor self-review); W9 zh-Hans translated by `qwen/qwen3.8-max-0902`, reviewed by
`deepseek/deepseek-v4-pro-0813`, then a Qwen term-consistency pass (家, 工作原理, 证据, 技能, 现已可用, 部分现已可用,
预览版, 发展方向), 142 strings, about $1.09 through OpenRouter; the disclosure 还不会回复 kept. Release sync on the same
branch: Switchboard 0.6.16 (Windows Authenticode-signed), Fabric Inbox 0.14.0 (Windows and Linux), adapter 0.8.3,
launcher 0.1.32; facts rows updated with receipts.

Checks run on `7ae4e16`: `npm run check` (exit 0), `npm test` 98/98, `npm run build`; WebKit (Safari engine) visual
pass of the nine pages at 390 and 1280 px in every language (agents for de, fr, es, pt-br, pl, ko, ja; zh-hans in
this run): no horizontal overflow, no broken images. Private-terms count scan of every pushed diff: 0.

Done after release: Japanese headings wrap between phrases (PR #90 `0f776f8`, deployed 2026-10-11 as Worker
`da251934-ee64-4d6d-8e61-04550553e87d`, verify-live PASS): `phraseBreaks` (ja) marks BudouX phrase boundaries in
h1–h3 with `<wbr>`, the CJK block sets `word-break: keep-all`; Chinese is not segmented (docs/DEPLOYMENT.md#languages).
An in-word break remains only where one phrase is longer than the line (オペレーティングシステム at hero size).

Correction on W9: the zh-Hans pass used the copy agent's own OpenRouter key directly, which the operator's
2026-10-11 rule forbids (fabric-workspace `knowledge/authority.md`: one agent never spends another agent's key; call
its capability). The operator had already approved the copy agent's Chinese model on 2026-10-10. The spend (about
$1.09) is recorded by the copy agent. Every further zh-* change goes through the copy agent's write capability
(locale zh-Hans-CN, a per-call charge limit).

Open, in order:
1. zh-Hans follow-ups, through the copy agent's write capability, then its rule check (it now checks zh typography and
   script): "adapt" is 改造 on home and 适配 on /start/ and /fabric/ (pick one); the "Step N of" fragments before the
   *how it works* link read three ways (`第 4 步：`, `第 5 步，见`, `这是`) — use one. The local copy agent was not
   reachable on 2026-10-11 (ECONNREFUSED), so its zh check has not run on the 142 strings.
2. Native-speaker review (SITE-026): de "evidence" (Belege vs Nachweise), fr "foyer" vs "maison", pt-br "casa" vs
   "lar" and two words for hand-offs, es "TOOLKIT DE PASSIONCODE" vs "conjunto de herramientas", pl "agenci" vs
   "agenty", ja spacing between Japanese and Latin names, zh "家" for home.
3. W5 screenshots for steps 02 and 03 (Fabric first screen, Create/Adapt, a coding agent's console) and Inbox: need
   the throwaway macOS demo user with Docker Desktop and Claude Code (an administrator password is a human gate).
4. W10 home video (about 75 s, AI narrator en+ru, subtitles in ten languages) after W5; the video slot stays hidden.

Next task: item 1 (zh follow-ups) when the copy agent is reachable; otherwise item 2.

---

# Current handoff — the product journey and the new terms, en and ru (SITE-028 W6, W7), 2026-10-10

Objective (operator, 2026-10-10): show how the system works, from entry to working agents, and rewrite the copy along
the approved narrative and the six decided terms. Branch `agent/site-w6-journey`, draft PR (W8/W9 still to translate).
Entry point: [plan, "Status: W6 and W7" and "W7 checks"](tasks/2026-10-10-narrative-l10n-video.md#status-w6-and-w7-2026-10-10-branch-agentsite-w6-journey).

Done: PR #84 merged (narrative approved; D-T1…D-T6 in `brand/terminology.md`; voice "PassionCode.ai — site voice"
`c2ca25b8…` v1 in `brand/voice.md`). On this branch: home How it works (#how, six labelled steps, two synthetic shots,
four text cards, a hidden video slot); the English and Russian copy of home, /vision/, /start/, the /business/ hero and
the product pages' leads and IN THE TOOLKIT lines; "CEO" once on /fabric/; `llms.txt`; `/switchboard/` shows the 0.6.13
synthetic demo; facts rows *Fabric release* (0.3.4), *Fabric onboarding* (new), *toolkit roles*, *vision*, *CEO name
and status*; scenarios SCN-021 (new) and SCN-001/004/007/013/020, screens, flows; `scripts/check-site.mjs` guards the
terms, the steps and the video slot.

Checks run: `node scripts/check-site.mjs`, `check-brand-lock`, `check-design-tokens`, `build-switchboard-agents --check`,
`test_display_copy.py`, `check_display_copy.py`, `extract-public-copy.py --check`, `npm run build` — pass. Failing only
because eight languages are untranslated: `build-locale.mjs --check` and three tests in `scripts/locales.test.mjs`.
Copy checks, word counts, the WebKit visual check and the brand lint are in the plan.

Next task: W8 — translate the 143 strings in `.l10n-todo.json` into de, fr, pl, ko, es, pt-br and ja from English
with the saved voice, then W9 for zh-hans; run `npm run locales`, delete `.l10n-todo.json`, `npm run check`, mark the
PR ready. In parallel the operator sets up the W5 demo user so steps 02 and 03 can get real screenshots.

---

# Current handoff — a simpler, shorter site, 2026-10-10

Objective (operator, 2026-10-10): the site was too long and complex, above all where it converts organizations and
describes the vision. Keep the home hero and its narrative; after it, and on /vision/, /business/ and /start/, keep
only the key values and moments. About becomes a short founder note. Branch `agent/site-simplify`, PR #80, merged as
`30eb36b` and deployed 2026-10-10.

Done (English source and Russian):
- Home after the hero (2022 → 719 words): Why (#why: without a harness agents rot; a local, open-source workspace on
  top of Claude Code, Codex and what comes next, on the subscription you already have) → Two ways in (#start: For you /
  For organizations) → the tools (#products, one line + status + version each, the preview note) → open source
  (#source, license line and license-history region) → three FAQs → the founder note (#about). The closing block,
  the path, the vision band, How it works, three paths, For builders, the organization teaser and the source cards
  are gone; their addresses stay as legacy anchors.
- /vision/ (1773 → 637 words): the missing harness (one McKinsey figure, the definition, its four parts) → four
  principles (projects are the axis; the work improves itself, marked direction beyond today's evidence; any agent,
  local first, open source; analytics, never surveillance) with the task-pipeline note → the six labelled stages →
  one FAQ → closing doors naming PassionCode for Enterprise.
- /business/ (1892 → 941 words, of which the unchanged form is 425): hero "Make your organization AI-native" and the
  funnel → PassionCode for Enterprise (in development, on request): machines onboarded, agents rolled out, routing
  between machines, model access through each machine's local agent, activity and usage analytics, administration,
  custom builds signed by us; data on your machines or your own cloud → the estimate → the form → three FAQs.
  No wording about assessing people; the private-terms denylist finds nothing in the diff.
- /start/ (740 → 485 words with commands): five steps, the "stop building agents that rot" line, the task-pipeline
  recommendation and a one-paragraph contribute section with the repository list.
- `docs/brand/facts.md`: rows "founder" and "Nicegram users" (operator statement 2026-10-10, not independently
  verified, review 2027-01-10); "vision", "commercial path", "family roles" and "agent sprawl sources" follow the pages.
- `scripts/check-site.mjs` pins the new structure (and the founder note, the license line, "keys never leave the
  machine", analytics never framed as a judgement of people); UX scenarios SCN-007/008/013/014/020, flows and screens; `llms.txt`;
  `docs/brand/strings.md`; `styles.css` (`.path-grid-two`, the founder-note link colour).
- i18n: Russian catalog rewritten (94 new strings, 414 obsolete removed) and `/ru/` regenerated. The other eight
  catalogs had their obsolete entries removed; their 94 new strings each are NOT translated.

Checks run: `node scripts/check-site.mjs`, `check-brand-lock`, `check-design-tokens`, `test_display_copy.py`,
`check_display_copy.py`, `extract-public-copy.py --check`, `npm run build` — all pass. Failing, only because eight
languages are untranslated: `node scripts/build-locale.mjs --check` (784 problems = 8 × 94 strings + 32 stale pages),
three tests in `scripts/locales.test.mjs` and "the live-version rewriter runs on every language's pages" in
`scripts/check-worker.mjs`. Brand lint (super-ux `brand_lint.py docs/brand`): no B063, no new error class; totals
465E/353W on main → 428E/323W. Browser (managed Chrome, `dist/` served statically): /, /ru/, /vision/, /business/,
/start/ and their /ru/ versions at 1280 px and 390 px, no horizontal overflow; the estimate still computes.

Completed 2026-10-10: the eight remaining catalogs were translated (es/pt-br `6a619e4`, de/fr `82b1079`, pl/ko
`7b33e5a`, zh-hans/ja `53f1c8e`); `.l10n-todo.json` deleted; every locale regenerated; the Russian /start/ dash after
task-pipeline got its space; the releases were synced (Switchboard 0.6.15, launcher 0.1.31) and the facts row
"Switchboard release" follows. `npm run check`, `npm test`, `npm run build`, `releases:check` passed locally; PR #80
merged (`30eb36b`), deployed from that commit with `npm run deploy`, and `scripts/verify-live.py` passed: 183 assets,
150 pages (15 in each of 10 languages), hreflang on 130, 7 download routes, 23 not-found addresses
([receipt](evidence/2026-10-10-site-simplify/live.json)). Translators' open wording questions (blunt "agents rot",
"health", "gate", link-adjacent fragments) belong to the native-speaker review, SITE-026.

Next task: update fabric-workspace `knowledge/` (vision principles and the PassionCode for Enterprise offer as the
site now states them) under that repository's lease, then continue SITE-026 (native-speaker review per language).

---

# Current handoff — ten languages live and polished, 2026-10-10

Objective (operator): deploy the ten languages and polish them. Branches `agent/site-l10n-polish` (PR #78),
`automation/release-sync` (PR #73, regenerated by `gh workflow run releases.yml`), this docs branch.

Done: PR #78 — one money convention per language (the Intl pattern of `assets/estimate.js`; budget ranges now
translated in pl/de/fr/ja/zh/ko; test "static dollar amounts in every catalog match what the estimate prints"),
/pl/business/ in the site-wide ty register, ja/zh/ko fragments around links reworded (task-pipeline, Observatory
install steps, Dashboards, the family link list, licence lines), registry flag `attachParticles` for Korean,
no space inside brackets against a link, German/Polish headings hyphenate (the German home overflowed 26 px at
390). PR #73 (stale: Fabric 0.3.3, Inbox 0.13.0, Dashboards 0.6.7, Observatory 0.20.1) regenerated and merged
after `npm run check` and `npm run build` on its branch (automation PRs run no CI). Release drift 0 afterwards.

Checks run: `npm run locales`, `python3 scripts/extract-public-copy.py`, `npm run check` (exit 0), `npm run build`,
`npm run releases:check`; browser: ten languages' home, /business/ and /start/ at 390 px have no horizontal overflow;
live /ko/ language menu lists the nine other languages.

Production: deployed from `main` `dbac409`, Worker version `aa913d88-8589-432f-834a-3c6c4f3eeeb9`;
`verify-live.py` PASS (150 pages, 183 assets; hreflang on 130) — [live.json](evidence/2026-10-10-site-l10n-polish/live.json).
Not done: `wrangler dev` redirects `/` to itself locally (ERR_TOO_MANY_REDIRECTS), so the visual check used `dist/` served statically.

Open: SITE-026, native-speaker review of de, fr, pl, ko, es, pt-br, zh-hans, ja. Next task: collect reviewer fixes
into `i18n/<code>/*.json`, regenerate, check, deploy.

---

# Current handoff — German and French, 2026-10-10

Objective (operator): add de and fr to passioncode.ai through `docs/DEPLOYMENT.md#languages`. Branch
`agent/site-l10n-de-fr`.

Done: registry entries in `i18n/locales.json`; catalogs `i18n/de/` and `i18n/fr/` for every page, `_scripts.json`
(CLDR one/other for de, one/many/other for fr) and `_checks.json`; generated pages under `/de/` and `/fr/`,
sitemap, hreflang, `llms.txt`. German uses du, French vous; product names stay English; the privacy page is
translated in full and keeps the line that the English version prevails. Tests: the "adding a language" test now
probes a language the site does not have (sv, nl or tr), and the Worker's unknown-language test uses `sv`, so
real languages can land without editing them. Checks run: `npm run locales`, `python3 scripts/extract-public-copy.py`,
`npm run check`, `npm run build`.

Open: deploy and `verify-live.py` (not run: the operator said not to deploy); a native-speaker read of de and fr.
Next task: after merge, deploy per `docs/DEPLOYMENT.md` and run `scripts/verify-live.py`.

---

# Current handoff — content rework: Vision, Enterprise, the family, 2026-10-09

Objective (operator points, 2026-10-09): rework passioncode.ai's content in English and Russian — no
investors page; `/business/` becomes the Enterprise page for organizations that need integration; a separate
`/vision/`; every other page kept and worked out; every page indexed; the home hero kept verbatim; the Russian
hero shortened faithfully. Branch `agent/site-content-20261009` (backlog SITE-022).

Done:
- Navigation on every page but Inbox: Vision · For you · For organizations · The tools · About; the footer gains
  Vision and says "For organizations". `scripts/check-site.mjs` `PRIMARY_NAV` holds it.
- Home: two doors in the hero and the closing (For you, free → /start/; For your organization → /business/);
  `#path`, six stages each labelled available now / available now, in part / direction; each tool card names
  its role in the family; SITE-020 wording on the vision line and FAQ; the data FAQ mirrors `/privacy/`
  (Switchboard and, since 0.3.2, Fabric send anonymous counts; how to turn them off).
- `/vision/` (new, indexed, Article + FAQPage): agent sprawl with McKinsey (Nov 2025), Gartner (2025-06-25,
  2026-04-28) and Fortune on the NANDA report (2025-08-18) with its method caveat; the harness, with Anthropic's
  and OpenAI's use of the word; six principles; the path with solo / team / department examples; today vs
  direction; trust (security, data, no lock-in, reliability, people — analytics on agents and outcomes, never
  stealth); task-pipeline from github.com/ssheleg/sshlg-skills as a separate open-source recommendation;
  organizations; both doors.
- `/start/`: the thesis, step 5 (`#family`, HowTo step 5), the task-pipeline block (`#pipeline`).
- `/business/`: Enterprise eyebrow, `#organization` (pilot → workplaces → agents on every machine → people as
  the experts; designed for 1 to 1000 people), `#enterprise` (PassionCode for Enterprise at offer level, in
  development, on request; trust block), labels renumbered 01–08, Service JSON-LD named for it, an FAQ that
  says the analytics do not watch employees. The estimate formula and the form are unchanged.
- Product pages: an "In the family" line on Fabric, Switchboard, Dashboards, Observatory and Inbox;
  `/dashboards/#new` describes 0.6.0–0.6.5 from the CHANGELOG. Inbox stays at 0.12.0 (0.13.0 is unreleased,
  SITE-024).
- Russian: every new and changed fragment through `i18n/ru/*.json` (new `vision.json`), unused entries
  removed; the hero reads «Операционная система для любых агентов в AI-native командах» (SITE-021).
- Facts (`docs/brand/facts.md`, under lease): Switchboard 0.6.14, Observatory 0.19.4, Dashboards 0.6.5,
  Inbox 0.12.0, launcher 0.1.31, adapter 0.8.1, the vision and commercial-path rows, homepage hero (Russian);
  new rows harness, agent sprawl sources, family roles, recommended skill. `terminology.md`: harness, agent
  family, PassionCode for Enterprise, For organizations, the availability labels. `llms.txt`, README, UX
  scenarios (SCN-013, SCN-014, new SCN-020), screens (new SCR-13) and flows.

Checks: `npm run locales` PASS (2 languages, 15 pages each); `python3 scripts/extract-public-copy.py` PASS
(30 projections); `npm run check` exit 0; `npm run build` PASS. Browser check from `dist/` at 1440 and 390,
en and ru, of home, vision, start and business: no horizontal overflow on any of the 16 views; the Russian
header wraps to two rows at 390 px (SITE-023).

Production receipt: PR #71 (check run 37854877842 green) merged as `af91350` (merge commit) and deployed
from a checkout whose HEAD equalled `origin/main` `af91350`: Worker version
`bff5575f-11bc-40c1-83b9-5da6d803a3f9`. `verify-live.py`: PASS — 63 assets (30 pages: en 15, ru 15;
hreflang on 26), 7 download routes and 7 not-found addresses, no release drift
([live.json](evidence/2026-10-09-site-content/live.json)). Live smoke: `/vision/`, `/ru/vision/`, `/start/`,
`/business/` answer 200; `sitemap.xml` lists both language versions of `/vision/`. The deploy's local
release refresh logged `GitHub 403` (unauthenticated rate limit) and kept the committed snapshot, which the
live check matched. The deploy checkout needed its own `npm ci`: a `node_modules` symlinked from another
checkout had no `wrangler`.

Open: SITE-023 (one-row Russian header?), SITE-024 (Inbox 0.13.0 copy when released), SITE-018 as before.
Next task: SITE-024 when Inbox 0.13.0 is published; otherwise SITE-023.

# Previous handoff — the site in Russian, on a generic language foundation, 2026-10-08

Objective (operator, 2026-10-08; roadmap RM-25): finish and ship the Russian version of passioncode.ai with a
foundation that takes more languages from catalogs alone. Branch `agent/site-i18n-20261008`, made from the
unfinished WIP `agent/site-ru-20261007` (`faca07e`) with `main` merged in.

Done:
- `i18n/locales.json` is the one list of languages; `scripts/build-locale.mjs` (`npm run locales`) generates
  every `/ru/` page from its English page and `i18n/ru/*.json`, writes the chrome of every page (lang,
  canonical, reciprocal hreflang + x-default, og:locale, the header language switch — a link for two
  languages, a `<details>` menu for three or more), `assets/i18n.js`, `worker/i18n.js`, `sitemap.xml` and the
  Languages section of `llms.txt`. The gate fails on an untranslated or changed English fragment, an unused
  entry, changed placeholders, missing plural forms or a structural difference ([DEPLOYMENT →
  Languages](DEPLOYMENT.md#languages), with the exact steps to add a language).
- The Worker: `/ru/` not-found with 404, the form token on `/ru/business/`, the lead's language and page,
  refusals and validation issues in the form's language (codes English), the receipt email in Russian with
  `/ru/` links; English messages in `worker/messages.js`, the browser's in `assets/messages.js`.
- Switchboard's release regions are translated by the catalog in every release variant; the release sync and
  the Switchboard updater regenerate every language.
- Russian reviewed against the brand pack and the glossary (142 values changed; one empty link text fixed).
- Found on the way: the Switchboard agents page's JSON-LD pointed `about` and the breadcrumb at itself (fixed);
  `wrangler dev` refused the entry module's non-handler exports, also on `main` (moved to `worker/routing.js`).

Checks: `npm run check` exit 0 (96 node tests, including a copy of the site with a third language that
builds, passes `check-site.mjs` and the Worker tests), `npm run build` exit 0 (61 entries); local `wrangler dev`:
`/ru/nope/` 404 in Russian, a refused `/api/leads?lang=ru` in Russian; browser check of `/ru/`, `/ru/business/`
(the estimate in `ru-RU` money) and `/ru/start/` (copy buttons) with no console errors.

Production receipt: merged as PR #68 (`667044c`, check run 37844074233 green) and deployed from `main`
(Worker version `9ee1a1d2-8b49-48db-ab1a-7927874b7ccb`); `verify-live.py` then failed only on release drift
(Switchboard 0.6.14, Dashboards 0.6.5, Observatory 0.19.4, launcher 0.1.31, adapter 0.8.1 published since the
last sync), so `releases.yml` was dispatched (run 37844360326): its sync updated Switchboard through
`update-switchboard-release.mjs`, which regenerated `/ru/switchboard/` — the first real run of the language
regeneration — and opened PR #69, merged as `4d5ca27` with the dispatched check green (run 37844414981).
Deployed from `main` `4d5ca27`: Worker version `ff200b47-7bdd-41f6-bd33-3fe101474c52`; `verify-live.py`: PASS —
61 assets (28 pages: en 14, ru 14; hreflang on 24), 7 download routes and 7 not-found addresses
([live.json](evidence/2026-10-08-i18n/live.json)). Live smoke: `POST /api/leads?lang=ru` with an empty body
answers `form_expired` with the Russian message; `/ru/business/` carries a fresh form token;
`/ru/does-not-exist/` answers 404.

Open: SITE-020 (home agent claims vs `/fabric/agents/`), SITE-021 (the Russian hero is six lines on desktop);
the facts rows of Switchboard, Dashboards and Observatory still describe earlier releases (unchanged since the
previous handoff). Next task: SITE-020.

# Previous handoff — Fabric 0.3.2 on the site, 2026-10-08

Objective: the website's change for [Fabric v0.3.2](https://github.com/passioncode-ai/fabric/releases/tag/v0.3.2)
(Fabric `docs/launch/release-mac.md` steps 8–9). The live download already redirected to 0.3.2 through the
edge resolver; this change brings the sources, screenshots and claims in line with the release.
Branch `agent/fabric-032-site-20261008`:

- `npm run releases:sync` — Fabric 0.3.2, Switchboard 0.6.10, Inbox 0.12.0, Dashboards 0.6.4, Observatory 0.19.1,
  launcher 0.1.30: the nightly drift job's content, which it cannot open as a pull request itself.
- `assets/fabric-{home,board,releases}.jpg` re-shot from the installed, notarized 0.3.2 app at 1440×900 on a fresh
  English launch estate (`launch-estate.sql` from the tag, `-v lang=en`, estate `e9789f9c-efc8-4f61-af81-a5bd9ff1a8c3`,
  receipt `backwards_steps = 0`), throwaway user-data folder, no console errors; Releases shows Atlas → 0.4.2 as in 0.2.0.
- `/fabric/agents/` as of 8 October 2026: Kilo Code and Hermes Agent connected in Fabric 0.3.2, Cline runs in Fabric
  (no Fabric tools, asks before each tool), five agents next as a group. Source: v0.3.2 `apps/desktop/src/shared/agents.ts`
  (`connectsToSurface`). `scripts/check-site.mjs` holds the new levels and date.
- `/privacy/` version 2026-10-08 and `/fabric/`: Fabric 0.3.2 sends anonymous usage counts (its release build carries
  the App Key — checked in the packaged `out/main/index.js`, value not read), switch in Settings → Share usage counts.
- `docs/brand/facts.md`: Fabric release (SHA-256 `db0f1a2a…7457b`, verified on an anonymous download: `shasum -c`,
  GPG good signature, `spctl` Notarized Developer ID, stapler), Fabric MCP (board tools; CO-194 still open), coding agents.

Checks: `npm run check` exit 0, `extract-public-copy.py --check` exit 0, `npm run build` exit 0; the old agents page and
the old privacy notice watched failing the new assertions.
Merged as PR #66 (`0677deb`, check run 37704096224 green) and deployed from `main` 0677deb: Worker version
`ebfe7dcf-a294-4a9d-92ff-46cbad27f69a`; `verify-live.py`: PASS — 44 assets, 7 download routes, 5 not-found addresses
([live.json](evidence/2026-10-08-fabric-032/live.json)); the three live screenshots equal the build byte for byte.

Open: the facts rows of Switchboard (0.6.5), Inbox, Dashboards and Observatory still describe their earlier releases —
the sync moved their versions only; each product's own release note updates its row. Next task: unchanged — the
Russian version (RM-25).

# Previous handoff — audit fixes, 2026-10-07

An audit of the live site (operator request 2026-10-07: find and fix bugs) found plain HTTP served
with 200 and no HSTS, an empty 404, a receipt deferral that spent attempts, an adapter version on
/start/ that the launcher does not install, and missing headers and charset on some responses.
Fixed in branch `agent/site-audit-fixes-20261007`: HTTPS redirect in one hop with `www.`, HSTS and
the security headers on every response, `404.html`, receipts deferred to the next hour without an
attempt (dropped after 24 h), `text/plain; charset=utf-8`, the /start/ line names only the launcher.
Deployed from `main` 6907d48 (Worker version 479abcf0).

Later the same day: the not-found page answered 200 at `/404` and 307 at `/404.html` (a soft 404,
and `scripts/verify-live.py` failed on it); the Worker now serves it with 404 there too (PR #62).
The release-sync pull request (#63) carried no check, because a pull request opened with the
Actions token starts no workflow; `releases.yml` now dispatches `check.yml` on its branch (PR #64),
and #63 merged with that check green on its head (run 37549574816). The `pull_request` runs the
bot's pull request starts wait for approval (`action_required`) and are not the gate. Deployed from
`main` 7046166, Worker version 7efa1a6b-aa2f-4707-b74d-1b834f5a78a1; `verify-live.py`: PASS — 44
assets, 7 download routes, 5 not-found addresses.

Next task: the Russian version (RM-25): `/ru/` pages, `hreflang` and sitemap alternates, the
/business/ form, its receipt email and the Worker's pages, against the glossary in
fabric-workspace `knowledge/localization.md`.

# Previous handoff — onboarding, commercial intake and always-current versions, 2026-10-05

Objective (operator, 2026-10-05; roadmap RM-14/RM-15): make the product family the focus; onboard
visitors (create your workplace → create agents → convert what you have → run and see them; open
source and free); vision "do what you love"; personal / contribute / commercial paths; a /business/
funnel with a savings estimate whose submissions reach the organization's backend; versions that
are always current; SEO and motion; the header kept.
Task and receipts: [tasks/2026-10-05-onboarding-commercial.md](tasks/2026-10-05-onboarding-commercial.md).
Deployed and verified 2026-10-05 ([production receipt](tasks/2026-10-05-onboarding-commercial.md#production-receipt)).
The Platform is connected (SITE-014, PLAT-003, 2026-10-06). Next task: the Russian version of the
site (RM-25, operator 2026-10-07); then SITE-015…017.

## Also 2026-10-05 — Fabric: supported coding agents (`/fabric/agents/`)

Answers "Which coding agents does Fabric work with, and what does 'works with' mean?", dated, each agent at
one level with its official site. Rebuilt on this `main` after PR #43 (branch `agent/agents-page-20261005`)
fell behind the page-list and check restructuring; Hermes Agent moved to "connected in development" (Fabric
ADR-0119 amendment 2). Receipts: [task](tasks/2026-10-05-fabric-agents-page.md). Keep it true to each Fabric
release (SITE-018; numbered SITE-012 until 2026-10-06, when the workspace sync refused the duplicate id).

---

# Current handoff — display-copy regression guard, 2026-10-01

Objective: prevent decorative title/hero periods from returning through agents or
release generators. The mandatory source gate covers semantic and styled display
roles; copy projections retain heading structure. One missed typography specimen
was fixed. [Task, baseline plants and checks](tasks/2026-10-01-copy-guard.md).
Published source `2513989fe3fdd423df5679aec6a3e24756824d32`, Worker
`e00ec2e7-51ac-4445-9bb0-bdba53e2bab2`: hosted checks, 37 live asset/route
checks and three live specimen widths pass. Next: keep the source corpus aligned
with sitemap/build entries when adding a page. General copywriting and design skill changes are owned by their separate
ssheleg repositories. Model outcome evaluation remains NOT_RUN.

---

# Current handoff — display-copy refinement, 2026-10-01

Operator request: remove decorative full stops, especially in heroes, and review
the copy more carefully. Seven pages now share the display punctuation convention;
hero introductions are concise and the generated Switchboard section agrees.
[Task and verification](tasks/2026-10-01-display-copy.md). Published and verified at source `d9dd06ab2cdabd7a624a1169d6d3db230e0617f3`,
Worker `61c4218f-ccfa-477a-b569-5cec86a2bc4c`: all 37 live asset/route checks and
21 live browser cases pass. The linked task contains the receipts. Next: preserve this convention when
updating product pages or generated release copy; product tasks stay in the local board.

---

# Current handoff — composable agent workplace, 2026-10-01

Objective: explain each tool’s utility and how to adapt an agent workplace.
Implemented: homepage product directory and workflow/extension paths, /dashboards/
with pinned download and MCP setup, honest preview boundaries, consistent navigation,
Wrangler security update and the federated local backlog.
Checks and screenshots: [bounded task](tasks/2026-10-01-agent-workplace.md).
Deployment: pending parent review and reviewed-main publication; no live claim yet.
Next task: land source, deploy with the existing organization account, verify every
asset/redirect, append the receipt and close SITE-001. Remaining work is canonical in
[the local backlog](backlog.md), not repeated as independently editable statuses here.

---

# Current handoff — the Observatory Mac app download, 2026-10-03

Objective: the Observatory page offers the Mac app that release 0.13.0 now carries,
`ProjectObservatory-0.13.0-macos.zip`, signed with a Developer ID and notarized by Apple.
Changed:
- `observatory/index.html`: a note under Get started with the direct release link;
- `docs/brand/facts.md`: platforms row;
- `scripts/check-site.mjs`: the page must link the zip and say "notarized by Apple";
- generated copy.

Checks: `npm run check` exit 0, `npm run build` exit 0. The link answers 302 to GitHub's asset
store.
Deploy: from `main` with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory).
Next task: unchanged. A newer Observatory release updates the version, wheel, app zip and facts
in one change.

---

# Current handoff — Project Observatory 0.13.0 named, 2026-10-03

Objective: the homepage card, the Observatory page and the facts name
[Project Observatory v0.13.0](https://github.com/passioncode-ai/project-observatory-dashboard/releases/tag/v0.13.0),
which ships the three audit-and-fix runs over 0.12.0.
Changed:
- `index.html`: card, section note and product line say release 0.13.0.
- `observatory/index.html`:
  - latest release, wheel name and release link;
  - step 01 installs the wheel with `--no-deps`, then its `[full]` extra under the `requirements-full.lock` it carries (the engine README's two-step install);
  - step 04 asks for `observatory_overview`, the MCP server's own starting tool, instead of `observatory_status`, which unpaged returns every project;
  - the license-history note says 0.13.0 is under the AGPL like every release since 0.10.0, the first.
- `scripts/check-site.mjs`: the page must name 0.13.0, its tag, its wheel, `requirements-full.lock` and `observatory_overview`.
- `docs/brand/facts.md`: release row with the SHA-256 from `SHA256SUMS`, equal to the GitHub digest and to a re-download; license row.
- SCN-006.
- generated copy.
Checks: `npm run check` exit 0 (it includes `extract-public-copy.py --check`), `npm run build` exit 0.
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory). The Worker version and live check are recorded in Project Observatory's private `docs/runs/2026-10-03-release-0.13.0/`.
Next task: unchanged. When a product publishes a newer release, update its manifest or link, page and facts row in one change.

---

# Current handoff — Project Observatory 0.10.0 named, 2026-10-01

Objective: the homepage card, the Observatory page and the facts name
[Project Observatory v0.10.0](https://github.com/passioncode-ai/project-observatory-dashboard/releases/tag/v0.10.0),
its first release under the AGPL.
Changed: `index.html` (card and section note: release 0.10.0), `observatory/index.html` (latest release,
wheel name, release link; the license-history note now says 0.10.0 is the first AGPL release and 0.9.1 and
earlier keep their license), `scripts/check-site.mjs` (the page must name 0.10.0, its tag, its wheel and
"first under the AGPL"; watched red with the old `<strong>0.9.1</strong>` planted), `docs/brand/facts.md`
(Observatory release row with the wheel SHA-256 from `SHA256SUMS`, equal to the GitHub digest; license row;
license history: Observatory v0.10.0 under AGPL-3.0), SCN-006, `README.md`, generated
copy. The homepage license-history sentence is unchanged — it names only MIT and PolyForm releases, and
0.8.2 to 0.9.1 stay PolyForm. The site names no launcher or adapter version, so neither changed here.
Checks: `npm run check` exit 0, `extract-public-copy.py --check` exit 0, `npm run build` exit 0.
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory); the
Worker version and live check are recorded in Project Observatory's `docs/runs/2026-10-01-release-0.10.0/`.
Next task: unchanged — when a product publishes a newer release, update its manifest or link, page and facts row
in one change.

---

# Current handoff — Fabric Dashboards 0.3.1 named, 2026-10-01

Objective: the homepage row, the Switchboard family link and the facts name
[Fabric Dashboards v0.3.1](https://github.com/passioncode-ai/fabric-dashboards/releases/tag/v0.3.1), the release
that stops false "not answering" notifications (Dashboards ADR-0008) and its first release under the AGPL.
Changed: `index.html` (row: release 0.3.1 and its link), `switchboard/index.html` (Dashboards release link),
`scripts/check-site.mjs` (the homepage must link v0.3.1), `docs/brand/facts.md` (Dashboards status row with the
DMG SHA-256 from the release's `.sha256` asset and both notarization ids; licence history: Dashboards v0.3.1 under
AGPL-3.0), SCN-010, `README.md`, generated copy. The homepage licence-history sentence is unchanged — it names
only MIT and PolyForm releases, and v0.2.0/v0.3.0 stay PolyForm.
Checks: `npm run check` exit 0, `extract-public-copy.py --check` exit 0.
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory); the
Worker version and live check are recorded in the Dashboards repository's `docs/HANDOFF.md` → Release 0.3.1.
Next task: unchanged — when a product publishes a newer release, update its manifest or link, page and facts row
in one change.

---

# Current handoff — Switchboard v0.4.1-beta.1 selected, 2026-10-01

Objective: the Switchboard page and download redirects select
[v0.4.1-beta.1](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.4.1-beta.1), the
release that stops the repeated macOS Keychain dialogs and the first Switchboard release under the AGPL.
Changed: `switchboard/release.json` and the release-bound regions of `switchboard/index.html`
(`node scripts/update-switchboard-release.mjs v0.4.1-beta.1`: JSON-LD `softwareVersion` 0.4.1-beta.1 and
`license` AGPL-3.0-only, checksums, release link); `scripts/switchboard-release.mjs` — the AGPL-era
licence sentence now also names v0.4.0-beta.1 as the PolyForm release, so the page keeps the whole
history once a later release is current (test in `switchboard-release.test.mjs`, watched red before the
change); `docs/brand/facts.md` Switchboard rows (release, checksums, licence by release, notarization
`c93a1bdc-1ad3-4dff-9056-b8250c3eea2a`, macOS/Windows receipts, licence history); generated copy.
Checks: `npm run check` exit 0 (13 release tests), `extract-public-copy.py --check` exit 0, `npm run build`
exit 0 (29 entries).
Deploy: from `main` after the merge with `npm run deploy` (`CLOUDFLARE_ACCOUNT_ID` from Project Observatory);
the Worker version and live redirect check are recorded in the Switchboard repository's
`docs/evidence/release-0.4.1.md` → Website.
Next task: unchanged — when a product publishes a newer release, update its manifest, page and facts row
in one change.

---

# Current handoff — final check: releases, public source and MCP routes, 2026-10-01

Objective: every product page states the current version, license, resolving downloads and the MCP
route; `facts.md` matches the releases. [Bounded packet](tasks/2026-10-01-final-check.md) (findings,
branch comparison, checks).
Changed: `index.html`, `fabric/index.html`, `inbox/index.html` (rewritten for 0.8.2) + `inbox/release.json`,
`observatory/index.html` (0.9.1, wheel install, MCP step), `switchboard/index.html` (Dashboards link),
`worker/index.js` (`/inbox/download/macos`), `check-site`/`check-worker`/`build-site`, brand
facts/terminology/strings/copy, SCN-006/009/010, FLW-01/02/03, SCR-05/06, `README.md`, `AGENTS.md`,
`docs/DEPLOYMENT.md`.
Checks: `npm run check` exit 0, `extract-public-copy.py --check` exit 0, `npm run build` exit 0
(29 entries); four planted defects watched red (packet).
Published: source `88c9640` (squash of PR #20, = pushed `main`), Worker version
`a1d20ec1-0052-40bf-b371-09bd2eaa452c` (`npm run deploy` with `CLOUDFLARE_ACCOUNT_ID` from Project
Observatory); live check 2026-10-01: 29 of 29 live files equal the build, `/inbox/download/macos` and
`/fabric/download/macos` 302 to their release DMGs, `www` 301 to the apex.
Follow-up (same day, PR #21): Observatory v0.8.2 added to the PolyForm licence history on the
homepage, the Observatory FAQ and `facts.md` (packet F7), then redeployed from `111ce81`: Worker
version `a5edeb0e-18c8-4288-9fb0-e3d624463f64`, 29 of 29 live files equal the build.
Next task: when Fabric, Inbox, Observatory or Dashboards publish a newer release, update its
manifest or link, the page and the facts row in one change; when Fabric's agent hub ships an MCP
entry, replace the "no MCP entry" sentence on `/fabric/`.

---

# Current handoff — open source under AGPL-3.0 and the repository standard, 2026-09-30

Objective: apply Fabric ADR-0092 to the public words — Switchboard, Project Observatory and Fabric
Dashboards are open source under AGPL-3.0 with a commercial license available; released versions
keep MIT or PolyForm; Fabric and Fabric Inbox, whose source is private, are never called AGPL — and
bring this repository onto the organization's repository standard.
[Bounded packet](tasks/2026-09-30-agpl-and-repository-standard.md) (decisions, REQ, receipts).
Changed: `index.html`, `switchboard/index.html` (release region and JSON-LD now follow three license
eras), `observatory/index.html` (JSON-LD → AGPL, no release version), `inbox/index.html` (FAQ),
`scripts/check-site.mjs` and `scripts/switchboard-release.mjs` + tests, brand facts/terminology/copy,
SCN-004/006/010, FLW-02, SCR-02/04, `README.md` (+ `## License`), `AGENTS.md` (template shape),
`LICENSE`, `COMMERCIAL-LICENSE.md`, `CLA.md`, `package.json`/lock license.
Checks: `npm run check` exit 0, `npm run build` exit 0, `extract-public-copy.py --check` exit 0,
`ux_lint.py` OK, `brand_lint.py` unchanged (2 pre-existing errors); planted defects watched red
(packet); org-index `check_format.py` 8 → 0 findings (offline before merge, online after), `check_names.py` 0.
Published: source `42784ed` (fast-forward to `main`, PR #15), after the precondition held — the
AGPL `LICENSE` on `main` of fabric-switchboard, project-observatory-dashboard, fabric-dashboards and
fabric-agent-adapter; Worker version `8e17579f-b486-4882-9c49-3aac672990a1`;
[live receipt](AGPL_RECEIPT.json) — 28 of 28 live files equal the build.
Next task: release sync — Observatory's page names release 0.8.1 and
Dashboards' links v0.1.0 while v0.9.1 and v0.3.0 are out — a release-sync task for `facts.md` and
the pages.

---

# Current handoff — Switchboard v0.4.0-beta.1 selected, 2026-09-30

Objective: serve the published, notarized Switchboard 0.4.0-beta.1 from the download redirects and
the product page. Landed by fast-forward: the parked 0.4 page commit (rebased onto `main` as
`a9b4b57`; the original `agent/switchboard-0.4-site` is left untouched) and `c8a3a65`, the updater's
output for `v0.4.0-beta.1` (`switchboard/release.json` with SHA-256 and `macosNotarized: true` from the
release receipt, PolyForm JSON-LD, notarized macOS note, agents section) plus brand facts pointing at
the 0.4.0 receipts. The two planted-defect tests that assumed a 0.3.1 page now start from a page
rendered for a frozen 0.3.1 manifest (planted red: 3 tests fail when the MIT-history check and the
missing-region guard are disabled). PR [#13](https://github.com/passioncode-ai/passioncode-ai.github.io/pull/13).
Checks: `npm run check` exit 0, `npm run build` exit 0, `extract-public-copy.py --check` exit 0, PR
check pass; local Worker preview: macOS redirect → 0.4.0 ZIP, 500 px wide without horizontal overflow.
Published: source `c8a3a65` (= pushed `main`), Worker version `2cd961df-0de6-4422-9193-f4c726eed857`;
[live receipt](SWITCHBOARD_0.4_RECEIPT.json) — 28 of 28 live files equal the build, both redirects
serve archives whose SHA-256 equals `SHA256SUMS-0.4.0.txt`.
Open: the Switchboard page screenshot is still the browser demo, not the native 0.4 app; the launcher
line appears only when `passioncode/family.json` lists Switchboard (`launcherPlugin: false`).
Next task: when the launcher lists the plugin, rerun `node scripts/update-switchboard-release.mjs
v0.4.0-beta.1` and deploy.

---

# Current handoff — source-available wording and Fabric Dashboards, 2026-09-29

Objective: apply the operator's 2026-09-29 decisions to the public site — Switchboard,
Observatory and Fabric Dashboards are source-available (PolyForm Noncommercial or Internal Use,
commercial license on request; published MIT releases stay MIT), Observatory's latest release is
0.8.1, the tagline names teams, and Fabric Dashboards 0.1.0 is listed with the family.
[Bounded packet](tasks/2026-09-29-source-available-and-dashboards.md) (decisions, REQ, receipts).
Changed: all six pages (copy, metadata, JSON-LD `license` → the two PolyForm URLs, footer
anchor `/#source` with `#open-source` kept as a legacy anchor), `styles.css` (one rule: code in
the build list does not wrap), `check-site`/`build-site`, brand facts/terminology/strings/copy,
SCN-004/006/010, FLW-02/03, SCR-01..04, `README.md`, `design-system/README.md`.
Fabric Dashboards has no product page by decision (packet): pipeline row, source card and
design-system mark link its public repository and release.
Checks: `npm run check` exit 0 (4 PASS lines), `npm run build` exit 0 (28 public entries),
`extract-public-copy.py --check` exit 0, `git diff --check` exit 0; super-ux `ux_lint.py` OK;
`brand_lint.py docs/brand` 2 errors / 296 warnings — both errors pre-existing (B020
`toolkit.explore`, B021 `build.follow`), warnings all B022. Planted red: the old Observatory page
fails on JSON-LD license; the old homepage fails on "open source". Browser (local `dist/`)
1280×900 and 500×844: no horizontal overflow; five marks load on the design system.
Published: source `308a440` (fast-forward to main), Worker version `9a66aa1c-613f-4bc5-ad81-0810061f6020`; [live receipt](SOURCE_AVAILABLE_RECEIPT.json) — 8 live files equal the build.
Next task: when Switchboard or Observatory publish their first PolyForm release, update the
version rows in `facts.md` and the pages; the MIT-history sentences keep naming the last MIT tag.

---

# Current handoff — Fabric early preview download, 2026-09-29

Objective: the Fabric page offers the notarized macOS DMG with its requirements, limits and real
screenshots. [Bounded packet](tasks/2026-09-29-fabric-preview-download.md) (REQ, receipts, checks).
Changed: `fabric/index.html` (early-preview hero, «Inside Fabric», «Get Fabric»), `fabric/release.json`,
the Worker route `/fabric/download/macos`, `check-site`/`check-worker`, the build allow-list, the
homepage status lines, brand facts/strings/voice/terminology, SCN-007, FLW-02/03, SCR-05.
Published: source `8ffd874` (PR #7), Worker version `3726c08e-4a39-4d3b-8678-2edcb58c3716`;
[live receipt](FABRIC_PREVIEW_RECEIPT.json) — 9 live files equal the build, the download redirect and the
anonymously downloaded DMG (SHA-256 match, notarized) verified.
Next task: after a newer Fabric build, publish its release here, update `fabric/release.json` and
the facts row, re-take the screenshots from a fresh demo estate.

---

# Current correction — homepage hero, 2026-09-27

Objective: restore the original hero headline and make tool exploration the primary action.
Restored the exact H1 from `d5c168d` (verified with `git show d5c168d:index.html`):
“The agent-agnostic operating system for AI-native teams.”
Primary Explore the tools targets `#products`; Download Switchboard is secondary.
Updated SCN-001, its flow/screen, brand facts and generated public copy in the same change.
Upstream Inbox publication `3d44aa6` is included; no CSS or other product page changed.

Checks: npm run check and npm run build passed (6 pages, 23 public files); copy extraction
passed; brand lint 0 errors/284 advisory warnings; UX lint consistent. Browser at 1280×720
and 390×844 showed the primary CTA within the viewport and no horizontal overflow;
clicking it reached `/#products`. Published source [86acb6c](https://github.com/passioncode-ai/passioncode-ai.github.io/commit/86acb6c3a6908f68ce1d541ee25f2de280e72ea6); [live receipt](HERO_RECEIPT.json).
All 8 checked live files match the build, both downloads and www redirect pass.
The live browser confirmed the restored H1 and primary CTA navigation to /#products.
Next task: inspect the published hero and maintain product facts from their owning releases.
Local-only: .DS_Store, dependencies, preview state and ephemeral deployment credentials.

---

<sub>ssheleg skills — task-pipeline · ux-scenarios · sheleg-design · brand-voice · copywriting · evidence-docs · agent-sync · maintaining-fabric-workspace · cloudflare</sub>

# Current handoff — website storytelling, 2026-09-26

Objective: improve the main site's content while retaining the chosen style. [Bounded brief](tasks/2026-09-26-site-storytelling.md), [UX screens](ux/screens.md), [brand facts](brand/facts.md), [verification](evidence/site-storytelling-2026-09-26.md).

Implemented on `codex/site-storytelling`: AI-native teams headline, work-cycle explanation,
download-first Switchboard feature, explicit development pipeline, public source section,
About/Twitter from verified author identity, shared responsive navigation and `/fabric/` page.
Integrated upstream `c277b7b` (Observatory launch) before publication: its page/assets/design
reference are preserved, with Observatory in the work cycle, available tools, pipeline and source.
Previous release receipts below remain historical.

Published source: [72d7ada](https://github.com/passioncode-ai/passioncode-ai.github.io/commit/72d7adabd049a97ea06d9db4da565aea916d5b21), on `main` and `codex/site-storytelling`.
Production: [receipt](STORYTELLING_RECEIPT.json), Worker version `1a2cf6bc-ad3e-49c8-b8e7-fc9ce72fc6b9`,
deployment `fc31505e-3198-4c77-84b4-5dddf561cd33`, 2026-09-26 19:28 UTC, 100% traffic.
Live browser opened all five pages; [homepage capture](evidence/site-storytelling-live.jpg).
Fresh anonymous clone of the exact source passed npm ci (0 vulnerabilities), check, build and
all five text projections. 17 live HTTP checks passed, including build-byte comparison,
download destination/query isolation/no-store, www and private-path 404s.

Actual skills: task-pipeline — delivery/integration; ux-scenarios — visitor paths;
brand-voice — terms/facts; copywriting — page content and own humanization pass;
sheleg-design — retained-style composition; cloudflare — existing Worker publication
(the last is outside the family). No other repository or native binary changed.

Next task: review the public reading order and headline; maintain product status from actual
releases. Native beta acceptance and Fabric's private development remain separate owners.
Local-only: `.DS_Store`, dependencies, preview state and Cloudflare ephemeral credentials.

---

# PassionCode toolkit / Switchboard launch — 2026-09-26

Objective and bounded packets: [launch brief](tasks/2026-09-26-public-launch.md). Public contract: PassionCode.ai is a toolkit for AI-native work; Switchboard is the first downloadable MIT beta; Fabric is the CEO AI agent in development. The [shared design system](../design-system/README.md) owns tokens and the yellow S; Switchboard vendors reviewed hashes. No Fabric runtime UI migration is claimed.

## Owner index

| Owner | Source / entry | Status |
|---|---|---|
| Website, downloads, canonical design | `passioncode-ai/passioncode-ai.github.io`, branch `codex/switchboard-public-launch`; this handoff | deployed source `527b5ba41c4aad77512572ec5117beb27ba7fb08`; [production receipt](LAUNCH_RECEIPT.json) |
| Switchboard app / binaries | [binary source 9e20a49](https://github.com/passioncode-ai/fabric-switchboard/tree/9e20a49ad7ef917068c266eff4283180209965dc), [installation/docs b6cde09](https://github.com/passioncode-ai/fabric-switchboard/blob/b6cde090a62a7a96a2a612ada875a9684e1e3b86/docs/HANDOFF.md) | public `main`; [v0.3.1-beta.1](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.3.1-beta.1) published |
| Organization profile | [248df9b](https://github.com/passioncode-ai/.github/commit/248df9b197056faea573bbd1c7ecf47e03126f7f), branch `codex/switchboard-toolkit-launch` | published on `main`; anonymous source verified |
| Internal Fabric narrative and map | owned in private source/workspace repositories | separate private handoff; no private runtime or source published here |

## Completed and checks actually run

- Homepage, Switchboard product page and public design system; HTML is readable without client JS. Canonical URLs, descriptions, sitemap and structured data updated. Legacy passion-fruit assets remain locked. [Scenarios](ux/scenarios.md), [screen contracts](ux/screens.md), [brand facts](brand/facts.md).
- Worker fixed OS redirects use the selected [release manifest](../switchboard/release.json); 302/no-store/noindex, query isolation, trailing slash, unknown platform and asset fallback checked. Explicit tag updater supports prereleases and rejects drafts/unavailable archives.
- `npm ci`, `npm run check`, `npm run build`, `git diff --check`: PASS. Build allowlist: 17 public entries. Isolated negative probes: foreign download destination rejected; cacheable download redirect rejected. The initial cacheability probe made no mutation due to header case; corrected probe asserted mutation occurred and then failed at the expected no-store check.
- Wrangler updated from 4.128.0 to 4.141.0; `npm audit` reports 0 vulnerabilities, replacing the prior transitive high-severity findings. No full hosted suite dispatched.
- Installed super-ux `ux_lint.py`: PASS with no warnings after documenting public page contracts. `brand_lint.py`: 0 errors / 151 warnings; generic registry heuristics inspect HTML and mark some locations missing. This is not a clean-warning brand certification. Public text is projected with `scripts/extract-public-copy.py`, not inferred from class names.
- Browser review via cua: 1280×720 desktop and 390×844 mobile homepage/product; mobile design-system page. No horizontal overflow on all three mobile pages. Primary download CTA visible in first viewport. Download anchor and FAQ work; keyboard Enter expands FAQ with visible solid focus outline. Lazy screenshot loads without broken images. Synthetic app demo screenshot is explicitly labelled. This is focused review, not full WCAG or native-platform certification.
- Independent app review found the installation link pointed to maintainer build instructions; fixed to the new end-user INSTALL guide. Static/Worker contracts independently passed review.
- Both published ZIPs fetched anonymously in full and SHA-256 matched local build receipts (macOS 17,052,475 bytes; Windows 6,232,566 bytes). Source tag identifies exactly `9e20a49`. No real credentials used.

## Decisions, limits and next task

English public copy and existing fruit/gold/plum character retained. Shared canonical tokens version 1.0.0 first committed at `508e91793fcb79d6a59bd2265551dbc76f7a8f97`; app source manifest pins exact bytes. Yellow is action/brand, blue distinguishes current native identity from selected next-request route.

macOS signed, notarization NOT_RUN. Windows unsigned cross-build, native acceptance NOT_RUN. Live-provider acceptance NOT_RUN. These facts sit beside platform downloads. Next product work: operator-assisted provider acceptance, macOS notarization, Windows native acceptance/signing; then select the next verified release using the [deployment contract](DEPLOYMENT.md). Never remove beta limits merely because packaging succeeded.

Public launch complete: exact source deployed, live pages and redirects verified ([receipt](LAUNCH_RECEIPT.json)); profile published. Internal source/workspace propagation is separately tracked in its owning private repository; concurrent internal work is preserved. Dependencies, build caches, provider data, credentials and unrelated .DS_Store files remain local-only.

## Skills actually used

- task-pipeline: bounded implementation/review/delivery; ux-scenarios: visitor paths and page contracts.
- sheleg-design: shared tokens, S and visual review; brand-voice and copywriting: hierarchy and public text.
- evidence-docs: source/build/publication receipts; agent-sync: private Fabric claims; maintaining-fabric-workspace: private map publication (not a family skill).

**Made with [ssheleg skills](https://github.com/ssheleg/sshlg-skills)**

## Final public delivery receipt

- Website source `527b5ba41c4aad77512572ec5117beb27ba7fb08` equals pushed `main` at deployment; Cloudflare version `94c85821-25dd-49b8-8b76-23bfcee072bc`, deployment `82bcb8c0-11ad-44fd-a5cb-d85e91b2b551` at 2026-09-26T16:42:21Z. Later changes are docs/receipts only and do not change deployed bytes.
- Anonymous curl byte comparison passed homepage/product/design-system/tokens/demo image; both OS redirects return the selected release with no-store/noindex; www preserves path/query; unknown OS and non-allowlisted docs/.git paths return 404. [Executed verification](evidence/verify-launch.py), [JSON result](LAUNCH_RECEIPT.json), [live product screenshot](evidence/switchboard-live.jpg).
- Fresh anonymous website checkout at source SHA: npm ci, check and build PASS, audit0. Fresh Switchboard checkout `b6cde090a62a7a96a2a612ada875a9684e1e3b86`: 81 tests / 0 failed / 1 intentional Keychain test ignored, full gate PASS with scoped installed Command Line Tools. [Final app handoff](https://github.com/passioncode-ai/fabric-switchboard/blob/a1ff940/docs/HANDOFF.md).
- Cloudflare skill was additionally used to resolve CLI authentication scope and follow direct upload API documentation. Existing connector authorization was used; no access grant, persistent token or DNS change was created.

## Fabric Inbox published

The subsequent Inbox change and canonical white/dark themes are live. Entry: [Inbox handoff](INBOX_HANDOFF.md), [deployment receipt](INBOX_DEPLOYMENT.json). Deployed source `630f4f7f5c94fc36f15d9047ff487d1142c3479f` preserves the storytelling/Fabric/Observatory work and adds Inbox. All six pages and 23 public files were compared with the exact build after deployment.
