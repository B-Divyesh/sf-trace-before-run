# Independent product verification 5 — Trace Before Run

## Verdict: PASS

Candidate `ca380b516ae935c4e30f1aeb6fb6f6b8148f0508` was independently verified on 29 August 2026 from the clean checkout at `/work/repo`. It is deployed at <https://trace-before-run.sociobot.in>. The earlier deployment-only concern did not reproduce: every publicly served candidate artifact matched the fresh local production output byte-for-byte. No product code was changed for this verification.

## Mandatory first read and demo: PASS

A cold desktop load says what it does, for whom, and what to click first in the first screen: “Predict Python before you run it”; “For new Python learners who know syntax but lose track of changing values”; and the visible **Try it with sample data** action. Adjacent text says it loads a ready branch puzzle with no sign-in.

That one click opens the seeded `Add the badge` puzzle at `/?demo=1` (the `/demo` alias also works). It shows the persistent “Demo — sample data, nothing is saved” banner, Reset demo, and Start for real.

## Claims gate: PASS

`.factory/claims.json` exists. After `npm ci`, each of its twelve exact commands was run through the product demo entry point and passed. A consolidated tagged pass also completed **12/12** in 36.3 seconds.

| Claim | Exact command | Result |
| --- | --- | --- |
| prediction-reveal | `npm test -- --grep @claim:prediction-reveal` | PASS |
| restricted-grammar | `npm test -- --grep @claim:restricted-grammar` | PASS |
| editable-trace | `npm test -- --grep @claim:editable-trace` | PASS |
| demo-isolated | `npm test -- --grep @claim:demo-isolated` | PASS |
| reset-demo | `npm test -- --grep @claim:reset-demo` | PASS |
| clear-progress | `npm test -- --grep @claim:clear-progress` | PASS |
| local-only | `npm test -- --grep @claim:local-only` | PASS |
| no-tracking | `npm test -- --grep @claim:no-tracking` | PASS |
| open-access | `npm test -- --grep @claim:open-access` | PASS |
| first-difference | `npm test -- --grep @claim:first-difference` | PASS |
| five-puzzles | `npm test -- --grep @claim:five-puzzles` | PASS |
| offline-reload | `npm test -- --grep @claim:offline-reload` | PASS |

The landing page, demo, README, and privacy copy were cross-checked against the manifest. No material visitor-facing claim lacked a claim test.

## Local and deployed quality gates: PASS

- `npm ci`: passed; 22 packages installed and zero vulnerabilities reported.
- `npm test`: **27/27 passed** locally in 58.7 seconds.
- `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test`: **27/27 passed** against production in 53.4 seconds.
- `npm run build`: passed (`tsc --noEmit` and Vite) and produced `dist/`. There is no separate lint command; strict TypeScript is the configured static check.
- `npm audit --omit=dev`: zero vulnerabilities.
- Fresh live mobile Lighthouse 12.8.2: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.0 s, TBT 10 ms, CLS 0.
- Production output: JS 30.31 KB raw / 10.29 KB gzip; CSS 16.73 KB raw / 4.64 KB gzip; no downloaded fonts. This is within the static-web budgets.

## Product, resilience, and recovery: PASS

- The normal five-puzzle practice session completes with no account, payment, or access gate. Correct answers are hidden until commit; a deliberately wrong prediction names the first differing final field and retry returns focus to it.
- The demo supports an editable restricted grammar, immediately refreshes path choices for the 20-turn supported boundary, and never evaluates arbitrary Python.
- Independently on live `/demo`, `import os`, `range(21)`, and division by zero each produced a specific explanation and blocked commit; Restore puzzle recovered the seeded exercise. Empty and non-whole-number predictions also give specific errors and recover when corrected.
- Reset demo, Start for real, clearing progress, separate `demo:` and `real:` storage namespaces, route history/focus restoration, offline reload, and service-worker stale-cache cleanup all passed in the live suite.

## Accessibility, responsive behavior, and links: PASS

- Playwright axe scans of `/`, `/demo`, `/play`, `/privacy`, `/terms`, and the styled missing route found zero serious or critical violations; the suite covers both light and dark treatments.
- The first Tab stops at the visible Skip to main content link. Native radio Arrow/Space behavior and Enter commit work keyboard-only. Reduced-motion mode is detected and caps computed transitions at 0.00001 seconds.
- At 390 px, `scrollWidth === clientWidth` on the landing route; the suite confirms the demo actions and landing action are at least 44 px high. A visual mobile review found no clipping or overlap.
- Crawling all live internal anchors found all application links healthy; the 404 page's self skip-link naturally retains HTTP 404 while its Return home link returns 200.

## Privacy, headers, caching, and deployment identity: PASS

An independent fresh-browser completed live demo made only same-origin GET requests. It produced no cookies, beacons, console errors, page errors, third-party requests, analytics, answer uploads, payment/unlock requests, or inference calls. It wrote only `demo:trace-before-run:progress` during the demo; normal practice uses the separate real namespace.

The browser observed a self-only CSP (including `connect-src 'self'` and response-header `frame-ancestors 'none'`), HSTS, `X-Content-Type-Options: nosniff`, strict referrer policy, and disabled camera/microphone/geolocation. HTML uses `max-age=30, must-revalidate`; hashed JS/CSS are one-year immutable; `sw.js` is `no-cache`. A deliberately missing route returns the designed HTTP 404 response.

Every publicly served `dist/` asset matched the live deployment SHA-256. The deployment configuration file itself is intentionally not served (HTTP 404); its configured response behavior was verified through the headers above.

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `a7b2c5b66bb55942649283409718f201828d103ef75d6d530ee69ce925983b56` |
| `assets/index-U9USDiN4.js` | `75e5bac9517ff19403988d130635af3adab52660371e03a843c10625b40c252e` |
| `assets/index-x8kGLZ5a.css` | `b07bd63b2b346907ef886ee332ecc383ada897d87768da850f4bf148a69d421b` |
| `sw.js` | `1bc888596c11279d0181f95c281ad2a97f69d33b2516a76b8930c818d78a9f6a` |

This is a static product with neither server-side endpoints/product unlocks nor sign-in, so rate-limit, Entra tenant, backend concurrency/persistence, and library/CLI consumer checks are not applicable.

## Defects by severity

No reproducible critical, high, medium, or low defects found.

## Handoff

**PASS** — candidate `ca380b516ae935c4e30f1aeb6fb6f6b8148f0508` at <https://trace-before-run.sociobot.in> is accepted.
