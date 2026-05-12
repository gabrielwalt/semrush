---
When to load: Setting up global layout constraints (max-width, centering) across all blocks in an EDS project
Key insight: Apply max-width at the block-wrapper level (main > div > div), not at the section level (main > div). Blocks that need full-bleed escape with !important.
---

## Recipe

1. Sections (`main > div`) should have NO max-width, NO padding — they span full viewport.
2. Block wrappers (`main > div > div`) get the container constraint:

```css
main > div > div {
  max-width: var(--container-max-width); /* e.g. 1440px */
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--container-padding); /* e.g. 32px */
}
```

3. Blocks that need full-width escape (carousels, dark full-bleed sections) override on their `-wrapper`:

```css
.carousel-slider-wrapper {
  max-width: 100% !important;
  padding: 0 !important;
}
```

4. Carousel blocks that need right-edge bleed but left-aligned content:

```css
.carousel-slider {
  padding: 0 0 0 var(--container-padding); /* left only */
}
```

## How the original Semrush site does it

- `main`: full viewport, no constraints
- Each section's `.mp-container`: `max-width: 1440px; padding: 0 32px`
- Carousel sections: no container max-width, content starts at `padding-left: 32px`
- Full-bleed dark sections (AI Visibility Index): no container on the outer section, inner content centered with its own max-width

## Pitfalls

- Don't put `padding` on `main > div` (sections) — it prevents full-bleed backgrounds
- Don't use `margin: auto` on sections — it won't work without a max-width
- Blocks with `max-width: 100% !important` on their wrapper escape the container — this is intentional for full-bleed blocks
- The promo-cards should NOT escape — they use the default 1440px container (just remove the `max-width: 100% !important` from their wrapper)
