# Video Card Block (formerly Promo Cards)

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Block Identity

- **Renamed to `video-card`** from `promo-cards`. (Conv04 P39)
- **Variants:** `semrush-one` and `enterprise` — both must share the same content structure. (Conv05 P4)

---

## Content Structure

- **Content model for each card:**
  - Row 1: text cell — `h2` + description + CTA
  - Row 2: media cell — video URL link + poster image
  Both variants must follow this exact same structure. (Conv05 P4, Conv04 P35)
- **Video URLs must never be hardcoded in JS.** The author controls what video is displayed via the media row in the content. (Conv04 P35, Conv05 P4)
- **Media row:** A row (not column) containing the video URL link and the poster image. (Conv04 P35)

---

## Layout

- **Cards must be stacked vertically**, not displayed side by side. (Conv04 P10)
- **Both cards must be in the same section** (one flex row with `gap: 64px`), not in separate sections. (Conv02 P04)
- **Container padding:** `64px` all sides (match original). (Conv04 P26)
- **Card height:** adjust to the height of the content — remove fixed height. Keep vertical padding top and bottom equal to the left padding value. (Conv04 P41)

---

## Video Display

- **Use the same video detection trick as the `video` block** — EDS rewrites hrefs; check link text content for video extensions. (Conv04 P10)
- **`object-fit: contain`**, not `cover` — the original does not crop the video. (Conv04 P40)

---

## Glass Border

- **The glassy border must not have dimensions of its own.** It must follow the dimensions of the video it wraps — shrink-wrap around the video, not stretch to fill the grid cell. (Conv04 P32, P35)

---

## CTA

- **Enterprise promo card "Book a demo" CTA:** must not pick up the pink/accent primary treatment. It must match the dark-card CTA style on the original (outline/transparent/white on dark background). (Conv02 P01 §7)

---

## Import Script

- **Import styles from the original site** and match the visual appearance. (Conv04 P10)
- **Verify import script captures the correct content model** — text row + media row. (Conv04 P35)
