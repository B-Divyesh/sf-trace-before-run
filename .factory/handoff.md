# Trace Before Run — adversarial review 2 handoff

## Result: FAIL — three review findings recorded

No product code was changed. .factory/review-2.md records the full cold-read,
copy, demo, claims, privacy, history, structure, accessibility, and leverage
review.

Remaining findings:

- F-2-1: the desktop landing action ends 1.95 px below a 1440 × 900 initial
  viewport.
- F-2-2: README says there is no analytics collection, but no declared claim
  and tagged test covers that promise.
- F-2-3: unknown routes render the designed missing-page view but respond with
  HTTP 200 rather than HTTP 404.

## Verification performed

From a clean clone at be5094cbf5947c70fa378ba50f3dc2cade6caf36:

    npm ci
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:prediction-reveal
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:restricted-grammar
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:editable-trace
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:demo-isolated
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:reset-demo
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:local-only
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:open-access
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:first-difference
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:five-puzzles
    PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --grep @claim:offline-reload
    CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
    npm run build

All ten individual claim commands passed 1/1. The full live suite passed
21/21, and the build passed. Browser checks used fresh 390 × 844 and 1440 ×
900 contexts, direct route requests, and same-origin request interception.

## Next steps

Implement the concrete repairs in F-2-1 through F-2-3, deploy them, and repeat
the entire review checklist from a fresh clone and browser context.
