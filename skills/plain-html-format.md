# .plain.html Section Format

## When to load
Creating or editing `.plain.html` content files; sections not rendering; blocks unstyled; section-metadata not applying.

## Key insight
Each section must be a top-level `<div>` wrapper. The AEM CLI and EDS framework split `<main>` by these top-level divs — each becomes a `.section`. Bare elements or `<hr>` at the top level will NOT create sections.

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
<div><!-- section 3 -->
  <div class="block-c"><div><div>...</div></div></div>
</div>
```

## Block table format inside sections
```html
<div class="block-name"><div><div>cell content</div></div></div>
```
Block name = folder name in `blocks/`. Variant: `class="block-name variant-name"`.

## Pitfalls
- NO outer wrapper div around all content — each section div is a direct child of `<main>`
- NO `<hr>` as section separator — the div-per-section IS the separator
- `section-metadata` must be the LAST element inside its section div
- Removing the wrapping divs makes all blocks unstyled (EDS can't find sections)
- The AEM import pipeline (`html2md` → `md2da`) produces this format automatically — only manual edits risk breaking it
