---
name: measure-then-implement
description: Pixel-matching an original site's dimensions, spacing, colors, or hover states. Measure programmatically before implementing.
---

Pixel-match requires measuring programmatically, not eyeballing. Hover colors come from stylesheet rules (can't trigger `:hover` via JS).

## Recipe
```js
// Dimensions & spacing
const rect = el.getBoundingClientRect();
const style = window.getComputedStyle(el);
const gap = sibling2.getBoundingClientRect().left - sibling1.getBoundingClientRect().right;

// Hover colors (from stylesheets)
for (const sheet of document.styleSheets) {
  try {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText?.includes(':hover')) { /* read rule.style */ }
    }
  } catch (e) { /* cross-origin */ }
}
```

**Workflow:** Measure at desktop breakpoint → implement → measure at each smaller breakpoint → add overrides → verify match. See `PROJECT-DESIGN.md` for project breakpoints.

## Pitfalls
- `duration: 0s` in computed style usually means JS-controlled — use CSS transitions instead
- SVG `naturalWidth`/`naturalHeight` may be much larger than visual content
