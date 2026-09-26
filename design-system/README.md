# PassionCode design system · 1.0.0

Canonical public token source: [tokens.css](tokens.css). Public reference: [passioncode.ai/design-system/](https://passioncode.ai/design-system/). Introduced by the operator's 2026-09-26 request for a common PassionCode system and a yellow S on black for Switchboard.

## Identity and roles

The passion fruit remains the parent brand. Products carry their own glyph on the same dark tile; Switchboard uses S, Project Observatory an observing lens with a gold point (O). Product name: Fabric Switchboard, short form Switchboard. Fabric is the CEO AI agent in development; the Fabric technical kernel retains its technical meaning.

Use the semantic `--pc-*` tokens, not sampled colors. Gold is action/selection/focus; peach is warning, green positive, pink-red negative, blue information. Always pair state color with text. Plum/magenta belong to brand illustration, not operational status. Marketing can use the existing spacious hero and fruit; desktop uses compact rows and quiet surfaces. No animated backgrounds inside repeated workflows.

## Typography and controls

System sans fallback, no network font requirement. Body 14px for desktop, 18px for marketing explanation; metadata 12px; data in monospace. A 4px base spacing grid, 8px control corners, 16px desktop panels, 24px marketing features. One prominent action per task region; platform download alternatives are equally available. A primary control has dark text on gold. Secondary controls retain a visible border. Disabled controls keep their label and cannot be activated. Focus uses a gold outline with space from the control; never remove keyboard focus to improve a screenshot. Links in prose are underlined.

## States and motion

Preserve empty, loading, unavailable, error and success states. Unknown usage never becomes zero. Gold never implies an authenticated account or successful provider request. Hover/state transitions use the shared ease-out and duration tokens; reduced motion makes them immediate. No new animation is necessary for this identity update.

## Adoption

The site serves the canonical file. Switchboard vendors its exact bytes and records source commit + SHA-256 in `brand/passioncode/manifest.json`; its existing app token names alias those shared roles. Update the canonical source, review the rendered site and app, then copy and repin. A brand check rejects drift. Fabric's internal design documentation points here; legacy Fabric runtime screens are not silently restyled or claimed migrated.

## Verification

`npm run check` validates the canonical tokens, product mark, public pages and deployment. Browser checks cover desktop/mobile layout, named links and keyboard focus. This is not a full WCAG or screen-reader conformance claim.
