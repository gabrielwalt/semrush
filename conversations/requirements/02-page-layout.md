# Page Layout & Design Tokens

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Max-Width

- **Token:** `--layout-max-width: 1440px` (or align existing `--container-max-width`). (Conv02 P01 §1)
- **Applied at the block wrapper level** (`main > .section > div`), not at the section level (`main > div`). Sections are always full-width. (Conv04 P23)
- **The original site's content area:** `max-width: 1440px` with `padding: 0 32px`. Implement the same. (Conv02 P26)
- **One primary layout max-width.** Unless inner reading columns need a narrower token, prefer a single value. (Conv02 P01 §1)
- **Blocks must have a way to escape the max-width container.** For example, the right side of the carousel should extend to the right viewport edge. (Conv04 P23)

---

## Vertical Spacing System

- **Section rule:** first and last items inside a section have no margin top/bottom. Instead, add spacing as **padding top and bottom on the section**. Sections themselves have `margin: 0`. (Conv02 P18)
- **Original site:** `padding: 120px 0` on sections, `margin: 0`. Visual gap between sections comes purely from section padding. (Conv02 P18)

---

## Page-Level Gradient Background

- **The original site has a single page-level gradient** that shows through all sections because everything above it is transparent. Header and logo marquee backgrounds must be **transparent** (not opaque) so the page-level gradient shows through. (Conv02 P07)
- **Gradient spec:** `linear-gradient(rgb(220,238,235) 0%, rgb(232,225,255) 75%, rgb(255,255,255) 100%)` with `background-size: 100% 2814px`. (Conv02 P07)

---

## Hero Pattern Background

- **Scoped to the home page only** via a page template metadata class (e.g., `homepage`) applied to the body — not hardcoded via a section selector or `:has()`. (Conv03 P24)
- **CSS rule:**
  ```css
  main .section.centered:first-of-type {
    background: url(/icons/pattern-hero.svg) 2px calc(50% + 100px) repeat-x;
  }
  ```
  (Conv03 P24 — exact rule quoted)
- **Breakpoint positions:**
  - ≥1440px → `2px calc(50% - 20px)`
  - 1024–1439px → `2px calc(50% - 100px)`
  - 768–1023px → `2px calc(50% + 100px)`
  - <768px → `-2px 100%`
  (Conv02 P11)

---

## Section Styles

- **When a section needs special styling** (background, color scheme, layout), authors apply it via Section Metadata. Import parsers should detect visual context from the source DOM and emit Section Metadata automatically. (AGENTS.md rule, Conv05 P5)
- **`section-dark`:** For sections with a dark background (e.g., stats-visibility). The block CSS should be transparent; the section handles the background. Import parsers must auto-detect the dark background and emit this style. (Conv05 P5)
- **`section-pattern-bars`:** The decorative bar pattern background must be a separate section style, added alongside `section-dark` via Section Metadata. Import parsers must emit both styles together. (Conv05 P7)

---

## Breakpoints

- **Original site uses:** primarily `768px` (tablet) and `1024px` (desktop), occasionally `1280px` and `1440px` for max-widths. (Conv01 P10)
- **Apply to all blocks** including header and footer. (Conv01 P10)

---

## Typography System

- **Type system must match the original site.** Look at title sizes throughout the content, compare with the original page's styles (text size, font weight, line height, text transform), and define a corresponding font system. (Conv06 P1)
- **Font:** Lazzer throughout (used in footer, carousels, testimonials, and generally). (Conv06 P14)
- **Section heading (carousel, testimonials, carousel-slider):** 48px, uppercase. (Conv06 P4)
- **AI Visibility Index h2:** 84px (display size), uppercase, centered alignment. (Conv06 P11)
- **Spacing below AI Visibility Index h2:** subtitle 24px gap, subtitle → CTA 32px gap, CTA → table 60px gap. (Conv06 P11)
- **Use tokens from `styles.css`**; add new tokens when values repeat. (AGENTS.md rule)

---

## Background Images

- **Hero:** SVG stripe pattern overlay. (Conv01 P16)
- **Promo-cards (semrush-one):** SVG decorative overlay on the purple gradient. (Conv01 P16)
- **Promo-cards (enterprise):** WebP background image at bottom-right. (Conv01 P16)
- **AI Visibility Index:** SVG pattern at the bottom of the dark section. (Conv01 P16)

---

## Glass Surface

- **One global `.glass-surface` utility class**, inspired by the original `.mp-glass::before` recipe: layered `linear-gradient`, `backdrop-filter`, subtle border, radius, optional inner shadow. (Conv02 P01 §4)
- **Applied automatically** to all elements that get the glass style — not duplicated per block. (Conv03 P36)
- **Consistent padding:** 12px on all glass-surfaced elements (insights-widget, video block). (Conv03 P36)
- **White outline must always be present** on all elements that get the glass style. (Conv04 P14)
- **Small shared JS module** (`scripts/glass.js`) exporting `applyGlassSurface(el)`. Call it from any block's `decorate()`. (Conv02 P01 §4)
