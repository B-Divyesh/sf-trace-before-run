import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const productOrigin = new URL(process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173").origin;
const canonicalOrigin = "https://trace-before-run.sociobot.in";

test("landing explains the job and links to a ready demo", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Trace Before Run — predict Python output");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Predict Python before you run it");
  const demoLink = page.getByRole("link", { name: "Try it with sample data" });
  await expect(demoLink).toHaveAttribute("href", "/?demo=1");
  await demoLink.click();
  await expect(page).toHaveURL(/\/?\?demo=1$/);
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Editable Python-like snippet" })).toHaveValue(/score = 7/);
});

test("review copy states facts without unverified efficacy or provenance wording", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Trace in three moves" })).toBeVisible();
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  expect(readme).toContain("Five puzzles ask for final variable values, the branch path, and printed output.");
  expect(readme).not.toContain("Five original puzzles");
  const catalog = readFileSync(new URL("../.factory/catalog-description.txt", import.meta.url), "utf8").trim();
  expect(catalog).toBe("Practice Python traces by predicting values, paths, and output before the reveal.");
  expect(catalog.length).toBeLessThanOrEqual(120);
});

test("@claim:prediction-reveal commits before showing a line trace", async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByTestId("reveal")).toHaveCount(0);
  await page.getByLabel("Final value of score").fill("8");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByTestId("reveal")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Every value, path, and printed result matches." })).toBeVisible();
  await expect(page.getByText("score becomes 7.")).toBeVisible();
  await expect(page.getByText("Prints 8.")).toBeVisible();
});

test("@claim:first-difference a wrong answer explains the first difference", async ({ page }) => {
  await page.goto("/demo");
  await page.getByLabel("Final value of score").fill("7");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByRole("heading", { name: /score ends as 8/ })).toBeVisible();
  await page.getByRole("button", { name: "Change my prediction" }).click();
  await expect(page.getByLabel("Final value of score")).toBeFocused();
});

test("@claim:restricted-grammar rejects code outside the teaching grammar", async ({ page }) => {
  await page.goto("/demo");
  const editor = page.getByRole("textbox", { name: "Editable Python-like snippet" });
  await editor.fill("import os");
  await expect(page.getByText("Line 1 is outside the supported grammar.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Commit my trace" })).toBeDisabled();
  await page.getByRole("button", { name: "Restore puzzle" }).click();
  await expect(editor).toHaveValue(/score = 7/);
});

test("@claim:editable-trace refreshes the path for an edited loop", async ({ page }) => {
  await page.goto("/demo");
  const editor = page.getByRole("textbox", { name: "Editable Python-like snippet" });
  await editor.fill(`score = 0
badge = 0
for step in range(20):
    score = score + 1
print(score)`);
  await expect(page.getByText("Line 1 is outside the supported grammar.")).toHaveCount(0);
  await expect(page.getByLabel("Loop 20 times", { exact: true })).toBeVisible();
  await editor.fill((await editor.inputValue()).replace("range(20)", "range(19)"));
  await expect(page.getByLabel("Loop 19 times", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Loop 20 times", { exact: true })).toHaveCount(0);
  await editor.fill((await editor.inputValue()).replace("range(19)", "range(20)"));
  await expect(page.getByLabel("Loop 20 times", { exact: true })).toBeVisible();
  await page.getByLabel("Final value of score").fill("20");
  await page.getByLabel("Final value of badge").fill("0");
  await page.getByLabel("Printed output").fill("20");
  await page.getByLabel("Loop 20 times", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByText("Trace matched")).toBeVisible();
  await expect(page.getByText("Prints 20.")).toBeVisible();
});

test("missing predictions produce a specific error", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByText("Add a prediction for score. Then commit the trace.")).toBeVisible();
  await expect(page.getByLabel("Final value of score")).toBeFocused();
});

test("non-numeric final values show a format error before reveal", async ({ page }) => {
  await page.goto("/demo");
  await page.getByLabel("Final value of score").fill("not-a-number");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByText("Enter a whole number for score. Then commit the trace.")).toBeVisible();
  await expect(page.getByLabel("Final value of score")).toBeFocused();
  await expect(page.getByLabel("Final value of score")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByTestId("reveal")).toHaveCount(0);
  await page.getByLabel("Final value of score").fill("8");
  await expect(page.getByLabel("Final value of score")).not.toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Enter a whole number for score. Then commit the trace.")).toHaveCount(0);
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByText("Trace matched")).toBeVisible();
});

