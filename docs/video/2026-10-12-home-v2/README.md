# Home video v2 (SITE-041, 2026-10-12): record and handoff

**Status: stopped on the machine's disk floor, partway.** Script, storyboard, look and motion direction, both
narrations and the music bed are done and delivered by the media pipeline. The composition, the renders, captions,
site integration, deploy and receipt are not started. Nothing on the live site changed.

Why it stopped: the operator's rule for this run is to stop, commit and report when free space on the data volume
falls under 1.5 GiB. It fell from 5.0 GiB at the start of the run to 0.84 GiB (`df -h /System/Volumes/Data`, swap
9.6 of 11 GiB in use) while nothing from this run had been rendered; the run's own files are a few megabytes.

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

1. Write the composition generator beside the W10 one (`docs/evidence/2026-10-11-video/harness/gen.py` is the
   pattern: Inter from the pipeline's font folder, GSAP 3.14.2, the site's mockups, `design-system/tokens.css`
   linked unmodified) to the storyboard and direction in [script.md](script.md). Audio: the delivered narration WAV
   as an MP3 under 2 MB (the render check inlines up to 2 MB), starting at 0.5 s; the music as a second `<audio>`
   with a `data-automation` volume lane: intro and end card about 0.6, under the voice about 0.17, faded out over
   the last 1.6 s. Place the music so its full groove (12.85 s in the track) lands on the promise beat and its final
   hit (90.0 s) on the end card: two clips of the same track (start and ending) crossfaded over 1 s under the voice
   during the organization beat, their offsets differing by a whole number of 2.14 s bars (the track's measured
   pulse is 1.07 s).
2. Check frames locally in WebKit (the W10 `shot.cjs`), then order `video-render` per locale under project
   `fabric` with `autonomy: "agent"` and `choice_mode: "agent"` (the recipe's final choice is otherwise a human
   stop), keys `fabric/home-video-v2/en-1` and `fabric/home-video-v2/ru-1`, `size` 1920x1080.
3. Measure the masters (duration, −14 LUFS target, music under voice), then a word-timed transcription of each cut
   through the pipeline's subtitles recipe to confirm the sentence starts before cutting captions.
4. Captions in ten languages from the final scripts (en and ru word for word; the other eight translated cue for
   cue on the English cue timings, as `scripts/check-site.mjs` requires), posters, web encodes (W10's
   `webenc.sh`), site integration (`index.html` figcaption "under a minute" → the new length in all ten catalogs;
   the caption-length bounds in `scripts/check-site.mjs`; the *Home video* row of `facts.md` under its lease), the
   gates, WebKit check, PR, deploy, `verify-live.py`, and the receipt with backlog row SITE-041.
