# Hero, Insights Widget & Video Block

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Hero Section Structure

- **The hero section shape:**
  1. Section Metadata (`Style: centered`)
  2. Default content: `h1` + subtitle `<p>` only
  3. `insights-widget` block (empty table — JS builds the form)
  4. `video` block (formerly `hero-video`)
  No monolithic `hero` table. (Conv03 P13, Conv02 P01 §2)
- **The h1 must not sit in an extra inner max-width** that the original doesn't use — remove the inner max-width constraint on the hero text column. (Conv02 P01 §2)
- **h1 max-width:** `max-width: 12.5em`. Subtitle `<p>` max-width: `540px`. (Conv03 P37)
- **Centering is a section concern** (`centered` on the section via Section Metadata), not per-element layout hacks. (Conv03 P13)
- **Do not put affordances (e.g., "Get insights") in default content** as fake links — those belong in the dedicated block. (Conv03 P13)
- **`buildHeroBlock` must not inject a synthetic `hero` block** when `insights-widget` or `video` blocks are detected. (Conv03 P13, Conv02 P01 §2)
- **The hero-video block and insights-widget block are centered too** on the home page — include both inside the same centered section that contains the h1 and subtitle. (Conv02 P07)

---

## Insights Widget (formerly `hero-insights`)

- **Renamed to `insights-widget`** from `hero-insights`. Refactor everywhere: CSS class prefixes, scripts.js guard, styles.css `:has()` reference, content files, import script. (Conv02 P07)
- **The "Enter your website" and "Get insights" strings must be in the block's content**, so the JS reads them from the content and the author can change them. Separated by new lines (paragraph-based), not `|` characters. (Conv02 P03, P07)
- **Width:** `width: 620px; max-width: 620px` with `box-sizing: border-box` so padding is included in the 620px. On mobile it shrinks to fit the viewport. (Conv02 P04)
- **Rounded corners and glass effect** matching the original — same corner radius on the whole widget. (Conv02 P03)
- **Horizontal gap** between the search input and the "Get insights" button matches the original site measurement. (Conv02 P09)
- **Form URL behavior on submit:** navigate to `https://www.semrush.com/signup/?src=main_cta&tk=seo&redirect_to=/seo/?domain={input}&db={country}`. Tied to a specific block variant that triggers interactive behavior. (Conv01 P30)

### Country Switcher

- **The country dropdown must not display behind subsequent blocks** — it must be on top of everything. (Conv04 P5)
- **The country dropdown should look more like a system dropdown.** (Conv04 P5)
- **The arrow next to the country selector must be a chevron identical to the ones in the top nav.** (Conv04 P5)
- **A vertical grey blinking "|" cursor must appear** next to the "Enter your website" placeholder, positioned just to the right of the end of the placeholder text, to make it look like someone typed the placeholder and invite the user to click. (Conv04 P5)
- **The separator line below the "Enter country" search field must be grey** (not black), identical to the separator between the favorite countries. (Conv04 P6)
- **Remove the padding top and bottom from `.insights-widget-dropdown-list`.** (Conv04 P6)
- **Position the blinking "|" cursor closer** — just to the right of the end of the placeholder text, not at the far right of the input. (Conv04 P7)
- **The "Enter country" placeholder and typed text must be the same font size** as the countries listed below it. (Conv04 P14)
- **The blinking cursor must be hidden when the country dropdown is open** (two blinking cursors conflict). (Conv04 P16)
- **The blinking cursor must be hidden when the input has focus** (real browser cursor + fake cursor conflict). (Conv04 P38)

---

## Video Block (formerly `hero-video`)

- **Renamed to `video`** from `hero-video`. (Conv04 P39)
- **Implement as `<video playsinline muted loop autoplay>`.** Respect `prefers-reduced-motion`. Set `src` from the original page's video URL; keep `poster` from source if present. (Conv02 P01 §3)
- **The glass frame is around the video only**, not a block-level background. Remove the full `.hero-video` gradient background. (Conv02 P01 §3)
- **Glass surface:** same `applyGlassSurface()` as insights-widget; same 12px padding. (Conv02 P01 §4, Conv03 P36)
- **The video link must actually load, display, and play**, like on the original site. (Conv04 P2)
- **EDS rewrites external media link hrefs** — the href becomes a local path without extension; the link text preserves the original URL. Block JS must check the link's text content for video extensions when the href-based selector finds nothing. (Conv04 P2)
- **DA does not support `<video>` elements** — encode video in content as plain URL links + poster image (same convention as the `video` block). Video element is built after `window.load`. (Conv03 P38)
- **The `video` block must also carry an `alt` attribute** from the poster image. (Conv03 P40)
- **Video construction from links must not hurt page performance.** The poster image renders immediately; the video element is built after `window.load`. (Conv03 P38)
