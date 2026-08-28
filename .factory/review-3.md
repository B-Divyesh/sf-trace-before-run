# Adversarial first-read review 3 — Trace Before Run

**Verdict: FAIL**

Reviewed 28 August 2026 against https://trace-before-run.sociobot.in in fresh
390 × 844 and 1440 × 900 browser contexts, and against a clean clone at
`224b8f2fad2551193505a896ddcbe6c5440d27b3`. The product is clear, tryable,
isolated, and functional. Four minor findings remain; PASS requires zero.

## Findings

### F-3-1 — Minor — Back navigation does not restore the reader's scroll position

- **Location / exact action:** On the 390 px landing page, scroll to **“Start
  the five puzzles”**, open `/play`, then use browser Back.
- **Evidence:** The landing page was at `scrollY=2184` before navigation. After
  Back and route settling, it returned to `scrollY=0`. The landing H1 was
  focused, but the reader's place near the lower action was lost.
- **Why this fails structure:** The route-change contract requires Back and
  Forward to restore route scroll state as well as focus. A phone user who
  returns after reading the lower sections must scroll through the landing
  page again.
- **Concrete fix:** Store the current scroll position in each history entry.
  On `popstate`, render the route, restore that entry's scroll position, focus
  its H1 with `preventScroll: true`, and announce it. Add a mobile test that
  records a non-zero landing position and asserts Back restores it.

### F-3-2 — Minor — Clearing saved progress is an unlisted privacy claim

- **Location / exact quote:** Landing boundaries section: **“Clear it from the
  Privacy page.”**
- **Evidence:** `.factory/claims.json` has no clear-progress entry or tagged
  test. The live action does currently remove both `real:` and `demo:` keys and
  announces “Saved progress was cleared from this browser.”
- **Why this fails the claims contract:** This is a privacy behavior a visitor
  can rely on. Working in one manual check does not place it in the required
  clean-sandbox claim gate.
- **Concrete fix:** Add `clear-progress` to `.factory/claims.json`. Its tagged
  test should seed both storage namespaces, click **Clear saved progress**,
  assert both keys are absent, verify the status message, and record network
  requests. Alternatively remove the landing promise.

### F-3-3 — Minor — A heading makes an untested learning-efficacy claim

- **Location / exact quote:** Landing “How it works” heading: **“Three moves
  build the habit.”**
- **Why this fails copy and claims review:** The page proves that there are
  three steps. It does not prove that those steps build a learner's habit, and
  no claim entry tests that outcome.
- **Concrete fix:** Replace it with **“Trace in three moves.”** This names the
  section without promising an unmeasured learning change.

### F-3-4 — Minor — README uses an unverifiable marketing adjective

- **Location / exact quote:** README introduction: **“Five original puzzles
  ask for final variable values, the branch path, and printed output.”**
- **Why this fails copy review:** `five-puzzles` verifies the number and the
  complete flow, but “original” is an untested provenance claim and adds no
  instruction for the reader.
- **Concrete fix:** Replace it with **“Five puzzles ask for final variable
  values, the branch path, and printed output.”**

## Mandatory cold first read

**PASS.** Before scrolling, both viewports answered all three questions.

| Question | Cold answer |
| --- | --- |
| What does it do? | A tracing drill where I predict Python values, a branch, and output before seeing the trace. The exact headline is “Predict Python before you run it.” |
| For whom? | New Python learners who know syntax but lose track of changing values. |
| What should I click first? | “Try it with sample data.” The adjacent text says it loads a ready branch puzzle with no sign-in. |

At 390 × 844, the action ends at 487.67 px and all three facts end before 675
px. At 1440 × 900, the action ends at 648.05 px and the third fact at 778.44
px. Nothing required for the first decision is clipped. Both cold loads had no
console or page errors.

## Copy audit

