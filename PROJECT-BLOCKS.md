# PROJECT-BLOCKS.md — Block Inventory

All blocks, variants, and non-obvious intent. For implementation details read the block files.  
**Update whenever a block or variant is created, modified, or deleted.**

Authoring model: **augmented styles** — a small set of baseline blocks expanded by layered styling (auto-styles → variants → section styles → page templates). The decision framework lives in the `eds-content-modeling` skill; this file is the inventory of what currently exists.

---

## One-off (throw-away) registry

Every throw-away variant, section style, or page template is listed here so it can be removed when its pages are refactored or deleted. Conventions for each one-off:
1. **Name** with the `oneoff-` prefix (e.g. `oneoff-spotlight-banner`, `section-oneoff-…`, `template-oneoff-…`).
2. **Header comment** in the CSS/JS stating its scope and exactly which page(s) use it.
3. **Registry row** below.

| One-off name | Type | Used on | Remove when | Notes |
|--------------|------|---------|-------------|-------|
| `section-oneoff-ai-visibility` | Section style | Homepage AI Visibility Index | AI Visibility section removed/redesigned | Striped bottom SVG + 136px logo + centered/uppercase heading. Combine with `section-dark`. CSS: `styles.css` + `stats-visibility.css` |
| `teaser-oneoff-semrush-one` | Block variant | Homepage, `/one/` | Those promos redesigned | Branded teal/purple card background, dark text. CSS: `teaser.css` |
| `teaser-oneoff-enterprise` | Block variant | Homepage | Enterprise promo redesigned | Black + enterprise photo card background. Pair with `teaser-dark`. CSS: `teaser.css` |
| `teaser-oneoff-enterprise-platform` | Block variant | `/enterprise/` | Enterprise platform promo redesigned | Light gradient + bottom-aligned screenshot layout. CSS: `teaser.css` |

---

## Authoring Reference — Section Styles

Apply via **Section Metadata** block with `Style` key in the content.

| Style class | Effect | Use when | Combinability |
|-------------|--------|----------|---------------|
| `section-centered` | Centered flex column, max-width on headings/paragraphs | Hero sections with centered text | Layout — combines with a background style |
| `section-dark` | Dark background (`--dark-color`), white text, inverted buttons | Any dark-themed section (generic) | Background — mutually exclusive with other bg styles |
| `section-flush` | Zero padding top and bottom | Sections that need no breathing room (e.g. marquee) | Spacing — combines with anything |
| `section-oneoff-ai-visibility` | ONE-OFF: striped SVG at bottom + logo + centered heading | Homepage AI Visibility Index only | Decoration — designed to combine with `section-dark` (see registry) |

## Authoring Reference — Block Spacing Variants

Apply by adding the class to the block name, e.g. `Insights Widget (spacing-top-small)`.

| Variant class | Effect |
|---------------|--------|
| `spacing-top-none` | Zero top margin on this block |
| `spacing-top-small` | 16px top margin instead of default 60px |
| `spacing-top-large` | 120px top margin |
| `spacing-bottom-none` | Zero top margin on the NEXT block |
| `spacing-bottom-small` | 16px top margin on the next block |
| `spacing-bottom-large` | 120px top margin on the next block |

---

## Blocks

| Block | Variants | Used on | Notes |
|-------|----------|---------|-------|
| `announcement-bar` | — | Homepage | Dismissible top banner |
| `insights-widget` | — | Homepage | Search form with searchable country dropdown (115 countries), blinking cursor, glass surface |
| `media` | — | Homepage | Glass-framed image OR video (image alone = image; +video link = video). Detects video URLs in link text (EDS pattern for external media). Shares `.glass-surface` |
| `marquee` | — | Homepage | Infinite-scroll logo strip with edge fade mask |
| `teaser` | `teaser-dark` (generic), `teaser-oneoff-semrush-one`, `teaser-oneoff-enterprise`, `teaser-oneoff-enterprise-platform` | Homepage, Semrush One, Enterprise | heading+text+CTA alongside glass-framed media. `teaser-dark` = generic inversion (white text, secondary→white-outline button); branded card backgrounds are one-offs (see registry) |
| `carousel` | `carousel-expansible` | Homepage | Default (resource cards) and expansible (solutions accordion); extends to right viewport edge |
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
| `solutions-slider` | `carousel` |
| `hero-video` | `media` |
| `promo-cards` | `teaser` |

---

## Page Templates

