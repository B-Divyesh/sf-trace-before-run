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

The repair was pushed as `03f2efc07a9b74662bd1d4384eea14a4fec355ed` and
deployed through the static work order. Fresh production checks passed:

- `/opt/fleet/lib/verify-url.sh https://trace-before-run.sociobot.in/`:
  200; title, `lang=en`, one h1, main landmark, image alt text, labeled
  buttons, and zero browser errors. Evidence:
  `.factory/evidence/polish-1-live/`.
- `/opt/fleet/lib/verify-url.sh https://trace-before-run.sociobot.in/demo`:
  200; `Demo — Trace Before Run`, one h1, main landmark, and zero browser
  errors. Evidence: `.factory/evidence/polish-1-live/demo/`.
- `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in CI=1 npm test`:
  passed; `test-results/.last-run.json` records `{"status":"passed"}`.
- The live `@claim:reset-demo` and `@claim:offline-reload` tests each passed
  1/1 from fresh production browser contexts.
