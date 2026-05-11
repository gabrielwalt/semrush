# PROJECT-STATUS.md — Migration Status

Single source of truth for what has been built, what is in progress, and what remains.  
**Update this file whenever a page or block is completed, started, or its status changes.**

---

## Overall Progress

| Area | Status |
|------|--------|
| Block development — homepage blocks | ✅ Done |
| Design system (tokens, spacing, CTAs, hover) | ✅ Done |
| Content — homepage (content/index.plain.html) | ✅ Done |
| Content — nav fragment (H2/H3/UL mega menu) | ✅ Done |
| Import scripts — homepage parser | ✅ Done |
| Import scripts — nav parser | ✅ Done |
| Skills system (self-learning knowledge base) | ✅ Done (11 skills) |
| Mobile QA (375px) | ✅ Done — no horizontal overflow |
| Desktop QA (1440px) | ✅ Done — all blocks match original |
| Subpage templates | 🔲 Not started |
| Bulk import execution | 🔲 Not started |
| Performance validation (PageSpeed 100) | 🔲 Not started |
| Accessibility review (WCAG 2.1 AA) | 🔲 Not started |

---

## Blocks Status

| Block | CSS | JS | Content | Notes |
|-------|-----|----|---------|-------|
| `announcement-bar` | ✅ | ✅ | ✅ | Complete |
| `insights-widget` | ✅ | ✅ | ✅ | Glass form 620px; reads placeholder/button from `<p>` elements |
| `hero-video` | ✅ | ✅ | ✅ | Glass-framed; supports `<video>` with reduced-motion |
| `marquee` | ✅ | ✅ | ✅ | Generic; 30px items, 100px gap, 45s duration, overflow hidden |
| `promo-cards` | ✅ | ✅ | ✅ | Side-by-side on desktop (section flex-row) |
| `solutions-slider` | ✅ | ✅ | ✅ | Slider with dots nav |
| `stats` | ✅ | ✅ | ✅ | Click-to-expand |
| `resources-slider` | ✅ | ✅ | ✅ | Horizontal slider with arrows |
| `testimonials` | ✅ | ✅ | ✅ | Quote + author + stat |
| `ai-visibility-index` | ✅ | ✅ | ✅ | Table visualization |
| `cards` | ✅ | ✅ | — | Boilerplate |
| `columns` | ✅ | ✅ | — | Boilerplate |
| `header` | ✅ | ✅ | ✅ | H2/H3/UL mega menu; animated dropdown with rounded corners; all columns complete |
| `footer` | ✅ | ✅ | ✅ | Fragment with sub-blocks |
| `hero` | ⚠️ | ⚠️ | — | Retired no-op; kept for backward compat |
| `fragment` | — | ✅ | — | Utility (do not delete) |

---

## Design System Status

| Component | Status | Notes |
|-----------|--------|-------|
| Page gradient + SVG pattern | ✅ | Scoped to homepage via `:has(.insights-widget)` |
| Vertical spacing (sections/blocks) | ✅ | 120px section padding, 64px block margin |
| CTA hover system | ✅ | `--accent-hover: #b072ff`, 0.2s transition |
| Nav CTAs | ✅ | 16px 24px padding, 50/48px height, lavender hover |
| Glass surface | ✅ | Used by hero-video; insights-widget has its own |
| Responsive breakpoints | ✅ | 1440/1024/768/375 verified |
| No horizontal overflow on mobile | ✅ | `overflow: hidden auto` on body |

---

## Pages Status

| Page | Source URL | Status | Notes |
|------|-----------|--------|-------|
| Homepage | https://www.semrush.com/ | ✅ Complete | All blocks, styles, responsive |
| Semrush One | https://www.semrush.com/one/ | 🔲 Not started | P1 |
| Enterprise | https://enterprise.semrush.com/ | 🔲 Not started | P1 |
| Pricing | https://www.semrush.com/pricing/ | 🔲 Not started | P2 |
| SEO | https://www.semrush.com/seo/ | 🔲 Not started | P2 |
| Features | https://www.semrush.com/features/ | 🔲 Not started | P2 |

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| 404 errors for missing media files | Low | Content references images not in local dev — expected when images aren't uploaded |
| `scrollWidth` reports 382px at 375px viewport | Cosmetic | Marquee track extends beyond container but is clipped by overflow:hidden — no visible scrollbar |

---

## Next Actions (Prioritized)

1. **Run import script end-to-end** — verify full homepage import produces correct content structure
2. **Import Semrush One page** — test block reuse on a subpage
3. **Performance validation** — PageSpeed on feature branch
4. **Accessibility audit** — WCAG 2.1 AA compliance check

---

## Environment URLs

| Environment | URL Pattern |
|-------------|------------|
| Local dev | `http://localhost:3000` |
| Feature preview | `https://{branch}--{repo}--{owner}.aem.page/` |
| Production preview | `https://main--{repo}--{owner}.aem.page/` |
| Production live | `https://main--{repo}--{owner}.aem.live/` |
