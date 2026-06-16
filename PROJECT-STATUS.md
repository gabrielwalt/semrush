# PROJECT-STATUS.md — Migration Status

**Update whenever a page or block status changes.**

---

## Current Focus

**Last updated:** 2026-06-16  
**Branch:** `main`  
**Active task:** None — completed augmented-styles refactor of homepage blocks  
**Last completed:** Renamed `video-card`→`teaser` (generic `teaser-dark` + `teaser-oneoff-*` backgrounds), `carousel-slider`→`carousel`, `video`→`media`; split `section-ai-visibility`→`section-oneoff-ai-visibility`; homepage now declares `template-homepage` via metadata; fixed promo CTA emphasis + dead enterprise-platform variant  
**Next up:** Open plan tasks C07, C09, Q08  
**Blocker:** None

---

## Progress

| Area | Status |
|------|--------|
| Homepage content + blocks + styling | ✅ Done |
| Import scripts — homepage, nav, footer | ✅ Done (consolidated, no inline duplication) |
| Header/nav — sticky, mega-menu, mobile | ✅ Done |
| Footer — layout, social icons, SEMRUSH reveal | ✅ Done |
| Font system / typography | ✅ Done |
| Skills system | ✅ Done |
| Semrush One — content imported | ❌ Lost — needs re-import |
| Semrush One — block styling | ⏸ Blocked (content lost) |
| Enterprise — content imported | ✅ Done |
| Enterprise — block styling | ✅ Done (E01–E04 complete; verify on preview once published) |
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
| `media` | ✅ Done | Glass-framed image or video; detects video URL in link text, poster fallback, autoplay (was `video`) |
| `marquee` | ✅ Done | Edge fade via CSS mask-image, 50px desktop / 32px mobile logo height |
| `teaser` | ✅ Done | Was `video-card`. 64px padding, glass frame, stacked; `teaser-dark` generic inversion + `teaser-oneoff-*` branded backgrounds |
| `carousel` | ✅✅ Refined | Was `carousel-slider`. Overflow:hidden clipping, left-edge margin alignment, nav in header area (60×60px, 16px gap), hidden <1024px, section header 48px uppercase |
| `stats-facts` | ✅✅ Refined | Up-arrow SVG via ::after, hatching pattern via ::before, section header 48px uppercase, "Learn more" CTA grid-positioned top-right |
| `stats-visibility` | ✅ Done | 84px heading, alternating cyan/purple bars, dark section, section-oneoff-ai-visibility |
| `testimonials` | ✅✅ Refined | Zoominfo logo, quote marks, author role, 26px Lazzer quote text, 2fr:1fr grid, stats pattern SVG |
| `carousel` (resources) | ✅✅ Refined | Descriptions added to content + parser, Lazzer font on cards, 24px image gap |
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
| Semrush One | https://www.semrush.com/one/ | ❌ Content lost — re-import needed before styling |
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

1. Enterprise page — style new blocks (see PROJECT-PLAN.md)
2. Semrush One — re-import content when ready, then verify block styling (columns-stats, cards-icon, cards-awards CSS is ready)
3. Performance validation — PageSpeed on feature branch
4. Accessibility audit — WCAG 2.1 AA
