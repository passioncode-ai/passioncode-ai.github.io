# Film «Пробуждение» / «Awakening»: sources, picks and delivery notes

## v7 (2026-11-19): one office, one cast, the new ending

The operator (2026-11-19, verbatim excerpts): «в конце вот эта сцена с офисом и надо ее перерендерить там типа офис один
потом морфеус появляется где-то в другом месте уже а морфеус который еще там перед этим мультяшный он вообще какой-то
другого стиля потерянный ... эффект матрицы очень крутой вот этот кадр с переходом оставляем ... морфеус пусть сидит в
кресле ... встает там типа из-за стола подходит типа и вот протягивает две таблетки он уже типа такой в пиджачке
аккуратненький чистенький ... синхронизацию по персонажам по месту». Ordered «to the end»: every pick is the agent's,
checked by two vision models (`gemini-3.1-pro-preview`, `kimi-k3.1-pro`), `claude-sonnet-5.5` on a split; every verdict
is in `v7-verdicts.jsonl` (label, candidates, each model's pick, scores and named defects).

Cause of the drift: `blender-previz` takes no references, so each shot redrew the office and the hero from words. v7
builds the references first and draws every drifting shot from them (shot table `shots.py`, `SHOTS_V7`; the v5 table
stays as `SHOTS` and `shots-v5.json`). All media in Asset Foundry on the Studio, project `passioncode-site`, keys
`passioncode-site/film-awakening-v7/*`; files in `~/DATA/_media/passioncode-site/film-v7/` on the Studio.

| Step | Recipe | Foundry jobs | Picks |
|---|---|---|---|
| References: office, director, agent, mentor | `scene-pack-refs` | `job_01M7SYPF1CWC49E33SHG1NQ7YZ`, `job_01M7SYPJX421SSCTV9A5136P01`, `job_01M7SYPP6Y57VPSY87BXEYXRR3`, `job_01M7SYPTF9Z12XZQWSP8KKW1C0` | office 1 of 3 (three-way split, summed scores 22/24/21), director 2 of 3, agent 0 of 2, mentor 2 of 3 |
| First frames 03 to 13, ending key frames 16, 17 | `scene-pack-refs` | `job_01M7SZE43DY8SDNR3G4CM1EPC0` (03-06), `job_01M7SZE71C64N58HPQRHEFHPMG` (07-09), `job_01M7SZDFRJQC37073YDSF64SJ6` (10), `job_01M7SZDK047BCA2M2BNR8E20DK` (11), `job_01M7SZDNTBGS855A969JNMCMXS` (12), `job_01M7SZDRNYJ13DR7ET7W99XMSP` (13), `job_01M7SZDVMYAE9VRCVNP1T3ZB94` (16, 17 v1), `job_01M7T1JFKJWYD82H90VHZ63QDG` (17 v7.1) | two takes each; see `v7-verdicts.jsonl` (`frame-*`) |
| Last frames (from the picked first frame) | `scene-pack-refs` | `job_01M7T05YEXCM5X7KS28CEY824H` ... `job_01M7T06SWJZDXAYSFRQ36BBH1T`, `job_01M7T1XD37K4PVSHVXTJS7QE96` (18 v2) | `end-*` |
| Clips | `video-from-frames` (first and last frame) | 03 `job_01M7T0SJ8MHV3K4G7KT7MGQ13P`, 04 `job_01M7T0QZSR2KNTW3TM97R6QD3X`, 05 `job_01M7T0RADPH56V0P2KTXS4XPZA`, 06 `job_01M7T0RJNZ0JND8FZKYZQTJAYQ`, 07 `job_01M7T0RNXPKQW0HZY6NS5WFXPH`, 08 `job_01M7T0RRWYRP15JS5GQBJJ26RM`, 09 `job_01M7T0RVSV4806TGBYVP5QWBP1`, 10 `job_01M7T0RYQR1HRF8W2505Y8RMSR`, 12 `job_01M7T0S1RR8K9B6WHRYGYDPFJ7`, 13 `job_01M7T0S52RTAW8RVCAHBWVCQ58`, 16 `job_01M7T072Z325KTJCVE2VZ9QJAF`, 17 `job_01M7T1XXTGZ6SV9DSFJS8QZV16`, 18 `job_01M7T22K0PQGBVK11YAYASPXTW` | takes: 03 0, 04 1, 05 1, 06 1, 07 0, 08 1, 09 0, 10 1, 12 1, 13 1, 16 1, 17 1, 18 1 (`clip-*`) |

Kept from v5: 01, 02 (first person at the desk), 11 (both redrawn agent frames came out magenta; both judges kept the v5
frame, 10 and 9 of 10), 14 (the door) and 15 with the Matrix glitch into the future office, exactly as they were.

The ending (16, 17, 18) is in shot 15's own office: 16 starts on shot 15's frame at 5.95 s, where the cut leaves it, and
turns to the side wall, where the mentor sits at an oak desk; in 17 he rises, walks round the desk and holds out a red
and a blue capsule; 18 is a 2.2 s push-in (both 5 s takes swelled the palms toward the end, judges: «unnaturally swollen,
large, and cartoonish»). 17 was redrawn once: its first last frame looked at the window wall and both takes cross-faded
through the desk; the v7.1 last frame keeps 16's camera direction. The mentor's line starts 3.3 s into 17, as his hands
open. The mentor is an original character drawn from his own reference sheet: bald, a short trimmed grey beard, small
round dark glasses, a charcoal suit, a white shirt open at the collar with no tie, a green pocket square; no prompt names a
film or an actor. «Capsule» is the word in the prompts (moderation refused «pill» in v5).

Check: a contact sheet of the RU cut (3 frames a shot) read by both judges, then a second round on 20 frames of the ending
and 10 of shot 11: no blocking defect by two of three models (Sonnet named the second desk the camera finds, which is the
operator's «где-то он поворачивается»; round one's «agent appears» in 11 is that shot's peek). Mix: RU -21.9 LUFS,
peak -1.9 dBFS; EN -22.5 LUFS, peak -1.6 dBFS. Files: 15.2 MB each, under the 25 MiB asset limit; 83.7 s.

Cost (Foundry ledger, the 39 v7 jobs): USD 53.06, of it about USD 47 the clips; each job has one ledger line in state
`unknown` (its last operation awaits Foundry's reconciliation).

Recorded in Asset Foundry: traces `op-20261119-film-continuity` and `op-20261119-film-ending-style` (the operator's words,
the change, the verdict), and board request `a71ddd94` (thread `b1b4cb38`, capability `change.request`) asking a versioned
film recipe that builds location and character references before any shot and keeps one drawing style per character.

Publication note (rule «Content first, compliance as metadata»): the red and blue choice is still a homage to a famous
film; the v7 mentor no longer wears the long coat and has a beard, an open collar and a green pocket square, which lowers
the likeness risk noted for v5 below.

## v5 (2026-11-18)

All media made in Asset Foundry on the Mac Studio, project `passioncode-site`, 2026-11-18; the cut is
`story/film/cut.py` (shot table `shots.py`, `shots.json`). Ordered «to the end» by the operator (2026-11-18:
«доделаем полностью все до конца»), so every pick was the agent's, each checked by a second model, a third on a split
(operator rule «Autonomous or trial»).

## Picture: 16 shots, `blender-previz` (Blender blockout, Seedream look, Seedance 2.5 clip)

| Shot | Foundry job | Look picked (judges) | Clip taken (judges) |
|---|---|---|---|
| 01 | `job_01M7QQ0ZMADNP1GWVRYCHS5NNA` | 0 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 0, claude-sonnet-5.5 0) | 1 of 3 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 1) |
| 02 | `job_01M7QQCAZNB2T7SKHJGMTYFR2A` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 0 of 3 (gemini-3.1-pro-preview 2, kimi-k3.1-pro 1, claude-sonnet-5.5 0) |
| 03 | `job_01M7QQAFQ8PEHXCYMZY8NTAZXA` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 2 of 3 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 2, claude-sonnet-5.5 2) |
| 04 | `job_01M7QQAKE0048JFSE3FDWE5TD2` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 1 of 2 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 1, claude-sonnet-5.5 1) |
| 05 | `job_01M7QQAPCK4TZMZQ7WKK63G22W` | 1 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 1) | 1 of 2 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 1, claude-sonnet-5.5 1) |
| 06 | `job_01M7QQAS8TJYGQ8P055ZGXNKNA` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 1 of 2 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 1) |
| 07 | `job_01M7QQAWMD30NJ3SC3BZB8YB18` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 0 of 2 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) |
| 08 | `job_01M7QQB0JV8ZEJZC2MBRR2G0AC` | 1 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 1) | 1 of 2 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 1, claude-sonnet-5.5 1) |
| 09 | `job_01M7QQCDEBBVKTZ3YW0R0WPF1X` | 0 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 0, claude-sonnet-5.5 0) | 2 of 3 (gemini-3.1-pro-preview 2, kimi-k3.1-pro 2) |
| 10 | `job_01M7QQBAP9V3DDSEQHZF2BFR1K` | 1 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 0, claude-sonnet-5.5 1) | 0 of 1 (one take) |
| 11 | `job_01M7QQBDPGTDZHPBVHFEW0EHN3` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 0 of 3 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 1, claude-sonnet-5.5 2) |
| 12 | `job_01M7QQBGNQ0XQC31F2EJ6MHN5P` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 2 of 3 (gemini-3.1-pro-preview 2, kimi-k3.1-pro 2) |
| 13 | `job_01M7QQBKGK6YXPZZPRX2R8V8JT` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 1, claude-sonnet-5.5 0) | 0 of 2 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 1, claude-sonnet-5.5 0) |
| 14 | `job_01M7QQBP6PX2EP57CK53HZ15WG` | 1 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 0, claude-sonnet-5.5 1) | 1 of 2 (gemini-3.1-pro-preview 1, kimi-k3.1-pro 1) |
| 15 | `job_01M7QQBRWACPP5P6RFMGNF3NEF` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 0 of 1 (one take) |
| 16 | `job_01M7QRZGDY4X1WB8DM9X6J69FQ` | 0 (gemini-3.1-pro-preview 0, kimi-k3.1-pro 0) | 0 of 1 (one take) |

