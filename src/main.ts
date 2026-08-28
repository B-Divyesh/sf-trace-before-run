import "./styles.css";
import { runSnippet, SyntaxProblem, type RunResult } from "./interpreter";
import { puzzles, type Puzzle } from "./puzzles";

type SavedProgress = {
  current: number;
  solved: string[];
  attempts: number;
};

type PracticeState = {
  demo: boolean;
  current: number;
  solved: Set<string>;
  attempts: number;
  code: string;
  predictions: Record<string, string>;
  path: string;
  revealed: boolean;
  result: RunResult | null;
  hint: boolean;
  notice: string;
};

const app = document.querySelector<HTMLDivElement>("#app") as HTMLDivElement;
if (!app) throw new Error("App root is missing.");

let practiceState: PracticeState | null = null;
let lastRoute = "";

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const routePath = () => window.location.pathname.replace(/\/+$/, "") || "/";
const storageKey = (demo: boolean) => `${demo ? "demo" : "real"}:trace-before-run:progress`;

function readProgress(demo: boolean): SavedProgress {
  const fallback: SavedProgress = { current: demo ? 1 : 0, solved: [], attempts: 0 };
  try {
    const stored = localStorage.getItem(storageKey(demo));
    if (!stored) return fallback;
    const parsed = JSON.parse(stored) as Partial<SavedProgress>;
    return {
      current: Math.min(Math.max(Number(parsed.current) || 0, 0), puzzles.length),
      solved: Array.isArray(parsed.solved) ? parsed.solved.filter((item): item is string => typeof item === "string") : [],
      attempts: Math.max(Number(parsed.attempts) || 0, 0),
    };
  } catch {
    return fallback;
  }
}

function saveProgress(state: PracticeState) {
  const data: SavedProgress = { current: state.current, solved: [...state.solved], attempts: state.attempts };
  localStorage.setItem(storageKey(state.demo), JSON.stringify(data));
}

function freshPracticeState(demo: boolean): PracticeState {
  const progress = readProgress(demo);
  const puzzle = puzzles[Math.min(progress.current, puzzles.length - 1)];
  return {
    demo,
    current: progress.current,
    solved: new Set(progress.solved),
    attempts: progress.attempts,
    code: puzzle.code,
    predictions: {},
    path: "",
    revealed: false,
    result: null,
    hint: false,
    notice: "",
  };
}

function setMeta(title: string, description: string, canonicalPath: string) {
  document.title = title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", `https://trace-before-run.sociobot.in${canonicalPath}`);
}

function iconMark() {
  return `<svg aria-hidden="true" viewBox="0 0 48 48" class="brand-mark"><circle cx="24" cy="10" r="6"/><path d="M24 18v8M24 26 12 38M24 26l12 12"/></svg>`;
}

function shell(content: string, demo = false) {
  return `
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
      <a class="brand" href="/" data-link>${iconMark()}<span>Trace Before Run</span></a>
      <nav aria-label="Main navigation">
        <a href="/play" data-link>Practice</a>
        <a href="/demo" data-link>Demo</a>
        <a href="/privacy" data-link>Privacy</a>
        <button class="theme-toggle" type="button" aria-label="Switch color theme" title="Switch color theme"><span aria-hidden="true">◐</span></button>
      </nav>
    </header>
    ${demo ? `<aside class="demo-bar" aria-label="Demo mode"><span><strong>Demo</strong> — sample data, nothing is saved</span><span class="demo-actions"><button type="button" data-reset-demo>Reset demo</button><a href="/play" data-start-real>Start for real</a></span></aside>` : ""}
    <div class="offline-note" role="status" hidden>You are offline. This saved page still works.</div>
    <main id="main">${content}</main>
    <footer class="site-footer">
      <p><strong>Trace Before Run</strong><br><span>Predict first. Then inspect the trace.</span></p>
      <nav aria-label="Footer navigation"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a></nav>
      <p>Built by Param Factory · v1.0<br><span>Original generated art.</span></p>
    </footer>
    <div class="sr-only" aria-live="polite" id="route-status"></div>`;
}

