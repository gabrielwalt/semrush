# Carousel Slider Block

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Block Identity & Variants

- **Renamed from `solutions-slider` to `carousel-slider`.** (Conv04 P11, Conv03 P26)
- **Two variants consolidated into one block:**
  - Default (`carousel-slider`) — formerly `resources-slider` — is the base display.
  - `carousel-slider-expansible` variant — formerly `carousel-slider` — retains its current look and function.
  Both share the same logic for item placement and rotation. The current expansible look/function must not be broken. (Conv05 P9)
- **Nav buttons must be positioned identically for both variants:** absolutely positioned in the section header area (inside `default-content-wrapper`), 60×60px, 16px gap between buttons, bottom-aligned with the heading, right-aligned to container edge. (Conv06 P4)

---

## Expansible Variant (`carousel-slider-expansible`)

### Content Model

- **Two columns per entry:**
  - Col 1: eyebrow + title + small image
  - Col 2: large image + description + CTA
  (Conv04 P11, Conv03 P26, Conv04 P30, P31)
- **Small image and large image must be different images** — small = `_m.webp` thumbnail, large = full `.webp`. (Conv04 P21, P31, P33)
- **Section titles (e.g., "Solutions ( 9 )") must be included** in the block to display the count as on the original. (Conv04 P11)
- **There must be no unused title above the large image in col2** — remove if not used. (Conv04 P33)

### Layout & Behavior

- **The carousel must extend to the right viewport edge.** When scrolled to the beginning, the left edge of carousel items touches the left side of the viewport. Use `section: overflow: hidden` for the peek/bleed effect; `margin-left` (not padding) for first-card alignment; `margin-right` on last card for right-edge spacing. (Conv03 P26, Conv06 P7)
- **The hatched item background must be aligned to the bottom of the cards.** (Conv03 P26)
- **When opening a card, do not reflow the eyebrow pre-title and title** — keep them in place. (Conv03 P26)
- **Description and CTA must appear when the card is opened**, and must fade in through a swift fade. (Conv03 P26, Conv04 P21)
- **The expand button must look like a "+"** — round button, not text pill. (Conv04 P14)
- **The small images must not be cropped** — use `object-fit: contain`, not `cover`. (Conv04 P14)
- **The expanded large image should hang on the right edge of the card** with overflow hidden, not be cropped by the glass container. (Conv04 P14, Conv04 P42)
- **Description and CTA in expanded state must be visible** (not invisible). (Conv04 P14)
- **CTA color in open state must match the original site.** (Conv04 P42)
- **The large image in expanded state:**
  - Bottom padding from the card lower edge equal to the CTA padding on the left
  - Top margin/spacing from the close ("×") button above the image
  (Conv04 P42)
- **Title sizes:** "Solutions" is a small label (12px, uppercase, weight 600, letter-spacing +0.24px); the subtitle ("Get seen...") is the large heading. (Conv04 P14, Conv06 P23)
- **Glass style frame around both small and large images.** (Conv04 P11)

### Import Script

- **Update import scripts to produce the 2-column content model** with separate small and large images, descriptions, and CTAs. (Conv04 P21, P31, P33)
- **Verify the import script captures the correct (different) images** for each column. (Conv04 P33)

---

## Regular Variant (default `carousel-slider`, formerly `resources-slider`)

### Content

- **All available content must be captured** — description for each item must not be left out. (Conv06 P3)
- **Update import scripts** to capture description text and correct images. (Conv04 P29, Conv06 P3)

### Layout

- **Card width:** 430px. (Conv06 P4)
- **Gap between image and text:** 24px. (Conv06 P4)
- **Text cell padding-right:** 32px. (Conv06 P4)
- **Title/description:** Lazzer font. (Conv06 P4)
- **Tags:** dark color. (Conv06 P4)
- **Section heading:** 48px, uppercase. (Conv06 P4)
- **Image height:** 286px, aspect ratio approximately 430×286 (3:2), `object-fit: cover`. (Conv04 P25)
- **Description texts must be shown** between the title and the category tag. (Conv04 P25)

### Positioning

- **Nav buttons positioned identically to the expansible variant** — same absolute positioning in the section header area. (Conv06 P4)
