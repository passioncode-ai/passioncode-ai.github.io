# Prevent display-copy punctuation regressions

## Objective and source diagnosis

The operator asked why decorative full stops returned and to correct both skills
and implementation checks. Source baseline: `9ec82afc7c3c184d7a5527a4244b6b096a816146`.
The preceding content fix is `d9dd06ab2cdabd7a624a1169d6d3db230e0617f3`.

History (inspect with `git show <commit> -- <path>`):

- `527b5ba4`: the homepage eyebrow acquired its terminal period.
- `86acb6c3a6908f68ce1d541ee25f2de280e72ea6`: the original headline was restored
  with its period. Restoring the wording does not establish that the operator
  requested that punctuation.
- `887923a8`: the staccato agents/tools/workflow reframe was introduced.
- Before the preceding fix, `scripts/check-site.mjs` required period-bearing
  literals and `scripts/switchboard-release.mjs` generated heading periods.
- super-ux 0.56.2 already contained the no-title-period rule (AT-07), but its
  Markdown title scan and this site's flat copy export did not preserve HTML
  heading roles. Advisory exit zero was mistakenly treated as adequate coverage.

This identifies source and validation failures. It does not prove that a model
copied a particular prompt phrase or that an installed skill ordered the periods.

## Implemented

- `scripts/html_copy.py` preserves static HTML structure for both projection and
  the source gate. Nested inline text/entities and explicit breaks are retained;
  script/style/template/explicitly hidden content is excluded. `aria-hidden`
  content can remain visually visible and is included.
- `scripts/check_display_copy.py` enforces the brand pack's display policy.
  Semantic headings, styled specimens/eyebrows/statuses, hero copy, buttons,
  labels and figcaptions are checked; ordinary explanatory paragraphs retain
  punctuation. Known abbreviations, versions, URLs, questions and ellipses are
  negative controls. A missing page or empty headline coverage fails.
- `npm run check` runs the new tests/gate and projection freshness, so existing
  CI and deploy paths use them. Sitemap and build HTML entries must equal the
  editorial corpus. Python uses only the standard library.
- The design-system specimen `Keep building.` was a real missed role; its final
  full stop was removed. No layout, interaction or product capability changed.
- Generated brand copy now keeps Markdown heading markers and joins inline words.

## Verification

- [Baseline](../evidence/2026-10-01-copy-guard/baseline.json): three planted regressions
  all passed the old `npm run check` (exit 0).
- [Candidate](../evidence/2026-10-01-copy-guard/candidate.json): the same three plants
  fail the mandatory gate with a display-copy diagnostic.
- `python3 scripts/test_display_copy.py`: 10 tests, including release-generated
  copy, hidden/attribute controls and missing/sitemap/build coverage.
- `npm run check`: 13 release tests, 10 editorial tests, seven pages / 239 display
  blocks, source/projection checks and existing token/Worker/brand guards pass.
- `npm run build`: 30 public entries. Browser/live and hosted checks are recorded
  after reviewed-main publication; local success alone does not prove deployment.

The parser does not compute CSS line breaks or JavaScript. Review actual narrow
and wide captures for those properties. Generic super-ux brand-lint remains
separate; no installed skill is required for this repository's CI gate. Model
baseline/candidate outcome evaluation is NOT_RUN.

## Continuation

Integrate this reviewed source, let normal hosted CI run and publish from main.
Then record the exact source, Worker version and live specimen readback. Skill
releases and local installation are tracked in the owning ssheleg repositories;
this site's source is the durable owner of its stricter display policy.
