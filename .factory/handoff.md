# Trace Before Run — polish round 2 handoff

## Result: PASS — no known findings remain

Repair commit `c30b6df85adcc01205c3b1eb45ed21b6e7d53e1b` closes every finding in review rounds 1 and 2. It also rechecks every earlier verification defect.

The release preserves the static Vite/TypeScript artifact and the paper-observatory identity. It is deployed at `https://trace-before-run.sociobot.in`.

## What changed

- The complete desktop first screen now fits at 1440 × 900, including the action, its outcome, and all three facts.
- The primary action opens the isolated sample at `/?demo=1`. Demo reset and real-progress separation have direct claim coverage.
- A `no-tracking` claim now verifies requests, methods, beacons, cookies, and storage during a complete sample trace.
- Route changes update canonical and social metadata, preserve query navigation, restore H1 focus, and announce the destination.
- Explicit `/demo`, `/play`, `/privacy`, and `/terms` rewrites preserve direct links. Unknown routes use a designed static page with HTTP 404.
- The service worker cache moved to `trace-before-run-v3` and includes the offline 404 assets.
- The catalog description is verb-first and 59 characters.

`.factory/polish-2.md` maps every review finding and earlier defect to its code change and evidence.

## Exact verification

Clean clone at `c30b6df85adcc01205c3b1eb45ed21b6e7d53e1b`:

- `npm ci`: passed; 22 packages and zero vulnerabilities.
- All 11 claim commands from `.factory/claims.json`: passed individually, 1/1 each.
- `CI=1 npm test`: passed, 24/24.
- `npm run build`: passed; `dist/index.html` exists.
- `npm audit --omit=dev`: passed with zero vulnerabilities.

Build sizes:

- JavaScript: 29.72 KB raw, 10.17 KB gzip.
- CSS: 16.73 KB raw, 4.65 KB gzip.
- Mobile hero: 9.02 KB AVIF and 14.03 KB WebP.
- Fonts: 0 bytes.

Deployed production:

- Static deployment ID: `9f81f767-8ff3-42a4-82f3-826b103dedd0`.
- Full live Playwright suite: 24/24 passed.
- Factory URL verification: passed on `/` and `/?demo=1`; no console or page errors.
- Axe integration: zero serious or critical findings across all routes. Landing and demo also passed in the dark treatment.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
- Lighthouse metrics: FCP 0.95 s, LCP 1.03 s, TBT 9.5 ms, CLS 0, 26,956 bytes transferred.
- Offline reload, service-worker update, keyboard use, 390 px layout, and 44 px targets passed.
- `/not-a-real-route` returns HTTP 404. All declared application routes return 200.
- HTML, JavaScript, CSS, and service-worker hashes match the deployed files.

Artifact SHA-256:

- `index.html`: `74e8b1b77fa0d92cd81e02070fd856c03f4ce2bbb1a785b3d3cc138496a78f32`
- `index-4u4eYrzs.js`: `d6c368348eb7dbbf1506dfbfa13b62044c1b59f4a19b1c6864920b2760897662`
- `index-x8kGLZ5a.css`: `b07bd63b2b346907ef886ee332ecc383ada897d87768da850f4bf148a69d421b`
- `sw.js`: `b11157881184f73a1dfdfc0751b492398586daf87fd03b38c5f41f650bbf628c`

Evidence is under `.factory/evidence/polish-2-local/` and `.factory/evidence/polish-2-live/`.

## Run and verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

## Known gaps and next steps

None. No review finding, required claim, or known product defect remains unresolved.
