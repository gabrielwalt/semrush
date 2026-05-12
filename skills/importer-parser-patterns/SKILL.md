---
name: importer-parser-patterns
description: EDS import parser patterns. Use when writing a block parser, parser validation is failing, or content structure doesn't match EDS expectations.
---

Parser receives a source DOM element and outputs EDS block tables via `createTable()`. First row = block name. Use `element.replaceWith()` to swap in the result.

## Table format
```js
// Single-cell block:
WebImporter.DOMUtils.createTable([['Block Name'], [contentDiv]], document);
// Multi-row:
WebImporter.DOMUtils.createTable([['Block Name'], [row1], [row2]], document);
// Two-column:
WebImporter.DOMUtils.createTable([['Block Name'], [leftCell, rightCell]], document);
// Section Metadata (always last in section):
WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'centered']], document);
```

## Parser structure
```js
export default function parse(element, { document }) {
  // 1. Extract from source DOM  2. Build content elements
  // 3. Create table(s)  4. element.replaceWith(wrapper)
}
```

## Pitfalls
- Block name in header must match folder name (capitalized: `'Hero Video'` → `blocks/hero-video/`)
- Forgetting `element.replaceWith()` leaves original DOM — block not created
- Section Metadata must come AFTER all blocks in its section
- Use `innerHTML` (not `textContent`) for headings that may contain inline markup
- Section boundaries (`<hr>`) go in `beforeTransform`, not parsers
