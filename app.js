const quizEl = document.querySelector("#quiz");
const template = document.querySelector("#questionTemplate");
const topicFilter = document.querySelector("#topicFilter");
const modeEl = document.querySelector("#mode");
const themeToggleBtn = document.querySelector("#themeToggleBtn");

const THEME_STORAGE_KEY = "archPracticeTheme";

let currentQuestions = [];
let scoredQuestionIds = new Set();
let examSetScored = false;
let state = JSON.parse(localStorage.getItem("archPracticeState") || '{"score":0,"answered":0,"streak":0}');

function getPreferredTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getTheme() {
  return document.documentElement.dataset.theme || getPreferredTheme();
}

function setTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  if (themeToggleBtn) {
    const isDark = nextTheme === "dark";
    themeToggleBtn.textContent = isDark ? "Világos téma" : "Sötét téma";
    themeToggleBtn.setAttribute("aria-pressed", String(isDark));
  }
}

function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

function saveState() {
  localStorage.setItem("archPracticeState", JSON.stringify(state));
}

function updateStats() {
  document.querySelector("#score").textContent = state.score;
  document.querySelector("#answered").textContent = state.answered;
  document.querySelector("#streak").textContent = state.streak;
}

function initTopics() {
  const topics = [...new Set(QUESTION_BANK.map(q => q.topic))].sort();
  for (const topic of topics) {
    const opt = document.createElement("option");
    opt.value = topic;
    opt.textContent = topic;
    topicFilter.appendChild(opt);
  }
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeSet() {
  const topic = topicFilter.value;
  const pool = topic === "all" ? QUESTION_BANK : QUESTION_BANK.filter(q => q.topic === topic);
  currentQuestions = shuffle(pool).slice(0, Math.min(8, pool.length));
  scoredQuestionIds = new Set();
  examSetScored = false;
  render();
}

function render() {
  quizEl.innerHTML = "";
  currentQuestions.forEach((q, idx) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".question-card");
    card.dataset.id = q.id;
    node.querySelector(".badge").textContent = `${idx + 1}. feladat · ${q.topic}`;
    node.querySelector("h2").textContent = q.title;
    node.querySelector(".prompt").textContent = q.prompt;
    node.querySelector(".explanation-text").textContent = q.explanation;
    node.querySelector(".body").appendChild(renderBody(q));

    node.querySelector(".checkBtn").addEventListener("click", () => checkQuestion(q.id, false));
    node.querySelector(".showBtn").addEventListener("click", () => showSolution(q.id));

    quizEl.appendChild(node);
  });
}

function renderBody(q) {
  if (q.type === "truefalse") return renderTrueFalse(q);
  if (q.type === "matrix") return renderMatrix(q);
  if (q.type === "number") return renderNumber(q);
  if (q.type === "text") return renderText(q);
  if (q.type === "shortanswer") return renderShortAnswer(q);
  if (q.type === "dramCommands") return renderDramCommands(q);
  if (q.type === "tlbScenario") return renderTlbScenario(q);

  const div = document.createElement("div");
  div.textContent = "Ismeretlen feladattípus.";
  return div;
}

function trueFalseSelect(name) {
  const sel = document.createElement("select");
  sel.name = name;
  sel.innerHTML = `
    <option value="">-- válassz --</option>
    <option value="true">IGAZ</option>
    <option value="false">HAMIS</option>
  `;
  return sel;
}

function renderTrueFalse(q) {
  const wrap = document.createElement("div");
  wrap.className = "tf-list";
  q.statements.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "tf-row";
    row.appendChild(trueFalseSelect(`tf-${q.id}-${i}`));

    const text = document.createElement("div");
    text.textContent = s.text;
    row.appendChild(text);

    const mark = document.createElement("span");
    mark.className = "checkmark";
    row.appendChild(mark);

    wrap.appendChild(row);
  });
  return wrap;
}

