# Responsive Verification

## When to load
Checking a component works at all breakpoints; original site behaves differently at different widths; need to set viewport and measure.

## Key insight
Always verify at 4 viewports: 1440 (desktop), 1024 (small desktop/large tablet), 768 (tablet), 375 (mobile). Measure on the original first, then verify our implementation matches at each breakpoint.

## Workflow
```js
// 1. Set viewport
await page.setViewportSize({ width: 1440, height: 900 });

// 2. Navigate and measure
await page.goto(url);
const result = await page.evaluate(() => {
  const el = document.querySelector('.target');
  const s = window.getComputedStyle(el);
  return { width: el.getBoundingClientRect().width, padding: s.padding, ... };
});

// 3. Repeat at 1024, 768, 375
```

## Project breakpoints
| Name | Width | Key changes |
|------|-------|-------------|
| Desktop | ≥1440px | Full layout, max-width constrains |
| Small desktop | 1024–1439px | Nav visible, some spacing adjusts |
| Tablet | 768–1023px | Hamburger nav, stacked layouts |
| Mobile | <768px | Single column, smaller fonts, reduced spacing |

## CSS breakpoint pattern (mobile-first)
```css
.element { /* mobile styles */ }

@media (width >= 768px) { .element { /* tablet */ } }
@media (width >= 1024px) { .element { /* desktop */ } }
@media (width >= 1440px) { .element { /* large desktop */ } }
```

## Pitfalls
- Background SVG pattern position changes per breakpoint — check each one
- Nav uses `1024px` as the breakpoint between hamburger and full nav
- Fonts/spacing use `768px` for the mobile reduction (`--font-size-display: 56px` etc.)
- Some elements (marquee, hero-video) are full-bleed at all breakpoints — test edge behavior
