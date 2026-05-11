# PROJECT-LEARNINGS.md — Indexed Learning Database

A structured record of mistakes, discoveries, and hard-won lessons from this project.  
**Add a new entry after every task where something non-obvious was discovered or a mistake was made.**

---

## How to Use This File

**Before starting a task:** Search this file for keywords related to what you're about to do. A matching entry may save you 30 minutes of debugging.

**After a task:** If you discovered something that isn't obvious from the code, add a `LEARN-NNNN` entry. Be specific — "EDS does something weird with images" is not a learning. "EDS only wraps images in `<picture>` when they are direct children of a `<div>`" is.

---

## Format

```
## LEARN-NNNN: [Concise title]

- **Date:** YYYY-MM-DD
- **Category:** CSS | JS | Import | Content | Performance | EDS | Lint | Block
- **Context:** [One sentence: what task triggered this]
- **Problem:** [What went wrong or what was surprising]
- **Root cause:** [Why it happened]
- **Fix:** [How it was resolved]
- **Prevention:** [What to check or do differently next time]
```

---

## Learnings

### EDS Core Patterns

---

## LEARN-0001: EDS only wraps images in `<picture>` when they are direct children of a `<div>`

- **Date:** 2026-05-11
- **Category:** EDS / JS
- **Context:** Implementing image detection in block JS files
- **Problem:** `querySelector('picture')` returns null for images that came from imported content, even though the image is visible in the page.
- **Root cause:** EDS automatically wraps images in `<picture>` elements **only when the `<img>` is a direct child of a `<div>`**. When images arrive inside `<p>` tags (which is the default from content import and from authored content), they remain as bare `<img>` elements inside the `<p>`.
- **Fix:** Always use a dual-detection pattern in block JS:
  ```javascript
  // Try <picture> first (direct-div-child images)
  let img = col.querySelector('picture');
  // Fall back to <img> inside <p> (imported/authored content)
  if (!img) img = col.querySelector(':scope > p > img');
  ```
- **Prevention:** Any block JS that detects images must use the fallback pattern. Never assume `querySelector('picture')` alone is sufficient.

---

## LEARN-0002: EDS button decoration requires `<strong>` or `<em>` wrapper

- **Date:** 2026-05-11
- **Category:** EDS / Content
- **Context:** Setting up CTA links in draft content files
- **Problem:** A link that should render as a button renders as a plain underlined link.
- **Root cause:** EDS only applies `.button.primary` or `.button.secondary` classes to links that are wrapped in `<strong>` or `<em>`:
  - `<p><strong><a href="...">Text</a></strong></p>` → `.button.primary`
  - `<p><em><a href="...">Text</a></em></p>` → `.button.secondary`
  - `<p><a href="...">Text</a></p>` → no button class (plain link)
- **Fix:** Wrap CTA links in `<strong>` in the draft content file.
- **Prevention:** When writing or reviewing draft `.plain.html` files, verify that CTA links are wrapped in `<strong>` (primary) or `<em>` (secondary).

---

## LEARN-0003: CSS font family names must NOT be quoted in stylelint

- **Date:** 2026-05-11
- **Category:** Lint / CSS
- **Context:** Copying CSS from Figma or external sources
- **Problem:** `npm run lint` fails with a stylelint error about font family quoting.
- **Root cause:** Stylelint standard config prohibits quoted font family names.
- **Fix:**
  ```css
  /* ✅ Correct */
  font-family: Inter, sans-serif;
  font-family: Lazzer, Inter, sans-serif;
  
  /* ❌ Fails lint */
  font-family: 'Inter', sans-serif;
  font-family: "Inter", sans-serif;
  ```
- **Prevention:** After copying any CSS from Figma, design tools, or web sources, search for quoted font names and remove the quotes.

---

## LEARN-0004: EDS generates `{block}-container` and `{block}-wrapper` divs — avoid using these names in JS class assignments

- **Date:** 2026-05-11
- **Category:** EDS / CSS / JS
- **Context:** Adding CSS classes to DOM elements in block JS
- **Problem:** A custom class named `{blockname}-container` conflicts with EDS-generated div classes, causing unexpected CSS specificity issues.
- **Root cause:** EDS automatically wraps each block in two container divs: `.{block}-wrapper` (outer) and `.{block}-container` (inner). These names are reserved.
- **Fix:** Use more specific names for child regions: `{block}-{region}` (e.g., `promo-cards-image`, `stats-header`, `hero-content`).
- **Prevention:** Never add `{block}-wrapper` or `{block}-container` classes in JS. Use explicit region names like `{block}-content`, `{block}-image`, `{block}-body`.

