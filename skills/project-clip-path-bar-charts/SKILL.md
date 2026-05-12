---
name: project-clip-path-bar-charts
description: Horizontal bar charts with arrow/pyramid-shaped bars using clip-path polygon. Calculate widths proportionally from data values.
---

## Recipe
```css
.bar-fill {
  height: 10px;
  background: var(--bar-color);
  clip-path: polygon(0 0, 100% 50%, 0 100%); /* right-pointing triangle */
}
```
```js
const maxValue = Math.max(...items.map(d => parseFloat(d.value) || 0));
items.forEach(({ value }) => {
  const pct = maxValue > 0 ? Math.round((parseFloat(value) / maxValue) * 100) : 0;
  barFill.style.width = `${pct}%`;
});
```

For arrow with body: `polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)`

## Pitfalls
- Simple triangle: `polygon(0 0, 100% 50%, 0 100%)` — no body, just a point
- Bar container (`bar-track`) should have `flex: 1` to fill available width
