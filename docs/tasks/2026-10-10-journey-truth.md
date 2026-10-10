# Product journey truth table (W4, 2026-10-10)

Workstream W4 of [the narrative, localization and video plan](2026-10-10-narrative-l10n-video.md), backlog row
[SITE-028](../backlog.md). Research only: nothing here changes a page. It answers, for each step of the plan's §2
journey, what a reader could really see today, in which product and version, with what proof; which existing
pictures can be reused; what must be captured fresh (the shot list for W5); and how to get each product into a clean
demo state without touching the operator's real profile.

Measured 2026-10-10. Every repository was read through `git show origin/main:<path>` or a release tag, so no
checkout was disturbed. Commit-addressed proof uses the tag's commit (SHA from `gh api repos/<org>/<repo>/commits/<tag>`):

| Product | Release read | Tag commit | Notes |
|---|---|---|---|
| Fabric | [v0.3.3](https://github.com/passioncode-ai/fabric/releases/tag/v0.3.3), pre-release, 2026-10-09 | `1404dffe4b` | arm64 DMG only; 0.3.4 (universal DMG) is in review |
| Fabric Agent Adapter | [v0.8.1](https://github.com/passioncode-ai/fabric-agent-adapter/releases/tag/v0.8.1), 2026-10-08 | `0f5df40c0e` | skills `creating-fabric-agents`, `adapting-projects-to-fabric` at 0.8.1 |
| Launcher | [v0.1.31](https://github.com/passioncode-ai/passioncode/releases/tag/v0.1.31), npm `latest` 0.1.31 | `609e02dfd6` | `family.json` pins adapter `v0.8.1`, observatory-log `v0.18.0` |
| Fabric Switchboard | [v0.6.15](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.6.15), 2026-10-10 | `8448624c7e` | |
| Fabric Dashboards | [v0.6.7](https://github.com/passioncode-ai/fabric-dashboards/releases/tag/v0.6.7), 2026-10-09 | `bd136b9d76` | |
| Project Observatory | [v0.21.0](https://github.com/passioncode-ai/project-observatory-dashboard/releases/tag/v0.21.0), 2026-10-10 | `f545bd7598` | UX docs read from a local clone whose `origin` is not the public organization repository; line numbers for Observatory are from that clone's `origin/main` (`c182633b70`) and were not compared with the tag |
| Fabric Inbox | [v0.13.0](https://github.com/passioncode-ai/fabric-inbox/releases/tag/v0.13.0), 2026-10-08 | `84f67594d6` | |

Privacy rule used throughout: the operator's private-terms list was read only by a
local script that reports a count per image, never the terms. This document names no private project, agent, path,
account or domain; where an image is unsafe it says what kind of thing shows, not what.

## 1. State per step

State words follow the site's own: **available now** (a released build does it today), **preview** (released but
marked early preview, or only part of the step works), **direction** (designed or planned, not built).

| Step | What the reader would see | State | Main proof |
|---|---|---|---|
| 1 Enter | A terminal command that installs the skills; then a separate download of the Fabric app. **The plan's "one command, Fabric opens" is not true**: the launcher installs skills only. | skills: available now; Fabric app: preview | launcher README line 10 at v0.1.31 (`npx @passioncode-ai/passioncode@latest update`), "no Fabric app/account/key" in `docs/brand/facts.md` Launcher row; Fabric [v0.3.3](https://github.com/passioncode-ai/fabric/releases/tag/v0.3.3) is a GitHub pre-release |
| 2 Onboard | Fabric's first run: name and look, the coding agents on this Mac, then the four actions in two pairs | preview (Fabric 0.3.3) | Fabric ADR-0129 decision 1; `apps/desktop/src/renderer/src/start/StartPaths.tsx:65` (`StartCards`) and `FirstRun.tsx:210` at `1404dffe4b` |
| 3 First agent | Create: a form (name, one sentence, folder, coding agent), then the coding agent's console asks intake questions. Adapt: pick a folder, read the plan in the console, work lands on branch `fabric-adapter`, a conformance report says what passed | preview in Fabric; available now in the adapter skills | `AgentPaths.tsx:228` (`CreateAgent`), `:433` (`ConvertAgent`) at `1404dffe4b`; adapter skills at 0.8.1 (`plugins/fabric-agent-adapter/skills/*/SKILL.md`, `metadata.version "0.8.1"`). Admission to Fabric's registry is **direction** (AR-7, AR-11; ADR-0129 consequences) |
| 4 Grow | More agents, each with its own account and a dashboard | Switchboard and Dashboards: available now (macOS; Switchboard also Windows and Linux builds, Windows unsigned) | Switchboard v0.6.15 release notes; Dashboards v0.6.7 release; `docs/brand/facts.md` Dashboards role row (console on the project's Switchboard account where one is bound, 0.6.0) |
| 5 Work together and watch | Fabric's board and releases, Observatory's overview, the agent-access panel | Observatory: available now. Fabric board, releases, project-addressed messages: preview. "Agents hand work to each other" end to end: **direction** (the site's own fact: "the complete Fabric coordination loop remains in development"). Inbox: preview, and not a way agents talk to each other (it is mail) | `docs/brand/facts.md` rows Workplace composition, Fabric MCP, Fabric coding agents, Inbox role; Fabric ADR-0117 (board comms, `com.*`); Fabric `ReleasesScreen.tsx:15`, `BoardScreen.tsx:31` at `1404dffe4b` |
| 6 Organization | Nothing to screenshot. The same thing across a team's machines; the commercial path | direction, offered on request; pilots run on the open-source tools | `docs/brand/facts.md` commercial path row; roadmap `knowledge/roadmap.md` RM-10, RM-26 (fabric-workspace); Fabric's own New project screen says "Hosted estates are not built yet" (screenshot `docs/audit/…/onboarding-light-1280.png`, see §3) |

### Corrections to the plan's §2 table

1. **Step 1.** "Install with one command; Fabric opens" cannot be shown. The command installs the Fabric Agent
   Adapter skills, Observatory Log and the working rules into the coding agent (launcher README at v0.1.31;
   [/start/](../../start/index.html) step 01). Fabric itself is step 02, a DMG; it needs Docker and the Supabase CLI
   (`fabric/index.html:39`). Honest wording for W1: "one command installs the skills; Fabric is a separate download".
2. **Step 2 version.** The plan says Fabric 0.3.3. That is correct today, but 0.3.4 is in review and will replace
   the arm64 DMG with a universal one; every Fabric shot must name the build it came from (shot list below).
3. **Step 3.** "In Claude Code or Codex" is right for the skills. Fabric's own buttons offer six coding agents; the
   Create and Adapt actions check that the two skills are installed where the chosen agent reads skills, and install
   nothing (ADR-0129 decision 4).
4. **Step 5 tools on screen.** Inbox does not belong in "agents talk and hand work on". Fabric's board and the
   agent hub do (`com.submit`, `com.list`, `com.get`, `com.read_ack`, `com.status`, only for agents Fabric connects:
   Claude Code, Kilo Code, Hermes Agent). Show Inbox, if at all, as "an agent's mailbox" with the agent-access panel.
5. **Step 6.** Do not name the organization edition's codename or internals on the page; the facts row forbids it.
   The roadmap names it, so keep this document free of it too.
6. **Stale facts rows (not changed here).** `docs/brand/facts.md` still describes Fabric 0.3.2, Observatory 0.19.4,
   Dashboards 0.6.5 and Inbox 0.12.0; the live releases are 0.3.3, 0.21.0, 0.6.7 and 0.13.0. The site's version
   strings follow releases automatically, but the prose rows need a refresh. Likewise the launcher's `family.json`
   pins observatory-log at `v0.18.0` while Observatory is at 0.21.0 and its release says the companion plugin moved
   to 0.21.0. Both belong to their owners; recorded here as adjacent defects.

## 2. Screen IDs and where to find them

| Step | Product and build | Screen IDs | UI route or window |
|---|---|---|---|
| 1 | Launcher 0.1.31 | none (CLI) | a terminal; `npx @passioncode-ai/passioncode@latest update`, then `npx passioncode status` |
| 1 | Fabric 0.3.3 | SCR-70 step 1; SCN-126 | first launch of an empty estate, or Help → Walk through the first run again (SCN-126 entry point). Window "Fabric" |
| 2 | Fabric 0.3.3 | SCR-70 steps 2 and 3; SCN-126, SCN-135 (fallback order) | same window, first-run steps 2 (coding agents) and 3 (four actions); later via **+ Project** |
| 3 | Fabric 0.3.3 | SCR-74 Create an agent (SCN-136); SCR-75 Adapt an existing agent (SCN-131); SCR-25 Session window (SCN-025, SCN-091) | + Project → Agent → Create an agent / Adapt an existing agent; the console opens in a separate session window |
| 3 | Adapter 0.8.1 | none (skills; Fabric Agent Contract is normative) | the coding agent's console, `creating-fabric-agents` intake grill ("No file is created until every row has an answer") |
| 4 | Switchboard 0.6.15 | SCR-01 Accounts (SCN-018, SCN-020, SCN-021, SCN-022, SCN-025 project rule, SCN-026 connect a coding agent) | desktop app window "Fabric Switchboard"; sidebar Accounts, Projects, Agents, Activity |
| 4 | Dashboards 0.6.7 | SCR-01 Overview (SCN-005, SCN-006); SCR-02 Service view (SCN-014); SCR-10 Console panel | window "Fabric Dashboards"; Overview, then a service, then Console in its toolbar |
| 5 | Fabric 0.3.3 | SCR-30 Estate home (SCN-043, SCN-044); SCR-41 Ranked Board (SCN-050, SCN-051); SCR-19 Work graph and release (SCN-020), the screen "Releases with their basis" (`ReleasesScreen.tsx`, ADR-0084); SCR-76 Agent access (SCN-132, SCN-133) | window "Fabric", sidebar Fabric, Board, Planning; releases through the pulse |
| 5 | Observatory 0.21.0 | SCR-01 Обзор (index), SCR-04 project panel (`#project:<id>`); this repository numbers its scenarios S1, S12, not SCN | the Mac app window "Project Observatory" or `http://127.0.0.1:<port>/`; EN/RU switch bottom left |
| 5 (optional) | Inbox 0.13.0 | SCR-03 Inbox and search (SCN-026), SCR-15 Settings → Agent access, SCR-10 Settings → Agents (SCN-021, SCN-022, SCN-024) | desktop app window "Fabric Inbox"; needs a mail provider, see §5 |
| 6 | none | none | /business/ on the site |

## 3. Existing images: reuse or not

Inspected by opening every file with the Read tool. A name list for each image was transcribed and run through the
private-terms script: 0 hits for every image except the one marked UNSAFE. The script cannot see anything that is
not transcribed, so "clean" also rests on the visual read below.

### Already on the site (`assets/*.jpg`)

| File | Pixels, bytes | Build, from the record | Content | Verdict |
|---|---|---|---|---|
| `fabric-home.jpg` | 1440×900, 171 074 | Fabric 0.3.2 installed, notarized app on a fresh English launch estate (site commit `f03c094` message); same demo estate as Fabric's `assets/readme/fabric-home.jpg` | Fabric home, dark; demo projects Atlas, Studio, Signal, Orbit; "Where you left off" | Reusable as a stand-in for step 5 only. Synthetic. Dark, 1x, not 0.3.3. Does not show onboarding |
| `fabric-board.jpg` | 1440×900, 158 164 | same | Attention board, dark | Reusable stand-in for step 5. Synthetic |
| `fabric-releases.jpg` | 1440×900, 163 659 | same | Releases with their basis, dark, marked "Demo / local environment" | Reusable stand-in for step 5 evidence. Synthetic |
| `switchboard-demo.jpg` | 1280×860, 108 955 | v0.3.1 browser demo (backlog SITE-015) | Accounts, dark, 10 fake accounts under `example.test`; no demo banner visible | Synthetic and safe, but old (0.3.1) and cut off; replace with the 0.6 shots below |
| `observatory-demo.jpg` | 1600×1000, 190 713 | about 2026-09-26 per its "Measured" line | Overview, dark, EN; projects `atlas-billing`, `orbit-agents`, `harbor-web`, `tern-cli`, `signal-docs.example` | Synthetic and safe, old (0.4-era layout). Reusable only as a stand-in |
| `dashboards-overview.jpg` | 1600×844, 94 263 | Fabric Dashboards 0.4-era demo ("started on build 0000000", dated 2026-10-06) | Six demo agents (Docs Writer, Release Bot, Support Desk, Research Notes, Calendar Helper, Data Sync), dark | Synthetic and safe; reusable for step 4 |
| `dashboards-service-dashboard.jpg` | 1600×844, 56 083 | same | One demo agent's page, dark | Safe but sparse; the console panel is not shown |

### In product repositories (all read from `origin/main`, extracted to a scratch folder, not copied into this repo)

| Image | Pixels, bytes | Build | Verdict |
|---|---|---|---|
| Fabric `docs/audit/2026-09-05-evidence/screenshots/onboarding-light-1280.png` | 1280×800, 47 391 | a 2026-09 audit fixture, not a released build | Shows the New project form (SCR-73 style), tab "Project A — Fabric", label "AUDIT FIXTURE", light. Synthetic. **Wrong build and wrong screen** (not SCR-70/74/75). Not for the site; useful as proof that the screen exists |
| Fabric `docs/handoffs/2026-10-04-onboarding-native-fixture-en-light-1x.png` | 2560×1800, 213 625 | CO-179 native test fixture, source-bound, 2026-10-04 | New project form with "Fixture one", top bar says "CO179 synthetic test fixture". Synthetic but plainly a test fixture, shows the test label, 0.3.2-era layout. Do not publish |
| Fabric `…-ru-dark-2x.png` | 2560×2000, 180 378 | same | Same, Russian, dark. Do not publish |
| Fabric `docs/reports/previews/first-run.jpg` | 475×276, 14 187 | design preview, not the app | Too small; a design mock ("Hello, I am Atlas") |
| Fabric `docs/evidence/plans/2026-10-04-hub-verification/iteration-1/shots/01-panel-full-en-light.png` | 1280×2263, 276 480 | Fabric 0.3.2 hub verification, 2026-10-04 | SCR-76 Agent access panel, light, only `example.com`/`example-agent` names. Synthetic and the only light Fabric shot of SCR-76, but a layout bug is visible (a column squeezed to one word per line); not publishable as is |
| Fabric `docs/evidence/plans/2026-09-09-provider-accounts/accounts-desktop.png` | 1440×1100, 144 367 | 2026-09 | Not reviewed in detail: superseded by Switchboard's own shots. Skip |
| Switchboard `docs/evidence/screenshots/accounts-0.6.12.png` | 2880×2400, 702 690 | v0.6.12, DPR 2, light, 1440×1200 CSS px, browser demo route `?demo=1` (provenance in `docs/runs/2026-10-08-release-0612/README.md#screenshots`) | Synthetic (accounts at `example.test`, banner "SYNTHETIC DEMO"). **Best reusable image for step 4**, light, 2×. Taller than 1280×800 (crop or re-shoot), build is 0.6.12 not 0.6.15 |
| Switchboard `…/accounts-0.6.13.png` | 2880×2400, 702 630 | v0.6.13, dark, same route | Same data, dark. Reusable for a dark variant |
| Switchboard `docs/evidence/design-0.4/*.jpeg`, `design-0.5/*.png` | not individually opened | 0.4, 0.5 | Older builds; skip |
| Dashboards `docs/images/overview.png` | 2880×1520, 215 701 | produced by `scripts/screenshots.ts` against the kit's sample services under neutral names (script header says so) | Safe, dark, 2×; same data as the site's JPG |
| Dashboards `docs/images/service-dashboard.png` | 2880×1520, 115 378 | same | Safe, sparse |
| Observatory `docs/runs/2026-10-03-audit-runs-release-0.13.0/walkthrough/live-0.13.png` | 1400×918, 414 681 | v0.13.0 native window, Russian, dark | **UNSAFE.** It is the operator's real estate: real domain names, real project and clone names, secret variable names and a local-path-style identifier appear in the findings list. Never copy, publish or crop. The sibling `signed-0.13.png` and the other walkthrough images in the same run directories (`docs/runs/2026-10-02-*`) are from the same live estate and are treated as unsafe without being opened |
| Inbox | none | | The repository has no screenshots (only DMG backgrounds); its UX docs have none. Nothing to reuse |

Summary: **safe to reuse now** (synthetic, checked): the three site Fabric JPGs, `dashboards-overview.jpg`,
`observatory-demo.jpg`, `switchboard-demo.jpg`, Switchboard 0.6.12 and 0.6.13 PNGs, Dashboards PNGs. **Not for the
site**: the Fabric audit and fixture images (test labels), the hub panel image (layout defect), the tiny first-run
preview. **Unsafe (privacy)**: the Observatory walkthrough images from live runs. None of the reusable images is
light **and** 1280×800 at 2× **and** from the current build, and no image of SCR-70, SCR-74, SCR-75, a coding agent's
console, or Inbox exists. That is why the shot list below is needed.

## 4. Shot list for W5

Common settings: window 1280×800 (points) captured at 2× (2560×1600 pixels), exported as JPEG quality 82 at
`assets/journey-<step>-<n>.jpg`; theme **light**; language **en**. Russian variants are written
`assets/journey-<step>-<n>-ru.jpg` (a naming extension to confirm in W6); every UI product has a Russian interface
(roadmap RM-25: Fabric 0.3.3, Switchboard 0.6.10, Dashboards 0.6.2+; Observatory and Inbox have an EN/RU switch).
Terminal shots are English only. A capture manifest records build, date, theme, language, seed and the
private-terms result for each file.

Neutral seed names (checked against the private-terms list: 0 hits): projects `acme-site`, `acme-mobile`,
`acme-support`; agents `release-notes-agent`, `support-triage-agent`, `docs-sync-agent`, `review-digest-agent`,
`calendar-helper`; accounts `team-a@example.test` and so on (Switchboard's demo already uses `example.test`).

| File | Step | Build | Screen | What must be on screen | Seed |
|---|---|---|---|---|---|
| `journey-1-1.jpg` | 1 | Launcher 0.1.31 | terminal | `npx @passioncode-ai/passioncode@latest update` finished, then `npx passioncode status` listing the members | throwaway user's home; prompt shows `demo@mac`, not the operator's |
| `journey-1-2.jpg` (+ru) | 1 | Fabric 0.3.3 (or 0.3.4 once released) | SCR-70 step 1 | "Hello, I am Fabric" step 1 of 3, name field and character | empty estate, name left default |
| `journey-2-1.jpg` (+ru) | 2 | same | SCR-70 step 2 | the coding agents list, with ready and not-installed rows | demo user has Claude Code installed, one other missing; paths shown are the demo user's |
| `journey-2-2.jpg` (+ru) | 2 | same | SCR-70 step 3 | four actions in two pairs | as above |
| `journey-3-1.jpg` (+ru) | 3 | same | SCR-74 | Create form filled: name `release-notes-agent`, sentence "Drafts release notes from merged pull requests", folder under `~/agents`, skills status "installed 0.8.1" | demo user |
| `journey-3-2.jpg` (+ru) | 3 | same | SCR-75, ready state | facts of a folder `legacy-reports-agent` (git state, stack), the four steps | a tiny synthetic git repo made for the shot |
| `journey-3-3.jpg` | 3 | same + Adapter 0.8.1, Claude Code | SCR-25 session window | the coding agent asking its first intake question of `creating-fabric-agents` | the 3-1 attempt |
| `journey-3-4.jpg` | 3 | Adapter 0.8.1 | console | the plan before the yes, or the conformance report ("what passed") for `legacy-reports-agent` on branch `fabric-adapter` | the 3-2 attempt |
| `journey-4-1.jpg` (+ru) | 4 | Switchboard 0.6.15 | SCR-01 Accounts | accounts in two pools, one in use, the "SYNTHETIC DEMO" banner visible (honest) | `?demo=1` demo data; re-shoot, do not crop the 0.6.12 PNG |
| `journey-4-2.jpg` (+ru) | 4 | same | Projects tab (SCN-025) | the project rule `acme-site` → one account | demo data has `alpha-web`; if the demo cannot be edited, accept `alpha-web` (neutral) |
| `journey-4-3.jpg` (+ru) | 4 | Dashboards 0.6.7 | SCR-01 Overview | strip, Needs attention, five agent cards | `scripts/screenshots.ts` sample services renamed to the seed agents |
| `journey-4-4.jpg` (+ru) | 4 | same | SCR-02 + SCR-10 | one agent's page with the Console panel open | sample service |
| `journey-5-1.jpg` (+ru) | 5 | Fabric 0.3.3 | SCR-41 Board | "What to work through now" with questions | `launch-estate.sql` with `-v lang=en` (Atlas, Studio, Signal, Orbit) |
| `journey-5-2.jpg` (+ru) | 5 | same | SCR-30 Estate home | rhythm of work, "Where you left off", live feed | same estate |
| `journey-5-3.jpg` (+ru) | 5 | same | releases with their basis | a verified release with "What went in", "Why", chain of confirmation | same estate |
| `journey-5-4.jpg` (+ru) | 5 | Observatory 0.21.0 | SCR-01 Обзор | findings strip and counters, light | synthetic registry (see §5) |
| `journey-5-5.jpg` (+ru) | 5 | same | SCR-04 project panel | one project's findings and sources | same |
| `journey-5-6.jpg` (+ru) | 5 | Fabric 0.3.3 | SCR-76 Agent access | one agent asking for access, Allow and Deny | demo agent `review-digest-agent`; fix the narrow-column layout first or shoot at 1280 wide |
| `journey-5-7.jpg` (+ru), optional | 5 | Inbox 0.13.0 | SCR-03 | an agent mailbox with 3 synthetic threads | local run only (see §5); skip if no clean run is possible |

Required count: **18 English + 15 Russian = 33 files** (steps 1, 3-3 and 3-4 are English only), plus **2 optional
Inbox files**. Step 6 has no screenshot; if the page needs a picture, make a diagram, never a capture.

## 5. Demo profile recipes

Principle: never launch a product against the operator's profile. Use a throwaway macOS user for anything that
shows a path, an installed coding agent or Keychain, and each product's documented fixture route for the rest.
All lines below were read from the sources cited; none was executed in this task (research only).

| Product | Recipe | Documented in |
|---|---|---|
| All desktop apps, the launcher and the consoles | A **throwaway macOS user** (System Settings → Users & Groups). A fresh home means no operator paths, no operator Claude Code or Codex sign-in, no Keychain items, and a home folder named `demo`. Install Claude Code (and a second agent only if a "missing" row is wanted), run the launcher, install Docker Desktop and the Supabase CLI for Fabric. Only the operator can create the user. | Fabric `SCR-70` elements list "path" per agent and `AgentPaths` shows the full folder path, so a real profile would print the operator's home |
| Fabric 0.3.3 | Fresh install from the DMG in the throwaway user. Database and stack live in `~/Library/Application Support/@fabric/desktop` (`docs/launch/release-mac.md:23`), so a new user is a new estate. For a non-empty home, board and releases: apply the demo estate with `psql "$DB_URL" -v ON_ERROR_STOP=1 -v estate=<new uuid> -v lang=en -f scripts/fixtures/launch-estate.sql` (use `lang=ru` for Russian), "never from an estate a walk has already written into" (`docs/launch/release-mac.md:103`, release step 8; the file's header says its fixed id is never the operator's). First run is shown on an empty estate, or via Help → Walk through the first run again. The CO-179 fixture host (`apps/desktop/test/onboarding-visual-native-harness.mjs`, scenarios `balanced`, `none`, etc., locale en/ru, theme light/dark, zoom 1/2, width and height) is a test-only host for the New project form (SCR-73); it does not render SCR-70, 74 or 75, so it cannot replace the real app for those. I found no documented `--user-data-dir` or `FABRIC_HOME` override for the packaged app; do not assume Electron's flag works with Fabric's own stack. | Fabric release-mac.md steps 8; fixtures header; harness `DEFAULT_CONFIG` |
| Adapter skills and consoles | Same throwaway user; `npx @passioncode-ai/passioncode@latest update`; create the seed git repo `legacy-reports-agent` with a trivial script and no secrets. Do not run the skills against any real repository. | launcher README; ADR-0129 decision 3 (commits a non-repo folder first) |
| Switchboard 0.6.15 | Browser demo: `npm run dev`, then `http://127.0.0.1:1420/?demo=1`; no real accounts, vault, network or terminal; changes reset on reload. Source: the synthetic fixture in `src/demo.ts`. Capture in Safari (WebDriver window rect 1280×800, device pixel ratio 2); the 0.6.12 shot was made with DevTools in Chrome at DPR 2 and the quota-order doc used native Safari. The native app must not be used: it reads the real Claude Code and Codex sign-in. | Switchboard README line 152 at v0.6.15; `docs/runs/2026-10-08-release-0612/README.md#screenshots`; `docs/evidence/quota-order-2026-10-04.md` |
| Dashboards 0.6.7 | Separate profile: `FABRIC_DASHBOARDS_USER_DATA=/tmp/fd-demo`; `scripts/screenshots.ts` registers six sample services (neutral names) and one degraded, one stopping, then captures. Edit the AGENTS array to the seed names; keep `FD_SKIP_LAUNCHD` for no login session. Quit the installed app first, or the checkout only brings its window forward. | Dashboards README lines 91 and 143-145; `scripts/screenshots.ts:20` at v0.6.7 |
| Observatory 0.21.0 | A separate data home: `OBSERVATORY_HOME=<temp dir>` (documented as the data directory variable; the engine's README and its MCP registration use it). Then register only synthetic repositories. **No documented demo mode exists**: the backlog item for a synthetic estate (PB-078) is cancelled, and its backlog says the demo must not mix with live data. So the recipe is unproven: it needs an owner check before W5, and a check that the engine does not also discover projects outside the temp home (not verified here). Safest is the throwaway user, with the synthetic repos as its only projects. | Observatory `docs/BACKLOG.md` (PB-078, line 46; the demo and public-package lines near 573 and 711); `docs/DECISIONS.md` |
| Inbox 0.13.0 | Needs a mail provider (Cloudflare or Gmail) for the desktop app. The only documented synthetic route is local: run the worker locally and post a message at `http://127.0.0.1:5174/cdn-cgi/handler/email?from=a@example.org&to=support@<domain>` (README line 156). That gives mail but not a full desktop-app state; mark 5-7 optional. | Inbox README at v0.13.0 |

### Only the operator can do

1. Create the throwaway macOS user and sign in once to install Docker Desktop (a licence and admin step).
2. Install Claude Code in that user and choose, without signing in to any real account, whether the shot needs a
   signed-in state (it should not: Fabric shows sign-in as an informational line).
3. Decide Fabric 0.3.3 versus waiting for 0.3.4, because the 0.3.4 universal DMG changes the download text and the
   screens may shift; shoot after the release if the date is near.
4. Approve the Russian shots' wording (ru glossary: "evidence" and "skills" are open W1 decisions).
5. Permission for any capture of a real project even as a "before": none is planned; the shot list uses seed data only.
6. Optional: enable Safari automation (`sudo safaridriver --enable`, once) for the Switchboard and Observatory browser
   shots.

## 6. Handoff

- Objective: W4 truth table. Completed: this document, measured at the tag commits above.
- Open: W5 captures (§4), a refresh of the stale facts rows (§1 correction 6), an owner check of the Observatory demo
  recipe (§5), the launcher's observatory-log pin.
- Decisions needed: D1 of the plan is unaffected; the Russian file naming (`-ru` suffix); whether 5-7 stays.
- Checks actually run: `npm run check` in this branch (result in the pull request); private-terms script over all
  transcribed image names (0 hits, except the unsafe Observatory walkthrough image); every cited path resolved with
  `git show <tag>:<path>`.
- Exact next task: W5 step one, create the throwaway macOS user and take `journey-1-1.jpg` and `journey-1-2.jpg`.
