# Trace Before Run — independent verification handoff

## Result: FAIL

Candidate `9993de3e0555f0f6341156776f28bc6dae8d6a32` was independently verified on
28 August 2026 at `https://trace-before-run.sociobot.in`. The live deployment
is healthy and byte-identical to the local production build, but the candidate
is not releasable.

## Release blocker

**High — showing a nudge silently deletes the learner's in-progress answer.**

On `/demo`, enter `score = 8`, `badge = 1`, printed output `8`, and select
`If path`. Clicking **Show one nudge** changes the three fields from
`["8", "1", "8"]` to empty strings, clears the path selection, and moves focus
to the body. The nudge appears, but there is no warning or undo. This breaks the
core prediction-before-reveal workflow and loses user work.

See `.factory/verification-2.md` for the full evidence and reproduction.

## What was verified

- Required first-read and one-click sample demo: PASS.
- All nine `.factory/claims.json` commands, run separately after `npm ci`: PASS.
- Full local Playwright suite: 20/20 PASS.
- Full live Playwright suite: 20/20 PASS.
- Exact production build and strict TypeScript: PASS.
- Dependency audit: 0 vulnerabilities.
- Normal, wrong-answer, boundary, invalid-input, recovery, and five-puzzle
  flows were exercised; all pass except nudge state preservation.
- Desktop and 390 px mobile, keyboard-only prediction, visible focus, route
  focus, back/forward, reduced motion, dark mode, and 200% text sizing checked.
- Axe on six routes in both themes: 0 serious/critical findings.
- Factory URL verifier: PASS locally and live, with no console/page errors.
- Privacy/storage isolation, outbound requests, CSP/security headers, caching,
  route/link/metadata coverage, service-worker update, offline reload, and web
  manifest checked.
- Fresh Lighthouse mobile: 98 Performance, 100 Accessibility, 100 Best
  Practices, 100 SEO; LCP 1.1 s, TBT 180 ms, CLS 0.
- Local/live SHA-256 identity matched for HTML, JS, CSS, and service worker.

## Run the main verification gates

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

## Required next step

Keep the current inputs and selected path when **Show one nudge** or **Hide the
nudge** rerenders the workbench, and keep meaningful keyboard focus. Add an
end-to-end regression for that state-preservation behavior, deploy the repair,
then rerun independent verification.

No product code was modified during this verification.
