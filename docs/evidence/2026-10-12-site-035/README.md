# SITE-035: home video captions for pl, ko, pt-br, zh-hans and ja (2026-10-12)

Branch `agent/site-035`. Follow-up of the home video (SITE-028 W10, [record](../2026-10-11-video/README.md)): until
now the Polish, Korean, Portuguese (Brazil), Chinese (Simplified) and Japanese home pages played the English cut with
the English captions, marked `srclang="en"`. Each now has its own captions file, and its page loads it, labelled in
its own language.

## What changed

| Page | Captions file | `srclang` | Label | Source |
|---|---|---|---|---|
| `/pl/` | `assets/video/home-pl.vtt` | `pl` | Napisy | translated by hand, cue for cue |
| `/ko/` | `assets/video/home-ko.vtt` | `ko` | 자막 | translated by hand, cue for cue |
| `/pt-br/` | `assets/video/home-pt-br.vtt` | `pt-BR` | Legendas | translated by hand, cue for cue |
| `/zh-hans/` | `assets/video/home-zh-hans.vtt` | `zh-Hans` | 字幕 | the copy agent's write capability, used as returned |
| `/ja/` | `assets/video/home-ja.vtt` | `ja` | 字幕 | translated by hand, cue for cue |

- **Timing.** Every file keeps `home.vtt`'s 14 cue ids and timings byte for byte, so each line sits on the English
  narration that the English cut plays. Only the cue text is translated. `scripts/check-site.mjs` now asserts this
  for the five files and requires captions for all ten languages.
- **Wiring.** No page source changed. `scripts/locales.mjs` already picks `home-<locale>.vtt` when it exists and sets
  `srclang` from it; the labels were already in each catalog (`i18n/<locale>/home.json`, "Captions").
  `npm run locales` regenerated the five home pages.
- **Words.** The captions follow each language's own home page catalog for the same sentences and the decided terms
  ([terminology](../../brand/terminology.md#decided-terms-operator-2026-10-10)):
  - Fabric is "the home for your projects and their agents" (dom / 집 / casa / 家 / 拠点, as on each page);
  - preview is wersja zapoznawcza / 프리뷰 / prévia / 预览版 / プレビュー版;
  - direction is kierunek / 방향 / direção / 发展方向 / 方向性.
  Product names stay in English. Polish addresses the reader as *ty* (Twój, Twoich), pt-BR uses *você*, Korean and
  Japanese use the polite forms (합니다, です・ます) of their catalogs, and Chinese uses 你.
- **zh-Hans.** One write job in zh-Hans-CN with saved voice v2 (`1657e5b3…`, version 1), maxOutputTokens 4000,
  max charge $0.50. It charged $0.0518. The 14 returned lines were used verbatim; the only change was turning its
  " / " line marks into line breaks. The tool reports the language quality as unverified by a native speaker.
- **Not used.** The media pipeline's paused captions job was not reconciled for this, and was not needed: captions are
  text.

## Copy checks

Copy tool rule check, saved voice v2 `1657e5b3-e994-417c-b3e7-4f6a8c5052f2` version 1, register marketing, the 14 cues
of each file as one text. No model was used and nothing was charged.

| Locale | Report | Findings | Blocking |
|---|---|---|---|
| pl-PL | `2817f31e-1978-49af-8035-89a021604c2e` | 0 | none |
| ko-KR | `bcefe28e-d8be-4bb7-b996-41e290eaf4f4` | 0 | none |
| pt-BR | `805140da-db08-478e-bf61-9b1f0679b0fa` | 0 | none |
| zh-Hans-CN | `d9c382a3-94c3-4b68-b9ee-af4f1e3d47f4` | 0 | none |
| ja-JP | `3cfc57b6-3076-41da-90e6-bf9ec2973107` | 0 | none |

Every report passed the voice's literal bans and forbidden terms, the language-independent checks, and locale
typography (all but ko-KR, which has no typography pack). pl-PL and zh-Hans-CN also passed the advertising-law pack.
The tool gives no humanization score for these locales; it has rules only for en and ru. Native-speaker review stays
open with the rest of these languages (SITE-025).

## Checks

| Gate | Result |
|---|---|
| `npm run locales -- --check` | exit 0: 10 languages, 15 pages each |
| `python3 scripts/extract-public-copy.py` | exit 0: 150 public HTML text projections |
| `npm run check` | exit 0 (display copy 150 pages; 150 projections) |
| `npm test` | exit 0: 111 pass, 0 fail |
| `npm run build` | exit 0: 224 public entries in `dist/`, the ten captions files among them |
| `npm run releases:check` | exit 3 first: drift on the adapter (0.13.0, was 0.12.0) and the launcher (0.1.37, was 0.1.36). After `npm run releases:sync`, exit 0, and every other gate above was run again: all exit 0 |

A negative test of the new timing assertion: moving one cue of `home-ja.vtt` by 80 ms fails `scripts/check-site.mjs`
with "every cue keeps home.vtt's timing". The file was then restored.

**WebKit.** [`webkit-captions.cjs`](webkit-captions.cjs) ran Playwright WebKit (`playwright-core` 1.63) against a
local Worker (`wrangler dev --local --local-protocol https`) at 390 px. Result: [webkit.json](webkit.json), 2/2 PASS.

On `/pl/` and `/ja/`:
- the page answers 200;
- the `<track>` names `home-pl.vtt` / `home-ja.vtt`, with `srclang` pl / ja and label Napisy / 字幕, default on;
- the browser fetched that file (200), did not fetch `home.vtt`, and loaded the track (readyState 2);
- the track has 14 cues whose timings equal `home.vtt`'s, and its first cue is the file's first line;
- no horizontal overflow and no page errors.

**Private terms.** Count only, against the local list: 0 in this change's added lines and new files.
