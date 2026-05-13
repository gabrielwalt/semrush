---
name: import-script-bundling
description: EDS import script bundling. Use when import script isn't executing, CustomImportScript.default is not found, or blocks aren't being parsed during import.
---

One import script per project. Add parsers to the existing registry — only create a second script for fundamentally incompatible DOM structures.

Must use `export default { transform }` — esbuild wraps it as IIFE exposing `window.CustomImportScript.default`. Old IIFE+window assignment pattern produces `undefined`.

## Correct format
```js
/* eslint-disable */
export default {
  transform: (payload) => {
    const { document, url } = payload;
    const main = document.body;
    return [{ element: main, path, report }];
  },
};
```

## Commands
```bash
# Bundle (replace <script> with your import script path)
/home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/aem-import-bundle.sh \
  --importjs tools/importer/<script>.js
# Run (replace <script> and <urls> with your files)
node /home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/run-bulk-import.js \
  --import-script tools/importer/<script>.bundle.js \
  --urls tools/importer/<urls>.txt
```

See `PROJECT-IMPORT.md` for the actual script and URL filenames used in this project.

## Pitfalls
- NEVER assign `window.CustomImportScript = {...}` in an IIFE
- Pass `.bundle.js` to `run-bulk-import.js`, NOT the source `.js`
- SVG images stripped by `html2md` pipeline — inject post-import
- Re-import flattens section boundaries — maintain section-div structure by hand
