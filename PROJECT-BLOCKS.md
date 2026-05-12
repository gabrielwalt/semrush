# PROJECT-BLOCKS.md — Block Inventory

All blocks, variants, and non-obvious intent. For implementation details read the block files.  
**Update whenever a block or variant is created, modified, or deleted.**

---

## Blocks

| Block | Variants | Used on | Notes |
|-------|----------|---------|-------|
| `announcement-bar` | — | Homepage | Dismissible top banner |
| `insights-widget` | — | Homepage | Search form with searchable country dropdown (115 countries), blinking cursor, glass surface |
| `video` | — | Homepage | Glass-framed; detects video URLs in link text (EDS pattern for external media) |
| `marquee` | — | Homepage | Infinite-scroll logo strip with edge fade mask |
| `video-card` | `video-card-semrush-one`, `video-card-enterprise` | Homepage | 64px padding, grid layout, video in glass frame on right half |
| `carousel-slider` | — | Homepage | Expandable card carousel with + button; extends to right viewport edge |
| `solutions-slider` | — | (alias) | Thin redirect to `carousel-slider` for backward compat with remote content |
| `hero-video` | — | (alias) | Thin redirect to `video` for backward compat with remote content |
| `promo-cards` | `promo-cards-semrush-one`, `promo-cards-enterprise` | (alias) | Thin redirect to `video-card` for backward compat |
| `stats` | — | Homepage | Click/scroll-to-expand; diagonal-line arrow pattern, 180px numbers |
| `ai-visibility-index` | — | Homepage | Dark section, bar chart with purple-to-teal gradient, 84px heading |
| `testimonials` | — | Homepage | Quote card (dark) + stat card (grey), 2-column layout |
| `resources-slider` | — | Homepage | Horizontal card slider with arrows, category tags |
| `cards` | — | — | Standard card grid |
| `columns` | — | — | Multi-column layout |
| `header` | — | All | Sticky nav; nested `<ul>` mega menu from nav fragment |
| `footer` | — | All | Fragment: `footer-cta`, `footer-links`, `footer-bottom` |
| `footer-cta` | — | All | "Get started" CTA section with purple button |
| `footer-links` | — | All | 4-column link grid |
| `footer-bottom` | — | All | Copyright, legal links, large SEMRUSH wordmark |
| `fragment` | — | — | Utility — `loadFragment()` used by header/footer |

---

## Section Styles

| Style | Effect |
|-------|--------|
| `centered` | Flex column + center-align (hero section) |
| `section-dark` | Dark background, white text |
| `section-ai-visibility` | Bar pattern background, centered heading area with AI Visibility Index icon |

---

## Page Templates

| Template | Body class | Effect |
|----------|-----------|--------|
| `homepage` | `body.homepage` | Applies gradient background + pattern-hero.svg to `main` |

---

## Utility Modules

| Module | Purpose |
|--------|---------|
| `scripts/glass.js` | `applyGlassSurface(el)` — glass effect for video block |

---

## Key Implementation Patterns

- **Video detection**: Links whose text content contains a video URL (`.mp4`, `.webm`) are detected as video sources — EDS rewrites external media hrefs.
- **Glass frame**: `linear-gradient(91deg, rgba(5,5,5,0.04), rgba(255,255,255,0.04))` + `backdrop-filter: blur(5px)` + `border: 1px solid rgba(255,255,255,0.6)` + `border-radius: 12px` + `padding: 12px`.
- **Carousel edge-bleed**: Block has `padding-left` only; track scrolls to right viewport edge.
- **Pattern-hero positioning**: Fixed `680px` from top of `main` (not percentage-based, since `main` is very tall).
