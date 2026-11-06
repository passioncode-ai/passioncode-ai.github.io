# Task brief: passioncode.ai repositioned on the North Star (2026-11-06)

- **Date:** 2026-11-06
- **Task (one line):** reposition passioncode.ai as the workplace for AI-native organizations, on the PassionCode North
  Star: a new story below the kept header, a new home video, funnels for four audiences, analytics, ten languages,
  nothing broken.
- **Source of the request:** the operator, fabric-workspace session `74a9440a`, 2026-11-06 (two messages, quoted in
  *Decisions locked*). Roadmap tracks: RM-31 and RM-32 (distribution and tiers, public copy), RM-10 (managed
  administration), as public copy only; no product behaviour changes.
- **UI verdict:** yes. The stage-3 UX track (super-ux) is armed.
- **surface_class:** `flagship` (the home page and its video are what the company is judged by).
- **Model:** the session's model, the most capable available (Opus 5.5, 1M context); subagents inherit it.
- **Run mode:** loop off (no `pipeline.json`, no standing loop instruction for this repository).
- **Branch and worktree:** `site/ai-native-org` in `~/DATA/_worktrees/site-ai-native-org`, from `origin/main` `e753360`.

## Knowledge sources

| Source | What it says about this task | Fresh? | Authority | Stale after this run? |
| --- | --- | --- | --- | --- |
| fabric-workspace `knowledge/north-star.md` (main `6b7cd777`) | the story the site must tell: the problem of person-shaped processes, people as direction, controller and expert, Fabric as process manager and its board, one system, examples and loops, standing up from head machines, the measure; every claim about today carries its status | 2026-11-06 | decision (the operator's) | no |
| fabric-workspace `knowledge/vision.md` | «Public copy never describes assessing people»; our unit is the agent, never the person | 2026-11 | decision | no |
| fabric-workspace `knowledge/roadmap.md` SD-1, SD-2, SD-3 | partners are the main channel; ladder Free, Personal cloud $99, Organization $599, Enterprise from $2,000 with onboarding and one agent; paid only as cloud | 2026-10-19 | decision | no |
| `docs/brand/` (voice, terminology, facts, narrative, narrative-org, strings) | the voice and banned words («savings» banned), facts rows with receipts, the organization message house | 2026-10 | convention | **yes: narrative, facts, terminology** |
| `docs/ux/` (foundation, flows, screens, scenarios SCN-001 to SCN-022) | the visitor paths; SCN-001, SCN-013, SCN-014, SCN-020, SCN-021 are the ones this run rewrites | 2026-10-15 | convention | **yes** |
| `docs/video/2026-10-12-home-v2/` | the current home video v3: harness `gen3.py`, cues measured from transcripts, narration en and ru through Asset Foundry, captions in ten languages, `check-site.mjs` expects the last caption between 78 and 98 s | 2026-10-14 | evidence | **yes: superseded by a new video folder** |
| `docs/DOCMAP.md`, `docs/DEPLOYMENT.md` | propagation: HTML, catalogs (`npm run locales`), projections, UX, sitemap, allow-list, handoff; deploy from reviewed main with `npm run deploy`, then `scripts/verify-live.py` | 2026-10 | convention | no |
| `AGENTS.md` | public repository: nothing private; never link private repositories; guarded files under agent-sync lease | 2026-10 | convention | no |
| `docs/HANDOFF.md`, `docs/backlog.md` | last task SITE-048 live; next SITE-040; next free id SITE-049 | 2026-10-15 | ledger | **yes** |
| sshlg-growth (`growth_apps_list`, 2026-11-06) | no app for passioncode.ai; `sshlg-me` is a website app already counted (an `iid` per page load) | 2026-11-06 | as-built | no |
| sshlg-analytics-agent `docs/guidance/events.md` | the event rules (names never change meaning, a catalogue per project) | 2026-10 | guidance | no |
| operator rule `global-24.md`, `global-25.md` | analytics events keep their history; product text checked and translated through Copylot | 2026-10-25 | operator | no |
| retro / lessons | none in this repository (`docs/evidence/retro.md` absent) | n/a | n/a | no |
| code graph, wiki | no graph built for this repository; wiki project page not consulted | n/a | n/a | no |

Contradictions: (1) the hero H1 says «operating system for AI-native teams» while the requested positioning is «the
workplace for AI-native organizations»: the operator also said the header stays; resolved in D2. (2) The About section
names the founders' companies; the North Star never names the pilot organization: the founders' biography stays, and
no page says that any named company runs on PassionCode (D7).

## Documentation

| Question | Answer |
| --- | --- |
| Regime | governed, already in place (`docs/DOCMAP.md`) |
| Decision home | the task file in `docs/tasks/` and `docs/brand/` decisions sections (existing convention) |
| Doc map | `docs/DOCMAP.md` |
| Gate | `npm run check`, `npm run build`, `python3 scripts/extract-public-copy.py --check` |
| Shared state | agent-sync lease on `docs/brand/facts.md`, `docs/HANDOFF.md`, `docs/backlog.md`, `docs/backlog-sources.json`, `switchboard/release.json` |
| Intent vs as-built | reconciled 2026-11-06: the live site is `main` `e753360` (SITE-048 deployed); no divergence found |

## Scope

- **In scope:** the home page below the header (story, sections, doors, CTAs, FAQ); the home video (new script,
  narration, composition, captions, poster); `/vision/` (states the North Star in public words); `/business/`
  (organizations: tiers, Enterprise with managed administration, the request); `/start/` as the engineers' and solo
  founders' door; analytics (app in growth, events, catalogue, funnels); the brand pack, UX docs, `llms.txt`,
  sitemap and JSON-LD; all ten languages.
- **Out of scope:** product pages (`/fabric/`, `/switchboard/`, `/inbox/`, `/dashboards/`, `/observatory/`) beyond
  links and one shared vocabulary; the Worker's download routing; any product behaviour; naming any customer.

## Requirements

| REQ | Requirement | Verified by |
| --- | --- | --- |
| REQ-01 | The header stays: the navigation and the hero's H1 unchanged (D2) | diff of the header block; browser screenshot |
| REQ-02 | The home story below the header follows the North Star: problem, shift, Fabric as process manager, one system, how agents work together (diagram and loops), from a team to an organization that clones and scales, what runs today, offers, FAQ | spec section map against `north-star.md` sections; copy review |
| REQ-03 | Four doors with their own next step: founders and executives, investors, engineers, solo founders | scenarios; browser walk of each door |
| REQ-04 | A new home video, about 90 s: the pain, the shift, Fabric's board, agents at work, an old team becoming an agentic organization, cloned and scaled; diagrams and agents; narration en and ru, captions in ten languages; media through Asset Foundry | video record folder with provenance; `check-site.mjs` caption bounds updated; playback in a browser |
| REQ-05 | Onboarding and conversion funnels written down: home to `/start/` (setup command) and home to `/business/` (request), per door | `docs/ux/flows.md`; analytics funnel definitions |
| REQ-06 | Analytics: an app for the site in growth, events instrumented without cookies or personal data, an event catalogue with `file:line`, the funnels queryable | growth `events.list` shows the events from the preview or production; catalogue file; privacy page updated |
| REQ-07 | Copy: Copylot rule check passes in every locale with the saved voice; brand pack updated; no unmeasured number, no description of assessing people, no named customer; no em dash | Copylot report ids in the task file; grep checks |
| REQ-08 | Ten languages generated from catalogs and reviewed; translations as Copylot adaptations within the spend limit | `npm run locales`; report ids |
| REQ-09 | Nothing breaks: WebKit and Chromium at 390, 768 and 1440 px, every language of the changed pages, no overflow, no console error; flagship visual gate with a contact sheet | browser record and contact sheet |
| REQ-10 | Search and answer engines: a brief before build and an audit after; `llms.txt`, sitemap, JSON-LD (video, FAQ, organization) updated | `seo-aeo-audit` outputs |
| REQ-11 | `/vision/` and `/business/` aligned with the North Star (the measure, the principles in public words; tiers and managed administration) | copy review against the sources |
| REQ-12 | Gate green: `npm run check`, `npm run build`, `extract-public-copy.py --check`, CI on the PR | exit codes |
| REQ-13 | Production deploy only after the operator's go; `verify-live.py` passes after it | the go quoted; live record |
| REQ-14 | Docs in the same change: UX scenarios, flows, screens; brand facts and narrative; DOCMAP propagation; HANDOFF; backlog row SITE-049 | DOCMAP walk; `npm run check` |

## Finish line

Exit checks green on the preview the operator opens (REQ-12, REQ-09), two verification rounds with no blocking finding,
the operator's go, production deploy, `verify-live.py` PASS.

## Users and context

Founders and executives deciding how their company works with agents; investors judging the thesis and the team;
engineers and solo founders who install the open-source tools today. They arrive from social posts, the founders'
networks, partners and search; most read on a phone first.

## Decisions locked

- **D1. Positioning.** «The workplace for AI-native organizations»: processes run by agents, managed by Fabric, people
  as direction, controller and expert (operator: «это рабочее место для AI Native»; «процессы должны менеджиться не
  людьми, а агентами»).
- **D2. The header stays** (operator: «вся шапка у нас как бы классная остается»): navigation and hero H1 unchanged;
  the positioning lives in the subline and the sections below.
- **D3. The video** is replaced, short, with diagrams and agents; it tells how an old team becomes a new organization,
  is cloned and scales (operator: «рендерим новое видео [...] как из старой команды создается новая организация, потом
  она клонируется, масштабируется»). Narration en and ru as in v3; the other eight languages get captions.
- **D4. Tone:** professional, enterprise and investor grade, no filler, sellable, clear to engineers and solo founders
  (operator: «более профессиональный, такой типа интерпрайзный [...] инвесторский»).
- **D5. Analytics** through the operator's growth service (operator: «шелик аналитикс»), cookieless, no personal data,
  an event catalogue kept with the code (operator rule 2026-10-25).
- **D6. Claims:** the North Star's gains are targets and are written as such; numbers only with a receipt; what runs
  today is said with its status; the assessment is described on processes and agents, never on people (vision.md).
- **D7. No customer is named.** The pilot organization stays unnamed; the founders' biographies stay as they are.
- **D8. Prices** are the public tier prices of SD-3; Enterprise adds ongoing administration by PassionCode (operator,
  2026-11-06, North Star §12; G24 tracks the pricing record).
- **D9. Deploy** of the public site waits for the operator's one go (operator: «Production deploy of the public site
  is gated»; global rule: production with real users).

