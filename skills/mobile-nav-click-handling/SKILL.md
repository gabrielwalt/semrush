---
name: mobile-nav-click-handling
description: Mobile nav click delegation issues. Use when mobile nav closes when clicking sub-items inside expanded panels.
---

Click handlers on nav items must guard against the entire panel container, not just links.

## Recipe — click delegation
```js
li.addEventListener('click', (e) => {
  if (e.target.closest('.nav-mega-panel')) return; // let ALL panel clicks pass
  if (!isDesktop.matches && li.classList.contains('nav-drop')) {
    e.preventDefault();
    li.classList.toggle('nav-mobile-expanded');
  }
});
```

## Recipe — closeOnFocusLost mobile bug
`focusout` fires with `e.relatedTarget === null` on mobile taps. `nav.contains(null)` returns `false`, incorrectly triggering menu close before navigation.

```js
function closeOnFocusLost(e) {
  if (!isDesktop.matches) return; // null relatedTarget on mobile taps
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) toggleMenu(nav, navSections, false);
}
```

## Pitfalls
- `e.target.closest('.panel a')` only protects links — headings, text, list items still bubble up and close the menu
- Applies to any accordion/dropdown where the toggle handler is on a parent element
- Without the `isDesktop` early return, tapping a link on mobile closes the menu before navigation occurs

See also: `nav-header-eds` (full header patterns including transparent bg and sticky)
