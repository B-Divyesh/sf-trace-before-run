# Adversarial first-read review 6 — Trace Before Run

**Verdict: PASS**

Reviewed 29 August 2026 against
<https://trace-before-run.sociobot.in> from fresh Chromium contexts at 390 ×
844 and 1440 × 900, and from a clean checkout of `4936a7a`. There are zero
blocking, major, minor, or untested-claim findings.

## Mandatory cold first read

**PASS.** Before scrolling, both viewports answered all three questions.

| Question | Cold answer | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It is a drill for predicting a short Python program before seeing its trace. | “Predict Python before you run it” |
| For whom? | New Python learners who know syntax but lose track of changing values. | “For new Python learners who know syntax but lose track of changing values.” |
| What should I click first? | Open the ready sample puzzle. | “Try it with sample data” and “Loads a ready branch puzzle. No sign-in.” |

At 390 × 844, the action ends at y=487.67 and the third fact ends at
y=671.25. At 1440 × 900, the action ends at y=648.05 and the third fact ends
at y=778.44. All are visible without scrolling. Both cold loads made only
same-origin GET requests and produced no browser console or page errors.

## Copy audit

Counts use whitespace-separated words; hyphenated terms and paths count as one
word. Code samples, repeated navigation labels, and punctuation-only
decoration are excluded. No audited sentence is longer than 22 words. There
are no jargon, marketing-adjective, terminology, contextless-heading,
metaphor, or action-label findings. The terms are consistent: **puzzle**,
**snippet**, **prediction**, **path**, **trace**, and **progress**.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Clear action |
| Trace Before Run | 3 | Wordmark |
| Practice / Demo / Privacy | 1 each | Clear navigation |
| Switch color theme | 3 | Clear control |
| Five Python tracing puzzles | 4 | Factual supporting label |
| Predict Python before you run it | 6 | Plain job headline |
| For new Python learners who know syntax but lose track of changing values. | 13 | Audience and situation |
| Try it with sample data | 5 | Clear sample-result action |
| Loads a ready branch puzzle. | 5 | Immediate outcome |
| No sign-in. | 2 | `open-access` |
| Free to use. | 3 | `open-access` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Practice stays on this device. | 5 | `local-only` |
| 01 / Example puzzle | 3 | Factual section marker |
| Example tracing puzzle | 3 | Factual section label |
| Hold the answer before the reveal | 6 | Prediction-gate heading |
| Read the snippet. | 3 | Instruction |
| Write the final values. | 4 | Instruction |
| Choose the path. | 3 | Instruction |
| Only then can you open the trace. | 7 | `prediction-reveal` |
| Your trace | 2 | Clear preview label |
| Choose the path | 3 | Clear preview label |
| Trace in three moves | 4 | Standalone how-it-works heading |
| Read | 1 | Step label |
| Read one line at a time | 6 | Step heading |
| Keep the current value beside each variable. | 7 | Instruction |
| Commit | 1 | Step label |
| Commit your full prediction | 4 | Step heading |
| Choose the branch and printed output before any result appears. | 10 | `prediction-reveal` |
| Inspect | 1 | Step label |
| Inspect the first difference | 4 | Step heading |
| See which line changed the value you missed. | 8 | `first-difference` |
| Start the five puzzles | 4 | `five-puzzles` action |
| A tracing drill, not a code runner | 7 | Boundary heading |
| The editor accepts small assignments, conditions, loops, and print calls. | 10 | `restricted-grammar` |
| It does not run arbitrary Python or send code to a server. | 12 | `restricted-grammar`, `local-only` |
| Your practice stays local. | 4 | `local-only` |
| Progress uses browser storage. | 4 | `local-only` |
| Clear it from the Privacy page. | 6 | `clear-progress` |
| Predict first. | 2 | Footer instruction |
| Then inspect the trace. | 4 | Footer instruction |
| Built by Param Factory · v1.0 | 5 | Attribution and build label |

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Predict short Python traces before seeing the result. | 8 | Clear summary |
| Trace Before Run is a free browser drill for beginning Python learners. | 12 | `open-access` |
| Five puzzles ask for final variable values, the branch path, and printed output. | 13 | `five-puzzles` |
| The learner commits a prediction before the line-by-line trace appears. | 10 | `prediction-reveal` |
| A wrong answer points to the first differing final field. | 10 | `first-difference` |
| The editor interprets a small teaching grammar. | 7 | `restricted-grammar` |
| It never executes arbitrary Python. | 5 | `restricted-grammar` |
| Practice progress stays in browser storage, and the app works offline after the first visit. | 15 | `local-only`, `offline-reload` |
| Open the sample-data demo, or use the local demo URL during local development. | 12 | Clear instruction |
| The demo starts on the “Add the badge” puzzle and stores progress under a separate `demo:` key. | 17 | `demo-isolated` |
| “Reset demo” returns to the seeded state without changing practice progress. | 11 | `reset-demo` |
| Requirements: Node.js 20 or newer. | 5 | Clear prerequisite |
| Open the local URL. | 4 | Clear instruction |
| Use `/play` for normal practice or `/demo` for the isolated sample. | 11 | Clear route instruction |
| The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. | 19 | Clear test scope |
| The production build lands in `dist/` with `index.html` at its root. | 11 | Verified build result |
| Run the same suite against the deployed product with: | 9 | Clear instruction |
| This is deliberately not a Python runtime. | 7 | Clear boundary |
| Accounts, rankings, arbitrary code execution, and AI-generated hints are outside the product. | 12 | Brief-aligned non-goals |
| Build with `npm run build` and publish `dist/` as an Azure Static Web App. | 14 | Clear deployment instruction |
| `staticwebapp.config.json` supplies route rewrites, the real 404 response, security headers, and cache rules. | 13 | Repository fact |
| The factory manages infrastructure and DNS. | 6 | Responsibility boundary |
| There are no accounts, analytics, third-party runtime scripts, or remote code execution. | 12 | `open-access`, `no-tracking`, `restricted-grammar` |
| See `/privacy` and `/terms` in the app. | 7 | Clear route instruction |
| Source code is available under the MIT License. | 8 | Repository fact |

