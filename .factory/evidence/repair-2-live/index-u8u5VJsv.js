(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();class h extends Error{}function B(e){const t=[];let n=0;for(;n<e.length;){const r=e.slice(n),a=r.match(/^\s+/);if(a){n+=a[0].length;continue}const o=r.match(/^\d+/);if(o){t.push({kind:"number",value:o[0]}),n+=o[0].length;continue}const l=r.match(/^[A-Za-z_][A-Za-z0-9_]*/);if(l){t.push({kind:"name",value:l[0]}),n+=l[0].length;continue}const i=r.match(/^(\/\/|==|!=|<=|>=|[+\-*%<>])/);if(i){t.push({kind:"operator",value:i[0]}),n+=i[0].length;continue}if(r[0]==="("){t.push({kind:"left",value:"("}),n+=1;continue}if(r[0]===")"){t.push({kind:"right",value:")"}),n+=1;continue}throw new h(`“${r[0]}” is not in the supported grammar.`)}return t}function T(e,t){const n=B(e);let r=0;const a=()=>n[r],o=()=>n[r++],l=()=>{const c=o();if(!c)throw new h("This expression ends too soon.");if(c.kind==="number")return Number(c.value);if(c.kind==="name"){if(!(c.value in t))throw new h(`Set ${c.value} before using it.`);return t[c.value]}if(c.kind==="left"){const f=d();if(o()?.kind!=="right")throw new h("A closing parenthesis is missing.");return f}throw new h(`“${c.value}” cannot start a value.`)},i=()=>a()?.kind==="operator"&&a().value==="-"?(o(),-i()):l(),u=()=>{let c=i();for(;a()?.kind==="operator"&&["*","//","%"].includes(a().value);){const f=o().value,m=i();if((f==="//"||f==="%")&&m===0)throw new h("Division by zero stops this trace. Change the divisor.");f==="*"&&(c*=m),f==="//"&&(c=Math.floor(c/m)),f==="%"&&(c=(c%m+m)%m)}return c},s=()=>{let c=u();for(;a()?.kind==="operator"&&["+","-"].includes(a().value);){const f=o().value,m=u();c=f==="+"?c+m:c-m}return c},d=()=>{const c=s();if(a()?.kind!=="operator"||!["==","!=","<","<=",">",">="].includes(a().value))return c;const f=o().value,m=s();return(f==="=="?c===m:f==="!="?c!==m:f==="<"?c<m:f==="<="?c<=m:f===">"?c>m:c>=m)?1:0};if(n.length===0)throw new h("Add a value after the operator.");const p=d();if(r!==n.length)throw new h(`Check the expression near “${n[r].value}”.`);if(!Number.isSafeInteger(p)||Math.abs(p)>1e6)throw new h("Keep results between -1,000,000 and 1,000,000.");return p}function D(e){if(e.length>500)throw new h("Keep the snippet under 500 characters.");if(e.includes("	"))throw new h("Use four spaces instead of tabs.");const t=e.split(`
`).map((n,r)=>({raw:n.replace(/\s+$/,""),number:r+1})).filter(({raw:n})=>n.trim().length>0).map(({raw:n,number:r})=>{const a=n.length-n.trimStart().length;if(a%4!==0)throw new h(`Line ${r} needs groups of four spaces.`);return{indent:a,text:n.trimStart(),number:r}});if(t.length===0)throw new h("The snippet is empty. Restore the puzzle to keep tracing.");if(t.length>14)throw new h("Keep the snippet to 14 lines or fewer.");return t}function H(e){const t=D(e),n=(o,l)=>{const i=[];let u=o;for(;u<t.length;){const s=t[u];if(s.indent<l)break;if(s.indent>l)throw new h(`Line ${s.number} is indented without a block.`);if(s.text==="else:")break;const d=s.text.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/),p=s.text.match(/^print\((.+)\)$/),c=s.text.match(/^if\s+(.+):$/),f=s.text.match(/^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+range\((.+)\):$/);if(c){const[m,x]=n(u+1,l+4);if(m.length===0)throw new h(`Line ${s.number} needs an indented line below it.`);u=x;let L=[];if(t[u]?.indent===l&&t[u]?.text==="else:"){const[E,j]=n(u+1,l+4);if(E.length===0)throw new h(`Line ${t[u].number} needs an indented line below it.`);L=E,u=j}i.push({kind:"if",condition:c[1],yes:m,no:L,line:s.number});continue}if(f){const[m,x]=n(u+1,l+4);if(m.length===0)throw new h(`Line ${s.number} needs an indented line below it.`);i.push({kind:"for",name:f[1],count:f[2],body:m,line:s.number}),u=x;continue}if(p){i.push({kind:"print",expression:p[1],line:s.number}),u+=1;continue}if(d){i.push({kind:"assign",name:d[1],expression:d[2],line:s.number}),u+=1;continue}throw new h(`Line ${s.number} is outside the supported grammar.`)}return[i,u]},[r,a]=n(0,0);if(a!==t.length)throw new h(`Check line ${t[a].number}.`);return r}function q(e){const t=H(e),n={},r=[],a=[],o=[];let l=0;const i=(s,d)=>{o.push({line:s,note:d,variables:{...n}})},u=s=>{for(const d of s){if(l+=1,l>100)throw new h("This trace has too many steps. Use a smaller loop.");if(d.kind==="assign")n[d.name]=T(d.expression,n),i(d.line,`${d.name} becomes ${n[d.name]}.`);else if(d.kind==="print"){const p=T(d.expression,n);r.push(String(p)),i(d.line,`Prints ${p}.`)}else if(d.kind==="if"){const p=T(d.condition,n)!==0;a.push(p?"If path":"Else path"),i(d.line,p?"The condition is true.":"The condition is false."),u(p?d.yes:d.no)}else{const p=T(d.count,n);if(p<0||p>20)throw new h("range() must be between 0 and 20.");a.push(`Loop ${p} ${p===1?"time":"times"}`),i(d.line,`The loop will run ${p} ${p===1?"time":"times"}.`);for(let c=0;c<p;c+=1)n[d.name]=c,u(d.body)}}};return u(t),{variables:n,output:r,path:a.join(" → ")||"Straight path",steps:o}}const v=[{id:"even-marbles",number:1,title:"Split the marbles",setup:"Start with one condition and one changed variable.",question:"Which path runs, and what remains at the end?",code:`marbles = 4
if marbles % 2 == 0:
    boxes = marbles // 2
else:
    boxes = marbles + 1
print(boxes)`,predict:["marbles","boxes"],pathChoices:["If path","Else path"],nudge:"Check the remainder after dividing marbles by 2."},{id:"badge-score",number:2,title:"Add the badge",setup:"A branch creates a value before the last assignment.",question:"Trace the badge first, then update the score.",code:`score = 7
if score >= 5:
    badge = 1
else:
    badge = 0
score = score + badge
print(score)`,predict:["score","badge"],pathChoices:["If path","Else path"],nudge:"Decide whether 7 passes the test before adding badge."},{id:"signal-loop",number:3,title:"Raise the signal",setup:"A short loop feeds a later condition.",question:"Follow each loop turn before choosing the branch.",code:`total = 0
for step in range(4):
    total = total + step
if total > 5:
    signal = 1
else:
    signal = 0
print(signal)`,predict:["total","signal"],pathChoices:["Loop 4 times → If path","Loop 4 times → Else path","Loop 3 times → If path"],nudge:"range(4) gives 0, 1, 2, then 3."},{id:"double-tickets",number:4,title:"Double the tickets",setup:"The same assignment runs more than once.",question:"Keep the new value after each loop turn.",code:`tickets = 3
for turn in range(2):
    tickets = tickets * 2
print(tickets)`,predict:["tickets","turn"],pathChoices:["Loop 2 times","Loop 1 time","Straight path"],nudge:"The second turn doubles the result of the first turn."},{id:"cooling-room",number:5,title:"Read the room",setup:"Two starting values decide which update survives.",question:"Test the difference, then trace only that path.",code:`room = 12
outside = 4
if room - outside < 6:
    room = room + 2
else:
    room = room - 3
print(room)`,predict:["room","outside"],pathChoices:["If path","Else path"],nudge:"Work out room minus outside before comparing it with 6."}],w=document.querySelector("#app");if(!w)throw new Error("App root is missing.");let g=null,C="";const b=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),R=()=>window.location.pathname.replace(/\/+$/,"")||"/",k=e=>`${e?"demo":"real"}:trace-before-run:progress`;function O(e){const t={current:e?1:0,solved:[],attempts:0};try{const n=localStorage.getItem(k(e));if(!n)return t;const r=JSON.parse(n);return{current:Math.min(Math.max(Number(r.current)||0,0),v.length),solved:Array.isArray(r.solved)?r.solved.filter(a=>typeof a=="string"):[],attempts:Math.max(Number(r.attempts)||0,0)}}catch{return t}}function z(e){const t={current:e.current,solved:[...e.solved],attempts:e.attempts};localStorage.setItem(k(e.demo),JSON.stringify(t))}function M(e){const t=O(e),n=v[Math.min(t.current,v.length-1)];return{demo:e,current:t.current,solved:new Set(t.solved),attempts:t.attempts,code:n.code,predictions:{},path:"",revealed:!1,result:null,hint:!1,notice:""}}function S(e,t,n){document.title=e,document.querySelector('meta[name="description"]')?.setAttribute("content",t),document.querySelector('meta[property="og:title"]')?.setAttribute("content",e),document.querySelector('meta[property="og:description"]')?.setAttribute("content",t),document.querySelector('link[rel="canonical"]')?.setAttribute("href",`https://trace-before-run.sociobot.in${n}`)}function F(){return'<svg aria-hidden="true" viewBox="0 0 48 48" class="brand-mark"><circle cx="24" cy="10" r="6"/><path d="M24 18v8M24 26 12 38M24 26l12 12"/></svg>'}function $(e,t=!1){return`
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
      <a class="brand" href="/" data-link>${F()}<span>Trace Before Run</span></a>
      <nav aria-label="Main navigation">
        <a href="/play" data-link>Practice</a>
        <a href="/demo" data-link>Demo</a>
        <a href="/privacy" data-link>Privacy</a>
        <button class="theme-toggle" type="button" aria-label="Switch color theme" title="Switch color theme"><span aria-hidden="true">◐</span></button>
      </nav>
    </header>
    ${t?'<aside class="demo-bar" aria-label="Demo mode"><span><strong>Demo</strong> — sample data, nothing is saved</span><span class="demo-actions"><button type="button" data-reset-demo>Reset demo</button><a href="/play" data-start-real>Start for real</a></span></aside>':""}
    <div class="offline-note" role="status" hidden>You are offline. This saved page still works.</div>
    <main id="main">${e}</main>
    <footer class="site-footer">
      <p><strong>Trace Before Run</strong><br><span>Predict first. Then inspect the trace.</span></p>
      <nav aria-label="Footer navigation"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a></nav>
      <p>Built by Param Factory · v1.0<br><span>Original generated art.</span></p>
    </footer>
    <div class="sr-only" aria-live="polite" id="route-status"></div>`}function W(){return S("Trace Before Run — predict Python output","Practice tracing short Python programs by predicting variables, branch paths, and output before seeing each result.","/"),$(`
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
  `)}function I(e,t){const n=new Set(e.pathChoices);return n.add(t.path),[...n]}function N(e,t){return e.map(n=>`<label><input type="radio" name="path" value="${b(n)}" ${t===n?"checked":""} required><span><i aria-hidden="true"></i>${b(n)}</span></label>`).join("")}function K(e){return`${e.solved.size} of ${v.length} solved`}function Y(e,t,n){const r=t.predict.find(s=>Number(e.predictions[s])!==n.variables[s]),a=n.output.join(", "),o=e.predictions.output.trim()!==a,l=e.path!==n.path,i=!r&&!o&&!l,u=r?`${r} ends as ${n.variables[r]}, not ${e.predictions[r]}. Follow each assignment that changes it.`:o?`The program prints ${a||"nothing"}. Printed output comes after the final value change.`:l?`The program takes “${n.path}”. Recheck the condition before tracing its indented lines.`:"Every value, path, and printed result matches.";return`
    <section class="reveal ${i?"is-correct":"needs-review"}" aria-labelledby="result-title" data-testid="reveal">
      <div class="result-heading">
        <span class="result-symbol" aria-hidden="true">${i?"✓":"↺"}</span>
        <div><p class="eyebrow">${i?"Trace matched":"First difference"}</p><h2 id="result-title" tabindex="-1">${b(u)}</h2></div>
      </div>
      <div class="answer-strip" aria-label="Actual result">
        ${t.predict.map(s=>`<p><span>${b(s)}</span><strong>${n.variables[s]??"not set"}</strong></p>`).join("")}
        <p><span>printed</span><strong>${b(a||"nothing")}</strong></p>
        <p><span>path</span><strong>${b(n.path)}</strong></p>
      </div>
      <details class="trace-details" open>
        <summary>Read the line-by-line trace</summary>
        <ol class="trace-list">
          ${n.steps.map(s=>`<li><span class="line-moon">${s.line}</span><div><strong>${b(s.note)}</strong><small>${Object.entries(s.variables).map(([d,p])=>`${b(d)} = ${p}`).join(" · ")||"No variables yet"}</small></div></li>`).join("")}
        </ol>
      </details>
      <div class="result-actions">
        <button class="button button-primary" type="button" data-next>${e.current===v.length-1?"See session result":"Trace the next puzzle"}</button>
        <button class="button button-quiet" type="button" data-retry>Change my prediction</button>
      </div>
    </section>`}function Z(e){const t=e.solved.size===v.length;return`
    <section class="completion section-shell">
      <p class="eyebrow">Session complete</p>
      <h1 tabindex="-1">You traced all five programs</h1>
      <div class="completion-orbit" aria-hidden="true"><span>${e.solved.size}/5</span></div>
      <p>${t?"Each puzzle matched on at least one attempt.":`You matched ${e.solved.size} of 5 puzzles. Revisit the others and trace them again.`}</p>
      <div class="result-actions">
        <button class="button button-primary" type="button" data-review>Review the puzzles</button>
        <a class="button button-quiet" href="/" data-link>Return home</a>
      </div>
    </section>`}function P(e){(!g||g.demo!==e)&&(g=M(e));const t=g;if(S(`${e?"Demo":"Practice"} — Trace Before Run`,"Predict variables, branch paths, and printed output in five short Python tracing puzzles.",e?"/demo":"/play"),t.current>=v.length)return $(Z(t),e);const n=v[t.current];let r="",a=null;try{a=q(t.code);const i=n.predict.filter(u=>!(u in a.variables));i.length&&(r=`The edited snippet no longer sets ${i.join(" and ")}. Restore the puzzle or set that variable.`)}catch(i){r=i instanceof h?i.message:"This snippet could not be traced. Restore the puzzle and try again."}const o=a?I(n,a):n.pathChoices,l=`
    <section class="practice-top section-shell">
      <div>
        <p class="eyebrow">Puzzle ${n.number} of ${v.length} · ${b(n.setup)}</p>
        <h1 tabindex="-1">${b(n.title)}</h1>
        <p>${b(n.question)}</p>
      </div>
      <div class="score-block" aria-label="Practice progress"><strong>${K(t)}</strong><span>${t.attempts} ${t.attempts===1?"attempt":"attempts"}</span></div>
      <div class="progress-track progress-${t.current+1}" role="progressbar" aria-valuenow="${t.current+1}" aria-valuemin="1" aria-valuemax="${v.length}" aria-label="Puzzle progress"><span></span></div>
    </section>
    <section class="workbench section-shell" aria-label="Tracing workbench">
      <div class="code-side">
        <div class="panel-title"><div><p class="eyebrow">Python-like snippet</p><h2>Edit, then trace</h2></div><button class="small-button" type="button" data-restore>Restore puzzle</button></div>
        <label class="sr-only" for="code-editor">Editable Python-like snippet</label>
        <textarea id="code-editor" class="code-editor" spellcheck="false" autocapitalize="off" aria-describedby="grammar-note code-error">${b(t.code)}</textarea>
        <p id="grammar-note" class="field-note">Supported: whole numbers, assignments, if/else, range loops, and print.</p>
        <p id="code-error" class="error-note" role="alert" ${r?"":"hidden"}>${b(r)}</p>
      </div>
      <form class="prediction-side" data-prediction novalidate>
        <div class="panel-title"><div><p class="eyebrow">Your prediction</p><h2>Commit the final state</h2></div><span class="lock-note"><span aria-hidden="true">◇</span> Hidden until commit</span></div>
        <fieldset class="variable-ledger">
          <legend>Final variable values</legend>
          ${n.predict.map(i=>`<label><span>${b(i)}</span><input inputmode="numeric" pattern="-?[0-9]+" name="variable-${b(i)}" value="${b(t.predictions[i]||"")}" aria-label="Final value of ${b(i)}" aria-describedby="prediction-error" required></label>`).join("")}
          <label><span>printed</span><input inputmode="numeric" name="output" value="${b(t.predictions.output||"")}" aria-label="Printed output" required></label>
        </fieldset>
        <fieldset class="path-picker" data-path-picker>
          <legend>Path through the code</legend>
          <div data-path-choices>${N(o,t.path)}</div>
        </fieldset>
        <p class="sr-only" role="status" data-path-status></p>
        <div class="prediction-actions">
          <button class="button button-primary" type="submit" ${r?"disabled":""}>Commit my trace</button>
          <button class="button button-quiet" type="button" data-hint aria-expanded="${t.hint}" aria-controls="nudge-note">${t.hint?"Hide the nudge":"Show one nudge"}</button>
        </div>
        <p class="form-error" id="prediction-error" role="alert" data-form-error></p>
        <p class="hint-note" id="nudge-note" aria-live="polite" ${t.hint?"":"hidden"}><span aria-hidden="true">↳</span>${b(n.nudge)}</p>
      </form>
    </section>
    ${t.revealed&&t.result?Y(t,n,t.result):""}
  `;return $(l,e)}function _(){return S("Privacy — Trace Before Run","How Trace Before Run stores practice progress in your browser.","/privacy"),$(`
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
    </article>`)}function U(){return S("Terms — Trace Before Run","Terms for using the free Trace Before Run learning drill.","/terms"),$(`
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
    </article>`)}function J(){return S("Page not found — Trace Before Run","This route does not exist. Return to the tracing desk.",R()),$(`
    <section class="not-found section-shell">
      <div class="lost-moon" aria-hidden="true"><span>404</span></div>
      <p class="eyebrow">Wrong branch</p>
      <h1 tabindex="-1">This path has no next line</h1>
      <p>The address does not lead to a puzzle or policy page.</p>
      <a class="button button-primary" href="/" data-link>Return to the first step</a>
    </section>`)}function A(e){history.pushState({},"",e),y(!0)}function V(){document.querySelectorAll("a[data-link]").forEach(n=>{n.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||(r.preventDefault(),A(n.pathname))})}),document.querySelector(".theme-toggle")?.addEventListener("click",()=>{const n=document.documentElement.dataset.theme,r=n?n==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=r?"light":"dark"}),document.querySelector("[data-reset-demo]")?.addEventListener("click",()=>{localStorage.removeItem(k(!0)),g=M(!0),g.notice="Demo reset to its sample puzzle.",y(!1)}),document.querySelector("[data-start-real]")?.addEventListener("click",n=>{n.preventDefault(),localStorage.removeItem(k(!0)),g=null,A("/play")});const e=document.querySelector(".offline-note"),t=()=>{e&&(e.hidden=navigator.onLine)};t(),window.addEventListener("online",t,{once:!0}),window.addEventListener("offline",t,{once:!0})}function G(){const e=g;if(!e||e.current>=v.length){document.querySelector("[data-review]")?.addEventListener("click",()=>{g&&(g.current=0,g.code=v[0].code,g.revealed=!1,g.result=null,z(g),y(!1))});return}const t=v[e.current],n=document.querySelector("#code-editor");document.querySelectorAll(".variable-ledger input[pattern]").forEach(r=>{r.addEventListener("input",()=>{r.removeAttribute("aria-invalid");const a=document.querySelector("[data-form-error]");a?.textContent?.startsWith("Enter a whole number")&&(a.textContent="")})}),n?.addEventListener("input",()=>{e.code=n.value,e.revealed=!1,e.result=null;const r=document.querySelector("#code-error"),a=document.querySelector('[data-prediction] button[type="submit"]');try{const o=q(e.code),l=t.predict.filter(p=>!(p in o.variables));if(l.length)throw new h(`The edited snippet no longer sets ${l.join(" and ")}. Restore the puzzle or set that variable.`);const i=I(t,o),u=document.querySelector('[data-path-picker] input[name="path"]:checked')?.value||e.path;e.path=i.includes(u)?u:"";const s=document.querySelector("[data-path-choices]");s&&(s.innerHTML=N(i,e.path));const d=document.querySelector("[data-path-status]");d&&(d.textContent=`Path choices updated: ${i.join(", ")}.`),document.querySelector('[data-testid="reveal"]')?.remove(),r&&(r.hidden=!0,r.textContent=""),a&&(a.disabled=!1)}catch(o){r&&(r.hidden=!1,r.textContent=o instanceof Error?o.message:"This snippet could not be traced."),a&&(a.disabled=!0)}}),document.querySelector("[data-restore]")?.addEventListener("click",()=>{e.code=t.code,e.predictions={},e.path="",e.revealed=!1,e.result=null,e.notice="Puzzle restored.",y(!1)}),document.querySelector("[data-hint]")?.addEventListener("click",r=>{e.hint=!e.hint;const a=r.currentTarget,o=document.querySelector("#nudge-note");a.textContent=e.hint?"Hide the nudge":"Show one nudge",a.setAttribute("aria-expanded",String(e.hint)),o&&(o.hidden=!e.hint)}),document.querySelector("[data-prediction]")?.addEventListener("submit",r=>{r.preventDefault();const a=r.currentTarget,o=new FormData(a),l=a.querySelector("[data-form-error]");for(const s of[...t.predict,"output"])e.predictions[s]=String(o.get(s==="output"?"output":`variable-${s}`)||"").trim();e.path=String(o.get("path")||"");const i=[...t.predict,"output"].find(s=>e.predictions[s]==="");if(i||!e.path){l&&(l.textContent=i?`Add a prediction for ${i}. Then commit the trace.`:"Choose the path through the code. Then commit the trace."),a.querySelector(i==="output"?'[name="output"]':i?`[name="variable-${i}"]`:'[name="path"]')?.focus();return}const u=t.predict.find(s=>!/^-?\d+$/.test(e.predictions[s]));if(u){const s=a.querySelector(`[name="variable-${u}"]`);s?.setAttribute("aria-invalid","true"),l&&(l.textContent=`Enter a whole number for ${u}. Then commit the trace.`),s?.focus();return}try{const s=q(e.code);e.result=s,e.revealed=!0,e.attempts+=1,t.predict.every(p=>Number(e.predictions[p])===s.variables[p])&&e.predictions.output===s.output.join(", ")&&e.path===s.path&&e.solved.add(t.id),z(e),y(!1),document.querySelector("#result-title")?.focus()}catch(s){l&&(l.textContent=s instanceof Error?s.message:"The snippet could not be traced.")}}),document.querySelector("[data-retry]")?.addEventListener("click",()=>{e.revealed=!1,e.result=null,y(!1),document.querySelector(".variable-ledger input")?.focus()}),document.querySelector("[data-next]")?.addEventListener("click",()=>{e.current+=1,e.current<v.length&&(e.code=v[e.current].code),e.predictions={},e.path="",e.revealed=!1,e.result=null,e.hint=!1,z(e),y(!0),window.scrollTo({top:0,behavior:"smooth"})})}function Q(){V(),G(),document.querySelector("[data-clear-progress]")?.addEventListener("click",()=>{localStorage.removeItem(k(!1)),localStorage.removeItem(k(!0)),g=null;const e=document.querySelector(".clear-status");e&&(e.textContent="Saved progress was cleared from this browser.")})}function y(e=!1){const t=R();if(t!==C&&t!=="/play"&&t!=="/demo"&&(g=null),C=t,t==="/"&&new URLSearchParams(window.location.search).get("demo")==="1"?w.innerHTML=P(!0):t==="/"?w.innerHTML=W():t==="/play"?w.innerHTML=P(!1):t==="/demo"?w.innerHTML=P(!0):t==="/privacy"?w.innerHTML=_():t==="/terms"?w.innerHTML=U():w.innerHTML=J(),Q(),e){const n=document.querySelector("h1");n?.focus();const r=document.querySelector("#route-status");r&&n&&(r.textContent=n.textContent)}}window.addEventListener("popstate",()=>y(!0));y();"serviceWorker"in navigator&&window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
//# sourceMappingURL=index-u8u5VJsv.js.map
