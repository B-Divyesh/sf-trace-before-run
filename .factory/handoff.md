# Trace Before Run — independent verification 3 handoff

## Result: PASS

Candidate `639131118d6c685cee914c329cd22b499a55be46` is live at
`https://trace-before-run.sociobot.in` and matches a fresh local production
build byte-for-byte for HTML, JS, and CSS. Product code was not modified.

All nine claim commands in `.factory/claims.json` passed individually after a
clean `npm ci`; local `npm test` passed 21/21; the exact production
`npm run build` passed; and a repeated full suite against the live URL passed
21/21. The five-puzzle prediction-before-reveal flow, restricted grammar,
demo isolation, privacy behavior, PWA offline/update behavior, 390 px layout,
keyboard use, reduced motion, axe scans, security headers, and cache policy
were independently checked.

Fresh mobile Lighthouse: Performance 93/99, Accessibility 100, Best Practices
100, SEO 100. Build sizes: JS 10.13 KB gzip, CSS 4.64 KB gzip, and mobile hero
AVIF 9.02 KB.

See `.factory/verification-3.md` for exact commands, claim evidence, live
hashes, response policies, test results, and the one non-reproducible live
test timeout observed during the first parallel full-suite pass.

## How to verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

Use `https://trace-before-run.sociobot.in/demo` for the isolated sample. It
stores only `demo:trace-before-run:progress`; normal practice uses a separate
`real:` key.

## Known gaps

None that block release. The interpreter intentionally supports only the
small hand-authored teaching grammar; arbitrary Python execution, accounts,
rankings, and AI hints are deliberate non-goals.
