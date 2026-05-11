# PROJECT-IMPORT.md — Import Infrastructure

Import pipeline status, architecture decisions, and operational commands.  
For parser/transformer implementation details, read the files in `tools/importer/` directly.  
**Update when scripts, parsers, transformers, or the URL list change.**

---

## Current State

**No import scripts yet.** Content is hand-crafted in `drafts/` as `.plain.html` files.

When bulk import is set up, `tools/importer/` will contain:
- `import.js` — single universal script (all pages, no template branching)
- `import.bundle.js` — compiled output (never edit directly)
- `urls.txt` — all page URLs
- `parsers/` — one file per block, selector-based detection
- `transformers/` — cleanup + section boundary scripts

---

## Draft Content

Draft pages live in `drafts/`. Start the dev server with `--html-folder drafts` to serve them at `localhost:3000`.

See `PROJECT-STATUS.md` for the list of which drafts exist.

---

## Import Architecture Principles

1. **One universal script for all pages.** No URL matching, no template branching, no page-type conditions.
2. **Parsers detect blocks by DOM selector, not by page context.** Each parser is self-contained: it receives a matched element and returns a block table.
3. **More specific selectors first** in the registry, to prevent false matches.
4. **Section boundaries in `beforeTransform`.** The sections transformer must run before parsers, because parsers replace the wrapper elements used for boundary detection. Running it in `afterTransform` will silently fail.
5. **Handle missing content gracefully.** If a parser's selector finds no match, it does nothing — never throw.

---

## Commands

### Bundle (run after any change to import scripts)

```bash
npx esbuild tools/importer/import.js \
  --bundle --format=iife --global-name=CustomImportScript \
  --platform=browser --outfile=tools/importer/import.bundle.js
```

**⚠️ The `--format=iife --global-name=CustomImportScript` flags are mandatory.** ESM format silently fails because the bulk importer reads `window.CustomImportScript`. Never change these flags.

### Run bulk import

```bash
node /home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/run-bulk-import.js \
  --import-script tools/importer/import.bundle.js \
  --urls tools/importer/urls.txt
```

### Single page

```bash
echo "https://www.semrush.com/page-path/index.html" > /tmp/url.txt
node /home/node/.excat-marketplace/excat/skills/excat-content-import/scripts/run-bulk-import.js \
  --import-script tools/importer/import.bundle.js --urls /tmp/url.txt
```

**URL rule:** Always include an explicit file path (`/index.html`, `/about.html`). Bare trailing-slash URLs fail with a `cwd is not a function` error.

---

## Adding a New Page

1. Analyze the page DOM at the source URL
2. Reuse existing parsers where selectors match
3. Write new parsers only for genuinely new block patterns
4. Register new parsers in `import.js`
5. Re-bundle, then test against the new page AND all existing pages
6. Update `PROJECT-BLOCKS.md` for any new blocks, `PROJECT-STATUS.md` for the new page

---

## Nav and Footer

Nav and footer are site-wide fragments — they need separate import scripts (`import-nav.js`, `import-footer.js`), bundled and run the same way as the main script.
