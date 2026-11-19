# SITE-068 v6: the backstory, the big chat, the story of sync and escalation, the lead magnet

Owner: fabric-workspace session (SITE-068). Branch `site/story-morpheus`, host assessment.passioncode.ai (noindex).
Earlier: `2026-11-18-story-landing-v5.md`. Script: `story/v6-script.json` (every line shown or spoken).

## 1. What the operator asked (2026-11-19, verbatim excerpts)

- Film: «в фильме эту мусорку котора едит сзади героя уберем и офис в конце когда переходим в другой стиль видео надо
  типо как будто матрица проглючила такой эффект добавить».
- Landing: «когда первый раз попадаешь на сайт, ты сразу же не видишь шапку [...] белый кролик прискакивает [...]
  Морфеус [...] выдает таблетку [...] когда ты хочешь проснуться, идешь видео смотреть. А если идёшь [...]
  разбираться, [...] сначала Морфеус должен показать видео [...] предыстория [...] И дальше переходим в чат [...]
  большой чат на экране [...] тринити озвучку добавить, задержки, тайминг [...] при скролле листалось как одна
  история [...] Этот скроллинг адаптивный под историю, под длительность».
- Story: «не раскрыта идея, как работает [...] Синхронизируйся с агентом [...] как это развивается эскалации [...]
  почему релиз не вышел [...] Я провел ассессмент, мы изучили активность агентов [...] в конце уже анбординг [...]
  в чат».
- Bot: Morpheus bot as a lead magnet (onboarding, leads into the CRM and the PM agent, snapshots, replies in his tone
  of voice, pre-recorded voice messages). Owned by passioncode-pm-agent: board request `bbd742b6` (thread `b4a26491`).
- Layout: «комикс сейчас маленький на декстопе, он должен быть большим [...] Ужимаемся на телефоне [...] без всяких
  лишних анимаций [...] фильм [...] сделай поворот, чтобы был повернут правильно плеер [...] подписаться [...] в
  Morpheus чат [...] Twitter [...] LinkedIn».

## 2. Decisions

- D1. Blue is «Пробуждение» in its loop; red is «Предыстория», then the big chat, the comic and the end. The film's
  end card red goes into the backstory too.
- D2. No header on arrival: the bar turns transparent with only the language and sound switches (v6.css
  `intro-state`); the full header returns after a pill.
- D3. The story's facts come from the PM agent's playbook (07:00 check-in, the three buttons, the ladder, the 21:00
  founder report) and the assessment engine (wait shares, copy median 9.8 days, 60 to 85% of a week's work outside the
  plan); the bar shares are marked illustrative.
- D4. Voice: Morpheus and Trinity in RU and EN (Asset Foundry `speech-line`). Trinity is ElevenLabs Matilda
  (`XrExE9yKIg1WjnnlVkGX`), picked by two audio models over Alice and Sarah (`trinity-voice.json` in the tools
  folder). The other eight languages read the text without voice.
- D5. Panels are still and big (no entrance animation); the pager still turns one frame per gesture and holds for a
  line. Kept from v5: the Matrix blocks, the departments, the P&L, the live dashboard.
- D6. Morpheus addresses the reader as «ты», as his saved Copylot voice `861f15ee` v1 says; the bot's voice messages
  use it too.
- D7. The film turns to landscape on a phone held upright (CSS rotation; `screen.orientation.lock` where a browser
  allows it).

## 3. State (2026-11-19 07:50 CET)

| Item | State | Evidence |
|---|---|---|
| Shot 07 redrawn without the post | done, in the cut | `story/film/shots.py` v2 block, Foundry `job_01M7S46VSJR4N89RRH0RPTM5VP` |
| Matrix glitch at the cut into the future office | done, in the cut | `story/film/glitch.py`, sound `f-glitch` (take 2, two judges) |
| Backstory shots B1 to B8 | delivered | `story/film/backstory.py`, `film-pick-v6.log` |
| Backstory shot B9 | redrawing (v3 wording after a content-check refusal) | `job_01M7S82BQC42J303ETAV1PSH5V` |
| Voice lines | 24 page lines and 18 backstory lines picked, each transcript-checked | `story/comic/audio/vo/`, `vo-verdicts6.jsonl` |
| Copylot | RU 50 and EN 48 strings, no blocking finding | batch reports `1b30e35f`...`bf748bf1` (EN) and the RU batch of 07:2x |
| Page v6 | built, checked at 1440 and 390 in Chrome | `scripts/comic-markup.py`, `story/comic/comic.js`, `story/comic/v6.css` |
| Bot dissolve animation, voice messages | made | `story/film/morpheus-dissolve.mp4`, `story/bot/` |