test("showing and hiding a nudge preserves the uncommitted prediction and focus", async ({ page }) => {
  await page.goto("/demo");
  const score = page.getByLabel("Final value of score");
  const badge = page.getByLabel("Final value of badge");
  const output = page.getByLabel("Printed output");
  const path = page.getByLabel("If path", { exact: true });

  await score.fill("8");
  await badge.fill("1");
  await output.fill("8");
  await path.check();

  await page.getByRole("button", { name: "Show one nudge" }).click();
  await expect(page.getByText("Decide whether 7 passes the test before adding badge.")).toBeVisible();
  await expect(score).toHaveValue("8");
  await expect(badge).toHaveValue("1");
  await expect(output).toHaveValue("8");
  await expect(path).toBeChecked();
  await expect(page.getByRole("button", { name: "Hide the nudge" })).toBeFocused();

  await page.getByRole("button", { name: "Hide the nudge" }).click();
  await expect(page.getByText("Decide whether 7 passes the test before adding badge.")).toBeHidden();
  await expect(score).toHaveValue("8");
  await expect(badge).toHaveValue("1");
  await expect(output).toHaveValue("8");
  await expect(path).toBeChecked();
  await expect(page.getByRole("button", { name: "Show one nudge" })).toBeFocused();
});

test("@claim:demo-isolated keeps demo progress out of practice storage", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== productOrigin) externalRequests.push(request.url());
  });
  const realProgress = JSON.stringify({ current: 4, solved: ["real-sentinel"], attempts: 9 });
  await page.addInitScript((value) => localStorage.setItem("real:trace-before-run:progress", value), realProgress);
  await page.goto("/?demo=1");
  await page.getByLabel("Final value of score").fill("8");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain("demo:trace-before-run:progress");
  expect(await page.evaluate(() => localStorage.getItem("real:trace-before-run:progress"))).toBe(realProgress);
  expect(externalRequests).toEqual([]);
});

test("@claim:no-tracking runs a complete demo without analytics or tracking", async ({ page, context }) => {
  const requests: { url: string; method: string; resourceType: string }[] = [];
  page.on("request", (request) => requests.push({
    url: request.url(),
    method: request.method(),
    resourceType: request.resourceType(),
  }));
  await page.addInitScript(() => {
    Object.defineProperty(window, "__trackingEvidence", { value: { beacons: [] as string[] }, configurable: false });
    Object.defineProperty(navigator, "sendBeacon", {
      value: (url: string | URL) => {
        (window as typeof window & { __trackingEvidence: { beacons: string[] } }).__trackingEvidence.beacons.push(String(url));
        return true;
      },
      configurable: true,
    });
  });
  await page.goto("/?demo=1");
  await page.getByLabel("Final value of score").fill("8");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByText("Trace matched")).toBeVisible();

  const evidence = await page.evaluate(() => ({
    beacons: (window as typeof window & { __trackingEvidence: { beacons: string[] } }).__trackingEvidence.beacons,
    cookies: document.cookie,
    storageKeys: Object.keys(localStorage),
  }));
  const allowedPaths = [/^\/$/, /^\/assets\//, /^\/sw\.js$/, /^\/favicon\.svg$/, /^\/manifest\.webmanifest$/];
  expect(evidence.beacons).toEqual([]);
  expect(evidence.cookies).toBe("");
  expect(evidence.storageKeys).toEqual(["demo:trace-before-run:progress"]);
  expect(requests.length).toBeGreaterThan(0);
  expect(requests.every(({ url, method }) => {
    const parsed = new URL(url);
    return parsed.origin === productOrigin && method === "GET" && allowedPaths.some((pattern) => pattern.test(parsed.pathname));
  })).toBe(true);
  expect(await context.cookies()).toEqual([]);
});

test("@claim:local-only keeps practice progress and answers in the browser", async ({ page }) => {
  const requests: { url: string; method: string }[] = [];
  page.on("request", (request) => requests.push({ url: request.url(), method: request.method() }));
  await page.goto("/play");
  await page.getByLabel("Final value of marbles").fill("4");
  await page.getByLabel("Final value of boxes").fill("2");
  await page.getByLabel("Printed output").fill("2");
  await page.getByLabel("If path", { exact: true }).check();
  await page.waitForTimeout(500);
  const requestCountBeforeCommit = requests.length;
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await page.waitForTimeout(100);
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain("real:trace-before-run:progress");
  expect(requests).toHaveLength(requestCountBeforeCommit);
  expect(requests.every((request) => new URL(request.url).origin === productOrigin && request.method === "GET")).toBe(true);
});

test("@claim:open-access starts practice without an account or payment", async ({ page }) => {
  await page.goto("/play");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Split the marbles");
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Commit my trace" })).toBeVisible();
});

