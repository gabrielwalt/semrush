---
When to load: Implementing video playback in any EDS block
Key insight: EDS rewrites external media URLs — the href becomes a local path without extension, but the link TEXT preserves the original URL
---

## Recipe

1. EDS import creates `<a href="/path-without-ext">https://original.com/video.mp4</a>`
2. The href won't match `a[href$=".mp4"]` — it's been rewritten
3. Instead, check the link's **textContent** for video extensions:

```js
cell.querySelectorAll('a').forEach((link) => {
  const text = link.textContent.trim();
  const match = text.match(/\.(mp4|webm|ogg)(\?|$)/);
  if (match) {
    sources.push({ src: text, type: `video/${match[1]}` });
  }
});
```

4. Build `<video>` with `playsinline`, `muted`, `loop`, `autoplay`
5. Use `poster` attribute with a fallback image for instant visual
6. Defer video creation to `window.load` for performance
7. Respect `prefers-reduced-motion`

## Pitfalls

- Never rely on `href` alone — always check link text as fallback
- The AEM CLI dev server fetches content HTML from remote — local `.plain.html` edits to content won't affect the served page shell
- Headless browsers block autoplay — `video.paused === true` in tests is expected
