---
name: eds-troubleshooting
description: EDS troubleshooting and documentation lookup. Use when stuck on an EDS issue and need to search official docs or debug a problem.
---

## Official documentation
- Search EDS docs via Google: `site:www.aem.live <query>`
- Full-text search across all EDS doc pages:
```bash
curl -s https://www.aem.live/docpages-index.json | jq -r '.data[] | select(.content | test("KEYWORD"; "i")) | "\(.path): \(.title)"'
```

## Debugging checklist
1. Check if a skill already covers the problem — scan the skill index in AGENTS.md
2. Search EDS docs with the commands above
3. Inspect the DOM structure — load `eds-dom-structure` skill
4. Check CSS specificity — load `css-specificity-eds` skill
5. If the issue is new and non-obvious, create a skill after solving it

## Pitfalls
- AEM CLI serves content from the remote origin — local `.plain.html` edits don't affect rendered pages at `localhost:3000`
- `localhost:3000/path.plain.html` does serve local content — use that for content file verification

See also: `eds-dom-structure` (DOM inspection), `css-specificity-eds` (CSS debugging), `plain-html-format` (content file issues)
