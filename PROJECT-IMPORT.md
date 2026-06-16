# PROJECT-IMPORT.md — Import Infrastructure

Import pipeline status and commands. For parser/transformer implementation, read `tools/importer/` directly.  
**Update when scripts, parsers, or URL lists change.**

Approach: ONE generic, marker-driven parser per page type that reproduces the **user-validated** `content/*.plain.html` exactly. Methodology + validation loop: `skills/marker-driven-import`.

---

## Validated reference pages

These pages' content structure is **officially validated by the user** — `content/<page>.plain.html` is the reference truth. Never let an import overwrite them; import to a temp dir and diff (see Validation Loop below).

| Page | File | Validated |
|------|------|-----------|
| Homepage | `content/index.plain.html` | ✅ 2026-06-16 |

---

## Homepage marker map (cascade)

The homepage import resolves each level from these source-DOM markers (registry in `import-homepage.js`):

| Level | Target | Marker (source DOM) |
|-------|--------|---------------------|
| 1 template | `template-homepage` (body class via Metadata) | page has `.mp-hero` (emitted unconditionally for this script) |
| 4 block | `announcement-bar` | `.srf_announcement_banner`, `.srf_top_banner` |
| 4 block | `insights-widget` + `media` (in hero) | `.mp-hero` → `hero.js` splits into widget + media |
| 3 section style | `section-centered` | hero section (emitted by `hero.js`) |
| 4 block | `marquee` | `.mp-logo-marquee` |
| 3 section style | `section-flush` | marquee section |
| 5 variant | `teaser teaser-oneoff-semrush-one` | `.mp-promo-cards.mp-semrush-one` |
| 5 variant | `teaser teaser-dark teaser-oneoff-enterprise` | `.mp-promo-cards.mp-enterprise` |
| 5 variant | `carousel carousel-expansible` | `.mp-section.mp-toolkits` |
| 4 block | `stats-facts` | `.mp-section.mp-stats` |
| 4 block + 3 style | `stats-visibility` + `section-dark, section-oneoff-ai-visibility` | `.mp-section.mp-ai-visibility-index` |
| 4 block | `testimonials` | `.mp-section.mp-client-testimonials` |
| 4 block | `carousel` (resources) | `.mp-section.mp-resources` |

Last verified against validated content: 2026-06-16 — block/variant/section-style/template sequence reproduces exactly **except** marquee (see Known Gaps).

---

## Files

| File | Purpose |
|------|---------|
| `tools/importer/import-homepage.js` | Main import script (imports from `parsers/*.js`, ES module export) |
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

- Output ordered structure: default content (`h1` + subtitle `<p>`) → `insights-widget` block (empty) → `media` block (link + poster format) → Section Metadata (`Style: section-centered`, last in section).
- Emits the `Media` block (renamed from `Video`) — a generic image-or-video block.

### Stats Facts Parser

- Extract eyebrow/title/CTA to **default content above the block** (not inside the block table).
- Block table rows: each row = stat number + stat label.
- "Learn more" CTA must be emitted as `<strong><a>` or `<em><a>` (a button), not a plain link.

### Stats Visibility Parser

- Extract eyebrow/title/CTA to **default content above the block**.
- Auto-detect dark background from source DOM → emit `section-dark` in Section Metadata.
- Emit `section-oneoff-ai-visibility` alongside `section-dark` (one-off: striped pattern + logo).
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

## Architecture

1. **One script per page type.** Homepage, nav, and footer each have their own (different DOM sources).
2. **Parsers are standalone files in `parsers/*.js`.** `import-homepage.js` imports from them — no inline duplicates.
3. **Cleanup runs first** (removes header, footer, scripts, tracking, consent banners).
4. **SVG images are stripped by Helix Importer's html2md pipeline.** Marquee logos must be ingested via DA upload.
5. **ES module export format** required for esbuild bundling (`export default { transform }` pattern).

---

## Post-Import Manual Operations

