---
name: nav-header-eds
description: EDS nav/header patterns. Use when header is broken, nav is invisible, mega menu won't animate, sticky isn't working, or mobile/desktop state conflicts.
---

Nav uses `aria-expanded='true'` on desktop (set by `toggleMenu` on init). Mobile CSS applies on desktop too unless you match that specificity in media queries.

## Quick fixes
| Symptom | Fix |
|---------|-----|
| Nav items invisible on desktop | Add `nav[aria-expanded='true']` to desktop selector |
| Mega menu snaps instead of animating | Use `visibility + opacity + transform`, not `display: none/flex` |
| Header not sticky | `position: sticky` fails with `overflow: hidden` ancestor — use `fixed` |
| Announcement bar hidden behind fixed header | JS scroll listener: set `--nav-top-offset` to `Math.max(0, announcementRect.bottom)` |

## Mega menu animation
```css
.nav-mega-panel {
  opacity: 0; visibility: hidden; transform: translateY(-8px);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s;
  display: flex;
}
.nav-item[aria-expanded='true'] > .nav-mega-panel {
  opacity: 1; visibility: visible; transform: translateY(0);
}
```

## Pitfalls
- Nav fragment loads as 3 sections: brand (0), sections (1), tools (2) — order matters
- `position: sticky` silently fails if ANY ancestor has `overflow: hidden`
