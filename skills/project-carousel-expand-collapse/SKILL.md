---
name: project-carousel-expand-collapse
description: Expand/collapse card behavior in carousels. Only one card expanded at a time with animated transitions.
---

## Behavior
- Collapsed: `width: 430px`, shows eyebrow + title + small poster + "+" button
- Expanded: `width: 798px`, hides poster, shows large image on right + description + CTA
- "+" button rotates 45° to become "×"
- Only one card expanded at a time — collapse others when expanding

## Pitfalls
- Use the `carousel-pattern-eds` skill for the generic horizontal scroll pattern
- Background patterns should use `background-position: bottom right` to anchor to card bottom
