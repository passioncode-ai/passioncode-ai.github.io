# SITE-075: the white rabbit and the organization's first offer

Status: live since 2026-11-19 13:45 UTC (PR #172, squash `0a54db4c`; Worker version `332d8af6-33f3-4ba2-b8a1-8416a0068ae0`). Backlog SITE-075 (and SITE-076, the asset swap).

## Order

The operator, 2026-11-19 (verbatim excerpt): «с лендинга перехода я так и не нашел с нашей главной страницы как у нас
перейти на assessment там где надо for organization там надо сделать assessment и organization это первое там первое что
предлагаем во второй уже заполнить себя форм да вот в главный странице давай сразу там сделаем такой типа белый кролик ...
чтобы была кнопка assessment organization ... пусть там белый кролик прибегает такой пропрыгивает по экрану типа
привлекает внимание и кнопки типа assessment и на ней останавливается сидит и с нее типа можно уже перейти и вот и
аналитику давай добавим сразу же».

Course check: North Star section 9 (company assessment), the first step of a company's path; follows SITE-072
(`docs/tasks/2026-11-19-home-assessment/README.md`).

## 1. What changed

| Part | Where |
| --- | --- |
| The hero's first button reads «Free assessment for your organization» (was «Get the free assessment») and holds the white rabbit, seated on its top edge at the inline end, facing the label | `index.html` hero (`.has-rabbit`, `.perch-rabbit`), `styles.css` SITE-075 block |
| The rabbit hops in once per page load: when the button is at least half on screen, 0.7 s later it appears at the far edge of the window, makes 3 to 7 soft hops 22 to 34 px high (0.47 s in the air, 0.17 s on the ground), pauses 0.95 s halfway, lands, and turns to face the label if it came from that side (about 3 to 6 s in all). Transform and opacity only, `pointer-events: none` while it moves; once seated a click on it opens the assessment (it is inside the link) | `assets/rabbit.js` (`plan`, `keyframes`, `mount`), loaded by `assets/site.js` only where `.perch-rabbit` exists; `scripts/rabbit.test.mjs` |
| Reduced motion, no JavaScript or no Web Animations: the rabbit simply sits on the button. The button row keeps 46 px (44 px on a phone) of room above, so nothing moves when it appears | `styles.css` (`@media (scripting: enabled) and (prefers-reduced-motion: no-preference)` hides it only until the script seats it) |
| Right to left: logical `inset-inline-end`, the seated rabbit mirrored to face the label, the crossing starts at the far edge whichever side the button is on | `styles.css` `:where([dir="rtl"])`, `assets/rabbit.js` `plan` |
| Organization offers put the assessment first, the form second: the 08 / grow step «Your organization’s own device» (`Get the free assessment`, then `For your organization`), /business/'s hero (`Get the free assessment`, then `Estimate and request`), /start/'s closing (the same) | `index.html` #grow, `business/index.html`, `start/index.html` |
| Analytics: `cta_click` location `rabbit` (a click on the rabbit itself; the button keeps `hero`), locations `hero` on page business and `start` with target `assessment`; the new event `rabbit_landed` (`motion`: hop, still), once per page load when the seated rabbit is on screen | `worker/analytics.js`, `docs/analytics/events.md` (row, funnel «Rabbit offer», history), `scripts/check-analytics.mjs` |
| Checks: the hero button, the rabbit inside it, the grow step, /business/'s and /start/'s order | `scripts/check-site.mjs` |
| UX record | `docs/ux/scenarios.md` SCN-029 (step 1a), SCN-001; `docs/ux/flows.md` FLW-08; `docs/ux/screens.md` SCR-01; `docs/backlog.md` SITE-075, SITE-076 |

## 2. Decisions

- D1. The rabbit is the story's white rabbit (`story/comic/rail.js` `RABBIT` on branch `site/story-morpheus`), inline SVG,
  because the calm asset of the story v7 (`assets/rabbit/` on `site/story-v7`) was not pushed when this unit was built
  (`git fetch origin site/story-v7`: no such ref at 13:05 UTC; the local worktree had no `assets/rabbit/`). Swapping it in
  is SITE-076.
- D2. The rabbit sits inside the link with its own `data-cta-location="rabbit"`: a click on it is the same navigation as
  the button and is counted apart, while the button's own clicks keep `location: hero`, so the hero series is not
  redefined (events rule: nothing renamed or redefined).
- D3. `rabbit_landed` is a new event because its meaning is new (the offer was shown with the rabbit), the denominator for
  the rabbit's clicks; `motion` is a closed list without `other`, so a wrong value drops the event.
- D4. Nothing is stored on the device (the site's analytics promise): the rabbit hops once per page load, not once per
  visitor.
- D5. The hop waits until the button is at least half on screen (0.95 kept it hidden on a 1440 x 900 window in Russian,
  where the button's lower part is below the fold), so a visitor who scrolls down to it still sees the crossing.
- D6. Translations of the one new string by Copylot `copylot_prepare` (voice `93cd4851` v1, writer `moonshotai/kimi-k3.1-pro`,
  judge `x-ai/grok-4.7`), every variant accepted as delivered; the rest are strings the catalogs already had
  («Get the free assessment», «Estimate and request»), copied into the business and start catalogs.

## 3. Translations and Copylot record

String «Free assessment for your organization» (English check `93cc7afd-0cf2-42cb-8b0d-69b715feca7d`, score 100, no finding).

| Locale | Text | Job | Judge | Check report (nothing blocking) |
| --- | --- | --- | --- | --- |
| ru | Бесплатная оценка для вашей организации | `job_ec55892be3d30b05d2146936` | 94 | `1379713d-62d2-4a62-bc5a-c31784b37ee7` (one advisory, web-conditional-claim) |
| de | Kostenloses Assessment für deine Organisation | `job_28b93c02a03b12b35b3835aa` | 96 | `d5c28e98-5f68-4c30-82de-5c33a221041f` |
| fr | Audit gratuit pour votre organisation | `job_9981e8dcca712e9464a9468d` | 94 | `666a5620-8273-4b89-ae5e-c514b9b825f8` |
| pl | Bezpłatna ocena dla Twojej organizacji | `job_8ae82bb6548a9ac0af9f66c6` | 95 | `6d1f4587-f248-4284-a7bd-d5bb8b8d72e1` |
| ko | 조직용 무료 진단 | `job_e0766504337210943344d2da` | 90 | `e1687d65-e0d1-491d-a35e-10dff1a59e0e` |
| es | Evaluación gratuita para tu organización | `job_64c26c94b028daf71b2a6edf` | 96 | `03c26203-b7d4-4f3d-9583-62cd049b6731` |
| pt-br | Avaliação gratuita para a sua organização | `job_c88f0ba484e521ba1b9fae59` | 98 | `56dfec9e-b32c-45ba-af5a-11f640f3d8ef` |
| zh-hans | 获取面向你的组织的免费评估 | `job_ac7ff1fa3d3823ecc187494a` | 84 | `771bb4b4-bd47-4cb9-82c4-9a937f2d5f22` |
| ja | 組織向け無料アセスメント | `job_5d72f62bc5161b9ad5eb15f6` | 92 | `8c409068-4249-4a4b-98b6-498934e0ab01` |

Copylot spend: about USD 0.43 (nine jobs, USD 0.037 to 0.062 each). The judge called the zh-hans label long for a button
(14 characters); kept, recorded for the native review (SITE-071).

## 4. Checks

- `npm run check`: exit 0 (143 node tests including `scripts/rabbit.test.mjs` and the SITE-075 analytics test; check-site
  over 420 pages; display copy 429 pages; public copy 429 projections; no em dash in 832 files).
- Local build (`npm run build`, 510 entries) served from `dist/` and driven by Playwright WebKit (Safari's engine) at
  1440 x 900 and 390 x 844 in en and ru, plus reduced motion and a forced right-to-left page:
  no horizontal overflow during the hop (`scrollWidth - clientWidth` = 0), the button's box identical before and after
  (no layout shift), the rabbit seated at the button's inline end, a click on the seated rabbit requested
  `https://assessment.passioncode.ai/?lang=en` (en) and `?lang=ru` (ru); with reduced motion the rabbit is `is-seated` at
  opacity 1 without a hop; right to left it crosses from the left edge and sits at the button's left end facing the label.
  Shots were working files (the disk had under 4 GB free) and are not kept.
- Second-model review of five shots (`google/gemini-3.1-pro-preview`, USD 0.09 in two runs, key
  `passioncode-ai.github.io/prod/OPENROUTER_API_KEY` through `use_secret.py`): PASS; the offer is impossible to miss, the
  rabbit reads as a rabbit and sits on the edge without covering the label or the arrow. Its notes: mid-hop the rabbit
  passes over the proof card's links for a moment (it never blocks a click, `pointer-events: none`; kept); the forced
  right-to-left English page reverses «60 to 85%» (English text under `dir="rtl"`, a test artefact: the home is not
  published in a right-to-left language).

## 5. Open

- SITE-076: swap in the calm rabbit asset of the story v7 when `site/story-v7` is pushed.
- Native review of the new string joins SITE-071.

## 6. Deploy and live evidence

- Merge: PR https://github.com/passioncode-ai/passioncode-ai.github.io/pull/172 (its `check` job passed in 37 s), squash
  `0a54db4c` on `main`.
- Deploy: `use_secret.py run --env prod passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID -- npm run deploy` from `main`
  `0a54db4c`: `npm run check` and `npm run build` inside it passed; 33 files uploaded (477 already there); Worker version
  `332d8af6-33f3-4ba2-b8a1-8416a0068ae0`.
- Live links, read with curl: `/`, `/ru/`, `/ja/` carry the hero button in the page's language with `?lang=<lang>` and the
  rabbit inside it; `/business/` and `/ru/business/` offer the assessment before `#request`; `/start/` offers the
  assessment before /business/; `/assets/rabbit.js` answers.
- Browser readback of the live site (Playwright WebKit) at 1440 x 900 and 390 x 844 in en and ru: the rabbit hopped in and
  sat on the button, no horizontal overflow, the button did not move, a click on the seated rabbit opened
  `https://assessment.passioncode.ai/?lang=en` and `?lang=ru` (intercepted, not followed); reduced motion: seated at once;
  forced right to left: seated at the button's left end. On the phone the rabbit crosses from the left edge and turns to face
  the label at the end (computed transform read every 0.5 s: `matrix(-1, ...)` while it travels right, none after it sits).
- Analytics in growth (`growth.analytics.events.list`, app `passioncode-site`, production, 13:40 to 15:00 UTC, as of
  13:48:57Z): `rabbit_landed` 7 (`motion` hop and still, `lang` en and ru), `cta_click` 4 (`location` rabbit, `target`
  assessment), `page_view` 7 on home. These are the agent's own checks, not visitors.
