---
name: mobile-nav-click-handling
description: Mobile nav click delegation issues. Use when mobile nav closes when clicking sub-items inside expanded panels.
---

Click handlers on nav items must guard against the entire panel container, not just links.

## Recipe
```js
li.addEventListener('click', (e) => {
  if (e.target.closest('.nav-mega-panel')) return; // let ALL panel clicks pass
  if (!isDesktop.matches && li.classList.contains('nav-drop')) {
    e.preventDefault();
    li.classList.toggle('nav-mobile-expanded');
  }
});
```

## Pitfalls
- `e.target.closest('.panel a')` only protects links — headings, text, list items still bubble up
- This applies to any accordion/dropdown where the toggle handler is on a parent element
