# Polish 1 — review finding closure

Reviewed release base: `639131118d6c685cee914c329cd22b499a55be46`.
Adversarial report: `958a014f7b01621cee89b014bdd2f361600a7789`.

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Rewrote the README test-suite sentence to “The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout.” It is 18 words. | `.factory/copy-audit.md`; `CI=1 npm test` passes the complete suite. |
| F-1-2 | Added the `reset-demo` claim to `.factory/claims.json`. The tagged browser test seeds real progress, creates demo progress, resets the demo, then proves the seeded puzzle returns, demo progress is gone, and real progress is byte-for-byte unchanged. The README now states that same observable behavior. | `npm test -- --grep @claim:reset-demo` — 1/1 passed; `CI=1 npm test` — 21/21 passed. |

## Cumulative review check

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` reports.
The earlier verification reports identify editable-path refresh, mobile target
sizes, first dark-theme activation, non-numeric predictions, and nudge state
loss. The full browser suite continues to cover each behavior, and all passed
in this repair round.

## Live recheck

After the repair commit is pushed and deployed, this report is supplemented in
`.factory/handoff.md` with the cold live URL checks and final deployment
evidence.
