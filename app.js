const quizEl = document.querySelector("#quiz");
const template = document.querySelector("#questionTemplate");
const topicFilter = document.querySelector("#topicFilter");
const modeEl = document.querySelector("#mode");

let currentQuestions = [];
let state = JSON.parse(localStorage.getItem("archPracticeState") || '{"score":0,"answered":0,"streak":0}');

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
  if (q.type === "dramCommands") return renderDramCommands(q);

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

  setResult(card, ok, `${points}/${max} pont`);

  if (!silent && modeEl.value === "practice") {
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

  if (q.type === "dramCommands") {
    q.expected.forEach((exp, i) => {
      card.querySelector(`[name="cmd-${q.id}-${i}"]`).value = exp[0];
      card.querySelector(`[name="param-${q.id}-${i}"]`).value = exp[1];
    });
  }

  card.querySelector("details.explanation").open = true;
  checkQuestion(id, true);
}

document.querySelector("#newSetBtn").addEventListener("click", makeSet);

document.querySelector("#checkAllBtn").addEventListener("click", () => {
  let total = 0, maxTotal = 0, allOk = true;
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

topicFilter.addEventListener("change", makeSet);

initTopics();
updateStats();
makeSet();
