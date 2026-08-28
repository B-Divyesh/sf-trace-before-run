# Adversarial first-read review 4 — Trace Before Run

**Verdict: FAIL**

Reviewed 28 August 2026 against `https://trace-before-run.sociobot.in` in fresh 390 × 844 and 1440 × 900 Chromium contexts, and from a fresh clone of `44adc27924283f10b34ccb02afc6fa28555b8b0c`. The first screen, sample route, isolation, privacy behavior, routes, accessibility checks, and declared test commands work. Two claims-contract findings remain. PASS requires zero findings and no untested claim.

## Findings

### F-4-1 — BLOCKING — Footer makes an unlisted asset-provenance claim

- **Location / exact quote:** Landing footer: “Original generated art.”
- **Evidence:** The live footer contains this sentence. It is not in `.factory/claims.json`; none of the 12 tagged claim tests checks asset provenance. `.factory/design.md` records provenance, but is not a sandbox claim test.
- **Why this fails:** This is a visitor-facing factual promise. The claims contract requires every claim-like sentence to have a manifest entry and test, or to be removed.
- **Concrete fix:** Remove “Original generated art.” from the footer. If retaining it is necessary, add a provenance claim with a deterministic artifact/metadata test; the design record alone is insufficient.

### F-4-2 — BLOCKING — The `open-access` test does not prove its full claim

- **Location / exact quote:** `.factory/claims.json`: “The complete practice is free and needs no account.” The tagged test only checks the first `/play` puzzle, no password input, and one visible commit button.
- **Evidence:** `@claim:open-access` in `tests/product.spec.ts` neither completes the five-puzzle session nor checks for payment controls, a paywall, or a billing request after the first puzzle. The separate `five-puzzles` test completes a session but is not the observable proof for this claim and does not assert no charge/account gate.
- **Why this fails:** A learner may rely on “complete practice is free.” The current test could pass if a payment or account gate appeared after puzzle one. This is a partly untested claim.
- **Concrete fix:** Expand the one `@claim:open-access` test to complete all five bundled puzzles from a clean `/play` context and assert the completion view appears with no account, payment, or external billing request. Retain the no-password assertion. Alternatively narrow all copy and the claim to exactly what the current test proves.

## Mandatory cold first read

**PASS.** Before scrolling in both viewports, the following were clear:

| Question | Cold answer | Exact first-screen evidence |
| --- | --- | --- |
| What does this do? | A Python tracing drill: predict values and a path before seeing the trace. | “Predict Python before you run it” |
| For whom? | New Python learners who know syntax but lose track of changing values. | “For new Python learners who know syntax but lose track of changing values.” |
| What should I click first? | Try the ready sample puzzle. | “Try it with sample data” and “Loads a ready branch puzzle. No sign-in.” |

At 390 px, the action ended at 547.30 px and the third fact at 677.69 px in an 844 px viewport. At 1440 × 900 they ended at 648.05 px and 778.44 px. Cold loads had no page or console errors. The paper-observatory illustration, editorial type, clipped edges, and ink/cream palette match the design record and do not resemble a generic SaaS template.

## Copy audit

