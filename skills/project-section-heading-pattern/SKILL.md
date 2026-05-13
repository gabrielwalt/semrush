---
name: project-section-heading-pattern
description: Consistent eyebrow + uppercase heading pattern used across multiple sections. Use when adding a new section that needs the standard heading treatment.
---

Multiple sections on the Semrush homepage use a consistent heading pattern: a small uppercase eyebrow label above a large uppercase tagline heading. This pattern is NOT a global style — it's applied per-block via block-specific CSS selectors.

## Recipe
1. **Content structure**: Eyebrow as `<p>` (first child of default-content-wrapper), tagline as `<h2>`.
2. **Eyebrow styles** (from `lazy-styles.css`):
   ```css
   font-size: var(--font-size-body-s);   /* 14px */
   font-weight: 600;
   text-transform: uppercase;
   letter-spacing: var(--tracking-wide);   /* +0.02em */
   margin: 0 0 var(--space-xs);           /* 8px bottom */
   ```
3. **Tagline H2 styles** (per-block CSS on `.{block}-container > .default-content-wrapper > h2`):
   ```css
   font-size: var(--font-size-heading-l);  /* 48px */
   line-height: 1;
   text-transform: uppercase;
   letter-spacing: var(--tracking-tight);  /* -0.04em */
   ```
4. **Gap to content**: Typically `margin-bottom: 60px` on the `.default-content-wrapper`.

## Where it's used
- `carousel-slider-container` (Solutions + Resources carousels)
- `stats-facts-container`
- `testimonials-container`
- `footer .footer-cta-container`
- **NOT** on `section-ai-visibility` — that uses `--font-size-display` (84px) instead

## Pitfalls
- This is NOT set globally on all `h2` elements — each block must apply it via its own CSS. The global `h2` style is 64px at `--heading-font-size-xl`, not 48px uppercase.
- The eyebrow styles in `lazy-styles.css` use `:has(+ h2)` which requires a `<p>` immediately preceding an `<h2>` in the default-content-wrapper. If the DOM order changes, the eyebrow won't style.
- The `margin-bottom` on the default-content-wrapper controls the gap between the heading area and the block content. Different blocks use different values (60px for carousels, 60px for testimonials).
