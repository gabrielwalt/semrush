# Importer Parser Patterns

## When to load
Writing or editing a block parser for the import script; parser validation failing; content structure not matching what EDS expects.

## Key insight
A parser receives a DOM element from the source page and must output EDS block tables using `WebImporter.DOMUtils.createTable()`. The first row is always the block name. Content goes in subsequent rows. Section Metadata is its own table emitted after the block tables.

## Table format
```js
// Single-cell block (most blocks):
WebImporter.DOMUtils.createTable([['Block Name'], [contentDiv]], document);

// Multi-row block (e.g., slides):
WebImporter.DOMUtils.createTable([['Block Name'], [row1], [row2], ...], document);

// Two-column row:
WebImporter.DOMUtils.createTable([['Block Name'], [leftCell, rightCell]], document);

// Section Metadata (always last in a section):
WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'centered']], document);
```

## Parser structure
```js
/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract data from source DOM
  // 2. Build content elements (createElement, textContent, appendChild)
  // 3. Create table(s)
  // 4. Wrap in a div if outputting multiple tables
  // 5. element.replaceWith(wrapper)
}
```

## Inline parser (import-homepage.js)
Same logic but uses `var` instead of `const/let` (IIFE scope), and is registered in the `parsers` object + `PAGE_TEMPLATE.blocks` array.

## Pitfalls
- Block name in table header must match the EDS block folder name (capitalized with spaces: `'Hero Video'` → `blocks/hero-video/`)
- `element.replaceWith()` — if you forget this, the original DOM stays and the block isn't created
- Parser validation hook tests against the live URL — your parser must handle the real source DOM, not a simplified version
- Section Metadata must come AFTER all blocks in that section — it marks the section boundary
- Use `innerHTML` (not `textContent`) when constructing headings from source content that may contain `<em>`, `<strong>`, or `<span>` inline markup
- Section boundaries (`<hr>`) and section-metadata must be inserted in `beforeTransform` — parsers run after and will have already replaced the wrapper elements
- Import script must use `export default { transform }` — esbuild bundles it into the IIFE that exposes `window.CustomImportScript.default`. Old IIFE+window assignment pattern no longer works. See `import-script-bundling.md`.
