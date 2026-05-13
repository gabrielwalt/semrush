# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.**

---

## Current Focus

**Last updated:** 2026-05-13  
**Branch:** `aem-merged-20260513`  
**Active task:** T01 — Fix mobile nav closeOnFocusLost bug + hamburger alignment  
**Last completed:** Requirements audit — PROJECT-BLOCKS.md, PROJECT-DESIGN.md, PROJECT-IMPORT.md corrected against all 12 requirements files; skills rebuilt (M01–M05, M07)  
**Next up:** T01 → T02 → T03 → T04 → T05  
**Blocker:** None

---

## Progress

| Area | Status |
|------|--------|
| Homepage content + blocks + styling | ✅ Done |
| Import scripts — homepage, nav, footer | ✅ Done |
| Header/nav — sticky, mega-menu, mobile | ✅ Done |
| Footer — layout, social icons, SEMRUSH reveal | ✅ Done |
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

## Homepage Blocks — Refinement Status

| Block | Status | Notes |
|-------|--------|-------|
| `announcement-bar` | ✅ Done | Purple accent bg, centered link |
| `header` | ✅ Done | Sticky fixed, transparent/white toggle, mega-menu, mobile nav focusout fix |
| `insights-widget` | ✅ Done | Searchable country dropdown (115 countries), blinking cursor, chevron, z-index layering |
| `video` | ✅ Done | Detects video URL in link text, poster fallback, autoplay |
| `marquee` | ✅ Done | Edge fade via CSS mask-image, 50px desktop / 32px mobile logo height |
| `video-card` | ✅ Done | 64px padding, video autoplay, glass frame, stacked vertically |
| `carousel-slider` | ✅✅ Refined | Overflow:hidden clipping, left-edge margin alignment, nav in header area (60×60px, 16px gap), hidden <1024px, section header 48px uppercase |
| `stats-facts` | ✅✅ Refined | Up-arrow SVG via ::after, hatching pattern via ::before, section header 48px uppercase, "Learn more" CTA grid-positioned top-right |
| `stats-visibility` | ✅ Done | 84px heading, alternating cyan/purple bars, dark section, section-pattern-bars |
| `testimonials` | ✅✅ Refined | Zoominfo logo, quote marks, author role, 26px Lazzer quote text, 2fr:1fr grid, stats pattern SVG |
| `carousel-slider` (resources) | ✅✅ Refined | Descriptions added to content + parser, Lazzer font on cards, 24px image gap |
| `footer` | ✅✅ Refined | Sticky reveal fixed (sibling of .footer), social icons, Adobe logo, Lazzer font, 1440px max-width, bottom bar with legal row |

### Global typography refinement (✅✅)
- Body font-weight 500, letter-spacing -0.02em
- H2/H3 letter-spacing tightened to -0.04em
- Tablet breakpoint (<1024px) for heading-xl → 32px
- Lazzer font 500 weight in use for body text

---

## Pages

| Page | URL | Status |
|------|-----|--------|
| Homepage | https://www.semrush.com/ | ✅ Done |
| Semrush One | https://www.semrush.com/one/ | ✅ Content imported — styling needed |
| Enterprise | https://enterprise.semrush.com/ | ✅ Content imported — styling needed |
| Pricing | https://www.semrush.com/pricing/ | 🔲 P2 |
| SEO | https://www.semrush.com/seo/ | 🔲 P2 |
| Features | https://www.semrush.com/features/ | 🔲 P2 |

---

## Known Issues

- Backward-compat redirect blocks (`solutions-slider`, `hero-video`, `promo-cards`) exist because remote AEM content may reference old block names
- Resource card images 404 on local dev server (remote media assets not available locally)
- Lazzer font weight 500 is used by body but only 400/600/700 weights are loaded in `fonts.css` — may cause faux-bold rendering on some browsers
- ESLint cannot run in current environment (dependency conflict with `es-abstract`) — JS files not linted

---

## Next Actions

1. Push code and verify on AEM preview
2. Style the 4 new Semrush One blocks (video-card-feature, columns-stats, cards-icon, cards-awards)
3. Create `tabs` block for Enterprise solutions section
4. Style Enterprise-specific blocks (case-study, testimonials variations)
5. Refine Enterprise import script (hero section missing, case study stats)
6. Performance validation — PageSpeed on feature branch
7. Accessibility audit — WCAG 2.1 AA
