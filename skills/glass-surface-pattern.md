---
When to load: Implementing the frosted glass/translucent frame effect used around images and videos on the Semrush site
Key insight: The glass effect combines a subtle gradient, backdrop blur, border-radius, padding, and a white semi-transparent border to create the "frosted frame" look.
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px; /* slightly smaller than parent */
  display: block;
}
```

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

- The white border (`rgb(255 255 255 / 60%)`) is essential — without it the glass effect is invisible on light backgrounds
- On dark backgrounds, reduce border opacity to 8%
- Inner content border-radius should be `padding - 4px` smaller than the frame's border-radius
- `backdrop-filter: blur()` requires a non-opaque background to be visible
