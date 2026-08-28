# Trace Before Run — handoff

## What shipped

Trace Before Run is a complete prediction-first tracing drill for beginning Python learners. It includes:

- Five original puzzles covering assignment, arithmetic, conditions, and short range loops.
- An editable, restricted Python-like interpreter. It never calls `eval` or executes arbitrary code.
- Required predictions for final variables, branch path, and printed output before reveal.
- A line-by-line variable trace and a specific first-difference explanation.
- Saved local progress, a five-puzzle completion state, reset controls, and a clear-progress action.
- A one-click `/demo` sandbox seeded with “Add the badge,” isolated under the `demo:` storage namespace.
- `/`, `/demo`, `/play`, `/privacy`, `/terms`, and styled not-found routes with History API behavior.
- Offline reload after the first visit through a small service worker.
- Light and dark treatments, keyboard operation, reduced-motion behavior, mobile layout, and visible focus states.
- Original surreal editorial hero art, responsive AVIF/WebP/JPEG output, social preview, favicon, and app icon.

The product is free, so no paid unlock or billing integration was added.

## Run and deploy

```sh
npm install
npm test
npm run build
```

The exact production build command is `npm run build`. It writes `dist/index.html` and all static assets under `dist/`. Deploy `dist/` to Azure Static Web Apps.

Demo URL: `https://trace-before-run.sociobot.in/demo`

Local demo: `http://localhost:5173/demo`

## Verification

- `npm test`: 17 Playwright tests covering every claim, all five puzzles end to end, incorrect answers, editing, unsupported syntax, missing fields, keyboard use, isolation, offline reload, routes, both color treatments, and 390 px layout.
- `npm run build`: passes TypeScript and produces the expected `dist/` root.
- `npm audit --omit=dev`: 0 vulnerabilities.
- Factory `verify-url.sh`: 200 response, no console or page errors, one title, `lang=en`, one `h1`, one `main`, no missing alt text, and no unlabeled buttons. Evidence is in `.factory/evidence/`.
- Playwright axe 4.10.2: no serious or critical findings across all routes in light mode or on the landing and demo routes in dark mode.
- Lighthouse 12.8.2 mobile against the production preview: Performance 100, Accessibility 100, Best Practices 100, SEO 100. FCP 0.9 s, LCP 1.1 s, TBT 40 ms, CLS 0.
- Production budgets: 9.71 KB gzip JS, 4.61 KB gzip CSS, no webfont payload, 9 KB mobile AVIF, and 14 KB mobile WebP.
- `git diff --check`: clean.

Claim definitions and exact test commands are in `.factory/claims.json`. The full Lighthouse JSON is `.factory/lighthouse.json`.

## Artwork provenance

The factory image model generated two source candidates on 28 August 2026. Both were reviewed for text artifacts, seams, unintended marks, and visual consistency. Candidate 2 became the production hero. Prompts and model metadata sit beside the source PNGs in `assets/src/`. The production image is 41 KB AVIF or 54 KB WebP at 1440 px.

## Known limits

- The interpreter is intentionally a teaching grammar, not full Python. It supports whole-number expressions, assignments, `if` / `else`, `range()` loops capped at 20 turns, and `print()`.
- Progress belongs to one browser and does not sync between devices.
- The app has no teacher dashboard, accounts, rankings, or AI hints. These are deliberate v1 non-goals from the brief.

## Suggested next step

Run the brief’s five-session learner study. Compare each learner’s first and fifth unseen five-item quiz, then decide whether more puzzle sets improve transfer.
