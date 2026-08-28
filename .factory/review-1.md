# Adversarial first-read review 1 — Trace Before Run

**Verdict: FAIL**

Reviewed 28 August 2026 against `https://trace-before-run.sociobot.in` from
fresh 390 × 844 and 1440 × 900 browser contexts, and against a clean clone of
the checked-out candidate. The core product is clear, tryable, isolated, and
working. Two remaining copy/claims-contract findings prevent a PASS.

## Findings

### F-1-1 — Minor — README test-suite sentence exceeds the 22-word copy limit

- **Location / exact quote:** `README.md`, “Test and build”: “The Playwright
  suite checks the complete prediction flow, incorrect answers, restricted
  syntax, keyboard use, demo isolation, offline reload, accessibility, routing,
  and the 390 px layout.” (25 words.)
- **Why this fails first-read copy:** It asks a reader to retain nine test
  topics in one sentence. The plain-words limit applies to README copy as well
  as the landing page.
- **Concrete fix:** Replace it with: “The Playwright suite checks tracing,
  syntax, keyboard use, demo isolation, offline reload, accessibility, routing,
  and the 390 px layout.” (18 words.) Or split the existing list into two
  sentences.

### F-1-2 — Minor — Reset behavior is an unlisted README claim

- **Location / exact quote:** `README.md`, “Try the demo”: ““Reset demo”
  returns to the seeded state.”
- **Why this fails the claims contract:** This is a visitor-facing behavioral
  promise. `.factory/claims.json` has no `reset-demo` entry, and no tagged
  claim test covers it. The untagged browser test `reset demo returns to the
  seeded puzzle` does prove the behavior, but it cannot be run through the
  claims manifest.
- **Concrete fix:** Add a `reset-demo` entry with the exact observable claim,
  sandbox, and `npm test -- --grep @claim:reset-demo`; tag the existing reset
  test accordingly. Alternatively remove this promise from the README.

## Mandatory cold first read

**PASS.** Before scrolling, both 390 px and desktop contexts answered all
three questions.

| Question | What the first screen says / what a visitor can infer |
| --- | --- |
| What does it do? | “Predict Python before you run it.” It is a prediction-before-reveal tracing drill. |
| For whom? | “For new Python learners who know syntax but lose track of changing values.” |
| What should I click first? | “Try it with sample data,” next to “Loads a ready branch puzzle. No sign-in.” |

The 390 px first viewport contains the headline, audience sentence, primary
action, its outcome, and the three facts. Desktop presents the same content
with the button and outcome visible at the lower edge of the viewport. No
console or page errors occurred on either load.

## Landing and README copy audit

Counts treat hyphenated terms as one word. The landing inventory includes
headings, labels, and actions because they also need to scan on a phone. Code
fixtures and repeated navigation labels are excluded; no user-facing sentence
is omitted.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Trace Before Run | 3 | Clear wordmark |
| Practice | 1 | Clear navigation label |
| Demo | 1 | Clear navigation label |
| Privacy | 1 | Clear navigation label |
| Switch color theme | 3 | Clear accessible control name |
| A five-puzzle tracing desk | 4 | Clear supporting label |
| Predict Python before you run it | 6 | Clear job headline |
| For new Python learners who know syntax but lose track of changing values. | 13 | Clear audience and situation |
| Try it with sample data | 6 | Result-naming action |
| Loads a ready branch puzzle. | 5 | Clear action outcome |
| No sign-in. | 2 | Clear fact |
| Free to use. | 3 | Listed claim: `open-access` |
| Works offline after the first visit. | 6 | Listed claim: `offline-reload` |
| Practice stays on this device. | 5 | Listed claim: `local-only` |
| At the logic observatory, every value has a place and every branch leaves a trail. | 15 | Illustration caption; no user instruction depends on it |
| The prediction desk | 3 | Clear section label |
| Hold the answer before the reveal | 6 | Clear section heading in context |
| Read the snippet. | 3 | Clear instruction |
| Write the final values. | 4 | Clear instruction |
| Choose the path. | 3 | Clear instruction |
| Only then can you open the trace. | 7 | Listed claim: `prediction-reveal` |
| Your trace | 2 | Clear preview label |
| Choose the path | 3 | Clear preview label |
| Three moves build the habit | 5 | Supported by the explicit three steps below |
| Read one line at a time | 6 | Clear step heading |
| Keep the current value beside each variable. | 7 | Clear instruction |
| Commit your full prediction | 4 | Clear step heading |
| Choose the branch and printed output before any result appears. | 10 | Listed claim: `prediction-reveal` |
| Inspect the first difference | 4 | Clear step heading |
| See which line changed the value you missed. | 8 | Listed claim: `first-difference` |
| Start the five puzzles | 4 | Result-naming action; listed claim: `five-puzzles` |
| A tracing drill, not a code runner | 7 | Clear boundary heading |
| The editor accepts small assignments, conditions, loops, and print calls. | 9 | Listed claim: `restricted-grammar` |
| It does not run arbitrary Python or send code to a server. | 11 | Listed claims: `restricted-grammar`, `local-only` |
| Your practice stays local. | 4 | Listed claim: `local-only` |
| Progress uses browser storage. | 4 | Listed claim: `local-only` |
| Clear it from the Privacy page. | 6 | Clear recovery instruction |
| Predict first. | 2 | Clear footer line |
| Then inspect the trace. | 4 | Clear footer line |
| Built by Param Factory | 4 | Attribution |
| Original generated art. | 3 | Asset provenance; corroborated in `.factory/design.md` |

