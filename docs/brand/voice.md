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
Hero: the builder or team working with AI agents.
Enemy: account juggling and fragmented coordination.
Product role: a composable workplace for agents: independent account, service, project and mail tools; Fabric is an early preview.
Promise: choose useful tools today, adapt them to your workflow, and see the boundary between a release and planned coordination.
Vision (operator, 2026-10-05): do what you love — agents take the rest. Start with words, the workplace grows with you, and every week leaves more room for creative work. Local, open source, safe, yours to shape, run by the agent subscription you already have. Copy states it as the direction and names today's start (one command and a coding agent).
Commercial register (/business/): the same voice speaking to a company lead — concrete processes, the formula behind every number, no fixed package, no promised price.

## Invariant in every language
Do not blur available beta capabilities with Fabric's development direction. Name limitations where they affect downloading or installing.

## Reconsidered per locale
English is the source; Russian (since 2026-10-08, /ru/) is generated from it through the catalogs in i18n/ru/ (docs/DEPLOYMENT.md#languages). Russian keeps the same plain, concrete register: product names stay English, the glossary is fabric-workspace knowledge/localization.md, «открытый код под GNU AGPL-3.0» for open source, «оценка» for estimate, never «бесшовный», «полностью автономный» or «гарантированная экономия». A translation may not soften a limitation; i18n/<locale>/_checks.json holds the disclosures each language must keep. German (since 2026-10-10, /de/) addresses the reader informally (du/dein), as one builder to another; French (/fr/) uses the polite vous. Both keep product names English, the same facts and every disclosure in i18n/<locale>/_checks.json; the banned phrases are banned in their own words (nahtlos, vollständig autonom; sans couture, entièrement autonome). Polish (/pl/, including /pl/business/) addresses the reader informally and in the singular (ty: Twój, Ciebie, Tobą, capitalised as in a letter), as one builder to another; the plural Wy register is not used for the reader (an option label that addresses PassionCode itself, "You build and run it for us", keeps the plural). Spanish, Portuguese (Brazil), Korean, Chinese and Japanese follow the registers recorded in their catalogs; a native-speaker review is open for every language but English and Russian (docs/backlog.md SITE-025). Dollar amounts follow each language's Intl pattern, the one assets/estimate.js prints for computed amounts (2 150 $ ru, 2150 US$ es, 2.150 $ de, 2 150 $US fr, 2150 USD pl, US$ 2.150 pt-BR, $2,150 ja, US$2,150 zh-Hans and ko); scripts/locales.test.mjs pins the static ones to it. More languages follow the same rule.

## Failure mode
Insider shorthand or a performance of limitations obscures what the tool is useful for.
