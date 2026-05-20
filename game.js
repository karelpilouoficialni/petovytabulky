// ========================================
// EXCEL VÝZVA – Game Logic
// ========================================

// ===== TEACHER MOODS =====
const MOODS = {
  'very-bad':  { emoji: '😤', label: 'Katastrofa!',  score: 0 },
  'bad':       { emoji: '😟', label: 'Slabé...',     score: 1 },
  'medium':    { emoji: '😐', label: 'Ujde to.',     score: 2 },
  'good':      { emoji: '😊', label: 'Dobře!',       score: 3 },
  'very-good': { emoji: '🤩', label: 'Výborně!!',    score: 4 },
};

// ===== ALL AVAILABLE FUNCTIONS =====
const ALL_FUNCTIONS = [
  { id: 'SUM',      label: '=SUM',      color: '#217346' },
  { id: 'AVERAGE',  label: '=AVERAGE',  color: '#2e75b6' },
  { id: 'MIN',      label: '=MIN',      color: '#833c0d' },
  { id: 'MAX',      label: '=MAX',      color: '#7030a0' },
  { id: 'COUNT',    label: '=COUNT',    color: '#375623' },
  { id: 'IF',       label: '=IF',       color: '#c00000' },
  { id: 'VLOOKUP',  label: '=VLOOKUP',  color: '#4472c4' },
  { id: 'COUNTA',   label: '=COUNTA',   color: '#538135' },
  { id: 'COUNTIF',  label: '=COUNTIF',  color: '#bf8f00' },
  { id: 'SUMIF',    label: '=SUMIF',    color: '#7f3f98' },
  { id: 'ROUND',    label: '=ROUND',    color: '#1f3864' },
  { id: 'CONCATENATE', label: '=CONCATENATE', color: '#a50021' },
];

