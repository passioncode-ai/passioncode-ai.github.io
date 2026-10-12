# Home video v2: script and storyboard (SITE-041, 2026-10-12)

Operator request, 2026-10-12: a more dynamic, branded explainer for the home page, with music, that explains the
values, why it is for you and for an organization, how you work, how it is set up, the ecosystem and what it runs
on. Short and dense. It replaces the W10 cut ([record](../../evidence/2026-10-11-video/README.md)).

Narration is the exact text the media pipeline spoke: [narration-en.txt](narration-en.txt) (200 words) and
[narration-ru.txt](narration-ru.txt) (187 words). Each was written natively, in the site voice, from the approved
words of the home page, /vision/ and /business/ ([narrative](../../brand/narrative.md), [narrative for
organizations](../../brand/narrative-org.md)); every claim maps to a row of [facts.md](../../brand/facts.md) below.

Humanization: on — own pass plus the copy tool's rule check (saved site voice v2, no model, no charge): en-US
98.1 pass, ru-RU 95.1 pass, no voice-rule finding, 0 clichés. Three "rule of three" suggestions remain in each
language and are kept on purpose: "state, spend and control" (decided term D-T3, the toolkit role of Dashboards),
"board, memory and hand-offs" (narrative §3 step 5) and the values sentence. An earlier draft also had "asks its
questions, shows its plan, and waits for your yes"; it became the home page's approved line instead.

## Why this order

The W10 cut walked the journey only. This one argues in the order a visitor decides:

