# The story landing: Morpheus agentizes a business (SITE-068)

Registered 2026-11-17 from the operator's request in a fabric-workspace session (Claude Code, session
`8c434522`). This file is the brainstorm, the scene script and the plan; status lives in
[backlog.md](../backlog.md). The demo lives on branch `site/story-morpheus` at `/story/`, outside the
sitemap and with `noindex`, so production is untouched until the operator accepts it.

## The operator's request (verbatim, 2026-11-17)

> упаковать правильно что мы делаем, перечислить что у нас агентизация бизнеса и полностью
> превращаем любой онлайн бизнес в humanless ai native business

> В чат джойнится PM-агент, и PM-агент тебя анбордит, анбордит всю команду, выставляет цели, из целей
> происходит ассессмент, из целей ассессмента создаются задачи, формируются отделы, появляются агенты,
> они разворачиваются, начинается все автоматически жить [...] люди приходят, вносят какие-то
> корректировки, и система все улучшает, и растут метрики [...] а косты летят в ноль

> пусть у нас морфеус будет [...] это такой вид комикса, интерактивного флоучарта [...] показать прям
> предметно [...] передача информации между людьми, между агентами, автоматизация, скорость ответа,
> скорость выкатки [...] киллерпоинтами [...] в отдела маркетинга, отдела разработки, отдела
> продвижения [...] в конце это все сводилось в apply формы [...] и еще и ролик [...] про экосистему
> [...] первая половина должна быть такая вот скроллящаяся, и вызывать прям вау эффект, и смотреться
> как мультик

> давай это пока выкатим не на основной [...] какую-нибудь ветку отдельную сделаем

The quotes are shortened with `[...]`; the full message is in the session transcript.

## What it decides

- **The narrative (X-02).** The site's story is now the operator's own line: *we agentize businesses:
  any online business becomes a humanless, AI-native business.* This settles the narrative that
  SITE-064 waited on for the home page (row 1 of its matrix). SITE-066 (the business model) stays
  blocked on go-to-market-strategy.
- **The guide is Morpheus**, the PM agent (formerly Kira; the `kira` MCP door already calls him
  Morpheus). He is a real agent of the base set (template `template-pm-agent`), so the story shows
  what an organization actually gets, not a mascot.
