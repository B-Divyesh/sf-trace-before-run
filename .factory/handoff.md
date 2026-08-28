# Trace Before Run — polish round 3 handoff

## Result

PASS. Every finding in `.factory/review-1.md`, `.factory/review-2.md`, and
`.factory/review-3.md` is fixed, including every minor item. The released site
is [trace-before-run.sociobot.in](https://trace-before-run.sociobot.in/).

## What changed

- Added per-history-entry scroll coordinates. Back and Forward now restore the
  prior position, focus the route H1 without moving the viewport, and announce
  the route.
- Added the `clear-progress` manifest claim and a browser test that seeds and
  removes both storage namespaces while auditing requests and the status text.
- Replaced the learning-efficacy heading with “Trace in three moves.”
- Removed the unverified “original” adjective from the README puzzle sentence.
- Updated the complete copy audit and the 81-character, verb-first catalog
  description.
- Preserved the isolated one-click `/?demo=1` sample, banner, reset, Start for
  real action, route metadata, legal pages, styled HTTP 404, mobile layout, and
  the paper-observatory visual system.

The finding-by-finding map is in `.factory/polish-3.md`. Repair commit:
`784ea6ab54f4168789225cd7ce07ec353f5e10ea`.

## How to run

```sh
npm ci
npm run dev
```

Open `http://localhost:5173`. The clean sample entry is
`http://localhost:5173/?demo=1`.

## How to verify

```sh
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

From a fresh clone of the repair commit:

- `npm ci`: passed, 22 packages, zero vulnerabilities.
- Every `.factory/claims.json` command: passed individually, 12/12.
- `CI=1 npm test`: passed, 27/27.
- `npm run build`: passed and produced `dist/index.html`.
- `npm audit --omit=dev`: passed with zero vulnerabilities.
- Build size: JavaScript 30.46 KB raw / 10.39 KB gzip; CSS 16.73 KB raw /
  4.65 KB gzip.

After deployment:

- Deployment ID: `527deedc-93af-4cb5-a489-cd0f153f047a`.
- Live suite: 27/27 passed, including every claim, offline reload, keyboard,
  serious/critical Axe scans, 390 px targets, history, privacy, and 404 checks.
- Factory cold verifier: `/`, `/?demo=1`, and `/privacy` each passed title,
  language, H1, main, alt text, control-label, and console checks.
- Cold history evidence restored landing `2184 → 2184` and practice
  `420 → 420`; route H1 focus remained correct.
- Demo reset removed only `demo:trace-before-run:progress`, restored the seeded
  puzzle, and preserved the real sentinel byte-for-byte.
- Clear progress removed both storage keys, announced success, and made no
  external or non-GET request.
- All known routes/resources returned 200; `/not-a-real-route` returned 404.
- Live/local SHA-256 hashes match for HTML, JavaScript, CSS, and `sw.js`.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; FCP 0.9 s, LCP 1.1 s, TBT 10 ms, CLS 0.

Evidence lives in `.factory/evidence/polish-3-live/`, including cold desktop
and mobile screenshots, verifier JSON, finding state, surface crawl, hashes,
and the Lighthouse report.

## Known gaps and next steps

None. No review finding, deferred minor item, stub, or TODO remains.
