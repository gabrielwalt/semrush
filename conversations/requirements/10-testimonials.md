# Testimonials Block

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Block Identity

- **Block name:** `testimonials` (not `testimonials-layout`). Remove the intermediate `.testimonials-layout` wrapper; build directly in the block element. (Conv06 P27)

---

## Content Structure

- **Content must be structured meaningfully for the author.** Proposed and accepted structure: (Conv01 P03, Conv06 P8)
  - Row 1: section heading
  - Row 2: company logo (e.g., Zoominfo SVG)
  - Row 3: quote text
  - Row 4: author photo + name + role (e.g., "CRO at ZoomInfo")
  - Row 5+: stats cards (one per row, or per cell)

---

## Layout

- **The `.testimonials-layout` wrapper must have no horizontal margin/padding** — the section wrapper already provides the edge offset. (Conv06 P27)
- **Decorative quote marks** must be present. (Conv06 P8)
- **Stats card layout:** number top-left (64px/600 weight), label bottom-left (18px/500 weight), `justify-content: space-between`. (Conv06 P8)
- **Stats background pattern** must be present. (Conv06 P8)

---

## Typography

- **Section heading:** uppercase, 48px, line-height 1.0. (Conv06 P8)
- **Quote text:** 26px, weight 500, line-height 1.5, Lazzer font. (Conv06 P8)

---

## Missing Content (identified via critique)

- **Company logo:** Zoominfo SVG (must be in content, not hardcoded). (Conv06 P8)
- **Author role:** "CRO at ZoomInfo" (must be in content). (Conv06 P8)
- **Decorative quote marks.** (Conv06 P8)
- **Stats background pattern.** (Conv06 P8)