## 4. Delivered (2026-11-19 09:00 CET)

| Check | Result | Evidence |
|---|---|---|
| Backstory film | 50.4 s, RU and EN, every line on its shot | `story/film/backstory-timeline.json`, commit `a6481402` |
| Full check, local | 39/39 | `scripts/e2e/story-matrix.mjs` against dist-assessment |
| Deploy | Worker version `4b2f619e-fe90-42ef-9668-c7639f0b0b72` | `wrangler deploy -c wrangler.assessment.json` |
| Full check, live | 39/39 | the same script against https://assessment.passioncode.ai |
| Safari, live | intro, backstory (50.4 s, no media error), end link pass; leafing not measurable there: the automation window is hidden and gets one animation frame in 2 s | `safari-v6.py` in the tools folder |
| npm test | 136/136 | |
| Morpheus in the team chat | message 97, text mentions of both founders | Copylot `eaa0f8a2` |
| Bot media to the PM agent | board message `04c359c5` on thread `b4a26491` | |

## 5. Open, blocking nothing

- The bot side of the lead magnet is the PM agent's (request `bbd742b6`); until it ships, «Написать Морфеусу» opens
  the bot, which answers a stranger with its present waiting reply.
- A person checks leafing in a visible Safari and on a real phone.
- The mix of both films on headphones (Fabric task `29fb8216`).

## 6. v6.1 (2026-11-19, 11:10 CET): voices, tracking, the cleanup wave

The operator: «голос сео и агента смита в комиксе нет проработай, фильм хороший все гуд, переход за кроликом и переход
потом по сайту и в бота надо трекать и продебажить и еще волну запустить по анимациям таймингу UI нейрослопу и
вычистить все».

| Item | Result | Evidence |
|---|---|---|
| CEO, Smith, Neo voiced (RU, EN) | Brian, Daniel, Liam, picked by two audio models (a third on the CEO tie); 8 takes transcript-checked | commit `4abe57b6`, `cast/` in the tools folder |
| Story tracking | `story_choice`, `story_film`, `story_progress` (chat, p1..p11, final), `cta_click` to Morpheus, X, LinkedIn, via the assessment Worker's `/api/e` | `worker/analytics.js`, `story/comic/track.js`, `docs/analytics/events.md` |
| Tracking, live debug | a walk of the live page queued 20 events; growth `passioncode-site` production shows the same counts, no duplicates (13 steps, 3 clicks) | `track-live.mjs` in the tools folder; the two test sessions of 2026-11-19 09:4x to 09:5x UTC are the agent's |
| Bot side of the funnel | asked of passioncode-pm-agent: count `/start lp_assessment_*`, send `lead_sent {page: story, path: telegram}` per confirmed lead, skip test starts | board message `92b372d1`, thread `b4a26491` |
| Cleanup wave | all 25 stops shot at 1440 and 390; reviewed by Gemini 3.1 Pro over contact sheets and by our own pass; fixed: «ты» on the landing (three RU lines re-voiced and transcript-checked), bridges between frames removed, a plate under the film's end card, less glow, P&L marked illustrative and enlarged, departments readable on a phone | commit `a603f004`, `ui-critique.py` |
| Regression found and fixed | a markup run after the translations dropped the language switch; the build now refuses such a page | commit `daf7b37e` |
| Copylot | new RU strings clean of blocking findings | reports `516c2426`, `5791c070`, `9ad6c338`, `d36a7e72`, `29103696`, `72d4e8c1`, `a1d8afc8`; EN `e6b37c01` |
| Deploy | Worker version `6e8d2a74-fb5e-49b6-ae13-9d9ead404465`, secret `ANALYTICS_APP_KEY` set from the vault | `wrangler deploy -c wrangler.assessment.json` |
| Full check | local 39/39, live 39/39; `npm test` exit 0 | `scripts/e2e/story-matrix.mjs` |

