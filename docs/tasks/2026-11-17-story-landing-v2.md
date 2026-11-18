# SITE-068 v2: the Matrix story, review, spec and waves (2026-11-17, night)

Parent plans: [story landing](2026-11-17-story-landing.md), [refactor waves](2026-11-17-story-landing-refactor.md).
Run through `task-pipeline` (full flow: user-facing, preview deploy). Nothing here goes to passioncode.ai;
previews are Worker versions of `passioncode-assessment` (`wrangler versions upload`, noindex).

## The operator's feedback on iteration 3 (verbatim excerpts, fabric-workspace session `4436d66c`)

> Первый, который вот такой более схемный, такой зеленым цветом, приятный, прикольный стиль. Давай его как-то
> вообще пометим где-то у нас там в коллекции наших прикольных стилей, в наших скиллах.

> Все начинается с агента Морфеуса. Агент Морфеус это PM. Он подключается к вам в чат, получает цели и проводит
> онбординг [...] Trinity assessment [...] сколько это [...] в сэкономленных человека часах. При доступе к
> финансовым данным мы также сделаем финансовые прогнозы. [...] чем больше коннекторов вы подключили, тем точнее
> [...] Morpheus [...] предоставит вам детальный план [...] и стоимость всей интеграции [...] Приходит Neo. Neo
> DevOps [...] создает защищенный изолированный образ под вашу организацию и начинаете построить матрицу [...]
> Агенты выглядят как агент Смит, типа в очках [...] клонируются [...] SEO, support quality, ведение социальных
> сетей, разработка, community management, sales department, бизнес-девелопмент, стратегические, ресерчеры [...]
> огромную сетку различных отделов [...] А потом это все схлопывается обратно, Neo выходит из матрицы [...]
> морфеус предоставляет результат [...] интерактивного графика как если мониторинг [...] все сервисы активны
> доходы растут пользователи идут контент [...] разлетается

> мне больше нравится вот этот стиль с Матрицей [...] аватарки Морфеуса, Тринити, Нео и Агента Смита [...] чат
> [...] слева плохо читается, хочется чат справа [...] сейчас и чат меняется, и меняется схема. Это все сразу
> одновременно [...] все должно быть последовательно [...] Верхняя шапка мне очень нравится [...] Ваша боль хорошо
> показывает, что опять переносим запуск [...] Второй альтернативный лендинг [...] пусть будет запасной вариант
> [...] третий вариант [...] лендинг, который генерируется из видео по пикселям [...] Подключим нашего креатора
> [...] "The Most Important Animation Film" практики [...] сначала раскадровочку [...] ты мне будешь выкатывать
> это в Telegram [...] делаем это через агента Морфеуса

Later in the same session: «скидывай ссылки мне по готовности и вопросы через морфиуса решем».

## Review of what is built (branch `site/story-morpheus` at `937defbb`)

