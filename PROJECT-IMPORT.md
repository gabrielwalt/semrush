# PROJECT-IMPORT.md — Import Infrastructure

Import pipeline status and commands. For parser/transformer implementation, read `tools/importer/` directly.  
**Update when scripts, parsers, or URL lists change.**

---

## Files

| File | Purpose |
|------|---------|
| `tools/importer/import-homepage.js` | Homepage import (all parsers inline) |
| `tools/importer/import-nav.js` | Nav fragment import |
| `tools/importer/import-footer.js` | Footer fragment import |
| `tools/importer/parsers/*.js` | Standalone parsers (11 total) |
| `tools/importer/transformers/cleanup.js` | DOM cleanup transformer |
| `tools/importer/urls-homepage.txt` | Homepage URL |

---

## Architecture

1. **One script per page type.** Homepage, nav, and footer each have their own.
2. **Parsers detect blocks by DOM selector.** Each is self-contained.
3. **Cleanup runs first** — removes header, footer, scripts, tracking, consent banners.
4. **SVG images are stripped by Helix Importer's html2md pipeline.** Marquee logos must be injected post-import.
5. **ES module export format** required for esbuild bundling.

---

## Nav Content Model

Three divs (brand / sections / tools). Sections div uses H2/H3/UL hierarchy — see `import-nav.js` for the full structure. Header JS aggregates H2s for the top bar, builds mega panels from H3/UL/P content. H2 with no following content = simple link (no dropdown).

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