function landingPage() {
  setMeta(
    "Trace Before Run — predict Python output",
    "Practice tracing short Python programs by predicting variables, branch paths, and output before seeing each result.",
    "/",
  );
  return shell(`
    <section class="hero section-shell">
      <div class="hero-copy">
        <p class="eyebrow">A five-puzzle tracing desk</p>
        <h1 tabindex="-1">Predict Python before you run it</h1>
        <p class="lede">For new Python learners who know syntax but lose track of changing values.</p>
        <div class="hero-action">
          <a class="button button-primary" href="/demo" data-link>Try it with sample data</a>
          <span>Loads a ready branch puzzle. No sign-in.</span>
        </div>
        <ul class="plain-facts" aria-label="Product facts">
          <li><span aria-hidden="true">01</span> Free to use.</li>
          <li><span aria-hidden="true">02</span> Works offline after the first visit.</li>
          <li><span aria-hidden="true">03</span> Practice stays on this device.</li>
        </ul>
      </div>
      <figure class="hero-scene">
        <picture>
          <source type="image/avif" media="(max-width: 720px)" srcset="/assets/hero-720.avif">
          <source type="image/avif" srcset="/assets/hero-720.avif 720w, /assets/hero-1440.avif 1440w" sizes="(max-width: 760px) 100vw, 56vw">
          <source type="image/webp" media="(max-width: 720px)" srcset="/assets/hero-720.webp">
          <source type="image/webp" srcset="/assets/hero-720.webp 720w, /assets/hero-1440.webp 1440w" sizes="(max-width: 760px) 100vw, 56vw">
          <img src="/assets/hero-fallback.jpg" width="1440" height="960" fetchpriority="high" decoding="async" alt="A paper observatory with a desk, three variable jars, and a staircase that splits in two.">
        </picture>
        <figcaption>At the logic observatory, every value has a place and every branch leaves a trail.</figcaption>
      </figure>
    </section>
    <section class="preview-section section-shell" aria-labelledby="preview-title">
      <div class="section-number" aria-hidden="true">01 / Look</div>
      <div class="preview-heading">
        <p class="eyebrow">The prediction desk</p>
        <h2 id="preview-title">Hold the answer before the reveal</h2>
        <p>Read the snippet. Write the final values. Choose the path. Only then can you open the trace.</p>
      </div>
      <div class="mini-desk" aria-label="Example tracing puzzle">
        <pre><code><span>1</span> score = 7
<span>2</span> if score &gt;= 5:
<span>3</span>     badge = 1
<span>4</span> else:
<span>5</span>     badge = 0
<span>6</span> score = score + badge</code></pre>
        <div class="mini-ledger">
          <p class="mini-label">Your trace</p>
          <p><span>score</span><strong>?</strong></p>
          <p><span>badge</span><strong>?</strong></p>
          <p class="mini-path"><span class="route-dot"></span>Choose the path</p>
        </div>
      </div>
    </section>
    <section class="how section-shell" aria-labelledby="how-title">
      <div class="section-number" aria-hidden="true">02 / Trace</div>
      <h2 id="how-title">Three moves build the habit</h2>
      <ol class="steps">
        <li><span>Read</span><div><h3>Read one line at a time</h3><p>Keep the current value beside each variable.</p></div></li>
        <li><span>Commit</span><div><h3>Commit your full prediction</h3><p>Choose the branch and printed output before any result appears.</p></div></li>
        <li><span>Inspect</span><div><h3>Inspect the first difference</h3><p>See which line changed the value you missed.</p></div></li>
      </ol>
      <a class="text-link" href="/play" data-link>Start the five puzzles <span aria-hidden="true">→</span></a>
    </section>
    <section class="limits section-shell" aria-labelledby="limits-title">
      <div class="section-number" aria-hidden="true">03 / Boundaries</div>
      <div>
        <h2 id="limits-title">A tracing drill, not a code runner</h2>
        <p>The editor accepts small assignments, conditions, loops, and print calls. It does not run arbitrary Python or send code to a server.</p>
      </div>
      <div class="privacy-note"><span aria-hidden="true">✦</span><p><strong>Your practice stays local.</strong> Progress uses browser storage. Clear it from the Privacy page.</p></div>
    </section>
  `);
}

