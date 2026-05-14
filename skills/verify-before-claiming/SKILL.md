---
name: verify-before-claiming
description: Protocol for verifying work before reporting it complete. Load ALWAYS before saying "done", "fixed", "implemented", or any similar completion claim.
---

Never declare work complete based on having written the code. Verify the outcome directly.

## After any code change
1. Re-read the file you edited — confirm the change is exactly as intended.
2. Run `npm run lint` — zero errors.
3. Load the page at `localhost:3000` — confirm the component renders correctly.
4. Compare against original site (for Gap tasks) or confirm requested state (for Enhancement tasks). Load `executing-plan-tasks` if working from a plan.
5. After CSS changes: check that untouched sibling/parent values didn't change. If they did, you introduced a regression — load `regression-guard`.
6. Only THEN write "done".

## Verification must be end-to-end
- **Test EVERY affected element**, not just one instance. If the task says "fix all videos", verify ALL videos — not just the first one.
- **Test the user's exact scenario.** If a video should play on scroll, actually scroll to it and confirm `currentTime > 0`. Don't accept `readyState: 4` as proof of playback.
- **Test durability.** If a fix relies on a file, confirm the file is tracked by git (not gitignored). If a fix relies on a URL, confirm it resolves from the user's environment, not just yours.
- **Test after every change.** If you fix element A, then separately fix element B, re-verify A still works after B's change. Don't reuse earlier verification results.

## Cleanup before claiming done
- **Review the full diff** (`git diff`) before marking done. Remove leftover files, dead code, temporary variables, and failed attempts.
- **Check for hacks.** If you added a workaround (URL rewrite, fallback path, error detection), ask: should this be a content fix instead? Load `eds-code-conventions` for the clean-code rules.
- **Flag code smells.** If you see unclear code while working, add a cleanup task to `PROJECT-PLAN.md` — don't ignore it.

## Pitfalls
- "It should work" is a guess, not verification.
- Lint passing is necessary but not sufficient — visual verification is required.
- Measuring your implementation instead of the original — load `measure-first` when matching values.
- Verifying one instance of a repeated element and assuming all are fixed.
- A prior verification becoming stale after subsequent code changes.
- A fix that works locally but relies on non-tracked assets (gitignored files, local-only state).
