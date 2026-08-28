# Trace Before Run — polish 1 handoff

## Result: PASS — repair deployed and rechecked cold

This repair closes both findings in `.factory/review-1.md`:

- `F-1-1`: the README test-suite sentence is now 18 words. The count is in
  `.factory/copy-audit.md`.
- `F-1-2`: reset is now the declared `reset-demo` claim. Its tagged test proves
  reset restores the seeded sample, removes only demo progress, and leaves a
  real-progress sentinel byte-for-byte unchanged.

`.factory/polish-1.md` maps each finding to its change and evidence. The
catalog description is the verb-first sentence “Predict Python traces before
you run them.”

Repair commit: `03f2efc07a9b74662bd1d4384eea14a4fec355ed`
(`fix: close review copy and demo reset claims`), pushed to `origin/main`.

## Clean-clone verification evidence

- Fresh clone: `/tmp/trace-before-run-clean.YhPp0c` at the repair commit.
- `npm ci`: PASS; 22 packages installed and npm reported zero vulnerabilities.
- Every manifest claim command was invoked separately after installation;
  every command passed 1/1:
  `prediction-reveal`, `restricted-grammar`, `editable-trace`,
  `demo-isolated`, `reset-demo`, `local-only`, `open-access`,
  `first-difference`, `five-puzzles`, and `offline-reload`. Each passed 1/1.
- `CI=1 npm test`: PASS, 21/21 Playwright tests. This includes keyboard,
  route/focus, dark mode, 390 px, offline, privacy/network, and axe serious /
  critical coverage.
- `npm run build`: PASS; strict TypeScript plus Vite produced `dist/index.html`.
  Build output: JavaScript 29.44 KB raw / 10.13 KB gzip; CSS 16.72 KB raw /
  4.64 KB gzip. Both are within the static-web budget.
- `git diff --check`: PASS before the repair commit.

## Live deployment evidence

- `https://trace-before-run.sociobot.in/`: cold 200 check passed in 1,250 ms;
  title, `lang=en`, one h1, main, alt text, labeled buttons, and zero console
  or page errors. See `.factory/evidence/polish-1-live/verify.json` and its
  desktop/mobile screenshots.
- `https://trace-before-run.sociobot.in/demo`: cold 200 check passed in 753 ms;
  route title is `Demo — Trace Before Run`, with one h1, main, and zero browser
  errors. See `.factory/evidence/polish-1-live/demo/verify.json` and its
  desktop/mobile screenshots.
- `PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in CI=1 npm test`:
  PASS; `test-results/.last-run.json` records `status: passed` with no failed
  tests. The live `@claim:reset-demo` and `@claim:offline-reload` commands
  also passed individually, 1/1 each.
- The suite's Axe coverage found zero serious or critical issues across `/`,
  `/demo`, `/play`, `/privacy`, `/terms`, the 404 route, and dark treatment.

## Demo and operation

Use `https://trace-before-run.sociobot.in/demo` or `/?demo=1` for the one-click
sample. The persistent banner offers Reset demo and Start for real. Demo uses
`demo:trace-before-run:progress`; normal practice uses the separate
`real:trace-before-run:progress` key. Reset deletes only the demo key.

```sh
npm ci
npm test
npm run build
```

No known product gaps remain. The product stays a static Vite + TypeScript
site; deployment is the factory's Azure Static Web Apps work order.
