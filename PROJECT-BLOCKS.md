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
| `carousel-slider` | `carousel-slider-expansible` | Homepage | Default (resource cards) and expansible (solutions accordion); extends to right viewport edge |
| `stats-facts` | — | Homepage | Click/scroll-to-expand stat rows; diagonal-line arrow pattern, 180px numbers |
| `stats-visibility` | — | Homepage | Dark section, bar chart with purple-to-teal gradient clip-path arrows, 84px heading |
| `testimonials` | — | Homepage, Semrush One | Quote card (dark) + stat card (grey), 2fr:1fr grid |
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
| `section-pattern-bars` | Bar pattern background (used with `section-dark` on stats-visibility) |
| `section-ai-visibility` | Pattern background, centered heading with icon (legacy — may be replaced by `section-pattern-bars`) |

---

## Page Templates

| Template | Body class | Effect |
|----------|-----------|--------|
| `homepage` | `body.homepage` | Applies gradient background + pattern-hero.svg to `main` |
| `semrush-one` | `body.semrush-one` | Page-specific layout for Semrush One product page |
| `enterprise` | `body.enterprise` | Page-specific layout for Enterprise page |

---

## Utility Modules

| Module | Purpose |
|--------|---------|
| `scripts/glass.js` | `applyGlassSurface(el)` — glass effect for video/widget blocks |

---

## Key Implementation Patterns

- **Video detection**: Links whose text content contains a video URL (`.mp4`, `.webm`) are detected as video sources — EDS rewrites external media hrefs, so check `link.textContent` not `link.href`.
- **Glass frame**: `linear-gradient(91deg, rgba(5,5,5,0.04), rgba(255,255,255,0.04))` + `backdrop-filter: blur(5px)` + `border: 1px solid rgba(255,255,255,0.6)` + `border-radius: 12px` + `padding: 12px`.
- **Carousel edge-bleed**: Section has `overflow: hidden`. Slider uses `margin-left: container-padding` (not padding — padding on `overflow-x: auto` flex containers doesn't reliably offset scroll-snap). Last card gets `margin-right: container-padding`. This creates the right-edge peek where the 4th card is partially visible, clipped by the section boundary.
- **Carousel nav buttons**: Both variants place nav in `.default-content-wrapper` (JS appends there). CSS positions via `position: absolute; right: container-padding; bottom: 0` to bottom-align with the heading. Hidden below 1024px (touch scroll only).
- **Section header pattern**: Eyebrow `<p>` + `<h2>` tagline used across carousel, stats, and testimonials sections. H2 is 48px/uppercase/line-height 1.0/letter-spacing -0.04em. Applied via block-specific selectors on `.default-content-wrapper > h2`.
- **Pattern-hero positioning**: Fixed `680px` from top of `main` (not percentage-based, since `main` is very tall).
- **Footer layout**: CTA left (~1/3) + link columns right (~2/3) side-by-side via CSS grid `1fr 2fr`. CTA is left-aligned, uppercase heading. Footer uses Lazzer font family throughout. Social icons detected from href patterns in `decorateSocialLinks()`.
- **Footer reveal**: `.footer-reveal` is a sibling of `.footer` block inside `<footer>` element (not a child of `.footer`). Uses `position: sticky; bottom: 0; z-index: 0` while `.footer` has `position: relative; z-index: 1; background: white`. The white footer scrolls up to reveal the sticky mint-colored SEMRUSH wordmark behind it.
- **Nav header bg toggle**: Tinted background (`rgb(220 238 235)`) switches to white when a dropdown opens. `.nav-open` must toggle on BOTH `.nav-wrapper` and `header` element.
- **Carousel expand/collapse** (expansible variant): One card expanded at a time (430px collapsed, 798px expanded). "+" button rotates 45° to "×". Collapsed shows eyebrow + title + poster; expanded shows large image + description + CTA.
- **Testimonials content model**: 3-row model — Row 0: blockquote + company logo img; Row 1: author image + author name (bold) + role; Row 2: stats grid. JS extracts `<strong>` for author name, plain `<p>` for role, `<blockquote>` for quote text.
- **Stats-facts arrow indicator**: CSS `::before` for diagonal hatching SVG pattern, `::after` for up-arrow SVG icon (data URI). Active state changes arrow bg to cyan and icon fill to dark. `activateStat()` function handles both click and scroll-driven activation.
- **Stats-visibility bars**: `clip-path: polygon()` for angled bar ends. Bar widths derived from data attributes set by JS. Alternating cyan/purple fills on bars.