- **"Humanless" is a claim, not a promise of zero people.** The North Star keeps three roles for people
  (direction, controller, expert; [north-star.md](https://wiki.passioncode.ai/knowledge/north-star) §Why).
  The page says *no person in the routine flow*; people set goals, approve and correct. The word goes
  through the copywriting skill and Copylot's check before it ships in any language.

## Concepts considered

| # | Concept | What the visitor sees | Strength | Cost and risk |
|---|---|---|---|---|
| A | **Chat comic** (the operator's) | A team chat; Morpheus joins; every scroll step adds a message, and the replies open comic panels and a flowchart | Concrete, readable, the product's real surface (chat, board) | Needs strong illustration so it does not read as a mock UI |
| B | **Scroll-scrubbed film** | A rendered film whose frames follow the scroll, chapters joined by a pixel dissolve | The strongest "wow", like a cartoon | 40 to 80 MB of frames, a render through Asset Foundry and Frame Agent per language, slow first paint |
| C | **Living org map** | One big map; the camera flies from department to department while tasks travel between them as glowing tokens | Shows the system as one whole | Navigation can confuse; needs a mini-map |
| D | **Split before and after** | The screen split: the old company on the left (people, meetings, waiting), the new one on the right (agents), both clocks running | The killer points land hard | Static if overused; best as one chapter |

**Chosen: A as the spine, with C inside the departments, D as the comparison chapter and B's pixel
dissolve between chapters.** The demo builds it with SVG, CSS and canvas only (no library, no CDN), so
it loads fast and every word stays real text for search and for `llms.txt`. Rendered frames (B) can
replace the illustrations chapter by chapter later without changing the page's skeleton.

## Scene script (the scroll)

| Ch | Scene | On screen | Animation | Killer point |
|---|---|---|---|---|
| 0 | **Your business today** | A business card: an app, a site, a shop; a dashboard with flat metrics; people in a busy chat | Notifications pile up, a "waiting for reply" clock ticks | Every result passes through a person |
| 1 | **Morpheus joins** | "Morpheus joined the chat"; his first message: "Hi, I am Morpheus. Let's make your business run itself." The founder (CEO) answers | Pixel dissolve into the chat, typing dots, the avatar lands | One agent starts it, not a project |
| 2 | **Onboarding** | Morpheus invites the team; each member gets access by level; keys stay in one vault | Avatars fly into the chat; level badges stamp on | Onboarding in minutes, by an agent |
| 3 | **Goals** | Three goals as cards: grow revenue, ship weekly, answer users in a minute | Cards drop in, metrics targets draw | Goals, not tasks, are the input |
| 4 | **Assessment** | The assessment agent maps the work: task classes, hours, who waits for whom | A scanner line sweeps the old process; bottlenecks glow red | We measure before we change |
| 5 | **Tasks and departments** | Goals split into tasks; tasks group into departments: Marketing, Development, Promotion | Lines branch from goals into a flowchart; departments form as rooms | The structure comes from the goals |
| 6 | **Agents arrive** | In each department its agents appear: Copylot and Asset Foundry in Marketing, the coding agent and webpilot in Development, Mobile Publisher and the SEO agent in Promotion | Agents "deploy" with a boot animation, status turns green | Real agents, built one way |
| 7 | **A task travels** | One task goes end to end: Marketing writes the offer, Development ships the page, Promotion launches it, Analytics reads the result back to Marketing | A glowing token moves along the board between departments; each hand-off is instant | Hand-offs between agents take seconds, not meetings |
| 8 | **Old vs new** | The split screen (D) with the killer points below | Two clocks: the old one stuck on "waiting", the new one spinning | See the comparison table |
| 9 | **People correct, the system learns** | The founder leaves a correction in the chat; Morpheus applies it everywhere; metrics climb, cost falls toward zero | A metric line rises, the cost line drops; the correction ripples through departments | People decide, agents do |
| 10 | **Apply** | "Agentize your business": the request form of `/business/`, and the video "How it works" | The chat closes into the form | One step to start |

After chapter 10 the page turns from story to explanation: the ecosystem video (below), then the parts
of the system with links to their pages.

## Killer points: old process vs agentic process

Every number on the live page needs a receipt in `docs/brand/facts.md`; until then the demo labels its
numbers as illustrative. The rows are the comparisons the operator asked for.

| Point | Old: people with assistants | New: agents run the process | Receipt to find before shipping |
|---|---|---|---|
| Hand-off of information | Person to person: chat, meeting, re-typing | Agent to agent on the board, with the full context | Fabric board hand-offs (fabric `com.*` journal) |
| Response time | Hours to days, working hours only | Seconds to minutes, around the clock | Nicegram support bot answer times (Appvillis, ask for a public-safe figure) |
| Release speed | A release waits for review slots and meetings | Releases go when checks are green | Release trains in the roadmap (`knowledge/roadmap.md#release-trains`) |
| Parallel streams of information | A person holds a few threads at once | Every agent holds its own thread; nothing is dropped | Count of agents and parallel sessions (Observatory `observatory_sessions`) |
| Meetings | Daily syncs to reconcile what assistants produced | No sync: the board is the state | none needed (a process fact) |
| Cost per delivered unit | Grows with headcount | Falls with every agent that learns | The pilot baseline (assessment CA-201, after-measure from 2026-12-07) |
| Memory | Leaves with the person | Stays in the organization's knowledge base | the agents database and Observatory records |
| Visibility | Status by asking | Every task, cost and result on one dashboard | Fabric Dashboards spend and load views |

## The two videos

1. **"How it works" (chapter 10, about 60 s).** The same story as the scroll in one cut: Morpheus
   joins, onboards, the departments come alive, the metrics rise. For visitors who do not scroll and
   for social (16:9 and 9:16).
2. **"The ecosystem" (after the story, about 90 s).** What the system is made of: the personal,
   agent-agnostic AI-native workplace (Fabric, Switchboard, Inbox, Dashboards, Observatory on one
   computer), how it becomes a team's (the board, shared keys by level, the PM agent), how it becomes an
   organization's (the organization's machine, its cloud, the agents database). This is SITE-064 row 1,
   now with its narrative.

Both through Asset Foundry (order `ad-video` style scenarios), authored scenes through Frame Agent via
Foundry, narration en and ru, captions in ten languages, render records under `docs/video/`. Words
through the copywriting skill and Copylot first. Trial mode first: the operator picks Morpheus's look,
the style and the voice from variants with references before the final render.

## Technique

- **Sticky stage, scroll progress.** Each chapter is a tall section with a sticky stage inside; one
  `requestAnimationFrame` loop turns the scroll position into a 0..1 progress per chapter and sets CSS
  custom properties (`--p`). Every animation reads `--p`, so scrolling back plays it backwards.
- **Pixel dissolve.** A canvas over the stage draws a grid of brand-coloured blocks whose share grows and
  shrinks around a chapter boundary: the "pixel" change the operator described, without video.
- **Hand-off paths.** SVG paths between departments; a token moves along `getPointAtLength`.
- **Scroll-scrubbed video, later.** When the rendered film exists (concept B), a chapter can swap its
  SVG for a frame sequence drawn to the same canvas; the progress already drives it.
- **Reduced motion.** With `prefers-reduced-motion` every chapter shows its final state, nothing moves,
  and the story still reads top to bottom.
- **Text is text.** Every message and caption is in the DOM, so search, screen readers and `llms.txt`
  read the story.

## Plan

1. Demo at `/story/` on `site/story-morpheus` (this change), English and Russian with a switch, outside
   the sitemap, `noindex`. Check: `npm run check`, `npm run build`, WebKit at 390, 768 and 1440 px.
2. Preview without production traffic: `wrangler versions upload` gives a version preview URL; the
   custom domain keeps serving the current version.
3. The operator picks: the concept mix, Morpheus's look (variants through Asset Foundry), the killer
   points to keep.
4. Copy through the copywriting skill and Copylot's check in every locale; numbers get their receipts
   in `docs/brand/facts.md`.
5. The two videos (above), trial variants first.
6. The story replaces the home page's first half; the second half keeps the ecosystem and the product
   pages. Ten languages through the catalogs, UX scenarios, flows and screens, sitemap, allow-list,
   handoff (`docs/DOCMAP.md`, "Propagation").
7. Production deploy of the home page after the operator's word (real visitors use it).

## Compliance context (for the operator, not a blocker)

- "Humanless" and "costs to zero" are strong claims; in ad registers (Copylot `register: ad`) superlatives
  and absolute claims without a criterion are flagged. Variants that pass: "no person in the routine
  flow", "cost per task falls toward zero as agents learn", with a footnote to the measured pilot.
- Comparison numbers need receipts (see the table) before the page goes live.

## Receipts

- 2026-11-17: demo committed as `0d7612c5` on `site/story-morpheus`, draft PR #162. Worker version
  `08abf962-e235-4f3e-9e91-78ac2f112f00` uploaded with `wrangler versions upload` (tag `site-068-demo`),
  not deployed: its preview answers `/story/` with 200, while `passioncode.ai/story/` answers 404 and the
  home page keeps the current version.
- 2026-11-17: visual pass and its own host, on the operator's request in a fabric-workspace session («что тут по сайту
  давай улучшим визуал новой версии лендинга, давай на сабдомен сделаем ее на assesment поддомен»). The hero headline
  fits in three lines and its preview chat opens with messages (no empty pane); the chapter number leads each caption;
  Morpheus is drawn again (coat with lapels and collar, oval shades with a gradient reflection, rim light); the finale's
  line and a button sit in the bay of the particle M, in the same viewport box `field.js` draws it in (`.final` is a child
  of the sticky stage); the rail shows labels only on hover; phones get stacked goals and a full-width org chart.
  Outgoing links are absolute (`https://passioncode.ai/...`) so the page works on both hosts. `npm run build:assessment`
  writes `dist-assessment/` (the story as `/`, robots `Disallow: /`, `X-Robots-Tag: noindex, nofollow`), and
  `npm run deploy:assessment` deploys the assets-only Worker `passioncode-assessment` with the custom domain
  `assessment.passioncode.ai`; the main Worker and passioncode.ai are not touched (`passioncode.ai/story/` still 404).
  Deployed version `8d5f834e-6181-42e9-8543-26be99b6e1cc`; `curl -I` gives 200 with the noindex header for `/`,
  `/story/story.js` and `/robots.txt`. Checked in WebKit at 1440 and 390 px, EN and RU, no console errors;
  `npm run check` passes. Copylot reports for the new strings: `d629e60a`, `425a9816`, `c52c954e`, `fc1bbc93`,
  `2a94a30a`, `d76d933d` (no blocking finding; the two non-breaking-space suggestions applied).
- 2026-11-17: the Matrix comic and the two variants, on the operator's request in the same session («и улем туда релкам
  уналивать и сделаем в стиле матрицы, морфи4ус агент и голос его надо туда и сдлать заготовки для РУ и ЕН языков по
  озвучке сайта и немного в стиле комиксов можно такой интерактивный комикс при скроле и как второй альтернативный
  вариант найди в гитабе есть популярная либа для рендеринга сайта из видео и попролуем сгенерить мультик такой который
  скролить будут вместо анимации ан сатйе и оба ваорианта проработае еще лучше, сделай копилот стиль особой в стле
  матрицы и морфиуса который будем исопльзовать для морфиуса агента/пм и для этого лендинга но не меняй стиль
  основного»). The assessment host becomes the ad landing.
  - **Copylot voice.** «Морфеус · PM-агент и лендинг, стиль Матрицы» is version 2 of voice `861f15ee` (the PM agent's
    voice since PM-D62), with channel overlays `web` and `vo`, Matrix metaphor at most once per text, no film quotes
    or other characters' names, "humanless" read as no person in the routine. The site's brand voice `93cd4851` is
    unchanged.
  - **Variant A, the interactive comic** (`/`). `story/matrix.css` scopes the look to `html.matrix` on this page only
    (design-system tokens untouched): code rain (`story/rain.js`, faster with scroll speed), inked panels with offset
    shadows and halftone, narration boxes, speech bubbles with tails, sound-effect lettering, Morpheus redrawn as an
    original bald mentor in a high-collar coat with small oval glasses, the agent swarm and the pixel seam in phosphor
    greens.
  - **Voice-over.** `story/voice/script.json` holds the 12 lines (hero and chapters 0 to 10) in en and ru, written in
    voice v2 (channel `vo`). Copylot reports: en `38a7cd89`..`822c3779` pass; ru `53b99410`..`93b254dd` pass in voice
    and typography, flagged only by `ru-ad-marking` (register `ad`: Russian internet advertising needs the «Реклама»
    label, advertiser and erid under 38-ФЗ). That marking belongs to the ad placement (the creative and its click URL),
    not to the narration; record it before any paid Russian traffic is sent. `story/voice.js` plays
    `story/voice/<lang>/<id>.mp3` per chapter after one click on «Голос Морфеуса»; while a recording is missing the
    browser's speech engine reads the line and the subtitle says «черновой голос».
  - **Variant B, the scroll cartoon** (`/film/`). Library: scrolly-video (github.com/dkaoster/scrolly-video, 1.1k
    stars, MIT, vendored as `story/vendor/scrolly-video.js` 0.0.24, no CDN): it decodes the film with WebCodecs and maps
    the scroll to the playhead, so scrolling back rewinds. The page plays `story/film/cut.mp4` when it exists, else the
    draft cut `story/film/standin.mp4` (9 s, 5.0 MB, 220 frames recorded from variant A's stage) with a visible note.
  - **Waits on Asset Foundry.** The keyframes order (`storyboard`, project `passioncode-site`, idempotency key
    `passioncode-site/scroll-film-keyframes/v1`, nine 16:9 frames in the Matrix comic style with an original mentor)
    timed out and the service on port 8787 stopped answering (503, then timeouts); asked on the board, request
    `28d50641` to asset-foundry. When it answers: the keyframes, then `frames-to-video` for a 16:9 and a 9:16 cut
    (phones crop a 16:9 film), then the 24 lines with the voice of the kira-passioncode Morpheus orders of 2026-11-16
    ("Calm deep mentor narration"), saved as `story/voice/<lang>/<id>.mp3`, then a redeploy.
  - Checked: `npm run check` passes; WebKit 1440 and 390 px, en and ru, no console errors on `/` (on `/film/` only the
    expected 404 of the missing `cut.mp4`); deployed version `4ffb6722-be6e-4b47-b0c7-d92d9f07b80e`.