Counts use whitespace-separated words; hyphenated terms and paths count as one word. Commands, code fixtures, punctuation-only values, and duplicate copies of navigation are excluded. No sentence exceeds 22 words. “Branch”, “path”, “snippet”, “prediction”, and “trace” are consistent. The observatory caption is nonessential art copy. No jargon or marketing-adjective finding remains except the unlisted factual provenance statement in F-4-1.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Clear skip action |
| Trace Before Run | 3 | Wordmark |
| Practice | 1 | Clear navigation label |
| Demo | 1 | Clear navigation label |
| Privacy | 1 | Clear navigation label |
| Switch color theme | 3 | Clear accessible action |
| A five-puzzle tracing desk | 4 | Supporting label; `five-puzzles` |
| Predict Python before you run it | 6 | Plain job headline |
| For new Python learners who know syntax but lose track of changing values. | 13 | Audience and situation |
| Try it with sample data | 5 | Result-naming action |
| Loads a ready branch puzzle. | 5 | Clear action outcome |
| No sign-in. | 2 | `open-access` |
| Free to use. | 3 | `open-access` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Practice stays on this device. | 5 | `local-only` |
| At the logic observatory, every value has a place and every branch leaves a trail. | 15 | Nonessential illustration caption |
| The prediction desk | 3 | Clear section label |
| Hold the answer before the reveal | 6 | Clear prediction-gate heading |
| Read the snippet. | 3 | Clear instruction |
| Write the final values. | 4 | Clear instruction |
| Choose the path. | 3 | Clear instruction |
| Only then can you open the trace. | 7 | `prediction-reveal` |
| Your trace | 2 | Clear ledger label |
| Choose the path | 3 | Clear path label |
| Trace in three moves | 4 | Clear standalone heading |
| Read | 1 | Clear step label |
| Commit | 1 | Clear step label |
| Inspect | 1 | Clear step label |
| Read one line at a time | 6 | Clear standalone heading |
| Keep the current value beside each variable. | 7 | Clear instruction |
| Commit your full prediction | 4 | Clear standalone heading |
| Choose the branch and printed output before any result appears. | 10 | `prediction-reveal` |
| Inspect the first difference | 4 | Clear standalone heading |
| See which line changed the value you missed. | 8 | `first-difference` |
| Start the five puzzles | 4 | Result-naming action; `five-puzzles` |
| A tracing drill, not a code runner | 7 | Clear boundary heading |
| The editor accepts small assignments, conditions, loops, and print calls. | 10 | `restricted-grammar` |
| It does not run arbitrary Python or send code to a server. | 12 | `restricted-grammar`, `local-only` |
| Your practice stays local. | 4 | `local-only` |
| Progress uses browser storage. | 4 | `local-only` |
| Clear it from the Privacy page. | 6 | `clear-progress` |
| Predict first. | 2 | Clear footer line |
| Then inspect the trace. | 4 | Clear footer line |
| Built by Param Factory · v1.0 | 5 | Attribution/build label |
| Original generated art. | 3 | **F-4-1: unlisted claim** |

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Trace Before Run | 3 | Clear title |
| Predict short Python traces before seeing the result. | 8 | Clear summary |
| Trace Before Run is a free browser drill for beginning Python learners. | 12 | `open-access` |
| Five puzzles ask for final variable values, the branch path, and printed output. | 13 | `five-puzzles` |
| The learner commits a prediction before the line-by-line trace appears. | 10 | `prediction-reveal` |
| A wrong answer points to the first differing final field. | 10 | `first-difference` |
| The editor interprets a small teaching grammar. | 7 | `restricted-grammar` |
| It never executes arbitrary Python. | 5 | `restricted-grammar` |
| Practice progress stays in browser storage, and the app works offline after the first visit. | 15 | `local-only`, `offline-reload` |
| Try the demo | 3 | Clear heading |
| Open the sample-data demo, or use the local demo URL during local development. | 12 | Clear instruction |
| The demo starts on the “Add the badge” puzzle and stores progress under a separate `demo:` key. | 17 | `demo-isolated` |
| “Reset demo” returns to the seeded state without changing practice progress. | 11 | `reset-demo` |
| Run locally | 2 | Clear heading |
| Requirements: Node.js 20 or newer. | 6 | Clear prerequisite |
| Open the local URL. | 4 | Clear instruction |
| Use `/play` for normal practice or `/demo` for the isolated sample. | 11 | Clear route instruction |
| Test and build | 3 | Clear heading |
| The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. | 19 | Clear test-scope statement |
| The production build lands in `dist/` with `index.html` at its root. | 11 | Build result |
| Run the same suite against the deployed product with: | 9 | Clear instruction |
| Supported teaching grammar | 3 | Clear heading |
| Whole-number assignments with `+`, `-`, `*`, `//`, and `%` | 9 | Clear grammar item |
| Comparisons in `if` / `else` blocks | 6 | Clear grammar item |
| `for name in range(number)` loops, capped at 20 turns | 9 | Clear grammar item |
| `print(expression)` | 1 | Clear grammar item |
| This is deliberately not a Python runtime. | 7 | Clear boundary |
| Accounts, rankings, arbitrary code execution, and AI-generated hints are outside the product. | 12 | Brief-aligned non-goals |
| Deploy | 1 | Clear heading |
| Build with `npm run build` and publish `dist/` as an Azure Static Web App. | 14 | Clear deployment instruction |
| `staticwebapp.config.json` supplies route rewrites, the real 404 response, security headers, and cache rules. | 13 | Repository fact |
| The factory manages infrastructure and DNS. | 6 | Clear responsibility boundary |
| Privacy and license | 3 | Clear heading |
| There are no accounts, analytics, third-party runtime scripts, or remote code execution. | 12 | `open-access`, `no-tracking`, `restricted-grammar` |
| See `/privacy` and `/terms` in the app. | 7 | Clear route instruction |
| Source code is available under the MIT License. | 8 | Repository fact |

