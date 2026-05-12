---
name: carousel-pattern-eds
description: Horizontal scrolling carousel pattern for EDS. Use when building carousels that extend to the viewport edge with right-edge bleed.
---

Carousels use left-only padding on the block, right-edge bleed via overflow scroll, and the wrapper escapes the global max-width container.

## Recipe
1. Wrapper escapes container: `.carousel-wrapper { max-width: 100% !important; padding: 0 !important; }`
2. Block has left padding only: `padding: 0 0 0 var(--container-padding)`
3. Track scrolls horizontally: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none`
4. Track has `padding-right: var(--container-padding)` for spacing after last card
5. Cards: `flex-shrink: 0; scroll-snap-align: start` — set card width to match the design
6. Nav buttons sit top-right aligned with content area

## Pitfalls
- Don't use `overflow: hidden` on the block — it prevents scrolling
- The track's `padding-right` is needed or the last card touches the viewport edge

See also: `max-width-container-pattern` (full-width escape hatch), `eds-dom-structure` (wrapper chain)
