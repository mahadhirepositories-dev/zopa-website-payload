# Proposal

## Why

Frontend sections currently appear all at once when a page loads, which reads flat and offers no visual hierarchy or polish. The site needs subtle scroll-driven entrance animations — a short, smooth fade-up from slightly below the resting position — applied consistently to blocks and to individual elements inside them, so pages feel more professional without heavy JavaScript or layout disruption.

## What Changes

- Add a small, reusable client-side animation system under `src/components/Reveal/`:
  - `Reveal` — animates a single element (used to wrap whole blocks) when it scrolls into view.
  - `RevealGroup` — a container that reveals its direct `RevealItem` children with a staggered delay (index-scaled), triggering when the container enters the viewport.
  - `RevealItem` — one auto-indexed child of `RevealGroup`; renders fully visible when used outside a group.
- Animation behavior: translate from slightly below (`translate-y-6` ≈ 24px) to the normal position while fading opacity 0 → 1, ~500ms `ease-out`, all gated behind `motion-safe:` so `prefers-reduced-motion` users see content instantly with no transform.
- Reveal fires once per element via `IntersectionObserver.disconnect()` — it triggers on entering the viewport and does not replay unnecessarily.
- Apply the whole-block wrapper in `src/blocks/RenderBlocks.tsx` so every block on every page (home, `[slug]`, blog, posts, shop, product layouts) animates consistently with zero per-block edits; optionally wrap the hero in `src/app/(frontend)/[slug]/page.tsx`.
- Use `transition-[opacity,transform]` (not `transition-all`) so existing hover/color/border transitions are unaffected.
- No new dependencies; existing layout, tags, spacing, and anchor scrolling (`id`/`scroll-mt-*`) behavior are preserved.

## Capabilities

### New Capabilities

- `reveal-animations`: The ability for frontend sections to reveal themselves with a subtle fade-up animation when scrolled into view, including optional staggered reveal of individual child elements, firing once per element and respecting reduced-motion preferences.

### Modified Capabilities

- None. No existing specs (capability inventory is empty).

## Impact

- `src/components/Reveal/index.tsx` — new component file (exports `Reveal`, `RevealGroup`, `RevealItem`).
- `src/blocks/RenderBlocks.tsx` — wrap each rendered block with `<Reveal>` (replaces the existing plain `<div>` wrapper; identical structure).
- `src/app/(frontend)/[slug]/page.tsx` — optional hero reveal wrapper.
- Optional per-block usage of `RevealGroup`/`RevealItem` inside block components (e.g. `src/blocks/Services/Component.tsx`) for staggered inner elements.
- No changes to Payload collections, database schema, APIs, or dependencies; no Breaking Changes.