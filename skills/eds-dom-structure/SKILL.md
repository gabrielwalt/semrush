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

## Pitfalls
- `.section.{block}-container` is on the **section**, not the block — confusing naming
- Section metadata disappears from DOM after decoration — only its classes remain
- Never add `{block}-wrapper` or `{block}-container` classes in JS — reserved by EDS
- EDS wraps `<img>` in `<picture>` only when img is direct child of `<div>` — detect both: `el.querySelector('picture') || el.querySelector('img')`
- Making a section `display: flex` for side-by-side blocks: the `[class$="-wrapper"] + [class$="-wrapper"]` spacing rule will misalign — override `margin-top: 0` on wrappers in that section

See also: `css-specificity-eds` (why selectors don't apply), `vertical-spacing-system` (block spacing rules)
