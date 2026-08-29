# Polish 4 — cumulative finding closure

Release candidate: `44adc27924283f10b34ccb02afc6fa28555b8b0c`

Review report: `7ac54c2c2ff99b3698d4df29bf8b212174f7e533`

Product repair: `3c93f97e063dccf1f678623f4a7528fda4c3e5fc`

Test hardening: `05e832091cbabf9d3007628026c496939341b6cb`

Deployment: `9ec45c03-6eb0-490f-a0f4-815b662d7a9f`

## Every review finding

| Finding | Change made | Evidence |
| --- | --- | --- |
| `F-1-1` | Kept the README suite sentence at 19 words and added its exact wording to the source-copy regression. | Test: `review copy states facts without unverified efficacy or provenance wording`; screenshot: `.factory/evidence/polish-4-live/home/screenshot-desktop.png`; cold live `/` check: 200, correct first screen, no console errors. |
| `F-1-2` | Kept `reset-demo` in the manifest. Reset removes only the demo key, restores “Add the badge,” and preserves practice progress byte-for-byte. | Test: `@claim:reset-demo`; screenshot: `.factory/evidence/polish-4-live/findings/demo-reset-mobile.png`; cold live `/?demo=1` check: demo key `null`, real sentinel unchanged. |
| `F-2-1` | Preserved the corrected first-screen dimensions and desktop viewport assertion. | Test: `desktop first screen keeps the action and all three facts inside 1440 by 900`; screenshot: `.factory/evidence/polish-4-live/home/screenshot-desktop.png`; cold live `/` check: action bottom 648.05 px and last fact bottom 778.44 px within 900 px. |
| `F-2-2` | Kept `no-tracking` in the manifest with request, method, beacon, cookie, and storage checks through a completed demo. | Test: `@claim:no-tracking`; screenshot: `.factory/evidence/polish-4-live/demo/screenshot-desktop.png`; cold live `/?demo=1` check: only same-origin GET requests, no beacons or cookies. |
| `F-2-3` | Preserved explicit SPA rewrites, the static product-styled 404, and Azure's 404 response override. | Test: `routes set their own metadata, restore focus, and serve a real 404`; screenshot: `.factory/evidence/polish-4-live/findings/404-desktop.png`; cold live `/not-a-real-route` check: HTTP 404 with home, Privacy, and Terms links. |
| `F-3-1` | Preserved per-history-entry scroll state, H1 focus with `preventScroll`, route announcement, and stale-frame cancellation. | Test: `mobile Back and Forward restore each route's scroll position and heading focus`; screenshot: `.factory/evidence/polish-4-live/findings/history-restored-mobile.png`; cold live `/` → `/play` → Back/Forward check: 2184 px and 420 px restored exactly with H1 focus. |
| `F-3-2` | Kept `clear-progress` in the manifest; the Privacy action removes practice and demo keys and announces completion. | Test: `@claim:clear-progress`; screenshot: `.factory/evidence/polish-4-live/privacy/screenshot-mobile.png`; cold live `/privacy` check passed in the production suite. |
| `F-3-3` | Kept the factual heading “Trace in three moves.” | Test: `review copy states facts without unverified efficacy or provenance wording`; screenshot: `.factory/evidence/polish-4-live/home/screenshot-desktop.png`; cold live `/` shows the corrected heading. |
| `F-3-4` | Kept the README wording “Five puzzles…” and rejects the unverified “original” adjective. | Test: `review copy states facts without unverified efficacy or provenance wording`; screenshot: `.factory/evidence/polish-4-live/home/screenshot-mobile.png`; pushed source and deployed product were rechecked at the repair revision. |
| `F-4-1` | Removed “Original generated art.” from the shared application footer while retaining internal provenance in the design record. | Test: `review copy states facts without unverified efficacy or provenance wording`; screenshot: `.factory/evidence/polish-4-live/findings/f-4-1-footer-desktop.png`; cold live `/` footer contains only product copy, legal links, factory credit, and version. |
| `F-4-2` | Expanded the single `open-access` claim test to solve all five puzzles. It checks every puzzle and reveal for account/payment controls, verifies the 5/5 result, and rejects external or non-GET requests. | Test: `@claim:open-access completes practice without an account or payment`; screenshot: `.factory/evidence/polish-4-live/findings/f-4-2-complete-practice.png`; cold live `/play` check reached “You traced all five programs” with zero gates or billing requests. |

## Product-defect regressions

| Earlier defect | Current evidence |
| --- | --- |
| Edited supported code did not refresh its computed path. | `@claim:editable-trace` passed in every clean-clone and live run. |
| Mobile actions were shorter than 44 px. | `390px pages fit and actionable controls are at least 44px tall` passed at 390 × 844. |
| The first theme toggle did not change a dark-OS page. | `theme toggle changes the first time when the OS starts dark` passed. |
| Non-numeric final values reached reveal. | `non-numeric final values show a format error before reveal` passed. |
| Opening a nudge discarded predictions or focus. | `showing and hiding a nudge preserves the uncommitted prediction and focus` passed. |

## Verification

The clean clone `/tmp/trace-polish-4-clean.ry71rT` checked out
`05e832091cbabf9d3007628026c496939341b6cb`. It ran `npm ci`, all 12 commands
from `.factory/claims.json` separately, `CI=1 npm test` (27/27), `npm run
build`, and `npm audit --omit=dev` with zero vulnerabilities. The build emitted
`dist/index.html`; application JavaScript is 30.42 KB raw and 10.38 KB gzip,
and CSS is 16.73 KB raw and 4.65 KB gzip.

After deployment, the final production suite passed 27/27. Factory URL checks
passed on `/`, `/?demo=1`, and `/privacy` with correct titles, `lang=en`, one
H1, one main landmark, complete alt text, labeled controls, and zero console
errors. Lighthouse scored Performance 100, Accessibility 100, Best Practices
100, and SEO 100; FCP was 0.90 s, LCP 1.05 s, TBT 12 ms, and CLS 0. Local and
live hashes match for HTML, JavaScript, CSS, and the service worker. Detailed
browser observations are in `.factory/evidence/polish-4-live/findings.json`.

All findings from reviews 1–4 and every earlier recorded product defect are
closed.
