---
When to load: Building any horizontal scrolling carousel (solutions, resources, etc.) that extends to the viewport edge
Key insight: Carousels use left-only padding on the block, right-edge bleed via overflow scroll, and the wrapper escapes the global max-width container.
---

## Recipe

1. **Wrapper escapes container:**
```css
.carousel-wrapper {
  max-width: 100% !important;
  padding: 0 !important;
}
```

2. **Block has left padding only:**
```css
.carousel {
  padding: 0 0 0 var(--container-padding);
}
```

3. **Track scrolls horizontally:**
```css
.carousel-track {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-right: var(--container-padding); /* end padding for last card */
}
```

4. **Cards are fixed width:**
```css
.carousel-card {
  flex-shrink: 0;
  width: 430px;
  scroll-snap-align: start;
}
```

5. **Navigation buttons** sit top-right with `padding-right: var(--container-padding)` to align with the content area.

## Section header pattern

The original Semrush site uses this for carousel sections:
- Small label text (14-16px): "Solutions", "Resources ( 7 )"
- Large heading (48px): "Get seen. Get cited. Be the answer."
- Nav arrows (48px round buttons) aligned to the right

## Expand/collapse pattern (Solutions carousel)

- Collapsed: `width: 430px`, shows eyebrow + title + small poster image + "+" button
- Expanded: `width: 798px`, hides poster, shows large image on right (overflow hidden at card edge) + description + CTA with fade-in
- Only one card expanded at a time
- "+" button rotates 45° to become "×"

## Pitfalls

- Use `scroll-snap-type: x mandatory` for snapping but allow free scroll
- Don't use `overflow: hidden` on the block — it prevents scrolling. Use `overflow: visible` or let the track handle it
- Background patterns should use `background-position: bottom right` to anchor to card bottom
- The track's `padding-right` provides spacing after the last card — without it, the last card touches the viewport edge with no breathing room
