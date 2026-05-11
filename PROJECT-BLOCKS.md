# PROJECT-BLOCKS.md — Block Inventory

All blocks, variants, and non-obvious intent. For implementation details read the block files.  
**Update whenever a block or variant is created, modified, or deleted.**

---

## Blocks

| Block | Variants | Used on | Notes |
|-------|----------|---------|-------|
| `announcement-bar` | — | Homepage | Dismissible top banner |
| `insights-widget` | — | Homepage | Search form; UI strings ("Enter your website", "Get insights") authored in cells — not hardcoded in JS |
| `hero-video` | — | Homepage | Glass-framed; carries real `<video>` element (source+poster from origin), not `<picture>` pretending to be video |
| `marquee` | — | Homepage | Infinite-scroll logo strip; own section (sibling to hero, not nested) |
| `promo-cards` | `promo-cards-semrush-one`, `promo-cards-enterprise` | Homepage | Enterprise variant: standard `<strong><a>` CTA, white-outline via CSS |
| `solutions-slider` | — | Homepage | Tab-style slider; each slide = `h3` + `p` (no h4/h5) |
| `stats` | — | Homepage | Click-to-expand; row 1 = header, rows 2+ = stats |
| `resources-slider` | — | Homepage | Horizontal card slider with arrows |
| `testimonials` | — | Homepage | Quote + author + stat |
| `ai-visibility-index` | — | Homepage | Table visualization |
| `cards` | — | — | Standard card grid |
| `columns` | — | — | Multi-column layout |
| `header` | — | All | Sticky nav; nested `<ul>` mega menu from nav fragment (not flat lists) |
| `footer` | — | All | Fragment: `footer-cta`, `footer-links`, `footer-bottom` |
| `fragment` | — | — | Utility — `loadFragment()` used by header/footer |

---

## Section Styles

| Style | Effect |
|-------|--------|
| `centered` | Flex column + center-align (hero section: default h1+subtitle + insights-widget + hero-video) |

**Hero section model:** Section Metadata `centered` + default content (h1 + subtitle only) + `insights-widget` block + `hero-video` block. No synthetic `hero` block injection when this model is present.

---

## Utility Modules

| Module | Purpose |
|--------|---------|
| `scripts/glass.js` | `applyGlassSurface(el)` — glass effect for hero-video |