No landing sentence exceeds 22 words. The landing has no banned marketing term,
no inconsistent core term, and no action that is merely “Submit”, “Go”, or
“Continue.” The only metaphor is nonessential illustration caption copy.

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Predict short Python traces before seeing the result. | 8 | Clear summary |
| Trace Before Run is a free browser drill for beginning Python learners. | 12 | Listed claim: `open-access` |
| Five original puzzles ask for final variable values, the branch path, and printed output. | 14 | Listed claim: `five-puzzles` |
| The learner commits a prediction before the line-by-line trace appears. | 10 | Listed claim: `prediction-reveal` |
| A wrong answer points to the first differing final field. | 10 | Listed claim: `first-difference` |
| The editor interprets a small teaching grammar. | 7 | Listed claim: `restricted-grammar` |
| It never executes arbitrary Python. | 5 | Listed claim: `restricted-grammar` |
| Practice progress stays in browser storage, and the app works offline after the first visit. | 15 | Listed claims: `local-only`, `offline-reload` |
| Open the sample-data demo, or use the local demo URL during local development. | 12 | Clear entry instruction |
| The demo starts on the “Add the badge” puzzle and stores progress under a separate `demo:` key. | 17 | Listed claim: `demo-isolated` |
| “Reset demo” returns to the seeded state. | 7 | **Finding F-1-2** |
| Requirements: Node.js 20 or newer. | 6 | Clear prerequisite |
| Open the local URL. | 4 | Clear instruction |
| Use `/play` for normal practice or `/demo` for the isolated sample. | 11 | Clear route instruction |
| The Playwright suite checks the complete prediction flow, incorrect answers, restricted syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. | 25 | **Finding F-1-1** |
| The production build lands in `dist/` with `index.html` at its root. | 12 | Clear build outcome |
| Run the same suite against the deployed product with: | 9 | Clear instruction |
| This is deliberately not a Python runtime. | 7 | Clear boundary |
| Accounts, rankings, arbitrary code execution, and AI-generated hints are outside the product. | 12 | Clear boundary; matches brief non-goals |
| Build with `npm run build` and publish `dist/` as an Azure Static Web App. | 14 | Clear deployment instruction |
| `staticwebapp.config.json` supplies the SPA fallback, security headers, and cache rules. | 9 | Clear implementation note |
| The factory manages infrastructure and DNS. | 6 | Clear responsibility boundary |
| There are no accounts, analytics, third-party runtime scripts, or remote code execution. | 12 | Listed claims: `open-access`, `local-only`, `restricted-grammar` |
| See `/privacy` and `/terms` in the app. | 7 | Clear route instruction |
| Source code is available under the MIT License. | 8 | Repository fact |

## Demo and sandbox verification

