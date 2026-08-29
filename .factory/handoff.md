# Trace Before Run — polish 5 handoff

## Result: PASS

All 16 findings from adversarial reviews 1–5 are closed. The deployed static
product keeps its cut-paper observatory identity while every public label now
uses plain, task-specific words.

## What changed

- Removed the hero's metaphorical caption.
- Renamed the first-screen and preview labels to “Five Python tracing puzzles,”
  “Example tracing puzzle,” and “01 / Example puzzle.”
- Rewrote both SPA and static 404 copy as “Page not found,” “This page does not
  exist,” and “Return home,” including literal route metadata.
- Strengthened `@claim:demo-isolated` through the Start for real transition. It
  proves demo progress is discarded and practice progress remains unchanged.
- Updated `.factory/claims.json`, `.factory/copy-audit.md`, the service-worker
  cache version, and the 83-character verb-first catalog description.
- Added current local and production screenshots, URL checks, route headers,
  Lighthouse output, and finding observations under
  `.factory/evidence/polish-5-*`.

## Exact verification

Repair commit: `68117cfc8fe983c0d068632a1457669595665f8a`

Clean clone: `/tmp/trace-polish-5-clean.IMWxD0`

- `npm ci`: passed; 22 packages installed; zero vulnerabilities.
- Each of the 12 `.factory/claims.json` commands: passed separately.
- `CI=1 npm test`: 27/27 passed.
- `npm run build`: passed; `dist/index.html` exists.
- `npm audit --omit=dev`: zero vulnerabilities.
- Bundle: JavaScript 30.31 KB raw / 10.31 KB gzip; CSS 16.73 KB raw / 4.65 KB gzip.

Deployment ID: `ee2a215a-bf77-4f46-85b1-3f67a00b9a65`

- `CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test`: 27/27 passed.
- Factory URL verification passed on `/`, `/?demo=1`, and `/privacy` with zero browser errors.
- Cold 390 × 844 and 1440 × 900 first reads kept the action and all three facts inside the viewport.
- Demo reset restored “Add the badge,” removed the demo key, and preserved the real sentinel byte-for-byte.
- Completing `/play` reached “You traced all five programs” without account, payment, external, or write requests.
- Mobile Back restored 2124 px exactly and focused the landing H1.
- `/not-a-real-route` returned HTTP 404 with the revised plain-language page and legal links.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.06 s, TBT 8 ms, CLS 0.
- The deployed HTML, JavaScript, CSS, and service worker match local SHA-256 hashes.

Detailed mappings are in `.factory/polish-5.md`. Machine-readable observations
are in `.factory/evidence/polish-5-live/findings.json`.

## Run and verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

Production: https://trace-before-run.sociobot.in/

Demo: https://trace-before-run.sociobot.in/?demo=1

## Known gaps and next steps

None.