D8 (address). Copylot voice `861f15ee` v3 sets «вы» for landing visitors, v1 had «ты». The operator's own dictation for
this landing (2026-11-19) has Morpheus say «Давай я тебе покажу», and the PM agent took «ты» for leads (PM-D116), so the
landing speaks «ты»; Copylot's `address-mismatch` findings are suggestions, not blocks. Next: a voice v4 that sets «ты»
for the landing and the bot, saved with the operator's words as the decision.

Separate task: the guide in 19 languages, the content strategy and the content marketing agent are Fabric task
`6c4043eb` (the operator: «как отдельная таска»), run by its own session.

Next task in this unit: none blocking. Open: voice v4 (above); the bot's funnel events (PM agent); leafing in a visible
Safari and on a phone; the headphones mix (Fabric task `29fb8216`).

## 7. v7 (2026-11-19, 16:00 CET): the film, one office and one cast, the new ending

The operator: «в конце вот эта сцена с офисом и надо ее перерендерить ... эффект матрицы очень крутой вот этот кадр с
переходом оставляем ... морфеус пусть сидит в кресле ... встает ... протягивает две таблетки ... в пиджачке
аккуратненький чистенький ... синхронизацию по персонажам по месту ... в фабрике и раскатить на все».

| Item | Result | Evidence |
|---|---|---|
| Cause of the drift | `blender-previz` takes no references: each shot redrew the office and the hero from words | `story/film/shots.py` docstring |
| References | one office, one director sheet, one agent sheet, one mentor sheet (`scene-pack-refs`, two judges each) | `story/film/SOURCES.md` v7, `story/film/v7-verdicts.jsonl` |
| Shots 03 to 10, 12, 13 | redrawn from the references: first and last frame (`scene-pack-refs`), clip from both (`video-from-frames`), two takes each, two judges | shot table `SHOTS_V7`, commit `a5a3c803` |
| Kept | 01, 02, 11 (judges kept the v5 frame), 14 and 15 with the Matrix glitch | `story/film/cut.py` |
| Ending | 16 starts on shot 15's last frame and turns to the mentor at an oak desk; 17 he rises, walks round the desk, holds out the red and blue capsules; 18 a 2.2 s push-in; the mentor is an original character in a neat charcoal suit, drawn in shot 15's style | `SHOTS_V7` 16 to 18, commits `d8805fc1`, `a5a3c803` |
| Re-cut | RU and EN, 83.7 s, 15.2 MB each, -21.9 and -22.5 LUFS; the Morpheus caption 79.8 to 83.6 s | `story/film/timeline.json`, commit of the caption |
| Frame check | contact sheet and a second round on the ending and shot 11: no blocking defect by two of three models | `v7-verdicts.jsonl` (`film-v7-sheet`, `film-v7-check2`) |
| Asset Foundry | traces `op-20261119-film-continuity`, `op-20261119-film-ending-style` (request, change, verdict); board request `a71ddd94` (thread `b1b4cb38`) for a versioned film recipe with references before any shot and one drawing style per character | `foundry trace list` on the Studio |
| Cost | USD 53.06 over 39 Foundry jobs (ledger; one `unknown` line per job awaits reconciliation) | `foundry ledger --job <id>` |
| Deploy | Worker version `685a8b84-f626-4643-a2d3-c13352b1d5eb` | `wrangler deploy -c wrangler.assessment.json` |
| Full check, live | 39/39 (third run; runs one and two failed the comic's desktop leafing check once each, 37/39 and 38/39, a timing check of the pager in a background Chrome that this change does not touch); film RU and EN 83.71 s, end card, loop and the red route pass | `scripts/e2e/story-matrix.mjs` |

Open, blocking nothing: the leafing check's flakiness in a background Chrome (board row); a person's look at the ending
on a phone; the Foundry recipe asked in `a71ddd94` (asset-foundry's).