## Demo, sandbox, offline, and privacy

**PASS.** The hero action reaches `/?demo=1` in one click. The first screen is already the populated “Add the badge” workbench with an editable realistic snippet, variable fields, path choices, and commit action. The persistent banner reads “Demo — sample data, nothing is saved” and contains **Reset demo** and **Start for real**.

In a fresh live context, a completed demo trace created only `demo:trace-before-run:progress`; `real:trace-before-run:progress` remained absent. Reset removed the demo key, restored “Add the badge”, and kept the banner. The complete-flow request log contained only same-origin GET requests and no console errors. The tagged offline-reload test passed after service-worker warmup.

## Claims gate

**FAIL only for the coverage gap in F-4-2; no manifest command failed.** A fresh clone installed with `npm ci`. Each of the 12 commands in `.factory/claims.json` was run separately and passed. Each claim id occurs exactly once in `tests/product.spec.ts`. The fresh clone also passed `CI=1 npm test` (27/27) and `npm run build`, producing `dist/`.

The complete `CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test` suite passed 27/27 against production. It covers request logging, offline, Axe, mobile, history, reset, clear-progress, and 404 behavior. It does not remove F-4-2 because the one `open-access` tagged test lacks the completion/payment assertions above.

## Earlier finding verification

Every earlier review, polish report, and handoff was read. Live behavior and current code confirm these earlier findings are fixed:

| Earlier id | Confirmation |
| --- | --- |
| F-1-1 | README’s test-suite sentence is 19 words, below 22. |
| F-1-2 | `reset-demo` is listed once; reset restores the seed and preserves real progress. |
| F-2-1 | At 1440 × 900, the action and all three facts end inside the viewport. |
| F-2-2 | `no-tracking` is declared and its completed-demo request/cookie/beacon test passes. |
| F-2-3 | `/not-a-real-route` returns HTTP 404 and renders the designed missing page. |
| F-3-1 | Live Back/Forward restores mobile landing and practice scroll positions and H1 focus. |
| F-3-2 | `clear-progress` is declared; it removes both namespaces and announces the result. |
| F-3-3 | The heading is “Trace in three moves.” |
| F-3-4 | README says “Five puzzles…”, without the unverified “original” adjective. |

The earlier editable-loop path, mobile target, dark-theme, non-numeric input, and nudge-preservation regressions also passed in the current local and live suites.

## Structure and route check

**PASS.** `/`, `/demo`, `/play`, `/privacy`, and `/terms` returned 200; `/not-a-real-route` returned 404. Each app route has a route-specific title, description, canonical, Open Graph/Twitter title, one H1, main landmark, skip link, consistent header/footer, Privacy/Terms links, and focus/announcement behavior after navigation. The 404 has its own title, H1, return action, and legal footer links. `robots.txt`, `sitemap.xml`, manifest, favicon, apple-touch icon, and social image all returned 200. Live responses include self-only CSP, `nosniff`, and a strict referrer policy. No dead internal links were found.

## Missed leverage

**No finding.** The brief explicitly excludes arbitrary execution, accounts, rankings, and AI hints. The editable restricted grammar, prediction gate, first-difference feedback, five-puzzle practice, local persistence, and offline demo cover the stated job. Import, sync, or an AI gateway feature is not an implied missing capability.

## What would make this perfect

Remove the untested art-provenance footer sentence and make `open-access` prove all five free puzzles complete without an account or billing gate. Then rerun the 12 manifest commands, the local 27-test suite, and the live suite. With those two findings closed and no new finding, this review can pass.
