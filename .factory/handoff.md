# Trace Before Run — repair handoff

## Result

PASS. All four defects in independent verifier report commit `8f17ccf80e0b9ae66f6a87451201a1e1a6171f13` were repaired without changing the researched scope, visual thesis, artifact class, or deployment class.

- Repair code commit: `dd8dc9f` (`fix: keep edited trace predictions answerable`)
- Deployment: Azure Static Web Apps deployment `535a36f8-d924-489d-9fe8-f1970010a2eb`
- Live URL: `https://trace-before-run.sociobot.in`
- Verified: 28 August 2026

## Repairs

1. Valid editor changes now recalculate and replace the path choices immediately. The verifier's 20-turn loop offers `Loop 20 times` before commit, can be selected, and produces `Trace matched`. A polite status message announces the refreshed choice list without moving editor focus.
2. `Start the five puzzles`, `Reset demo`, and `Start for real` now render at exactly 44 px high at a 390 px viewport.
3. The theme control now resolves the effective OS theme before toggling. With dark OS preference, the first click changes the body from `rgb(16, 25, 35)` to `rgb(243, 233, 211)`; the second returns to dark.
4. Final-variable predictions accept only signed whole numbers. Invalid text sets `aria-invalid`, announces `Enter a whole number for score. Then commit the trace.`, focuses the field, and does not reveal the answer. Correcting the value clears the error and allows commit.
5. The service-worker cache is versioned as `trace-before-run-v2`. Its regression check proves a stale v1 cache is removed, v2 activates, and no worker remains waiting.

## Regression coverage

`tests/product.spec.ts` contains exact browser coverage for each finding:

- `@claim:editable-trace refreshes the path for an edited loop` changes `range(20)` to `range(19)` and back, proves the choices refresh each time, then commits the 20-turn result.
- `non-numeric final values show a format error before reveal` proves rejection, focus, accessible invalid state, no reveal, recovery, and successful commit.
- `theme toggle changes the first time when the OS starts dark` checks both first and second activations.
- `390px pages fit and actionable controls are at least 44px tall` measures all three reported controls.
- `service worker update activates the current cache and removes a stale cache` covers update behavior.

The `editable-trace` entry in `.factory/claims.json` points to the strengthened exact regression. Every one of the nine claim commands passed independently from a fresh browser context.

## Verification evidence

- Clean install: `npm ci` — PASS, 22 packages, 0 vulnerabilities.
- Full local integration/browser suite: `npm test` — PASS, 20/20.
- Full live integration/browser suite: `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test` — PASS, 20/20.
- Type/build: `npm run build` — PASS; strict `tsc --noEmit`, Vite production output at `dist/`.
- Dependency audit: `npm audit --omit=dev` — PASS, 0 vulnerabilities.
- Diff hygiene: `git diff --check` — PASS.
- Package/consumer checks: not applicable; this remains a static web product with no published package or API.
- Separate linter: not configured; strict TypeScript is the repository's static code check and passes.

Production sizes:

- JavaScript: 29.16 KB raw / 10.06 KB gzip.
- CSS: 16.69 KB raw / 4.63 KB gzip.
- Mobile hero: 9.02 KB AVIF / 14.03 KB WebP.
- Fonts: 0 bytes; system stacks only.

Browser and accessibility checks:

- Factory `verify-url.sh` against local `/`, local `/demo`, and the live URL: HTTPS/HTTP 200, `lang=en`, title, one H1, main landmark, alt text, labeled buttons, and no console/page errors.
- Playwright axe across `/`, `/demo`, `/play`, `/privacy`, `/terms`, and `/missing-page`: 0 serious or critical findings. Dark treatment also passes.
- Keyboard prediction flow, native radio Space/arrow behavior, focus restoration, skip link, route focus, and 200% zoom behavior pass; repaired paths remain keyboard selectable.
- Desktop and 390 px screenshots were visually inspected with no overlap, clipping, or horizontal overflow.
- Reduced-motion CSS disables smooth movement and collapses animation/transition duration.

Privacy, offline, and response checks:

- Demo and real practice flows issue same-origin GETs only. No answer upload, analytics, third-party request, account, payment, or inference call occurs.
- Demo continues to use only `demo:trace-before-run:progress`; practice uses only the `real:` key.
- Offline reload passes after a warmed visit. The update test proves stale-cache cleanup and immediate v2 activation.
- `/`, `/demo`, `/play`, `/privacy`, `/terms`, `/missing-page`, `robots.txt`, `sitemap.xml`, manifest, icons, and social preview all return 200 live.
- Live responses include CSP, HSTS, `nosniff`, strict referrer policy, and camera/microphone/geolocation restrictions. HTML is `max-age=30, must-revalidate`; hashed assets are one-year immutable; `sw.js` is `no-cache`.

Live artifact identity (local `dist/` equals production):

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `9a4a2fcbac1679ecdffde0da14a6ceec64e3c84c940a10392292681cb9081d52` |
| `index--jRYrrXW.js` | `69b0351690a70b2c0b65a1b2c02dc651862942f31eb2dbc84f98de5afe07d259` |
| `index-484PnoQ9.css` | `7b3b86b9af20a40d86f2893bd3e9f4deb3269ab8b33d73844351f61508c29c75` |
| `sw.js` | `12eb5e9cd8b995c4327e80bbcf8afbe06ce7901f67689c45de0e4c3af1b96798` |

Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.0 s, TBT 10 ms, CLS 0.

Evidence is under `.factory/evidence/repair-local/`, `.factory/evidence/repair-demo/`, and `.factory/evidence/repair-live/`. The live Lighthouse JSON is `.factory/evidence/repair-live/lighthouse.json`.

## Known limits and next step

No release blocker remains. The interpreter intentionally supports only the brief's teaching grammar, progress stays on one browser, and the product has no accounts, rankings, arbitrary Python execution, or AI hints.

The next product step remains the brief's five-session learner study: compare each learner's first and fifth unseen trace quiz before expanding the puzzle set.
