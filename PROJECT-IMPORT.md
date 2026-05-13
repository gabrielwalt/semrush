# PROJECT-IMPORT.md — Import Infrastructure

Import pipeline status and commands. For parser/transformer implementation, read `tools/importer/` directly.  
**Update when scripts, parsers, or URL lists change.**

---

## Files

| File | Purpose |
|------|---------|
| `tools/importer/import-homepage.js` | Main import script (all homepage parsers inline, ES module export) |
| `tools/importer/import-nav.js` | Nav fragment import (parses `srf-header` structure) |
| `tools/importer/import-footer.js` | Footer fragment import (parses `srf-footer` structure) |
| `tools/importer/import-semrush-one.js` | Semrush One page import (video-card-feature, columns-stats, cards-icon, cards-awards parsers) |
| `tools/importer/import-enterprise.js` | Enterprise page import (case-study, tabs, testimonials variations) |
| `tools/importer/parsers/*.js` | Standalone parsers (11 total) |
| `tools/importer/transformers/cleanup.js` | DOM cleanup transformer |
| `tools/importer/page-templates.json` | Page template definitions for Semrush One and Enterprise (190 lines) |
| `tools/importer/urls-homepage.txt` | Homepage URL |
| `tools/importer/urls-semrush-one.txt` | Semrush One page URLs |
| `tools/importer/urls-enterprise.txt` | Enterprise page URLs |

---

## Architecture

1. **One script per page type.** Homepage, nav, and footer each have their own (different DOM sources).
2. **Parsers detect blocks by DOM selector.** Each parser is self-contained.
3. **Cleanup runs first** (removes header, footer, scripts, tracking, consent banners).
4. **SVG images are stripped by Helix Importer's html2md pipeline.** Marquee logos must be injected post-import.
5. **ES module export format** required for esbuild bundling (`export default { transform }` pattern).

---

## Nav Content Model

Three divs (brand / sections / tools). Sections div uses H2/H3/UL heading hierarchy:

```
div (brand): p > a > picture > img
div (sections):
  H2 "Products"        ← top nav item (has dropdown: H3/UL content follows)
    H3 "Start Here"    ← column heading
    UL                 ← column links
    H3 "Find the Right Tools"
    UL
    ...
    P > picture        ← promo image
    P > strong         ← promo title
    P                  ← promo description
  H2 "Pricing"        ← top nav item (no content after = no dropdown)
  H2 "Resources"      ← top nav item with dropdown
    H3 / UL / ...
    P promo
  H2 "Enterprise"     ← external link, no dropdown
div (tools): p (Log In | Sign Up)
```

Header JS aggregates H2s for the top bar, builds mega panels from H3/UL/P content between each H2. H2 with no following content = simple link (no dropdown).

`import-nav.js` must emit this same shape so re-import doesn't undo hand fixes.

---

## Key Parser Requirements

### Hero Parser

- Output ordered structure: Section Metadata (`Style: centered`) → default content (`h1` + subtitle `<p>`) → `insights-widget` block (empty) → `video` block (link + poster format).
- **`buildHeroBlock` must NOT inject a synthetic `hero` block** when `insights-widget` or `video` blocks are already detected on the page — they ARE the hero.

### Stats Facts Parser

- Extract eyebrow/title/CTA to **default content above the block** (not inside the block table).
- Block table rows: each row = stat number + stat label.
- "Learn more" CTA must be emitted as `<strong><a>` or `<em><a>` (a button), not a plain link.

### Stats Visibility Parser

- Extract eyebrow/title/CTA to **default content above the block**.
- Auto-detect dark background from source DOM → emit `section-dark` in Section Metadata.
- Auto-detect bar pattern presence → emit `section-pattern-bars` in Section Metadata alongside `section-dark`.
- Block table rows: each row = bar label + bar value (e.g., pipe-separated `Google | 7.9`).

### Testimonials Parser

- Content must follow the 5-row model: Row 1: section heading; Row 2: company logo; Row 3: quote text; Row 4: author photo + name + role; Row 5+: stats cards.
- Do NOT wrap content in a `.testimonials-layout` intermediate element.

### Core Rules (all parsers)

- Use `getAttribute('src')` / `getAttribute('poster')` — never `.src` / `.poster` (property resolves to `about:error` on failed loads).
- Resolve relative paths to absolute — prefix `/` paths with the source origin.
- Skip images with empty `src` or `src="about:error"`.
- Wrap every `<img>` in `<picture>`.
- Emit video as link + poster URL — DA does not support `<video>` elements.

---

## Commands

### Bundle (required before running import)

```bash
/home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/aem-import-bundle.sh \
  --importjs tools/importer/import-homepage.js
```

### Run import

```bash
node /home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/run-bulk-import.js \
  --import-script tools/importer/import-homepage.bundle.js \
  --urls tools/importer/urls-homepage.txt
```

Output: `content/*.plain.html`
