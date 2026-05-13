# Nav / Header

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Content Model

- **Mega-menu content model uses H2/H3/UL hierarchy:**
  - `H2` = top-level nav item (Products, Pricing, Resources, Enterprise)
  - `H3` = column heading within a dropdown (Start Here, Find the Right Tools, Platform, Top Apps, etc.)
  - `UL` = column links under the H3
  - `P` (picture + strong text + regular text) = promo tile at end of dropdown
  - `H2` with no following content = simple external link (no dropdown), e.g., "Enterprise"
  - The top nav bar is built by aggregating all H2 elements.
  (Conv02 P14, Conv03 P21)
- **No `---` (HR) or multiple fragment tricks** to fake column breaks in the nav. (Conv03 P13)
- **Real IA grouping:** nav links must be grouped under real parent headings ("Start Here", "Find the Right Tools", "Platform", "Top Apps") with children in nested structures. (Conv03 P13)
- **Promo images must be real images from semrush.com**, not placeholder webps. Products promo = Semrush One image; Resources promo = Spotlight image. (Conv03 P33)
- **Nav must contain all menu entries** — the importer must cover all columns and never miss any entries, including "Top Apps" (AdClarity, Exploding Topics, SERP Gap Analyzer, Other apps) and all Platform entries. (Conv02 P26)
- **Promo tile content must match the original:**
  - "Try Semrush One for Free" / "The leading platform that unifies SEO authority and AI visibility."
  - "Get Your Ticket Now" / "One day. Real strategies. Built for marketers who play to win." / "October 13, 2026" / "London, UK"
  (Conv02 P03)

---

## Desktop Appearance

- **Logo size:** 150×36px (match original). (Conv01 P36)
- **Nav link font size:** 16px. (Conv01 P36)
- **Header height:** 84px. (Conv01 P36)
- **Header background on desktop:** transparent (matching the page-level gradient — `rgb(220,238,235)` mint at the top) so it transitions seamlessly into the hero gradient. (Conv01 P36, Conv02 P07)
- **"Products", "Pricing", "Resources", "Enterprise" items must be centered** in the middle of the top nav on desktop. (Conv01 P31)
- **"Enterprise" item must have an external arrow SVG** on its `::after` element. (Conv01 P31, base64 SVG provided: `PHN2ZyB4...`)
- **Chevron behavior:** when a menu is open, the "v" chevron rotates 180° but must **not move position** (stays at the same vertical height as in the closed state). (Conv01 P31)
- **Chevron placement matches the original** in both open and close states. (Conv02 P03)
- **Nav CTAs (Log In / Sign Up):** 60px control height. Use `inline-flex`, consistent `padding`, `min-height`, `box-sizing`, `line-height`. (Conv02 P01 §7)
- **Log In button:** outlined pill, compact (`padding: 16px 24px`). (Conv01 P22)
- **Sign Up button:** solid dark, compact. (Conv01 P22)
- **Horizontal gap between "Log In" and "Sign Up":** match the original (same gap as between "Enter your website" input and "Get insights" button in insights-widget). (Conv02 P09)

---

## Mega Menu Behavior

- **Mega menu opens:** full-width panel directly below the header, not overlapping it. (Conv01 P38)
- **Header state change:** transparent when mega menu is closed; turns **white** when a dropdown is open. Both the `header` element and `.nav-wrapper` must get the state class — applying only to one causes gradient bleed-through. (Conv03 P35, P36)
- **Animate opening and closing of the mega menu.** (Conv02 P25)
- **Rounded bottom corners:** `border-radius: 0 0 12px 12px` as on the original site. (Conv02 P25, Conv03 P36)
- **Mega-menu promo sections must not overflow** the edge of the mega menu panel — the panel must contain them. (Conv03 P31)

---

## Sticky Header

- **The header must be sticky.** `position: sticky` doesn't work with `overflow: hidden` on ancestors — use `position: fixed` with a dynamic CSS variable (`--nav-top-offset`) instead. (Conv03 P36)
- **When at the top of the page:** the header must leave room above itself for the announcement bar. When scrolling down, the announcement bar scrolls away and the header moves up to `top: 0`. Pages without announcement bars must not have extra whitespace below the header. (Conv03 P34)

---

## Announcement Bar

- **When present on the page, the announcement bar is displayed above the top nav menu**, as on the original site. (Conv01 P11)
- **The announcement bar must be in its own separate section `<div>`**, not in the same section as the hero content. (Conv03 P27)

---

## Mobile Header

- **The hamburger icon must be on the right side of the mobile header**, not on the left. (Conv04 P36)
- **The hamburger must be vertically centered** in the header height. (Conv04 P36)
- **The hamburger must be moved further from the right edge** of the viewport — "a value that would look harmonious and work well usability wise." (Conv04 P37)
- **The mobile mega menu must work:** clicking sub-items of open elements must not close the menu again. Links inside expanded panels must navigate correctly — the parent `li`'s `preventDefault` must not intercept clicks on child links. (Conv04 P37, Conv05 P13)
- **The mobile menu must look nice** at mobile breakpoints. (Conv04 P37)
- **`closeOnFocusLost` must not fire on mobile.** Root cause: `e.relatedTarget` is null on mobile taps, making `nav.contains(null)` return false. Fix: early-return from `closeOnFocusLost` when on mobile (`!isDesktop.matches`). (Conv05 P13, Conv06 P43)

---

## Content Storage

- **Never store nav/footer content files in the code repo root.** Use `getContentRoot()` so header/footer resolve paths dynamically relative to the current content directory. (Conv01 P01)

---

## Nav Import Parser

- **A `parseNav` function must exist** in the import script and emit the H2/H3/UL content model (not nested `<ul>`). (Conv02 P01 §6, Conv03 P21, P23)
- **The nav parser must traverse all dropdown panels, all column groups**, extracting every link and never missing any. (Conv02 P26)