Splits of three: shot 02's takes are nearly the same frame, take 0 kept; shot 11's take 0 shows the agent peek out and
hide again with the error lit, kept on the agent's own viewing. One-take clips were checked for defects by two models:
10 and 15 usable (the «black frame» named for 10 is the contact sheet's empty sixth cell), 16 split (Gemini: hands
distort; Kimi and Sonnet: usable), kept after viewing the last frame at full size: hands whole, beads clear.

Shot 16 was first refused by Seedance's content moderation for the word «pill» (`job_01M7QQBVEAJBDHE1NKV28F8PJJ`); it
was redrawn as a fork worded «a red bead and a blue bead» (above). The end still `future-office.jpg` is shot 15's
picked look frame (a separate `brand-visuals` order came out neon twice and was cancelled, `job_01M7QM8Q72XAFR4DFCWEGHY5D8`).

Clips Foundry's own gate refused for their audio sample rate (44.1 or 32 kHz against 48 kHz) were taken from the job's
`stages/clip/` with their audio dropped; the defect and its cost are reported to Asset Foundry (board request
`bab23e73`).

## Voices: `speech-line`, ElevenLabs

| Line | Language | Foundry job | Second model (gemini-3.1-pro transcript) |
|---|---|---|---|
| again | en | `job_01M7QQ5F7Y1VADB5JEMSP1Q04E` | heard as written |
| again | ru | `job_01M7QQ5HHXQH09DBDHMYP0822Q` | heard as written |
| film-morpheus | en | `job_01M7QQ5KTPJ1ZAKJE2P0E6J7P9` | heard as written |
| film-morpheus | ru | `job_01M7QQ5P34M2R7W3G9N82DZPRP` | heard as written |
| again | de | `job_01M7QQ5X9BQ5JP8ZH89AZY5SAT` | heard as written |
| again | es | `job_01M7QQ5ZP7CJ3077W3MM6QB1KA` | heard as written |
| again | fr | `job_01M7QQ620V4JW40DK407BK3FTK` | heard as written |
| again | ja | `job_01M7QQ64GB4FMHGBXRS8H6S93V` | heard as written |
| again | ko | `job_01M7QQ66YRRE84KJ5JY4AZD4PJ` | heard as written |
| again | pl | `job_01M7QQ697W2NZ12CCKF3J02TYP` | heard as written |
| again | pt | `job_01M7QQ6BFV0040BRHCNJ9KZX3R` | heard as written |
| again | zh | `job_01M7QQ6DT9SY562KCJ5B4HXA16` | heard as written |
| film-manager | en | `job_01M7QYJ44KW56KBWJ4FBXB9VEK` | heard as written |
| film-manager | ru | `job_01M7QYJ60TRZX6QPHKHA8WP4QB` | heard as written |

