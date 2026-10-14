# Home video v2 (SITE-043, 2026-10-12 → 2026-10-14): record

The backlog id was SITE-041 in this folder's first commits; SITE-041 and SITE-042 were taken on `main` meanwhile, so
the row is SITE-043.

Operator request (2026-10-12): a more dynamic, branded explainer for the home page, with music, that explains the
values, why it is for you and for an organization, how you work, how it is set up, the ecosystem and what it runs
on; short but dense. It replaces the W10 cut ([record](../../evidence/2026-10-11-video/README.md)) in the same
player directly under the hero (SITE-039): click to play, never autoplays, `preload="none"`, a poster that is a real
frame, captions on by default.

- Script, storyboard, claims and their facts, look and motion: [script.md](script.md).
- Narration as spoken: [narration-en.txt](narration-en.txt), [narration-ru.txt](narration-ru.txt).
- Caption text per cue in ten languages: [captions-source.json](captions-source.json).
- Word-timed transcriptions of the two cuts: [transcripts/](transcripts/).
- What was made, by which recipe and provider, at what cost, with each file's SHA-256: [provenance.json](provenance.json).
- WebKit check of the page: [visual.json](visual.json).

Everything audible and the rendered cuts were made through our media pipeline (Asset Foundry; the authored
composition rendered by its HyperFrames route) under its budget and ledger; nothing was made by calling a provider
directly. As for W10, the pipeline's order ids and manifests (which carry local paths) stay in its private delivery
record; `provenance.json` keeps what a reader can check.

## How it was made

| Step | Result |
|---|---|
| Narration en, ru | the W10 narrator voice (plan decision D3), two takes each, the shorter chosen on measurement: en 82.56 s, ru 86.24 s ($0.186, $0.193). A first pair from a longer script (88.96 s, 96.08 s) was cancelled as too long and the script cut by about 10 % ($0.418 spent on it) |
| Music bed | instrumental, 96 s, two candidates; chosen for more room in the voice band (its 1–4 kHz band 13.9 dB under its loudness against 11.7 dB), a sparse intro that opens at 12.85 s and a resolved final hit at 90.0 s ($0.48) |
| Composition | [harness/gen2.py](harness/gen2.py): the site's `design-system/tokens.css` linked unmodified, Inter and JetBrains Mono (OFL), GSAP 3.14.2, the sample-data mockups, kinetic type, a chapter rail as the one clock; the music as two clips of the same track, its full groove on the promise and its final hit on the end card, 0.17 under the voice; frames checked in WebKit with [harness/shot.cjs](harness/shot.cjs) and [harness/sheet.py](harness/sheet.py) before ordering |
| Renders | en (`fabric/home-video-v2/en-4`) and ru (`fabric/home-video-v2/ru-3`), $0 each (local render). Every frame sampled from both was read against the storyboard before the agent's final choice |
| Timing check | a transcription of each delivered cut ($0.005 each): the English transcript matches the 200 narration words exactly; the Russian one differs only in transcription spellings (“ИИ агентами”, “Cloud” for Claude, one case ending), not in what was spoken. Sentence starts land within 0.13 s of the storyboard in both cuts |
| Captions | [harness/vtt.py](harness/vtt.py) aligns each cue to the transcript words; English 26 cues and Russian 24 timed on their own cut; the other eight languages split into the same cues on the English timings (`scripts/check-site.mjs` checks pl, ko, pt-br, zh-hans and ja against `home.vtt`) |
| Web files | [harness/webenc2.sh](harness/webenc2.sh): MP4 H.264 CRF 28 + AAC 112 kbps stereo, WebM VP9 CRF 40 + Opus 80 kbps stereo (W10's mono track would fold the music), poster one real frame (the promise) |

Repaired on the way: the render lint refused one bounce ease on the end card (`V038`), replaced by the piece's
ease-out; the first full en render (on 2026-10-12, with the machine's load average near 300) failed its check on a
10 s navigation timeout and a second one was cancelled when free disk fell under 1 GB; the lighter composition
rendered in under three minutes on 2026-10-14 on a quiet machine.

## The cut

| File | Duration | Size | Budget |
|---|---|---|---|
| `assets/video/home.mp4` | 86.53 s | 6 081 244 B | ≤ 8 MB |
| `assets/video/home.webm` | 86.53 s | 5 833 488 B | ≤ 8 MB |
| `assets/video/home.jpg` (frame at 19 s: the promise) | — | 82 441 B | ≤ 320 KB |
| `assets/video/home-ru.mp4` | 90.20 s | 6 466 627 B | ≤ 8 MB |
| `assets/video/home-ru.webm` | 90.20 s | 6 193 398 B | ≤ 8 MB |
| `assets/video/home-ru.jpg` (frame at 19.5 s) | — | 79 057 B | ≤ 320 KB |

The files are about 1.6 times W10's (3.7–4.2 MB) for twice the running time, a busier picture and a stereo music
track. Masters: en 86.53 s, −13.5 LUFS integrated, true peak −1.4 dBFS; ru 90.20 s, −13.4 LUFS, −1.6 dBFS.

## Site changes

- `index.html` and the nine catalogs: the player's label "PassionCode.ai explained, a narrated video" and the line
  under it "PassionCode.ai in a minute and a half: what it is, who it is for and how it works, narrated, with
  captions. The screens show sample data; the coding agent’s console is a written example", in each language.
- `scripts/check-site.mjs`: the last caption must end between 78 and 92 s (was 40–50).
- `docs/brand/facts.md` row *Home video*, `docs/ux/scenarios.md` (SCN-001 step 1, SCN-021 step 6 and its expected result).

## Checks (2026-10-14)

| Gate | Result |
|---|---|
| `npm run locales` | PASS: 10 languages, 15 pages each |
| `npm run check` | exit 0 |
| `npm run build` | PASS: 224 public entries in `dist/` |
| `python3 scripts/extract-public-copy.py --check` | PASS: 150 projections |

WebKit ([visual.json](visual.json)), `/` and `/ru/` at 1440 and 390 px from `dist/` on 127.0.0.1: HTTP 200, no
horizontal overflow, nothing loaded before play (`readyState` 0, `preload="none"`), the 16:9 box, the poster
decodes (1920×1080), WebKit picks the WebM and plays it (duration 86.533 s en, 90.2 s ru), captions load (26 cues
`srclang` en, 24 cues `srclang` ru) and show a cue at 12 s, no autoplay, no loop, controls on, no page errors.