test("@claim:reset-demo returns the seeded sample without changing practice progress", async ({ page }) => {
  const realProgress = JSON.stringify({ current: 3, solved: ["sentinel"], attempts: 17 });
  await page.addInitScript((value) => localStorage.setItem("real:trace-before-run:progress", value), realProgress);
  await page.goto("/?demo=1");
  await page.getByLabel("Final value of score").fill("8");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("demo:trace-before-run:progress"))).not.toBeNull();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Add the badge");
  await expect(page.getByLabel("Final value of score")).toHaveValue("");
  expect(await page.evaluate(() => localStorage.getItem("demo:trace-before-run:progress"))).toBeNull();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("real:trace-before-run:progress"))).toBe(realProgress);
});

test("@claim:clear-progress removes practice and demo progress from this browser", async ({ page }) => {
  const requests: { url: string; method: string }[] = [];
  page.on("request", (request) => requests.push({ url: request.url(), method: request.method() }));
  await page.addInitScript(() => {
    localStorage.setItem("real:trace-before-run:progress", JSON.stringify({ current: 4, solved: ["real"], attempts: 7 }));
    localStorage.setItem("demo:trace-before-run:progress", JSON.stringify({ current: 2, solved: ["demo"], attempts: 3 }));
  });
  await page.goto("/?demo=1");
  await page.getByRole("link", { name: "Privacy", exact: true }).first().click();
  await page.getByRole("button", { name: "Clear saved progress" }).click();

  expect(await page.evaluate(() => ({
    practice: localStorage.getItem("real:trace-before-run:progress"),
    demo: localStorage.getItem("demo:trace-before-run:progress"),
  }))).toEqual({ practice: null, demo: null });
  await expect(page.getByRole("status")).toHaveText("Saved progress was cleared from this browser.");
  expect(requests.every(({ url, method }) => new URL(url).origin === productOrigin && method === "GET")).toBe(true);
});

test("the demo query alias opens the isolated sample", async ({ page }) => {
  await page.goto("/?demo=1");
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Add the badge");
});

test("desktop first screen keeps the action and all three facts inside 1440 by 900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const action = page.locator(".hero-action");
  await expect(action).toBeVisible();
  const box = await action.boundingBox();
  expect(box).not.toBeNull();
  expect((box?.y || 0) + (box?.height || 0)).toBeLessThanOrEqual(await page.evaluate(() => window.innerHeight));
  const facts = page.locator(".plain-facts li");
  await expect(facts).toHaveCount(3);
  const lastFactBox = await facts.last().boundingBox();
  expect(lastFactBox).not.toBeNull();
  expect((lastFactBox?.y || 0) + (lastFactBox?.height || 0)).toBeLessThanOrEqual(await page.evaluate(() => window.innerHeight));
});