---

## LEARN-0005: `import.bundle.js` must use `--format=iife --global-name=CustomImportScript`

- **Date:** 2026-05-11
- **Category:** Import
- **Context:** Setting up the import bundler
- **Problem:** Import script runs but produces no output, or throws a silent error.
- **Root cause:** The bulk importer loads the bundle as a browser script and reads `window.CustomImportScript`. ESM format doesn't set a global variable — the importer finds nothing.
- **Fix:** Always bundle with:
  ```bash
  npx esbuild tools/importer/import.js \
    --bundle --format=iife --global-name=CustomImportScript \
    --platform=browser --outfile=tools/importer/import.bundle.js
  ```
- **Prevention:** Never change the bundle format flags. If you add `--format=esm` or remove `--global-name=CustomImportScript`, the importer will silently fail.

---

## LEARN-0006: Double borders between adjacent block items — use border-top + last-child border-bottom

- **Date:** 2026-05-11
- **Category:** CSS
- **Context:** Styling list-like blocks where items need a separator
- **Problem:** Adding `border-top` and `border-bottom` to every item creates 2px visual gaps between adjacent items (one item's border-bottom stacks with the next item's border-top).
- **Root cause:** Adjacent elements both have top and bottom borders, visually doubling the border width.
- **Fix:**
  ```css
  .{block}-item { border-top: 1px solid #ddd; }
  .{block}-item:last-child { border-bottom: 1px solid #ddd; }
  ```
- **Prevention:** Whenever items in a list need separators, always use border-top on all items and border-bottom only on the last child.

---

## LEARN-0007: CSS `:only-child` ignores text nodes — don't use it to detect standalone links

- **Date:** 2026-05-11
- **Category:** CSS / EDS
- **Context:** Detecting whether a link is the sole content of a paragraph (for auto-promotion to button)
- **Problem:** `p > a:only-child` matches `<p>some text <a>link</a></p>` because `:only-child` only counts element children, not text nodes.
- **Root cause:** CSS `:only-child` pseudo-class tests element-level children only. Text nodes are invisible to it.
- **Fix:** Use JavaScript to check `p.textContent.trim() === a.textContent.trim()` instead.
- **Prevention:** Never use `:only-child` to determine "this link is the only content in the paragraph." Always use JS text comparison.

---

## LEARN-0008: `innerHTML` vs `textContent` when constructing headings that contain inline markup

- **Date:** 2026-05-11
- **Category:** Import / JS
- **Context:** Building parsers that create heading elements
- **Problem:** Highlighted words in headings (e.g., text wrapped in `<em>` for color) disappear after import — the heading shows only plain text.
- **Root cause:** Using `element.textContent = sourceHeading.textContent` strips all inner HTML including `<em>`, `<strong>`, `<span>` tags.
- **Fix:** Use `element.innerHTML = sourceHeading.innerHTML` when constructing headings from source content that may contain inline markup.
- **Prevention:** When creating any element from source DOM content, always check if the source contains inline elements. Use `innerHTML` unless you have a specific reason to strip markup.

---

## LEARN-0009: Section metadata must be inserted in `beforeTransform`, not `afterTransform`

- **Date:** 2026-05-11
- **Category:** Import
- **Context:** Building section boundary detection in the import transformer
- **Problem:** Section metadata appears at the wrong position or is missing entirely.
- **Root cause:** Import parsers run between `beforeTransform` and `afterTransform`. If you insert `<hr>` section boundaries in `afterTransform`, the parser has already replaced the wrapper elements that the section transformer uses for boundary detection.
- **Fix:** Always insert `<hr>` section boundaries and `section-metadata` blocks in `beforeTransform`, before any parsers run.
- **Prevention:** The transform order is: `beforeTransform` → parsers → `afterTransform`. Section structure must be set up in `beforeTransform`.

---

## LEARN-0010: Full-width blocks require wrapper override in CSS

- **Date:** 2026-05-11
- **Category:** CSS / EDS
- **Context:** Making `hero`, `hero-video`, and `promo-cards` span the full viewport width
- **Problem:** Block content is constrained by the default EDS section max-width.
- **Root cause:** EDS wraps each block in `.{block}-wrapper` and `.{block}-container` divs that have a default `max-width` and padding applied by the section styles.
- **Fix:**
  ```css
  .{block}-wrapper {
    max-width: 100% !important;
    padding: 0 !important;
  }
  ```
- **Prevention:** Any block that needs to be full-width must override the wrapper. The `!important` here is the one legitimate use of it in this project — it's needed specifically to override EDS defaults.

---

*Add new learnings below this line, incrementing the LEARN number.*
