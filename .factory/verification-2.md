# Independent product verification 2 — Trace Before Run

## Verdict: FAIL

Candidate `9993de3e0555f0f6341156776f28bc6dae8d6a32` is deployed at
`https://trace-before-run.sociobot.in` and is byte-for-byte identical to the
local production build. The deployment is healthy, and all nine declared
claim tests pass. The candidate is still not releasable because the optional
nudge action silently deletes the learner's entire uncommitted prediction in
the core tracing flow.

Verified independently on 28 August 2026 from a clean checkout. Product code
was not changed.

## Release-blocking defect

### High — “Show one nudge” deletes the prediction being worked on

Reproduction on the live `/demo` route:

1. Enter `8` for `score`, `1` for `badge`, and `8` for `printed`.
2. Choose `If path`.
3. Click **Show one nudge**.

Expected: the nudge appears without changing the learner's work, and keyboard
focus remains on the triggering control or moves to the disclosed help.

Actual fresh-browser evidence:

- Before the click: values were `["8", "1", "8"]`; selected path was
  `If path`.
- After the click: values were `["", "", ""]`; no path was selected.
- The nudge appeared, but `document.activeElement` became `BODY`.
- There is no warning, confirmation, recovery action, or undo.

This is a release blocker because asking for help is a normal part of the
brief's beginner workflow. It destroys every field of the prediction the
learner is meant to commit before reveal. The shipped 20-test suite has no
coverage for preserving in-progress form state when the nudge is toggled.

## Mandatory first-read test

PASS. A cold live load answers the required questions in the first viewport:

- What it does: `Predict Python before you run it`.
- Who it is for: new Python learners who know syntax but lose track of changing
  values.
- What to click first: `Try it with sample data`; adjacent text says it loads a
  ready branch puzzle with no sign-in.

That action opens `/demo` in one click with the seeded `Add the badge` puzzle
and the persistent `Demo — sample data, nothing is saved` banner.

## Claims gate

`.factory/claims.json` exists. After `npm ci`, every listed command was run
separately from a fresh browser context through the demo entry point:

| Claim | Exact test | Result |
| --- | --- | --- |
| `prediction-reveal` | `npm test -- --grep @claim:prediction-reveal` | PASS, 1/1 |
| `restricted-grammar` | `npm test -- --grep @claim:restricted-grammar` | PASS, 1/1 |
| `editable-trace` | `npm test -- --grep @claim:editable-trace` | PASS, 1/1 |
| `demo-isolated` | `npm test -- --grep @claim:demo-isolated` | PASS, 1/1 |
| `local-only` | `npm test -- --grep @claim:local-only` | PASS, 1/1 |
| `open-access` | `npm test -- --grep @claim:open-access` | PASS, 1/1 |
| `first-difference` | `npm test -- --grep @claim:first-difference` | PASS, 1/1 |
| `five-puzzles` | `npm test -- --grep @claim:five-puzzles` | PASS, 1/1 |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS, 1/1 |

The live landing page, policy copy, and README were cross-checked against the
manifest. No material unlisted product claim was found. An additional seeded
storage check proved that `/demo` ignores and does not change an existing real
practice record.

## Clean-checkout gates

- Candidate identity: HEAD exactly
  `9993de3e0555f0f6341156776f28bc6dae8d6a32`.
- `npm ci`: PASS; 22 packages installed, 0 vulnerabilities reported.
- `npm test`: PASS; 20/20 Playwright tests.
- `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test`: PASS;
  20/20 against the live deployment.
- `npm run build`: PASS; strict `tsc --noEmit` plus Vite production build, with
  output in `dist/`.
- Independent `npx tsc --noEmit`: PASS.
- Separate lint command: not configured.
- `npm audit --omit=dev`: PASS; 0 vulnerabilities.
- `git diff --check`: PASS before this report.

Production build sizes:

- JavaScript: 29.16 KB raw / 10.05 KB gzip.
- CSS: 16.69 KB raw / 4.63 KB gzip.
- Mobile hero: 9.02 KB AVIF / 14.03 KB WebP.
- Fonts: 0 bytes; system stacks only.

## End-to-end, input, and recovery checks

PASS except for the nudge defect:

- Correct and incorrect predictions stay hidden until commit; correct answers
  reveal the line trace, and wrong variable or output answers explain the first
  difference.
- All five bundled puzzles can be completed from `/play` without an account or
  payment.
- Edited supported code refreshes path choices; `range(0)` and `range(20)` can
  be answered successfully.
- Negative ranges and `range(21)` are rejected. Division by zero, tab and
  two-space indentation, unsupported imports, missing variables, empty code,
  and results over 1,000,000 give specific errors and disable commit.
