# Polish 2 — cumulative finding closure

Release base: `be5094cbf5947c70fa378ba50f3dc2cade6caf36`  
Review report: `d29ace6c07be127d122a183778b506bbaed50dfe`  
Repair commit: `c30b6df85adcc01205c3b1eb45ed21b6e7d53e1b`

## Review finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the repaired 18-word README test-suite sentence. The full copy audit remains free of sentences over 22 words and banned terms. | Source: `README.md` and `.factory/copy-audit.md`. Regression context: `.factory/evidence/polish-2-live/home/screenshot-desktop.png`. Live `/` check: 200 with no console errors. |
| F-1-2 | Kept `reset-demo` in the claims manifest and exercised reset from the required `/?demo=1` entry. Reset clears only demo state and restores the seeded puzzle. | Test: `@claim:reset-demo`, clean clone and live, 1/1. Screenshot: `.factory/evidence/polish-2-live/demo/reset-mobile.png`. Live check: `/?demo=1`; `findings.json` records an empty field, no demo key, and the unchanged real sentinel. |
| F-2-1 | Widened the desktop copy column and retained the original observatory composition. Added a 1440 × 900 assertion for the full action and all three facts. | Test: `desktop first screen keeps the action and all three facts inside 1440 by 900`. Screenshot: `.factory/evidence/polish-2-live/finding-f-2-1-desktop.png`. Live `/` check: action bottom 648.05 px and final-fact bottom 778.44 px within 900 px. |
| F-2-2 | Added the `no-tracking` manifest claim and one tagged completed-demo test. It records requests, methods, beacons, cookies, and storage keys. | Test: `@claim:no-tracking`, clean clone and live, 1/1. Screenshot: `.factory/evidence/polish-2-live/demo/screenshot-desktop.png`. Live `/?demo=1` check: zero external requests, non-GET requests, beacons, and cookies in `.factory/evidence/polish-2-live/findings.json`. |
| F-2-3 | Added a standalone, product-styled `404.html`, explicit SPA route rewrites, and an Azure 404 response override. Added local preview middleware so the same status is testable before deployment. | Test: `routes set their own metadata, restore focus, and serve a real 404`. Screenshot: `.factory/evidence/polish-2-live/404/screenshot-desktop.png`. Live `/not-a-real-route` check: HTTP 404, correct title/H1, home action, and legal links; headers are saved beside the screenshot. |

## Earlier defect regression map

| Earlier finding | Current evidence |
| --- | --- |
| Valid edited programs lacked the computed path | `@claim:editable-trace` passed clean and live. `.factory/evidence/polish-2-live/regressions/edited-loop-path.png` shows `Loop 20 times` before commit. |
| Mobile actions were shorter than 44 px | `390px pages fit and actionable controls are at least 44px tall` passed clean and live. `.factory/evidence/polish-2-live/demo/reset-mobile.png` shows the stacked mobile workbench and demo controls. |
| The first dark-OS theme toggle made no visible change | `theme toggle changes the first time when the OS starts dark` passed clean and live. Screenshot: `.factory/evidence/polish-2-live/regressions/first-theme-toggle.png`. |
| Non-numeric final values reached reveal | `non-numeric final values show a format error before reveal` passed clean and live. Screenshot: `.factory/evidence/polish-2-live/regressions/numeric-error.png`. |
| Showing a nudge deleted uncommitted work and focus | `showing and hiding a nudge preserves the uncommitted prediction and focus` passed clean and live. Screenshot: `.factory/evidence/polish-2-live/regressions/nudge-preserves-form.png`. |

## Required acceptance checks

- The first action links directly to `/?demo=1`. The visible banner, Reset demo, and Start for real controls persist on the sample route.
- Demo and practice use separate `demo:` and `real:` storage keys. The live reset check preserved a seeded real record byte-for-byte.
- All routes update title, description, canonical, Open Graph, and Twitter metadata. Navigation and browser history focus and announce the new H1.
- `/privacy` and `/terms` are direct 200 routes and appear in every footer. The static 404 footer links to both.
- `.factory/catalog-description.txt` is the 59-character verb-first line: “Practice Python tracing by predicting values before reveal.”
- The paper-observatory visual thesis, generated art, palette, type, and clipped-panel language remain intact.

## Verification evidence

From clean clone `/tmp/trace-polish-2-clean.ckcCcy` at the repair commit:

- `npm ci`: passed; 22 packages installed and zero vulnerabilities.
- Every command in `.factory/claims.json`: 11/11 passed individually, one tagged test per claim.
- `CI=1 npm test`: 24/24 passed.
- `npm run build`: passed; `dist/index.html` produced.
- `npm audit --omit=dev`: zero vulnerabilities.

Production verification after deployment:

- Deployment ID: `9f81f767-8ff3-42a4-82f3-826b103dedd0`.
- `CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test`: 24/24 passed.
- Factory URL verification passed on `/` and `/?demo=1`: correct title, `lang=en`, one H1, main landmark, alt text, labels, and no console errors.
- Playwright axe scans passed on all routes and the dark treatment with zero serious or critical findings.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.03 s, TBT 9.5 ms, CLS 0.
- Local and live SHA-256 values match for HTML, hashed JavaScript, hashed CSS, and `sw.js`.
- Live route status: `/`, `/?demo=1`, `/demo`, `/play`, `/privacy`, and `/terms` return 200; an unknown route returns 404.

All review findings and earlier recorded defects are closed.
