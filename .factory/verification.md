# Independent product verification — Trace Before Run

## Verdict: FAIL

Candidate `546cb25cf3f8521be2b983eaee39173fae31461d` is deployed at
`https://trace-before-run.sociobot.in` and is byte-for-byte identical to the
locally built HTML, JavaScript, CSS, and service worker. The deployment is
healthy, but the candidate is not releasable: a valid edit can change the
computed branch/loop path without updating the choices offered before commit.
That makes a correct prediction impossible for supported code and breaks the
brief's editable-snippet job.

Verified independently on 28 August 2026 from a clean checkout. Product code
was not changed.

## Release-blocking defect

### High — valid edited programs can have no correct path choice

Reproduction on the live `/demo` route:

1. Replace the sample with:

   ```text
   score = 0
   badge = 0
   for step in range(20):
       score = score + 1
   print(score)
   ```

2. The editor reports no grammar error and enables `Commit my trace`.
3. Enter `score = 20`, `badge = 0`, and printed output `20`.
4. Before commit, the only path choices remain `If path` and `Else path`.
5. Commit either offered path. The reveal reports the actual path as
   `Loop 20 times`.

Expected: the path choices refresh after every valid edit and include the
computed path before commit. Actual: the correct path appears only after the
answer has been committed and revealed. The same class of failure occurs when
an edit changes a bundled loop count to a path not already in that puzzle's
static choices.

Evidence:

- `.factory/evidence/verification/edited-path-before-commit.png`
- `.factory/evidence/verification/edited-path-mismatch.png`
- Browser observation before commit: `offered=["If path","Else path"]`,
  `commitEnabled=true`; reveal actual: `Loop 20 times`.

## Other defects

### Medium — mobile targets miss the 44 px baseline

At a 390 px viewport:

- `Start the five puzzles` is `212 × 19` CSS px.
- `Reset demo` is `167 × 40` CSS px.
- `Start for real` is `167 × 40` CSS px.

All are actionable controls and miss the contract's 44 px minimum height.

### Medium — the first theme-toggle click does nothing in OS dark mode

With `prefers-color-scheme: dark`, the initial body background was
`rgb(16, 25, 35)`. The first activation changed the root theme value from
unset to `dark`, leaving the same background and foreground. Only the second
activation changed to light. A control named `Switch color theme` should
change the theme on every activation.

### Low — non-numeric variable predictions bypass input validation

Entering `not-a-number` for a final variable, plus otherwise valid answers,
submits and reveals a mismatch (`score ends as 8, not not-a-number`) instead
of explaining that final values must be whole numbers. The form declares a
numeric pattern but uses `novalidate` and does not enforce that pattern in its
custom validation.

## Mandatory first-read test

PASS. A cold live load answers all three questions in the first viewport:

- What it does: `Predict Python before you run it` and a five-puzzle tracing
  desk.
- Who it is for: new Python learners who know syntax but lose track of
  changing values.
- What to click first: `Try it with sample data`; adjacent text says it loads
  a ready branch puzzle with no sign-in.

The action opens `/demo` in one click with the seeded `Add the badge` puzzle
and the persistent demo banner.

## Claims gate

`.factory/claims.json` exists. After the required clean-clone `npm ci`, every
listed command was run separately and passed against the production preview:

| Claim | Exact test | Result |
| --- | --- | --- |
| `prediction-reveal` | `npm test -- --grep @claim:prediction-reveal` | PASS, 1/1 |
| `restricted-grammar` | `npm test -- --grep @claim:restricted-grammar` | PASS, 1/1 |
| `editable-trace` | `npm test -- --grep @claim:editable-trace` | PASS, 1/1 |
| `demo-isolated` | `npm test -- --grep @claim:demo-isolated` | PASS, 1/1 |
| `local-only` | `npm test -- --grep @claim:local-only` | PASS, 1/1 |
| `open-access` | `npm test -- --grep @claim:open-access` | PASS, 1/1 |
| `first-difference` | `npm test -- --grep @claim:first-difference` | PASS, 1/1 |
| `five-puzzles` | `npm test -- --grep @claim:five-puzzles` | PASS, 1/1 |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS, 1/1 |

The shipped `editable-trace` test changes a value from 7 to 3, for which the
new `Else path` is already one of the static choices. It therefore does not
cover the release-blocking path-refresh case above.

Landing and README claims map to these entries; no additional material
visitor-facing claim was found without a corresponding observable test.

## Clean checkout gates

- `npm ci`: PASS; 22 packages installed, 0 vulnerabilities reported.
- `npm test`: PASS; 17/17 Playwright tests in 39.2 seconds.
- `npm run build`: PASS; strict `tsc --noEmit` and Vite production build.
- Separate lint script: not present. Strict TypeScript runs in the build.
- `npm audit --omit=dev`: PASS; 0 vulnerabilities.
- `git diff --check`: PASS before the report was written.
- Build output: `dist/index.html` plus static assets.

Production build sizes:

