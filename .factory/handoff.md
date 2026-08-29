# Trace Before Run — review 5 handoff

## Result: FAIL

This was a reviewer-only pass. No product code or product assets were changed.
The complete adversarial report is in `.factory/review-5.md`.

## What was verified

- Fresh 390 × 844 and 1440 × 900 live first reads made the job, audience, and
  sample action clear without scrolling.
- The live demo opened in one click with sample data. It wrote only the
  `demo:` storage key, preserved a seeded `real:` key, reset cleanly, and made
  only same-origin GET requests.
- All 12 declared claim commands passed separately from a fresh clone.
- Local `CI=1 npm test`, `npm run build`, and the 27-test production suite
  passed.
- Internal link crawl, routing, metadata, 404, focus/history behavior,
  accessibility checks, and earlier-review regression checks passed.

## Remaining work

Five minor plain-language violations prevent acceptance. Remove or rewrite:

- “At the logic observatory, every value has a place and every branch leaves a trail.”
- “A five-puzzle tracing desk”
- “The prediction desk”
- “01 / Look”
- “Wrong branch” on the 404 page

After repair, rerun the command set documented in `.factory/review-5.md`.
