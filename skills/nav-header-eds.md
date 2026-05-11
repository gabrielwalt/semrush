# Nav/Header in EDS

## When to load
Header layout broken, nav items invisible or unstyled, chevrons missing, mega menu not opening, or mobile/desktop state conflict.

## Key insight
The nav uses `aria-expanded` to toggle mobile/desktop state. On desktop the attribute is `'true'` (set by `toggleMenu` on init). This means mobile-state CSS (`nav[aria-expanded='true'] .nav-sections { display: block }`) applies even on desktop unless you explicitly override it with the same specificity in your desktop media query.

## Quick fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Nav items invisible on desktop | Mobile `display: block` beats desktop `display: flex` | Add `nav[aria-expanded='true']` to desktop selector |
| Chevrons below text instead of inline | `li` is block-level | Set `display: inline-flex; align-items: center` on `.nav-item` |
| Enterprise arrow not showing | `li > a::after` doesn't match because `a` is inside `<p>` | Use `li:last-child a::after` (no `>` before `a`) |
| Nav CTA gap too wide | `" | "` text node between links is an anonymous flex item | Set `gap: 6px` so `6 + textNode(0px) + 6 = 12px` |
| Mega menu snaps instead of animating | Using `display: none/flex` toggle | Use `visibility + opacity + transform` with `transition` |

## Mega menu animation pattern
```css
.nav-mega-panel {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s;
  display: flex; /* always flex, never toggle display */
  border-radius: 0 0 12px 12px;
}
.nav-item[aria-expanded='true'] > .nav-mega-panel {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

## Pitfalls
- Nav fragment loads as 3 sections: brand (index 0), sections (index 1), tools (index 2) — if content changes order, classes map wrong
- `buildNavFromHeadings()` reads H2s — adding non-nav H2s to the fragment breaks the menu
