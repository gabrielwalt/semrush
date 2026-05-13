---
name: nav-header-eds
description: EDS nav/header patterns. Use when header is broken, nav is invisible, mega menu won't animate, sticky isn't working, or mobile/desktop state conflicts.
---

Nav uses `aria-expanded='true'` on desktop (set by `toggleMenu` on init). Mobile CSS (`nav[aria-expanded='true'] .nav-sections { display: block }`) applies on desktop too unless you match that specificity in media queries.

## Quick fixes
| Symptom | Cause | Fix |
|---------|-------|-----|
| Nav items invisible on desktop | Mobile `display: block` beats desktop `display: flex` | Add `nav[aria-expanded='true']` to desktop selector |
| Chevrons below text instead of inline | `li` is block-level | `display: inline-flex; align-items: center` on `.nav-item` |
| Enterprise arrow not showing | `li > a::after` — `a` is inside `<p>` | Use `li:last-child a::after` (no `>` before `a`) |
| Mega menu snaps instead of animating | Using `display: none/flex` toggle | Use `visibility + opacity + transform` with `transition` |
| Header not sticky | `position: sticky` broken by `overflow: hidden` ancestor | Use `position: fixed` with `top: var(--nav-top-offset, 0)` |
| Fixed header covers announcement bar | Announcement bar height varies | JS scroll listener: set `--nav-top-offset` to `Math.max(0, announcementRect.bottom)` |
| Gradient shows through header when dropdown opens | Only one element gets white bg | Toggle `.nav-open` on BOTH `.nav-wrapper` AND `header` element |
| Transparent bg needed on desktop | Opaque bg prevents gradient from showing through | Use `background: transparent` on desktop, `#fff` when `.nav-open` |

## Sticky header with announcement bar
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
header .nav-wrapper { position: fixed; top: var(--nav-top-offset, 0); left: 0; right: 0; z-index: 100; }
header { height: var(--nav-height); } /* reserves flow space */
```

## Transparent desktop background with open state
```css
@media (width >= 1024px) {
  header .nav-wrapper { background-color: transparent; transition: background-color 0.2s ease-in-out; }
  /* Both selectors required — missing one causes gradient bleed through */
  header.nav-open .nav-wrapper,
  header .nav-wrapper.nav-open { background-color: #fff; }
}
```

## Mega menu animation
```css
.nav-mega-panel {
  opacity: 0; visibility: hidden; transform: translateY(-8px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s;
  display: flex;
  border-radius: 0 0 12px 12px;
  overflow: hidden; /* prevents promo image overflow */
}
.nav-item[aria-expanded='true'] > .nav-mega-panel {
  opacity: 1; visibility: visible; transform: translateY(0);
}
```

## Pitfalls
- Nav fragment loads as 3 sections: brand (0), sections (1), tools (2) — if content changes order, classes map wrong
- `buildNavFromHeadings()` reads H2s — adding non-nav H2s to the fragment breaks the menu
- `position: sticky` silently fails if ANY ancestor has `overflow: hidden` — use `fixed` instead
- Pages without announcement bar need `--nav-top-offset` to default to `0` (CSS fallback handles this)
- Mobile: `closeOnFocusLost` fires with `e.relatedTarget === null` on tap — `nav.contains(null)` returns false, incorrectly closing menu. Fix: `if (!isDesktop.matches) return;` at top of `closeOnFocusLost`

See also: `project-mega-menu-content-model` (nav content structure), `mobile-nav-click-handling` (click delegation)
