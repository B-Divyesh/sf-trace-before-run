# Demo sandbox

## Entry point

- Production: `https://trace-before-run.sociobot.in/?demo=1`
- Local: `http://localhost:5173/?demo=1`
- Route alias: `/demo`

The first screen is the ready-to-use “Add the badge” puzzle. It includes a realistic snippet, two final-variable fields, a printed-output field, two branch choices, and a line-by-line reveal.

## Isolation

Demo progress uses `localStorage` key `demo:trace-before-run:progress`. Normal practice uses `real:trace-before-run:progress`. Demo code never reads or writes the real key.

“Reset demo” removes the demo key and reloads the seeded puzzle. “Start for real” removes demo progress before opening `/play`.

## Verification

Run `npm test`. Claim tests open fresh browser contexts and use the sample data. Privacy tests record requests, beacons, cookies, and both storage namespaces.
