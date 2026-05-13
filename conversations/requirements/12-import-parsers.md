# Import Parsers

*Requirements extracted exclusively from Gabriel Walt's explicit statements.*

---

## Core Rules

- **Use `getAttribute('src')` / `getAttribute('poster')` instead of `.src` / `.poster` properties.** The property resolves against the browser context and returns `about:error` for failed loads (SVGs, CSS background images, lazy-loaded assets); the attribute returns the raw authored value. (Conv05 P1)
- **Always resolve relative paths to absolute.** Prefix paths starting with `/` with the source origin (e.g., `https://www.semrush.com`). EDS media pipeline needs full URLs to download assets. (Conv05 P1)
- **Skip images with `src="about:error"` or empty `src`** — never emit broken references into content. (Conv05 P1)
- **Wrap every `<img>` in `<picture>`** — EDS requires this structure for proper media handling. (Conv05 P13)
- **DA does not support `<video>` elements** — emit video as link + poster URL, not `<video>` tags. (Conv03 P38)
- **SVGs get stripped by the `html2md` pipeline** — inject marquee logos (and other SVG content) post-import. (Conv03 P20)

---

## Detect, Don't Hardcode

- **Every styling decision must be detected from the source DOM**, never hardcoded. This includes:
  - CTA type (primary/secondary/accent) — detect from filled vs outline CSS classes
  - Heading level — detect from element hierarchy
  - Block variant — detect from source DOM context
  - Section style — detect from background color, layout patterns
  - Page template — detect from page-level signals
  (Conv05 P9, Conv03 general rule, AGENTS.md)
- **Never inject placeholder text or hardcode editorial strings.** If source content is missing, leave the field empty. (Conv03 general rule)

---

## Specific Parser Requirements

### Hero Parser

- **Output ordered structure:**
  1. Section Metadata (`Style: centered`)
  2. Default content: h1 + subtitle `<p>`
  3. `insights-widget` block (empty)
  4. `video` block (link + poster format)
  (Conv03 P13, Conv02 P01 §8, Conv03 P40)

### Nav Parser (`parseNav`)

- **Emit the H2/H3/UL content model** (not nested `<ul>`). (Conv02 P01 §6, Conv03 P21, P23)
- **Traverse all dropdown panels and all column groups.** Never miss any entries. (Conv02 P26)

### Marquee Parser

- **Output block name `Marquee`** (not `Logo Marquee`). (Conv02 P08)

### Video Card Parser

- **Output text row + media row** (video URL link + poster image). (Conv04 P35)

### Carousel Slider Parser (expansible)

- **Output two-column structure per entry** — Col 1: eyebrow + title + small image; Col 2: large image + description + CTA. (Conv04 P21, P31, P33)
- **Capture different images for each column** (small `_m.webp` thumbnail vs full `.webp`). (Conv04 P33)

### Resources Carousel Parser

- **Capture description text** for each item (missing in early implementation). (Conv04 P29, Conv06 P3)

---

## Limitations / Known Issues

- **Re-importing overwrites hand-structured section divs** (known limitation of the `html2md` → `md2da` pipeline). The canonical `.plain.html` files must be maintained by hand after import and cannot be regenerated purely from the import script. (Conv03 P40)
- **One import script for the whole project.** Add parsers to the existing registry. Only create a second script for fundamentally incompatible DOM structures. (Conv03 P15)
- **Keep import scripts accurate** after any content or block structure refactoring. (Conv06 P33)
- **The import script is the authoritative mapping** from source DOM to EDS content. Never change a block's structure without updating the import script. (Conv03 P15, AGENTS.md)
