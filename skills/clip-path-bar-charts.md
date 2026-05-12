---
When to load: Building horizontal bar charts with arrow/pyramid-shaped bars (like the AI Visibility Index)
Key insight: Use clip-path: polygon() to create the arrow/pyramid shape, and calculate widths proportionally from data values.
---

## Recipe

```css
.bar-fill {
  height: 10px;
  background: var(--bar-color);
  clip-path: polygon(0 0, 100% 50%, 0 100%); /* triangle pointing right */
  transition: width 0.3s ease;
}
```

## Proportional width calculation in JS

```js
const maxValue = Math.max(...items.map(d => parseFloat(d.value) || 0));

items.forEach(({ value }) => {
  const pct = maxValue > 0 ? Math.round((parseFloat(value) / maxValue) * 100) : 0;
  barFill.style.width = `${pct}%`;
});
```

This makes the largest value 100% width and all others proportional.

## Content format

The content can optionally include an explicit percentage:
```
Google | 7.9
Samsung | 7.4
```

When no pipe separator exists, calculate from the numeric value:
```js
const [value, barPct] = valueStr.split('|');
const pct = barPct || Math.round((parseFloat(value) / maxValue) * 100);
```

## Pitfalls

- `clip-path: polygon(0 0, 100% 50%, 0 100%)` creates a right-pointing triangle (not an arrow with a body)
- For an arrow shape with a body, use: `polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)`
- The original Semrush site uses the simple triangle (`0 0, 100% 50%, 0 100%`)
- Bar container (`bar-track`) should have `flex: 1` to fill available width
