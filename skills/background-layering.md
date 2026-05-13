# Background Layering

## When to load
Page gradient not showing through blocks, SVG pattern needed on specific pages, or background appears wrong color.

## Key insight
Use ONE background declaration on `main` with multiple layers. All blocks/sections must be `background: transparent` for the gradient to show through. Scope page-specific patterns with `:has()`.

## Recipe
```css
/* Base gradient for all pages */
main {
  background: linear-gradient(...) top / 100% 2814px no-repeat;
}

/* Homepage-only pattern overlay */
main:has(.insights-widget) {
  background:
    url('pattern.svg') Xpx Ypos / auto repeat-x,  /* layer 1: pattern */
    linear-gradient(...) top / 100% 2814px no-repeat;  /* layer 2: gradient */
}
```

## Breakpoint positions (pattern SVG)
| Viewport | Position |
|----------|----------|
| ≥1440px | `2px calc(50% - 20px)` |
| 1024–1439px | `2px calc(50% - 100px)` |
| 768–1023px | `2px calc(50% + 100px)` |
| <768px | `-2px 100%` |

## Transparency checklist
These must be `background: transparent` (not white, not colored):
- Header `.nav-wrapper`
- Marquee `.marquee`
- Any section without its own branded background

## Pitfalls
- `background-size` must be explicit per layer — `auto` for the pattern, `100% Npx` for the gradient
- Promo cards intentionally have opaque backgrounds (they're branded) — don't make them transparent
