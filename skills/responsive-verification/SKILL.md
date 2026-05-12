---
name: responsive-verification
description: Responsive verification at all breakpoints. Use when checking a component across viewport widths or when the original site behaves differently at different sizes.
---

Verify at all project breakpoints (see `PROJECT-DESIGN.md` for widths). Measure on original first, then verify match.

## Workflow
```js
// Use breakpoints from PROJECT-DESIGN.md
await page.setViewportSize({ width: desktopWidth, height: 900 });
await page.goto(url);
const result = await page.evaluate(() => {
  const el = document.querySelector('.target');
  const s = window.getComputedStyle(el);
  return { width: el.getBoundingClientRect().width, padding: s.padding };
});
// Repeat at each project breakpoint
```

## Common EDS breakpoint pattern (mobile-first)
```css
.element { /* mobile styles */ }
@media (width >= tabletBreakpoint) { .element { /* tablet */ } }
@media (width >= desktopBreakpoint) { .element { /* desktop */ } }
```

Check `PROJECT-DESIGN.md` for the exact breakpoint values used in this project.

## Pitfalls
- Background SVG positions change per breakpoint — check each one
- Nav typically uses a different breakpoint than content for hamburger/full nav switch