test("routes set their own metadata, restore focus, and serve a real 404", async ({ page, request }) => {
  const routes = [
    { path: "/", title: "Trace Before Run — predict Python output", canonical: "/" },
    { path: "/demo", title: "Demo — Trace Before Run", canonical: "/demo" },
    { path: "/play", title: "Practice — Trace Before Run", canonical: "/play" },
    { path: "/privacy", title: "Privacy — Trace Before Run", canonical: "/privacy" },
    { path: "/terms", title: "Terms — Trace Before Run", canonical: "/terms" },
  ];
  for (const route of routes) {
    await page.goto(route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${canonicalOrigin}${route.canonical}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", route.title);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", route.title);
  }

  await page.goto("/");
  await page.getByRole("link", { name: "Try it with sample data" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Predict Python before you run it");
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();

  const missing = await request.get("/not-a-real-route", { headers: { Accept: "text/html" } });
  expect(missing.status()).toBe(404);
  await page.goto("/not-a-real-route");
  await expect(page).toHaveTitle("Page not found — Trace Before Run");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This path has no next line");
  await expect(page.getByRole("link", { name: "Return to the first step" })).toHaveAttribute("href", "/");
  const footer = page.getByRole("navigation", { name: "Footer navigation" });
  await expect(footer.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
  await expect(footer.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
});

test("mobile Back and Forward restore each route's scroll position and heading focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const practiceLink = page.getByRole("link", { name: "Start the five puzzles" });
  await practiceLink.scrollIntoViewIfNeeded();
  const landingScroll = await page.evaluate(() => window.scrollY);
  expect(landingScroll).toBeGreaterThan(500);
  await practiceLink.click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(420);
  const practiceScroll = await page.evaluate(() => window.scrollY);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect.poll(() => page.evaluate((expected) => Math.abs(window.scrollY - expected), landingScroll)).toBeLessThanOrEqual(2);

  await page.goForward();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect.poll(() => page.evaluate((expected) => Math.abs(window.scrollY - expected), practiceScroll)).toBeLessThanOrEqual(2);
});

test("@claim:five-puzzles completes a five-item practice session", async ({ page }) => {
  await page.goto("/play");
  const progress = page.getByRole("progressbar", { name: "Puzzle progress" });
  await expect(progress).toHaveAttribute("aria-valuemax", "5");
  const answers = [
    { variables: { marbles: "4", boxes: "2" }, output: "2", path: "If path" },
    { variables: { score: "8", badge: "1" }, output: "8", path: "If path" },
    { variables: { total: "6", signal: "1" }, output: "1", path: "Loop 4 times → If path" },
    { variables: { tickets: "12", turn: "1" }, output: "12", path: "Loop 2 times" },
    { variables: { room: "9", outside: "4" }, output: "9", path: "Else path" },
  ];
  for (const [index, answer] of answers.entries()) {
    await expect(page.getByText(`Puzzle ${index + 1} of 5`, { exact: false })).toBeVisible();
    for (const [name, value] of Object.entries(answer.variables)) await page.getByLabel(`Final value of ${name}`).fill(value);
    await page.getByLabel("Printed output").fill(answer.output);
    await page.getByLabel(answer.path, { exact: true }).check();
    await page.getByRole("button", { name: "Commit my trace" }).click();
    await expect(page.getByText("Trace matched")).toBeVisible();
    await page.getByRole("button", { name: index === 4 ? "See session result" : "Trace the next puzzle" }).click();
  }
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("You traced all five programs");
  await expect(page.getByText("Each puzzle matched on at least one attempt.")).toBeVisible();
});

test("keyboard users can choose a path and commit", async ({ page }) => {
  await page.goto("/demo");
  await page.getByLabel("Final value of score").fill("8");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByLabel("Else path", { exact: true })).toBeChecked();
  await page.keyboard.press("ArrowUp");
  await expect(page.getByLabel("If path", { exact: true })).toBeChecked();
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: "Commit my trace" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("reveal")).toBeVisible();
});

test("@claim:offline-reload works offline after the first visit", async ({ page, context }) => {
  await page.goto("/demo");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await context.setOffline(true);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Add the badge");
  await expect(page.getByText("You are offline. This saved page still works.")).toBeVisible();
  await context.setOffline(false);
});

test("service worker update activates the current cache and removes a stale cache", async ({ page }) => {
  await page.goto("/demo");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    const stale = await caches.open("trace-before-run-v1");
    await stale.put("/stale", new Response("old"));
    const registration = await navigator.serviceWorker.getRegistration();
    await registration?.unregister();
  });
  await page.reload();
  const state = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await new Promise<void>((resolve) => {
      if (registration.active?.state === "activated") resolve();
      else registration.active?.addEventListener("statechange", () => registration.active?.state === "activated" && resolve(), { once: true });
    });
    return {
      active: registration.active?.scriptURL.endsWith("/sw.js"),
      waiting: registration.waiting === null,
      caches: await caches.keys(),
    };
  });
  expect(state.active).toBe(true);
  expect(state.waiting).toBe(true);
  expect(state.caches).toContain("trace-before-run-v3");
  expect(state.caches).not.toContain("trace-before-run-v1");
});

test("routes have one h1 and no serious accessibility issues", async ({ page }) => {
  for (const route of ["/", "/demo", "/play", "/privacy", "/terms", "/missing-page"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    const scan = await new AxeBuilder({ page }).analyze();
    expect(scan.violations.filter((item) => ["serious", "critical"].includes(item.impact || ""))).toEqual([]);
  }
});

test("dark treatment has no serious accessibility issues", async ({ page }) => {
  for (const route of ["/", "/demo"]) {
    await page.goto(route);
    await page.getByRole("button", { name: "Switch color theme" }).click();
    const scan = await new AxeBuilder({ page }).analyze();
    expect(scan.violations.filter((item) => ["serious", "critical"].includes(item.impact || ""))).toEqual([]);
  }
});

test("theme toggle changes the first time when the OS starts dark", async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/");
  const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const after = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(after).not.toBe(before);
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await context.close();
});

test("390px pages fit and actionable controls are at least 44px tall", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  let widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  await expect.poll(async () => (await page.getByRole("link", { name: "Start the five puzzles" }).boundingBox())?.height).toBeGreaterThanOrEqual(44);

  await page.goto("/demo");
  widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  for (const name of ["Reset demo", "Start for real"]) {
    await expect.poll(async () => (await page.getByRole(name === "Reset demo" ? "button" : "link", { name }).boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
});
