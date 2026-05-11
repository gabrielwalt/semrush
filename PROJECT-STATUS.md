# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.**

---

## Progress

| Area | Status |
|------|--------|
| Homepage content structure | ✅ Done |
| Content — index, nav, footer | ✅ Done |
| Import scripts — homepage, nav, footer | ✅ Done |
| Skills system | ✅ Done |
| Header/nav — sticky, mega-menu, bg toggle | ✅ Done |
| Hero section — centered, glass surface, video | ✅ Done |
| Marquee — logo height, edge fade | ✅ Done |
| Homepage block refinement vs original | ✅ Done |
| Subpage templates | 🔲 Not started |
| Bulk import | 🔲 Not started |
| PageSpeed 100 | 🔲 Not started |
| Accessibility (WCAG 2.1 AA) | 🔲 Not started |

---

## Homepage Blocks — Refinement Status

| Block | Status | Notes |
|-------|--------|-------|
| `announcement-bar` | ✅ Done | Purple accent bg, centered link |
| `header` | ✅ Done | Sticky fixed, transparent/white toggle, mega-menu |
| `insights-widget` | ✅ Done | Searchable country dropdown (115 countries), blinking cursor, chevron, z-index layering |
| `hero-video` | ✅ Done | Detects video URL in link text, poster fallback, autoplay |
| `marquee` | ✅ Done | Edge fade via CSS mask-image |
| `promo-cards` | ✅ Done | 64px padding, video autoplay, glass frame, stacked vertically |
| `carousel-slider` | ✅ Done | Expandable cards, right-edge bleed, pattern at bottom, + button |
| `stats` | ✅ Done | Scroll-triggered activation, diagonal arrow pattern, description always visible |
| `ai-visibility-index` | ✅ Done | 84px heading, purple-to-teal bar gradient, dark section |
| `testimonials` | ✅ Done | Dark quote card + grey stat card |
| `resources-slider` | ✅ Done | Card carousel with category tags |
| `footer` | ✅ Done | CTA + link columns + wordmark |

---

## Pages

| Page | URL | Status |
|------|-----|--------|
| Homepage | https://www.semrush.com/ | ✅ Done |
| Semrush One | https://www.semrush.com/one/ | 🔲 P1 |
| Enterprise | https://enterprise.semrush.com/ | 🔲 P1 |
| Pricing | https://www.semrush.com/pricing/ | 🔲 P2 |
| SEO | https://www.semrush.com/seo/ | 🔲 P2 |
| Features | https://www.semrush.com/features/ | 🔲 P2 |

---

## Known Issues

- `solutions-slider` class still used by remote AEM content — thin redirect block loads `carousel-slider`
- Resource card images 404 on dev server (remote media assets not available locally)
- `logo-marquee` alias block may exist in previously-published content

---

## Next Actions

1. **Push updated code** — verify rendered page on AEM preview
2. **Re-import homepage content** — update to `carousel-slider` block name + 2-column format
3. **Import Semrush One page** — test block reuse on subpage
4. **Performance validation** — PageSpeed on feature branch
5. **Accessibility audit** — WCAG 2.1 AA
