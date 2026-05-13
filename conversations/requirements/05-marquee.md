# Marquee Block

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Block Identity

- **Renamed from `logo-marquee` to `marquee`.** The implementation must be generic — each entry on a new line becomes a marquee item (works for images, text, or any content, not only logos). (Conv02 P08)

---

## Visual Appearance

- **Logo color:** black (remove or replace `opacity: 0.3` grey treatment). (Conv02 P01 §5)
- **Logo height (final decision):** 50px on desktop, 32px on mobile. *This supersedes the earlier 100px requirement.* (Conv05 P17)
- **Horizontal spacing between logos:** consistent gap/padding-right between all items including the loop seam (first and last element). (Conv05 P11, P12)
- **Animation speed:** slower than the default (increase duration to match original). (Conv02 P01 §5)
- **Edge fades:** `mask-image` gradient on the track container. (Conv04 P3 — confirmed; Conv02 P23 investigation found the original used `overflow: hidden` but Conv04 P3 explicitly restated fades as the requirement)
- **Background:** transparent — the page-level gradient must show through. (Conv02 P07)

---

## Technical

- **No broken image emissions.** SVGs imported via `<img>` tags survive the EDS pipeline; inline/background SVGs do not — download and reference via `<img>`. (Conv05 P13 / import parser rules)
- **Horizontal spacing must not be lost** when the gap value is changed. (Conv05 P12 — regression noted)
