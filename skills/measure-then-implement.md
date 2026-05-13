# Measure Then Implement

## When to load
Need to match an original site's dimensions, spacing, colors, or animations precisely.

## Key insight
Pixel-match requires measuring the original programmatically, not eyeballing. Measure at the target viewport width. For hover/transition states, inspect stylesheet rules (you can't trigger `:hover` via JS).

## Code patterns

**Dimensions & spacing:**
```js
const el = document.querySelector('.target');
const rect = el.getBoundingClientRect(); // width, height
const style = window.getComputedStyle(el); // padding, margin, border, etc.
// Gap between siblings:
const gap = sibling2.getBoundingClientRect().left - sibling1.getBoundingClientRect().right;
```

**Hover colors (from stylesheets):**
```js
for (const sheet of document.styleSheets) {
  try {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText?.includes(':hover')) {
        // rule.style.backgroundColor, rule.style.color, etc.
      }
    }
  } catch (e) { /* cross-origin */ }
}
```

**CSS variables:**
```js
// Find :root rules in stylesheets and read custom properties
```

## Workflow
1. Measure on original at 1440px → implement
2. Measure on original at 768px and 375px → add breakpoint overrides
3. Measure on our page → verify values match
4. If SVG images: check `naturalWidth`/`naturalHeight` — the visual content may be much smaller than the SVG canvas

## Pitfalls
- Animation `duration: 0s` in computed style usually means JS-controlled — implement with CSS transitions instead
- `gap` in CSS vs measured gap: flex gap applies between ALL flex items including anonymous text nodes
