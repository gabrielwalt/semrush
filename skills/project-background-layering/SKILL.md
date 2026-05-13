---
name: project-background-layering
description: Background layering for page gradients and patterns. Use when gradient isn't showing through blocks or background appears wrong.
---

Use ONE background declaration on `main` with multiple layers. All blocks/sections must be `background: transparent` for the gradient to show through. Scope page-specific patterns to the body template class, NOT via `:has()`.

## Recipe
```css
/* Global gradient on all pages */
main {
  background: linear-gradient(rgb(220 238 235) 0%, rgb(232 225 255) 75%, rgb(255 255 255) 100%)
    top / 100% 2814px no-repeat;
}

/* Homepage-only pattern overlay — use body template class, not :has() */
body.homepage main {
  background:
    url('/icons/pattern-hero.svg') 2px calc(50% + 100px) / auto repeat-x,
    linear-gradient(rgb(220 238 235) 0%, rgb(232 225 255) 75%, rgb(255 255 255) 100%)
      top / 100% 2814px no-repeat;
}
```

See `PROJECT-DESIGN.md` for gradient spec and breakpoint positions for the pattern.

## Transparency checklist
Must be `background: transparent`: header `.nav-wrapper`, marquee, any section without its own branded background.

## Pitfalls
- **Never use `:has()` for page-scoping** — use `body.{template-class} main` instead. Requirements explicitly prohibit `:has()` for this purpose; the template metadata class exists exactly for this.
- `background-size` must be explicit per layer — `auto` for pattern, `100% Npx` for gradient
- Branded blocks (video-card, cards) intentionally have opaque backgrounds — don't make transparent

See also: `page-template-metadata` (how body template classes are applied)