These items cannot be reliably auto-imported and require manual content edits after import:

1. **`spacing-top-small` on insights-widget** — Add class via block name: `Insights Widget (spacing-top-small)`. The parser can't detect this from source DOM.
2. **`carousel-expansible`: column 2 content** — Large images, descriptions, and CTAs only render when a card is expanded on the source site. Import captures collapsed state only. Populate manually or expand each card before import.
3. **Stats-visibility: 3rd header column** — "AI Platform: ChatGPT, April 2026" platform info. May not be in the DOM at import time.
4. **DA media hashes** — Import produces source URLs (semrush.com). After DA upload, images get media hashes. Normal DA ingestion workflow — not a bug.
5. **Footer: single-section structure** — The import script emits no `<hr>` between footer blocks. All three are in one section.

## Known Gaps (import vs validated)

- None for the homepage **structure** — the block/variant/section-style/template sequence reproduces the validated `index.plain.html` exactly (verified via the temp-diff loop).
- Remaining differences are expected and not structural: image URLs are source `/static/` URLs (become DA media hashes on upload), and the expansible carousel's expanded-only content (see Post-Import #2).

## Resolved (no longer manual)

- **Marquee dropped** — root cause was NOT lazy-load: the marquee (`.mp-logo-marquee`) is nested **inside** `.mp-hero`, and the hero parser's `replaceWith()` destroyed it before `marquee.js` ran. Fixed in the cleanup transformer: it now moves the marquee out to be a sibling after `.mp-hero` before parsers run. `marquee.js` also now emits the `section-flush` Section Metadata. Marquee + logos + flush section now import correctly.
- **`template-homepage` metadata** — auto-emitted by `import-homepage.js` (cascade level 1) as a page `Metadata` block.
- **Testimonials author role** — `testimonials.js` extracts the role from any descendant `<p>` without strong/picture, robust to `wrapTextNodes` flattening. No manual add needed.
- **Enterprise CTA** — both promo CTAs are authored `<em>` (secondary); `teaser-dark` recolors them. Parsers emit `<em><a>`. No manual adjust.

---

## Commands

### Bundle (required before running import)

```bash
/home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/aem-import-bundle.sh \
  --importjs tools/importer/import-homepage.js
```

### Validation loop (never overwrite the validated reference)

`run-bulk-import.js` writes to `content/` directly (no `--output-dir` flag), so it WILL overwrite the validated reference. To verify a parser reproduces the validated content without destroying it:

```bash
# 1. Back up the validated reference
cp content/index.plain.html /tmp/import-check/index.validated.plain.html

# 2. Bundle + run (this overwrites content/index.plain.html)
/home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/aem-import-bundle.sh \
  --importjs tools/importer/import-homepage.js
node /home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/run-bulk-import.js \
  --import-script tools/importer/import-homepage.bundle.js \
  --urls tools/importer/urls-homepage.txt

# 3. Capture the import output, then RESTORE the reference immediately
cp content/index.plain.html /tmp/import-check/index.imported.plain.html
cp /tmp/import-check/index.validated.plain.html content/index.plain.html

# 4. Diff block/variant/section/template sequence (image URLs & DA hashes differ — compare structure)
grep -oE 'class="(announcement-bar|insights-widget|media|marquee|teaser[^"]*|carousel[^"]*|stats-facts|stats-visibility|testimonials|section-metadata|metadata)"' \
  /tmp/import-check/index.validated.plain.html | nl
grep -oE 'class="(announcement-bar|insights-widget|media|marquee|teaser[^"]*|carousel[^"]*|stats-facts|stats-visibility|testimonials|section-metadata|metadata)"' \
  /tmp/import-check/index.imported.plain.html | nl
```

Re-run this after every parser change — a fix for one page often regresses another. Restore URL if the local reference is lost: `curl -s 'https://main--semrush--gabrielwalt.aem.page/index.plain.html' -o content/index.plain.html`
