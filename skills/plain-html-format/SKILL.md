---
name: plain-html-format
description: EDS .plain.html section format. Use when creating or editing .plain.html content files, sections aren't rendering, or blocks are unstyled.
---

Each section must be a top-level `<div>` wrapper. AEM CLI splits `<main>` by these top-level divs. No `<hr>` separators.

## Correct format
```html
<div><!-- section 1 -->
  <div class="block-a"><div><div>...</div></div></div>
</div>
<div><!-- section 2 -->
  <h1>Title</h1>
  <p>Subtitle</p>
  <div class="block-b"><div><div>...</div></div></div>
  <div class="section-metadata"><div><div>Style</div><div>centered</div></div></div>
</div>
```

Block table: `<div class="block-name"><div><div>cell</div></div></div>`. Variant: `class="block-name variant"`.

## Limitations
- `<video>` not supported in DA — use link + poster `<picture>`. Block JS builds the player.
- SVGs stripped by `html2md` — inject manually or use external URLs.

## Pitfalls
- NO outer wrapper div — each section div is a direct child of `<main>`
- `section-metadata` must be LAST inside its section div
- Re-import flattens sections — maintain structure by hand after initial import
- `localhost:3000/` serves from remote; only `localhost:3000/path.plain.html` serves local
