# PROJECT.md — Semrush Migration

Core project settings: source site, repository, environments, and authoring.  
**Update this file if any URL, repo, or environment detail changes.**

---

## Project Identity

| | |
|--|--|
| **Project** | Semrush.com → Adobe Edge Delivery Services |
| **Source site** | https://www.semrush.com/ |
| **GitHub repo** | https://github.com/gabrielwalt/semrush |

---

## Environments

| Environment | URL |
|-------------|-----|
| AEM Preview | https://aem-20260508-1813--semrush--gabrielwalt.aem.page |
| AEM Live | https://aem-20260508-1813--semrush--gabrielwalt.aem.live |
| Feature branch | `https://{branch}--semrush--gabrielwalt.aem.page` |

Get current branch: `git branch --show-current`  
Get repo info: `gh repo view --json nameWithOwner` or `git remote -v`

---

## Authoring

This migration uses **Document Authoring** (DA), not Universal Editor or classic AEM Author. Editors work in **[da.live](https://da.live)** — Adobe’s browser-based Document Authoring experience — against content stored in a connected **Google Drive** or **SharePoint**. Code (blocks, `styles.css`, `scripts.js`) still ships from GitHub and AEM Code Sync; authors focus on documents, sections, and block tables in DA.

| | |
|--|--|
| **Authoring model** | Document Authoring ([da.live](https://da.live)) |
| **Content storage** | Google Drive or SharePoint (linked folder for this project) |
| **Content format** | `.plain.html` files |
| **Nav fragment** | `/nav.plain.html` |
| **Footer fragment** | `/footer.plain.html` |

---

## Publishing Process

1. Push changes to a feature branch
2. AEM Code Sync makes changes available at the feature preview URL
3. Run PageSpeed Insights against the feature preview URL — target score 100
4. Open a PR to `main` — include the preview URL in the PR description (required; PR will be rejected without it)
5. Human reviewer inspects the URL and merges
6. AEM Code Sync updates `main` for production

---

## Project Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Agent identity, rules, EDS fundamentals, learning loop |
| `PROJECT.md` | This file — URLs, repo, environments |
| `PROJECT-BLOCKS.md` | Block inventory, variants, DOM patterns, CSS selectors |
| `PROJECT-DESIGN.md` | Design tokens, typography, color palette, button styles |
| `PROJECT-IMPORT.md` | Import scripts, bundle commands, parser architecture |
| `PROJECT-STATUS.md` | Migration progress, pages, next actions |
| `PROJECT-LEARNINGS.md` | Indexed database of learnings and pitfalls |
