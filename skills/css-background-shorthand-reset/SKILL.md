---
name: css-background-shorthand-reset
description: The `background` shorthand resets every background sub-property you omit — most dangerously background-size back to `auto`. Use when consolidating separate background-* declarations into one shorthand, or when a background image that was scaled suddenly renders at native size.
---
The `background` shorthand resets every sub-property it doesn't name. Folding `background-color/image/position/size/repeat` into one `background:` line silently sets `background-size: auto` — a tile that was scaled to fit (e.g. `21px 100%`) reverts to native pixels and renders huge.

## Recipe
- Keep size in the shorthand with the `position / size` syntax: `background: <color> url(...) <pos> / <size> <repeat>;`
- Example (tile scaled to fill element height, tiled horizontally): `background: var(--token) url(...) 0 100% / 5px 100% repeat-x;`
- The size is `<width> <height>`: pick the width to control how coarse the horizontal tiling looks (NOT the tile's native px width — that's usually too coarse), and `100%` for the height to fill the element regardless of its height.
- After consolidating, verify the computed value, not the source: `getComputedStyle(el).backgroundSize` must NOT be `auto` if you intended scaling.

## Pitfalls
- Shorthand without `/ size` → `background-size: auto` → native-resolution tile, often a magnified sliver. The image looks "broken" or "too large".
- The `/` size must come immediately after position in the shorthand — `0 100% / 21px 100%`, not size before position.
- Don't add a separate `background-size:` line after the shorthand to "fix" it — fold it in, or a future shorthand edit reintroduces the bug.

See also: `measure-then-implement` (measure the original's rendered tile size before picking a value), `css-specificity-eds` (when the computed value still isn't what you set).
