# Polish 3 — cumulative finding closure

Release candidate: `224b8f2fad2551193505a896ddcbe6c5440d27b3`

Review report: `8e383e6e91085832aa02c622368aaf47bb81dda2`

Repair commit: `784ea6ab54f4168789225cd7ce07ec353f5e10ea`

Deployment: `527deedc-93af-4cb5-a489-cd0f153f047a`

## Every review finding

| Finding | Change made | Evidence |
| --- | --- | --- |
| `F-1-1` | Kept the shortened README suite sentence at 19 words under the round 3 counting rules. | Test: `review copy states facts without unverified efficacy or provenance wording`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-desktop.png`; cold live check: [home](https://trace-before-run.sociobot.in/) returned 200 with no console errors. |
| `F-1-2` | Kept `reset-demo` in the manifest. Reset removes only the demo key, restores “Add the badge,” and leaves practice progress byte-for-byte unchanged. | Test: `@claim:reset-demo`; screenshot: `.factory/evidence/polish-3-live/findings/demo-reset-mobile.png`; cold live check: [sample demo](https://trace-before-run.sociobot.in/?demo=1), with the preserved sentinel in `findings.json`. |
| `F-2-1` | Preserved the repaired hero dimensions and the 1440 × 900 viewport assertion. | Test: `desktop first screen keeps the action and all three facts inside 1440 by 900`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-desktop.png`; cold live check: [home](https://trace-before-run.sociobot.in/) passed desktop and 390 px first-screen checks. |
| `F-2-2` | Kept `no-tracking` as a declared claim with request, beacon, cookie, and storage inspection through a completed demo. | Test: `@claim:no-tracking`; screenshot: `.factory/evidence/polish-3-live/demo/screenshot-desktop.png`; cold live check: [sample demo](https://trace-before-run.sociobot.in/?demo=1) made no external or non-GET request. |
| `F-2-3` | Preserved the styled static 404, explicit route rewrites, and Azure 404 response override. | Test: `routes set their own metadata, restore focus, and serve a real 404`; screenshot: `.factory/evidence/polish-3-live/findings/404-desktop.png`; cold live check: [unknown route](https://trace-before-run.sociobot.in/not-a-real-route) returned HTTP 404 with home and legal links. |
| `F-3-1` | Each history entry now records `scrollX` and `scrollY`. Back and Forward render the route, restore that entry instantly, focus the H1 with `preventScroll`, and announce it. Stale animation-frame writes are cancelled before navigation. | Test: `mobile Back and Forward restore each route's scroll position and heading focus`; screenshot: `.factory/evidence/polish-3-live/findings/history-restored-mobile.png`; cold live check: [home](https://trace-before-run.sociobot.in/) restored landing `2184 → 2184` and practice `420 → 420`, with H1 focus and no errors. |
| `F-3-2` | Added `clear-progress` to `.factory/claims.json`. The test starts at `/?demo=1`, seeds both namespaces, opens Privacy, clears progress, verifies both keys and the status message, and audits requests. | Test: `@claim:clear-progress`; screenshot: `.factory/evidence/polish-3-live/findings/clear-progress-viewport-mobile.png`; cold live check: [Privacy](https://trace-before-run.sociobot.in/privacy) left no storage keys and announced the result. |
| `F-3-3` | Replaced “Three moves build the habit” with the factual “Trace in three moves.” | Test: `review copy states facts without unverified efficacy or provenance wording`; screenshot: `.factory/evidence/polish-3-live/findings/factual-copy-desktop.png`; cold live check: [home](https://trace-before-run.sociobot.in/) shows the new heading. |
| `F-3-4` | Rewrote the README sentence as “Five puzzles ask for final variable values, the branch path, and printed output.” The source test rejects the old adjective. | Test: `review copy states facts without unverified efficacy or provenance wording`; screenshot: `.factory/evidence/polish-3-live/findings/first-screen-mobile.png`; cold live check: [home](https://trace-before-run.sociobot.in/) matches the repaired release verified from the pushed commit. |

## Earlier product-defect regression map

| Earlier defect | Current evidence |
| --- | --- |
| Edited supported code did not offer its computed path | `@claim:editable-trace` passed clean and live with `Loop 20 times`. |
| Mobile controls were shorter than 44 px | `390px pages fit and actionable controls are at least 44px tall` passed clean and live. |
| The first theme toggle did not change a dark-OS page | `theme toggle changes the first time when the OS starts dark` passed clean and live. |
| Non-numeric final values reached the reveal | `non-numeric final values show a format error before reveal` passed clean and live. |
| Opening a nudge discarded predictions or focus | `showing and hiding a nudge preserves the uncommitted prediction and focus` passed clean and live. |

## Claims and clean-clone gate

A fresh clone at `784ea6ab54f4168789225cd7ce07ec353f5e10ea`
ran `npm ci`. All 12 manifest commands then passed individually, one test per
claim: `prediction-reveal`, `restricted-grammar`, `editable-trace`,
`demo-isolated`, `reset-demo`, `clear-progress`, `local-only`, `no-tracking`,
`open-access`, `first-difference`, `five-puzzles`, and `offline-reload`.

The same clone passed `CI=1 npm test` (27/27), `npm run build`, and
`npm audit --omit=dev` with zero vulnerabilities. The build produced
`dist/index.html`; application JavaScript is 30.46 KB raw and 10.39 KB gzip,
and CSS is 16.73 KB raw and 4.65 KB gzip.

## Production recheck

- `CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test`:
  27/27 passed after deployment, including all claim, offline, Axe, keyboard,
  mobile, privacy, and route tests.
- Factory URL verification passed on `/`, `/?demo=1`, and `/privacy`: correct
  titles, `lang=en`, one H1, one main, complete alt text, labeled controls,
  and zero console errors. Reports and screenshots are under
  `.factory/evidence/polish-3-live/`.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; FCP 0.9 s, LCP 1.1 s, TBT 10 ms, CLS 0.
- The live route and resource crawl returned 200 for every known route and
  discovered asset. The unknown route returned 404. Security headers were
  present. Local/live SHA-256 hashes match for HTML, JavaScript, CSS, and the
  service worker; see `.factory/evidence/polish-3-live/surface.json`.

All findings from reviews 1–3 and all earlier recorded defects are closed.
