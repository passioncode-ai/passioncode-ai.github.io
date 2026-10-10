Contract: brand-contract v1
Voice pack: operator-brief
Locales: en (primary), ru, de, fr
Locale parity threshold: 80%
Derived-from: P-01, JTBD-01
Status: draft
Humanization: on
Humanization pass: own
Last calibrated: 2026-10-01

## Axes
| Axis | The product IS | The product IS NOT |
|---|---|---|
| Confidence | concrete about the available tool | promising verified autonomy |
| Register | plain product language | internal architecture shorthand |
| Distance | a builder speaking to builders | sales ceremony |
| Humor | restrained | playful about credentials or errors |
| Density | one idea per section | a feature inventory in the headline |

## Narrative
The full message house (promise, problem, journey, proofs, per-page jobs, words we own and ban) is [narrative.md](narrative.md), approved by the operator on 2026-10-10 with the six decided terms ([terminology.md](terminology.md#decided-terms-operator-2026-10-10)); the lines below are its summary for this pack.
Hero: the builder or team working with AI agents.
Enemy: account juggling and fragmented coordination.
Product role: a composable workplace for agents: independent account, service, project and mail tools; Fabric is an early preview.
Promise: choose useful tools today, adapt them to your workflow, and see the boundary between a release and planned coordination.
Vision (operator, 2026-10-05): do what you love — agents take the rest. Start with words, the workplace grows with you, and every week leaves more room for creative work. Local, open source, safe, yours to shape, run by the agent subscription you already have. Copy states it as the direction and names today's start (one command and a coding agent).
Commercial register (/business/): the same voice speaking to a company lead — concrete processes, the formula behind every number, no fixed package, no promised price.

## Saved Tone of Voice (2026-10-10)
The voice above, the approved narrative and the decided terms are saved as a private, immutable Tone of Voice in our copy agent (internal tooling, never named on a page). Copy checks and translations pass it as `voiceRef {voiceId, version}`. A saved voice never changes: a later change is a new draft and a new voice, recorded here.

| Field | Value |
|---|---|
| Name | PassionCode.ai — site voice |
| voiceId (resourceId) | `c2ca25b8-aad6-4e92-9ada-b3b8a880cc7e` |
| Version | 1 |
| Content hash | `29392ff21493342a027f022b41de081f5bcc1e432c5f849778412b85a1c4808d` |
| Saved | 2026-10-10, save operation `25138766-e663-4dd7-9f2e-2202a2dc7635`, from draft `bd778985-6cfe-4ea9-a99b-c6413fecec85` revision 1 (draft operation `d162e54b-7695-4605-aae2-045ac474d014`) |
| voiceRef | `{"voiceId": "c2ca25b8-aad6-4e92-9ada-b3b8a880cc7e", "version": 1}` |
| Contents | primary locale en-US; five axes and twelve secondary traits; 28 rules; 32 bans; 42 lexicon entries (product names do-not-translate, license wording required and banned phrases forbidden, each in the ten locales; the D-T2…D-T6 terms preferred and their rejected forms forbidden in en-US and ru-RU); overlays for ru-RU, de-DE, fr-FR, pl-PL, ko-KR, es-ES, pt-BR, ja-JP, zh-Hans-CN; channels web and ui; 4 positive and 4 negative examples |
| Superseded | the unsaved review draft `b4f63ab7-b080-406c-8cc8-9b20735163b0` revision 1 ([narrative §8](narrative.md#8-tone-of-voice-w2)), written before the terms were decided; it was not saved |

## Invariant in every language
Do not blur available beta capabilities with Fabric's development direction. Name limitations where they affect downloading or installing.

## Reconsidered per locale
English is the source; Russian (since 2026-10-08, /ru/) is generated from it through the catalogs in i18n/ru/ (docs/DEPLOYMENT.md#languages). Russian keeps the same plain, concrete register: product names stay English, the glossary is fabric-workspace knowledge/localization.md, «открытый код под GNU AGPL-3.0» for open source, «оценка» for estimate, never «бесшовный», «полностью автономный» or «гарантированная экономия». A translation may not soften a limitation; i18n/<locale>/_checks.json holds the disclosures each language must keep. German (since 2026-10-10, /de/) addresses the reader informally (du/dein), as one builder to another; French (/fr/) uses the polite vous. Both keep product names English, the same facts and every disclosure in i18n/<locale>/_checks.json; the banned phrases are banned in their own words (nahtlos, vollständig autonom; sans couture, entièrement autonome). Polish (/pl/, including /pl/business/) addresses the reader informally and in the singular (ty: Twój, Ciebie, Tobą, capitalised as in a letter), as one builder to another; the plural Wy register is not used for the reader (an option label that addresses PassionCode itself, "You build and run it for us", keeps the plural). Spanish, Portuguese (Brazil), Korean, Chinese and Japanese follow the registers recorded in their catalogs; a native-speaker review is open for every language but English and Russian (docs/backlog.md SITE-025). Dollar amounts follow each language's Intl pattern, the one assets/estimate.js prints for computed amounts (2 150 $ ru, 2150 US$ es, 2.150 $ de, 2 150 $US fr, 2150 USD pl, US$ 2.150 pt-BR, $2,150 ja, US$2,150 zh-Hans and ko); scripts/locales.test.mjs pins the static ones to it. More languages follow the same rule.

## Failure mode
Insider shorthand or a performance of limitations obscures what the tool is useful for.
