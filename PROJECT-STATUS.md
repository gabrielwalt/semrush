# PROJECT-STATUS.md — Migration Status

Single source of truth for what has been built, what is in progress, and what remains.  
**Update this file whenever a page or block is completed, started, or its status changes.**

---

## Overall Progress

| Area | Status |
|------|--------|
| Block development — homepage blocks | ✅ Done |
| Design system (tokens, brand.css) | ✅ Done |
| Draft content — homepage | ✅ Done |
| Import scripts | ❌ Not started |
| Subpage templates | 🔲 Not started |
| Bulk import | 🔲 Not started |
| Performance validation (PageSpeed 100) | 🔲 Not started |
| Accessibility review (WCAG 2.1 AA) | 🔲 Not started |

---

## Blocks Status

| Block | CSS | JS | Draft | Notes |
|-------|-----|----|-------|-------|
| `announcement-bar` | ✅ | ✅ | ✅ | Complete |
| `hero` | ✅ | ✅ | ✅ | Complete |
| `hero-video` | ✅ | ✅ | — | CSS-only version; JS stub |
| `promo-cards` | ✅ | ✅ | ✅ | Default + enterprise + semrush-one variants |
| `solutions-slider` | ✅ | ✅ | ✅ | Slider/tab interactions |
| `logo-marquee` | ✅ | ✅ | — | Infinite scroll animation |
| `stats` | ✅ | ✅ | ✅ | Click-to-expand interaction |
| `resources-slider` | ✅ | ✅ | ✅ | Horizontal slider |
| `testimonials` | ✅ | ✅ | ✅ | Quote carousel |
| `cards` | ✅ | ✅ | — | Standard boilerplate cards |
| `columns` | ✅ | ✅ | — | Standard boilerplate columns |
| `ai-visibility-index` | ✅ | ✅ | ✅ | Custom visualization |
| `header` | ✅ | ✅ | ✅ | Nav with fragment |
| `footer` | ✅ | ✅ | ✅ | Fragment with sub-blocks |
| `fragment` | — | ✅ | — | Utility (do not delete) |

---

## Pages Status

### Completed Drafts

| Page | Draft File | Status | Notes |
|------|-----------|--------|-------|
| Homepage | `drafts/index.plain.html` | ✅ Draft complete | All homepage blocks present |

### Pages to Import

The following pages from semrush.com need to be analyzed and imported. URLs are illustrative — validate against live site.

| Page | Source URL | Status | Priority |
|------|-----------|--------|----------|
| Homepage | https://www.semrush.com/ | 🔲 Draft done, import pending | P1 |
| Semrush One | https://www.semrush.com/semrush-one/ | 🔲 Not started | P1 |
| Enterprise | https://www.semrush.com/enterprise/ | 🔲 Not started | P1 |
| SEO | https://www.semrush.com/seo/ | 🔲 Not started | P2 |
| Content Marketing | https://www.semrush.com/content-marketing-platform/ | 🔲 Not started | P2 |
| Market Research | https://www.semrush.com/market-research/ | 🔲 Not started | P2 |
| Pricing | https://www.semrush.com/prices/ | 🔲 Not started | P2 |
| Blog | https://www.semrush.com/blog/ | 🔲 Not started | P3 |
| About | https://www.semrush.com/company/ | 🔲 Not started | P3 |

---

## Known Issues and Blockers

| Issue | Block/Page | Severity | Status |
|-------|-----------|----------|--------|
| No import scripts yet | All pages | High | Open — needs tools/ setup |
| hero logo row: marquee behavior not final | `hero` | Low | Verify visual output |

---

## Next Actions (Prioritized)

1. **Validate homepage draft** — open `localhost:3000/index` and verify all blocks render correctly
2. **Audit blocks against live semrush.com** — compare draft output to the live page, identify gaps
3. **Set up import infrastructure** — create `tools/importer/` with universal import script
4. **Import homepage** — build parsers for all homepage blocks, run bulk import
5. **Validate performance** — run PageSpeed Insights against feature branch preview URL
6. **Import Semrush One and Enterprise pages** — highest-priority subpages

---

## Environment URLs

| Environment | URL Pattern |
|-------------|------------|
| Local dev | `http://localhost:3000` |
| Feature preview | `https://{branch}--{repo}--{owner}.aem.page/` |
| Production preview | `https://main--{repo}--{owner}.aem.page/` |
| Production live | `https://main--{repo}--{owner}.aem.live/` |

Get repo info: `gh repo view --json nameWithOwner` or `git remote -v`

---

## Publishing Process

1. Push changes to a feature branch
2. AEM Code Sync processes changes → available at feature preview URL
3. Run PageSpeed Insights at preview URL — must score 100
4. Open PR to `main` — include preview URL in description (required, PR will be rejected without it)
5. Human reviewer inspects URL and merges
6. AEM Code Sync updates main for production
