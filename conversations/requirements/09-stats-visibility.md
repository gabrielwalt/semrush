# Stats Visibility Block (formerly `ai-visibility-index`)

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Block Identity

- **Renamed from `ai-visibility-index` to `stats-visibility`.** (Conv05 P4)

---

## Content Structure

- **The eyebrow pre-title, title, and CTA must be moved outside the block** into the section's default content above the block. (Conv05 P4)
- **The `h2` must use the display size** — 84px, uppercase, centered alignment. (Conv06 P11)
- **Spacing below the h2:**
  - h2 → subtitle: 24px gap
  - subtitle → CTA: 32px gap
  - CTA → table: 60px gap
  (Conv06 P11)
- **A sparkle/star SVG icon must appear above the "AI VISIBILITY INDEX" text.** (Conv04 P24)

---

## Section Styling

- **The dark background must be applied via a `section-dark` section style** (Section Metadata), not via block-specific CSS. The block CSS should be transparent; the section handles the background. (Conv05 P5)
- **A `section-pattern-bars` section style** must also be emitted alongside `section-dark` to bring in the decorative bar pattern background image as a separate section style. (Conv05 P7)
- **Import parser must auto-detect the dark background** from the source DOM and emit both `section-dark` and `section-pattern-bars` Section Metadata automatically. (Conv05 P5, P7)

---

## Bar Chart

- **Bar widths must be proportional** — each bar's width represents its actual % Share of Voice value. (Conv04 P24)
- **Bars must look like horizontal pyramids** — use `clip-path` polygon as on the original site. (Conv04 P24)
- **Bars must alternate colors:**
  - Odd rows: cyan — `rgb(24, 240, 191)`
  - Even rows: purple — `rgb(193, 144, 255)`
  (Conv05 P15)
- **Align the "% Share of Voice" label to the left**, vertically aligned with the values below it. (Conv04 P24)
