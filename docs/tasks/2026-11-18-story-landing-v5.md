# SITE-068 v5: the comic leafs, the white rabbit leads, the film is made (spec and waves)

Owner: fabric-workspace session (SITE-068). Branch `site/story-morpheus`, host assessment.passioncode.ai (noindex).
Scenario and the operator's inputs verbatim: fabric-workspace `docs/scenarios/2026-11-18-humanless-matrix-story/`
(`inputs.md`, `brief.md`, merged in #912 at `4d18a38d`). Earlier specs: `2026-11-17-story-landing.md`,
`2026-11-17-story-landing-v2.md` (W1 to W13 receipts).

## 1. What the operator asked (2026-11-18, after the v4 comic with voice)

1. Leafing like a comic or a cartoon: one gesture turns one frame, smooth, with inertia; a fast scroll never skips
   two or three frames; a line is never cut by the next frame («я чуть проскроллил, это уже через второй, не хватает
   вот этого реплики»).
2. A diagram drawn at the side as the story goes, sliding on with it.
3. The white rabbit: peeks from under the pills, jumps toward the pill pressed; it exists only on the path into the
   Matrix and is the point that leads the reader down through the infographics.
4. The film full-screen; its end: the director reaches the end of the office, sees opposite a door into another
   office (clean, nobody, a window across the wall, one desk, a future office in wood tones with plants, spacious);
   Morpheus comes out and offers the pills again; blue wakes him at the desk again and the film loops, red follows
   the rabbit into the Matrix.
5. The whole story, timing, pauses, voice and music thought through scroll by scroll: where attention is and how it
   moves from one object to the next.
6. The landing, its text and voice in Russian and English, complete; the language set from the browser by default,
   and a visible switch at the top before the story starts.
7. Review everything, write the spec, plan, close in waves until nothing is open, deploy, then send the link to the
   PassionCode chat in Telegram, and only when the film is ready too, not the landing alone.

## 2. Review: what stands and what does not (2026-11-18 17:00 UTC)

| Area | State | Evidence |
|---|---|---|
| Comic v4 (act 0, 14 panels, final choice, onboarding) | live | Worker `0ecde919`, commit `ebc5201d` |
| Ten languages, Copylot-checked, no blocking finding | live | W13 receipt in the v2 spec |
| Morpheus's voice, 90 lines in 10 languages, checked by a second model | live | `story/comic/audio/SOURCES.md` |
| Interface sounds and room tone | live | same |
| Leafing one frame per gesture | built, not deployed | `story/comic/pager.js`; CDP: a burst of 12 wheel notches turned one frame, three gestures turned three frames |
| Lines queue and never cut; the pager holds while a line speaks | built, not deployed | `story/comic/sound.js` (`queue`, `busy()`) |
| Side diagram and the rabbit | built, not deployed | `story/comic/rail.js`; red shows the rail with 15 nodes |
| Rabbit under the pills, jumps toward the pressed one | built, not deployed | `.act0-rabbit` in `comic.css` |
| Film full-screen with the end card and the loop | built, not deployed; the end card did not show in the test (the stand-in clip did not reach `ended` after a seek) | `v5-test.mjs` output |
| Music bed under the voice, ducked while Morpheus speaks | chosen (two audio judges agreed on take 1), wired | `story/comic/audio/music/bed.mp3`, Foundry `job_01M7QM3WN3RM0M8Q5B0WZEKSQN` |
| The future office still for the film's end | redo asked (the first came with neon pink and yellow light) | Foundry `job_01M7QM8Q72XAFR4DFCWEGHY5D8` |
| **The film itself** | **not made**: a 9-second stand-in plays | `story/film/standin.mp4` |
| Language switch visible before the story | partial: a select in the header, not prominent | header markup |
| Portrait picks, character sheets | waiting on the operator since 2026-11-18 01:00 (request `9b0a0fe8`) | board thread `330b350d` |
| Onboarding bot (Telegram, Slack, Discord) | Morpheus's K-65: a separate copy, design by 11-20, Telegram by 11-25 | board `c8895715` |

Found in review, fixed or to fix in these waves:
- R1. The pager's stops were measured once per gesture, but panels revealed after a jump change height: refresh on
  arrival too (W1).
- R2. The rail labels repeat the panel titles in every language span; on the narrow strip only dots show (fine), on
  the side the labels must follow the language switch (they do: the spans are cloned with their `lang`) (checked W1).
- R3. Reduced motion: the pager is off, the rail follows by IntersectionObserver, the rabbit stands still (W1 check).
- R4. The film must play with sound when the reader has sound on, and its captions must exist in all ten languages
  (W3).
- R5. Portraits: the operator asked for autonomy to the end («доделаем полностью все до конца»), so the picks are
  made by the agent with a second model's check (operator rule «Autonomous or trial»), the reason recorded (W2).

## 3. Decisions

- D1. Ten languages stay (the operator's own order of 2026-11-18 01:55); Russian and English are first-class: voice,
  film audio, the two buttons in the header switch. The other eight: a menu beside them, captions on the film.
- D2. The language: `?lang=`, then the saved choice, then the browser's, then English (as now); the header shows
  «EN · RU» buttons and a menu of the rest, visible on the first screen before act 0.
- D3. The film is made through Asset Foundry: each shot as a Blender blockout (layout, camera, timing, free), its
  first frame redrawn in the film's look, then Seedance 2.5 draws the clip that follows the blockout (`blender-previz`,
  B-231). Style: graphic novel, charcoal and paper, green screen light the only accent; the future office breaks the
  palette on purpose: warm daylight and wood. 17 shots, about 80 seconds, 16:9.
- D4. Film audio is assembled locally: Morpheus's and the manager's lines (Foundry `speech-line`, ru and en), the
  sound design from the shot table, the music bed; two audio tracks (`film-ru.mp4`, `film-en.mp4`), captions as
  WebVTT in ten languages.
- D5. Cost line for the film run: USD 100 while it is being made (operator rule «Run limits come last»); Foundry runs
  without project caps since 2026-11-18, the emergency stop holds.
- D6. The Telegram message goes to the PassionCode team chat through the Telegram gateway (rule R33 O9: a chat other
  than the operator's own), only after the film is in and the final checks pass; the operator gets the same link
  through the communicator.

## 4. Waves

| Wave | What | Done when |
|---|---|---|
| W1 | Leafing, rail, rabbit, sound queue, music, language buttons; refresh stops on arrival; reduced motion | CDP at 1440 and 390: burst = one frame, line not cut, rail and rabbit follow, no errors, no overflow |
| W2 | Portraits picked (agent plus a second model), character descriptions fixed for the film | picks recorded with both verdicts |
| W3 | The film: 17 shots blocked out, looks picked, clips drawn, cut, sound, two audio tracks, captions | `story/film/film-{ru,en}.mp4` and `story/film/captions/*.vtt` play full-screen to the end card |
| W4 | Integration: the film in the page, its end card loops or enters the Matrix; scroll-by-scroll timing table | the v5 test passes end to end, both languages |
| W5 | Copylot on every new string, build, deploy, live checks, receipts, backlog row, scenario run 2 in the workspace | live CDP pass, Copylot no blocking finding |
| W6 | The link to the PassionCode chat (gateway) and to the operator (communicator) | message ids recorded |

## 5. State, 2026-11-18 17:55 CET (handoff point)

- W1 built and tested locally (see section 2); committed `3ed35215`.
- W3 film: looks picked for all 16 shots by two vision models, a third on a split (`site-story-tools/film-picks.jsonl`,
  outside Git); clips drawing in Foundry (job ids: `site-story-tools/film-jobs.clean`); the watcher `film-pick.py`
  accepts each clip that passed its gate. Shot 16 was refused by Seedance moderation for «pill»: reworded as beads,
  forked as `job_01M7QRZGDY4X1WB8DM9X6J69FQ`.
- Film sounds: keyboard, papers, freeze, coffee, coat, pings chosen by two audio judges (`film-sfx-verdicts.jsonl`);
  steps and door re-forked with ElevenLabs pinned (`job_01M7QS2RRD75TP980FG42KN0N0`, `job_01M7QS2TMKY3F9NF8GQNAXWB75`);
  office and future ambiences and all 14 voice lines retried after ElevenLabs timeouts (ledger lines settled).
- The end still: the Foundry redo came neon again, so `story/film/future-office.jpg` is shot 15's chosen look frame.
- Next task, exactly: when every clip and sound is delivered, copy them to one media folder under their cut names, run
  `python3 story/film/cut.py <folder>`, rebuild, run `v5-test.mjs` to the end card, then W4 to W6.

## 6. Delivered, 2026-11-18 20:45 CET

| Wave | State | Evidence |
|---|---|---|
| W1 leafing, rail, rabbit, voice queue, EN/RU | done | `v5-test.mjs` at 1440 (ru, en) and 390 (ru) on the live host: burst = one frame, leaf [1,2,3], no overflow, no errors |
| W2 picks | done | every pick by two models, a third on a split: `story/film/SOURCES.md` |
| W3 film | done | `story/film/film-{ru,en}.mp4`, 79.5 s, 16 shots, -22 LUFS, peak -1.7 dBFS; passport `story/film/SOURCES.md` |
| W4 film in the page | done | end card shows at the end, blue loops from 0, red closes and opens the rail (Chrome 1440 and 390, Safari 26.6.2 via safaridriver) |
| W5 Copylot, deploy, live | done | Copylot reports `97626b26`..`d98ea6fd` (18 strings), `868ae886`, `e3b13c74`, `6bceff97`, `14f45dd8`, chat text `edca6db3` (patches applied); Worker version `6335e916`; `npm test` 136/136 |
| W6 Telegram | done | team chat `-1004480403446` through `telegram-gateway.default` as `fabric-workspace` (grant: send, that chat only), job `job_f724d16e3d580b283b35f93f` SENT; operator: communicator event `site068-v5-film-ready-2026-11-18` |

Found on the way and fixed: static assets answered a Range request with the whole file, so Safari would not play the
MP4 and no browser could seek: `worker/assessment.js` answers ranges for `/story/film/` and `/story/comic/audio/`
(tested, `scripts/assessment-range.test.mjs`). The end card's group label leaked as visible text («Choose Выбор ">»):
labels moved to `sr-only` elements.

Open, none blocking:
- A person's listening of the mix on studio headphones (the audio judges contradicted the measurements three rounds).
- Asset Foundry defects reported on board request `bab23e73` (previz gate refuses clips for their audio rate; freesound
  fallback for one-shots; no hold while a provider is down).
- Publication notes (Morpheus likeness, pills in ads, AI disclosure): `story/film/SOURCES.md`.

## 7. Leafing fixes after the operator's «скролл не работает» (2026-11-18 evening)

Found on the live host with real trackpad flicks: a flick made while Morpheus spoke was dropped (3 of 12); a suspended
audio context never fired a line's end and froze every frame up to 10 s; on a busy page one swipe's events arrived with
gaps and turned two frames. Fixed in `story/comic/pager.js` and `sound.js`: a gesture during a line is kept and turns
the frame when the line ends (a thin bar shows the wait), a second gesture goes on at once with the line uncut, gesture
timing from the events' own timestamps, a line holds no longer than its own length, Home and End end a hold.

Full check: `scripts/e2e/story-matrix.mjs` (desktop 1440 and phone 390, RU and EN: language and switch, act 0 frame by
frame, the red path with the rail, the end and onboarding, the film with its end card, blue loop and red; browser
language for ru, en, de, uk; the switch remembered; `?pill=red`; reduced motion).

Next, exactly: matrix green locally, then deploy (`wrangler deploy -c wrangler.assessment.json`), matrix green on
https://assessment.passioncode.ai, then Morpheus's message to the PassionCode chat (`-1004480403446`) through the bot
@MorpheusPMBot (`passioncode-pm-agent/prod/MORPHEUS_BOT_TOKEN`) mentioning the operator (199109936) and Sergey
(319998697); text checked by Copylot report `a0b452d8`, file `site-story-tools/send/morpheus.html`.

Done 2026-11-18: `scripts/e2e/story-matrix.mjs` 31/31 locally and 31/31 on https://assessment.passioncode.ai (Worker
`017fc9ab`); `npm test` 136/136. Morpheus (@MorpheusPMBot) posted the link to the PassionCode chat, message 94, with
text mentions of the operator (199109936) and Sergey (319998697); text Copylot `a0b452d8`, patches applied.
