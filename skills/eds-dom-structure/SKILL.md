---
name: eds-dom-structure
description: EDS section and block DOM structure. Use when a CSS selector doesn't match, block spacing is broken, or you need to understand where EDS places blocks in the DOM tree.
---

Blocks are NOT children of the section's inner `<div>`. They're **siblings** at the section level, each in their own `-wrapper > -container > .block` chain.

## DOM tree
```
main > .section.{block}-container
  ├── .default-content-wrapper        ← h1, p, links
  ├── .{block}-wrapper                ← full-width shell
  │     └── .{block}-container        ← max-width constraint
  │           └── .{block}.block      ← element passed to decorate()
  └── .section-metadata               ← consumed at build → classes on .section
```

## Selector cheat sheet
| Target | Selector |
|--------|----------|
| Default content | `main > .section > .default-content-wrapper` |
| Block wrapper | `main > .section > .{block}-wrapper` |
| Adjacent wrappers | `[class$="-wrapper"] + [class$="-wrapper"]` |
| Block root in decorate() | `block` argument (already the `.block` element) |

## Block table inner DOM (multi-cell rows)
Inside the `.block` element, EDS transforms authored table rows into nested divs:
```
.block > div (row 1)
  ├── div (cell 1)
  └── div (cell 2)
.block > div (row 2)
  └── div (single cell)
```
For a single-row block with N cells: `.block > div > div:nth-child(1..N)`. The selector `.block > div > div` targets the FIRST cell, not the row. To target all cells, use `.block > div > div` (matches each cell div). For multi-cell blocks like footer-links (5 columns in one row), the 5 column `<div>`s are children of the single row `<div>`.

## Pitfalls
- `.section.{block}-container` is on the **section**, not the block — confusing naming
- Section metadata disappears from DOM after decoration — only its classes remain
- Never add `{block}-wrapper` or `{block}-container` classes in JS — reserved by EDS
- EDS wraps `<img>` in `<picture>` only when img is direct child of `<div>` — detect both: `el.querySelector('picture') || el.querySelector('img')`
- Making a section `display: flex` for side-by-side blocks: the `[class$="-wrapper"] + [class$="-wrapper"]` spacing rule will misalign — override `margin-top: 0` on wrappers in that section

See also: `css-specificity-eds` (why selectors don't apply), `vertical-spacing-system` (block spacing rules)
