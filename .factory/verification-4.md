# Independent product verification 4 — Trace Before Run

## Verdict: PASS

Candidate `b2f55b98f246e054c5d69463bcaebe5ba128514f` is deployed at
<https://trace-before-run.sociobot.in>. Fresh production output matches the
live `index.html`, JavaScript, CSS, and `sw.js` byte-for-byte. The reported
deployment-only concern did not reproduce: the deployment is healthy and is
serving this exact candidate.

Verified independently on 29 August 2026 from the clean checkout at
`/work/repo`. No product code was changed.

## Mandatory first-read and demo: PASS

A cold live load answers the required questions in the first viewport:

- **What it does:** “Predict Python before you run it.”
- **Who it is for:** new Python learners who know syntax but lose track of
  changing values.
- **What to do first:** the visible **Try it with sample data** action,
  followed by “Loads a ready branch puzzle. No sign-in.”

The action opens the seeded `Add the badge` exercise in one click at
`/?demo=1` / `/demo`. It shows the persistent “Demo — sample data, nothing is
saved” banner and its Reset demo and Start for real controls.

## Claims gate: PASS

`.factory/claims.json` exists. After clean `npm ci`, every listed command was
run individually through the product demo entry point. All passed (1/1 each):

| Claim | Exact command |
| --- | --- |
| `prediction-reveal` | `npm test -- --grep @claim:prediction-reveal` |
| `restricted-grammar` | `npm test -- --grep @claim:restricted-grammar` |
| `editable-trace` | `npm test -- --grep @claim:editable-trace` |
| `demo-isolated` | `npm test -- --grep @claim:demo-isolated` |
| `reset-demo` | `npm test -- --grep @claim:reset-demo` |
| `clear-progress` | `npm test -- --grep @claim:clear-progress` |
| `local-only` | `npm test -- --grep @claim:local-only` |
| `no-tracking` | `npm test -- --grep @claim:no-tracking` |
| `open-access` | `npm test -- --grep @claim:open-access` |
| `first-difference` | `npm test -- --grep @claim:first-difference` |
| `five-puzzles` | `npm test -- --grep @claim:five-puzzles` |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` |

Landing, demo, privacy, terms, and README claims were cross-checked against
the manifest. No material unlisted visitor claim was found.

## Local and live quality gates: PASS

- `npm ci`: passed; 22 packages installed and `npm audit --omit=dev` reported
  zero vulnerabilities.
- Local full suite: `npx playwright test --workers=1 --reporter=json` passed
  **27/27** in 64.2 seconds.
- Live full suite: `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in
  npx playwright test --workers=1 --reporter=json` passed **27/27** in 62.8
  seconds.
- `npm run build`: passed (`tsc --noEmit` plus Vite) and produced `dist/`.
  There is no separate lint script.
- `git diff --check`: passed before verification documentation was written.
- Production bundle: JavaScript 30.42 KB raw / 10.37 KB gzip; CSS 16.73 KB
  raw / 4.65 KB gzip; no downloaded fonts. This is within the static-web
  200 KB JavaScript and 50 KB CSS budgets.
- Fresh mobile Lighthouse: Performance 90, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.0 s, LCP 1.1 s, TBT 420 ms, CLS 0, 30 KiB transfer.

## End-to-end and recovery checks: PASS

- Completed the seeded demo and all five real practice puzzles without an
  account, payment, or access gate.
- Correct answers stay hidden until commit; an intentionally wrong final value
  explains the first differing field and returns focus to it on retry.
- Editing supported code updates the offered path immediately. The independently
  tested 20-turn loop exposes `Loop 20 times` before commit and reveals the
  correct trace.
- Unsupported import, tab indentation, `range(21)`, division by zero, and a
  >500-character snippet each showed a specific recovery error and blocked
  commit. Restore puzzle returned the seeded code.
- Demo reset, Start for real, clearing both storage namespaces, malformed-code
  recovery, and the nudge all preserved their documented state behavior.

## Accessibility, responsive, and PWA checks: PASS

- `/opt/fleet/lib/verify-url.sh` passed independently on live `/`, `/demo`,
  and `/privacy`: HTTPS 200, title, `lang=en`, one H1, main landmark, image
  alt text, labeled buttons, and no browser console/page errors.
- Independent Playwright axe scans on `/`, `/demo`, `/play`, `/privacy`,
  `/terms`, and the 404 route found **zero serious or critical** violations.
  (The standalone axe CLI could not start its Selenium ChromeDriver in this
  container; the repository’s Playwright axe integration and the independent
  Playwright scans both ran successfully.)
- At 390 px, all checked routes had `scrollWidth === clientWidth`; the demo
  controls and landing practice action met the 44 px target. Desktop and
  mobile screenshots were visually inspected without clipping or overlap.
- Keyboard starts at the skip link; keyboard focus has the visible 3 px gold
  outline and contrasting 5 px ink surround. Radio Arrow/Space and Enter
  commit work. Reduced-motion reports `scroll-behavior: auto`.
- After a warm live `/demo` visit, offline reload retained the demo puzzle,
  showed the offline status, and remained service-worker controlled. The
  suite also verified stale-cache deletion and an activated `trace-before-run-v3`
  worker with no waiting worker.

## Privacy, headers, and deployment identity: PASS

- A full live demo flow observed only same-origin GET requests (`/demo`, the
  hashed JS, and CSS); no third-party, analytics, beacon, answer-upload,
  payment, unlock, or inference request occurred. There were no cookies or
  console/page errors. Demo persisted only
  `demo:trace-before-run:progress`; real practice uses the separate `real:`
  namespace.
- Live responses have the self-only CSP, HSTS, `nosniff`, strict referrer
  policy, and disabled camera/microphone/geolocation. HTML is
  `max-age=30, must-revalidate`; hashed JS/CSS are one-year immutable; `sw.js`
  is `no-cache`.
- SHA-256 identity between `dist/` and live:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `34359d14e36dd4d829e7fff68a347c3e3c163320f29d44d6a15338284420d306` |
| `index-B6CYkatj.js` | `5b847acace357976097f1665803b8dff7799ac73bebeb021f5a1ece9cfc22c06` |
| `index-x8kGLZ5a.css` | `b07bd63b2b346907ef886ee332ecc383ada897d87768da850f4bf148a69d421b` |
| `sw.js` | `b11157881184f73a1dfdfc0751b492398586daf87fd03b38c5f41f650bbf628c` |

`/`, `/demo`, `/play`, `/privacy`, `/terms`, manifest, robots, sitemap, and
service worker return 200. The deliberately missing route returns the designed
404 response. This is static-only: it has no server-side API, product-unlock
endpoint, sign-in, or backend, so rate-limit, Entra, concurrency, persistence,
and library/CLI consumer checks are not applicable.

## Defects by severity

No reproducible critical, high, medium, or low defects found.