// ===== QUESTION BANK =====
// Each question: { funcId, desc, table, answerCell, correctFormula, altFormulas, hint, checkFn }
const ALL_QUESTIONS = [

  // --- SUM ---
  {
    funcId: 'SUM',
    desc: 'V buňce B6 spočítej součet prodeje za všechny měsíce (B2:B5).',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Měsíc', 'Prodej (Kč)'],
        ['2', 'Leden',  '12500'],
        ['3', 'Únor',   '9800'],
        ['4', 'Březen', '15200'],
        ['5', 'Duben',  '11400'],
        ['6', 'CELKEM', '❓'],
      ],
    },
    answerCell: 'B6',
    hint: 'Použij =SUM(začátek:konec) kde rozsah je B2 až B5',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B5)',
    correctFormula: '=SUM(B2:B5)',
    expectedResult: '48 900 Kč',
  },
  {
    funcId: 'SUM',
    desc: 'Spočítej celkové výdaje za rok – součet buněk C2 až C7 vlož do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Položka', 'Výdaj (Kč)'],
        ['2', 'Nájem',   '8000'],
        ['3', 'Jídlo',   '4500'],
        ['4', 'Doprava', '2100'],
        ['5', 'Internet','800'],
        ['6', 'Telefon', '600'],
        ['7', 'Ostatní', '1200'],
        ['8', 'CELKEM',  '❓'],
      ],
    },
    answerCell: 'C8',
    hint: 'Součet celého sloupce: =SUM(C2:C7)',
    checkFn: (f) => normalizeFormula(f) === 'SUM(C2:C7)',
    correctFormula: '=SUM(C2:C7)',
    expectedResult: '17 200 Kč',
  },

  // --- AVERAGE ---
  {
    funcId: 'AVERAGE',
    desc: 'Vypočítej průměrnou teplotu za týden. Vlož vzorec do buňky B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Den',   'Teplota (°C)'],
        ['2', 'Po',    '18'],
        ['3', 'Út',    '21'],
        ['4', 'St',    '19'],
        ['5', 'Čt',    '23'],
        ['6', 'Pá',    '22'],
        ['7', 'So',    '25'],
        ['8', 'Ne',    '20'],
        ['9', 'Průměr','❓'],
      ],
    },
    answerCell: 'B9',
    hint: 'Průměr: =AVERAGE(B2:B8)',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(B2:B8)',
    correctFormula: '=AVERAGE(B2:B8)',
    expectedResult: '21,14 °C',
  },
  {
    funcId: 'AVERAGE',
    desc: 'Spočítej průměrnou známku studenta ze všech předmětů (D2:D6). Výsledek do D7.',
    table: {
      headers: ['', 'C', 'D'],
      rows: [
        ['1', 'Předmět',   'Známka'],
        ['2', 'Matematika','2'],
        ['3', 'Čeština',   '1'],
        ['4', 'Angličtina','3'],
        ['5', 'Dějepis',   '2'],
        ['6', 'Fyzika',    '4'],
        ['7', 'Průměr',    '❓'],
      ],
    },
    answerCell: 'D7',
    hint: '=AVERAGE(D2:D6) – průměruje hodnoty v rozsahu',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(D2:D6)',
    correctFormula: '=AVERAGE(D2:D6)',
    expectedResult: '2,40',
  },

  // --- MIN ---
  {
    funcId: 'MIN',
    desc: 'Najdi nejnižší cenu produktu ze sloupce B. Výsledek vlož do B7.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Produkt',  'Cena (Kč)'],
        ['2', 'Tričko',   '299'],
        ['3', 'Kalhoty',  '899'],
        ['4', 'Boty',     '1490'],
        ['5', 'Čepice',   '149'],
        ['6', 'Ponožky',  '89'],
        ['7', 'Minimum',  '❓'],
      ],
    },
    answerCell: 'B7',
    hint: '=MIN(B2:B6) najde nejmenší hodnotu',
    checkFn: (f) => normalizeFormula(f) === 'MIN(B2:B6)',
    correctFormula: '=MIN(B2:B6)',
    expectedResult: '89 Kč',
  },

  // --- MAX ---
  {
    funcId: 'MAX',
    desc: 'Zjisti maximální skóre v turnaji ze sloupce C. Výsledek vlož do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Hráč',    'Skóre'],
        ['2', 'Tomáš',   '4200'],
        ['3', 'Petra',   '5800'],
        ['4', 'Ondřej',  '3900'],
        ['5', 'Lucie',   '6100'],
        ['6', 'Martin',  '5500'],
        ['7', 'Eva',     '4750'],
        ['8', 'Maximum', '❓'],
      ],
    },
    answerCell: 'C8',
    hint: '=MAX(C2:C7) vrátí největší hodnotu',
    checkFn: (f) => normalizeFormula(f) === 'MAX(C2:C7)',
    correctFormula: '=MAX(C2:C7)',
    expectedResult: '6 100',
  },

  // --- COUNT ---
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik měsíců má zapsané tržby (číselné hodnoty) ve sloupci B. Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Měsíc',    'Tržby (Kč)'],
        ['2', 'Leden',    '52000'],
        ['3', 'Únor',     '–'],
        ['4', 'Březen',   '61000'],
        ['5', 'Duben',    '48000'],
        ['6', 'Květen',   '–'],
        ['7', 'Červen',   '55000'],
        ['8', 'Počet',    '❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=COUNT(B2:B7) počítá pouze čísla (prázdné a text přeskočí)',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(B2:B7)',
    correctFormula: '=COUNT(B2:B7)',
    expectedResult: '4',
  },

  // --- IF ---
  {
    funcId: 'IF',
    desc: 'V buňce C2 napiš vzorec: Pokud je skóre v B2 větší nebo rovno 50, napiš "Splnil", jinak "Nesplnil".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Jméno',  'Skóre', 'Výsledek'],
        ['2', 'Adam',   '73',    '❓'],
        ['3', 'Bára',   '44',    ''],
        ['4', 'Čestmír','51',    ''],
        ['5', 'Dana',   '38',    ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(podmínka, "hodnota_ano", "hodnota_ne")  →  =IF(B2>=50,"Splnil","Nesplnil")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2>=50,"SPLNIL","NESPLNIL")' || normalizeFormula(f) === 'IF(B2>=50,"Splnil","Nesplnil")'.toUpperCase(),
    correctFormula: '=IF(B2>=50,"Splnil","Nesplnil")',
    expectedResult: '"Splnil"',
  },
  {
    funcId: 'IF',
    desc: 'V buňce D2 vlož vzorec: Pokud je průměr (C2) větší než 3, zobraz "Opakovat", jinak "Postoupit".',
    table: {
      headers: ['', 'B', 'C', 'D'],
      rows: [
        ['1', 'Student', 'Průměr', 'Status'],
        ['2', 'Marek',   '3.4',   '❓'],
        ['3', 'Klára',   '1.8',   ''],
        ['4', 'Radek',   '2.9',   ''],
      ],
    },
    answerCell: 'D2',
    hint: '=IF(C2>3,"Opakovat","Postoupit")',
    checkFn: (f) => normalizeFormula(f) === 'IF(C2>3,"OPAKOVAT","POSTOUPIT")',
    correctFormula: '=IF(C2>3,"Opakovat","Postoupit")',
    expectedResult: '"Opakovat"',
  },

  // --- VLOOKUP ---
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi cenu produktu "Klávesnice" (G1) v tabulce A1:B5. Cena je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Produkt',    'Cena',  '', 'Hledám:', 'Klávesnice'],
        ['2', 'Monitor',    '5990',  '', 'Cena:',   '❓'],
        ['3', 'Klávesnice', '890',   '', '',         ''],
        ['4', 'Myš',        '450',   '', '',         ''],
        ['5', 'Headset',    '1290',  '', '',         ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(hledaná_hodnota, tabulka, číslo_sloupce, 0)\n→ =VLOOKUP(G1,A2:B5,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(G1,A2:B5,2,0)' || normalizeFormula(f) === 'VLOOKUP(G1,A1:B5,2,0)',
    correctFormula: '=VLOOKUP(G1,A2:B5,2,0)',
    expectedResult: '890',
  },

  // --- COUNTA ---
  {
    funcId: 'COUNTA',
    desc: 'Spočítej kolik studentů je zapsáno v seznamu (A2:A8) – i prázdné buňky přeskoč. Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Studenti', '❓'],
        ['2', 'Novák',    ''],
        ['3', '',         ''],
        ['4', 'Procházka',''],
        ['5', 'Svobodová',''],
        ['6', '',         ''],
        ['7', 'Dvořák',   ''],
        ['8', 'Kratochvíl',''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A8) počítá neprázdné buňky (text i čísla)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A8)',
    correctFormula: '=COUNTA(A2:A8)',
    expectedResult: '5',
  },

  // --- COUNTIF ---
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolikrát se v B2:B8 vyskytuje hodnocení "Výborný".',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Žák',   'Hodnocení', 'Hledám:', 'Výborný'],
        ['2', 'A. K.', 'Výborný',   'Počet:',  '❓'],
        ['3', 'B. N.', 'Dobrý',     '',         ''],
        ['4', 'C. P.', 'Výborný',   '',         ''],
        ['5', 'D. S.', 'Dostatečný','',         ''],
        ['6', 'E. M.', 'Výborný',   '',         ''],
        ['7', 'F. H.', 'Dobrý',     '',         ''],
        ['8', 'G. V.', 'Výborný',   '',         ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(rozsah, kritérium) → =COUNTIF(B2:B8,"Výborný") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"VÝBORNÝ")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"Výborný")',
    expectedResult: '4',
  },

  // --- SUMIF ---
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkový prodej pouze pro region "Sever" (A2:A7) ze sloupce C2:C7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Region', 'Zástupce', 'Prodej', 'Hledám:','Sever'],
        ['2', 'Sever',  'Kovář',    '45000',  'Součet:', '❓'],
        ['3', 'Jih',    'Beneš',    '32000',  '',         ''],
        ['4', 'Sever',  'Pospíšil', '38000',  '',         ''],
        ['5', 'Západ',  'Nová',     '27000',  '',         ''],
        ['6', 'Sever',  'Kolář',    '51000',  '',         ''],
        ['7', 'Jih',    'Šimek',    '29000',  '',         ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(rozsah_kriterií, kriterium, rozsah_součtu)\n→ =SUMIF(A2:A7,"Sever",C2:C7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"SEVER",C2:C7)' || normalizeFormula(f) === 'SUMIF(A2:A7,E1,C2:C7)',
    correctFormula: '=SUMIF(A2:A7,"Sever",C2:C7)',
    expectedResult: '134 000 Kč',
  },

  // --- ROUND ---
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli výsledek z buňky B2 (průměr 3.7456) na 2 desetinná místa. Výsledek vlož do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Položka',  'Hodnota', 'Zaokrouhleno'],
        ['2', 'Průměr',   '3.7456',  '❓'],
        ['3', 'Podíl',    '8.2189',  ''],
        ['4', 'DPH koef.','0.9167',  ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(číslo, počet_míst) → =ROUND(B2,2)',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,2)',
    correctFormula: '=ROUND(B2,2)',
    expectedResult: '3,75',
  },

  // --- CONCATENATE ---
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj příjmení (A2) a jméno (B2) s mezerou mezi nimi do C2. Výsledek: "Novák Jan".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Příjmení', 'Jméno', 'Celé jméno'],
        ['2', 'Novák',    'Jan',    '❓'],
        ['3', 'Svobodová','Eva',    ''],
        ['4', 'Procházka','Tomáš',  ''],
      ],
    },
    answerCell: 'C2',
    hint: '=CONCATENATE(A2," ",B2) nebo =A2&" "&B2',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2," ",B2)' || normalizeFormula(f) === 'A2&" "&B2',
    correctFormula: '=CONCATENATE(A2," ",B2)',
    expectedResult: '"Novák Jan"',
  },
];

