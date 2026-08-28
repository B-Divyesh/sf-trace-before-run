# Trace Before Run — review 4 handoff

## Result

Review 4 is **FAIL**. No product code was changed. The committed report is
`.factory/review-4.md`.

## What was verified

- Fresh 390 × 844 and 1440 × 900 live contexts passed the cold first-read
  check. The action, action outcome, and three facts were visible before
  scrolling.
- The one-click demo populated the “Add the badge” puzzle immediately. A
  completed demo wrote only the `demo:` local-storage namespace; Reset removed
  it and restored the seed. The flow made only same-origin GET requests.
- A fresh clone ran all 12 claims-manifest commands individually, `CI=1 npm
  test` (27/27), and `npm run build` successfully.
- The live production suite passed 27/27. Route metadata, history/focus,
  mobile layout, offline reload, accessibility scans, 404 handling, legal
  links, and privacy headers were checked.

## Remaining work

1. Remove or properly declare/test the footer sentence “Original generated
   art.” (`F-4-1`).
2. Make the single `@claim:open-access` test complete all five puzzles and
   prove that no account, payment gate, or billing request occurs (`F-4-2`).

## How to verify after repair

```sh
npm ci
npm test -- --grep @claim:open-access
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```
