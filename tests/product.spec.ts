import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("landing explains the job and links to a ready demo", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Trace Before Run — predict Python output");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Predict Python before you run it");
  await page.getByRole("link", { name: "Try it with sample data" }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Editable Python-like snippet" })).toHaveValue(/score = 7/);
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

test("@claim:editable-trace uses edited values in the result", async ({ page }) => {
  await page.goto("/demo");
  const editor = page.getByRole("textbox", { name: "Editable Python-like snippet" });
  await editor.fill((await editor.inputValue()).replace("score = 7", "score = 3"));
  await page.getByLabel("Final value of score").fill("3");
  await page.getByLabel("Final value of badge").fill("0");
  await page.getByLabel("Printed output").fill("3");
  await page.getByLabel("Else path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByText("Trace matched")).toBeVisible();
  await expect(page.getByText("Prints 3.")).toBeVisible();
});

test("missing predictions produce a specific error", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await expect(page.getByText("Add a prediction for score. Then commit the trace.")).toBeVisible();
  await expect(page.getByLabel("Final value of score")).toBeFocused();
});

test("@claim:demo-isolated keeps demo progress out of practice storage", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== "http://127.0.0.1:4173") externalRequests.push(request.url());
  });
  await page.goto("/demo");
  await page.getByLabel("Final value of score").fill("8");
  await page.getByLabel("Final value of badge").fill("1");
  await page.getByLabel("Printed output").fill("8");
  await page.getByLabel("If path", { exact: true }).check();
  await page.getByRole("button", { name: "Commit my trace" }).click();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain("demo:trace-before-run:progress");
  expect(keys).not.toContain("real:trace-before-run:progress");
  expect(externalRequests).toEqual([]);
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
  expect(requests.every((request) => new URL(request.url).origin === "http://127.0.0.1:4173" && request.method === "GET")).toBe(true);
});

test("@claim:open-access starts practice without an account or payment", async ({ page }) => {
  await page.goto("/play");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Split the marbles");
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Commit my trace" })).toBeVisible();
});

test("reset demo returns to the seeded puzzle", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Commit my trace" }).click();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Add the badge");
  await expect(page.getByLabel("Final value of score")).toHaveValue("");
});

test("the demo query alias opens the isolated sample", async ({ page }) => {
  await page.goto("/?demo=1");
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Add the badge");
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

test("landing and workbench fit a 390px screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/demo"]) {
    await page.goto(route);
    const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  }
});