**PASS.** The hero action opens `/demo` in one click. Its first screen is an
already-populated, realistic “Add the badge” branch puzzle with editable code,
variable fields, path choices, and a commit action. The persistent banner says
“Demo — sample data, nothing is saved” and provides **Reset demo** and **Start
for real**.

In a live fresh context seeded with
`real:trace-before-run:progress={"sentinel":"real-record"}`, completing the
demo created only `demo:trace-before-run:progress`. The real value was unchanged
byte-for-byte. Reset removed the demo key, restored “Add the badge” with empty
fields, and left the real sentinel intact. Captured live requests were only
same-origin GETs. After a warmed `/demo` visit, an intercepted offline reload
showed “You are offline. This saved page still works.” No console or page errors
occurred.

## Claims gate

**PASS for all declared claims.** From a fresh clone after `npm ci`, each
manifest command passed individually. The full clean-clone suite also passed
21/21 with `CI=1 npm test`; `npm run build` passed and produced `dist/`.

| Claim id | Command result |
| --- | --- |
| `prediction-reveal` | PASS, 1/1 |
| `restricted-grammar` | PASS, 1/1 |
| `editable-trace` | PASS, 1/1 |
| `demo-isolated` | PASS, 1/1 |
| `local-only` | PASS, 1/1 |
| `open-access` | PASS, 1/1 |
| `first-difference` | PASS, 1/1 |
| `five-puzzles` | PASS, 1/1 |
| `offline-reload` | PASS, 1/1 |

The landing page and README were re-read against `.factory/claims.json`.
F-1-2 is the sole material unlisted claim found. The reset behavior itself
works; the missing manifest entry/test tag is the defect.

## Earlier-review regression check

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files.
The earlier verification reports use headings rather than `F-*` identifiers;
each reported defect was rechecked on the live product and in source/tests.

| Earlier finding | Live and code confirmation |
| --- | --- |
| Valid edited program offered no correct path choice | Fixed. Editing to `range(20)` offered “Loop 20 times” before commit; `pathOptions()` adds the computed path and the tagged `editable-trace` test passes. |
| Mobile targets under 44 px | Fixed. At 390 px, tested hero/practice and demo actions are at least 44 px; the 390 px browser test passes. |
| First dark-theme toggle did nothing | Fixed. With OS dark mode, the first live toggle set `data-theme="light"` and changed the page colors; the regression test passes. |
| Non-numeric final values reached reveal | Fixed. A non-numeric score now reports “Enter a whole number for score. Then commit the trace.” before reveal; the regression test passes. |
| Showing a nudge discarded predictions and focus | Fixed. The live nudge toggle preserved all three values, selected path, and focus; the explicit regression test passes. |

## Structure, accessibility, and identity

**PASS.** `/`, `/demo`, `/play`, `/privacy`, `/terms`, and the designed missing
route each rendered one H1 and one main landmark. Route-specific titles,
descriptions, canonical URLs, OG/Twitter data, favicon, apple touch icon,
manifest, sitemap, and robots file were present. The missing route is a styled
“This path has no next line” view with a return route. Internal-link crawling
returned 200 for every discovered route. Header/footer navigation is consistent
and includes Privacy and Terms.

Browser navigation from `/` to `/demo` moved focus to the new H1 and announced
the route; Back returned focus to the landing H1. The full 21-test suite
includes axe serious/critical scans, keyboard radio/commit use, reduced-motion,
and 390 px overflow/target checks; it passed. The paper observatory art,
editorial type, warm paper/night palette, asymmetrical panels, and original
asset provenance are distinct from a generic SaaS template and match
`.factory/design.md`.

## Missed leverage

**No finding.** The brief explicitly excludes an AI hint bot and arbitrary code
execution. The completed browser drill already provides the implied core value:
editable restricted snippets, prediction-before-reveal, feedback, five linked
puzzles, local progress, and an offline sample. Import/export or sync would
expand the stated smallest useful product without a brief-supported job.

## What would make this perfect

Add the reset-demo claim entry/tagged test and shorten or split the one
25-word README sentence. Then rerun the nine manifest commands and `npm test`;
with those two changes, this review has no remaining finding.
