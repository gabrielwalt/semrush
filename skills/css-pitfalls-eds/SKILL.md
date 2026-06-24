---
name: css-pitfalls-eds
description: Common EDS CSS gotchas with fixes. Load when: fixing a stylelint no-descending-specificity error; consolidating background-* into one shorthand and a background image suddenly renders at native size.
---

## Descending specificity (stylelint no-descending-specificity)

Fix by reordering or merging properties into base selectors.

### Recipe
**Problem:** base selector after compound selector
```css
.card-expanded .desc { opacity: 1; }   /* high specificity first */
.desc { opacity: 0; transition: ...; } /* lower after — ERROR */
```
**Fix:** put base first, override after
```css
.desc { opacity: 0; transition: ...; }           /* base first */
.card-expanded .desc { opacity: 1; }             /* override after — OK */
```

**Problem:** second `.cta` rule after `.cta:hover`
**Fix:** merge all base properties into the first `.cta` block — don't create a second one

**Problem:** a NEW scoped rule you just added (e.g. `body.template-A main .section.foo .default-content-wrapper`) trips the error on PRE-EXISTING, lower-specificity rules later in the file that end in the same element (`body.template-B main .x > .default-content-wrapper`). The two scopes are mutually exclusive (different templates) so they never actually collide — but the linter only sees the shared trailing element. Reordering is unnatural here (you'd scatter one feature's rules across the file).
**Fix:** LOWER your new rule's specificity so it no longer outranks the later ones. Often you can drop the trailing shared class and rely on inheritance — e.g. set `text-align: center` on `.section.foo` (inherits down to the default-content) instead of targeting `…foo .default-content-wrapper`. Same visual result, no descending-specificity conflict.

### Pitfalls
- The rule checks if a selector COULD target the same element, not if it actually does — so unrelated template scopes that share a trailing class (`.default-content-wrapper`, `.button`) still conflict
- `!important` doesn't fix it — the rule checks selector specificity, not cascade
- Moving rules into `@media` blocks doesn't help
- Prefer lowering specificity (inheritance) over a `stylelint-disable` wrap — the disable silences the rule but leaves the real cascade fragility

---

## Background shorthand resets background-size

The `background` shorthand resets every sub-property it doesn't name. Folding `background-color/image/position/size/repeat` into one `background:` line silently sets `background-size: auto` — a tile that was scaled to fit (e.g. `21px 100%`) reverts to native pixels and renders huge.

### Recipe
- Keep size in the shorthand with the `position / size` syntax: `background: <color> url(...) <pos> / <size> <repeat>;`
- Example (tile scaled to fill element height, tiled horizontally): `background: var(--token) url(...) 0 100% / 5px 100% repeat-x;`
- The size is `<width> <height>`: pick the width to control how coarse the horizontal tiling looks (NOT the tile's native px width — that's usually too coarse), and `100%` for the height to fill the element regardless of its height.
- After consolidating, verify the computed value, not the source: `getComputedStyle(el).backgroundSize` must NOT be `auto` if you intended scaling.

### Pitfalls
- Shorthand without `/ size` → `background-size: auto` → native-resolution tile, often a magnified sliver. The image looks "broken" or "too large".
- The `/` size must come immediately after position in the shorthand — `0 100% / 21px 100%`, not size before position.
- Don't add a separate `background-size:` line after the shorthand to "fix" it — fold it in, or a future shorthand edit reintroduces the bug.

---

See also: `measure-then-implement` (measure the original's rendered tile size before picking a value), `css-specificity-eds` (when the computed value still isn't what you set)