| Area | State | Evidence |
|---|---|---|
| Engine | One scroll clock (`story/store.js`), 11 chapters, `subscribeAct` for coarse changes, `onFrame` for the rest; data-driven scenes; reduced motion shows final states | `story/store.js:3-77`, `story/story.js:66-199` |
| Chat | Left column (`.stage` grid `minmax(300px,380px) 1fr`); messages turn on at `data-at` on the same global clock `g` as the scene | `story/story.css:34,47`; `story/story.js:180` |
| Simultaneity (the operator's complaint) | Real: inside a chapter the chat (`msgs … g >= at`) and the scene (`--p`, `local[ch]`, `orgFrame`) both advance on every frame of the same span, so they change together | `story/story.js:178-187` |
| Guide | An original android PM (screen face, headset) replaced the first pass's film-like figure; no Trinity, Neo or Smith | `story/index.html` scene 1, refactor doc F16 |
| Story | Business today, join, onboarding, goals, assessment (anonymous agent), departments (3), agents, a task travels, old vs new, correction, apply | refactor doc table, `story/index.html` captions |
| Looks | Look 1 «Terminal» `/` (the green look the operator liked), look 2 «Ink» `/v2/` | `story/matrix.css`, `story/ink.css` |
| Third variant | `/film/` already uses scrolly-video (dkaoster/scrolly-video, MIT, vendored): the scroll drives the playhead of a video, so the page is "rendered from a video". It plays a 9 s stand-in cut recorded from the page itself; no generated film yet | `story/film/film.js`, `story/vendor/scrolly-video.js` |
| Voice | 12 lines en and ru in Copylot voice `861f15ee` v2; browser speech as a draft voice | `story/voice/script.json`, `story/voice.js` |
| Checks | `evidence/site-068/story-functions.mjs` 37 of 37, frame times, seam probe | refactor doc, Receipts |
| Hosting | assessment.passioncode.ai serves an earlier version; previews `f5a9242c`, `827d0faf` not deployed | `docs/DEPLOYMENT.md`, backlog SITE-068 |

### What is missing against the feedback (the gap)

1. The story is the old one: no Trinity (assessment with connectors, hours saved, finance forecast), no plan and
   cost step, no Neo (isolated image, building the Matrix), no Smith swarm over a large grid of departments, no
   collapse and exit, no monitoring dashboard returned in the chat.
2. The four character avatars do not exist; the guide is an android, not Morpheus.
3. Chat on the left; chat and scene change at once.
4. The green look is not recorded as a style pack in sheleg-design.
5. The film variant has no generated film; the storyboard the operator asked for first does not exist.
6. Questions and step approvals do not go through Morpheus.

### Refactor findings in the code (fixed in W2)

- `story.js` mixes three concerns (chapter routing, chat clock, per-scene instruments) in one closure; the chat
  clock reads `g` directly, which is what makes it simultaneous. Split: a **beat schedule** per chapter in
  `store.js` (chat span, scene span, hold) and the chat and scene read their own local progress from it.
- Chapter-specific magic numbers (`orgFrame` reads `g` from 5.05 to 7.8, `hud` from 6.8 to 9.8, scene 5 reused for
  6 and 7) break when chapters move. Each scene gets a local progress only.
- The seam exceptions are hard-coded chapter numbers (`near !== 6 && near !== 7`); make it a field of the chapter row.

## The decisions taken (by the operator's words, then the goal, then the safest reversible option)

- **D1, the look.** Look 1 «Terminal» is the primary; look 2 «Ink» stays as the spare, with the same story.
- **D2, the characters.** Morpheus, Trinity, Neo and Smith by name, as the operator asked. Each is an **original
  drawing** with archetype cues only (Morpheus: bald mentor, small round dark lenses, high collar; Trinity: short
  slick hair, narrow dark lenses, black high collar; Neo: dark hair, long dark coat, narrow lenses; Smith: suit,
  tie, earpiece, rectangular dark glasses), never a likeness of an actor and no film quotes. Compliance context goes
  beside the artefact (below), it does not stop the work.
- **D3, sequence.** Every chapter has three beats: **chat** (messages one by one, scene holds and dims), **scene**
  (the scene acts, the chat holds and dims), **hold**. The active side carries focus. Nothing moves on both sides at
  once; a test asserts it.
- **D4, chat on the right**, under 860 px the chat stays below the scene as now.
- **D5, trial mode for looks of characters.** The operator asked to see steps: the storyboard and the character
  variants go to him first (through Morpheus, `people.ask`); the engine work that the storyboard does not change
  (sequence, chat side) goes on while he looks.
- **D6, the third variant** is the film page `/film/` with a generated film (Asset Foundry `storyboard-frames`, then
  `frames-to-video`), rendered as a scroll-driven video, plus a **pixel assembly**: each chapter's frame resolves from
  coarse phosphor blocks to the full picture as the reader scrolls (canvas sampling of the decoded frame).
- **D7, numbers** stay labelled illustrative until `docs/brand/facts.md` has receipts.

## REQ rows

| REQ | Requirement | Verified by |
|---|---|---|
| R1 | Chapters in this order: pain, Morpheus joins, onboarding and goals, Trinity's assessment, the plan and its cost, Neo builds the isolated image, the Matrix with Smith clones over a grid of at least 10 departments, the work flows, the collapse and Neo's exit, the monitoring dashboard in the chat, apply | captions and rail read in WebKit (story-functions) |
| R2 | Chat in the right column at ≥ 860 px | layout probe: chat `left` > scenes `left` |
| R3 | Sequential beats: in any frame at most one of chat and scene changes | probe samples 200 scroll positions, counts frames where both change: 0 |
| R4 | Avatars of Morpheus, Trinity, Neo and Smith on the page (chat and scenes); Smith clones counted on screen | DOM check + screenshots |
| R5 | Trinity: connectors plug in, precision rises with each, hours saved and a forecast appear only after the finance connector | scene probe |
| R6 | Plan card with phases and an illustrative cost, accepted in the chat | DOM check |
| R7 | Neo: an isolated image is built (layers lock), the Matrix opens | scene probe |
| R8 | Collapse: the grid folds to a point, Neo leaves, back to the chat | scene probe |
| R9 | The dashboard in the chat is interactive: tabs or hover switch services, revenue, users, content | click test |
| R10 | Header and hero kept; hero mini chat ends with departments deployed and the release launched | DOM check |
| R11 | Both looks (`/`, `/v2/`) carry the new story; F1 to F14 still pass | story-functions |
| R12 | Storyboard page with every chapter's frames, beats and lines (en, ru) on the preview; sent through Morpheus | preview 200 + board request id |
| R13 | Character variants through Asset Foundry (trial: 2 to 3 per character with references), sent for a pick | Foundry job ids |
| R14 | Film variant: generated keyframes and cut after the storyboard is accepted; pixel assembly on `/film/` | Foundry jobs, WebKit |
| R15 | The green look recorded as a style pack in sheleg-design | the pack file in `ssheleg/sheleg-design-skill`, its validator |
| R16 | Copy of every new string through Copylot (en, ru, voice `861f15ee` v2); no em dash | report ids, grep |
| R17 | Reduced motion: final states, readable top to bottom | WebKit with reduced motion |

## The storyboard (v2)

Beats: **C** chat, **S** scene, **H** hold. One main action and one camera task per frame (the animation film's
playbook 02).

| Ch | Title | C (chat, one by one) | S (scene) | Transition out |
|---|---|---|---|---|
| 0 | Your pain | Anna: who writes the copy? Ivan: waiting for the copy. Olga: launch moves again? CEO: let's discuss at 16:00 | People wait; notifications pile up; the "waiting" clock | Glitch cut (pixel seam) |
| 1 | Morpheus joins | «Morpheus joined the chat». Morpheus: I am your PM agent; give me the goals. CEO: here they are | Morpheus's portrait materialises from code rain, lenses catch the light | Push-in to his board |
| 2 | Goals and onboarding | Morpheus: inviting the team, access by level; keep the team or go fully humanless, your choice | Team avatars orbit him, level badges stamp; three goals land as cards | Goals fly to the right edge |
| 3 | Trinity's assessment | «Trinity joined». Trinity: connect what you have; every connector sharpens the assessment | Connectors plug in one by one (repo, analytics, support, ads, finance); precision gauge rises; process map scanned; result: hours saved a month, share of work agents take; after finance: a forecast line | Map folds into a plan |
| 4 | The plan and its cost | Morpheus: the plan, phases and the cost; how it scales humanless. CEO: accepted | Plan card: phases, timeline, illustrative cost, scaling arrow; the CEO's accept stamp | Stamp turns into a key |
| 5 | Neo builds the image | «Neo joined». Neo: a machine (ours or yours), an isolated image for your organisation | A server shell; image layers stack and lock; «isolated · signed · yours»; rain thickens, a door opens | Dive into the Matrix |
| 6 | The Matrix fills | (chat holds: Morpheus: the agents are coming) | A grid of departments (SEO, Support quality, Social, Development, Community, Sales, Business development, Strategy, Research, Marketing, Analytics, Finance) lights up; Smith appears, clones into every cell; counter of agents climbs | Camera pulls back over the grid |
| 7 | The work flows | Smith (Support): ticket closed in 40 s. Smith (Dev): release shipped. Smith (Social): post live | Links between departments; tasks run as tokens; processes that waited on people now run on agents | Everything accelerates |
| 8 | The collapse | (chat holds) | The grid folds into one point of light; Neo walks out of the Matrix | White flash to the chat |
| 9 | Morpheus reports | Morpheus: here is your business now. A live dashboard message | Interactive dashboard inside the chat: services active, revenue up, users, content spreading; tabs | Chat closes into the form |
| 10 | Your turn | Morpheus: your business next? | Apply form, the video | none |

## Waves

| Wave | Content | Depends on | Check |
|---|---|---|---|
| W1 | Storyboard page `/storyboard/` (this table drawn as frames with the v0 characters), the v0 avatars (SVG), preview upload, the link and the question through Morpheus (`people.ask`) and the communicator | none | preview 200; board request id |
| W2 | Engine: beat schedule, chat on the right, focus dimming, seam per chapter row; the sequential probe (R3) | none (independent of the storyboard's picks) | probe 0 frames with both changing; story-functions |
| W3 | Character trial through Asset Foundry: estimate, then `character-create` per character, 2 to 3 variants, references; links to the operator | none | job ids, delivered files |
| W4 | New scenes 1 to 9 per the storyboard, en and ru, both looks | W1 answer (or no answer: build as drawn), W2 | R1, R4 to R11, R17 |
| W5 | Verification: story-functions extended, Copylot, frame times, screenshots; preview upload; links | W4 | R11, R16 |
| W6 | Film variant: keyframes and cut through Foundry from the accepted storyboard, pixel assembly on `/film/` | W1 accepted, W3 picks | R14 |
| W7 | Style pack «phosphor» in sheleg-design (make-skill route, its own repository) | none | the pack validator |

## Compliance context (for the operator, not a blocker)

- The character names and the green code rain point to a well-known film franchise. Names are not protected as
  such, but a landing that markets a product with a film's characters and look can draw a trademark or
  passing-off claim (an implied endorsement) and, for any likeness of the actors, personality rights. What we do:
  original drawings with no actor's likeness, no film quotes, no film logo or typeface; the names are the agents'
  product names. Variants that pass without question: the same story with the agents named by role (PM, Assessor,
  DevOps, Agent) and the ink look. The publication decision is the operator's.
- Russian advertising marking (38-ФЗ «Реклама», advertiser, erid) belongs to paid placements, not to the page.

## Receipts of v2 (2026-11-18)

| Wave | Done | Evidence |
|---|---|---|
| W1 | Storyboard as the page itself and its Safari shots; treatment page `story/treatment/` with its PDF | preview `e5e06c0c` `/story/treatment/probuzhdenie.pdf` 200 |
| W2 | Beat schedule (`store.js` rows carry `chat`, `scene`, `el`), chat on the right, focus dimming, seam per row | `evidence/site-068/sequence-probe.py`: 221 positions, 0 violations (Safari, 1440 px) |
| W3 | Asset Foundry `character-new` x4 (jobs `…G71F`, `…HH4`, `…GDR`, `…QRX`), 3 candidates each, waiting at `pick` for the operator; spent $0.72 | `story/cast/*.jpg`; `cast.js` `PICK` holds the recommendation |
| W4 | Chapters 0 to 10 of the storyboard, en and ru, both looks | Safari shots 1440 and 390 px; `npm run check` exit 0 |
| W5 | Copylot en `8c742f36`, ru `6bb2214f` (score 100, no blocking finding); preview `5eda5242` (v2), `e5e06c0c` (v2 and treatment), not deployed | |

Two defects found and fixed on the way: a `const cells` clash in `story.js` (the module failed to load) and the
storyboard row's `scene` index overwritten by the beat range of the same name (no scene was shown); the row now names
its element `el`.

## The operator's later words (2026-11-18, same session) and the waves they add

> зафиксируем персонажей наших агентов [...] а сэсмент, архитектор [...] PM, DevOps [...] агент Смит [...] сделали
> всем портреты [...] везде одни и те же были портреты и персонажи [...] Морфеус, который будет приходить в чат и
> предлагает выплеть таблетку

> в хедере [...] большой такой морфиус [...] ты начинаешь скроллить, и он тебя протягивает [...] две руки [...] нужно
> выбрать таблетку [...] выбрал таблетку [...] показывает путь [...] если выбрать не ту таблетку [...] показывает как
> устроена сейчас организация, какие есть боли

> видео сгенерируем от первого лица [...] Проснулся за рабочим столом [...] через C-Dance [...] сначала [...] в блендере
> [...] сцены срендерились [...] покажем мне отчетик в виде PDF сначала

> кофемашина [...] не работает [...] видит там тень [...] в плаще уходит [...] в какую-нибудь там дверь заходит, и там
> его опять Морфей встречает, и опять возвращаемся на начало в сайте, где он тебе предлагает две таблетки

> сразу же с озвучкой проработать [...] звуковую озвучку еще для сайта, для кликов

> всю историю на фуллскрин [...] как погружение [...] а все остальное это уже как элементы дополненной реальности [...]
> в стиле матрицы

| Wave | Content | Gate |
|---|---|---|
| W8 | Character canon: PM Morpheus, assessment Trinity, agent architect the Architect, DevOps Neo, worker agents Smith, research the Oracle (proposed); character sheets from the picked portraits; the canon into the brand pack and, through `recording-insights`, into the agents base's persona of each template | the operator's portrait pick (asked) |
| W9 | Layout v3: the story full screen, chat, captions, HUD and navigation as an AR layer in the Matrix look (treatment §3) | none: ordered |
| W10 | Header with Morpheus offering two pills; red opens the transformation story, blue the film | none: ordered |
| W11 | Film «Пробуждение»: 16 shots, Blender blockout then Seedance (`blender-previz`), two acts under the USD 100 line | the treatment's «продолжать» |
| W12 | Voice: Morpheus designed from a description, recordings of the 12 lines and the film's lines; UI sounds (treatment §5) | none for the voice design; the film's lines with W11 |
| W13 | Copylot voice `861f15ee` v3: the character names allowed, the light Matrix tone written down | relayed operator words above |
| W7 | Style pack «phosphor» in sheleg-design | none |
