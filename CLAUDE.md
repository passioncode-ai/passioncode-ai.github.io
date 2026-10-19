@AGENTS.md
<!-- SSHLG:PROJECT:BEGIN managed by npx sshlg-skills enroll. To opt out, replace the whole block with one SSHLG:PROJECT:OPTOUT comment line. -->
## Family routes in this project

Surface: `public-web` (detected).
Signals:
- robots.txt: `robots.txt`
- sitemap: `sitemap.xml`
- string catalogue: `i18n/de/404.json`, `i18n/de/_checks.json`, `i18n/de/_common.json` and 163 more

Routes that apply here (the global routing block says what each one owns):

| Router | Answers | Setup here |
|---|---|---|
| `super-ux` | what the interface must do | scenarios and their linter: partial (`/ux-init`) |
| `sheleg-design` | how it looks and moves | nothing to seed |
| `copywriting` | how it sounds | brand pack: present |
| `seo-llmo` | whether a machine will find it | SEO brief or audit: missing (`/seo-aeo-audit brief`) |
| `evidence-docs` | what proves it | nothing to seed |
| `task-pipeline` | how the change reaches the repository | DOCMAP: present |

Remaining setup:
- `/ux-init`: scenarios and their linter for `super-ux`, missing `docs/ux/lint.py`
- `/seo-aeo-audit brief` (or `/seo-aeo-audit` for a full audit): SEO brief or audit for `seo-llmo`, missing one of `docs/seo/brief-*.md` or `docs/seo/audit-*.md`
<!-- SSHLG:PROJECT:END -->
