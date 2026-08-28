# Copy audit

Audited 28 August 2026 for polish round 3. Counts use whitespace-separated
words, treat hyphenated terms and URLs as one word, and ignore standalone
punctuation. Code samples and repeated navigation labels are excluded.

## Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Clear action |
| Trace Before Run | 3 | Wordmark |
| Practice / Demo / Privacy | 1 each | Clear navigation labels |
| Switch color theme | 3 | Clear accessible action |
| A five-puzzle tracing desk | 4 | Clear supporting label |
| Predict Python before you run it | 6 | Plain job headline |
| For new Python learners who know syntax but lose track of changing values. | 13 | Audience and situation |
| Try it with sample data | 5 | Result-naming action |
| Loads a ready branch puzzle. | 5 | Clear outcome |
| No sign-in. | 2 | Listed claim: `open-access` |
| Free to use. | 3 | Listed claim: `open-access` |
| Works offline after the first visit. | 6 | Listed claim: `offline-reload` |
| Practice stays on this device. | 5 | Listed claim: `local-only` |
| At the logic observatory, every value has a place and every branch leaves a trail. | 15 | Nonessential illustration caption |
| The prediction desk | 3 | Clear section label |
| Hold the answer before the reveal | 6 | Clear prediction gate |
| Read the snippet. | 3 | Clear instruction |
| Write the final values. | 4 | Clear instruction |
| Choose the path. | 3 | Clear instruction |
| Only then can you open the trace. | 7 | Listed claim: `prediction-reveal` |
| Your trace | 2 | Clear preview label |
| Choose the path | 3 | Clear preview label |
| Trace in three moves | 4 | Factual section heading |
| Read | 1 | Clear step label |
| Read one line at a time | 6 | Clear heading |
| Keep the current value beside each variable. | 7 | Clear instruction |
| Commit | 1 | Clear step label |
| Commit your full prediction | 4 | Clear heading |
| Choose the branch and printed output before any result appears. | 10 | Listed claim: `prediction-reveal` |
| Inspect | 1 | Clear step label |
| Inspect the first difference | 4 | Clear heading |
| See which line changed the value you missed. | 8 | Listed claim: `first-difference` |
| Start the five puzzles | 4 | Listed claim: `five-puzzles` |
| A tracing drill, not a code runner | 7 | Clear boundary heading |
| The editor accepts small assignments, conditions, loops, and print calls. | 10 | Listed claim: `restricted-grammar` |
| It does not run arbitrary Python or send code to a server. | 12 | Listed claims: `restricted-grammar`, `local-only` |
| Your practice stays local. | 4 | Listed claim: `local-only` |
| Progress uses browser storage. | 4 | Listed claim: `local-only` |
| Clear it from the Privacy page. | 6 | Listed claim: `clear-progress` |
| Predict first. | 2 | Clear footer line |
| Then inspect the trace. | 4 | Clear footer line |
| Built by Param Factory · v1.0 | 5 | Attribution and build id |
| Original generated art. | 3 | Provenance recorded in `.factory/design.md` |

## README

| Copy | Words | Result |
| --- | ---: | --- |
| Predict short Python traces before seeing the result. | 8 | Clear summary |
| Trace Before Run is a free browser drill for beginning Python learners. | 12 | Listed claim: `open-access` |
| Five puzzles ask for final variable values, the branch path, and printed output. | 13 | Listed claim: `five-puzzles` |
| The learner commits a prediction before the line-by-line trace appears. | 10 | Listed claim: `prediction-reveal` |
| A wrong answer points to the first differing final field. | 10 | Listed claim: `first-difference` |
| The editor interprets a small teaching grammar. | 7 | Listed claim: `restricted-grammar` |
| It never executes arbitrary Python. | 5 | Listed claim: `restricted-grammar` |
| Practice progress stays in browser storage, and the app works offline after the first visit. | 15 | Listed claims: `local-only`, `offline-reload` |
| Open the sample-data demo, or use the local demo URL during local development. | 12 | Clear instruction |
| The demo starts on the “Add the badge” puzzle and stores progress under a separate `demo:` key. | 17 | Listed claim: `demo-isolated` |
| “Reset demo” returns to the seeded state without changing practice progress. | 11 | Listed claim: `reset-demo` |
| Requirements: Node.js 20 or newer. | 5 | Clear prerequisite |
| Open the local URL. | 4 | Clear instruction |
| Use `/play` for normal practice or `/demo` for the isolated sample. | 11 | Clear route instruction |
| The Playwright suite checks tracing, syntax, keyboard use, demo isolation, offline reload, accessibility, routing, and the 390 px layout. | 19 | Clear test description |
| The production build lands in `dist/` with `index.html` at its root. | 11 | Verified build outcome |
| Run the same suite against the deployed product with: | 9 | Clear instruction |
| This is deliberately not a Python runtime. | 7 | Clear boundary |
| Accounts, rankings, arbitrary code execution, and AI-generated hints are outside the product. | 12 | Brief-aligned non-goals |
| Build with `npm run build` and publish `dist/` as an Azure Static Web App. | 14 | Clear deployment instruction |
| `staticwebapp.config.json` supplies route rewrites, the real 404 response, security headers, and cache rules. | 13 | Verified repository fact |
| The factory manages infrastructure and DNS. | 6 | Clear responsibility boundary |
| There are no accounts, analytics, third-party runtime scripts, or remote code execution. | 12 | Listed claims: `open-access`, `no-tracking`, `restricted-grammar` |
| See `/privacy` and `/terms` in the app. | 7 | Clear route instruction |
| Source code is available under the MIT License. | 8 | Repository fact |

No audited sentence exceeds 22 words or contains a banned marketing word. The
round 3 efficacy adjective and unverified README provenance adjective are gone.

## Catalog description

“Practice Python traces by predicting values, paths, and output before the
reveal.” starts with a verb and is 81 characters.

## Terminology table

| Concept | One term used |
| --- | --- |
| A learning item | puzzle |
| The code under study | snippet |
| A learner's proposed result | prediction |
| A conditional route | path |
| The ordered state explanation | trace |
| Values after the final line | final values |
| Browser-saved completion state | progress |
| Isolated sample experience | demo |