1. **Problem** (the reader's own words, narrative §2) — the hook, 10 s.
2. **Promise** — the home hero, verbatim (D1), so the video and the page say the same first thing.
3. **Values** — the three proofs (narrative §4) as values: open source on your machines, any agent and the
   subscription you already have, evidence you can open. They come before the product because they are why a
   builder trusts the rest.
4. **Start (for you)** — one command, no account, no key; then Fabric (preview) and the coding agent's plan.
5. **Toolkit** — one job per tool, in the order a person meets them (journey step 4–5).
6. **Together (day to day)** — agents in one project share the board, memory and hand-offs.
7. **Organization** — the /business/ promise, labelled as on request while PassionCode for Enterprise is built.
8. **Vision** — /vision/'s own line, then the address.

## Claims and their facts

| Line (en) | facts.md row / source | Label on screen |
|---|---|---|
| works for a week, then falls apart: wrong account, forgets, nobody can say what it changed | narrative §2 (problem); row *vision* | — |
| agent-agnostic operating system for AI-native teams; a workplace where agents do the work, and you see all of it | row *homepage hero*; narrative §1 | — |
| runs on your machines, as open source | rows *license*, *license short line*, *source availability* | AGPL-3.0 |
| with the agents and subscriptions you already have | narrative §4 proof 2; row *Fabric coding agents* | — |
| their work leaves a record you can open | narrative §4 proof 3 (not "every step", on purpose) | — |
| one command: skills for Claude Code or Codex; no account, no key | row *Launcher* | AVAILABLE NOW |
| Fabric, in preview, the home for your projects and their agents | rows *CEO name and status* (D-T5), *Fabric release*, *Fabric onboarding* | PREVIEW |
| your coding agent shows its plan before it changes anything | row *creating and converting agents today*; home step 3 copy | AVAILABLE NOW; "A written example, not a recording." |
| Switchboard: each agent on the account it should, limits in view | row *toolkit roles*; /vision/ part 02 | AVAILABLE NOW |
| Dashboards: state, spend and control, in one window | row *toolkit roles*, *Dashboards role and status* | AVAILABLE NOW |
| Observatory: what changed, with the evidence | row *toolkit roles*; narrative §4 | AVAILABLE NOW |
| Inbox, in preview: mail your agents answer only within your rules | row *Inbox role and status*; /inbox/ FAQ | PREVIEW |
| agents in one project share its board, memory and hand-offs | narrative §3 step 5; /vision/ path 02 | PREVIEW (hand-offs through the board) |
| we bring agents onto your machines, connect them, show what each one cost and what it delivered | row *commercial path*; home "For organizations" card | IN DEVELOPMENT · ON REQUEST |
| agents are easy to start and hard to keep; we are building what holds them together | /vision/ hero (`vision/index.html`) | — |

Not said, on purpose: no number (none is needed), no "CEO" (D-T5), no Fabric reply (its conversation does not reply
yet), no closed module and no private agent, nothing about coordination between agents as a present fact.

## Storyboard

Timings are seconds on the cut: the narration starts at 0.5 s, so a sentence start is its measured start in the
narration (ffmpeg `silencedetect`, −40 dB, 0.22 s; sentence ends pause 0.40–0.61 s, clause pauses 0.22–0.37 s) plus
0.5. To be confirmed against a word-timed transcription of the rendered cut before captions are cut (W10 found a
one-second error that way).

| # | Chapter | en start | ru start | Narration (en) | On screen | Visual source |
|---|---|---|---|---|---|---|
| 1 | Problem | 0.50 | 0.50 | Your agent works for a week. | the line, word by word | type only |
| 2 | | 2.60 | 3.78 | Then it falls apart. | second line in magenta | type only |
| 3 | | 4.63 | 5.61 | The wrong account. | symptom card 1 | type only |
| 4 | | 6.08 | 6.91 | It forgets what it learned. | symptom card 2 | type only |
| 5 | | 7.92 | 8.68 | And nobody can say what it changed. | card 3; then all three fall apart | type only |
| 6 | Promise | 10.57 | 11.06 | PassionCode.ai is the agent-agnostic operating system … all of it. | the hero line, word by word; the line under it at the colon; the music's full groove starts here | `passioncode-mark.svg` |
| 7 | Values | 20.67 | 21.33 | It runs on your machines, as open source, with the agents and subscriptions you already have. | value tiles: On your machines · Open source (AGPL-3.0) · Any agent, your subscription (Claude Code, Codex, Kilo Code, Hermes Agent, Cline) | type and line glyphs |
| 8 | | 26.63 | 27.42 | Their work leaves a record you can open. | tile 4: Evidence, not claims | type |
| 9 | Start | 29.27 | 31.51 | For you, it starts with one command: skills for Claude Code or Codex. | 01 · START, AVAILABLE NOW; terminal card types `npx @passioncode-ai/passioncode@latest update` | type |
| 10 | | 34.62 | (same sentence) | No account, no key. | two gold chips | type |
| 11 | | 36.84 | 38.10 | Fabric, in preview, is the home for your projects and their agents. | 02 · FABRIC, PREVIEW; the four actions outlined in two pairs | `journey-2-2.jpg` / `-ru` |
| 12 | | 41.41 | 43.32 | Your coding agent shows its plan before it changes anything. | 03 · FIRST AGENT, AVAILABLE NOW, "A written example, not a recording." | `journey-3-4.jpg` / `-ru` |
| 13 | Toolkit | 45.27 | 47.56 | Switchboard: … limits in view. | mark, name, line, AVAILABLE NOW | `switchboard-mark.svg`, `switchboard-accounts.jpg` |
| 14 | | 50.01 | 52.14 | Dashboards: … in one window. | same pattern | `dashboards-mark.svg`, `dashboards-overview.jpg` |
| 15 | | 54.52 | 56.75 | Observatory: what changed, with the evidence. | same pattern | `observatory-mark.svg`, `observatory-overview.jpg` / `-ru` |
| 16 | | 58.09 | 60.39 | Inbox, in preview: … only within your rules. | same pattern, PREVIEW | `inbox-mark.svg`, `inbox-overview.jpg` / `-ru` |
| 17 | Together | 63.53 | 66.52 | Agents in one project share its board, memory and hand-offs … | the toolkit map: Fabric's project (board, memory, hand-offs) in the centre, the four tools and the launcher around it; a hand-off drawn between two agents | `fabric-board.jpg` in the centre card, marks |
| 18 | Organizations | 70.20 | 73.59 | For an organization, we bring agents onto your machines … what it delivered. | machines joined by lines; "What each agent cost / What it delivered"; IN DEVELOPMENT · ON REQUEST | type and line glyphs |
| 19 | Vision | 77.74 | 81.39 | Agents are easy to start and hard to keep. | the line | type |
| 20 | | 80.80 | 84.31 | We are building what holds them together. | the line in gold | type |
| 21 | End | ≈83.3 | ≈87.0 | (music only: the track's final hit) | mark, passioncode.ai, "Open source under the GNU AGPL-3.0" | `passioncode-mark.svg` |

Russian on-screen text is written in Russian, not subtitled over the English cut, and uses the `-ru` pictures where
they exist. Expected lengths: en ≈ 86 s, ru ≈ 90 s.

## Look and motion (sheleg-design 1.64.1)

- **Token layer:** the site's own `design-system/tokens.css` (PassionCode 1.1, dark), linked into the composition
  unmodified; no colour literal outside it. Library packs do not apply: the brand owns its token layer. Theme baked:
  dark, the site's only theme.
- **Dials:** variance 7, motion 7, density 4. Brand-led explainer whose operator asked for "more dynamic" than W10
  (W10 sat near 5 / 4 / 4: one panel per beat, fades); density stays low — one idea on screen at a time, like the
  home hero and not like a dashboard.
- **One clock:** a single paused GSAP timeline; every cue derives from the measured narration starts above; a gold
  progress rail with eight chapter ticks along the bottom makes that clock visible.
- **Layers:** plain ground (no gradient, no grid, no grain: the render lint refuses a purple gradient, SLOP V001);
  product panels with depth (shadow, a small rotateY that settles flat); kinetic type; chips and the rail on top.
- **Hold, then redeploy:** a beat holds about 80 % of its sentence, then its panel moves to its next place (recedes,
  shrinks, slides) instead of crossfading.
- **Easing and durations:** entrances ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`), on-screen moves ease-in-out,
  no ease-in; entrances 0.45–0.7 s (DUR-ENTRANCE), nothing enters from scale(0) (0.95 at least); no flashing.
- **Sound:** narration at full level; the music bed 15–17 dB under it, louder only before the first word and on the
  end card, faded out at the end; target about −14 LUFS integrated for the web.
- **Degrade to calm (on the page):** a rendered file has no reduced-motion state, so the page keeps it: no
  autoplay, `preload="none"`, a poster that is a real frame, controls, captions on by default.
