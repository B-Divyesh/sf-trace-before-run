# Adversarial first-read review 5 — Trace Before Run

**Verdict: FAIL**

Reviewed 29 August 2026 against `https://trace-before-run.sociobot.in` in
fresh Chromium contexts at 390 × 844 and 1440 × 900, and from a fresh local
clone of `3a6654faef0458ed350bba49f58e4e94f80f1e84`. The product is clear,
tryable, private by default, and technically sound. It nevertheless has five
plain-words findings. A PASS requires no findings, including minor copy
findings.

## Findings

### F-5-1 — Minor — The hero uses an information-free visual slogan

- **Location / exact quote:** Landing hero illustration caption: “At the logic
  observatory, every value has a place and every branch leaves a trail.”
- **Why this fails:** “Logic observatory” and “leaves a trail” are brand-lore
  metaphors. The sentence gives a first-time learner neither an instruction nor
  a product fact. This directly conflicts with the plain-words requirement to
  delete metaphor and mood copy.
- **Concrete fix:** Remove the caption. The image already has useful alt text.
  If a caption is retained, use: “The illustration shows variables and a
  branch in a Python trace.”

### F-5-2 — Minor — The first-screen supporting label is a metaphor

- **Location / exact quote:** Landing eyebrow above the H1: “A five-puzzle
  tracing desk”.
- **Why this fails:** A “tracing desk” is not the product or an action a
  learner can take. It makes the page scan less clear before the useful H1 is
  read.
- **Concrete fix:** Replace it with: “Five Python tracing puzzles”.

### F-5-3 — Minor — The preview section label does not name its content

- **Location / exact quote:** Landing preview eyebrow: “The prediction desk”.
- **Why this fails:** Heard out of context, it does not say that the section is
  an example puzzle. “Desk” is decorative product lore rather than a useful
  section name.
- **Concrete fix:** Replace it with: “Example tracing puzzle”.

### F-5-4 — Minor — A decorative section marker gives no useful instruction

- **Location / exact quote:** Landing preview marker: “01 / Look”.
- **Why this fails:** “Look” does not name the section or tell a learner what
  to do with it. It is a decorative label prohibited by the plain-words
  guidance.
- **Concrete fix:** Replace it with: “01 / Example puzzle”, or remove the
  marker.

### F-5-5 — Minor — The 404 page starts with a metaphor instead of its status

- **Location / exact quote:** Static 404 eyebrow, `public/404.html`: “Wrong
  branch”.
- **Why this fails:** A visitor whose link failed needs the page status first.
  “Wrong branch” is a programming metaphor and does not make sense as a page
  category out of context.
- **Concrete fix:** Replace it with: “Page not found”.

## Mandatory cold first read

**PASS.** Before scrolling, both fresh viewports answered the three required
questions. No console or page errors occurred.

| Question | Cold answer | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It is a drill where learners predict a short Python program before seeing the trace. | “Predict Python before you run it” |
| For whom? | New Python learners who know syntax but lose track of changing values. | “For new Python learners who know syntax but lose track of changing values.” |
| What should I click first? | Try the ready sample puzzle. | “Try it with sample data” and “Loads a ready branch puzzle. No sign-in.” |

At 390 px the primary action ended at 547.30 px and the third fact at 677.69
px in an 844 px viewport. At 1440 × 900 they ended at 648.05 px and 778.44 px.
The action and its stated outcome were completely visible without scrolling.

## Copy audit

