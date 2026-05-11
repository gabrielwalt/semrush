# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.**

---

## Progress

| Area | Status |
|------|--------|
| Homepage content structure | ✅ Done |
| Content — index, nav, footer | ✅ Done |
| Import scripts — homepage, nav, footer | ✅ Done |
| Skills system | ✅ Done (13 skills) |
| Header/nav — sticky, mega-menu, bg toggle | ✅ Done |
| Hero section — centered, glass surface, video | ✅ Done |
| Marquee — logo height, section separation | ✅ Done |
| Homepage block refinement vs original | 🔶 In progress |
| Subpage templates | 🔲 Not started |
| Bulk import | 🔲 Not started |
| PageSpeed 100 | 🔲 Not started |
| Accessibility (WCAG 2.1 AA) | 🔲 Not started |

---

## Homepage Blocks — Refinement Status

| Block | Status | Notes |
|-------|--------|-------|
| `announcement-bar` | ✅ Done | Positioned above fixed header |
| `header` | ✅ Done | Sticky fixed, transparent/white toggle, mega-menu with promos |
| `insights-widget` | ✅ Done | Glass surface, pill shape, authorable strings |
| `hero-video` | ✅ Done | Glass surface, deferred video build from authored links |
| `marquee` | ✅ Done | 100px logo height, own section |
| `promo-cards` | 🔶 Needs refinement | Placeholder bg images; gradient/layout not matched to original |
| `solutions-slider` | 🔶 Needs refinement | Expanded state, description + CTA visibility |
| `stats` | 🔶 Needs refinement | Click-to-expand, mint accent |
| `ai-visibility-index` | 🔶 Needs refinement | Bar chart styling, pattern bg |
| `testimonials` | 🔶 Needs refinement | Quote layout, author photo, stat callout |
| `resources-slider` | 🔶 Needs refinement | Card thumbnails, hover states |
| `footer` | 🔶 Needs refinement | CTA, link columns spacing, reveal animation |

---

## Pages

| Page | URL | Status |
|------|-----|--------|
| Homepage | https://www.semrush.com/ | 🔶 Blocks need refinement |
| Semrush One | https://www.semrush.com/one/ | 🔲 P1 |
| Enterprise | https://enterprise.semrush.com/ | 🔲 P1 |
| Pricing | https://www.semrush.com/pricing/ | 🔲 P2 |
| SEO | https://www.semrush.com/seo/ | 🔲 P2 |
| Features | https://www.semrush.com/features/ | 🔲 P2 |

---

## Known Issues

- Background decoration images (`pattern-hero.svg`, `semrush-one-bg.svg`, `enterprise-bg.webp`, `pattern-ai-vis-index.svg`) are placeholders — need real assets from design
- `logo-marquee` alias block exists for backward compat with previously-published AEM content

---

## Next Actions

1. **Refine remaining homepage blocks** — compare each against original, fix styling
2. **Push updated code + content to AEM** — verify rendered page matches
3. **Import Semrush One page** — test block reuse on a subpage
4. **Performance validation** — PageSpeed on feature branch
5. **Accessibility audit** — WCAG 2.1 AA
