# Trace Before Run — verification 4 handoff

## Result: PASS

Independent verification accepted candidate
`b2f55b98f246e054c5d69463bcaebe5ba128514f` at
<https://trace-before-run.sociobot.in>. The deployed HTML, JS, CSS, and
service worker exactly match the fresh candidate build. The earlier
deployment-only concern did not reproduce.

## What was verified

- All 12 required claim commands passed individually from the demo entry point.
- Local and deployed full Playwright suites passed 27/27.
- Production build, strict TypeScript check, audit, bundle budgets, live
  headers, same-origin privacy behavior, PWA offline reload/update, keyboard,
  390 px layout, reduced motion, first-read, and axe serious/critical scans
  passed.
- The product meets the researched brief: a free, local, five-puzzle,
  prediction-before-reveal tracing drill with editable restricted grammar and
  no arbitrary Python execution.

Full evidence, exact commands, hashes, scores, and severity assessment are in
`.factory/verification-4.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

## Known gaps and next steps

No reproducible release defects or remaining product work within the researched
scope. The factory may retain this static deployment and use
`https://trace-before-run.sociobot.in/?demo=1` for catalog verification.