function renderMatrix(q) {
  const table = document.createElement("table");
  table.className = "matrix";
  const head = document.createElement("tr");
  head.innerHTML = `<th>Állítás</th>${q.columns.map(c => `<th>${c}</th>`).join("")}`;
  table.appendChild(head);

  q.rows.forEach((r, ri) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><strong>${r.label}</strong></td>`;
    q.columns.forEach((_, ci) => {
      const td = document.createElement("td");
      const sel = trueFalseSelect(`mx-${q.id}-${ri}-${ci}`);
      td.appendChild(sel);
      const mark = document.createElement("span");
      mark.className = "checkmark";
      td.appendChild(mark);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  return table;
}

function renderNumber(q) {
  const wrap = document.createElement("div");
  wrap.className = "number-list";
  q.fields.forEach((f, i) => {
    const row = document.createElement("div");
    row.className = "number-row";
    row.innerHTML = `<label>${f.label}</label>`;
    const inp = document.createElement("input");
    inp.type = "number";
    inp.step = "any";
    inp.name = `num-${q.id}-${i}`;
    inp.placeholder = f.suffix || "";
    row.appendChild(inp);

    const mark = document.createElement("span");
    mark.className = "checkmark";
    row.appendChild(mark);

    wrap.appendChild(row);
  });
  return wrap;
}

function renderText(q) {
  const wrap = document.createElement("div");
  const ta = document.createElement("textarea");
  ta.name = `text-${q.id}`;
  ta.rows = 7;
  ta.style.width = "100%";
  ta.placeholder = "Ide írd a válaszod...";
  wrap.appendChild(ta);

  const hint = document.createElement("p");
  hint.className = "muted";
  hint.textContent = "A program kulcsszavak alapján ad részpontot, utána nézd meg a mintamegoldást is.";
  wrap.appendChild(hint);

  return wrap;
}

function renderShortAnswer(q) {
  const wrap = document.createElement("div");
  const inp = document.createElement("input");
  inp.type = "text";
  inp.name = `short-${q.id}`;
  inp.placeholder = "Rövid válasz...";
  inp.style.width = "100%";
  wrap.appendChild(inp);

  const hint = document.createElement("p");
  hint.className = "muted";
  hint.textContent = "Adj meg egy rövid, tömör választ.";
  wrap.appendChild(hint);

  return wrap;
}

function renderDramCommands(q) {
  const wrap = document.createElement("div");

  const info = document.createElement("pre");
  info.className = "codebox";
  info.textContent = "Parancsok: ACTIVATE sor, READ oszlop, PRECHARGE\nFR-FCFS: először a nyitott sor találatait szolgáljuk ki.";
  wrap.appendChild(info);

  q.expected.forEach((_, i) => {
    const row = document.createElement("div");
    row.className = "command-row";

    const sel = document.createElement("select");
    sel.name = `cmd-${q.id}-${i}`;
    sel.innerHTML = `
      <option value="">-- parancs --</option>
      <option value="ACTIVATE">ACTIVATE</option>
      <option value="READ">READ</option>
      <option value="PRECHARGE">PRECHARGE</option>
    `;
    row.appendChild(sel);

    const inp = document.createElement("input");
    inp.type = "text";
    inp.name = `param-${q.id}-${i}`;
    inp.placeholder = "paraméter";
    row.appendChild(inp);

    wrap.appendChild(row);
  });

  return wrap;
}

function cloneInitialPt2Tables(initialPt2) {
  return initialPt2.map(table => table.map(row => ({ ...row })));
}

function renderPt2Table(q, tableIdx, tableData, scenarioIdx) {
  const table = document.createElement("table");
  table.className = "mini-grid";

  const head = document.createElement("tr");
  head.innerHTML = "<th>Idx</th><th>V</th><th>Cim</th>";
  table.appendChild(head);

  tableData.forEach((row, rowIdx) => {
    const tr = document.createElement("tr");
    const idxBits = rowIdx.toString(2).padStart(2, "0");
    tr.innerHTML = `<td>${idxBits}</td>`;

    const vCell = document.createElement("td");
    const vInput = document.createElement("input");
    vInput.name = `tlbsc-pt2-v-${q.id}-${scenarioIdx}-${tableIdx}-${rowIdx}`;
    vInput.type = "number";
    vInput.min = "0";
    vInput.max = "1";
    vInput.step = "1";
    vInput.className = "mini-input";
    vInput.value = row.v;
    vCell.appendChild(vInput);
    tr.appendChild(vCell);

    const fCell = document.createElement("td");
    const fInput = document.createElement("input");
    fInput.name = `tlbsc-pt2-f-${q.id}-${scenarioIdx}-${tableIdx}-${rowIdx}`;
    fInput.type = "text";
    fInput.className = "mini-input";
    fInput.value = row.frame;
    fCell.appendChild(fInput);
    tr.appendChild(fCell);

    table.appendChild(tr);
  });

  return table;
}

function renderTlbScenario(q) {
  const wrap = document.createElement("div");
  wrap.className = "tlb-scenario-wrap";

  const info = document.createElement("pre");
  info.className = "codebox";
  info.textContent = q.context;
  wrap.appendChild(info);

  const initial = document.createElement("div");
  initial.className = "tlb-initial";

  const firstTitle = document.createElement("h3");
  firstTitle.textContent = "Kezdeti elsőszintű laptábla";
  initial.appendChild(firstTitle);

  const firstTable = document.createElement("table");
  firstTable.className = "mini-grid";
  firstTable.innerHTML = "<tr><th>Idx</th><th>V</th><th>Cim</th></tr>";
  q.initial.firstLevel.forEach((row, rowIdx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${rowIdx.toString(2).padStart(2, "0")}</td><td>${row.v}</td><td>${row.ptr}</td>`;
    firstTable.appendChild(tr);
  });
  initial.appendChild(firstTable);

  const tlbTitle = document.createElement("h3");
  tlbTitle.textContent = "Kezdeti TLB";
  initial.appendChild(tlbTitle);

  const tlbTable = document.createElement("table");
  tlbTable.className = "mini-grid";
  tlbTable.innerHTML = "<tr><th>Valid</th><th>Lap</th><th>Keret</th><th>Kor</th></tr>";
  q.initial.tlb.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.valid}</td><td>${row.page}</td><td>${row.frame}</td><td>${row.age}</td>`;
    tlbTable.appendChild(tr);
  });
  initial.appendChild(tlbTable);
  wrap.appendChild(initial);

  q.scenarios.forEach((scenario, sIdx) => {
    const section = document.createElement("section");
    section.className = "tlb-scenario-section";

    const title = document.createElement("h3");
    title.textContent = `${sIdx + 1}. feladat: ${scenario.title}`;
    section.appendChild(title);

    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = "A képen látható feladathoz hasonlóan a teljes új állapotot add meg.";
    section.appendChild(note);

    const tlbNewTitle = document.createElement("h4");
    tlbNewTitle.textContent = "TLB új állapota";
    section.appendChild(tlbNewTitle);

    const newTlb = document.createElement("table");
    newTlb.className = "mini-grid";
    newTlb.innerHTML = "<tr><th>Valid</th><th>Lap</th><th>Keret</th><th>Kor</th></tr>";
    scenario.expected.tlb.forEach((_, rowIdx) => {
      const tr = document.createElement("tr");

      ["v", "p", "f", "a"].forEach(kind => {
        const td = document.createElement("td");
        const inp = document.createElement("input");
        inp.type = "text";
        inp.className = "mini-input";
        inp.name = `tlbsc-tlb-${kind}-${q.id}-${sIdx}-${rowIdx}`;
        td.appendChild(inp);
        tr.appendChild(td);
      });

      newTlb.appendChild(tr);
    });
    section.appendChild(newTlb);

    const pt2Title = document.createElement("h4");
    pt2Title.textContent = "Másodszintű laptáblák új állapota";
    section.appendChild(pt2Title);

    const pt2Wrap = document.createElement("div");
    pt2Wrap.className = "pt2-wrap";
    const initialPt2 = cloneInitialPt2Tables(q.initial.secondLevel);
    initialPt2.forEach((tableData, tableIdx) => {
      const block = document.createElement("div");
      const label = document.createElement("div");
      label.className = "muted";
      label.textContent = `2. szint, ${tableIdx}. tábla`;
      block.appendChild(label);
      block.appendChild(renderPt2Table(q, tableIdx, tableData, sIdx));
      pt2Wrap.appendChild(block);
    });
    section.appendChild(pt2Wrap);

    wrap.appendChild(section);
  });

  return wrap;
}

function getQuestionCard(id) {
  return document.querySelector(`.question-card[data-id="${CSS.escape(id)}"]`);
}

function setResult(card, ok, text) {
  const pill = card.querySelector(".result-pill");
  pill.classList.remove("hidden", "ok", "bad");
  pill.classList.add(ok ? "ok" : "bad");
  pill.textContent = text || (ok ? "Helyes" : "Hibás");
}

function mark(el, ok) {
  el.textContent = ok ? "✓" : "✕";
  el.className = `checkmark ${ok ? "correct" : "incorrect"}`;
}

function checkQuestion(id, silent) {
  const q = currentQuestions.find(x => x.id === id);
  const card = getQuestionCard(id);
  let ok = false;
  let points = 0;
  let max = 1;

  if (q.type === "truefalse") {
    max = q.statements.length;
    points = q.statements.reduce((acc, s, i) => {
      const row = card.querySelectorAll(".tf-row")[i];
      const val = row.querySelector("select").value;
      const correct = val !== "" && (val === "true") === s.answer;
      mark(row.querySelector(".checkmark"), correct);
      return acc + (correct ? 1 : 0);
    }, 0);
    ok = points === max;
  }

  if (q.type === "matrix") {
    max = q.rows.length * q.columns.length;
    points = 0;
    q.rows.forEach((r, ri) => {
      q.columns.forEach((_, ci) => {
        const sel = card.querySelector(`[name="mx-${q.id}-${ri}-${ci}"]`);
        const correct = sel.value !== "" && (sel.value === "true") === r.answers[ci];
        mark(sel.parentElement.querySelector(".checkmark"), correct);
        if (correct) points++;
      });
    });
    ok = points === max;
  }

  if (q.type === "number") {
    max = q.fields.length;
    points = q.fields.reduce((acc, f, i) => {
      const inp = card.querySelector(`[name="num-${q.id}-${i}"]`);
      const got = Number(String(inp.value).replace(",", "."));
      const correct = inp.value !== "" && Math.abs(got - f.answer) < 1e-9;
      mark(inp.parentElement.querySelector(".checkmark"), correct);
      return acc + (correct ? 1 : 0);
    }, 0);
    ok = points === max;
  }

  if (q.type === "text") {
    const text = card.querySelector(`[name="text-${q.id}"]`).value.toLowerCase();
    max = q.keywords.requiredGroups.length;
    points = q.keywords.requiredGroups.reduce((acc, group) => {
      return acc + (group.some(word => text.includes(word.toLowerCase())) ? 1 : 0);
    }, 0);
    ok = points === max;
  }

  if (q.type === "shortanswer") {
    const got = card.querySelector(`[name="short-${q.id}"]`).value;
    const normalize = value => String(value).trim().toLowerCase().replace(/\s+/g, " ");
    max = 1;
    points = got !== "" && normalize(got) === normalize(q.answer) ? 1 : 0;
    const input = card.querySelector(`[name="short-${q.id}"]`);
    mark(input.parentElement.querySelector(".checkmark"), points === 1);
    ok = points === 1;
  }

  if (q.type === "dramCommands") {
    max = q.expected.length * 2;
    points = 0;
    q.expected.forEach((exp, i) => {
      const cmd = card.querySelector(`[name="cmd-${q.id}-${i}"]`).value.trim().toUpperCase();
      const param = card.querySelector(`[name="param-${q.id}-${i}"]`).value.trim();
      if (cmd === exp[0]) points++;
      if (param === exp[1]) points++;
    });
    ok = points === max;
  }

  if (q.type === "tlbScenario") {
    points = 0;
    max = 0;

    q.scenarios.forEach((scenario, sIdx) => {
      scenario.expected.tlb.forEach((row, rIdx) => {
        const expected = [String(row.valid), String(row.page), String(row.frame), String(row.age)];
        ["v", "p", "f", "a"].forEach((kind, cIdx) => {
          const el = card.querySelector(`[name="tlbsc-tlb-${kind}-${q.id}-${sIdx}-${rIdx}"]`);
          const correct = el.value.trim() === expected[cIdx];
          el.classList.toggle("cell-ok", correct);
          el.classList.toggle("cell-bad", !correct);
          points += correct ? 1 : 0;
          max++;
        });
      });

      scenario.expected.secondLevel.forEach((tableData, tIdx) => {
        tableData.forEach((row, rIdx) => {
          const vEl = card.querySelector(`[name="tlbsc-pt2-v-${q.id}-${sIdx}-${tIdx}-${rIdx}"]`);
          const fEl = card.querySelector(`[name="tlbsc-pt2-f-${q.id}-${sIdx}-${tIdx}-${rIdx}"]`);

          const vOk = vEl.value.trim() === String(row.v);
          const fOk = fEl.value.trim() === String(row.frame);

          vEl.classList.toggle("cell-ok", vOk);
          vEl.classList.toggle("cell-bad", !vOk);
          fEl.classList.toggle("cell-ok", fOk);
          fEl.classList.toggle("cell-bad", !fOk);

          points += vOk ? 1 : 0;
          points += fOk ? 1 : 0;
          max += 2;
        });
      });
    });

    ok = points === max;
  }

  setResult(card, ok, `${points}/${max} pont`);

  if (!silent && modeEl.value === "practice" && !scoredQuestionIds.has(id)) {
    scoredQuestionIds.add(id);
    state.answered++;
    state.score += points;
    state.streak = ok ? state.streak + 1 : 0;
    saveState();
    updateStats();
  }

  return { ok, points, max };
}

function showSolution(id) {
  const q = currentQuestions.find(x => x.id === id);
  const card = getQuestionCard(id);

  if (q.type === "truefalse") {
    q.statements.forEach((s, i) => {
      card.querySelector(`[name="tf-${q.id}-${i}"]`).value = String(s.answer);
    });
  }

  if (q.type === "matrix") {
    q.rows.forEach((r, ri) => {
      q.columns.forEach((_, ci) => {
        card.querySelector(`[name="mx-${q.id}-${ri}-${ci}"]`).value = String(r.answers[ci]);
      });
    });
  }

  if (q.type === "number") {
    q.fields.forEach((f, i) => {
      card.querySelector(`[name="num-${q.id}-${i}"]`).value = f.answer;
    });
  }

  if (q.type === "text") {
    card.querySelector(`[name="text-${q.id}"]`).value = q.sample;
  }

  if (q.type === "shortanswer") {
    card.querySelector(`[name="short-${q.id}"]`).value = q.answer;
  }

  if (q.type === "dramCommands") {
    q.expected.forEach((exp, i) => {
      card.querySelector(`[name="cmd-${q.id}-${i}"]`).value = exp[0];
      card.querySelector(`[name="param-${q.id}-${i}"]`).value = exp[1];
    });
  }

  if (q.type === "tlbScenario") {
    q.scenarios.forEach((scenario, sIdx) => {
      scenario.expected.tlb.forEach((row, rIdx) => {
        card.querySelector(`[name="tlbsc-tlb-v-${q.id}-${sIdx}-${rIdx}"]`).value = row.valid;
        card.querySelector(`[name="tlbsc-tlb-p-${q.id}-${sIdx}-${rIdx}"]`).value = row.page;
        card.querySelector(`[name="tlbsc-tlb-f-${q.id}-${sIdx}-${rIdx}"]`).value = row.frame;
        card.querySelector(`[name="tlbsc-tlb-a-${q.id}-${sIdx}-${rIdx}"]`).value = row.age;
      });

      scenario.expected.secondLevel.forEach((tableData, tIdx) => {
        tableData.forEach((row, rIdx) => {
          card.querySelector(`[name="tlbsc-pt2-v-${q.id}-${sIdx}-${tIdx}-${rIdx}"]`).value = row.v;
          card.querySelector(`[name="tlbsc-pt2-f-${q.id}-${sIdx}-${tIdx}-${rIdx}"]`).value = row.frame;
        });
      });
    });
  }

  card.querySelector("details.explanation").open = true;
  checkQuestion(id, true);
}

document.querySelector("#newSetBtn").addEventListener("click", makeSet);

document.querySelector("#checkAllBtn").addEventListener("click", () => {
  let total = 0, maxTotal = 0, allOk = true;

  if (modeEl.value === "practice") {
    currentQuestions.forEach(q => {
      const r = checkQuestion(q.id, false);
      total += r.points;
      maxTotal += r.max;
      allOk &&= r.ok;
    });
    alert(`Eredmény: ${total}/${maxTotal} pont`);
    return;
  }

  if (examSetScored) return;
  examSetScored = true;

  currentQuestions.forEach(q => {
    const r = checkQuestion(q.id, true);
    total += r.points;
    maxTotal += r.max;
    allOk &&= r.ok;
  });
  state.answered += currentQuestions.length;
  state.score += total;
  state.streak = allOk ? state.streak + 1 : 0;
  saveState();
  updateStats();
  alert(`Eredmény: ${total}/${maxTotal} pont`);
});

document.querySelector("#resetProgressBtn").addEventListener("click", () => {
  state = { score: 0, answered: 0, streak: 0 };
  saveState();
  updateStats();
});

themeToggleBtn.addEventListener("click", toggleTheme);

topicFilter.addEventListener("change", makeSet);

setTheme(document.documentElement.dataset.theme || getPreferredTheme());
initTopics();
updateStats();
makeSet();
