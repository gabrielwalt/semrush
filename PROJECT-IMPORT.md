# PROJECT-IMPORT.md — Import Infrastructure

Import pipeline status, architecture decisions, and operational commands.  
For parser/transformer implementation details, read the files in `tools/importer/` directly.  
**Update when scripts, parsers, transformers, or the URL list change.**

---

## Current State

**Homepage import script operational.** `tools/importer/import-homepage.js` contains all parsers inline.

### Files

| File | Purpose |
|------|---------|
| `tools/importer/import-homepage.js` | Main import script (IIFE, all parsers inline) |
| `tools/importer/page-templates.json` | Template + block selector mapping |
| `tools/importer/parsers/hero.js` | Standalone hero parser (h1 + insights-widget + hero-video + section-metadata) |
| `tools/importer/parsers/marquee.js` | Standalone marquee parser |
| `tools/importer/parsers/nav.js` | Nav fragment parser (for re-import consistency) |
| `tools/importer/parsers/*.js` | Other block parsers (solutions-slider, stats, etc.) |
| `tools/importer/transformers/cleanup.js` | DOM cleanup transformer |
| `tools/importer/urls-homepage.txt` | Homepage URL |

### Parser Registry (import-homepage.js)

| Parser | Selector | Output block |
|--------|----------|-------------|
| `heroParser` | `.mp-hero` | Default content + Insights Widget + Hero Video + Section Metadata (centered) |
| `marqueeParser` | `.mp-logo-marquee` | Marquee |
| `promoCardsSemrushOneParser` | `.mp-promo-cards.mp-semrush-one` | Promo Cards (promo-cards-semrush-one) |
| `promoCardsEnterpriseParser` | `.mp-promo-cards.mp-enterprise` | Promo Cards (promo-cards-enterprise) |
| `solutionsSliderParser` | `.mp-section.mp-toolkits` | Solutions Slider |
| `statsParser` | `.mp-section.mp-stats` | Stats |
| `aiVisibilityIndexParser` | `.mp-section.mp-ai-visibility-index` | AI Visibility Index |
| `testimonialsParser` | `.mp-section.mp-client-testimonials` | Testimonials |
| `resourcesSliderParser` | `.mp-section.mp-resources` | Resources Slider |
| `announcementBarParser` | `.srf_announcement_banner` | Announcement Bar |

---

## Content Structure (homepage)

The importer produces this section layout:

1. **Section 1** (announcement-bar)
2. **Section 2** (centered): h1 + subtitle + Insights Widget + Hero Video + Section Metadata
3. **Section 3**: Marquee
4. **Section 4**: Promo Cards (both variants in same section)
5. **Section 5**: Solutions Slider
6. **Section 6**: Stats
7. **Section 7**: AI Visibility Index
8. **Section 8**: Testimonials
9. **Section 9**: Resources Slider

---

## Nav Content Model

The nav fragment (`content/nav.plain.html`) uses H2/H3/UL heading hierarchy:
- H2 with link = top-level nav item
- H3 = mega menu column heading
- UL = column links
- P with picture + P with strong + P plain = promo tile
- H2 with external link only = simple nav item (no dropdown)

---

## Import Architecture Principles

1. **One universal script for all pages.** No template branching.
2. **Parsers detect blocks by DOM selector.** Each parser is self-contained.
3. **Section boundaries in `beforeTransform`.** Must run before parsers.
4. **Handle missing content gracefully.** No throws on missing selectors.

---

## Commands

### Bundle (run after any change to import scripts)

```bash
npx esbuild tools/importer/import-homepage.js \
  --bundle --format=iife --global-name=CustomImportScript \
  --platform=browser --outfile=tools/importer/import.bundle.js
```

**⚠️ The `--format=iife --global-name=CustomImportScript` flags are mandatory.**
