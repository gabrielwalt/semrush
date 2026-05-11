# Import Script Bundling

## When to load
Import script not executing; `CustomImportScript.default not found`; blocks not being parsed during import.

## Key insight
Import scripts must use ES module `export default` syntax. The bundler (esbuild via aem-import-helper) wraps it as an IIFE that exposes `window.CustomImportScript.default`. Old-style IIFE scripts that assign `window.CustomImportScript` directly produce `undefined` because esbuild's outer wrapper captures the return value (which is nothing).

## Correct script format
```js
/* eslint-disable */
/* global WebImporter */

function myParser(element, { document }) { /* ... */ }

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;
    // cleanup, parse, return
    return [{ element: main, path, report }];
  },
};
```

## Bundle command
```bash
/home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/aem-import-bundle.sh \
  --importjs tools/importer/import-homepage.js
```

## Run command
```bash
node /home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/run-bulk-import.js \
  --import-script tools/importer/import-homepage.bundle.js \
  --urls tools/importer/urls-homepage.txt
```

## Pitfalls
- NEVER assign `window.CustomImportScript = {...}` inside an IIFE — esbuild wraps it and the assignment is lost
- Always use `export default { transform }` — esbuild's `--global-name=CustomImportScript` handles the rest
- The `.bundle.js` file is what gets passed to `run-bulk-import.js`, NOT the source `.js`
- SVG images are stripped by the `html2md` pipeline — marquee logos or icon-only blocks must be injected post-import
- The `run-bulk-import.js` expects `window.CustomImportScript.default.transform` — if missing, import silently fails
