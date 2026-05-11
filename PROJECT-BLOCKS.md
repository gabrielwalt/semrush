# PROJECT-BLOCKS.md — Block Inventory

Inventory of all blocks, their variants, and non-obvious intent.  
For implementation details (selectors, DOM structure, CSS values) read the block files directly.  
**Update whenever a block or variant is created, modified, or deleted — including its "Used on" column.**

---

## Blocks (16 total)

| Block | Variants | Used on | Notes |
|-------|----------|---------|-------|
| `announcement-bar` | — | Homepage | Top-of-page dismissible banner |
| `insights-widget` | — | Homepage | Search form with country switcher; reads placeholder/button text from content `<p>` elements |
| `hero-video` | — | Homepage | Glass-framed video/image; supports `<video>` with reduced-motion respect |
| `marquee` | — | Homepage | Generic infinite-scroll strip; works with any content (images, text) per line |
| `promo-cards` | `promo-cards-semrush-one` | Homepage | Two-column promo with gradient bg |
| `promo-cards` | `promo-cards-enterprise` | Homepage | Dark/black variant, centered layout, white outline CTA |
| `solutions-slider` | — | Homepage | Tab-style product solutions slider; each row = one slide |
| `stats` | — | Homepage | Interactive stats; row 1 is the section header, rows 2+ are individual stats |
| `resources-slider` | — | Homepage | Horizontal slider for content cards (blog/guides) |
| `testimonials` | — | Homepage | Customer quote with author and stat |
| `ai-visibility-index` | — | Homepage | AI-visibility metrics table visualization |
| `cards` | — | — | Standard auto-fill card grid |
| `columns` | — | — | Flexible multi-column layout |
| `header` | — | All pages | Sticky nav; reads H2/H3/UL structure from nav fragment |
| `footer` | — | All pages | Fragment composed of three sub-blocks |
| `fragment` | — | — | Utility — exports `loadFragment()` used by header and footer |

### Footer sub-blocks

`footer-cta`, `footer-links`, `footer-bottom` are referenced by the footer fragment.

### Retired blocks

| Block | Replaced by | Reason |
|-------|------------|--------|
| `hero` | Default content in centered section | H1/subtitle are now default content, not a block |
| `logo-marquee` | `marquee` | Renamed to generic marquee concept |
| `hero-insights` | `insights-widget` | Renamed for clarity |

---

## Section Styles

| Style | Used on | Notes |
|-------|---------|-------|
| `centered` | Homepage (first section) | Flex column + center-align; contains h1, subtitle, insights-widget, hero-video |

---

## Utility Modules

| Module | Purpose |
|--------|---------|
| `scripts/glass.js` | `applyGlassSurface(el)` — adds `.glass-surface` class (used by hero-video) |
