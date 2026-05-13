---
name: eds-section-style-icons
description: Inject decorative icons or images into sections via CSS pseudo-elements bound to section style classes. Use when a section needs a visual element (icon, badge) that shouldn't be in authored content.
---

Use a `::before` or `::after` pseudo-element on the section's `.default-content-wrapper` to inject decorative visuals tied to a section style.

## Recipe
```css
.section.section-my-style > .default-content-wrapper::before {
  content: '';
  display: block;
  width: 136px;
  height: 136px;
  margin: 0 auto 32px;
  background: url('/icons/my-icon.svg') no-repeat center / contain;
}
```

Place the icon SVG in `/icons/`. The pseudo-element is purely decorative — no content authoring needed.

## Pitfalls
- Icons in `/icons/` are served locally by the dev server. Icons in `/content/images/` come from remote and may 404 locally.
- Use `::before` for icons above the heading, `::after` for below.
- Bind to the section style class (e.g., `.section-ai-visibility`) not the block class — keeps it reusable across blocks in that section.

See also: `eds-content-modeling` (section styles), `page-template-metadata` (page-level styling)
