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

## The cut (2026-10-12)

Rendered by the media pipeline from `harness/gen.py` (composition v5 for en, v4 for ru; they differ only in en's
first three beats, see below), 1920×1080, 30 fps, H.264 + AAC stereo; masters stay with the pipeline. The site files
are web encodes of those masters made by [`harness/webenc.sh`](harness/webenc.sh) (MP4: H.264 High 4.0, CRF 26,
`+faststart`, AAC 96 kbps mono; WebM: VP9 CRF 38, Opus 64 kbps mono; poster: one real frame of the cut; container metadata stripped).

| File | Duration | Size | Budget |
|---|---|---|---|
| `assets/video/home.mp4` | 44.60 s | 3 654 750 B | ≤ 8 MB |
| `assets/video/home.webm` | 44.61 s | 3 675 051 B | ≤ 8 MB |
| `assets/video/home.jpg` (frame at 20 s: Fabric's four actions) | — | 92 396 B | ≤ 320 KB |
| `assets/video/home-ru.mp4` | 48.80 s | 4 166 666 B | ≤ 8 MB |
| `assets/video/home-ru.webm` | 48.81 s | 4 026 760 B | ≤ 8 MB |
| `assets/video/home-ru.jpg` (frame at 22 s) | — | 97 008 B | ≤ 320 KB |

The masters measure −13.6 LUFS integrated (en). The en cut runs 44.6 s, inside the brief's 30–45 s; the ru cut
48.8 s, because the Russian narration is 4.2 s longer.

**A timing fix found on the way.** A transcription of the en cut (with word timings) showed that the narration's
second sentence ends at 7.41 s, not 8.86 s as read from its pauses alone; the first render put the three failure lines
and the cut to beat 2 about a second after the voice. Composition v5 moves them to 2.25, 4.25, 5.6 and 7.85 s and
`home.vtt` cues 2–5 to the same sentence ends; the Russian timings were checked against the same pattern of
sentence-end pauses (0.44–0.54 s) and stand.

**Render check findings (warnings, not errors).** The pipeline's render check sampled text contrast at five times; 3 of
35 text samples at 42.1 s fall below its threshold: the tool cards under "Coordination between agents", dimmed to
45 % on purpose so the direction line reads first.

## Captions

| Page | Captions file | Source |
|---|---|---|
| en | `home.vtt` | the narration script, word for word, timed on the narration |
| ru | `home-ru.vtt` | the same, Russian |
| de, es, fr | `home-de.vtt`, `home-es.vtt`, `home-fr.vtt` | the media pipeline's subtitles recipe: a transcription of the en cut with word timings, cut into cues, each translated cue for cue with the product names kept |
| pl, ko, pt-br, zh-hans, ja | `home.vtt`, marked `srclang="en"` | their translations did not come back: one translation call returned without a cue and its outcome awaits reconciliation in the pipeline's ledger, so no second order was placed for them yet |

A page without its own captions file shows the English one and says so (`srclang="en"`); `scripts/locales.mjs` does
this the same way it picks a picture's `-ru` twin.

## Checks (2026-10-12, after merging `origin/main` at `d3f254d`)

| Gate | Result |
|---|---|
| `npm run locales -- --check` | exit 0: 10 languages, 15 pages each |
| `python3 scripts/extract-public-copy.py` | exit 0: 150 public HTML text projections |
| `npm run check` | exit 0 (111 tests pass; display copy 150 pages; 150 projections) |
| `npm test` | exit 0: 111 pass, 0 fail |
| `npm run build` | exit 0: 219 public entries in `dist/` |
| `npm run releases:check` | exit 3: drift on the adapter (0.11.1, was 0.9.0) and the launcher (0.1.35, was 0.1.33), the same on `origin/main`; not this change's, left to a release sync |

WebKit ([visual.json](visual.json)), `/` and `/ru/` at 390 and 1280 px: HTTP 200, no horizontal overflow, the video box
16:9 before and after the poster (362×203.6 and 1180×663.8), the poster loads (1920×1080), WebKit picks the WebM and
reads its duration (44.61 s en, 48.81 s ru), the page's captions load (14 cues each, `srclang` en and ru, default on),
no autoplay, no loop, no page errors. A first caption line was found ending in a full stop by the display-copy check
and fixed in all ten languages.

## Not yet

- The operator has not seen the cut. The plan's acceptance for W10 is "the operator approves the cut": this branch
  is opened as a pull request for that review and is not merged or deployed.
- Captions for pl, ko, pt-br, zh-hans and ja, once the open ledger row is reconciled.
