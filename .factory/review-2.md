# Adversarial first-read review 2 — Trace Before Run

**Verdict: FAIL**

Reviewed 28 August 2026 against https://trace-before-run.sociobot.in in fresh
390 × 844 and 1440 × 900 browser contexts, plus a clean clone at
be5094cbf5947c70fa378ba50f3dc2cade6caf36. The drill, sample sandbox, and
declared claims work. Three findings remain; PASS requires zero findings.

## Findings

### F-2-1 — Minor — Desktop first viewport clips the primary action

- **Location / exact quote:** Landing hero, “Try it with sample data” and
  “Loads a ready branch puzzle. No sign-in.”
- **Evidence:** In a fresh 1440 × 900 context, the action box starts at
  y=828.36 and ends at y=901.95. Its lower 1.95 px is below the viewport.
- **Why this fails first read:** The first-screen contract requires a fully
  visible, usable primary action and its outcome before scrolling.
- **Concrete fix:** Reduce desktop hero height or padding so the complete
  action ends within 900 px. Add a 1440 × 900 test asserting its box bottom is
  at most window.innerHeight.

### F-2-2 — Minor — README makes an unlisted analytics claim

- **Location / exact quote:** README.md, “Privacy and license”: “There are no
  accounts, analytics, third-party runtime scripts, or remote code execution.”
- **Why this fails the claims contract:** open-access, local-only, and
  restricted-grammar cover adjacent promises. None of the ten entries in
  .factory/claims.json declares or tests “no analytics.”
- **Concrete fix:** Remove “analytics,” or add a no-analytics manifest claim
  and tagged clean-context test that records the load and completed demo flow
  and asserts no telemetry endpoint or beacon is used.

### F-2-3 — Minor — The missing-page view is not an HTTP 404

- **Location / exact quote:** Direct request to
  https://trace-before-run.sociobot.in/not-a-real-route; headline: “This path
  has no next line.”
- **Evidence:** The designed page, one H1, and return action render, but the
  HTTP response is 200, not 404. public/staticwebapp.config.json has a
  navigation fallback, no responseOverrides.404, and no static 404 document.
- **Why this fails structure:** Crawlers, link checkers, and integrations are
  told that an unknown route is valid.
- **Concrete fix:** Add a designed static 404.html and Static Web Apps 404
  response override with statusCode 404, while preserving explicit SPA deep
  links. Test both the direct status and the visible return action.

## Mandatory cold first read

**PASS for clarity at both sizes; F-2-1 remains a usability defect.** Before
scrolling, the screen stated what it does, who it is for, and the first action:

| Question | Cold answer |
| --- | --- |
| What does it do? | “Predict Python before you run it.” A prediction-before-reveal trace drill. |
| For whom? | “For new Python learners who know syntax but lose track of changing values.” |
| What should I click first? | “Try it with sample data”; it says it loads a ready branch puzzle with no sign-in. |

The mobile action and facts are fully visible. On desktop the action is
legible, but clipped as recorded in F-2-1. No console or page errors occurred.

## Copy audit

Counts treat hyphenated terms and version names as one word. Code fixtures,
duplicate navigation labels, and hidden accessibility labels are excluded.
No listed copy exceeds 22 words, has a banned marketing adjective, uses an
inconsistent core term, or uses a non-result-naming landing action. F-2-2 is
the only claim-contract exception.

### Landing copy

| Copy | Words | Check |
| --- | ---: | --- |
| Trace Before Run | 3 | Wordmark |
| Practice / Demo / Privacy | 1 each | Clear navigation labels |
| Switch color theme | 3 | Clear control name |
| A five-puzzle tracing desk | 4 | Supporting label |
| Predict Python before you run it | 6 | Plain job headline |
| For new Python learners who know syntax but lose track of changing values. | 13 | Audience and situation |
| Try it with sample data | 6 | Result-naming action |
| Loads a ready branch puzzle. | 5 | Action outcome |
| No sign-in. | 2 | open-access |
| Free to use. | 3 | open-access |
| Works offline after the first visit. | 6 | offline-reload |
| Practice stays on this device. | 5 | local-only |
| At the logic observatory, every value has a place and every branch leaves a trail. | 15 | Nonessential art caption |
| The prediction desk | 3 | Section label |
| Hold the answer before the reveal | 6 | Explained below |
| Read the snippet. | 3 | Instruction |
| Write the final values. | 4 | Instruction |
| Choose the path. | 3 | Instruction |
| Only then can you open the trace. | 7 | prediction-reveal |
| Your trace | 2 | Preview label |
| Choose the path | 3 | Preview label |
| Three moves build the habit | 5 | Supported by three steps |
| Read one line at a time | 6 | Step heading |
| Keep the current value beside each variable. | 7 | Instruction |
| Commit your full prediction | 4 | Step heading |
| Choose the branch and printed output before any result appears. | 10 | prediction-reveal |
| Inspect the first difference | 4 | Step heading |
| See which line changed the value you missed. | 8 | first-difference |
| Start the five puzzles | 4 | Result-naming action; five-puzzles |
| A tracing drill, not a code runner | 7 | Boundary heading |
| The editor accepts small assignments, conditions, loops, and print calls. | 9 | restricted-grammar |
| It does not run arbitrary Python or send code to a server. | 11 | restricted-grammar, local-only |
| Your practice stays local. | 4 | local-only |
| Progress uses browser storage. | 4 | local-only |
| Clear it from the Privacy page. | 6 | Recovery instruction |
| Predict first. / Then inspect the trace. | 2 / 4 | Footer copy |
| Built by Param Factory · v1.0 | 5 | Attribution/version |
| Original generated art. | 3 | Provenance in design record |