// ===== HELPERS =====
function normalizeFormula(raw) {
  return raw.trim().replace(/^=/, '').toUpperCase().replace(/\s+/g, '');
}

function setTeacherMood(elId, moodKey) {
  const el = document.getElementById(elId);
  if (!el) return;
  // remove all mood classes
  el.classList.remove(...Object.keys(MOODS).map(k => `mood-${k}`));
  el.classList.add(`mood-${moodKey}`);
  el.setAttribute('data-emoji', MOODS[moodKey].emoji);
  // bounce animation
  el.classList.remove('teacher-bounce');
  void el.offsetWidth;
  el.classList.add('teacher-bounce');
  setTimeout(() => el.classList.remove('teacher-bounce'), 500);
}

// ===== GAME STATE =====
let state = {
  selectedFuncs: [],
  difficulty: 'easy',
  questions: [],
  currentQ: 0,
  score: 0,
  correct: 0,
  wrong: 0,
  totalTime: 0,
  timerSeconds: 30,
  timerInterval: null,
  answered: false,
  consecutiveCorrect: 0,
  startTime: null,
  currentMood: 'medium',
};

const DIFF_CONFIG = {
  easy:   { count: 3,  time: 40 },
  medium: { count: 6,  time: 30 },
  hard:   { count: 10, time: 20 },
};

