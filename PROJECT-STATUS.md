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
| `carousel-slider` | ✅✅ Refined | Overflow:hidden clipping, left-edge margin alignment, nav in header area (60px/16px gap), hidden <1024px, section header 48px uppercase |
| `stats-facts` | ✅✅ Refined | Up-arrow SVG via ::after, hatching pattern via ::before, section header 48px uppercase, "Learn more" CTA grid-positioned top-right |
| `ai-visibility-index` | ✅ Done | 84px heading, purple-to-teal bar gradient, dark section |
| `testimonials` | ✅✅ Refined | Rebuilt: Zoominfo logo, quote marks, author role, 26px Lazzer quote text, 2fr:1fr grid, stats pattern SVG |
| `resources-slider` | ✅✅ Refined | Descriptions added to content + parser, Lazzer font on cards, proper spacing (24px image gap, 8px desc gap, 24px tag gap) |
| `footer` | ✅✅ Refined | Sticky reveal mechanism fixed (sibling of .footer, not child), Lazzer font, 1440px max-width, bottom bar separator, column header weight 600 |

### Global typography refinement (✅✅)
- Body font-weight 500, letter-spacing -0.02em
- H2/H3 letter-spacing tightened to -0.04em
- Tablet breakpoint added (<1024px) for heading-xl → 32px
- Lazzer font 500 weight loaded for body text rendering

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
- Footer social media icons row not yet imported (present on original, missing from our footer content)
- Footer Adobe logo not yet added to bottom bar copyright row
- Lazzer font weight 500 is used by body but only 400/600/700 weights are loaded in `fonts.css` — may cause faux-bold rendering on some browsers. Consider adding a 500-weight `@font-face` declaration.
- ESLint cannot run in current environment (dependency conflict with `es-abstract`) — JS files not linted

---

## Next Actions

1. **Push updated code** — verify rendered page on AEM preview
2. **Re-import homepage content** — update to `carousel-slider` block name + 2-column format
3. **Import Semrush One page** — test block reuse on subpage
4. **Performance validation** — PageSpeed on feature branch
5. **Accessibility audit** — WCAG 2.1 AA
