# Narrative, tone of voice, localization, product journey and video — plan (2026-10-10)

Operator request (2026-10-10, translated from Russian):
- Work out the localization with our Copylot agent. English and Russian are worked out first; every other
  language is translated **from English**, and Chinese gets a track of its own.
- Work out the tone of voice and the narrative so that every language reads as good copywriting.
- Assess what is on the site now, and assess the narrative: what we want to say.
- Add the products and their screenshots to the site, and show how the whole system works:
  1. how you enter;
  2. onboarding through Fabric;
  3. creating an agent, or turning an existing one into a Fabric agent;
  4. improving it, then making more agents;
  5. how they interact, and how the whole thing grows and automates itself.
- Ideally, a video for the home page that explains all of this.
- Decompose the work, send some of it to agents, do some ourselves, and keep updating the site until it is final.

Backlog row: [SITE-028](../backlog.md). Hero rule: the home hero stays verbatim (operator, 2026-10-09 and
2026-10-10) unless the operator lifts it in this plan's decision D1.

## 1. What is there now (assessment, 2026-10-10)

Measured on `main` at `4d457db` (the simplified site, PR #80).

### Copy quality: deterministic Copylot check

Copylot report ids: `787b9ed0-d79d-446d-aa50-a955dff579e3` (en) and `a67a1d8b-bea1-43ef-a510-f351dacd0451` (ru).
These are deterministic rule checks, run with no model.

| Page | Check | Score | Findings |
|---|---|---|---|
| home, en-US | `copylot.check`, register `marketing` | 100, pass | 3 × rule of three (`en-rule-of-three`). 0 clichés per 1 000 words (baseline 1,5) |
| home, ru-RU | same | 100, pass | 20 × missing no-break space after a short word (`ru-nbsp-short-word`, safe patches offered), 3 × rule of three, 6 × "AGPL" flagged as all caps (a false positive for a licence name). 0 clichés per 1 000 words (baseline 2) |

Not run, because Copylot's generation model is not connected:
- `native-naturalness`, whether the language reads as native;
- `claim-evidence`, whether facts are proven.

The other eight languages have not been checked by any tool or person (SITE-026).

### Narrative

Our reading, using the `copywriting` doctrine of the super-ux skill family:

| # | Finding | Where |
|---|---|---|
| N1 | Three promises compete, and none of them leads: "the agent-agnostic operating system for AI-native teams" (hero), "build your own workplace for AI agents" (meta, intro), "do what you love — agents take the rest" (`knowledge/vision.md`, voice.md). The hero is fixed, so the rest has to line up under it. | `index.html` hero and meta, `docs/brand/voice.md` |
| N2 | The vocabulary is inside-out. "Harness / обвязка", "health / здоровье", "evidence / подтверждения", "family" and "CEO AI agent" need the reader to know our model already. Russian makes it worse with calques ("скилы", "обвязка (harness)"). | home §Why, /vision/ |
| N3 | The site tells and does not show. It has no journey from entry to a working set of agents. Screenshots appear only on product pages (`assets/fabric-home.jpg`, `fabric-board.jpg`, `dashboards-*.jpg`, `switchboard-demo.jpg`, `observatory-demo.jpg`), one per product, and none of them shows onboarding. | home §Tools, product pages |
| N4 | The product list is six one-liners. A reader cannot map a product to a step of the work. | home §Tools |
| N5 | The central product is Fabric, but its conversation does not reply yet, which is why the copy hedges. Fabric 0.3.3 does ship the four onboarding actions (Fabric ADR-0129), so that real flow can be shown instead of hedged: create an agent, adapt an agent built elsewhere, open a project, create a project. | Fabric ADR-0129, /fabric/ |
| N6 | The organization offer (/business/) is still 941 words, 425 of them the form. Only a reader who already wants it would read on. | /business/ |
| N7 | The eight machine translations have open wording questions (SITE-026): a blunt "agents rot", "health", "gate", and fragments around links in ja/zh/ko. | `i18n/*/` |

What is good and stays:
- honest boundaries (preview, direction, available now);
- one home per fact (`docs/brand/facts.md`);
- local first and open source;
- short pages after PR #80.

### Copylot readiness

Copylot is a personal agent of the operator. It is used internally as our copy tool and is never named on the
site.

| Capability | State 2026-10-10 | Needed for |
|---|---|---|
| `copylot.check` (deterministic: plain-English, Russian infostyle and typography; other locales get only language-independent rules) | works, no charge | every page gate |
| Tone of Voice: `voices.draft` and `voices.save` (no model, no charge) | works. Two voices exist (Sergey's personal voice, Nicegram support), neither is the PassionCode.ai voice | W2 |
| `copylot.write` / `copylot.prepare` (generation) | **off**: "no generation model connected". Live mode is OpenRouter through `use_secret.py run` (Copylot `docs/runtime/README.md`, live catalog: writer tiers opus/sonnet/flash, a translation tier, and a judge from another family) | W7, W8, W9 |
| translate as its own call | none; a translation is a `write` with a brief | W8, W9 |
| batch check / apply patches | missing (Copylot backlog AU-09) | convenience, not blocking |
| `zh-Hans-CN`, `ja-JP`, `ko-KR` and the other site locales | in the locale list | W8, W9 |

## 2. The narrative we want: message house, to be approved in W1

- **Promise** (hero, verbatim): the agent-agnostic operating system for AI-native teams. You build a workplace
  where agents do the work, and you see all of it.
- **Problem**, in one beat and in the reader's words: agents you set up fall apart. Their accounts are
  scattered, they forget, nobody can tell what they did, and they do not work together.
- **The journey**, shown with one screenshot per step:

  | Step | What the reader sees | Tools on screen |
  |---|---|---|
  | 1. Enter | install with one command; Fabric opens | launcher, Fabric |
  | 2. Onboard | Fabric's four actions | Fabric 0.3.3 |
  | 3. First agent | create one, or adapt one you already have, in Claude Code or Codex | adapter skills |
  | 4. Grow | more agents; each with its own accounts, limits and dashboard | Switchboard, Dashboards |
  | 5. Work together and watch | agents talk and hand work on; you see what changed, with evidence | Observatory, Fabric board, Inbox |
  | 6. Organization (direction) | the same thing across a team's machines | PassionCode for Enterprise, /business/ |

- **Three proofs:**
  1. it runs on your machines, as open source under the AGPL-3.0;
  2. it works with the agents and subscriptions you already have;
  3. every step leaves evidence you can open.
- **Voice:** one builder to another. Concrete, short, honest about what is preview. No hype words.

  The words we own are a W1 output, kept in `terminology.md` and `docs/brand/narrative.md`:
  - whether "harness" stays on the page, or is shown and named once;
  - "evidence", rendered in Russian as «следы работы» rather than «подтверждения»;
  - "skills", rendered in Russian as «скилы» or «навыки» — the operator decides in W1.

## 3. Workstreams

| ID | Workstream | Owner | Depends on | Output | Done when |
|---|---|---|---|---|---|
| W1 | Narrative and message house; per-page job; words we own/ban | us (copywriting) → operator approves | — | `docs/brand/narrative.md`, `voice.md` and `terminology.md` updates | operator approves the narrative |
| W2 | PassionCode.ai Tone of Voice in Copylot. Contents: en-US primary, ru-RU overlay, overlays for de, fr, pl, ko, es, pt-BR, ja; lexicon with product names marked do-not-translate; bans; good and bad examples from the live site | agent | W1 draft | private voice v1 (`voiceId` recorded in `voice.md`) | `voices.get` returns it; `copylot.check` with `voiceRef` runs on the home page |
| W3 | Copylot live generation for this work: OpenRouter live mode under `use_secret.py run`, a spend cap, the translation tier | Copylot owner session (coordinated); operator approves spend | operator D2 | `copylot.write` answers without `execution-disabled` | a probe write in en-US and ru-RU under the cap |
| W4 | Product journey truth table: per step, what exists in which release, the owning repository, and what can be screenshotted today | agent (read-only) | — | `docs/tasks/2026-10-10-journey-truth.md` | every step marked available, preview or direction, with a file:line or release link |
| W5 | Screenshots of the real products on a clean demo profile with synthetic projects and agents. Not one private agent, project, path, account or e-mail may appear. Shots: Fabric onboarding (SCR-70, -74, -75), the coding agent's console running the adapter, Dashboards with 3–5 demo agents, Switchboard accounts, Observatory changes, the Fabric board. Light theme, 2×, en (and ru where the product has Russian) | agent + operator (demo profile) | W4 | `assets/journey-*.jpg`, a capture manifest (build, date, privacy check) | privacy review passes; each image names the build it came from |
| W6 | Site structure and look. Contents: a home "How it works" section (the journey, one image per step); product pages with 2–3 screenshots each; the home video slot; scenarios, screens and flows updated | us (super-ux scenarios, sheleg-design) | W1, W4 | page structure in `docs/ux/`, HTML and CSS | 390 px and 1280 px pass, scenarios updated in the same change |
| W7 | English and Russian copy, each written natively rather than translated from the other, in the W2 voice | Copylot `prepare` (when W3 is live) + us; otherwise us + `copylot.check` | W1, W2, W6 | `*.html` (en), `i18n/ru/*.json` | `copylot.check` en and ru: no blocking findings, ru no-break-space patches applied, rule-of-three reviewed; the operator reads ru |
| W8 | de, fr, pl, ko, es, pt-BR, ja translated **from English** with the W2 voice and its locale overlays, then checked | agents driving Copylot (`write` with a translation brief) | W3, W7 | `i18n/<code>/*.json` | locale gate green; `copylot.check` per locale; wording questions logged for SITE-026 |
| W9 | zh-Hans as a separate track. It covers:<ul><li>a transcreation brief of its own;</li><li>a Chinese glossary;</li><li>Chinese norms: full-width punctuation, no spaces around Latin, `tightenCjk`;</li><li>a Chinese-only reviewer.</li></ul>It also checks site access from China: the Worker plus Google Fonts and GitHub download links. | agent + reviewer (D4) | W7 | `i18n/zh-hans/*.json`, an access note | reviewer sign-off or SITE-026 row |
| W10 | Home video, 60–90 s, 16:9, built on the real W5 screenshots. Script (en, ru) → storyboard → Asset Foundry `video-authored` (HyperFrames through Frame Agent) → voice-over en (+ru) → subtitles in all 10 languages → poster. Self-hosted, captions on, never autoplays with sound | Foundry / Frame Agent + us (script) + operator (voice, D3) | W5, W7 | `assets/video/*` and a manifest | the operator approves the cut; the page ships with poster, captions and a reduced-motion fallback |
| W11 | Release: gates, `npm run deploy`, `verify-live.py`, SEO/AEO audit, native-speaker review per language | us | all | live receipt, `docs/evidence/…` | verify-live PASS; SITE-026 rows per language |

Critical path: W1 → W2 → W7 → W8/W9 → W11; W4 → W5 → W6/W10 runs beside it. W3 gates generation-based W7, W8 and
W9; if it stays off, W7 is written by us and W8 by agents with `copylot.check` as the gate (the way PR #80 was
done).

## 4. Decisions for the operator

| ID | Question | Recommendation |
|---|---|---|
| D1 | Does the home hero stay verbatim while the narrative is reworked? | Yes. The narrative lines up under it, and only meta and intro lines change |
| D2 | Turn on Copylot live generation (OpenRouter) for this work, under a spend cap | Yes, cap $30 for all site copy and translations |
| D3 | Video voice and length | An AI narrator voice (ElevenLabs via Foundry) in en and ru, 75 s, 16:9, subtitles in 10 languages |
| D4 | Who reviews Chinese | A paid native reviewer for zh-Hans, and community reviewers for the rest (SITE-026) |

## 5. Constraints

- Every public claim needs a row in `docs/brand/facts.md`; preview and direction stay marked.
- Screenshots and video show synthetic data only. Nothing on the site may name a private agent or project, or
  show a private path, account, e-mail or key. The private-terms denylist is grepped on every diff.
- The video is media, so it goes through Asset Foundry. Screenshots are captured from real builds, never
  generated.
- Product names stay English in every language. Every disclosure in `i18n/<code>/_checks.json` stays.
