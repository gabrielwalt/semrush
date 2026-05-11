# PROJECT.md — Semrush Migration

| | |
|--|--|
| **Source site** | https://www.semrush.com/ |
| **GitHub repo** | https://github.com/gabrielwalt/semrush |
| **Authoring** | Document Authoring ([da.live](https://da.live)) |

---

## Environments

| Environment | URL |
|-------------|-----|
| AEM Preview | https://aem-20260508-1813--semrush--gabrielwalt.aem.page |
| AEM Live | https://aem-20260508-1813--semrush--gabrielwalt.aem.live |
| Feature branch | `https://{branch}--semrush--gabrielwalt.aem.page` |

---

## Content

| | |
|--|--|
| **Format** | `.plain.html` files in `content/` |
| **Nav fragment** | `/nav.plain.html` |
| **Footer fragment** | `/footer.plain.html` |

---

## Publishing

1. Push to feature branch → preview at feature URL
2. Run PageSpeed against preview — target 100
3. Open PR to `main` with preview URL (required)
4. Reviewer inspects + merges → AEM Code Sync updates production

---

## Project Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Agent rules, EDS fundamentals |
| `PROJECT.md` | This file — URLs, environments |
| `PROJECT-BLOCKS.md` | Block inventory |
| `PROJECT-DESIGN.md` | Design tokens |
| `PROJECT-IMPORT.md` | Import scripts |
| `PROJECT-STATUS.md` | Migration progress |
