# Trace Before Run — polish 1 handoff

## Result: PASS locally; deployment verification follows this repair

This repair closes both findings in `.factory/review-1.md`:

- `F-1-1`: the README test-suite sentence is now 18 words. The count is in
  `.factory/copy-audit.md`.
- `F-1-2`: reset is now the declared `reset-demo` claim. Its tagged test proves
  reset restores the seeded sample, removes only demo progress, and leaves a
  real-progress sentinel byte-for-byte unchanged.

`.factory/polish-1.md` maps each finding to its change and evidence. The
catalog description is the verb-first sentence “Predict Python traces before
you run them.”

## Local verification evidence

- `npm ci`: PASS; 22 packages installed and npm reported zero vulnerabilities.
- `npm test -- --grep @claim:reset-demo`: PASS, 1/1.
- Every manifest claim command was invoked separately after installation:
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
