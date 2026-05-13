# PROJECT-BLOCKS.md — Block Inventory

All blocks, variants, and non-obvious intent. For implementation details read the block files.  
**Update whenever a block or variant is created, modified, or deleted.**

---

## Blocks

| Block | Variants | Used on | Notes |
|-------|----------|---------|-------|
| `announcement-bar` | — | Homepage | Dismissible top banner |
| `insights-widget` | — | Homepage | Search form with country dropdown, glass surface |
| `video` | — | Homepage | Glass-framed; detects video URLs in link text |
| `marquee` | — | Homepage | Infinite-scroll logo strip with edge fade mask |
| `video-card` | `video-card-semrush-one`, `video-card-enterprise` | Homepage | Grid layout, video in glass frame |
| `carousel-slider` | `carousel-slider-expansible` | Homepage | Default (resource cards) and expansible (solutions accordion) |
| `stats-facts` | — | Homepage | Click-to-expand stat rows with arrow indicators |
| `stats-visibility` | — | Homepage | Dark section bar chart with clip-path arrows |
| `testimonials` | — | Homepage, Semrush One | Quote card + stat card grid |
| `video-card-feature` | — | Semrush One | Stacked text+image feature showcase cards |
| `columns-stats` | — | Semrush One | Large stat number columns (10M / 35% / 21) |
| `cards-icon` | — | Semrush One | Icon + title + description feature grid |
| `cards-awards` | — | Semrush One | Award badge display for dark CTA section |
| `header` | — | All | Sticky nav with mega-menu dropdowns |
| `footer` | — | All | CTA + link columns + social/legal bottom bar + SEMRUSH reveal |
| `fragment` | — | — | Utility — `loadFragment()` used by header/footer |

### Backward-compatibility redirects

These thin blocks exist because remote AEM content may reference old block names:

| Alias block | Redirects to |
|-------------|-------------|
| `solutions-slider` | `carousel-slider` |
| `hero-video` | `video` |
| `promo-cards` | `video-card` |

---

## Section Styles

| Style | Effect |
|-------|--------|
| `section-centered` | Flex column + center-align |
| `section-dark` | Dark background, white text |
| `section-ai-visibility` | Pattern background, centered heading with icon |

---

## Page Templates

| Template | Body class |
|----------|-----------|
| `homepage` | `body.homepage` |
| `semrush-one` | — |

---

## Utility Modules

| Module | Purpose |
|--------|---------|
| `scripts/glass.js` | Glass surface effect for video/widget blocks |
