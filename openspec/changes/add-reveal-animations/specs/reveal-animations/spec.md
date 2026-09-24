# Spec Delta

## Purpose

Lets frontend sections reveal themselves with a subtle fade-up animation when they enter the viewport, including staggered reveal of individual child elements, firing once per element and respecting reduced-motion preferences.

## ADDED Requirements

### Requirement: Elements fade up when they enter the viewport

The system SHALL animate a wrapped element from a position slightly below its resting position to its normal position while fading from fully transparent to fully visible when the element enters the viewport. The animation SHALL be a short-duration ease-out motion that does not alter the element's final layout or position.

#### Scenario: Element scrolls into view

- **WHEN** a page containing a wrapped reveal element is scrolled so that the element enters the viewport
- **THEN** the element smoothly transitions from being offset below its resting position and fully transparent to its normal position and fully visible

#### Scenario: Element is already in the viewport on load

- **WHEN** a page containing a wrapped reveal element loads with the element already visible in the viewport
- **THEN** the element animates to its normal position and full visibility immediately on load

### Requirement: Animation triggers once per element

The system SHALL trigger the reveal animation at most once per element: once an element has been revealed, it SHALL NOT replay the animation when the viewport re-enters or the page scrolls again.

#### Scenario: Scrolling away and back does not replay

- **WHEN** a revealed element is scrolled out of and then back into the viewport
- **THEN** the element remains fully visible and the animation does not replay

### Requirement: Staggered reveal of child elements

The system SHALL support revealing a group's child elements individually, each with the same fade-up effect, with a small delay between consecutive children so they appear sequentially rather than simultaneously. The children SHALL animate in document order. By default, a group SHALL assign each child the next step in sequence; SHALL NOT require the author to number children manually.

#### Scenario: Group of children reveals in order

- **WHEN** a group that wraps several direct child elements enters the viewport
- **THEN** each child fades up in document order, each starting shortly after the previous one

#### Scenario: Manual ordering override

- **WHEN** an author assigns an explicit index to a child inside a group
- **THEN** that child uses the assigned index instead of the automatically assigned sequence position

### Requirement: Reduced-motion users see content without animation

The system SHALL NOT animate elements for users who have enabled reduced-motion preferences at the operating system level; such content SHALL appear immediately at its full, final state without any offset or fade.

#### Scenario: Reduced motion enabled

- **WHEN** a user with reduced-motion preferences enabled visits a page containing reveal elements
- **THEN** the elements are shown immediately, fully visible, at their normal position with no animation

### Requirement: Reveal preserves existing layout and behavior

The system SHALL preserve the layout and markup of wrapped content: the reveal wrapper SHALL NOT change element size, spacing, or document structure, SHALL keep CSS selectors that depend on the existing wrapper relationship working, and SHALL NOT interfere with existing hover, color, or border transitions applied to the wrapped content.

#### Scenario: Layout and interaction preserved

- **WHEN** an element previously wrapped in a plain container div is instead wrapped by a reveal component with the same classes
- **THEN** the rendered layout, spacing, and structure are unchanged and existing hover/interaction styles continue to work