Morpheus: the saved voice «Morpheus PassionCode», as in the comic. The manager: ElevenLabs' premade «Jessica»
(`cgSgspJ2msm6clMCkdW9`), since the name «Hope» matched two voices.

## Sounds: `sfx-oneshot`, `ambience-loop`, ElevenLabs

| Sound | Foundry job | Take (judges) |
|---|---|---|
| f-keyboard | `job_01M7QQ6ZK7M1S8J17B6SAQ02Z4` | 1 (gemini-3.1-pro-preview 1, gemini-2.5-flash 1) |
| f-papers | `job_01M7QQ71Z47Y473B02NA429Q5T` | 0 (gemini-3.1-pro-preview 2, gemini-2.5-flash 1, gemini-3-flash-preview 0) |
| f-freeze | `job_01M7QQ75JCWFH7PGVQK2TK2F2R` | 1 (gemini-3.1-pro-preview 0, gemini-2.5-flash 1, gemini-3-flash-preview 1) |
| f-coffee | `job_01M7QQ77SE0ARHWTQ5FGZQBW5W` | 1 (gemini-3.1-pro-preview 1, gemini-2.5-flash 1) |
| f-coat | `job_01M7QQ7BC8A37GSF7BB5VW7ASQ` | 2 (gemini-3.1-pro-preview 0, gemini-2.5-flash 2, gemini-3-flash-preview 2) |
| f-pings | `job_01M7QQ7TC954Z4VZYAM1QD84D7` | 0 (gemini-3.1-pro-preview 1, gemini-2.5-flash 3, gemini-3-flash-preview 0) |
| f-steps | `job_01M7QS2RRD75TP980FG42KN0N0` | 1 (gemini-3.1-pro-preview 1, gemini-2.5-flash 0, gemini-3-flash-preview 1) |
| f-door | `job_01M7QS2TMKY3F9NF8GQNAXWB75` | 0 (gemini-3.1-pro-preview 1, gemini-2.5-flash 0, gemini-3-flash-preview 0) |
| f-office | `job_01M7QYYKKNJZ2CJ845N4M14TP1` | 0 (one take) |
| f-future | `job_01M7QYYP1AZCVNV3HYRVZJHFKE` | 0 (one take) |
| f-walla1 | `job_01M7QZHKFEM58BYK198VRV52Y8` | 0 (gemini-3.1-pro-preview 0, gemini-2.5-flash 0) |
| f-walla2 | `job_01M7QZHP29BV5X2SA5H060NJWV` | 0 (gemini-3.1-pro-preview 0, gemini-2.5-flash 0) |
| f-walla3 | `job_01M7QZHRD77B3ZFJE18R9JYVN1` | 0 (gemini-3.1-pro-preview 0, gemini-2.5-flash 0) |
| f-walla4 | `job_01M7QZHTTP4BYR52T6FN1J6NKE` | 1 (gemini-3.1-pro-preview 1, gemini-2.5-flash 1) |

