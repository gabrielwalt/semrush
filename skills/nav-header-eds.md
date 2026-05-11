# Nav/Header in EDS

## When to load
Header layout broken, nav items invisible or unstyled, chevrons missing, mega menu not opening, sticky not working, or mobile/desktop state conflict.

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
| Header not sticky | `position: sticky` broken by `overflow: hidden` on body/html | Use `position: fixed` on `.nav-wrapper` with `top: var(--nav-top-offset, 0)` |
| Announcement bar hidden behind fixed header | Fixed header covers announcement | JS scroll listener: set `--nav-top-offset` to `Math.max(0, announcementRect.bottom)` |
| Header bg shows gradient through when dropdown open | Only wrapper gets white bg | Toggle `.nav-open` on BOTH `.nav-wrapper` AND `header` element |

## Sticky header with announcement bar pattern
```js
// In header decorate():
const announcement = document.querySelector('.announcement-bar-container');
if (announcement) {
  const updateNavOffset = () => {
    const { bottom } = announcement.getBoundingClientRect();
    navWrapper.style.setProperty('--nav-top-offset', `${Math.max(0, bottom)}px`);
  };
  updateNavOffset();
  window.addEventListener('scroll', updateNavOffset, { passive: true });
}
```
```css
header .nav-wrapper {
  position: fixed;
  top: var(--nav-top-offset, 0);
  left: 0; right: 0; z-index: 100;
}
header { height: 84px; } /* reserves flow space */
```

## Mega menu animation pattern
```css
.nav-mega-panel {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s;
  display: flex;
  border-radius: 0 0 24px 24px;
}
.nav-item[aria-expanded='true'] > .nav-mega-panel {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

## Header bg state toggle
```css
@media (width >= 1024px) {
  header .nav-wrapper { background-color: rgb(220 238 235); transition: background-color 0.2s; }
  header.nav-open, header .nav-wrapper.nav-open { background-color: #fff; }
}
```
JS toggles `.nav-open` on both wrapper and header when dropdown opens/closes.

## Pitfalls
- Nav fragment loads as 3 sections: brand (index 0), sections (index 1), tools (index 2) — if content changes order, classes map wrong
- `buildNavFromHeadings()` reads H2s — adding non-nav H2s to the fragment breaks the menu
- `position: sticky` silently fails if ANY ancestor has `overflow: hidden` — use `fixed` instead
- Pages without announcement bar need `--nav-top-offset` to default to `0` (CSS fallback value handles this)
