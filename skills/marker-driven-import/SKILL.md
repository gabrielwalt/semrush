---
name: marker-driven-import
description: How to design the import parser as ONE generic, marker-driven script that reproduces user-validated content exactly. Use when the user has validated a page's content structure and you need a reliable parser, when adding detection for a new block/variant/section-style/template, or when an import doesn't reproduce the validated output. For low-level table/DOM mechanics see importer-parser-patterns.
---

Once the user validates how a page's content should be structured, that `.plain.html` is the **reference truth**. Build ONE parser that reproduces it from the original page using the most generic markers possible — not a per-page script. Every block, block variant, section, section style, and page template the project uses should map to a clear **marker set**: a combination of DOM elements/attributes that identifies — with high likelihood — what content structure the markup converts to.

## The detection cascade (decide in this order)
For each piece of source markup, the parser decides, top-down:
1. **Page template** — from page-level markers (URL pattern, body/`<main>` class, a signature section sequence).
2. **New section or not** — what marker starts a new section (a top-level wrapper, a background change, a layout shift).
3. **Section style(s)** — markers that map to `section-*` (dark bg, centered layout, pattern). Background styles are mutually exclusive — pick one.
4. **Block or not** — does this section's content map to a block, or stay default content?
5. **Block variant(s)** — markers that map to `<block>-<variant>` (e.g. dark card → `teaser-dark`).
6. **Content structure** — headings (h1–6), paragraphs, lists, images (wrap in `<picture>`), links, `<strong>`/`<em>` → CTA emphasis.

Rules are **contextual**: inside a given page template, levels 2–6 may apply different rules; inside a given section style, block/variant/content detection may differ. Encode this as "within template X" / "within section-style Y" branches, not as separate scripts.

## Method
1. **Find the markers first.** For each target block/variant/section-style/template, inspect the original page and identify the smallest, most reliable DOM signal (tag, class, attribute, structural position) that distinguishes it. Prefer generic structural markers over brittle ones (a hardcoded class hash). Write these down — ideally the project's marker map lives in `PROJECT-IMPORT.md`.
2. **Generic first.** Aim for ~90% of the validated content reproduced by global, marker-based rules shared across all pages.
3. **Context exceptions for the last mile.** Only if global rules can't distinguish a case, add a narrow contextual exception (e.g. "the 3rd section on the pricing template gets `section-dark`"). Document it as an exception and why no general marker worked.

## Validation loop (never overwrite the reference)
The validated `content/*.plain.html` is the reference — **never let the import overwrite it.**
1. Import the validated page's URL to a **temporary location** (e.g. `/tmp/import-check/`), never `content/`. `run-bulk-import.js` writes to `content/` directly and has no `--output-dir` — so back up or redirect (see `project-import-script-bundling`).
2. Diff the temp output against the validated `content/<page>.plain.html`.
3. Iterate on the parser until the diff is empty (output === validated content).
4. **Re-run this diff after every parser change** — a change that fixes page A often regresses page B. The parser is correct only when every validated page still reproduces exactly.

## Pitfalls
- Writing a second parser/script per page instead of adding marker branches to the one parser — defeats the goal; only fork for fundamentally incompatible DOM.
- Importing onto `content/` and destroying the reference — always go to a temp dir and diff.
- Marker too specific (a build-hashed class) → breaks on the next source deploy. Prefer structural/semantic markers.
- Reaching for a context exception before exhausting generic markers — exceptions are the last mile, not the first.
- Changing a parser and not re-diffing ALL validated pages — silent cross-page regressions.

See also: `importer-parser-patterns` (table/DOM mechanics), `project-import-script-bundling` (bundle + run + the overwrite warning), `eds-content-modeling` (what the markers should map TO — the augmented-styles ladder), `eds-migration-process` (where this fits in the per-page workflow). Native `excat-import-infrastructure` / `excat-import-script` generate parsers + transformers — **this single marker-driven strategy takes precedence** over their per-block scaffolding; use them for the boilerplate, then consolidate into the one parser described here.