Counts use whitespace-separated words, treat hyphenated terms and URLs as one,
and ignore standalone punctuation. Code fixtures and repeated instances of the
same header/footer string are not prose sentences. Headings, actions, labels,
and accessible control names are included.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Clear action |
| Trace Before Run | 3 | Wordmark |
| Practice / Demo / Privacy | 1 each | Clear navigation labels |
| Switch color theme | 3 | Clear accessible action |
| A five-puzzle tracing desk | 4 | Clear supporting label |
| Predict Python before you run it | 6 | Plain job headline |
| For new Python learners who know syntax but lose track of changing values. | 13 | Clear audience and situation |
| Try it with sample data | 5 | Result-naming action |
| Loads a ready branch puzzle. | 5 | Clear outcome |
| No sign-in. | 2 | `open-access` |
| Free to use. | 3 | `open-access` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Practice stays on this device. | 5 | `local-only` |
| At the logic observatory, every value has a place and every branch leaves a trail. | 15 | Nonessential illustration caption |
| The prediction desk | 3 | Clear section label |
| Hold the answer before the reveal | 6 | Clear prediction gate |
| Read the snippet. | 3 | Clear instruction |
| Write the final values. | 4 | Clear instruction |
| Choose the path. | 3 | Clear instruction |
| Only then can you open the trace. | 7 | `prediction-reveal` |
| Your trace | 2 | Clear preview label |
| Choose the path | 3 | Clear preview label |
| Three moves build the habit | 5 | **F-3-3** |
| Read | 1 | Clear step label |
| Read one line at a time | 6 | Clear heading |
| Keep the current value beside each variable. | 7 | Clear instruction |
| Commit | 1 | Clear step label |
| Commit your full prediction | 4 | Clear heading |
| Choose the branch and printed output before any result appears. | 10 | `prediction-reveal` |
| Inspect | 1 | Clear step label |
| Inspect the first difference | 4 | Clear heading |
| See which line changed the value you missed. | 8 | `first-difference` |
| Start the five puzzles | 4 | Result-naming action; `five-puzzles` |
| A tracing drill, not a code runner | 7 | Clear boundary heading |
| The editor accepts small assignments, conditions, loops, and print calls. | 10 | `restricted-grammar` |
| It does not run arbitrary Python or send code to a server. | 12 | `restricted-grammar`, `local-only` |
| Your practice stays local. | 4 | `local-only` |
| Progress uses browser storage. | 4 | `local-only` |
| Clear it from the Privacy page. | 6 | **F-3-2** |
| Predict first. | 2 | Clear footer line |
| Then inspect the trace. | 4 | Clear footer line |
| Built by Param Factory · v1.0 | 5 | Attribution and build id |
| Original generated art. | 3 | Provenance recorded in `.factory/design.md` |

No landing string exceeds 22 words or uses a banned word. Core terms remain
consistent: a puzzle contains a snippet; the learner commits a prediction;
the result is a trace; a conditional route is a path.

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Trace Before Run | 3 | Title |
| Predict short Python traces before seeing the result. | 8 | Clear summary |
| Trace Before Run is a free browser drill for beginning Python learners. | 12 | `open-access` |
| Five original puzzles ask for final variable values, the branch path, and printed output. | 14 | **F-3-4**; count covered by `five-puzzles` |
| The learner commits a prediction before the line-by-line trace appears. | 10 | `prediction-reveal` |
| A wrong answer points to the first differing final field. | 10 | `first-difference` |
| The editor interprets a small teaching grammar. | 7 | `restricted-grammar` |
| It never executes arbitrary Python. | 5 | `restricted-grammar` |
| Practice progress stays in browser storage, and the app works offline after the first visit. | 15 | `local-only`, `offline-reload` |
| Try the demo | 3 | Clear heading |
| Open the sample-data demo, or use `http://localhost:5173/?demo=1` during local development. | 10 | Clear instruction |
| The demo starts on the “Add the badge” puzzle and stores progress under a separate `demo:` key. | 17 | `demo-isolated` |
| “Reset demo” returns to the seeded state without changing practice progress. | 11 | `reset-demo` |
| Run locally | 2 | Clear heading |
| Requirements: Node.js 20 or newer. | 5 | Clear prerequisite |
| Open `http://localhost:5173`. | 2 | Clear instruction |
| Use `/play` for normal practice or `/demo` for the isolated sample. | 11 | Clear route instruction |
| Test and build | 3 | Clear heading |
| The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. | 19 | Clear test description |
| The production build lands in `dist/` with `index.html` at its root. | 11 | Verified build outcome |
| Run the same suite against the deployed product with: | 9 | Clear instruction |
| Supported teaching grammar | 3 | Clear heading |
| Whole-number assignments with `+`, `-`, `*`, `//`, and `%` | 9 | Clear grammar item |
| Comparisons in `if` / `else` blocks | 6 | Clear grammar item |
| `for name in range(number)` loops, capped at 20 turns | 9 | Clear grammar item |
| `print(expression)` | 1 | Clear grammar item |
| This is deliberately not a Python runtime. | 7 | Clear boundary |
| Accounts, rankings, arbitrary code execution, and AI-generated hints are outside the product. | 12 | Clear non-goals matching the brief |
| Deploy | 1 | Clear heading |
| Build with `npm run build` and publish `dist/` as an Azure Static Web App. | 14 | Clear deployment instruction |
| `staticwebapp.config.json` supplies route rewrites, the real 404 response, security headers, and cache rules. | 13 | Verified repository fact |
| The factory manages infrastructure and DNS. | 6 | Clear responsibility boundary |
| Privacy and license | 3 | Clear heading |
| There are no accounts, analytics, third-party runtime scripts, or remote code execution. | 12 | `open-access`, `no-tracking`, `restricted-grammar` |
| See `/privacy` and `/terms` in the app. | 7 | Clear route instruction |
| Source code is available under the MIT License. | 8 | Verified repository fact |

No README string exceeds 22 words or contains a banned word. Buttons and links
name their results. F-3-3 and F-3-4 are the remaining marketing/claim wording;
F-3-2 is the remaining unlisted behavioral promise.

## Demo, sandbox, offline, and privacy