Applied via authored page **Metadata** block (`template` key → body class, verbatim). New templates use the `template-` prefix.

| Template | Body class | Applied via | Effect |
|----------|-----------|-------------|--------|
| `template-homepage` | `body.template-homepage` | `template: template-homepage` metadata in `index.plain.html` | Gradient background + pattern-hero.svg on `main`. Fallback in `scripts.js`: adds the class if an `insights-widget` is present but metadata is missing |

The `/one/` (Semrush One) and `/enterprise/` pages currently have **no page template** — their distinct look comes entirely from block variants (the `teaser-oneoff-*` set). No `body.semrush-one` / `body.enterprise` classes exist.

---

## Key Implementation Patterns

- **Video detection**: Links whose text content contains a video URL (`.mp4`, `.webm`) are detected as video sources — EDS rewrites external media hrefs, so check `link.textContent` not `link.href`.
- **Glass frame**: `linear-gradient(91deg, rgba(5,5,5,0.04), rgba(255,255,255,0.04))` + `backdrop-filter: blur(5px)` + `border: 1px solid rgba(255,255,255,0.6)` + `border-radius: 12px` + `padding: 12px`.
- **Carousel edge-bleed**: Section has `overflow: hidden`. Slider uses `margin-left: container-padding` (not padding — padding on `overflow-x: auto` flex containers doesn't reliably offset scroll-snap). Last card gets `margin-right: container-padding`. This creates the right-edge peek where the 4th card is partially visible, clipped by the section boundary.
- **Carousel nav buttons**: Both variants place nav in `.default-content-wrapper` (JS appends there). CSS positions via `position: absolute; right: container-padding; bottom: 0` to bottom-align with the heading. Hidden below 1024px (touch scroll only).
- **Section header pattern**: Eyebrow `<p>` + `<h2>` tagline used across carousel, stats, and testimonials sections. H2 is 48px/uppercase/line-height 1.0/letter-spacing -0.04em. Applied via block-specific selectors on `.default-content-wrapper > h2`.
- **Pattern-hero positioning**: calc-based, scoped to `main .section.centered:first-of-type`. Breakpoints: ≥1440px → `calc(50% - 20px)`, 1024–1439px → `calc(50% - 100px)`, 768–1023px → `calc(50% + 100px)`, <768px → `100%`.
- **Footer layout**: CTA left (~1/3) + link columns right (~2/3) side-by-side via CSS grid `1fr 2fr`. CTA is left-aligned, uppercase heading. Footer uses Lazzer font family throughout. Social icons detected from href patterns in `decorateSocialLinks()`.
- **Footer reveal**: `.footer-reveal` is a sibling of `.footer` block inside `<footer>` element (not a child of `.footer`). Uses `position: sticky; bottom: 0; z-index: 0` while `.footer` has `position: relative; z-index: 1; background: white`. The white footer scrolls up to reveal the sticky mint-colored SEMRUSH wordmark behind it.
- **Nav header bg toggle**: Tinted background (`rgb(220 238 235)`) switches to white when a dropdown opens. `.nav-open` must toggle on BOTH `.nav-wrapper` and `header` element.
- **Carousel expand/collapse** (expansible variant): One card expanded at a time (430px collapsed, 798px expanded). "+" button rotates 45° to "×". Collapsed shows eyebrow + title + poster; expanded shows large image + description + CTA.
- **Testimonials content model**: 5-row model — Row 1: section heading; Row 2: company logo; Row 3: quote text (`<blockquote>`); Row 4: author photo + name (bold) + role; Row 5+: stats cards (one per row). JS extracts `<strong>` for author name, plain `<p>` for role.
- **Stats-facts arrow indicator**: CSS `::before` for diagonal hatching SVG pattern, `::after` for up-arrow SVG icon (data URI). Active state changes arrow bg to cyan and icon fill to dark. `activateStat()` function handles both click and scroll-driven activation.
- **Stats-visibility bars**: `clip-path: polygon()` for angled bar ends. Bar widths derived from data attributes set by JS. Alternating cyan/purple fills on bars.
- **Stats-visibility h2**: The `h2` lives in `.default-content-wrapper` (default section content above the block), NOT inside `.stats-visibility`. CSS selector `.stats-visibility h2` never matches — use `.section > .default-content-wrapper > h2` to target it.
- **Insights-widget blinking cursor**: Hide cursor when (a) country dropdown is open and (b) when the text input has focus — two conflicting cursors otherwise.
