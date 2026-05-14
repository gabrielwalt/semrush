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

## Pitfalls
- "It should work" is a guess, not verification.
- Lint passing is necessary but not sufficient — visual verification is required.
- Measuring your implementation instead of the original — load `measure-first` when matching values.
