# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.**

---

## Progress

| Area | Status |
|------|--------|
| Homepage content + blocks + styling | ✅ Done |
| Import scripts — homepage, nav, footer | ✅ Done |
| Header/nav — sticky, mega-menu, mobile | ✅ Done |
| Footer — layout, social icons, reveal | ✅ Done |
| Font system / typography | ✅ Done |
| Skills system | ✅ Done |
| Semrush One — content imported | ✅ Done |
| Semrush One — block styling | 🔲 Not started |
| Enterprise — content imported | ✅ Done |
| Enterprise — block styling | 🔲 Not started |
| Bulk import | 🔲 Not started |
| PageSpeed 100 | 🔲 Not started |
| Accessibility (WCAG 2.1 AA) | 🔲 Not started |

---

## Pages

| Page | URL | Status |
|------|-----|--------|
| Homepage | https://www.semrush.com/ | ✅ Done |
| Semrush One | https://www.semrush.com/one/ | ✅ Content imported |
| Enterprise | https://enterprise.semrush.com/ | ✅ Content imported |
| Pricing | https://www.semrush.com/pricing/ | 🔲 P2 |
| SEO | https://www.semrush.com/seo/ | 🔲 P2 |
| Features | https://www.semrush.com/features/ | 🔲 P2 |

---

## Known Issues

- Backward-compat redirect blocks (`solutions-slider`, `hero-video`, `promo-cards`) exist because remote AEM content may reference old names
- Resource card images 404 on local dev server (remote media assets not available locally)
- ESLint cannot run in current environment (dependency conflict with `es-abstract`)

---

## Next Actions

1. Push code and verify on AEM preview
2. Style the 4 new Semrush One blocks (video-card-feature, columns-stats, cards-icon, cards-awards)
3. Create `tabs` block for Enterprise solutions section
4. Style Enterprise-specific blocks (testimonials-carousel, case-study, video-card-enterprise-platform)
5. Refine Enterprise import script (hero section missing, case study stats duplicated)
6. Performance validation — PageSpeed on feature branch
7. Accessibility audit — WCAG 2.1 AA
