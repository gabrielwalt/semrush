---
name: video-in-eds
description: Video playback in EDS blocks. Use when implementing video, since EDS rewrites external media URLs in link hrefs.
---

EDS rewrites media URLs — the href becomes a local path without extension, but the link **textContent** preserves the original URL.

## Recipe
```js
cell.querySelectorAll('a').forEach((link) => {
  const text = link.textContent.trim();
  const match = text.match(/\.(mp4|webm|ogg)(\?|$)/);
  if (match) sources.push({ src: text, type: `video/${match[1]}` });
});
```

Build `<video>` with `playsinline`, `muted`, `loop`, `autoplay`. Use `poster` attribute. Defer to `window.load`. Respect `prefers-reduced-motion`.

## Pitfalls
- Never rely on `href` alone — always check link text as fallback
- AEM CLI dev server fetches from remote — local `.plain.html` edits won't affect the served page
- Headless browsers block autoplay — `video.paused === true` in tests is expected