- The 14-line and 500-character boundaries are accepted; 15 lines and 501
  characters are rejected.
- Decimal final values are rejected before reveal; correcting to a signed
  whole number succeeds.
- Restore puzzle, reset demo, start for real, and privacy-page clearing work.
- Malformed stored JSON falls back to the seeded demo without a page error.

## Accessibility, keyboard, mobile, and motion

- Factory `verify-url.sh`: PASS on local `/`, local `/demo`, and the live URL;
  each had one H1, `lang=en`, a main landmark, labeled controls, alt text, and
  no console/page errors.
- Independent axe scans on `/`, `/demo`, `/play`, `/privacy`, `/terms`, and the
  missing-page route found 0 serious or critical issues in both light and dark
  treatments.
- A complete demo prediction was entered and committed with keyboard input.
  Tab starts on the skip link, native radio arrows/Space work, and the commit
  control has a visible 3 px gold outline plus contrasting surround.
- SPA navigation and browser back/forward restore focus to the destination H1
  and announce it in the route live region.
- At 390 px there is no normal-layout horizontal overflow. Every measured
  visible action and form control is at least 44 px high. Full-page home and
  demo screenshots were visually checked with no clipping or overlap.
- At 200% text sizing all content and the commit flow remain available; the
  header adds 7 px of horizontal scroll, and its controls remain reachable.
- With reduced motion, computed smooth scrolling is `auto` and no visible
  element retains an animation or transition longer than 10 ms.
- The nudge action's loss of focus and field state is the exception described
  in the release-blocking defect.

## Privacy, network, and response policy

- Full live landing, demo, practice, and policy flows made same-origin GET
  requests only. There were no third-party, analytics, answer-upload, payment,
  unlock, or inference requests and no console/page errors.
- Demo uses `demo:trace-before-run:progress`; practice uses
  `real:trace-before-run:progress`. A pre-seeded real record stayed byte-for-byte
  unchanged while demo progress was committed.
- Static inspection found no `eval`, dynamic `Function`, remote runtime script,
  embedded key, authentication flow, or server API call.
- HTTPS is enforced with an HTTP 301. Live responses include CSP, HSTS,
  `nosniff`, strict referrer policy, and camera/microphone/geolocation
  restrictions.
- HTML uses `max-age=30, must-revalidate`; hashed JS/CSS use one-year immutable
  caching; `sw.js` uses `no-cache`.
- Rate-limit and Entra checks are not applicable: this static product exposes
  no API/product-unlock endpoint and has no sign-in. Library, CLI, and backend
  consumer/concurrency checks are also not applicable.

## PWA and performance

- The service worker controlled the live page, was `activated`, had no waiting
  worker, and used cache `trace-before-run-v2`.
- The shipped update regression removed a seeded v1 cache. Offline reload after
  a warmed `/demo` visit succeeded and showed the offline status.
- Chromium parsed the web manifest with no manifest or installability errors.
- Fresh Lighthouse mobile: Performance 98, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.1 s, LCP 1.1 s, TBT 180 ms, CLS 0, about 30 KiB initial
  transfer.
- Fresh Event Timing during the answer/commit flow peaked at 56 ms, below the
  200 ms interaction budget.

## Deployment identity

Local `dist/` and live artifacts match exactly:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `9a4a2fcbac1679ecdffde0da14a6ceec64e3c84c940a10392292681cb9081d52` |
| `index--jRYrrXW.js` | `69b0351690a70b2c0b65a1b2c02dc651862942f31eb2dbc84f98de5afe07d259` |
| `index-484PnoQ9.css` | `7b3b86b9af20a40d86f2893bd3e9f4deb3269ab8b33d73844351f61508c29c75` |
| `sw.js` | `12eb5e9cd8b995c4327e80bbcf8afbe06ce7901f67689c45de0e4c3af1b96798` |

All internal links and declared routes return 200. Titles, descriptions,
canonicals, heading outlines, `robots.txt`, `sitemap.xml`, social preview
(1200×630), icons, and the styled missing-page view are present.

## Product and design contract

The five-puzzle prediction-before-reveal mechanic, editable restricted grammar,
local storage, and no-account/free scope match the researched brief. The
product-specific paper-observatory visual system and original asset provenance
are documented in `.factory/design.md`. AI is appropriately absent because the
brief makes an AI hint bot a non-goal and deterministic local tracing is the
core job.

## Required next action

Preserve current field values and the selected path when showing or hiding the
nudge, preserve or deliberately move keyboard focus, and add a browser
regression that fills all predictions, toggles the nudge twice, and proves the
form state remains unchanged. Rebuild, deploy, and rerun independent
verification.