function pathOptions(puzzle: Puzzle, result: RunResult): string[] {
  const options = new Set(puzzle.pathChoices);
  options.add(result.path);
  return [...options];
}

function pathChoicesMarkup(options: string[], selected: string) {
  return options.map((option) => `<label><input type="radio" name="path" value="${escapeHtml(option)}" ${selected === option ? "checked" : ""} required><span><i aria-hidden="true"></i>${escapeHtml(option)}</span></label>`).join("");
}

function scoreSummary(state: PracticeState) {
  return `${state.solved.size} of ${puzzles.length} solved`;
}

function resultMarkup(state: PracticeState, puzzle: Puzzle, result: RunResult) {
  const wrongVariable = puzzle.predict.find((name) => Number(state.predictions[name]) !== result.variables[name]);
  const expectedOutput = result.output.join(", ");
  const outputWrong = state.predictions.output.trim() !== expectedOutput;
  const pathWrong = state.path !== result.path;
  const correct = !wrongVariable && !outputWrong && !pathWrong;
  const firstIssue = wrongVariable
    ? `${wrongVariable} ends as ${result.variables[wrongVariable]}, not ${state.predictions[wrongVariable]}. Follow each assignment that changes it.`
    : outputWrong
      ? `The program prints ${expectedOutput || "nothing"}. Printed output comes after the final value change.`
      : pathWrong
        ? `The program takes “${result.path}”. Recheck the condition before tracing its indented lines.`
        : "Every value, path, and printed result matches.";
  return `
    <section class="reveal ${correct ? "is-correct" : "needs-review"}" aria-labelledby="result-title" data-testid="reveal">
      <div class="result-heading">
        <span class="result-symbol" aria-hidden="true">${correct ? "✓" : "↺"}</span>
        <div><p class="eyebrow">${correct ? "Trace matched" : "First difference"}</p><h2 id="result-title" tabindex="-1">${escapeHtml(firstIssue)}</h2></div>
      </div>
      <div class="answer-strip" aria-label="Actual result">
        ${puzzle.predict.map((name) => `<p><span>${escapeHtml(name)}</span><strong>${result.variables[name] ?? "not set"}</strong></p>`).join("")}
        <p><span>printed</span><strong>${escapeHtml(expectedOutput || "nothing")}</strong></p>
        <p><span>path</span><strong>${escapeHtml(result.path)}</strong></p>
      </div>
      <details class="trace-details" open>
        <summary>Read the line-by-line trace</summary>
        <ol class="trace-list">
          ${result.steps.map((step) => `<li><span class="line-moon">${step.line}</span><div><strong>${escapeHtml(step.note)}</strong><small>${Object.entries(step.variables).map(([key, value]) => `${escapeHtml(key)} = ${value}`).join(" · ") || "No variables yet"}</small></div></li>`).join("")}
        </ol>
      </details>
      <div class="result-actions">
        <button class="button button-primary" type="button" data-next>${state.current === puzzles.length - 1 ? "See session result" : "Trace the next puzzle"}</button>
        <button class="button button-quiet" type="button" data-retry>Change my prediction</button>
      </div>
    </section>`;
}

