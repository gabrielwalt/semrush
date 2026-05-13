# Stats Facts Block (formerly `stats`)

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Block Identity

- **Renamed from `stats` to `stats-facts`.** (Conv05 P6)

---

## Content Structure

- **The eyebrow pre-title, the title, and the CTA must be moved outside the block** into the section's default content above the block. (Conv05 P6)
- **"Stats and facts" must be a pre-title eyebrow** (`<p>` before h2), not a title. (Conv01 P03)
- **The "Learn more" link must be a button** (`<strong><a>` or `<em><a>`), not a plain link. Its grid position (top right placement) is correct. (Conv06 P5)
- **CTAs must remain buttons** — stripping button styling (reverting to a plain link) is a regression. (Conv06 P5)

---

## Layout

- **Two-column layout at desktop:** title left, stats right. (Conv01 P11)
- **The "Learn more" CTA** is in the top row after the existing titles. (Conv01 P03)

---

## Scroll Animation

- **The stats section has a scroll-triggered animation** that unfolds as you scroll. Analyze how that animation works on the original site and rebuild something similar. (Conv01 P15)
- **Original animation details:** IntersectionObserver + scroll listener; active stat has dark background, 180px number, cyan arrow; 0.42s ease-in-out transitions; scroll position within the section determines the active item. (Conv01 P15)

---

## Visual Refinement

- **Analyze the original site's look and functionality before implementing.** (Conv04 P19)
- **Critique for all breakpoints**, comparing visually with the original. (Conv04 P19)
- **Check item sizes in the various states they might be in, and at various breakpoints.** (Conv06 P10)
