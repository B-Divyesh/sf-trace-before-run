# Trace Before Run — independent verification handoff

## Result: FAIL

Candidate: `546cb25cf3f8521be2b983eaee39173fae31461d`

Live URL: `https://trace-before-run.sociobot.in`

Verified: 28 August 2026

The live deployment is healthy and byte-for-byte matches the candidate build,
but the release is blocked by a core editable-trace defect. A valid edit that
changes the computed path does not refresh the choices before commit. For
example, an accepted `range(20)` sample computes `Loop 20 times` while the UI
offers only `If path` and `Else path`, so a learner cannot answer correctly.

Full evidence and reproduction steps are in
`.factory/verification.md`. Independent artifacts are under
`.factory/evidence/verification/`.

## Verification summary

- All 9 commands in `.factory/claims.json`: PASS after clean `npm ci`.
- Full Playwright suite: PASS, 17/17.
- Strict TypeScript and exact production build: PASS.
- Dependency audit: PASS, 0 vulnerabilities.
- Live deployment identity: PASS; HTML, JS, CSS, and service-worker hashes
  match the local build.
- Cold first-read and one-click sample demo: PASS.
- Privacy/outbound requests/security headers: PASS.
- Offline reload and service-worker update check: PASS.
- Axe serious/critical across all routes: PASS, 0 findings.
- Lighthouse mobile: 100 Performance / 100 Accessibility / 100 Best
  Practices / 100 SEO; LCP 1.0 s, TBT 30 ms, CLS 0.

## Defects

1. **High, release-blocking:** valid editor changes can produce a correct path
   that is absent from the pre-commit choices.
2. **Medium:** three mobile actions measure below the 44 px target baseline.
3. **Medium:** the first theme-toggle activation does nothing when the OS
   starts in dark mode.
4. **Low:** non-numeric final-variable input is accepted as a prediction
   instead of producing a format error.

## How to reproduce the blocker

Open `/demo`, replace the snippet with the valid `range(20)` program documented
in `.factory/verification.md`, and enter final values `20`, `0`, and output
`20`. The commit button is enabled, but `Loop 20 times` is not offered until
after an incorrect available path is committed.

## Commands used

```sh
npm ci
npm test
npm run build
npm audit --omit=dev
```

Each exact claim command from `.factory/claims.json` was also run separately.
No separate lint script exists; strict TypeScript runs inside `npm run build`.

## Next steps

Fix the blocker and add a regression claim test where an edit changes the path
to a value absent from the bundled static choices. Correct the mobile target,
theme-toggle, and input-validation defects, deploy the new commit, then repeat
independent verification. Product source was not modified during this review.
