# Home video v2 (SITE-041, 2026-10-12): record and handoff

**Status: blocked on disk, renders queued and paused.** Script, storyboard, look and motion direction, both
narrations, the music bed and the composition (en and ru) are done; both renders are ordered and paused by the
render engine's own disk guard before rendering anything. Captions, site integration, deploy and receipt are not
started. Nothing on the live site changed.

History of the stop:
- First run: the operator's rule is to stop, commit and report when free space on the data volume falls under
  1.5 GiB. It fell from 5.0 GiB at the start to 0.84 GiB (`df -h /System/Volumes/Data`, swap 9.6 of 11 GiB in use)
  while nothing from this run had been rendered.
- Resumed at 17:47 with 4.0 GiB free. The composition was built and checked frame by frame in WebKit. The first
  en render was refused by the render lint for one bounce ease on the end card (`V038 bounce-easing`); the ease
  became the piece's ease-out. The renders of en and ru then stopped before their first frame on the render
  engine's guard: "Render not started: 4.0 GB free, 8 GB needed" (en), "4.8 GB free, 8 GB needed" (ru). The guard is
  the engine operator's setting (`render.minFreeGb`) and was not lowered: it is what keeps the disk from reaching 0.
  The pipeline's own pressure prune would free 0.78 GB, not enough to reach 8 GB, so it was not run.

## Done

| Step | Result |
|---|---|
| Script, en and ru, each written natively | [script.md](script.md), [narration-en.txt](narration-en.txt), [narration-ru.txt](narration-ru.txt); rule check passes (en 98.1, ru 95.1) |
| Storyboard | [script.md §Storyboard](script.md#storyboard): 21 beats with measured sentence starts, on-screen text and picture per beat |
| Look and motion direction | [script.md §Look and motion](script.md#look-and-motion-sheleg-design-1641) |
| Narration en and ru | the W10 narrator voice (D3), two takes each, the shorter take chosen on measurement: en 82.56 s, ru 86.24 s |
| Music bed | instrumental, 96 s, two candidates, chosen on measurement (more room in the voice band, a sparse intro that opens into the full groove at 12.85 s, a resolved final hit at 90.0 s) |

A first pair of narrations from a longer script measured 88.96 s (en) and 96.08 s (ru), over the 60–90 s target
once the music bookends are added; those orders were cancelled with that reason and the script was cut by about
10 % before the takes above were ordered.

All media came through the media pipeline under project `fabric`; its job ids, costs and manifests stay in the
pipeline's own delivery record (as for W10), and the delivered files sit in its delivery folder under
`passioncode-site/home-video-v2/` with one `<file>.manifest.json` each. Order keys:
`fabric/home-video-v2/narration-en-2`, `fabric/home-video-v2/narration-ru-2`, `fabric/home-video-v2/music-1`
(`foundry jobs --project fabric` lists them).

## Next task (exact)

Precondition: at least 3 GiB free on `/System/Volumes/Data`; check before every render.

1. Free space: the render engine needs 8 GB free on the data volume (its own guard). That is the operator's call:
   free space on the machine, or decide to change the guard. Then resume the two paused orders with the pipeline's
   retry (they keep their finished stages): keys `fabric/home-video-v2/en-2` and `fabric/home-video-v2/ru-2`
   (`foundry jobs --project fabric`). They were ordered with `autonomy: "agent"` and `choice_mode: "agent"`, so the
   final choice comes back to the agent. The composition is [harness/gen2.py](harness/gen2.py) (inputs in its
   docstring); `harness/shot.cjs` snapshots frames in WebKit and `harness/sheet.py` makes a contact sheet. The
   failed first en order (`fabric/home-video-v2/en-1`, lint) needs no action.
2. Composition facts the next run can rely on: narration from 0.5 s; music as two clips of the same track
   crossfaded under the voice one second after the organization beat starts, placed so the full groove lands on
   the promise (within 0.05 s in both cuts) and the final hit on the end card, offsets differing by whole
   multiples of the track's 1.07 s pulse; volume lanes: 0.6 before the promise and on the end card, 0.17 under the
   voice, faded over the last 1.6 s; the narration MP3 carries +2 dB through a true-peak limiter so the mix lands
   near −14 LUFS (measure it). Lengths: en 86.51 s (end card at 83.51 s), ru 90.19 s (end card at 87.19 s).
3. Read the delivered masters: measure duration, loudness and music under voice; then (duration, −14 LUFS target, music under voice) a word-timed transcription of each cut
   through the pipeline's subtitles recipe to confirm the sentence starts before cutting captions.
4. Captions in ten languages from the final scripts (en and ru word for word; the other eight translated cue for
   cue on the English cue timings, as `scripts/check-site.mjs` requires), posters, web encodes (W10's
   `webenc.sh`), site integration (`index.html` figcaption "under a minute" → the new length in all ten catalogs;
   the caption-length bounds in `scripts/check-site.mjs`; the *Home video* row of `facts.md` under its lease), the
   gates, WebKit check, PR, deploy, `verify-live.py`, and the receipt with backlog row SITE-041.