Counts are whitespace-separated words; hyphenated words and paths count as one
word. Code fixtures, repeated navigation copies, and punctuation-only
decoration are excluded. No listed sentence exceeds 22 words. The five entries
marked `F-5-*` are the jargon/metaphor or contextless-heading findings above.
All other actions name a useful result and terminology is consistent: this
product calls the editable input a **snippet**, the choice a **path**, and the
result a **trace**.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Clear action |
| Trace Before Run | 3 | Wordmark |
| Practice | 1 | Clear navigation |
| Demo | 1 | Clear navigation |
| Privacy | 1 | Clear navigation |
| Switch color theme | 3 | Clear control |
| A five-puzzle tracing desk | 3 | **F-5-2** |
| Predict Python before you run it | 6 | Plain job headline |
| For new Python learners who know syntax but lose track of changing values. | 13 | Audience and situation |
| Try it with sample data | 5 | Result-naming action |
| Loads a ready branch puzzle. | 5 | Clear action outcome |
| No sign-in. | 2 | `open-access` |
| Free to use. | 3 | `open-access` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Practice stays on this device. | 5 | `local-only` |
| At the logic observatory, every value has a place and every branch leaves a trail. | 15 | **F-5-1** |
| 01 / Look | 2 | **F-5-4** |
| The prediction desk | 3 | **F-5-3** |
| Hold the answer before the reveal | 6 | Explains the prediction gate |
| Read the snippet. | 3 | Clear instruction |
| Write the final values. | 4 | Clear instruction |
| Choose the path. | 3 | Clear instruction |
| Only then can you open the trace. | 7 | `prediction-reveal` |
| Your trace | 2 | Clear prediction label |
| Choose the path | 3 | Clear prediction label |
| 02 / Trace | 2 | Clear section marker |
| Trace in three moves | 4 | Clear section heading |
| Read | 1 | Clear step label |
| Read one line at a time | 6 | Clear step heading |
| Keep the current value beside each variable. | 7 | Clear instruction |
| Commit | 1 | Clear step label |
| Commit your full prediction | 4 | Clear step heading |
| Choose the branch and printed output before any result appears. | 10 | `prediction-reveal` |
| Inspect | 1 | Clear step label |
| Inspect the first difference | 4 | Clear step heading |
| See which line changed the value you missed. | 8 | `first-difference` |
| Start the five puzzles | 4 | Result-naming action; `five-puzzles` |
| 03 / Boundaries | 2 | Clear section marker |
| A tracing drill, not a code runner | 7 | Clear product boundary |
| The editor accepts small assignments, conditions, loops, and print calls. | 10 | `restricted-grammar` |
| It does not run arbitrary Python or send code to a server. | 12 | `restricted-grammar`, `local-only` |
| Your practice stays local. | 4 | `local-only` |
| Progress uses browser storage. | 4 | `local-only` |
| Clear it from the Privacy page. | 6 | Clear recovery instruction |
| Predict first. | 2 | Useful footer instruction |
| Then inspect the trace. | 4 | Useful footer instruction |
| Built by Param Factory · v1.0 | 5 | Attribution/build label |

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
| Use `/play` for normal practice or `/demo` for the isolated sample. | 11 | Clear instruction |
| Test and build | 3 | Clear heading |
| The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. | 19 | Clear scope statement |
| The production build lands in `dist/` with `index.html` at its root. | 11 | Clear build result |
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
| `staticwebapp.config.json` supplies route rewrites, the real 404 response, security headers, and cache rules. | 13 | Clear repository fact |
| The factory manages infrastructure and DNS. | 6 | Clear responsibility boundary |
| Privacy and license | 3 | Clear heading |
| There are no accounts, analytics, third-party runtime scripts, or remote code execution. | 12 | `open-access`, `no-tracking`, `restricted-grammar` |
| See `/privacy` and `/terms` in the app. | 7 | Clear route instruction |
| Source code is available under the MIT License. | 8 | Clear repository fact |

## Demo, sandbox, offline, and privacy

**PASS.** The hero action opens `/?demo=1` in one click. Its first screen is
already the filled “Add the badge” workbench: a realistic snippet, final-value
fields, path choices, and a commit action. The persistent banner says “Demo —
sample data, nothing is saved” and provides **Reset demo** and **Start for
real**.

