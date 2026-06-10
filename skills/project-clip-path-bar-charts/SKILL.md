---
name: project-clip-path-bar-charts
description: Build horizontal bar charts with arrow/pyramid-shaped bars via clip-path polygon, widths calculated proportionally from data values. Use when implementing a ranked bar chart with angled/triangular bar ends (e.g. the AI Visibility Index).
---

## Recipe
```css
.bar-fill {
  height: 10px;
  background: var(--bar-color);
  clip-path: polygon(0 0, 100% 50%, 0 100%); /* right-pointing triangle */
  transition: width 0.3s ease;
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

## Content format
Cells can optionally include an explicit percentage after a pipe:
```
Google | 7.9
Samsung | 7.4
```

In JS, use the explicit percentage if present, otherwise calculate from the value:
```js
const [value, barPct] = valueStr.split('|').map(s => s.trim());
const pct = barPct ? parseFloat(barPct) : Math.round((parseFloat(value) / maxValue) * 100);
```

## Pitfalls
- Simple triangle `polygon(0 0, 100% 50%, 0 100%)` has no body, just a point — original site uses this form
- Bar container (`bar-track`) should have `flex: 1` to fill available width
- `clip-path` clips the element box, not the background — ensure the container has no overflow
