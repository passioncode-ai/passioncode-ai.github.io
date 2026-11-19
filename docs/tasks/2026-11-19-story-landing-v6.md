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
