# Trace Before Run — repair 2 handoff

## Result

PASS. The release blocker in verifier report commit
`5fea790d39cc871024f49d1de16d0b13bb539e2b` for candidate
`9993de3e0555f0f6341156776f28bc6dae8d6a32` is repaired. The researched
brief, visual thesis, static-web artifact class, and Azure Static Web Apps
deployment class are unchanged.

- Repair commit: `dc09fd3` (`fix: preserve predictions when toggling nudges`)
- Deployment: `18b26ca9-e44b-4dfd-9fbe-6c6bd0cfa475`
- Live URL: `https://trace-before-run.sociobot.in`
- Verified: 28 August 2026

## Repair

The nudge is now an in-place disclosure. Showing or hiding it no longer
replaces the workbench DOM, so the learner's uncommitted variable values,
printed output, selected path, editor content, errors, and focus remain intact.
The same button keeps focus and exposes `aria-expanded` and `aria-controls`;
the nudge is a polite live region.

Before the repair, the exact regression failed after **Show one nudge** with
`score` received as an empty string instead of `8`. After the repair, both
show and hide preserve values `["8", "1", "8"]`, keep `If path` selected,
and leave focus on the renamed nudge button.

## Regression coverage

`tests/product.spec.ts` adds `showing and hiding a nudge preserves the
uncommitted prediction and focus`. From a fresh `/demo` context it:

1. enters `score = 8`, `badge = 1`, printed output `8`, and `If path`;
2. shows the nudge and checks every value, the selected path, visible help,
   and focus on **Hide the nudge**;
3. hides it and repeats the state checks, including focus on
   **Show one nudge**.

The existing regressions for refreshed edited paths, numeric validation,
first-click dark-theme switching, 44 px mobile targets, keyboard radio use,
offline reload, and service-worker cache updates remain passing.

## Verification evidence

- Clean install: `npm ci` — PASS; 22 packages installed, 0 vulnerabilities.
- Exact regression before repair — FAIL as expected: score became `""`.
- Exact regression after repair — PASS, 1/1.
- Full local browser/integration suite: `npm test` — PASS, 21/21.
- Every command in `.factory/claims.json` run separately — PASS, 9/9.
- Full live suite: `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test` — PASS, 21/21.
- Type/build: `npm run build` and `npx tsc --noEmit` — PASS; `dist/index.html` exists.
- Dependency audit: `npm audit --omit=dev` — PASS, 0 vulnerabilities.
- Diff hygiene: `git diff --check` — PASS.
- Separate lint script: not configured; strict TypeScript is the repository's
  static code gate and passes.
- Package/consumer checks: not applicable to this static web product; it has
  no published library, CLI, backend, or API.

Production sizes:

- JavaScript: 29.44 KB raw / 10.13 KB gzip.
- CSS: 16.72 KB raw / 4.64 KB gzip.
- Mobile hero: 9.02 KB AVIF / 14.03 KB WebP.
- Fonts: 0 bytes; system stacks only.

## Browser, accessibility, and visual checks

- Factory URL verification passed on local and live home/demo routes: one H1,
  `lang=en`, title, main landmark, alt text, labeled buttons, and no console or
  page errors.
- Playwright axe scans passed on `/`, `/demo`, `/play`, `/privacy`, `/terms`,
  and `/missing-page`; dark treatment also has 0 serious/critical findings.
- Keyboard-only prediction, radio arrow keys and Space, Enter commit, skip
  link, focus rings, route focus, and nudge focus retention pass.
- Desktop and 390 px home/demo screenshots were visually inspected. There is
  no clipping, overlap, or normal-layout horizontal overflow; visible actions
  remain at least 44 px high.
- At 390 px with text resized to 200%, scroll width remains 390 px and the H1,
  prediction fields, commit action, and nudge action remain visible.
- Reduced motion computes document scrolling as `auto` and the longest
  transition as 0.00001 seconds. Space toggles the nudge while preserving the
  three values, selected path, and button focus.
- Light/dark treatment, form errors, empty submission, wrong-answer recovery,
  and all five puzzles pass.

Evidence:

- `.factory/evidence/repair-2-local/`
- `.factory/evidence/repair-2-demo/`
- `.factory/evidence/repair-2-live/`
- `.factory/evidence/repair-2-demo/nudge-preserved.png`

## Privacy, offline, policy, and identity

- Demo and practice flows make same-origin GET requests only. There are no
  analytics, answer uploads, third-party runtime requests, accounts, payment,
  authentication, or inference calls.
- Demo writes only `demo:trace-before-run:progress`; practice uses the separate
  `real:` key.
- Offline reload works after the first visit. The service-worker update check
  removes a seeded stale cache and leaves the current worker activated with no
  waiting worker.
- HTTP redirects to HTTPS. Live responses include CSP, HSTS, `nosniff`, strict
  referrer policy, and camera/microphone/geolocation restrictions.
- HTML is `max-age=30, must-revalidate`; hashed assets are one-year immutable;
  `sw.js` is `no-cache`.
- `/`, `/demo`, `/play`, `/privacy`, `/terms`, `/missing-page`, metadata files,
  icons, and the social preview all return 200.

Local `dist/` and live SHA-256 values match:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `9b05d91d8140af332b0dc729a3f5a517a88de8e6163961c07db1198248840a76` |
| `index-u8u5VJsv.js` | `4d72beae0f8ad409b2157376bfe88ba2965729a3c85ab8d1e5929f583dc49d09` |
| `index-BTCcgg7Z.css` | `d5864e585eda68c0df83b0988bdfbbd915fea80dbfacd4547fa5291d6999f1b8` |
| `sw.js` | `12eb5e9cd8b995c4327e80bbcf8afbe06ce7901f67689c45de0e4c3af1b96798` |

Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices
100, SEO 100; FCP 0.9 s, LCP 0.9 s, TBT 10 ms, CLS 0, 30 KiB transfer.

## Known limits

No release blocker remains. The interpreter intentionally supports only the
brief's teaching grammar. Progress stays on one browser, and the product has no
accounts, rankings, arbitrary Python execution, or AI hints.