**PASS.** The hero action opens `/?demo=1` in one click. Its first mobile
screen already shows the “Add the badge” puzzle, progress, a realistic seeded
snippet, final-value inputs, branch choices, and a commit action. The persistent
banner says “Demo — sample data, nothing is saved” and includes **Reset demo**
and **Start for real**.

A fresh live context was seeded with a byte-for-byte real-progress sentinel.
Completing the sample wrote only `demo:trace-before-run:progress`. Reset removed
that key, restored the seeded puzzle and empty fields, and left the real
sentinel unchanged. **Start for real** also discarded demo progress and opened
`/play` without changing real progress. The complete manual flow made only
same-origin GET requests and produced no console errors. The live offline claim
test warmed the service worker, disabled the network, reloaded `/demo`, and
kept the seeded puzzle usable with the offline notice.

## Claims gate

All 11 declared claims passed individually from the clean clone. Each id occurs
exactly once as a test tag. The full live suite also exercised every tag.

| Claim id | Clean manifest command | Live suite |
| --- | --- | --- |
| `prediction-reveal` | PASS, 1/1 | PASS |
| `restricted-grammar` | PASS, 1/1 | PASS |
| `editable-trace` | PASS, 1/1 | PASS |
| `demo-isolated` | PASS, 1/1 | PASS |
| `reset-demo` | PASS, 1/1 | PASS |
| `local-only` | PASS, 1/1 | PASS |
| `no-tracking` | PASS, 1/1 | PASS |
| `open-access` | PASS, 1/1 | PASS |
| `first-difference` | PASS, 1/1 | PASS |
| `five-puzzles` | PASS, 1/1 | PASS |
| `offline-reload` | PASS, 1/1 | PASS |

`CI=1 npm test` passed 24/24 in the clean clone. The same suite passed 24/24
against production. `npm run build` passed and created `dist/index.html`;
application JavaScript is 29.72 KB raw and 10.17 KB gzip. No declared claim
test failed. F-3-2 and F-3-3 are the unlisted landing claims; F-3-4 is the
unverifiable README adjective.

## Earlier finding verification

Every earlier review, polish report, and current handoff was read. The five
earlier review findings remain fixed in live behavior and code.

| Earlier id | Fresh verification |
| --- | --- |
| `F-1-1` | The README suite sentence is 19 words under this audit's counting method, below the 22-word cap. |
| `F-1-2` | `reset-demo` is listed once, its tagged test passed, and live reset preserved the real sentinel. |
| `F-2-1` | At 1440 × 900 the action ends at 648.05 px and the last fact at 778.44 px. |
| `F-2-2` | `no-tracking` is listed once; its clean and live tests passed with no external requests, beacons, or cookies. |
| `F-2-3` | `/not-a-real-route` returns HTTP 404 and shows the designed missing page with home, Privacy, and Terms links. |

The polish reports also named five earlier regression defects. The live suite
confirmed all remain fixed: edited loops refresh their path, tested mobile
targets are at least 44 px, the first dark-mode toggle changes appearance,
non-numeric predictions stop before reveal, and the nudge preserves values and
focus. F-3-1 is a newly exercised history-scroll case, not a regression of an
earlier listed finding.

## Structure, accessibility, and identity

Landing, demo, practice, privacy, and terms return 200. Each has one H1, one
main landmark, a route-specific title, a description under 155 characters,
canonical and social metadata, favicon, apple-touch icon, consistent
navigation, and Privacy/Terms footer links. Every discovered internal link,
plus robots, sitemap, manifest, icons, and social image, returned 200. The
unknown route returns the designed page with HTTP 404. F-3-1 is the sole
history-navigation failure.

The factory URL verifier reported `lang=en`, one H1, one main landmark, alt
text on every image, labeled buttons, and zero browser errors. Live Playwright
Axe scans found no serious or critical issues in all routes or either tested
theme. A separate 390 px enumeration found no visible link, button, input,
textarea, or summary target below 44 × 44 px. Reduced-motion CSS disables
smooth scrolling and transitions.

The cream paper grid, editorial serif, cut-paper observatory, clipped panels,
variable jars, and restrained moon motif match `.factory/design.md` and are
recognizable from a thumbnail. This is not a generic centered-gradient SaaS
template. Asset provenance is recorded and no third-party font or runtime
script is loaded.

## Missed leverage

**No finding.** The brief explicitly excludes arbitrary execution, accounts,
rankings, and an AI hint bot. A normal learner can edit the restricted snippet,
commit a prediction, inspect the first difference, finish five puzzles, and
resume locally. Import, sync, or gateway AI would add scope without a
brief-supported job. No provider key or decorative AI feature is present.

## What would make this perfect

Restore per-entry scroll positions on Back and Forward, add the clear-progress
claim/test, rename “Three moves build the habit” to “Trace in three moves,” and
remove “original” from the README puzzle sentence. Then rerun all 11 manifest
commands, both full suites, the copy audit, and the mobile history test. PASS
requires those checks to leave zero findings.
