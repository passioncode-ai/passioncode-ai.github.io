# The home video (SITE-028 W10, 2026-10-11)

Branch `agent/site-video`. Brief: [W10](../../tasks/2026-10-10-narrative-l10n-video.md#3-workstreams) and decisions D1–D4
(D3: an AI narrator in en and ru). The video sits under the six steps of How it works (`index.html#how`,
[SCN-021](../../ux/scenarios.md#scn-021-see-how-it-works-from-entry-to-working-agents)): click to play, never autoplays,
loads nothing but its poster before play, captions on by default.

Everything audible and the rendered cut were made through our media pipeline under its own budget and ledger; nothing
was made by calling a provider directly. The pipeline's job ids, costs and manifests are in the private delivery
record kept with the pipeline, not on this public page; this record keeps what a reader of the site can check.

## What it shows

One beat per sentence of the narration, cut on the narration's measured sentence starts. Every picture is one of the
site's own sample-data mockups ([capture record](../2026-10-11-mockups/README.md)); no interface was invented.

| Beat | Narration (en) | Picture | Label on screen |
|---|---|---|---|
| 1 | Your agent works for a week. Then it runs on the wrong account, forgets what it learned, and nobody can say what it changed. | type only | — |
| 2 | It needs a home, its accounts, its memory and a record of what it did. | four cards: Fabric, Switchboard, a Fabric project, Observatory and the board | — |
| 3 | Fabric is the home for your projects and their agents, in preview. It opens on four actions: create or adapt an agent, open or create a project. | `journey-2-2.jpg` (Fabric's first run, the four actions; "Conversation not switched on" in its corner) with the two pairs outlined | PREVIEW |
| 4 | Your coding agent asks its questions and shows its plan first. | `journey-3-4.jpg` (the console's plan for `legacy-reports-agent`) | AVAILABLE NOW; "A written example, not a recording." |
| 5 | Each agent runs on the account it should. Its dashboard and spend sit in one window, | `dashboards-overview.jpg` with a "Sample data" chip added (the picture has none of its own) | AVAILABLE NOW |
| 6 | and Observatory shows what changed. | `observatory-overview.jpg` | AVAILABLE NOW |
| 7 | The tools are available today. Coordination between agents is the direction we are building. | five tools: Switchboard, Fabric Dashboards, Project Observatory (AVAILABLE NOW), Fabric, Fabric Inbox (PREVIEW); then "Coordination between agents" | DIRECTION |
| 8 | (silence) | the PassionCode.ai mark and passioncode.ai | — |

Fabric is never shown replying: its conversation does not reply yet ([narrative §3](../../brand/narrative.md#3-the-journey-six-steps)).
The Russian cut has the Russian narration, the Russian on-screen text and the `-ru` mockups.

## Script and copy checks

The narration follows the home page's approved words (narrative §§2–3, D-T1, D-T2, D-T5). Copy tool rule check, saved
voice v2 `1657e5b3…` version 1, no model, no charge:

| Text | Locale | Report | Score | Findings |
|---|---|---|---|---|
| narration | en-US | `c787c321-f253-405f-be27-f33715186ffa` | 86.8, pass | 2 × rule of three: the four things an agent needs (D-T1's own list, kept) and the account/dashboard/spend sentence, rewritten after the check into two sentences |
| narration | ru-RU | `6bf836f8-1319-497d-a6c4-e4e01a3665e0` | 85.7, pass | the same two; the same fix |
| caption line | en-US | `4297307a-35a7-4b17-895d-e6e28077c769` | 100, pass | none |
| caption line | ru-RU | `82bcc9ec-0e2f-49c9-8d05-f4153882d93e` | 100, pass | 4 × no-break space: the text sent had plain spaces; the catalog value carries U+00A0 at those four places and after «для» |

No channel record exists for a video in `docs/brand/channels.md`; the narration was written in the home page's register
(reported, not added: the channel is a brand-voice decision).

## Status at handoff (2026-10-11 23:58): blocked on the render, not merged

Done and on this branch:
- the narration, en and ru, delivered as WAV by the media pipeline (en 42.24 s, ru 46.48 s, 48 kHz mono);
- the composition (`harness/gen.py`), checked frame by frame in WebKit at 1920×1080 (en 10 frames, ru 8) and,
  with the HyperFrames runtime loaded, render-ready in under a second;
- captions `assets/video/home.vtt` and `home-ru.vtt`, word for word the narration, 14 cues each;
- the player in `index.html#how` (controls, `preload="none"`, poster, captions track, no autoplay or loop),
  `styles.css`, `scripts/build-site.mjs`, `scripts/locales.mjs` (poster, sources and captions follow the page's
  language; `srclang` follows the captions file), `scripts/locales.test.mjs`, `scripts/check-site.mjs`, the three new
  strings in nine catalogs, SCN-021 and the home screen entry.

Not done: the rendered cut. Every render attempt failed in the pipeline's render check
(300 s limit) while the machine's load average stood at 400–790; once the load fell below 150 (23:43), the render
paused because the disk had 6.3 GB free of the 8 GB it requires, and by 23:55 the disk had 1.6 GB free (swap
20.3 of 21.5 GB). Nothing was spent on the renders. Because the cut is missing, the branch does not pass its gates yet:
`node --test scripts/locales.test.mjs` 2026-10-11 23:59 → 23 tests, 19 pass, 4 fail (the new video test, the
own-language picture test's structure comparison, catalog currency, and adding a language), all of them waiting for
the video files, the eight other languages' captions and `npm run locales`; `npm run check` was not run.

Resume, in order:
1. Free disk to at least 8 GB (operator: close idle sessions or reboot; swap is what holds it) and wait for a
   load average below 150.
2. Retry the paused en render in the media pipeline (same job, nothing new to approve), then build and order the ru
   render from `harness/gen.py ru` the same way. Choose each cut after reading its frames.
3. `harness/webenc.sh <master> assets/video/home 20` and `... assets/video/home-ru 22`: MP4 (H.264, faststart), WebM
   (VP9/Opus) and a poster frame; each video must stay within 8 MB, each poster within 320 KB.
4. Order captions for de, es, fr, ja, ko, pl, pt-BR and zh-Hans from the en cut through the media pipeline's subtitles
   recipe (glossary: Fabric, Switchboard, Fabric Dashboards, Project Observatory, Observatory, Fabric Inbox,
   PassionCode.ai); convert each `.srt` to `assets/video/home-<code>.vtt` (`pt-br`, `zh-hans` as the file suffix).
5. `npm run locales`, then the gates: `npm run locales -- --check`, `python3 scripts/extract-public-copy.py`,
   `npm run check`, `npm test`, `npm run build`, `npm run releases:check`; WebKit at 390 and 1280 px in en and ru.
