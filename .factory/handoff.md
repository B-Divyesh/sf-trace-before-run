# Trace Before Run — adversarial review 3 handoff

## Result: FAIL — four minor findings

Review 3 is recorded in `.factory/review-3.md`. Product code was not modified.

The cold landing screen, one-click sample, storage isolation, Reset demo,
Start for real, offline behavior, all declared claims, build, routing metadata,
404, link crawl, accessibility scans, touch targets, and visual identity pass.
The remaining findings are:

- `F-3-1`: Back does not restore the prior landing scroll position.
- `F-3-2`: “Clear it from the Privacy page” has no manifest claim/test.
- `F-3-3`: “Three moves build the habit” is an untested efficacy claim.
- `F-3-4`: README calls the puzzles “original” without testable provenance.

## Verification performed

- Fresh clone at `224b8f2fad2551193505a896ddcbe6c5440d27b3`:
  `npm ci`, every command in `.factory/claims.json` individually (11/11),
  `CI=1 npm test` (24/24), and `npm run build`.
- Production: `CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test`
  (24/24).
- `/opt/fleet/lib/verify-url.sh` against `/`: correct title, `lang=en`, one H1,
  main landmark, complete alt text, labeled buttons, and no console errors.
- Fresh 390 × 844 and 1440 × 900 cold reads; manual demo completion, reset,
  Start for real, storage sentinel checks, request interception, route/status
  crawl, metadata inspection, mobile target enumeration, and history checks.

## Next steps

Implement the four concrete fixes in `.factory/review-3.md`, add the new
claim/history coverage, and rerun the complete checklist. There are no failing
declared claims or known demo-isolation defects.