// ===== INIT HOME =====
function initHome() {
  const grid = document.getElementById('function-selector');
  grid.innerHTML = '';
  ALL_FUNCTIONS.forEach(fn => {
    const chip = document.createElement('button');
    chip.className = 'func-chip' + (state.selectedFuncs.includes(fn.id) ? ' selected' : '');
    chip.textContent = fn.label;
    chip.dataset.id = fn.id;
    chip.addEventListener('click', () => toggleFunc(fn.id, chip));
    grid.appendChild(chip);
  });

  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.diff === state.difficulty);
    btn.addEventListener('click', () => {
      state.difficulty = btn.dataset.diff;
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.toggle('active', b.dataset.diff === state.difficulty));
    });
  });

  document.getElementById('start-btn').addEventListener('click', startGame);
  setTeacherMood('home-teacher', 'medium');
}

function toggleFunc(id, chip) {
  const idx = state.selectedFuncs.indexOf(id);
  if (idx === -1) {
    state.selectedFuncs.push(id);
    chip.classList.add('selected');
  } else {
    state.selectedFuncs.splice(idx, 1);
    chip.classList.remove('selected');
  }
}

// ===== START GAME =====
function startGame() {
  const cfg = DIFF_CONFIG[state.difficulty];
  
  // Filter questions by selected functions
  let pool = state.selectedFuncs.length > 0
    ? ALL_QUESTIONS.filter(q => state.selectedFuncs.includes(q.funcId))
    : [...ALL_QUESTIONS];

  if (pool.length === 0) {
    alert('Vyber alespoň jednu funkci nebo ponech výběr prázdný pro všechny!');
    return;
  }

  // Shuffle and pick
  pool = shuffle(pool);
  state.questions = pool.slice(0, cfg.count);
  state.currentQ = 0;
  state.score = 0;
  state.correct = 0;
  state.wrong = 0;
  state.totalTime = 0;
  state.consecutiveCorrect = 0;
  state.currentMood = 'medium';
  state.startTime = Date.now();

  showScreen('screen-game');
  setTeacherMood('game-teacher', 'medium');
  document.getElementById('mood-label').textContent = 'Připraven!';

  setupGameListeners();
  loadQuestion();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== GAME LISTENERS =====
let listenersSetup = false;
function setupGameListeners() {
  if (listenersSetup) return;
  listenersSetup = true;

  document.getElementById('check-btn').addEventListener('click', checkAnswer);
  document.getElementById('formula-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAnswer();
  });
  document.getElementById('next-btn').addEventListener('click', nextQuestion);
  document.getElementById('home-btn').addEventListener('click', () => {
    stopTimer();
    showScreen('screen-home');
  });
  document.getElementById('retry-btn').addEventListener('click', () => {
    showScreen('screen-home');
    startGame();
  });
  document.getElementById('menu-btn2').addEventListener('click', () => {
    showScreen('screen-home');
  });
}