## Autonomy

| Stage | Answer |
| --- | --- |
| 1 Docs | read the North Star, brand pack, UX chain, video v3 record, growth runbook, analytics guidance; no network docs needed beyond Cloudflare Workers already in use |
| 2 Brainstorm | sections and doors decided by the agent from D1 to D8; the narrative house written into `docs/brand/narrative.md` |
| 3 Spec | super-ux chain updated (scenarios first), copy (copywriting, Copylot), visual (sheleg-design director record for a flagship) |
| 4 Plan | work graph: copy and UX, video, analytics, languages, SEO, verification |
| 5 Dev | edit English pages and catalogs only; generated pages through `npm run locales` |
| 6 Tests | `npm run check`; browser walk in WebKit (Safari, Playwright webkit) and Chromium headless with a temporary profile |
| 7 Deploy | preview (`npm run preview`) without asking; production `npm run deploy` only after the operator's go (D9) |
| 8 Post-deploy | `scripts/verify-live.py`; open the live pages in Safari |
| 9 Docs | DOCMAP propagation; wiki reports catalog if a report is written |
| 10 Acceptance | every REQ with evidence; HANDOFF; retro stamp |
| Spend | Asset Foundry (narration, music, renders) and Copylot within the estate limits; expected under $15 in all |

## Open assumptions and risks

- A1: the analytics endpoint for a static site follows the pattern growth already counts for `sshlg-me` (a per-page
  `iid`); confirmed at stage 1 against the growth runbook.
- R1: a new video in ten caption languages is the longest step; the old video stays live until the new one passes.
- R2: copy for investors can drift into claims; every claim is checked against the North Star's «Where we stand».
