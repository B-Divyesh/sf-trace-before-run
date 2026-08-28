# Trace Before Run — review 1 handoff

## Result: FAIL — two minor documentation/claims findings

No product code was changed. The requested adversarial first-read review is in
`.factory/review-1.md`.

The live product passed cold mobile/desktop comprehension, the one-click demo,
storage isolation, live offline reload, same-origin network behavior, routing,
focus restoration, link crawl, accessibility checks covered by the suite, and
the earlier-defect regression checks. From a clean clone, all nine commands in
`.factory/claims.json` passed individually; `CI=1 npm test` passed 21/21; and
`npm run build` passed and produced `dist/`.

Two review findings remain:

1. `F-1-1`: one README sentence has 25 words, exceeding the 22-word
   plain-words limit.
2. `F-1-2`: README promises Reset demo behavior without a corresponding
   `claims.json` entry and tagged test, although the existing untagged browser
   test proves the behavior.

## How to verify

```sh
npm ci
npm test
npm run build
```

Use `https://trace-before-run.sociobot.in/demo` for the isolated sample. It
uses `demo:trace-before-run:progress`; normal practice uses the separate
`real:trace-before-run:progress` key.

## Next steps

Shorten or split the 25-word README test-suite sentence. Add a `reset-demo`
claim manifest entry and tag the existing reset test as `@claim:reset-demo`,
then rerun the listed commands and the complete review checklist.
