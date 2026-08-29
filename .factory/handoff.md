# Trace Before Run — polish 4 handoff

## Result

All findings from adversarial reviews 1–4 are closed. The repaired static site
is deployed at <https://trace-before-run.sociobot.in/>. The one-click isolated
sample remains at <https://trace-before-run.sociobot.in/?demo=1>.

## What changed

- Removed the unlisted “Original generated art.” footer claim. Internal asset
  provenance remains recorded in `.factory/design.md`.
- Expanded `@claim:open-access` to finish all five puzzles and reach the 5/5
  session result. It checks every puzzle and reveal for account or payment
  controls, and rejects external or non-GET requests.
- Updated the `open-access` sandbox description in `.factory/claims.json`.
- Updated the verb-first catalog line to 81 characters: “Trace Python by
  predicting values, paths, and output before revealing the result.”
- Updated the round 4 copy audit and retained every earlier fix for demo
  isolation, first-screen fit, privacy, routing, focus, 404s, and mobile use.

The visual system and artifact class are unchanged: this is still the static,
framework-free paper-observatory experience described in `.factory/design.md`.

## Verification evidence

Repair commit: `3c93f97e063dccf1f678623f4a7528fda4c3e5fc`

Test-hardening commit: `05e832091cbabf9d3007628026c496939341b6cb`

Deployment ID: `9ec45c03-6eb0-490f-a0f4-815b662d7a9f`

Clean clone: `/tmp/trace-polish-4-clean.ry71rT` at the test-hardening commit.

- `npm ci`: passed; 22 packages installed and zero vulnerabilities.
- Every `.factory/claims.json` command: 12/12 passed separately.
- `CI=1 npm test`: 27/27 passed.
- `npm run build`: passed and produced `dist/index.html`.
- `npm audit --omit=dev`: zero vulnerabilities.
- Build size: application JS 30.42 KB raw / 10.38 KB gzip; CSS 16.73 KB raw /
  4.65 KB gzip.
- Live `CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm
  test`: 27/27 passed.
- Live `@claim:open-access` with the final assertions: 1/1 passed.
- `/opt/fleet/lib/verify-url.sh` passed for `/`, `/?demo=1`, and `/privacy`.
  Each check found one H1, a main landmark, no missing alt text, no unlabeled
  buttons, and no console errors.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; FCP 0.90 s, LCP 1.05 s, TBT 12 ms, CLS 0.
- Live routes: `/`, `/demo`, `/play`, `/privacy`, and `/terms` return 200.
  `/not-a-real-route` returns 404 with the designed recovery page.
- Live headers include the self-only CSP, `nosniff`, strict referrer policy,
  and a restrictive permissions policy.
- SHA-256 values match between `dist/` and production for `index.html`, the
  hashed JavaScript, the hashed CSS, and `sw.js`.

Screenshots, URL reports, Lighthouse output, and detailed live observations are
under `.factory/evidence/polish-4-live/`. The finding-by-finding evidence map is
in `.factory/polish-4.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

## Known gaps

None within the researched scope or cumulative review record.

## Next steps

No product work remains for this round. The factory can retain the current
static deployment and use the demo URL for catalog verification.
