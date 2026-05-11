# PROJECT-BLOCKS.md — Block Inventory

Inventory of all blocks, their variants, and non-obvious intent.  
For implementation details (selectors, DOM structure, CSS values) read the block files directly.  
**Update whenever a block or variant is created, modified, or deleted — including its "Used on" column.**

Knowing where each block, variant, and section style is used matters: it tells you what pages are affected by a change, and helps identify blocks that are ready to be retired or generalised into a shared pattern.

---

## Blocks (15 total)

| Block | Variants | Used on | Notes |
|-------|----------|---------|-------|
| `announcement-bar` | — | Homepage | Top-of-page dismissible banner |
| `hero` | — | Homepage | Text-only hero (h1 + subtitle + CTA); image and logos are separate blocks |
| `hero-video` | — | — | Subpage/campaign hero with video still below centered text |
| `promo-cards` | `promo-cards-semrush-one` | Homepage | Two-column promo with gradient bg |
| `promo-cards` | `promo-cards-enterprise` | Homepage | Dark/black variant, centered layout |
| `solutions-slider` | — | Homepage | Tab-style product solutions slider; each row = one slide |
| `logo-marquee` | — | — | Infinite-scroll logo strip; JS duplicates the set for the loop |
| `stats` | — | Homepage | Interactive stats; **row 1 is the section header**, rows 2+ are individual stats |
| `resources-slider` | — | Homepage | Horizontal slider for content cards (blog/guides) |
| `testimonials` | — | Homepage | Customer quote carousel |
| `cards` | — | — | Standard auto-fill card grid |
| `columns` | — | — | Flexible multi-column layout |
| `ai-visibility-index` | — | Homepage | Custom AI-visibility metrics visualization — do not simplify without verifying the full interaction model |
| `header` | — | All pages | Sticky nav loaded as fragment from `/nav.plain.html` |
| `footer` | — | All pages | Fragment composed of three sub-blocks (see below) |
| `fragment` | — | — | **Utility — never delete.** Exports `loadFragment()` used by `header.js` and `footer.js` |

### Footer sub-blocks

`footer-cta`, `footer-links`, `footer-bottom` are referenced by the footer fragment. Do not delete their folders even though no content page uses them directly.

---

## Section Styles

| Style | Used on | Notes |
|-------|---------|-------|

No section styles implemented yet — add rows here as they are introduced.
