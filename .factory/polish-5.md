# Polish 5 — cumulative finding closure

Release candidate: `b2f55b98f246e054c5d69463bcaebe5ba128514f`

Review report: `206cf03f4f9ca66465e10c761d1a1b36c32ccb77`

Product repair: `68117cfc8fe983c0d068632a1457669595665f8a`

Deployment: `ee2a215a-bf77-4f46-85b1-3f67a00b9a65`

## Every review finding

| Finding | Change made | Evidence |
| --- | --- | --- |
| `F-1-1` | Kept the README test-suite sentence at 19 words. | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-desktop.png`; cold live `/`: 200, correct title, no console errors. |
| `F-1-2` | Kept `reset-demo` in the claims manifest. Reset restores the seeded sample, clears only demo progress, and preserves practice progress byte-for-byte. | Test: `@claim:reset-demo`; screenshot: `.factory/evidence/polish-5-live/findings/demo-reset-mobile.png`; cold live `/?demo=1`: “Add the badge,” demo key absent, real sentinel unchanged. |
| `F-2-1` | Preserved the compact first-screen layout at both required sizes. | Test: `desktop first screen keeps the action and all three facts inside 1440 by 900`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-desktop.png`; cold live `/`: action/final-fact bottoms were 648.05/778.44 px at 900 px and 547.30/677.69 px at 844 px. |
| `F-2-2` | Kept the `no-tracking` claim and its request, beacon, cookie, method, and storage checks through the complete sample. | Test: `@claim:no-tracking`; screenshot: `.factory/evidence/polish-5-live/demo/screenshot-desktop.png`; cold live `/?demo=1`: only same-origin GET requests, no beacons, cookies, or console errors. |
| `F-2-3` | Preserved explicit app-route rewrites, the styled static error document, and Azure's HTTP 404 override. The recovery copy is now literal. | Test: `routes set their own metadata, restore focus, and serve a real 404`; screenshot: `.factory/evidence/polish-5-live/404/screenshot-desktop.png`; cold live `/not-a-real-route`: HTTP 404 with Home, Privacy, and Terms links. |
| `F-3-1` | Preserved per-history-entry scroll positions, instant restoration, H1 focus with `preventScroll`, and route announcements. | Test: `mobile Back and Forward restore each route's scroll position and heading focus`; screenshot: `.factory/evidence/polish-5-live/findings/history-restored-mobile.png`; cold live `/` → `/play` → Back restored 2124 px exactly with the H1 focused. |
| `F-3-2` | Kept `clear-progress` in the manifest and the Privacy action that removes both storage namespaces and announces completion. | Test: `@claim:clear-progress`; screenshot: `.factory/evidence/polish-5-live/privacy/screenshot-mobile.png`; cold live `/privacy`: 200, correct title, no console errors. |
| `F-3-3` | Kept the factual heading “Trace in three moves.” | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-desktop.png`; cold live `/`: corrected heading present. |
| `F-3-4` | Kept “Five puzzles…” in README and the regression that rejects “Five original puzzles.” | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-mobile.png`; clean-clone source check passed at the repair commit and cold live `/` returned 200. |
| `F-4-1` | Kept the untestable “Original generated art.” claim out of the shared footer. Internal provenance remains in the design record. | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-desktop.png`; cold live `/`: full-page footer has no provenance claim. |
| `F-4-2` | Kept the strengthened `open-access` test, which solves all five puzzles and rejects account, payment, billing, external, or write-request gates. | Test: `@claim:open-access completes practice without an account or payment`; screenshot: `.factory/evidence/polish-5-live/findings/complete-practice.png`; cold live `/play`: reached “You traced all five programs” with no external or non-GET requests. |
| `F-5-1` | Removed the information-free observatory caption. The useful image alt text remains. | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-desktop.png`; cold live `/`: zero hero captions and no forbidden phrase. |
| `F-5-2` | Replaced “A five-puzzle tracing desk” with “Five Python tracing puzzles.” | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-mobile.png`; cold live `/`: new first-screen label present at 390 and 1440 px. |
| `F-5-3` | Replaced “The prediction desk” with “Example tracing puzzle.” | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-desktop.png`; cold live `/`: factual preview label present. |
| `F-5-4` | Replaced “01 / Look” with “01 / Example puzzle.” | Test: `review copy uses factual, product-specific plain words`; screenshot: `.factory/evidence/polish-5-live/home/screenshot-mobile.png`; cold live `/`: factual section marker present. |
| `F-5-5` | Replaced “Wrong branch” with “Page not found.” Adjacent metaphorical heading/action/metadata became “This page does not exist,” “Return home,” and a literal description. | Test: `routes set their own metadata, restore focus, and serve a real 404`; screenshot: `.factory/evidence/polish-5-live/404/screenshot-desktop.png`; cold live `/not-a-real-route`: HTTP 404 and all revised text present. |

## Product-defect regressions

| Earlier defect | Current evidence |
| --- | --- |
| Edited supported code did not refresh its path. | `@claim:editable-trace` passed clean and live with the computed 20-turn path and output. |
| Mobile actions were shorter than 44 px. | `390px pages fit and actionable controls are at least 44px tall` passed clean and live. |
| The first dark-theme toggle made no visible change. | `theme toggle changes the first time when the OS starts dark` passed clean and live. |
| Non-numeric final values reached reveal. | `non-numeric final values show a format error before reveal` passed clean and live. |
| Opening a nudge discarded predictions or focus. | `showing and hiding a nudge preserves the uncommitted prediction and focus` passed clean and live. |

## Demo and claims

The first-screen action opens `/?demo=1` directly. The persistent banner has
Reset demo and Start for real controls. Demo and practice use separate
`demo:` and `real:` keys. The `demo-isolated` claim test now also proves that
Start for real discards demo progress and resumes the untouched practice
sentinel. `.factory/claims.json` contains 12 unique ids, and each id occurs in
exactly one tagged Playwright test.

From fresh clone `/tmp/trace-polish-5-clean.IMWxD0` at the repair commit:

- `npm ci` passed with zero vulnerabilities.
- All 12 manifest commands passed separately, one test per command.
- `CI=1 npm test` passed 27/27.
- `npm run build` passed and produced `dist/index.html`.
- `npm audit --omit=dev` reported zero vulnerabilities.
- Application JavaScript is 30.31 KB raw / 10.31 KB gzip. CSS is 16.73 KB raw / 4.65 KB gzip.

## Production verification

- `CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test` passed 27/27 after deployment.
- `/opt/fleet/lib/verify-url.sh` passed for `/`, `/?demo=1`, and `/privacy`: correct titles, `lang=en`, one H1, one main landmark, complete alt text, labeled controls, and no console errors.
- Lighthouse mobile scores: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.91 s, LCP 1.06 s, TBT 8 ms, CLS 0.
- `/`, `/?demo=1`, `/demo`, `/play`, `/privacy`, and `/terms` returned 200. `/not-a-real-route` returned 404. All listed static resources returned 200.
- Local and live SHA-256 hashes match for HTML, JavaScript, CSS, and `sw.js`; values are recorded in `.factory/evidence/polish-5-live/findings.json`.

All findings from reviews 1–5 and every earlier recorded product defect are closed.