### README copy

| Copy | Words | Check |
| --- | ---: | --- |
| Trace Before Run | 3 | Title |
| Predict short Python traces before seeing the result. | 8 | Summary |
| Trace Before Run is a free browser drill for beginning Python learners. | 12 | open-access |
| Five original puzzles ask for final variable values, the branch path, and printed output. | 14 | five-puzzles |
| The learner commits a prediction before the line-by-line trace appears. | 10 | prediction-reveal |
| A wrong answer points to the first differing final field. | 10 | first-difference |
| The editor interprets a small teaching grammar. | 7 | restricted-grammar |
| It never executes arbitrary Python. | 5 | restricted-grammar |
| Practice progress stays in browser storage, and the app works offline after the first visit. | 15 | local-only, offline-reload |
| Try the demo / Run locally / Test and build | 3 / 2 / 3 | Clear headings |
| Open the sample-data demo, or use the local demo URL during local development. | 12 | Entry instruction |
| The demo starts on the “Add the badge” puzzle and stores progress under a separate demo: key. | 17 | demo-isolated |
| “Reset demo” returns to the seeded state without changing practice progress. | 11 | reset-demo |
| Requirements: Node.js 20 or newer. | 6 | Prerequisite |
| Open the local URL. | 4 | Instruction |
| Use /play for normal practice or /demo for the isolated sample. | 11 | Route instruction |
| The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. | 18 | Test description |
| The production build lands in dist/ with index.html at its root. | 12 | Build outcome |
| Run the same suite against the deployed product with: | 9 | Instruction |
| Supported teaching grammar | 3 | Clear heading |
| This is deliberately not a Python runtime. | 7 | Boundary |
| Accounts, rankings, arbitrary code execution, and AI-generated hints are outside the product. | 12 | Brief non-goals |
| Deploy | 1 | Clear heading |
| Build with npm run build and publish dist/ as an Azure Static Web App. | 14 | Deployment instruction |
| staticwebapp.config.json supplies the SPA fallback, security headers, and cache rules. | 9 | Implementation note |
| The factory manages infrastructure and DNS. | 6 | Responsibility boundary |
| Privacy and license | 3 | Clear heading |
| There are no accounts, analytics, third-party runtime scripts, or remote code execution. | 12 | **F-2-2** |
| See /privacy and /terms in the app. | 7 | Route instruction |
| Source code is available under the MIT License. | 8 | Repository fact |

## Demo, sandbox, and privacy verification

**PASS.** One click reaches /demo, whose first screen is the populated “Add
the badge” puzzle with an editable realistic snippet, final-value fields, path
choices, and commit action. The persistent “Demo — sample data, nothing is
saved” banner includes **Reset demo** and **Start for real**.

The isolated test seeded real:trace-before-run:progress, completed and reset
the demo, and proved only demo:trace-before-run:progress was removed. The real
value remained byte-for-byte unchanged. Interception during demo and real
practice recorded only same-origin GETs. After a warm demo visit, offline
reload showed “You are offline. This saved page still works.”

## Claims gate

**PASS for all declared claims.** From the clean clone, npm ci completed with
zero vulnerabilities. Each manifest command ran separately against the live
origin and passed 1/1: prediction-reveal, restricted-grammar, editable-trace,
demo-isolated, reset-demo, local-only, open-access, first-difference,
five-puzzles, and offline-reload.

CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test passed
21/21. npm run build passed; application JS is 10.13 KB gzip and CSS is 4.64 KB
gzip. F-2-2 is the only unlisted claim-like landing/README text.

## Earlier finding verification

Every earlier review, polish report, and handoff was read. Both earlier
findings are fixed in live code:

| Earlier ID | Verification |
| --- | --- |
| F-1-1 | The README suite sentence is now 18 words, below the 22-word cap. |
| F-1-2 | reset-demo is in claims.json; its tagged live test passed and preserved real progress. |

The earlier editable-path, mobile-target, first-theme-toggle, non-numeric
prediction, and nudge-preservation defects are also covered by the passing
live suite and were exercised in this run.

## Structure, accessibility, and identity

Landing, demo, practice, privacy, terms, and missing-page views each have one
H1 and one main landmark, route-specific titles/descriptions/canonicals/OG
data, favicon, and no browser errors. Fresh navigation to demo focuses and
announces “Add the badge”; Back restores “Predict Python before you run it.”
All discovered internal links plus robots, sitemap, icons, and social image
returned 200. The self-only CSP and serious/critical Axe scans pass.

The paper-observatory art, editorial serif, clipped panels, variable jars, and
night palette are distinct from a generic SaaS template and match the design
record. F-2-3 remains because the missing page is HTTP 200.

## Missed leverage

**No finding.** The brief explicitly excludes arbitrary execution, accounts,
rankings, and an AI hint bot. The restricted editor, editable paths,
prediction gate, feedback, five puzzles, local progress, offline sample, and
resettable demo cover the stated job. Import, sync, or decorative AI would
expand the smallest useful product without brief support.

## What would make this perfect

Make the action fully visible at 1440 × 900, remove or test the analytics
promise, and serve the designed missing page with HTTP 404. Then rerun every
manifest command and the full live suite; PASS requires no remaining finding.

