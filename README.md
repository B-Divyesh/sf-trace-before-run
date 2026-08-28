# Trace Before Run

Predict short Python traces before seeing the result.

Trace Before Run is a free browser drill for beginning Python learners. Five original puzzles ask for final variable values, the branch path, and printed output. The learner commits a prediction before the line-by-line trace appears. A wrong answer points to the first differing final field.

The editor interprets a small teaching grammar. It never executes arbitrary Python. Practice progress stays in browser storage, and the app works offline after the first visit.

## Try the demo

Open [the sample-data demo](https://trace-before-run.sociobot.in/?demo=1), or use `http://localhost:5173/?demo=1` during local development. The demo starts on the “Add the badge” puzzle and stores progress under a separate `demo:` key. “Reset demo” returns to the seeded state without changing practice progress.

## Run locally

Requirements: Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:5173`. Use `/play` for normal practice or `/demo` for the isolated sample.

## Test and build

```sh
npm test
npm run build
```

The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. The production build lands in `dist/` with `index.html` at its root.

Run the same suite against the deployed product with:

```sh
PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test
```

## Supported teaching grammar

- Whole-number assignments with `+`, `-`, `*`, `//`, and `%`
- Comparisons in `if` / `else` blocks
- `for name in range(number)` loops, capped at 20 turns
- `print(expression)`

This is deliberately not a Python runtime. Accounts, rankings, arbitrary code execution, and AI-generated hints are outside the product.

## Deploy

Build with `npm run build` and publish `dist/` as an Azure Static Web App. `staticwebapp.config.json` supplies route rewrites, the real 404 response, security headers, and cache rules. The factory manages infrastructure and DNS.

## Privacy and license

There are no accounts, analytics, third-party runtime scripts, or remote code execution. See `/privacy` and `/terms` in the app. Source code is available under the [MIT License](./LICENSE).
