# Tasks

## 1. Reveal component module

- [x] 1.1 Create `src/components/Reveal/index.tsx` exporting `Reveal`, `RevealGroup`, and `RevealItem` (client component; shared `MOTION`/`HIDDEN`/`SHOWN` classes; once-only IntersectionObserver with `disconnect()`; direct-child index assignment with `index` override; `transition-delay` cap at 700ms; renders fully visible when no group context) and verify it type-checks with `pnpm lint` on the file
- [x] 1.2 Confirm no new dependencies are required (Tailwind `motion-safe:` + `IntersectionObserver` only) and verify `package.json` is unchanged

## 2. Apply to blocks

- [x] 2.1 In `src/blocks/RenderBlocks.tsx`, replace the plain `<div>` block wrapper with `<Reveal>` (keeping the `BlockErrorBoundary` and depth identical) and verify all pages render blocks with no layout change
- [ ] 2.2 Optionally wrap `<RenderHero>` in `src/app/(frontend)/[slug]/page.tsx` with `<Reveal>` and verify the hero animates once on page load
- [ ] 2.3 Verify anchor scrolling still works: navigating with a `#anchor` link to a block (e.g. `#interest-block`) scrolls to the revealed element correctly

## 3. Staggered inner elements (strong + good candidates)

- [x] 3.1 Apply `RevealGroup`/`RevealItem` to `src/blocks/Services/Component.tsx` rows (space-y container)
- [x] 3.2 Apply `RevealGroup`/`RevealItem` to `src/blocks/Pricing/Component.tsx` cards grid
- [x] 3.3 Apply `RevealGroup`/`RevealItem` to `src/blocks/Howwework/Component.tsx` steps list
- [x] 3.4 Apply `RevealGroup`/`RevealItem` to `src/blocks/Lifeatzopa/Component.tsx` cards grid
- [x] 3.5 Apply `RevealGroup`/`RevealItem` to `src/blocks/Vission&Mission/Component.tsx` values cards grid
- [x] 3.6 Apply `RevealGroup`/`RevealItem` to `src/blocks/Outcomesection/Component.tsx` cards grid (including CTA card in same flex row)
- [x] 3.7 Apply `RevealGroup`/`RevealItem` to `src/blocks/Contactus/Component.tsx` contact cards stack
- [x] 3.8 Apply `RevealGroup`/`RevealItem` to `src/blocks/BlogSection/Component.tsx` post cards grid
- [x] 3.9 Apply `RevealGroup`/`RevealItem` to `src/blocks/RecentClients/Component.tsx` client logos grid
- [x] 3.10 Apply `RevealGroup`/`RevealItem` to `src/blocks/RelatedPosts/Component.tsx` related posts grid
- [x] 3.11 Apply `RevealGroup`/`RevealItem` to `src/blocks/Contactinfo/Component.tsx` contact detail items grid
- [x] 3.12 Apply `RevealGroup`/`RevealItem` to `src/blocks/WhoBenefitDetail/Component.tsx` (Whobenefit) sections list
- [x] 3.13 Apply `RevealGroup`/`RevealItem` to `src/blocks/Whocanbenefit/Component.tsx` benefit items row
- [x] 3.14 Apply `RevealGroup`/`RevealItem` to `src/blocks/AboutUs/Component.tsx` features list
- [x] 3.15 Nested lists (features/items inside a staggered card) handle wrapping inside `RevealItem` without re-wrapping the card
- [ ] 3.16 Verify stagger order matches document order and an explicit `index` override takes precedence over the auto-assigned index

## 4. Verification

- [ ] 4.1 Verify above-the-fold content appears on load and below-fold blocks animate once when scrolled into view (`IntersectionObserver` observed, no replay on scroll-away-and-back)
- [ ] 4.2 Verify with OS reduced-motion enabled that all content renders immediately, fully visible, with no offset or fade
- [ ] 4.3 Verify existing hover/background/border transitions on wrapped content are unaffected (property-scoped `transition-[opacity,transform]`)
- [ ] 4.4 Run the project's lint/typecheck/build (`pnpm lint`, then a `pnpm build`) and verify it passes with the new component and wrapper changes