---
name: project-glass-surface-pattern
description: Frosted glass/translucent frame effect for images and videos. Combines gradient, backdrop blur, border-radius, and semi-transparent border.
---

## Recipe
```css
.glass-frame {
  background: linear-gradient(91deg, rgb(5 5 5 / 4%) 11.45%, rgb(255 255 255 / 4%) 88.55%);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  padding: 12px;
  border: 1px solid rgb(255 255 255 / 60%);
}
.glass-frame img,
.glass-frame video {
  width: 100%; height: 100%; object-fit: cover;
  border-radius: 8px; display: block;
}
```

On dark backgrounds: `border: 1px solid rgb(255 255 255 / 8%); background: rgb(255 255 255 / 5%)`

## Variants

**Left-side only (promo cards video):**
```css
.promo-cards-media {
  border-radius: 12px 0 0 12px;
  border-right: none;
  padding: 12px 0 12px 12px;
}
```

**Enterprise (dark background):**
```css
.enterprise .glass-frame {
  background: rgb(255 255 255 / 5%);
  border: 1px solid rgb(255 255 255 / 8%);
}
```

## Where it's used
- Hero video frame
- Carousel slider poster images (small)
- Carousel slider expanded large image
- Promo cards video wrapper (left-rounded only)

## Pitfalls
- White border is essential — without it the glass effect is invisible on light backgrounds
- Inner border-radius should be `padding - 4px` smaller than the frame's
- `backdrop-filter: blur()` requires a non-opaque background to be visible