function completionMarkup(state: PracticeState) {
  const allSolved = state.solved.size === puzzles.length;
  return `
    <section class="completion section-shell">
      <p class="eyebrow">Session complete</p>
      <h1 tabindex="-1">You traced all five programs</h1>
      <div class="completion-orbit" aria-hidden="true"><span>${state.solved.size}/5</span></div>
      <p>${allSolved ? "Each puzzle matched on at least one attempt." : `You matched ${state.solved.size} of 5 puzzles. Revisit the others and trace them again.`}</p>
      <div class="result-actions">
        <button class="button button-primary" type="button" data-review>Review the puzzles</button>
        <a class="button button-quiet" href="/" data-link>Return home</a>
      </div>
    </section>`;
}

function practicePage(demo: boolean) {
  if (!practiceState || practiceState.demo !== demo) practiceState = freshPracticeState(demo);
  const state = practiceState;
  setMeta(
    `${demo ? "Demo" : "Practice"} — Trace Before Run`,
    "Predict variables, branch paths, and printed output in five short Python tracing puzzles.",
    demo ? "/demo" : "/play",
  );
  if (state.current >= puzzles.length) return shell(completionMarkup(state), demo);
  const puzzle = puzzles[state.current];
  let validation = "";
  let run: RunResult | null = null;
  try {
    run = runSnippet(state.code);
    const missing = puzzle.predict.filter((name) => !(name in run!.variables));
    if (missing.length) validation = `The edited snippet no longer sets ${missing.join(" and ")}. Restore the puzzle or set that variable.`;
  } catch (error) {
    validation = error instanceof SyntaxProblem ? error.message : "This snippet could not be traced. Restore the puzzle and try again.";
  }
  const options = run ? pathOptions(puzzle, run) : puzzle.pathChoices;
  const content = `
    <section class="practice-top section-shell">
      <div>
        <p class="eyebrow">Puzzle ${puzzle.number} of ${puzzles.length} · ${escapeHtml(puzzle.setup)}</p>
        <h1 tabindex="-1">${escapeHtml(puzzle.title)}</h1>
        <p>${escapeHtml(puzzle.question)}</p>
      </div>
      <div class="score-block" aria-label="Practice progress"><strong>${scoreSummary(state)}</strong><span>${state.attempts} ${state.attempts === 1 ? "attempt" : "attempts"}</span></div>
      <div class="progress-track progress-${state.current + 1}" role="progressbar" aria-valuenow="${state.current + 1}" aria-valuemin="1" aria-valuemax="${puzzles.length}" aria-label="Puzzle progress"><span></span></div>
    </section>
    <section class="workbench section-shell" aria-label="Tracing workbench">
      <div class="code-side">
        <div class="panel-title"><div><p class="eyebrow">Python-like snippet</p><h2>Edit, then trace</h2></div><button class="small-button" type="button" data-restore>Restore puzzle</button></div>
        <label class="sr-only" for="code-editor">Editable Python-like snippet</label>
        <textarea id="code-editor" class="code-editor" spellcheck="false" autocapitalize="off" aria-describedby="grammar-note code-error">${escapeHtml(state.code)}</textarea>
        <p id="grammar-note" class="field-note">Supported: whole numbers, assignments, if/else, range loops, and print.</p>
        <p id="code-error" class="error-note" role="alert" ${validation ? "" : "hidden"}>${escapeHtml(validation)}</p>
      </div>
      <form class="prediction-side" data-prediction novalidate>
        <div class="panel-title"><div><p class="eyebrow">Your prediction</p><h2>Commit the final state</h2></div><span class="lock-note"><span aria-hidden="true">◇</span> Hidden until commit</span></div>
        <fieldset class="variable-ledger">
          <legend>Final variable values</legend>
          ${puzzle.predict.map((name) => `<label><span>${escapeHtml(name)}</span><input inputmode="numeric" pattern="-?[0-9]+" name="variable-${escapeHtml(name)}" value="${escapeHtml(state.predictions[name] || "")}" aria-label="Final value of ${escapeHtml(name)}" aria-describedby="prediction-error" required></label>`).join("")}
          <label><span>printed</span><input inputmode="numeric" name="output" value="${escapeHtml(state.predictions.output || "")}" aria-label="Printed output" required></label>
        </fieldset>
        <fieldset class="path-picker" data-path-picker>
          <legend>Path through the code</legend>
          <div data-path-choices>${pathChoicesMarkup(options, state.path)}</div>
        </fieldset>
        <p class="sr-only" role="status" data-path-status></p>
        <div class="prediction-actions">
          <button class="button button-primary" type="submit" ${validation ? "disabled" : ""}>Commit my trace</button>
          <button class="button button-quiet" type="button" data-hint>${state.hint ? "Hide the nudge" : "Show one nudge"}</button>
        </div>
        <p class="form-error" id="prediction-error" role="alert" data-form-error></p>
        ${state.hint ? `<p class="hint-note"><span aria-hidden="true">↳</span>${escapeHtml(puzzle.nudge)}</p>` : ""}
      </form>
    </section>
    ${state.revealed && state.result ? resultMarkup(state, puzzle, state.result) : ""}
  `;
  return shell(content, demo);
}

