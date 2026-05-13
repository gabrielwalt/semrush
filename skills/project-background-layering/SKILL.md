---
name: project-background-layering
description: Background layering for page gradients and patterns. Use when gradient isn't showing through blocks or background appears wrong.
---

Use ONE background declaration on `main` with multiple layers. All blocks/sections must be `background: transparent` for the gradient to show through.

## Recipe
```css
main {
  background: linear-gradient(...) top / 100% 2814px no-repeat;
}
main:has(.page-specific-block) {
  background:
    url('pattern.svg') Xpx Ypos / auto repeat-x,
    linear-gradient(...) top / 100% 2814px no-repeat;
}
```

## Transparency checklist
Must be `background: transparent`: header `.nav-wrapper`, marquee, any section without its own branded background.

## Pitfalls
- `background-size` must be explicit per layer — `auto` for pattern, `100% Npx` for gradient
- Branded blocks intentionally have opaque backgrounds — don't make transparent