In a fresh live 390 px context seeded with a real-progress sentinel, completing
the sample wrote only `demo:trace-before-run:progress`. The real sentinel was
byte-for-byte unchanged. Reset removed the demo key, restored “Add the badge”
with an empty score field, and retained the real key. The complete request log
was three same-origin GETs (HTML, JavaScript, and CSS); it had no cookie,
beacon, external request, page error, or console error. The declared offline
claim also passed its clean-context service-worker reload test.

## Claims gate

**PASS.** From the fresh clone, `npm ci` succeeded and each of the twelve exact
commands named in `.factory/claims.json` passed separately:

`prediction-reveal`, `restricted-grammar`, `editable-trace`, `demo-isolated`,
`reset-demo`, `clear-progress`, `local-only`, `no-tracking`, `open-access`,
`first-difference`, `five-puzzles`, and `offline-reload`.

`CI=1 npm test` passed all 27 tests; `npm run build` passed and produced
`dist/`. The deployed run,
`CI=1 PLAYWRIGHT_BASE_URL=https://trace-before-run.sociobot.in npm test`, also
passed all 27 tests. Cross-checking live landing copy and README against the
manifest found no unlisted behavioral, privacy, price, or performance claim.
The five findings are copy-quality defects, not untested claims.

## Earlier finding verification

Every earlier review, polish report, and handoff was read. The live product and
current source confirm each prior review finding is actually fixed:

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 | README test-suite sentence is 19 words. |
| F-1-2 | `reset-demo` is declared, tagged, and preserves real progress. |
| F-2-1 | Desktop action and all facts end within a 1440 × 900 viewport. |
| F-2-2 | `no-tracking` is declared and tests requests, cookies, storage, and beacons. |
| F-2-3 | `/not-a-real-route` returns HTTP 404 and renders the designed page. |
| F-3-1 | Back/Forward saves per-entry scroll position, restores it, and focuses the H1. |
| F-3-2 | `clear-progress` is declared and removes both storage namespaces. |
| F-3-3 | The prior efficacy heading is now “Trace in three moves.” |
| F-3-4 | README says “Five puzzles…”, without the unsupported “original” adjective. |
| F-4-1 | The footer no longer says “Original generated art.” |
| F-4-2 | The `open-access` claim completes all five puzzles and checks for account, payment, and external-request gates. |

The earlier edited-path, mobile-target, first dark-theme toggle, numeric-error,
and nudge-preservation regressions also passed in the current local and live
suites.

## Structure, accessibility, and identity

**PASS.** `/`, `/demo`, `/play`, `/privacy`, and `/terms` returned 200. The
unknown route returned a real 404. A crawl of every discovered internal link
returned 200 (or the in-page `#main` anchor). App routes have route-specific
titles, descriptions, canonical URLs, OG/Twitter metadata, exactly one H1,
one main landmark, a skip link, consistent header/footer navigation, and
Privacy/Terms links. The 404 has its own title, H1, return action, and legal
footer.

Fresh navigation and Back focused the new H1 and announced it. The full local
and live suites include axe serious/critical scans, keyboard checks,
reduced-motion coverage, and 390 px sizing/overflow checks; all passed.
`robots.txt`, `sitemap.xml`, favicon, Apple touch icon, manifest, social image,
and security headers are present. The paper-observatory illustration, warm
paper/ink palette, editorial type, and clipped panels are recognizably distinct
from a generic SaaS template and match `.factory/design.md`.

## Missed leverage

**No finding.** The brief explicitly excludes AI hints, arbitrary code
execution, accounts, and rankings. The product supplies the implied core
workflow: editable constrained snippets, prediction before reveal,
first-difference feedback, five linked puzzles, local progress, and offline
use. Import, sync, or a Sociobot AI feature would exceed the researched
smallest useful product rather than complete an implied step.

## What would make this perfect

Remove or rewrite the five remaining metaphor/decorative labels named in
F-5-1 through F-5-5. Then rerun the copy audit, all twelve manifest commands,
the local test suite, build, and live suite. With no additional finding, this
review can pass.