function privacyPage() {
  setMeta("Privacy — Trace Before Run", "How Trace Before Run stores practice progress in your browser.", "/privacy");
  return shell(`
    <article class="policy section-shell">
      <p class="eyebrow">Plain-language policy · updated 28 August 2026</p>
      <h1 tabindex="-1">Your practice stays in your browser</h1>
      <p class="policy-lede">Trace Before Run has no accounts, ads, analytics, or third-party scripts.</p>
      <h2>What is stored</h2>
      <p>Your browser stores the puzzle number, solved puzzles, and attempt count. Demo progress uses a separate key and never reads practice progress.</p>
      <h2>What is sent</h2>
      <p>The app sends no code, answers, or progress to us. Your browser requests the site files from the hosting service.</p>
      <h2>Clear your progress</h2>
      <p>Use this button to delete practice and demo progress from this browser.</p>
      <button class="button button-danger" type="button" data-clear-progress>Clear saved progress</button>
      <p class="clear-status" role="status"></p>
    </article>`);
}

function termsPage() {
  setMeta("Terms — Trace Before Run", "Terms for using the free Trace Before Run learning drill.", "/terms");
  return shell(`
    <article class="policy section-shell">
      <p class="eyebrow">Terms · updated 28 August 2026</p>
      <h1 tabindex="-1">Use the drill as a learning aid</h1>
      <p class="policy-lede">Trace Before Run is free learning software provided under the MIT License.</p>
      <h2>No Python execution</h2>
      <p>The app interprets a small teaching grammar. Do not rely on it as a complete Python interpreter.</p>
      <h2>No warranty</h2>
      <p>The software is provided as is, without warranty. Check important course work with your teacher or Python itself.</p>
      <h2>Fair use</h2>
      <p>You may use, copy, and adapt the software under the included MIT License.</p>
    </article>`);
}

function notFoundPage() {
  setMeta("Page not found — Trace Before Run", "This route does not exist. Return to the tracing desk.", routePath());
  return shell(`
    <section class="not-found section-shell">
      <div class="lost-moon" aria-hidden="true"><span>404</span></div>
      <p class="eyebrow">Wrong branch</p>
      <h1 tabindex="-1">This path has no next line</h1>
      <p>The address does not lead to a puzzle or policy page.</p>
      <a class="button button-primary" href="/" data-link>Return to the first step</a>
    </section>`);
}

function navigate(href: string) {
  history.pushState({}, "", href);
  renderRoute(true);
}

