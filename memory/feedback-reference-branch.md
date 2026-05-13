---
name: feedback-reference-branch
description: Use the aem-20260508-1813 branch as a reference for pixel values and existing block implementations
type: feedback
---

When implementing or refining blocks that existed on the reference branch, check `aem-20260508-1813` for the working pixel values rather than guessing.

**Why:** Most blocks were 90% correctly implemented on that branch. It's the most reliable reference for specific values (sizes, spacing, colors) that aren't captured in requirements files.

**How to apply:** For any block that exists in `git show aem-20260508-1813:blocks/`, read its CSS/JS from that branch before making changes. Use `git show aem-20260508-1813:blocks/{block}/{file}` to read files.

The definitive source of truth is https://www.semrush.com/ (with DevTools inspection), but the reference branch is a fast shortcut for values already measured and implemented.

For new enterprise blocks (testimonials-carousel, tabs, case-study, video-card enterprise-platform), there's no reference branch implementation — use the live enterprise.semrush.com site and import script structure.