## Demo, sandbox, privacy, and claims

**PASS.** The landing action reaches `/?demo=1` in one click. Its first
screen is already a usable “Add the badge” exercise with a realistic editable
snippet, final-value fields, path choices, and the commit action. The visible,
persistent banner says “Demo — sample data, nothing is saved” and includes
Reset demo and Start for real.

The tagged `demo-isolated` and `reset-demo` tests seed a real-progress
sentinel, complete the sample, reset or leave it, and confirm that the demo
key is isolated/discarded while the real value remains byte-for-byte intact.
The live request log recorded only same-origin GET requests. The offline claim
test warms the service worker, reloads offline, and shows the explicit offline
status. No demo state is written to the real namespace.

`.factory/claims.json` has 12 declared claims. Every manifest command was run
from the clean checkout and passed; the grouped run also passed 12/12.

| Claim id | Result |
| --- | --- |
| `prediction-reveal` | PASS |
| `restricted-grammar` | PASS |
| `editable-trace` | PASS |
| `demo-isolated` | PASS |
| `reset-demo` | PASS |
| `clear-progress` | PASS |
| `local-only` | PASS |
| `no-tracking` | PASS |
| `open-access` | PASS |
| `first-difference` | PASS |
| `five-puzzles` | PASS |
| `offline-reload` | PASS |

There are no unlisted claim-like landing or README sentences: each
visitor-facing product, privacy, availability, and demo behavior maps to the
listed claim/test shown above. The small teaching-grammar boundary matches the
brief; the brief explicitly excludes arbitrary execution and an AI hint bot.
Import, export, sync, or an AI step is not implied by this prediction-first
drill, so missed leverage is not a finding.

## Earlier findings: live and code recheck

Every earlier review, polish report, and the preceding handoff was read. Each
earlier finding was confirmed fixed on the deployed page and in the current
code/tests; none is merely marked fixed.

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 | README suite sentence is 19 words. |
| F-1-2 | `reset-demo` is declared and its tagged test preserves real progress. |
| F-2-1 | Desktop action/facts are entirely in the first viewport; the 1440 × 900 assertion passes. |
| F-2-2 | `no-tracking` is declared and its complete-flow request/beacon/cookie test passes. |
| F-2-3 | `/not-a-real-route` returns HTTP 404 and serves the designed recovery page. |
| F-3-1 | Live Back/Forward restores scroll and focuses the route H1. |
| F-3-2 | Privacy clears both namespaces and announces completion under `clear-progress`. |
| F-3-3 | The efficacy heading is now “Trace in three moves.” |
| F-3-4 | README says “Five puzzles,” without the unverified “original” adjective. |
| F-4-1 | The footer has no asset-provenance promise. |
| F-4-2 | `open-access` completes all five puzzles and rejects account/payment gates and external requests. |
| F-5-1 | The non-informative hero caption is removed. |
| F-5-2 | Hero supporting label is “Five Python tracing puzzles.” |
| F-5-3 | Preview label is “Example tracing puzzle.” |
| F-5-4 | Preview marker is “01 / Example puzzle.” |
| F-5-5 | Static 404 begins “Page not found” and uses literal recovery copy. |

## Structure, accessibility, identity, and verification

**PASS.** `/`, `/demo`, `/?demo=1`, `/play`, `/privacy`, `/terms`,
`/404.html`, robots, sitemap, favicon, touch icon, and manifest return 200.
The deliberate unknown route returns 404. Route-specific title, description,
canonical, Open Graph, and Twitter metadata are present; the static 404 has
the corresponding designed metadata. Every checked route has one H1 and one
main landmark. The header, skip link, footer, Privacy, and Terms links are
consistent. Deep linking, H1 focus, route announcement, and mobile history
scroll restoration pass in the live suite.

`verify-url.sh` found no console errors, missing image alt text, or unlabeled
buttons on the live home, demo, and privacy pages. Live Axe scans found no
serious or critical issues in light or dark treatment. Keyboard path selection,
visible focus, 44 px mobile targets, reduced motion, no horizontal overflow,
and offline reload are covered by passing tests.

The cut-paper observatory image, ink/cream/night palette, editorial serif,
paper-like clipped panels, and branch/variable visual language conform to the
design record and are distinct from a generic SaaS template. The final build
passes and emits `dist/`; JavaScript is 10.31 KB gzip and CSS is 4.65 KB gzip.

## What would make this perfect

No required product work remains. Maintain the existing claim-to-test mapping,
first-screen demo route, and live route/accessibility checks as future changes
are made.
