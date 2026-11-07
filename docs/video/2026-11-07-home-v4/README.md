# Home video v4 (SITE-050, 2026-11-07): record

Operator request (2026-11-06, session 74a9440a): replace the home video with a new one about the change of
process: how person-shaped processes give way to agents run by Fabric, how an old team becomes a new
organization, then is cloned and scaled; short, with diagrams and agents, for founders, executives and investors.
It replaces the v3 cut ([record](../2026-10-12-home-v2/README.md)) in the same player under the hero: click to play,
never autoplays, `preload="none"`, a poster that is a real frame, captions on by default.

## The story, beat by beat

| Beat | Picture | Narration (en) |
|---|---|---|
| Today | four people pass one task along; each waits; assistants pile output on each; a meeting collects it | Your company runs on people passing work to people … Meetings reconcile what the assistants made. |
| Chaos | everyone's own agents, tangled lines, keys scattered, three unanswered questions | And everyone builds their own agents … or what it cost. |
| The shift | kinetic type | In an AI-native organization, agents run the process, and people steer it. |
| Fabric | the board (sample data) and its four duties, each with the site's status: routes the work and wakes the owner (PREVIEW), sets priorities and orders releases (DIRECTION) | Fabric keeps the board. Today, in preview … Next, it sets priorities and orders the releases. |
| People | direction, control, expertise | People give direction, approve what needs a person, and bring the expertise. |
| At work | the home page's diagram, then its three loops and the record | Here is what it looks like … Every task, every cost and every result is on the record. |
| One system | contract, vault, record, a dashboard per agent, each with its status | It holds together because it is one system … |
| Grow | one machine (AVAILABLE NOW · FREE) → the organization's device with spaces (ON REQUEST) → PassionCode runs the administration → clones (DIRECTION) | Start on one machine, free, today … the next company. |
| Close | the mark, the promise, two doors, passioncode.ai | PassionCode.ai: the workplace for AI-native organizations. Start free, or bring your organization. |

Every claim is one the home page already makes, with the page's own status word, so the video says no more than
the page (brief D6). No number, no customer, no assessment of people.

## Files

- Narration as spoken: [narration-en.txt](narration-en.txt), [narration-ru.txt](narration-ru.txt). Copylot rule check
  (voice `041b4138` v1): en `f2d75c44` 95.9 pass, ru `ef122e81` 98.2 pass, no blocking finding; the remaining notes are
  rule-of-three suggestions on lists the page itself uses.
- Word-timed transcriptions of the two narrations: [transcripts/](transcripts/).
- Cue times measured on them by [harness/timing4.py](harness/timing4.py): [cues-v4.json](cues-v4.json).
- Composition: [harness/gen4.py](harness/gen4.py) (the site's `design-system/tokens.css` linked unmodified, Inter and
  JetBrains Mono, GSAP 3.14.2, the site's sample-data board mockup, the v2 music bed).
- Caption text per cue in ten languages: [captions-source.json](captions-source.json) (24 cues per language); WebVTT
  written by [harness/vtt4.py](harness/vtt4.py) on the narration transcriptions shifted by the narration's start in
  the cut (0.6 s).

## How it was made (all through Asset Foundry, project `fabric`)

| Step | Result |
|---|---|
| Narration en, ru | recipe `speech-line`, the v3 narrator voice (ElevenLabs premade voice id `JBFqnCBsd6RMkjVDRZzb`, model eleven-v4), two takes each, the shorter chosen on measurement: en 90.80 s, ru 94.72 s. The direct ElevenLabs route refused with HTTP 401 (the subscription's latest invoice is unpaid), so the same model and voice were ordered through `openrouter-speech`, billed to the OpenRouter key: en $0.203, ru $0.217 |
| Word timings | recipe `video-analyze` on the narration wrapped in a still frame, transcription through `openrouter-speech` (Scribe v2): $0.006 each |
| Music bed | the v2 bed reused ($0); its full groove lands on the chaos beat, its final hit on the end card |
| Renders | recipe `video-render` on the authored composition, local render through Frame Agent ($0) |

Spend for v4: $0.43 (narration and timings). The pipeline's order ids and manifests stay in its private delivery
record, as for v3.
