---
When to load: Building or debugging mobile navigation with expandable/collapsible sections
Key insight: Click handlers on nav items must not intercept clicks from within expanded sub-panels. Check e.target.closest('.panel-class') and return early for ANY click inside the panel, not just link clicks.
---

## Recipe

```js
li.addEventListener('click', (e) => {
  // Let ALL clicks inside the panel pass through
  if (e.target.closest('.nav-mega-panel')) return;

  // Only toggle expand/collapse if click is on the item header itself
  if (!isDesktop.matches && li.classList.contains('nav-drop')) {
    e.preventDefault();
    li.classList.toggle('nav-mobile-expanded');
  }
});
```

## Pitfalls

- `if (e.target.closest('.panel a')) return` only protects link clicks — non-link sub-items (headings, text, list items) still bubble up and toggle the menu closed
- The fix is to guard against the entire panel container, not just its links
- This applies to any accordion/dropdown pattern where the toggle handler is on a parent element