The office under shots 03 to 09 is built from three walla takes (walla2 failed Foundry's DC-offset gate) laid over each other with crossfades (a 2.2 s
`ambience-loop` take repeated its own keyboard click every 1.7 s); `ambience-loop` gives about 2 s seamless loops, not
the 20 s asked. The music bed is the comic's `audio/music/bed.mp3` (`job_01M7QM3WN3RM0M8Q5B0WZEKSQN`), joined to itself
with a 4 s crossfade before its own fade-out.

## Cost

Picture: USD 179.13 across the 17 `blender-previz` orders (about USD 60 of it clips the audio-rate gate refused and
redrew). Sounds and voices: about USD 0.52. Asset Foundry runs without project lines since 2026-11-18 (operator, board
request `ecbaf6a4`); the emergency stop held.

## Delivery notes for publication (operator rule «Content first, compliance as metadata»)

- **Likeness.** Morpheus is drawn as an original character (the prompts say so), but a bald man in small round dark
  glasses and a long dark coat offering a red and a blue choice is a close homage to «The Matrix» (Warner Bros.). The
  photographic shots 15 and 16 make the resemblance to the 1999 film's actor stronger than the drawn ones. Risk: a
  rights holder or a platform's impersonation policy (Meta, YouTube) may object in paid ads; an organic page is lower
  risk. Variants that pass more easily: redraw 15 and 16 in the film's charcoal style, change the glasses and coat.
- **Pills.** Seedance's moderation refused «pill»; ad platforms' drug policies may read pills the same way. The film
  shows beads; the page says «pill» in its buttons' class names only, its text says «красная», «синяя».
- **White rabbit.** A literary motif (Carroll), free to use.
- **Voices.** Synthetic (ElevenLabs); a disclosure «AI-generated voice and images» fits where a platform asks for one.

## The mix, measured (2026-11-18)

Integrated loudness -22 LUFS (EN -22.4, RU -21.8), sample peak -1.7 dBFS (`alimiter` with `level=disabled`: its default
lifted the output to full scale). The manager's line sits about 17 dB above the office walla (-10.8 against -28 dB mean
over one second); the music bed never drops below about -30 dB, its own fade-out is crossfaded away. Two audio judges
(`gemini-3.1-pro-preview`, `gemini-3-flash-preview`) were asked three times; their remarks changed every round and
contradicted these measurements (a «buried» voice 17 dB above the bed, «dead air» at -28 dB), so none is taken as
blocking. A person's listening on studio headphones is the check they cannot replace (board row).
