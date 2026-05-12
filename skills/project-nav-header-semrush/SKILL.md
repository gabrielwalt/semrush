---
name: project-nav-header-semrush
description: Semrush-specific nav header background toggle and brand styling. Tinted background switches to white on dropdown open.
---

Toggle `.nav-open` on BOTH the wrapper and the header element.

## Recipe
```css
@media (width >= 1024px) {
  header .nav-wrapper { background-color: rgb(220 238 235); transition: background-color 0.2s; }
  header.nav-open, header .nav-wrapper.nav-open { background-color: #fff; }
}
```

## Specifics
- Enterprise arrow: `li:last-child a::after` — only works if Enterprise is last in content
- Nav CTA gap: `" | "` text node is an anonymous flex item — use `gap: 6px`

## Pitfalls
- Use the `nav-header-eds` skill for generic EDS nav patterns