- JavaScript: 28.00 KB raw / 9.71 KB gzip.
- CSS: 16.55 KB raw / 4.61 KB gzip.
- Mobile hero: 9.02 KB AVIF / 14.03 KB WebP.
- Fonts: 0 bytes; system stacks only.

## Deployment identity and response policy

Local and live SHA-256 hashes matched exactly:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `8763dd3fe1b8f2bab33788c96b1210c1b443f5f089663b63252b2109b888cb49` |
| `index-BlHewQ0B.js` | `48c35e049a58c86dae51c387c5726a226cff5ddb7533528cc1d195654ac02605` |
| `index-BOShve06.css` | `af17654a95ac5f40bdb950c6146d199d72c6b2ea9401c79f19a9a4eb5aaf0fe2` |
| `sw.js` | `6bc9192ad1c29e04cbcc15113fb11292c5ea4dfffd3f59d0ede280ed0aa71043` |

Live responses include CSP, HSTS, `X-Content-Type-Options: nosniff`, strict
referrer policy, and camera/microphone/geolocation restrictions. HTML uses
`max-age=30, must-revalidate`; hashed assets use one-year immutable caching;
the service worker uses `no-cache`. All internal links, metadata assets,
`robots.txt`, and `sitemap.xml` returned 200.

## End-to-end and resilience checks

PASS unless called out above:

- Correct sample prediction stays hidden until commit and reveals the full
  trace.
- Wrong prediction identifies the first differing variable; retry returns
  focus to the first variable.
- Empty submission gives a specific error and focuses the missing field.
- Unsupported `import os` is rejected and disables commit.
- `range(21)` is rejected; `range(20)` is accepted, exposing the path-choice
  defect above.
- Restore, reset demo, start for real, clear progress, and five-puzzle session
  completion work.
- Demo writes only `demo:trace-before-run:progress`; practice uses only the
  `real:` key.
- Direct links, reloads, back/forward navigation, route focus, route titles,
  canonical URLs, and the styled missing-page screen work.
- At browser zoom 200%, the full prediction flow remains operable by keyboard.

## Accessibility, mobile, and visual review

- Factory `verify-url.sh`: PASS; HTTPS 200, `lang=en`, title, one H1, main
  landmark, alt text, labeled buttons, and no console/page errors.
- Playwright axe on `/`, `/demo`, `/play`, `/privacy`, `/terms`, and the
  missing-page route: 0 serious or critical findings.
- Light, dark, 390 px, and reduced-motion treatments were exercised.
- Keyboard Tab order begins with the skip link and reaches all workbench
  controls. Native radio arrow keys and Space/Enter activation work.
- Focus style is a 3 px gold outline with a contrasting 5 px ink surround.
- Reduced motion changes document scrolling to `auto` and removes meaningful
  transition duration.
- No horizontal overflow at 390 px. Visual inspection found no clipping or
  overlap. The sub-44 px controls remain a contract failure.

Evidence:

- `.factory/evidence/verification/verify.json`
- `.factory/evidence/verification/screenshot-desktop.png`
- `.factory/evidence/verification/screenshot-mobile.png`

## Privacy and network

- During full live demo and practice flows, every observed request was a
  same-origin GET. No third-party request, analytics request, answer upload,
  console error, page error, or unexpected request method occurred.
- Static inspection found no `eval`, dynamic `Function`, external runtime
  script, Azure key, Sociobot key, or remote inference call.
- CSP matches the runtime; an attempted inline style was blocked as expected.
- There are no accounts or payment/unlock calls.

Rate limiting is not applicable: this static product exposes no server-side
API endpoint and makes no product-unlock request. Sign-in/Entra checks are not
applicable. Library/CLI/backend checks are also not applicable.

## PWA and performance

- Service worker registered, controlled the page, completed an explicit
  update check, and had no waiting worker.
- Offline reload after a warmed visit succeeded on `/demo` with the offline
  status message and working sample.
- The manifest parsed without browser installability errors.
- Independent Lighthouse mobile run: Performance 100, Accessibility 100,
  Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.0 s, TBT 30 ms, CLS 0.
- Event Timing for the commit click was 32 ms in the lab run; field INP is not
  available from a one-off verification.
- Initial Lighthouse transfer was about 30 KB with no font or third-party
  payload.

Full Lighthouse evidence:
`.factory/evidence/verification/lighthouse.json`.

## Product and design contract

The prediction-before-reveal mechanic, five original puzzles, restricted
grammar, local storage, and no-account/free scope match the researched brief.
The visual system is product-specific and documented in `.factory/design.md`:
editorial observatory art, warm paper/night palette, system type stacks,
8 px rhythm, responsive workbench, and reduced-motion policy. Generated art
provenance is recorded and no third-party visual asset was found.

AI is correctly absent: the brief explicitly makes an AI hint bot a non-goal,
and the core tracing exercise benefits from deterministic, local behavior.

## Required next action

Refresh path choices immediately after every valid editor change, and add a
claim test whose edit changes to a previously unavailable loop/branch path.
Then fix the mobile target sizes, dark-mode toggle, and numeric input error,
and rerun this verification from a clean checkout and the live deployment.
