# Design

## Context

See proposal.md — Why. The frontend is a Next.js 16 App Router site using Tailwind CSS v4 with the `motion-safe:` variant available. Pages compose blocks via `src/blocks/RenderBlocks.tsx`, which currently wraps each rendered block in a plain `<div>` inside a `BlockErrorBoundary`. Content is server-rendered; any scroll-triggered animation must live in a React client component ('use client'). The project uses `cn` (clsx + tailwind-merge) for conditional classes and `@/` path aliases. No animation library is installed; the change must add none. Anchor scrolling relies on element `id` and `scroll-mt-*` utilities that must keep working with the wrappers.

## Goals / Non-Goals

**Goals:**
- One reusable client component module exposing `Reveal`, `RevealGroup`, and `RevealItem`.
- IntersectionObserver-driven, once-only reveal; fade-up via opacity + translateY; short ease-out duration.
- Automatic staggering of a group's direct children with an optional manual index override.
- Apply consistently by wrapping every block in `RenderBlocks.tsx` (one edit covers all pages) without per-block edits.
- Reduced-motion users get instant, final-state content (all motion classes gated behind `motion-safe:`).

**Non-Goals:**
- No full-page/route-level transitions or scroll-jacking.
- No animation of hero/branding beyond the optional `[slug]` hero wrapper.
- No dragging, parallax, or arbitrary custom keyframes; the fixed preset (translate-y-6, 500ms, ease-out) is the single visual language.

## Decisions

### D1: Three-component client module in `src/components/Reveal/index.tsx`
Exports `Reveal` (single element), `RevealGroup` (container that observes and staggers), and `RevealItem` (single staggered child). All share constants for the motion classes (`MOTION`, `HIDDEN`, `SHOWN`) so retuning is one edit. `RevealItem` renders fully visible when used outside a group (context default) so misuse never hides content.
*Alternatives:* a single `Reveal` with an `intersect` prop and data-attribute staggering — rejected; separate Group/Item boundaries keep the "container observes once, children only animate" contract explicit and self-documenting.

### D2: IntersectionObserver with `disconnect()` for once-only reveal
Each `Reveal`/`RevealGroup` creates an IntersectionObserver (`threshold 0.15`, `rootMargin '0px 0px -40px 0px'`) and flips a `visible` state driving Tailwind classes; on first intersection it calls `observer.disconnect()` so it never replays (satisfies "fires once"). A guard sets `visible = true` immediately when `IntersectionObserver` is unavailable (SSR/old browsers) so content is never stuck hidden.
*Alternatives:* CSS-only `animation-timeline: view()` — new and inconsistent across browsers, cannot guarantee once-only; scroll-listener throttle logic — more code than an observer with no benefit.

### D3: Stagger via `transition-delay = index * step`, indices auto-assigned
`RevealGroup` walks its children with `React.Children.map` and clones each direct `RevealItem`, stamping `index = 0,1,2…` (descending one level through fragments so `<>…</>` groups still number sequentially). An explicit `index` prop wins over the auto value. `RevealItem` computes `transitionDelay = Math.min(index * stagger + delay, 700)` so deep lists never wait arbitrarily long. CSS transition-delay is declarative and needs no per-item observers.
*Alternatives:* per-item Observers with `stagger()` timeouts — wasteful (N observers) and less reliable than declarative delays.

### D4: Wrap every block in `RenderBlocks.tsx` with `<Reveal>`
The current `<div>` wrapper (inside `BlockErrorBoundary`) is replaced by `<Reveal>`. Since `Reveal` renders a `<div>` with the same external relationship, layout and `BlockErrorBoundary` semantics are unchanged. This applies the animation to every block across all pages automatically; `RevealGroup`/`RevealItem` are opt-in per block for inner staggering.
*Alternatives:* editing ~30 block components individually — rejected; high churn and easy to miss one. A page-level wrapper — insufficient, would animate the whole page at once rather than block-by-block.

### D5: `transition-[opacity,transform]`, all under `motion-safe:`
Container classes: `motion-safe:transition-[opacity,transform] motion-safe:ease-out motion-safe:duration-500 will-change-transform`; hidden/sown states `motion-safe:opacity-0/100` and `motion-safe:translate-y-6/translate-y-0`. Using the property-scoped transition avoids hijacking unrelated hover/background/border transitions on the same element, and `motion-safe:` satisfies reduced-motion (final state rendered) without JS feature detection.

## Risks / Trade-offs

- **Transform context** — while animating, `RevealItem` carries a `transform` that acts as a containing block for absolutely-positioned descendants. → Finished state is `translate-y-0`; only mid-animation positioning is affected. Document: don't wrap sticky/fixed elements that depend on a different ancestor in a group item; default `Reveal` wrapper keeps the same static behavior as the div it replaces.
- **Grandchildren not auto-staggered** — `assignIndices` only descends one level through fragments; deeper nesting needs an explicit `index`. → Accepted; keeps cloning shallow and predictable.
- **Transition-delay can postpone reveal on long lists** — cap at 700ms bounds the worst sequential lag.
- **Layout regression risk from changing the block wrapper** — `<Reveal>` renders a `<div>`; `RenderBlocks` already wraps every block in a plain `<div>`, so the DOM depth is identical. → Verified visually per page during implementation.
- **`IntersectionObserver` absence** — content shown instantly rather than hidden (safe degradation).

## Migration Plan

1. Add `src/components/Reveal/index.tsx`.
2. Swap the `<div>` wrapper for `<Reveal>` in `src/blocks/RenderBlocks.tsx`; optionally wrap `RenderHero` in `src/app/(frontend)/[slug]/page.tsx`.
3. Regression-check pages: above-fold appears on load, below-fold animates once, anchor scroll (`id`/`scroll-mt-*`) still lands, hover styles unaffected.
4. No DB, schema, or dependency changes — no data migration or rollback beyond reverting the two code edits.

## Open Questions

None that affect the specs, approach, or task breakdown.