# SITE-068: the story landing, target state and refactor waves (2026-11-17, evening)

The operator, 2026-11-17 (fabric-workspace session `7ecc6391`): «давай улучшимся еще раз два-три итерации на
улучшения и две вариации не выкатываете пришли telegram посмотреть две вариации»; then «Анализируй тот вид,
который должен быть в конце, все функции, которые должны работать корректно, и в каком они вида должны быть ...
составь план рефакторинга, и волнами все до конца закрой». Nothing here is deployed: both variations go out as a
Worker version preview (`wrangler versions upload`), assessment.passioncode.ai keeps serving its current version.
Parent plan: [2026-11-17-story-landing.md](2026-11-17-story-landing.md).

## The end state

One page, two looks of the same story, chosen by the operator from the preview:

| | Variation 1 «Terminal» (`/`) | Variation 2 «Ink» (`/v2/`) |
|---|---|---|
| Look | The green digital look of the first pass, cleaned: code rain behind, glowing panels, mono narration | A printed comic page: paper-black ink, halftone, panel gutters, white balloons, one acid-green accent |
| Guide | The original PM-agent character (below), lit green | The same character, inked in black and white with the green accent |
| Engine, copy, functions | shared | shared |

The guide is an **original character** drawn for PassionCode: an android project manager with a rounded screen
face (two dot eyes and a voice waveform), an antenna with a signal ring, a headset with a microphone boom, a
hooded jacket with the PassionCode mark and a floating task board in one hand. It replaces the first pass's
figure, which resembled a film character too closely to publish (see Compliance below).

## Functions and how each must behave

| # | Function | Correct behaviour | Before this pass | Wave |
|---|---|---|---|---|
| F1 | Language | `?lang=`, then the saved choice, then the browser; EN and RU buttons switch every string and persist | works | check |
| F2 | Hero preview chat | Loops only while visible; no layout jump | works | check |
| F3 | Story stage before chapter 0 | The stage shows chapter 0 (scene, caption) as soon as it enters the screen | empty black stage with «00 / 10» until the story top is reached | W1 |
| F4 | Chapter change | Scene, caption, rail and number change together; scrolling back plays backwards | works | check |
| F5 | Pixel seam | A short accent between chapters that never hides the reading: at most about half of the scene panel, never over the caption or the chat | covers 95% of the whole stage at every boundary | W1 |
| F6 | Team chat | Messages appear on the scroll clock, typing dots before each | works | check |
| F7 | Org scene (5 to 7) | Branches, departments, agents, the travelling token, stamps, the timer | works | check |
| F8 | HUD | Illustrative counters move from the old to the new process, labelled illustrative | works | check |
| F9 | Chapter rail | Deep links scroll to the chapter; current and past states | works | check |
| F10 | Voice-over | Off by default; the button plays the chapter's line with a subtitle; without a recording the browser reads it, labelled as a draft voice | works | check |
| F11 | Final and apply | The final line and the CTA, the request form link to passioncode.ai/business/, the video | works | check |
| F12 | Variant link | «Watch as a cartoon» to `/film/` and back | works | check |
| F13 | Reduced motion | Every chapter in its final state, no rain, no seam | works | check |
| F14 | Robots | noindex in the page, the header and robots.txt | works | check |
| F15 | Second look | `/v2/` serves the same page in the ink look, every function above identical | absent | W3 |
| F16 | Guide character | Original design, in both looks | the figure resembled a film character | W2 |

## Waves

- **W1, correctness:** F3 (stage shows chapter 0 on entry), F5 (seam confined to the scene panel, capped, shorter).
  Check: the probe measures seam coverage at every boundary (target at most 0.6 of the scene panel, 0 of the
  caption and chat) and the scene and caption on entry.
- **W2, the guide:** the original character in scene 1, the orb and avatars unchanged. Check: WebKit shots at 1440
  and 390.
- **W3, the second look:** `story/ink.css` scoped to `html.ink`, `/v2/` written by the assessment build with the
  class swapped, a link between the looks. Check: shots of both, no console errors.
- **W4, verification:** every function F1 to F16 in WebKit by script, copy of changed strings through Copylot
  (en, ru), no em dash in public text, `npm run check` where it covers these files.
- **W5, preview and delivery:** `wrangler versions upload -c wrangler.assessment.json` (no deploy), both links to the
  operator through the communicator, commit and push of `site/story-morpheus`, backlog row updated.

## Compliance context (for the operator, not a blocker)

- The first pass drew the guide with the silhouette, head, round dark glasses and long coat of a well-known film
  character. A likeness like that is a copyright and personality-rights risk for an ad landing, so this pass
  replaces it with an original design. The name «Morpheus» is the PM agent's own name (from Greek myth) and
  stays; together with the green code rain the association with the film remains, which is the operator's call
  at publication. A variant that passes without question: the ink look with the original guide and no rain.
- No line of the page or the voice-over quotes a film.

## Receipts (2026-11-17)

| Wave | Done | Evidence |
|---|---|---|
| W1 | F3: the stage shows chapter 0 on entry (`subscribeAct` shows `max(0, act)`). F5: the seam is drawn only inside `.scenes`, capped at 0.38 of it and within 0.03 of a boundary | seam probe: whole-stage coverage at a boundary 0.95 before, 0.10 after (1440 px) and 0.08 (390 px); nothing above the caption |
| W2 | The original guide (`svg.guide`), with blink, voice wave, antenna ping and a floating board, still under reduced motion | WebKit shots at 1440 and 390, both looks |
| W3 | `story/ink.css`, `/v2/` from `build-assessment.mjs`, the look switch (a V1/V2 chip on phones) | `/v2/` 200 on the preview, `html.matrix.ink` |
| W4 | F1 to F16 | [story-functions.mjs](../../evidence/site-068/story-functions.mjs): 37 of 37 pass, twice in a row; [frame-times.mjs](../../evidence/site-068/frame-times.mjs): median frame 17 ms on both looks at 1440 and 390; Copylot reports `94e52602`, `cc4a488e`, `bda7b3e9`, `6377f490`, `47c399e2`, `4abca5a3`, `c1a8a0a6` (0 findings); no U+2014; `npm run check` exit 0 |
| W5 | Worker version `f5a9242c-b556-4148-8d9a-1af66d6acf74` uploaded with `wrangler versions upload` (tag `site-068-looks`), not deployed. Preview `https://f5a9242c-passioncode-assessment.sergeysheleg4.workers.dev/` (look 1) and `/v2/` (look 2); assessment.passioncode.ai unchanged (`/v2/` 404 there). Both links sent to the operator through the communicator (event `site-068-looks-preview-f5a9242c`) | |

Next: the operator picks a look; the picked one becomes `/` and is deployed to assessment.passioncode.ai, the other
stays on its preview. The keyframes, the cut and the voice recordings still wait on Asset Foundry (it answers again
since 14:24 UTC; resend the order with the same key from a session where the `asset-foundry` MCP is connected).
