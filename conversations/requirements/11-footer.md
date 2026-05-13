# Footer

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## SEMRUSH Reveal Architecture

- **The large "SEMRUSH" text must be revealed as you scroll to the very bottom** — sticky position that gets revealed from behind the footer when scrolling to the bottom. (Conv01 P27, Conv06 P13)
- **Implementation:**
  - The SEMRUSH reveal element: `position: sticky; bottom: 0; z-index: 0` — a **sibling** of the `.footer` block inside `<footer>`, NOT a child of the block.
  - The `.footer` block: `position: relative; z-index: 1; background: white` to cover the reveal until scrolled past.
  - Height of the SEMRUSH element: 550px.
  (Conv06 P13)

---

## Visual Design

- **Font:** Lazzer throughout the footer. (Conv06 P14)
- **Container max-width** must match the global container (not 1200px). (Conv06 P14)
- **Column headers:** font weight 600. (Conv06 P14)
- **Link font-size:** 14px. (Conv06 P14)
- **Bottom bar:** with a separator line. (Conv06 P14)
- **Social media icons:** outline style, 40px touch targets with flush spacing. (Conv06 P41)
- **Adobe logo:** red "A" image (not text). (Conv06 P41)
- **Link columns:** 5 properly-spaced link columns in a 1:2 grid. (Conv06 P41)
- **Legal links:** spread across the bottom bar with `justify-content: space-between`. (Conv06 P41)

---

## Social Icons

- **Import social icons as SVGs** and store them in an `svg` (or `icons`) folder in the code. (Conv01 P27)

---

## Breakpoints

- **Ensure proper width on all breakpoints**, well aligned with the header and content area. (Conv06 P41)
