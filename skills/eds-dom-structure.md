# EDS Section & Block DOM Structure

## When to load
Selector doesn't match, block spacing broken, or need to understand where EDS puts things in the DOM.

## Key insight
Blocks are NOT children of the section's inner `<div>`. They're **siblings** at the section level, each in their own `-wrapper > -container > .block` chain.

## DOM tree
```
main > .section.{block}-container     ← section gets block name as class
  ├── .default-content-wrapper        ← h1, p, links (default content)
  │     └── (h1, p, a, etc.)
  ├── .{block}-wrapper                ← full-width shell
  │     └── .{block}-container        ← max-width constraint (same name, different element)
  │           └── .{block}.block      ← the actual block element passed to decorate()
  ├── .{block2}-wrapper
  │     └── ...
  └── .section-metadata               ← consumed at build time → classes on .section
```

## Selector cheat sheet
| Target | Selector |
|--------|----------|
| Section inner content | `main > .section > .default-content-wrapper` |
| Block wrapper | `main > .section > .{block}-wrapper` |
| Any wrapper after another | `main > .section > [class$="-wrapper"] + [class$="-wrapper"]` |
| Full-bleed override | `.section.{block}-container { padding: 0 }` |
| Block root in decorate() | `block` argument (already the `.block` element) |

## Pitfalls
- `main > .section > div` only matches `.default-content-wrapper` — not block wrappers
- `.section.{block}-container` is on the **section**, not the block — confusing naming
- Section metadata disappears from DOM after decoration — only its classes remain
- If you make a section `display: flex` for side-by-side blocks, the block spacing rule (`[class$="-wrapper"] + [class$="-wrapper"] { margin-top }`) will misalign them — override with `margin-top: 0 !important` on the wrappers in that section
- Never add `{block}-wrapper` or `{block}-container` classes in JS — those names are reserved by EDS
- Full-width blocks need `.{block}-wrapper { max-width: 100% !important; padding: 0 !important }` — the only legitimate `!important` in this project
- EDS wraps `<img>` in `<picture>` ONLY when the img is a direct child of a `<div>` — images inside `<p>` stay as bare `<img>`. Always detect both: `el.querySelector('picture') || el.querySelector('img')`