function bindCommonEvents() {
  document.querySelectorAll<HTMLAnchorElement>("a[data-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(link.pathname);
    });
  });
  document.querySelector<HTMLButtonElement>(".theme-toggle")?.addEventListener("click", () => {
    const selected = document.documentElement.dataset.theme;
    const isDark = selected ? selected === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = isDark ? "light" : "dark";
  });
  document.querySelector<HTMLButtonElement>("[data-reset-demo]")?.addEventListener("click", () => {
    localStorage.removeItem(storageKey(true));
    practiceState = freshPracticeState(true);
    practiceState.notice = "Demo reset to its sample puzzle.";
    renderRoute(false);
  });
  document.querySelector<HTMLAnchorElement>("[data-start-real]")?.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem(storageKey(true));
    practiceState = null;
    navigate("/play");
  });
  const offline = document.querySelector<HTMLElement>(".offline-note");
  const updateOnline = () => { if (offline) offline.hidden = navigator.onLine; };
  updateOnline();
  window.addEventListener("online", updateOnline, { once: true });
  window.addEventListener("offline", updateOnline, { once: true });
}

function bindPracticeEvents() {
  const state = practiceState;
  if (!state || state.current >= puzzles.length) {
    document.querySelector<HTMLButtonElement>("[data-review]")?.addEventListener("click", () => {
      if (!practiceState) return;
      practiceState.current = 0;
      practiceState.code = puzzles[0].code;
      practiceState.revealed = false;
      practiceState.result = null;
      saveProgress(practiceState);
      renderRoute(false);
    });
    return;
  }
  const puzzle = puzzles[state.current];
  const editor = document.querySelector<HTMLTextAreaElement>("#code-editor");
  document.querySelectorAll<HTMLInputElement>('.variable-ledger input[pattern]').forEach((input) => {
    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      const error = document.querySelector<HTMLElement>("[data-form-error]");
      if (error?.textContent?.startsWith("Enter a whole number")) error.textContent = "";
    });
  });
  editor?.addEventListener("input", () => {
    state.code = editor.value;
    state.revealed = false;
    state.result = null;
    const message = document.querySelector<HTMLElement>("#code-error");
    const commit = document.querySelector<HTMLButtonElement>('[data-prediction] button[type="submit"]');
    try {
      const editedRun = runSnippet(state.code);
      const missing = puzzle.predict.filter((name) => !(name in editedRun.variables));
      if (missing.length) throw new SyntaxProblem(`The edited snippet no longer sets ${missing.join(" and ")}. Restore the puzzle or set that variable.`);
      const options = pathOptions(puzzle, editedRun);
      const selectedPath = document.querySelector<HTMLInputElement>('[data-path-picker] input[name="path"]:checked')?.value || state.path;
      state.path = options.includes(selectedPath) ? selectedPath : "";
      const choices = document.querySelector<HTMLElement>("[data-path-choices]");
      if (choices) choices.innerHTML = pathChoicesMarkup(options, state.path);
      const pathStatus = document.querySelector<HTMLElement>("[data-path-status]");
      if (pathStatus) pathStatus.textContent = `Path choices updated: ${options.join(", ")}.`;
      document.querySelector<HTMLElement>('[data-testid="reveal"]')?.remove();
      if (message) {
        message.hidden = true;
        message.textContent = "";
      }
      if (commit) commit.disabled = false;
    } catch (problem) {
      if (message) {
        message.hidden = false;
        message.textContent = problem instanceof Error ? problem.message : "This snippet could not be traced.";
      }
      if (commit) commit.disabled = true;
    }
  });
  document.querySelector<HTMLButtonElement>("[data-restore]")?.addEventListener("click", () => {
    state.code = puzzle.code;
    state.predictions = {};
    state.path = "";
    state.revealed = false;
    state.result = null;
    state.notice = "Puzzle restored.";
    renderRoute(false);
  });
  document.querySelector<HTMLButtonElement>("[data-hint]")?.addEventListener("click", () => {
    state.hint = !state.hint;
    renderRoute(false);
  });
  document.querySelector<HTMLFormElement>("[data-prediction]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const error = form.querySelector<HTMLElement>("[data-form-error]");
    for (const name of [...puzzle.predict, "output"]) state.predictions[name] = String(data.get(name === "output" ? "output" : `variable-${name}`) || "").trim();
    state.path = String(data.get("path") || "");
    const missing = [...puzzle.predict, "output"].find((name) => state.predictions[name] === "");
    if (missing || !state.path) {
      if (error) error.textContent = missing ? `Add a prediction for ${missing}. Then commit the trace.` : "Choose the path through the code. Then commit the trace.";
      form.querySelector<HTMLInputElement>(missing === "output" ? '[name="output"]' : missing ? `[name="variable-${missing}"]` : '[name="path"]')?.focus();
      return;
    }
    const nonNumeric = puzzle.predict.find((name) => !/^-?\d+$/.test(state.predictions[name]));
    if (nonNumeric) {
      const input = form.querySelector<HTMLInputElement>(`[name="variable-${nonNumeric}"]`);
      input?.setAttribute("aria-invalid", "true");
      if (error) error.textContent = `Enter a whole number for ${nonNumeric}. Then commit the trace.`;
      input?.focus();
      return;
    }
    try {
      const result = runSnippet(state.code);
      state.result = result;
      state.revealed = true;
      state.attempts += 1;
      const correct = puzzle.predict.every((name) => Number(state.predictions[name]) === result.variables[name]) && state.predictions.output === result.output.join(", ") && state.path === result.path;
      if (correct) state.solved.add(puzzle.id);
      saveProgress(state);
      renderRoute(false);
      document.querySelector<HTMLElement>("#result-title")?.focus();
    } catch (problem) {
      if (error) error.textContent = problem instanceof Error ? problem.message : "The snippet could not be traced.";
    }
  });
  document.querySelector<HTMLButtonElement>("[data-retry]")?.addEventListener("click", () => {
    state.revealed = false;
    state.result = null;
    renderRoute(false);
    document.querySelector<HTMLInputElement>(".variable-ledger input")?.focus();
  });
  document.querySelector<HTMLButtonElement>("[data-next]")?.addEventListener("click", () => {
    state.current += 1;
    if (state.current < puzzles.length) state.code = puzzles[state.current].code;
    state.predictions = {};
    state.path = "";
    state.revealed = false;
    state.result = null;
    state.hint = false;
    saveProgress(state);
    renderRoute(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function bindPageEvents() {
  bindCommonEvents();
  bindPracticeEvents();
  document.querySelector<HTMLButtonElement>("[data-clear-progress]")?.addEventListener("click", () => {
    localStorage.removeItem(storageKey(false));
    localStorage.removeItem(storageKey(true));
    practiceState = null;
    const status = document.querySelector<HTMLElement>(".clear-status");
    if (status) status.textContent = "Saved progress was cleared from this browser.";
  });
}

function renderRoute(focusHeading = false) {
  const path = routePath();
  if (path !== lastRoute && path !== "/play" && path !== "/demo") practiceState = null;
  lastRoute = path;
  if (path === "/" && new URLSearchParams(window.location.search).get("demo") === "1") app.innerHTML = practicePage(true);
  else if (path === "/") app.innerHTML = landingPage();
  else if (path === "/play") app.innerHTML = practicePage(false);
  else if (path === "/demo") app.innerHTML = practicePage(true);
  else if (path === "/privacy") app.innerHTML = privacyPage();
  else if (path === "/terms") app.innerHTML = termsPage();
  else app.innerHTML = notFoundPage();
  bindPageEvents();
  if (focusHeading) {
    const heading = document.querySelector<HTMLHeadingElement>("h1");
    heading?.focus();
    const status = document.querySelector<HTMLElement>("#route-status");
    if (status && heading) status.textContent = heading.textContent;
  }
}

window.addEventListener("popstate", () => renderRoute(true));
renderRoute();

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => undefined));
}
