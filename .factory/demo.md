# Demo sandbox

## Entry point

- Production: `https://trace-before-run.sociobot.in/demo`
- Local: `http://localhost:5173/demo`
- Query alias: `/?demo=1`

The first screen is the ready-to-use “Add the badge” puzzle. It includes a realistic snippet, two final-variable fields, a printed-output field, two branch choices, and a line-by-line reveal.

## Isolation

Demo progress uses `localStorage` key `demo:trace-before-run:progress`. Normal practice uses `real:trace-before-run:progress`. Demo code never reads or writes the real key.

“Reset demo” removes the demo key and reloads the seeded puzzle. “Start for real” removes demo progress before opening `/play`.

## Verification

Run `npm test`. Claim tests always open a fresh browser context and use the demo data. The privacy test records every request during a completed trace, asserts that every request is same-origin, and checks the storage namespaces.
