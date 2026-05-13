---
name: regression-guard
description: How to prevent introducing new bugs while fixing existing ones. Load before any CSS or JS change that touches shared or global code (styles.css, block wrappers, section classes).
---

Every CSS edit on shared selectors risks affecting elements you didn't intend to change.

## Recipe
1. Before editing: identify all elements that share the selector you're about to change
2. Record their current key values (font-size, margin, padding, color, display)
3. Make the change
4. Check ALL identified elements — not just the one you were fixing
5. If any untouched element changed: undo, find a more specific selector, try again

## Common regression triggers
| What you change | What it can break |
|---|---|
| `h2` global styles | Every h2 on the page |
| `.section > div` | All section containers |
| `.button` / `.button-wrapper` | CTAs in every block |
| `styles.css` root tokens | Anything using that token |
| `main > .section` padding | All section spacing |
| Block wrapper CSS | Other blocks sharing wrapper pattern |

## Pitfalls
- Fixing one block's margin by editing the global section rule — breaks every section
- "It looks fine in the block I'm working on" — check ALL sections, not just the one
- Removing a CSS custom property — silently breaks all blocks that inherit it

See also: `verify-before-claiming` (always load after changes), `css-specificity-eds` (specificity debugging)