// ===== LOAD QUESTION =====
function loadQuestion() {
  const q = state.questions[state.currentQ];
  state.answered = false;

  document.getElementById('task-desc').textContent = q.desc;
  document.getElementById('task-badge').textContent = `ÚKOL ${state.currentQ + 1}`;
  document.getElementById('cell-ref').textContent = q.answerCell;
  document.getElementById('progress-text').textContent = `${state.currentQ + 1} / ${state.questions.length}`;
  document.getElementById('score-value').textContent = state.score;

  const input = document.getElementById('formula-input');
  input.value = '';
  input.className = 'formula-input';
  input.focus();

  document.getElementById('hint-area').style.display = 'none';
  document.getElementById('result-overlay').style.display = 'none';

  renderTable(q);
  startTimer();
}

// ===== RENDER EXCEL TABLE =====
function renderTable(q) {
  const container = document.getElementById('excel-container');
  const { headers, rows } = q.table;

  let html = '<table class="excel-table"><thead><tr>';
  headers.forEach((h, i) => {
    if (i === 0) html += `<th class="row-header">&nbsp;</th>`;
    else html += `<th>${h}</th>`;
  });
  html += '</tr></thead><tbody>';

  rows.forEach(row => {
    html += '<tr>';
    row.forEach((cell, i) => {
      if (i === 0) {
        html += `<td class="row-num">${cell}</td>`;
      } else if (cell === '❓') {
        html += `<td class="answer-cell" title="${q.answerCell}">${q.answerCell}</td>`;
      } else {
        const isHeader = row[i-1] !== undefined && i === 1 && rows.indexOf(row) === 0;
        const isNum = !isNaN(cell.replace(/\s/g,'')) && cell !== '';
        let cls = '';
        if (rows.indexOf(row) === 0) cls = 'header-cell';
        else if (isNum) cls = 'num-cell';
        html += `<td class="${cls}">${cell}</td>`;
      }
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

// ===== TIMER =====
function startTimer() {
  stopTimer();
  const cfg = DIFF_CONFIG[state.difficulty];
  let timeLeft = cfg.time;
  const arc = document.getElementById('timer-arc');
  const circumference = 213.6;
  const totalTime = cfg.time;

  function updateTimer() {
    document.getElementById('timer-text').textContent = timeLeft;
    const offset = circumference * (1 - timeLeft / totalTime);
    arc.style.strokeDashoffset = offset;

    arc.classList.remove('warning', 'danger');
    if (timeLeft <= totalTime * 0.25) arc.classList.add('danger');
    else if (timeLeft <= totalTime * 0.5) arc.classList.add('warning');
  }

  updateTimer();
  state.timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      stopTimer();
      timeExpired();
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function timeExpired() {
  if (state.answered) return;
  state.answered = true;
  state.wrong++;
  state.consecutiveCorrect = 0;
  updateMood(false, true);
  showResult(false, true);
}

// ===== CHECK ANSWER =====
function checkAnswer() {
  if (state.answered) return;
  const input = document.getElementById('formula-input');
  const val = input.value.trim();
  if (!val) return;

  state.answered = true;
  stopTimer();

  const q = state.questions[state.currentQ];
  const isCorrect = q.checkFn(val);

  if (isCorrect) {
    state.correct++;
    state.consecutiveCorrect++;
    const cfg = DIFF_CONFIG[state.difficulty];
    const timeLeft = parseInt(document.getElementById('timer-text').textContent);
    const timeBonus = Math.round((timeLeft / cfg.time) * 10);
    const points = 10 + timeBonus + (state.consecutiveCorrect > 2 ? 5 : 0);
    state.score += points;

    input.classList.add('correct');
    updateMood(true, false);
    showResult(true, false);
  } else {
    state.wrong++;
    state.consecutiveCorrect = 0;
    input.classList.add('wrong');

    // Show hint after wrong
    const hintArea = document.getElementById('hint-area');
    document.getElementById('hint-text').textContent = '💡 ' + q.hint;
    hintArea.style.display = 'block';

    updateMood(false, false);
    showResult(false, false);
  }

  document.getElementById('score-value').textContent = state.score;
}

// ===== MOOD LOGIC =====
function updateMood(correct, timeout) {
  const ratio = state.correct / (state.currentQ + 1);

  let mood;
  if (timeout) {
    mood = state.currentMood === 'very-bad' ? 'very-bad' : 'bad';
  } else if (correct) {
    if (state.consecutiveCorrect >= 3) mood = 'very-good';
    else if (ratio >= 0.8) mood = 'good';
    else mood = 'medium';
  } else {
    if (ratio < 0.3) mood = 'very-bad';
    else if (ratio < 0.5) mood = 'bad';
    else mood = 'medium';
  }

  state.currentMood = mood;
  setTeacherMood('game-teacher', mood);
  document.getElementById('mood-label').textContent = MOODS[mood].label;
}

// ===== SHOW RESULT =====
function showResult(correct, timeout) {
  const q = state.questions[state.currentQ];
  const overlay = document.getElementById('result-overlay');
  const card = document.getElementById('result-card');

  document.getElementById('result-overlay').style.display = 'flex';

  if (correct) {
    card.className = 'result-card';
    document.getElementById('result-icon').textContent = '✅';
    document.getElementById('result-msg').textContent = getCorrectMsg();
    document.getElementById('result-answer').textContent = `Správně: ${q.correctFormula} → ${q.expectedResult}`;
  } else if (timeout) {
    card.className = 'result-card wrong-card';
    document.getElementById('result-icon').textContent = '⏰';
    document.getElementById('result-msg').textContent = 'Čas vypršel!';
    document.getElementById('result-answer').textContent = `Správný vzorec: ${q.correctFormula}`;
  } else {
    card.className = 'result-card wrong-card';
    document.getElementById('result-icon').textContent = '❌';
    document.getElementById('result-msg').textContent = getWrongMsg();
    document.getElementById('result-answer').textContent = `Správný vzorec: ${q.correctFormula}`;
  }
}

function getCorrectMsg() {
  const msgs = ['SPRÁVNĚ!', 'BRAVO!', 'VÝBORNĚ!', 'PŘESNĚ TAK!', 'SUPER!'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}
function getWrongMsg() {
  const msgs = ['ZKUS ZNOVU', 'ŠPATNĚ!', 'CHYBA!', 'NE TAKHLE...'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  state.currentQ++;
  if (state.currentQ >= state.questions.length) {
    showResults();
  } else {
    loadQuestion();
  }
}

// ===== SHOW RESULTS =====
function showResults() {
  const elapsed = Math.round((Date.now() - state.startTime) / 1000);
  const total = state.questions.length;
  const ratio = state.correct / total;

  let moodKey, grade, comment;
  if (ratio >= 0.9) {
    moodKey = 'very-good'; grade = 'Jednička s hvězdičkou ⭐';
    comment = 'Fantastický výkon! Jsi Excel mistr! 🏆';
  } else if (ratio >= 0.7) {
    moodKey = 'good'; grade = 'Chvalitebný 😊';
    comment = 'Výborná práce! Jen ještě trochu trénovat.';
  } else if (ratio >= 0.5) {
    moodKey = 'medium'; grade = 'Dobrý 😐';
    comment = 'Základ zvládáš, ale ještě je co zlepšovat.';
  } else if (ratio >= 0.3) {
    moodKey = 'bad'; grade = 'Dostatečný 😟';
    comment = 'Potřebuješ ještě hodně procvičovat!';
  } else {
    moodKey = 'very-bad'; grade = 'Nedostatečný 😤';
    comment = 'Nevzdávej se! Zkus to ještě jednou od začátku.';
  }

  showScreen('screen-results');
  setTeacherMood('results-teacher', moodKey);
  document.getElementById('results-title').textContent = 'Výsledky';
  document.getElementById('results-grade').textContent = grade;
  document.getElementById('stat-correct').textContent = state.correct;
  document.getElementById('stat-wrong').textContent = state.wrong;
  document.getElementById('stat-time').textContent = elapsed + 's';
  document.getElementById('stat-score').textContent = state.score;
  document.getElementById('results-comment').textContent = comment;
}

// ===== SCREEN SWITCHING =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===== BOOTSTRAP =====
document.addEventListener('DOMContentLoaded', () => {
  // Set initial teacher emojis
  document.querySelectorAll('.teacher-face').forEach(el => {
    el.setAttribute('data-emoji', MOODS['medium'].emoji);
  });

  initHome();

  // Difficulty buttons re-init (since initHome sets listeners)
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.difficulty = btn.dataset.diff;
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.toggle('active', b.dataset.diff === state.difficulty));
    });
  });
});
