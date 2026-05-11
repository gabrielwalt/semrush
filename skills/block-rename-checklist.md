# Block Rename Checklist

## When to load
Renaming a block (directory, files, class names, content references).

## Key insight
A block name propagates to 12+ locations. Silently fails if you miss one. Use `replace_all` for bulk edits, then grep to verify nothing remains.

## Steps
```bash
# 1. Rename directory and files
mv blocks/{old} blocks/{new}
mv blocks/{new}/{old}.js blocks/{new}/{new}.js
mv blocks/{new}/{old}.css blocks/{new}/{new}.css

# 2. Bulk-replace in each file
# CSS: replace all .{old} class prefixes → .{new}
# JS: replace class name strings
# styles/styles.css: :has(.{old}), .section.{old}-container, etc.
# scripts/scripts.js: auto-block guards
# content/*.plain.html: class="{old}" → class="{new}"
# drafts/*.plain.html: same
# tools/importer/parsers/{old}.js → rename + update table header string
# tools/importer/import-homepage.js: parser function name + registry key
# tools/importer/page-templates.json: block name

# 3. Verify nothing remains
grep -r "{old}" --include="*.js" --include="*.css" --include="*.html" --include="*.json" .

# 4. Lint
npm run lint
```

## Pitfalls
- EDS auto-generates `.{block}-container` on the section — CSS targeting that class must update too
- The importer table header (e.g., `[['Marquee']]`) controls the block name in imported content — capitalize correctly
- `PROJECT-BLOCKS.md` and `PROJECT-STATUS.md` reference block names — update those too
