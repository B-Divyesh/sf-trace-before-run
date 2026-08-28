# Independent product verification 3 — Trace Before Run

## Verdict: PASS

Candidate `639131118d6c685cee914c329cd22b499a55be46` is the checked-out HEAD
and is deployed at `https://trace-before-run.sociobot.in`. Fresh local build
artifacts and the live HTML, JavaScript, and CSS are byte-for-byte identical.
The repaired product meets the researched brief and release contract. Product
code was not changed during this verification.

Verified 28 August 2026 from a clean checkout using Node, Playwright 1.58.2,
and Chromium.

## Mandatory cold first read: PASS

At a cold live load, the first viewport says:

- **What it does:** “Predict Python before you run it.”
- **Who it is for:** “new Python learners who know syntax but lose track of
  changing values.”
- **What to click first:** the visible **Try it with sample data** link; its
  adjacent copy says it loads a ready branch puzzle without sign-in.

One click opens `/demo`, already populated with the “Add the badge” tracing
puzzle and the persistent “Demo — sample data, nothing is saved” banner,
including Reset demo and Start for real controls.

## Claims gate: PASS

`.factory/claims.json` exists. After `npm ci` from this clean candidate,
every declared command was run separately against the product demo entry point
and passed.

| Claim | Exact command | Result |
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

Landing, README, privacy, and demo copy were cross-checked against this
manifest. No material visitor-facing claim lacked a corresponding claim test.

## Local and live quality gates

- `npm ci`: PASS; 22 packages installed, zero audit vulnerabilities reported.
- `npm test`: PASS; 21/21 Playwright tests.
- `npm run build`: PASS; strict `tsc --noEmit` and Vite production build;
  `dist/` produced.
- No separate lint script is configured; strict TypeScript is the available
  static check.
- `npm audit --omit=dev`: PASS; zero vulnerabilities.
- `git diff --check`: PASS before verifier artifacts and reports were written.
- Repeat full live suite:
  `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test -- --workers=2 --reporter=line`:
  PASS, 21/21.

The first full live-suite invocation had one transient timeout in
`@claim:first-difference` after activating Commit. It had no console/page
error, and was not reproducible: the claim then passed 5/5 sequential live
repetitions, the repeat full suite passed 21/21, and 30 independent fresh
live `/demo` wrong-answer flows all revealed “score ends as 8”. This is
recorded for transparency, but is not a reproducible product defect; the
mandatory individual claim gate passed before it.

Production output is well within static-web budgets:

- JavaScript: 29.44 KB raw / 10.13 KB gzip.
- CSS: 16.72 KB raw / 4.64 KB gzip.
- Small hero: 9.02 KB AVIF / 14.03 KB WebP.
- Fonts: 0 bytes (system stacks).

Fresh mobile Lighthouse runs scored Performance 93 and 99, Accessibility 100,
Best Practices 100, and SEO 100. The two runs measured FCP 2.4/1.6 s, LCP
2.8/2.0 s, TBT 0 ms, CLS 0, and 30 KiB transfer. The first LCP is a marginal
lab outlier; the repeat meets the 2.5 s target and both meet the required
performance score.

## Product behavior and input recovery: PASS

- Correct predictions remain hidden until commit and then reveal a line trace.
- A deliberately wrong final `score` reports the first difference; Change my
  prediction returns focus to the score field.
- Empty and non-whole-number input give specific errors and focus the field;
  correcting the value permits commit.
- `import os` is rejected and disables commit. The accepted boundary
  `range(20)` refreshed to “Loop 20 times” and completed correctly;
  `range(21)` showed “range() must be between 0 and 20.” and disabled commit.
- Editing a supported branch/loop refreshes path choices. Restore puzzle,
  reset demo, Start for real, privacy-page clearing, keyboard radio choice,
  and all five normal-practice puzzles work.
- The nudge preserves the three in-progress predictions, selected path, and
  focus when opened and closed.

The deterministic restricted interpreter, prediction-before-reveal mechanic,
five original puzzles, no-account/free scope, and no arbitrary Python
execution all match the researched brief.

## Accessibility, visual, and responsive checks: PASS

`/opt/fleet/lib/verify-url.sh` passed on live `/` and `/demo`: HTTPS 200,
title, `lang=en`, one H1, main landmark, image alt text, labeled controls, and
no browser console/page errors. Evidence is in
`.factory/evidence/verification-3/`.

Independent axe scans found zero serious/critical violations on `/`, `/demo`,
`/play`, `/privacy`, `/terms`, and `/missing-page`; the dark treatment also
passed. The 390 px demo had no horizontal overflow (`390/390` scroll/client
width) and its demo controls were 44 px high. Desktop and mobile screenshots
were visually inspected: no clipping or overlap was found.

Keyboard testing confirmed the skip link receives the first Tab focus, with a
visible 3 px gold focus ring; native radio Arrow/Space behavior and Enter
commit work. Reduced-motion mode caps computed transitions at 0.00001 seconds.

## Privacy, PWA, deployment, and policy: PASS

- A completed demo/practice browser flow made only same-origin GET requests;
  there were no third-party scripts, analytics, code/answer uploads, remote
  inference, account, payment, or authentication requests. Demo writes only
  `demo:trace-before-run:progress`; real progress has the separate `real:`
  namespace when practice is completed.
- The warmed live `/demo` reloaded offline with the offline status. The service
  worker update check removed a seeded old cache, activated `trace-before-run-v2`,
  and left no waiting worker.
- HTTP redirects to HTTPS (301). Live responses include CSP, HSTS, nosniff,
  strict referrer policy, and camera/microphone/geolocation restrictions.
  HTML is `max-age=30, must-revalidate`; hashed assets are one-year immutable;
  `sw.js` is `no-cache`.
- `/`, `/demo`, `/play`, `/privacy`, `/terms`, `/missing-page`, manifest,
  robots, sitemap, and service worker all return 200. Rate-limit, Entra,
  library/CLI, and backend checks are not applicable: this is a static product
  with no server-side API or sign-in.

Live/local SHA-256 identity:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `9b05d91d8140af332b0dc729a3f5a517a88de8e6163961c07db1198248840a76` |
| `index-u8u5VJsv.js` | `4d72beae0f8ad409b2157376bfe88ba2965729a3c85ab8d1e5929f583dc49d09` |
| `index-BTCcgg7Z.css` | `d5864e585eda68c0df83b0988bdfbbd915fea80dbfacd4547fa5291d6999f1b8` |

## Defects by severity

No reproducible release-blocking, high, medium, or low defects found.

## Handoff

PASS for candidate `639131118d6c685cee914c329cd22b499a55be46` at
`https://trace-before-run.sociobot.in`.
