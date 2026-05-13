---
name: verify-before-claiming
description: Protocol for verifying work before reporting it complete. Load ALWAYS before saying "done", "fixed", "implemented", or any similar completion claim.
---

Never declare work complete based on having written the code. Verify the outcome directly.

## Recipe — after any code change
1. **Re-read the file you just edited** — confirm the change is exactly as written
2. **Run `npm run lint`** — confirm zero errors
3. **Check `localhost:3000`** — load the page, look at the component, confirm it renders correctly
4. **Compare against original** — open the original site at the same viewport, verify they match
5. Only THEN write "done" in your response

## Recipe — after any CSS change
Before editing: note the key computed values of the element AND its siblings/parents.
After editing: re-check those same values. If any untouched value changed, you introduced a regression — load `regression-guard`.

## Pitfalls
- Writing code ≠ done. Saving the file ≠ done. Only verified output = done.
- "It should work" is not verification. "I checked at localhost:3000 and it renders correctly" is.
- Never use "this should fix it" or "that ought to work" — those are guesses, not confirmations.
- Lint passing is necessary but not sufficient — visual verification is always required.

See also: `regression-guard` (checking for side-effects), `measure-then-implement` (measuring before implementing)
