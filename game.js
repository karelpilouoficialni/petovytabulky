// ========================================
// EXCEL VÝZVA – Game Logic
// ========================================

// ===== TEACHER MOODS =====
const MOODS = {
  "very-bad": { label: "Katastrofa!", score: 0 },
  bad: { label: "Slabé...", score: 1 },
  medium: { label: "Ujde to.", score: 2 },
  good: { label: "Dobře!", score: 3 },
  "very-good": { label: "Výborně!!", score: 4 },
};

// ===== TEACHER IMAGES =====
// To use your own PNG photos, replace the SVG files in the teacher/ folder with:
//   very-bad.png  bad.png  medium.png  good.png  very-good.png
// Then change the extension below from .svg to .png
const MOOD_IMAGES = {
  "very-bad": "teacher/very-bad.png",
  bad: "teacher/bad.png",
  medium: "teacher/medium.png",
  good: "teacher/good.png",
  "very-good": "teacher/very-good.png",
};

// ===== ALL AVAILABLE FUNCTIONS =====
const ALL_FUNCTIONS = [
  { id: "SUM", label: "=SUM", color: "#217346" },
  { id: "AVERAGE", label: "=AVERAGE", color: "#2e75b6" },
  { id: "MIN", label: "=MIN", color: "#833c0d" },
  { id: "MAX", label: "=MAX", color: "#7030a0" },
  { id: "COUNT", label: "=COUNT", color: "#375623" },
  { id: "IF", label: "=IF", color: "#c00000" },
  { id: "VLOOKUP", label: "=VLOOKUP", color: "#4472c4" },
  { id: "COUNTA", label: "=COUNTA", color: "#538135" },
  { id: "COUNTIF", label: "=COUNTIF", color: "#bf8f00" },
  { id: "SUMIF", label: "=SUMIF", color: "#7f3f98" },
  { id: "ROUND", label: "=ROUND", color: "#1f3864" },
  { id: "CONCATENATE", label: "=CONCATENATE", color: "#a50021" },
];

// ===== QUESTION BANK =====
// Each question: { funcId, desc, table, answerCell, correctFormula, altFormulas, hint, checkFn }
const ALL_QUESTIONS = [
  // --- SUM ---
  {
    funcId: "SUM",
    desc: "V buňce B6 spočítej součet prodeje za všechny měsíce (B2:B5).",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Měsíc", "Prodej (Kč)"],
        ["2", "Leden", "12500"],
        ["3", "Únor", "9800"],
        ["4", "Březen", "15200"],
        ["5", "Duben", "11400"],
        ["6", "CELKEM", "❓"],
      ],
    },
    answerCell: "B6",
    hint: "Použij =SUM(začátek:konec) kde rozsah je B2 až B5",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B5)",
    correctFormula: "=SUM(B2:B5)",
    expectedResult: "48 900 Kč",
  },
  {
    funcId: "SUM",
    desc: "Spočítej celkové výdaje za rok – součet buněk C2 až C7 vlož do C8.",
    table: {
      headers: ["", "B", "C"],
      rows: [
        ["1", "Položka", "Výdaj (Kč)"],
        ["2", "Nájem", "8000"],
        ["3", "Jídlo", "4500"],
        ["4", "Doprava", "2100"],
        ["5", "Internet", "800"],
        ["6", "Telefon", "600"],
        ["7", "Ostatní", "1200"],
        ["8", "CELKEM", "❓"],
      ],
    },
    answerCell: "C8",
    hint: "Součet celého sloupce: =SUM(C2:C7)",
    checkFn: (f) => normalizeFormula(f) === "SUM(C2:C7)",
    correctFormula: "=SUM(C2:C7)",
    expectedResult: "17 200 Kč",
  },
  {
    funcId: "SUM",
    desc: "Spočítej celkový počet prodaných vstupenek (B2:B5). Výsledek vlož do B6.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Kvartál", "Vstupenky"],
        ["2", "Q1", "520"],
        ["3", "Q2", "680"],
        ["4", "Q3", "740"],
        ["5", "Q4", "610"],
        ["6", "CELKEM", "❓"],
      ],
    },
    answerCell: "B6",
    hint: "=SUM(B2:B5)",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B5)",
    correctFormula: "=SUM(B2:B5)",
    expectedResult: "2 550",
  },
  {
    funcId: "SUM",
    desc: "Sečti platby od zákazníků (C2:C6). Výsledek do C7.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Zákazník", "Město", "Platba (Kč)"],
        ["2", "Novák", "Praha", "5000"],
        ["3", "Beneš", "Brno", "3200"],
        ["4", "Černá", "Ostrava", "8500"],
        ["5", "Dvořák", "Plzeň", "2100"],
        ["6", "Polák", "Liberec", "4600"],
        ["7", "CELKEM", "", "❓"],
      ],
    },
    answerCell: "C7",
    hint: "=SUM(C2:C6)",
    checkFn: (f) => normalizeFormula(f) === "SUM(C2:C6)",
    correctFormula: "=SUM(C2:C6)",
    expectedResult: "23 400 Kč",
  },
  {
    funcId: "SUM",
    desc: "Spočítej celkový počet odpracovaných hodin (B2:B9). Výsledek do B10.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Den", "Hodiny"],
        ["2", "Pondělí", "8"],
        ["3", "Úterý", "7.5"],
        ["4", "Středa", "8"],
        ["5", "Čtvrtek", "8.5"],
        ["6", "Pátek", "6"],
        ["7", "Sobota", "4"],
        ["8", "Neděle", "0"],
        ["9", "Přesčas", "2"],
        ["10", "CELKEM", "❓"],
      ],
    },
    answerCell: "B10",
    hint: "=SUM(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B9)",
    correctFormula: "=SUM(B2:B9)",
    expectedResult: "44 h",
  },
  {
    funcId: "SUM",
    desc: "Sečti příjmy za všechny kvartály (B2:B5). Výsledek do B6.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Období", "Příjmy (tis.)"],
        ["2", "Q1", "1250"],
        ["3", "Q2", "1480"],
        ["4", "Q3", "1620"],
        ["5", "Q4", "1890"],
        ["6", "ROČNÍ", "❓"],
      ],
    },
    answerCell: "B6",
    hint: "=SUM(B2:B5)",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B5)",
    correctFormula: "=SUM(B2:B5)",
    expectedResult: "6 240 tis.",
  },
  {
    funcId: "SUM",
    desc: "Spočítej celkovou váhu zásilky (jednotlivé balíky v B2:B7). Výsledek do B8.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Balík", "Váha (kg)"],
        ["2", "Balík 1", "12"],
        ["3", "Balík 2", "8.5"],
        ["4", "Balík 3", "15"],
        ["5", "Balík 4", "5.5"],
        ["6", "Balík 5", "10"],
        ["7", "Balík 6", "7"],
        ["8", "CELKEM", "❓"],
      ],
    },
    answerCell: "B8",
    hint: "=SUM(B2:B7)",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B7)",
    correctFormula: "=SUM(B2:B7)",
    expectedResult: "58 kg",
  },
  {
    funcId: "SUM",
    desc: "Spočítej celkový počet bodů týmu (B2:B6). Výsledek do B7.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Hráč", "Body"],
        ["2", "Adam", "15"],
        ["3", "Bára", "22"],
        ["4", "Cyril", "18"],
        ["5", "Dana", "12"],
        ["6", "Erik", "25"],
        ["7", "CELKEM", "❓"],
      ],
    },
    answerCell: "B7",
    hint: "=SUM(B2:B6)",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B6)",
    correctFormula: "=SUM(B2:B6)",
    expectedResult: "92",
  },
  {
    funcId: "SUM",
    desc: "Sečti hodnotu skladových zásob (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Položka", "Hodnota (Kč)"],
        ["2", "Trička", "45000"],
        ["3", "Kalhoty", "72000"],
        ["4", "Mikiny", "38000"],
        ["5", "Boty", "89000"],
        ["6", "Čepice", "12000"],
        ["7", "Šály", "18000"],
        ["8", "Ponožky", "9000"],
        ["9", "ZÁSOBY", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=SUM(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B8)",
    correctFormula: "=SUM(B2:B8)",
    expectedResult: "283 000 Kč",
  },
  {
    funcId: "SUM",
    desc: "Spočítej celkový počet ujetých kilometrů (B2:B7). Výsledek do B8.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Den", "Km"],
        ["2", "Pondělí", "120"],
        ["3", "Úterý", "85"],
        ["4", "Středa", "150"],
        ["5", "Čtvrtek", "95"],
        ["6", "Pátek", "210"],
        ["7", "Sobota", "45"],
        ["8", "CELKEM", "❓"],
      ],
    },
    answerCell: "B8",
    hint: "=SUM(B2:B7)",
    checkFn: (f) => normalizeFormula(f) === "SUM(B2:B7)",
    correctFormula: "=SUM(B2:B7)",
    expectedResult: "705 km",
  },

  // --- AVERAGE ---
  {
    funcId: "AVERAGE",
    desc: "Vypočítej průměrnou teplotu za týden. Vlož vzorec do buňky B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Den", "Teplota (°C)"],
        ["2", "Po", "18"],
        ["3", "Út", "21"],
        ["4", "St", "19"],
        ["5", "Čt", "23"],
        ["6", "Pá", "22"],
        ["7", "So", "25"],
        ["8", "Ne", "20"],
        ["9", "Průměr", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "Průměr: =AVERAGE(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B8)",
    correctFormula: "=AVERAGE(B2:B8)",
    expectedResult: "21,14 °C",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrnou známku studenta ze všech předmětů (D2:D6). Výsledek do D7.",
    table: {
      headers: ["", "C", "D"],
      rows: [
        ["1", "Předmět", "Známka"],
        ["2", "Matematika", "2"],
        ["3", "Čeština", "1"],
        ["4", "Angličtina", "3"],
        ["5", "Dějepis", "2"],
        ["6", "Fyzika", "4"],
        ["7", "Průměr", "❓"],
      ],
    },
    answerCell: "D7",
    hint: "=AVERAGE(D2:D6) – průměruje hodnoty v rozsahu",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(D2:D6)",
    correctFormula: "=AVERAGE(D2:D6)",
    expectedResult: "2,40",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrnou měsíční návštěvnost webu (B2:B7). Výsledek do B8.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Měsíc", "Návštěvnost"],
        ["2", "Leden", "12500"],
        ["3", "Únor", "11300"],
        ["4", "Březen", "14800"],
        ["5", "Duben", "13200"],
        ["6", "Květen", "14100"],
        ["7", "Červen", "12700"],
        ["8", "Průměr", "❓"],
      ],
    },
    answerCell: "B8",
    hint: "=AVERAGE(B2:B7)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B7)",
    correctFormula: "=AVERAGE(B2:B7)",
    expectedResult: "13 100",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrnou cenu produktů (C2:C6). Výsledek do C7.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Produkt", "Kategorie", "Cena (Kč)"],
        ["2", "Tričko", "Oblečení", "299"],
        ["3", "Kalhoty", "Oblečení", "899"],
        ["4", "Bunda", "Oblečení", "1490"],
        ["5", "Čepice", "Doplňky", "149"],
        ["6", "Šála", "Doplňky", "249"],
        ["7", "Průměr", "", "❓"],
      ],
    },
    answerCell: "C7",
    hint: "=AVERAGE(C2:C6)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(C2:C6)",
    correctFormula: "=AVERAGE(C2:C6)",
    expectedResult: "617,20 Kč",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrnou útratu zákazníka (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Zákazník", "Útrata (Kč)"],
        ["2", "Novák", "2500"],
        ["3", "Beneš", "1800"],
        ["4", "Černá", "3200"],
        ["5", "Dvořák", "1500"],
        ["6", "Polák", "2900"],
        ["7", "Svoboda", "2100"],
        ["8", "Kovář", "2600"],
        ["9", "Průměr", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=AVERAGE(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B8)",
    correctFormula: "=AVERAGE(B2:B8)",
    expectedResult: "2 371 Kč",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrnou dobu zpracování objednávky (B2:B9). Výsledek do B10.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Objednávka", "Doba (h)"],
        ["2", "OBJ-001", "24"],
        ["3", "OBJ-002", "18"],
        ["4", "OBJ-003", "36"],
        ["5", "OBJ-004", "12"],
        ["6", "OBJ-005", "48"],
        ["7", "OBJ-006", "20"],
        ["8", "OBJ-007", "16"],
        ["9", "OBJ-008", "30"],
        ["10", "Průměr", "❓"],
      ],
    },
    answerCell: "B10",
    hint: "=AVERAGE(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B9)",
    correctFormula: "=AVERAGE(B2:B9)",
    expectedResult: "25,5 h",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrné roční srážky (B2:B7). Výsledek do B8.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Rok", "Srážky (mm)"],
        ["2", "2019", "620"],
        ["3", "2020", "580"],
        ["4", "2021", "710"],
        ["5", "2022", "540"],
        ["6", "2023", "680"],
        ["7", "2024", "600"],
        ["8", "Průměr", "❓"],
      ],
    },
    answerCell: "B8",
    hint: "=AVERAGE(B2:B7)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B7)",
    correctFormula: "=AVERAGE(B2:B7)",
    expectedResult: "621,67 mm",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrnou známku z pěti předmětů (B2:B6). Výsledek do B7.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Předmět", "Známka"],
        ["2", "Matematika", "1"],
        ["3", "Čeština", "2"],
        ["4", "Angličtina", "3"],
        ["5", "Dějepis", "1"],
        ["6", "Fyzika", "4"],
        ["7", "Průměr", "❓"],
      ],
    },
    answerCell: "B7",
    hint: "=AVERAGE(B2:B6)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B6)",
    correctFormula: "=AVERAGE(B2:B6)",
    expectedResult: "2,20",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrné stáří zaměstnanců (B2:B9). Výsledek do B10.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Jméno", "Věk"],
        ["2", "Jan Novák", "32"],
        ["3", "Eva Benešová", "28"],
        ["4", "Petr Černý", "45"],
        ["5", "Klára Dvořáková", "37"],
        ["6", "Tomáš Polák", "24"],
        ["7", "Lucie Kovářová", "41"],
        ["8", "Martin Svoboda", "33"],
        ["9", "Olga Procházková", "29"],
        ["10", "Průměr", "❓"],
      ],
    },
    answerCell: "B10",
    hint: "=AVERAGE(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B9)",
    correctFormula: "=AVERAGE(B2:B9)",
    expectedResult: "33,63 let",
  },
  {
    funcId: "AVERAGE",
    desc: "Spočítej průměrnou délku trvání hovoru (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Hovor", "Délka (min)"],
        ["2", "Hovor 1", "5"],
        ["3", "Hovor 2", "12"],
        ["4", "Hovor 3", "3"],
        ["5", "Hovor 4", "8"],
        ["6", "Hovor 5", "15"],
        ["7", "Hovor 6", "6"],
        ["8", "Hovor 7", "10"],
        ["9", "Průměr", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=AVERAGE(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "AVERAGE(B2:B8)",
    correctFormula: "=AVERAGE(B2:B8)",
    expectedResult: "8,43 min",
  },

  // --- MIN ---
  {
    funcId: "MIN",
    desc: "Najdi nejnižší cenu produktu ze sloupce B. Výsledek vlož do B7.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Produkt", "Cena (Kč)"],
        ["2", "Tričko", "299"],
        ["3", "Kalhoty", "899"],
        ["4", "Boty", "1490"],
        ["5", "Čepice", "149"],
        ["6", "Ponožky", "89"],
        ["7", "Minimum", "❓"],
      ],
    },
    answerCell: "B7",
    hint: "=MIN(B2:B6) najde nejmenší hodnotu",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B6)",
    correctFormula: "=MIN(B2:B6)",
    expectedResult: "89 Kč",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší naměřenou teplotu za týden (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Den", "Teplota °C"],
        ["2", "Po", "18"],
        ["3", "Út", "15"],
        ["4", "St", "21"],
        ["5", "Čt", "12"],
        ["6", "Pá", "16"],
        ["7", "So", "14"],
        ["8", "Ne", "19"],
        ["9", "Minimum", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=MIN(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B8)",
    correctFormula: "=MIN(B2:B8)",
    expectedResult: "12 °C",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší váhu zásilky (C2:C7). Výsledek do C8.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Zásilka", "Obsah", "Váha (kg)"],
        ["2", "ZAS-001", "Knihy", "5.2"],
        ["3", "ZAS-002", "Oblečení", "2.8"],
        ["4", "ZAS-003", "Elektro", "8.5"],
        ["5", "ZAS-004", "Dokumenty", "1.5"],
        ["6", "ZAS-005", "Nábytek", "45"],
        ["7", "ZAS-006", "Hračky", "3.2"],
        ["8", "Nejlehčí", "", "❓"],
      ],
    },
    answerCell: "C8",
    hint: "=MIN(C2:C7)",
    checkFn: (f) => normalizeFormula(f) === "MIN(C2:C7)",
    correctFormula: "=MIN(C2:C7)",
    expectedResult: "1,5 kg",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší skóre v testu (C2:C8). Výsledek do C9.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Student", "Třída", "Skóre"],
        ["2", "Adam", "3.A", "78"],
        ["3", "Bára", "3.A", "45"],
        ["4", "Cyril", "3.A", "92"],
        ["5", "Dana", "3.A", "61"],
        ["6", "Erik", "3.A", "88"],
        ["7", "Filip", "3.A", "53"],
        ["8", "Gábina", "3.A", "74"],
        ["9", "Minimum", "", "❓"],
      ],
    },
    answerCell: "C9",
    hint: "=MIN(C2:C8)",
    checkFn: (f) => normalizeFormula(f) === "MIN(C2:C8)",
    correctFormula: "=MIN(C2:C8)",
    expectedResult: "45",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší cenu nájmu v databázi (B2:B7). Výsledek do B8.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Město", "Nájem (Kč/měsíc)"],
        ["2", "Praha", "15000"],
        ["3", "Brno", "11000"],
        ["4", "Ostrava", "8500"],
        ["5", "Plzeň", "9500"],
        ["6", "Liberec", "7800"],
        ["7", "Olomouc", "8200"],
        ["8", "Minimum", "❓"],
      ],
    },
    answerCell: "B8",
    hint: "=MIN(B2:B7)",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B7)",
    correctFormula: "=MIN(B2:B7)",
    expectedResult: "7 800 Kč",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší dobu dodání (B2:B9). Výsledek do B10.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Dodavatel", "Doba (dny)"],
        ["2", "Dodavatel A", "3"],
        ["3", "Dodavatel B", "5"],
        ["4", "Dodavatel C", "2"],
        ["5", "Dodavatel D", "7"],
        ["6", "Dodavatel E", "4"],
        ["7", "Dodavatel F", "1"],
        ["8", "Dodavatel G", "6"],
        ["9", "Dodavatel H", "3"],
        ["10", "Minimum", "❓"],
      ],
    },
    answerCell: "B10",
    hint: "=MIN(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B9)",
    correctFormula: "=MIN(B2:B9)",
    expectedResult: "1 den",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší známku studenta (B2:B10). Výsledek do B11.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Předmět", "Známka"],
        ["2", "Matematika", "2"],
        ["3", "Čeština", "1"],
        ["4", "Angličtina", "3"],
        ["5", "Fyzika", "4"],
        ["6", "Chemie", "2"],
        ["7", "Dějepis", "1"],
        ["8", "Biologie", "3"],
        ["9", "Zeměpis", "2"],
        ["10", "Informatika", "1"],
        ["11", "Nejlepší", "❓"],
      ],
    },
    answerCell: "B11",
    hint: "=MIN(B2:B10) – nejnižší číslo = nejlepší známka",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B10)",
    correctFormula: "=MIN(B2:B10)",
    expectedResult: "1",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší spotřebu paliva (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Vozidlo", "Spotřeba (l/100km)"],
        ["2", "Škoda Fabia", "5.2"],
        ["3", "Toyota Yaris", "4.8"],
        ["4", "VW Golf", "6.1"],
        ["5", "Fiat 500", "4.5"],
        ["6", "Ford Fiesta", "5.5"],
        ["7", "Mini Cooper", "6.3"],
        ["8", "Suzuki Swift", "5.0"],
        ["9", "Minimum", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=MIN(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B8)",
    correctFormula: "=MIN(B2:B8)",
    expectedResult: "4,5 l/100km",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší prodejní cenu (B2:B9). Výsledek do B10.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Produkt", "Cena (Kč)"],
        ["2", "Tričko", "299"],
        ["3", "Kalhoty", "899"],
        ["4", "Bunda", "1490"],
        ["5", "Čepice", "149"],
        ["6", "Ponožky", "89"],
        ["7", "Mikina", "1190"],
        ["8", "Šála", "249"],
        ["9", "Rukavice", "199"],
        ["10", "Nejnižší", "❓"],
      ],
    },
    answerCell: "B10",
    hint: "=MIN(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B9)",
    correctFormula: "=MIN(B2:B9)",
    expectedResult: "89 Kč",
  },
  {
    funcId: "MIN",
    desc: "Najdi nejnižší věk účastníka (B2:B9). Výsledek do B10.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Účastník", "Věk"],
        ["2", "Jan", "25"],
        ["3", "Eva", "32"],
        ["4", "Petr", "18"],
        ["5", "Klára", "28"],
        ["6", "Tomáš", "41"],
        ["7", "Lucie", "22"],
        ["8", "Martin", "35"],
        ["9", "Olga", "19"],
        ["10", "Nejmladší", "❓"],
      ],
    },
    answerCell: "B10",
    hint: "=MIN(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "MIN(B2:B9)",
    correctFormula: "=MIN(B2:B9)",
    expectedResult: "18",
  },

  // --- MAX ---
  {
    funcId: "MAX",
    desc: "Zjisti maximální skóre v turnaji ze sloupce C. Výsledek vlož do C8.",
    table: {
      headers: ["", "B", "C"],
      rows: [
        ["1", "Hráč", "Skóre"],
        ["2", "Tomáš", "4200"],
        ["3", "Petra", "5800"],
        ["4", "Ondřej", "3900"],
        ["5", "Lucie", "6100"],
        ["6", "Martin", "5500"],
        ["7", "Eva", "4750"],
        ["8", "Maximum", "❓"],
      ],
    },
    answerCell: "C8",
    hint: "=MAX(C2:C7) vrátí největší hodnotu",
    checkFn: (f) => normalizeFormula(f) === "MAX(C2:C7)",
    correctFormula: "=MAX(C2:C7)",
    expectedResult: "6 100",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší denní teplotu ve sloupci B (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Den", "Teplota °C"],
        ["2", "Pondělí", "22"],
        ["3", "Úterý", "25"],
        ["4", "Středa", "19"],
        ["5", "Čtvrtek", "27"],
        ["6", "Pátek", "24"],
        ["7", "Sobota", "21"],
        ["8", "Neděle", "26"],
        ["9", "Maximum", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=MAX(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "MAX(B2:B8)",
    correctFormula: "=MAX(B2:B8)",
    expectedResult: "27 °C",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší prodej v kvartálu (C2:C5). Výsledek do C6.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Kvartál", "Produkt", "Prodej (tis.)"],
        ["2", "Q1", "Trička", "320"],
        ["3", "Q2", "Trička", "450"],
        ["4", "Q3", "Trička", "380"],
        ["5", "Q4", "Trička", "510"],
        ["6", "Nejvyšší prodej", "", "❓"],
      ],
    },
    answerCell: "C6",
    hint: "=MAX(C2:C5)",
    checkFn: (f) => normalizeFormula(f) === "MAX(C2:C5)",
    correctFormula: "=MAX(C2:C5)",
    expectedResult: "510 tis.",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší plánovaný rozpočet (B2:B6). Výsledek do B7.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Projekt", "Rozpočet (Kč)"],
        ["2", "Alpha", "500000"],
        ["3", "Beta", "750000"],
        ["4", "Gamma", "620000"],
        ["5", "Delta", "890000"],
        ["6", "Epsilon", "450000"],
        ["7", "Nejvyšší", "❓"],
      ],
    },
    answerCell: "B7",
    hint: "=MAX(B2:B6)",
    checkFn: (f) => normalizeFormula(f) === "MAX(B2:B6)",
    correctFormula: "=MAX(B2:B6)",
    expectedResult: "890 000 Kč",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší skóre v testu ze všech studentů (C2:C8). Výsledek do C9.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Student", "Třída", "Skóre"],
        ["2", "Novák", "3.A", "78"],
        ["3", "Benešová", "3.A", "92"],
        ["4", "Černý", "3.A", "85"],
        ["5", "Dvořáková", "3.A", "67"],
        ["6", "Polák", "3.A", "95"],
        ["7", "Svobodová", "3.A", "88"],
        ["8", "Kovář", "3.A", "73"],
        ["9", "Nejvyšší", "", "❓"],
      ],
    },
    answerCell: "C9",
    hint: "=MAX(C2:C8)",
    checkFn: (f) => normalizeFormula(f) === "MAX(C2:C8)",
    correctFormula: "=MAX(C2:C8)",
    expectedResult: "95",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší měsíční tržbu v roce (B2:B13). Výsledek do B14.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Měsíc", "Tržba (Kč)"],
        ["2", "Leden", "125000"],
        ["3", "Únor", "98000"],
        ["4", "Březen", "152000"],
        ["5", "Duben", "114000"],
        ["6", "Květen", "138000"],
        ["7", "Červen", "161000"],
        ["8", "Červenec", "175000"],
        ["9", "Srpen", "143000"],
        ["10", "Září", "126000"],
        ["11", "Říjen", "119000"],
        ["12", "Listopad", "135000"],
        ["13", "Prosinec", "189000"],
        ["14", "Nejvyšší", "❓"],
      ],
    },
    answerCell: "B14",
    hint: "=MAX(B2:B13)",
    checkFn: (f) => normalizeFormula(f) === "MAX(B2:B13)",
    correctFormula: "=MAX(B2:B13)",
    expectedResult: "189 000 Kč",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší cenu nemovitosti (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Lokalita", "Cena (Kč)"],
        ["2", "Praha", "8500000"],
        ["3", "Brno", "5200000"],
        ["4", "Ostrava", "3800000"],
        ["5", "Plzeň", "4200000"],
        ["6", "Liberec", "3500000"],
        ["7", "Hradec", "2900000"],
        ["8", "Olomouc", "3100000"],
        ["9", "Maximum", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=MAX(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "MAX(B2:B8)",
    correctFormula: "=MAX(B2:B8)",
    expectedResult: "8 500 000 Kč",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší počet návštěvníků za den (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Den", "Návštěvníci"],
        ["2", "Pondělí", "120"],
        ["3", "Úterý", "95"],
        ["4", "Středa", "150"],
        ["5", "Čtvrtek", "180"],
        ["6", "Pátek", "220"],
        ["7", "Sobota", "310"],
        ["8", "Neděle", "200"],
        ["9", "Nejvíce", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=MAX(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "MAX(B2:B8)",
    correctFormula: "=MAX(B2:B8)",
    expectedResult: "310",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší nadmořskou výšku hor (B2:B7). Výsledek do B8.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Hora", "Výška (m n.m.)"],
        ["2", "Sněžka", "1603"],
        ["3", "Klínovec", "1244"],
        ["4", "Radhošť", "1129"],
        ["5", "Praděd", "1491"],
        ["6", "Lysá hora", "1323"],
        ["7", "Javořice", "837"],
        ["8", "Maximum", "❓"],
      ],
    },
    answerCell: "B8",
    hint: "=MAX(B2:B7)",
    checkFn: (f) => normalizeFormula(f) === "MAX(B2:B7)",
    correctFormula: "=MAX(B2:B7)",
    expectedResult: "1 603 m",
  },
  {
    funcId: "MAX",
    desc: "Najdi nejvyšší rychlost vozidel (B2:B9). Výsledek do B10.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Vozidlo", "Rychlost (km/h)"],
        ["2", "Škoda Octavia", "185"],
        ["3", "VW Passat", "210"],
        ["4", "BMW X5", "230"],
        ["5", "Audi A4", "220"],
        ["6", "Ford Mondeo", "195"],
        ["7", "Mercedes C", "225"],
        ["8", "Toyota Avensis", "190"],
        ["9", "Mazda 6", "205"],
        ["10", "Nejvyšší", "❓"],
      ],
    },
    answerCell: "B10",
    hint: "=MAX(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "MAX(B2:B9)",
    correctFormula: "=MAX(B2:B9)",
    expectedResult: "230 km/h",
  },

  // --- COUNT ---
  {
    funcId: "COUNT",
    desc: "Spočítej kolik měsíců má zapsané tržby (číselné hodnoty) ve sloupci B. Výsledek do B8.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Měsíc", "Tržby (Kč)"],
        ["2", "Leden", "52000"],
        ["3", "Únor", "–"],
        ["4", "Březen", "61000"],
        ["5", "Duben", "48000"],
        ["6", "Květen", "–"],
        ["7", "Červen", "55000"],
        ["8", "Počet", "❓"],
      ],
    },
    answerCell: "B8",
    hint: "=COUNT(B2:B7) počítá pouze čísla (prázdné a text přeskočí)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(B2:B7)",
    correctFormula: "=COUNT(B2:B7)",
    expectedResult: "4",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik závodníků má zapsaný čas (číselný) ve sloupci C. Výsledek do C9.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Závodník", "Město", "Čas (min)"],
        ["2", "Adam", "Praha", "32"],
        ["3", "Bára", "Brno", "28"],
        ["4", "Cyril", "Ostrava", "–"],
        ["5", "David", "Plzeň", "31"],
        ["6", "Eva", "Liberec", ""],
        ["7", "Filip", "Hradec", "27"],
        ["8", "Gábina", "Jihlava", "–"],
        ["9", "Počet časů", "", "❓"],
      ],
    },
    answerCell: "C9",
    hint: "=COUNT(C2:C8) počítá jen čísla",
    checkFn: (f) => normalizeFormula(f) === "COUNT(C2:C8)",
    correctFormula: "=COUNT(C2:C8)",
    expectedResult: "4",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik prodejů má zapsanou částku ve sloupci D. Výsledek do D8.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Prodejce", "Den", "Zboží", "Částka"],
        ["2", "Novák", "Po", "Trička", "5000"],
        ["3", "Beneš", "Út", "Kalhoty", "–"],
        ["4", "Černá", "St", "Boty", "8200"],
        ["5", "Dvořák", "Čt", "Čepice", ""],
        ["6", "Polák", "Pá", "Mikiny", "3200"],
        ["7", "Kovář", "So", "Šály", "–"],
        ["8", "Počet prodejů", "", "", "❓"],
      ],
    },
    answerCell: "D8",
    hint: "=COUNT(D2:D7)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(D2:D7)",
    correctFormula: "=COUNT(D2:D7)",
    expectedResult: "3",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik studentů odevzdalo projekt (mají číselnou známku v C2:C10). Výsledek do C11.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Student", "Projekt", "Známka"],
        ["2", "Jan", "Web", "85"],
        ["3", "Eva", "SQL", ""],
        ["4", "Petr", "Python", "92"],
        ["5", "Klára", "", ""],
        ["6", "Tomáš", "Java", "78"],
        ["7", "Lucie", "UX", ""],
        ["8", "Martin", "C#", "88"],
        ["9", "Olga", "", ""],
        ["10", "Radek", "PHP", "75"],
        ["11", "Počet odevzdaných", "", "❓"],
      ],
    },
    answerCell: "C11",
    hint: "=COUNT(C2:C10)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(C2:C10)",
    correctFormula: "=COUNT(C2:C10)",
    expectedResult: "5",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik dní v měsíci mělo naměřenou teplotu (B2:B31). Výsledek do B32.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Den", "Teplota °C"],
        ["2", "1.", "25"],
        ["3", "2.", ""],
        ["4", "3.", "28"],
        ["5", "4.", "–"],
        ["6", "5.", "22"],
        ["7", "6.", ""],
        ["8", "7.", "30"],
        ["9", "8.", "27"],
        ["10", "9.", ""],
        ["11", "10.", "24"],
        ["12", "11.", "–"],
        ["13", "12.", "26"],
        ["14", "13.", ""],
        ["15", "14.", "29"],
        ["16", "15.", "23"],
        ["17", "16.", ""],
        ["18", "17.", "31"],
        ["19", "18.", ""],
        ["20", "19.", "28"],
        ["21", "20.", "24"],
        ["22", "21.", ""],
        ["23", "22.", ""],
        ["24", "23.", "27"],
        ["25", "24.", "–"],
        ["26", "25.", "25"],
        ["27", "26.", ""],
        ["28", "27.", "22"],
        ["29", "28.", "–"],
        ["30", "29.", "26"],
        ["31", "30.", "30"],
        ["32", "Počet měření", "❓"],
      ],
    },
    answerCell: "B32",
    hint: "=COUNT(B2:B31)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(B2:B31)",
    correctFormula: "=COUNT(B2:B31)",
    expectedResult: "15",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik faktur má vyplněnou částku (B2:B8). Výsledek do B9.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Faktura", "Částka (Kč)"],
        ["2", "FAKT-001", "15000"],
        ["3", "FAKT-002", ""],
        ["4", "FAKT-003", "22000"],
        ["5", "FAKT-004", ""],
        ["6", "FAKT-005", "5000"],
        ["7", "FAKT-006", "12000"],
        ["8", "FAKT-007", ""],
        ["9", "Počet faktur", "❓"],
      ],
    },
    answerCell: "B9",
    hint: "=COUNT(B2:B8)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(B2:B8)",
    correctFormula: "=COUNT(B2:B8)",
    expectedResult: "4",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik vozidel projelo mýtnou branou (mají číselnou hodnotu v C2:C10). Do C11.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Čas", "SPZ", "Mýtné (Kč)"],
        ["2", "8:05", "1AB 1234", "150"],
        ["3", "8:12", "2CD 5678", "–"],
        ["4", "8:20", "", ""],
        ["5", "8:31", "3EF 9012", "150"],
        ["6", "8:45", "4GH 3456", "230"],
        ["7", "9:02", "", ""],
        ["8", "9:15", "5IJ 7890", "150"],
        ["9", "9:22", "6KL 0123", ""],
        ["10", "9:40", "7MN 3456", "230"],
        ["11", "Počet vozidel", "", "❓"],
      ],
    },
    answerCell: "C11",
    hint: "=COUNT(C2:C10)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(C2:C10)",
    correctFormula: "=COUNT(C2:C10)",
    expectedResult: "5",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik účastníků kurzu má vyplněný věk (B2:B10). Výsledek do B11.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Účastník", "Věk"],
        ["2", "Jan Novák", "25"],
        ["3", "Eva Benešová", ""],
        ["4", "Petr Černý", "32"],
        ["5", "Klára Dvořáková", "28"],
        ["6", "Tomáš Polák", ""],
        ["7", "Lucie Kovářová", "41"],
        ["8", "Martin Svoboda", ""],
        ["9", "Olga Procházková", "35"],
        ["10", "Radek Veselý", ""],
        ["11", "Počet vyplněných", "❓"],
      ],
    },
    answerCell: "B11",
    hint: "=COUNT(B2:B10)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(B2:B10)",
    correctFormula: "=COUNT(B2:B10)",
    expectedResult: "5",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik objednávek má číselné množství (C2:C8). Výsledek do C9.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Objednávka", "Položka", "Množství"],
        ["2", "OBJ-001", "Trička", "50"],
        ["3", "OBJ-002", "Kalhoty", "–"],
        ["4", "OBJ-003", "Mikiny", "25"],
        ["5", "OBJ-004", "Boty", ""],
        ["6", "OBJ-005", "Čepice", "12"],
        ["7", "OBJ-006", "Šály", "30"],
        ["8", "OBJ-007", "Ponožky", ""],
        ["9", "Počet objednávek", "", "❓"],
      ],
    },
    answerCell: "C9",
    hint: "=COUNT(C2:C8)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(C2:C8)",
    correctFormula: "=COUNT(C2:C8)",
    expectedResult: "4",
  },
  {
    funcId: "COUNT",
    desc: "Spočítej kolik skladem položek má číselnou cenu (D2:D8). Výsledek do D9.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "ID", "Produkt", "Kategorie", "Cena"],
        ["2", "P001", "Tričko", "Oblečení", "299"],
        ["3", "P002", "Kalhoty", "Oblečení", "899"],
        ["4", "P003", "Bunda", "Oblečení", "1490"],
        ["5", "P004", "Mikina", "Oblečení", ""],
        ["6", "P005", "Čepice", "Doplňky", "149"],
        ["7", "P006", "Šála", "Doplňky", "249"],
        ["8", "P007", "Rukavice", "Doplňky", ""],
        ["9", "Počet cen", "", "", "❓"],
      ],
    },
    answerCell: "D9",
    hint: "=COUNT(D2:D8)",
    checkFn: (f) => normalizeFormula(f) === "COUNT(D2:D8)",
    correctFormula: "=COUNT(D2:D8)",
    expectedResult: "5",
  },

  // --- IF ---
  {
    funcId: "IF",
    desc: 'V buňce C2 napiš vzorec: Pokud je skóre v B2 větší nebo rovno 50, napiš "Splnil", jinak "Nesplnil".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Jméno", "Skóre", "Výsledek"],
        ["2", "Adam", "73", "❓"],
        ["3", "Bára", "44", ""],
        ["4", "Čestmír", "51", ""],
        ["5", "Dana", "38", ""],
      ],
    },
    answerCell: "C2",
    hint: '=IF(podmínka, "hodnota_ano", "hodnota_ne")  →  =IF(B2>=50,"Splnil","Nesplnil")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(B2>=50,"SPLNIL","NESPLNIL")' ||
      normalizeFormula(f) === 'IF(B2>=50,"Splnil","Nesplnil")'.toUpperCase(),
    correctFormula: '=IF(B2>=50,"Splnil","Nesplnil")',
    expectedResult: '"Splnil"',
  },
  {
    funcId: "IF",
    desc: 'V buňce D2 vlož vzorec: Pokud je průměr (C2) větší než 3, zobraz "Opakovat", jinak "Postoupit".',
    table: {
      headers: ["", "B", "C", "D"],
      rows: [
        ["1", "Student", "Průměr", "Status"],
        ["2", "Marek", "3.4", "❓"],
        ["3", "Klára", "1.8", ""],
        ["4", "Radek", "2.9", ""],
      ],
    },
    answerCell: "D2",
    hint: '=IF(C2>3,"Opakovat","Postoupit")',
    checkFn: (f) => normalizeFormula(f) === 'IF(C2>3,"OPAKOVAT","POSTOUPIT")',
    correctFormula: '=IF(C2>3,"Opakovat","Postoupit")',
    expectedResult: '"Opakovat"',
  },
  {
    funcId: "IF",
    desc: 'V buňce D2: Pokud je skóre v C2 >= 60, napiš "Prospěl", jinak "Neprospěl".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Jméno", "Předmět", "Skóre", "Výsledek"],
        ["2", "Klára", "Matematika", "85", "❓"],
        ["3", "Radek", "Matematika", "45", ""],
        ["4", "Lenka", "Matematika", "72", ""],
      ],
    },
    answerCell: "D2",
    hint: '=IF(C2>=60,"Prospěl","Neprospěl")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(C2>=60,"PROSPĚL","NEPROSPĚL")' ||
      normalizeFormula(f) === 'IF(C2>=60,"PROSPEL","NEPROSPEL")',
    correctFormula: '=IF(C2>=60,"Prospěl","Neprospěl")',
    expectedResult: '"Prospěl"',
  },
  {
    funcId: "IF",
    desc: 'V buňce C2: Pokud je hodnota v B2 > 1000, napiš "Drahý", jinak "Levný".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Produkt", "Cena", "Kategorie"],
        ["2", "Notebook", "24990", "❓"],
        ["3", "Myš", "450", ""],
        ["4", "Monitor", "5990", ""],
      ],
    },
    answerCell: "C2",
    hint: '=IF(B2>1000,"Drahý","Levný")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(B2>1000,"DRAHÝ","LEVNÝ")' ||
      normalizeFormula(f) === 'IF(B2>1000,"DRAHY","LEVNY")',
    correctFormula: '=IF(B2>1000,"Drahý","Levný")',
    expectedResult: '"Drahý"',
  },
  {
    funcId: "IF",
    desc: 'V buňce D2: Pokud je docházka (C2) >= 90, napiš "Pochvala", jinak "Napomenutí".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Jméno", "Třída", "Docházka %", "Hodnocení"],
        ["2", "Tomáš", "3.A", "95", "❓"],
        ["3", "Eva", "3.A", "78", ""],
        ["4", "Petr", "3.A", "88", ""],
      ],
    },
    answerCell: "D2",
    hint: '=IF(C2>=90,"Pochvala","Napomenutí")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(C2>=90,"POCHVALA","NAPOMENUTÍ")' ||
      normalizeFormula(f) === 'IF(C2>=90,"POCHVALA","NAPOMENUTI")',
    correctFormula: '=IF(C2>=90,"Pochvala","Napomenutí")',
    expectedResult: '"Pochvala"',
  },
  {
    funcId: "IF",
    desc: 'V buňce C2: Pokud je B2 = "Ano", napiš "Dostupný", jinak "Nedostupný".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Produkt", "Skladem", "Status"],
        ["2", "Tričko", "Ano", "❓"],
        ["3", "Bunda", "Ne", ""],
        ["4", "Čepice", "Ano", ""],
      ],
    },
    answerCell: "C2",
    hint: '=IF(B2="Ano","Dostupný","Nedostupný")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(B2="ANO","DOSTUPNÝ","NEDOSTUPNÝ")' ||
      normalizeFormula(f) === 'IF(B2="ANO","DOSTUPNY","NEDOSTUPNY")',
    correctFormula: '=IF(B2="Ano","Dostupný","Nedostupný")',
    expectedResult: '"Dostupný"',
  },
  {
    funcId: "IF",
    desc: 'V buňce D2: Pokud je váha (C2) > 20, napiš "Nadměrný", jinak "Standard".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Zásilka", "Obsah", "Váha (kg)", "Kategorie"],
        ["2", "ZAS-001", "Knihy", "5", "❓"],
        ["3", "ZAS-002", "Nábytek", "45", ""],
        ["4", "ZAS-003", "Oblečení", "2", ""],
      ],
    },
    answerCell: "D2",
    hint: '=IF(C2>20,"Nadměrný","Standard")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(C2>20,"NADMĚRNÝ","STANDARD")' ||
      normalizeFormula(f) === 'IF(C2>20,"NADMERNY","STANDARD")',
    correctFormula: '=IF(C2>20,"Nadměrný","Standard")',
    expectedResult: '"Standard"',
  },
  {
    funcId: "IF",
    desc: 'V buňce D2: Pokud je průměr (C2) < 2.5, napiš "Výborný", jinak "Dobrý".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Student", "Předmět", "Průměr", "Hodnocení"],
        ["2", "Anna", "Fyzika", "1.5", "❓"],
        ["3", "Pavel", "Fyzika", "3.0", ""],
        ["4", "Lenka", "Fyzika", "1.8", ""],
      ],
    },
    answerCell: "D2",
    hint: '=IF(C2<2.5,"Výborný","Dobrý")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(C2<2.5,"VÝBORNÝ","DOBRÝ")' ||
      normalizeFormula(f) === 'IF(C2<2.5,"VYBORNY","DOBRY")',
    correctFormula: '=IF(C2<2.5,"Výborný","Dobrý")',
    expectedResult: '"Výborný"',
  },
  {
    funcId: "IF",
    desc: 'V buňce C2: Pokud je B2 = "Muž", napiš "Vážený", jinak "Vážená".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Jméno", "Pohlaví", "Oslovení"],
        ["2", "Jan Novák", "Muž", "❓"],
        ["3", "Eva Černá", "Žena", ""],
        ["4", "Pavel Dvořák", "Muž", ""],
      ],
    },
    answerCell: "C2",
    hint: '=IF(B2="Muž","Vážený","Vážená")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(B2="MUŽ","VÁŽENÝ","VÁŽENÁ")' ||
      normalizeFormula(f) === 'IF(B2="MUZ","VAZENY","VAZENA")',
    correctFormula: '=IF(B2="Muž","Vážený","Vážená")',
    expectedResult: '"Vážený"',
  },
  {
    funcId: "IF",
    desc: 'V buňce D2: Pokud je teplota (C2) > 30, napiš "Horko", jinak "Normál".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Město", "Den", "Teplota", "Poznámka"],
        ["2", "Praha", "1.7.", "35", "❓"],
        ["3", "Brno", "1.7.", "28", ""],
        ["4", "Ostrava", "1.7.", "31", ""],
      ],
    },
    answerCell: "D2",
    hint: '=IF(C2>30,"Horko","Normál")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(C2>30,"HORKO","NORMÁL")' ||
      normalizeFormula(f) === 'IF(C2>30,"HORKO","NORMAL")',
    correctFormula: '=IF(C2>30,"Horko","Normál")',
    expectedResult: '"Horko"',
  },
  {
    funcId: "IF",
    desc: 'V buňce D2: Pokud je věk (C2) >= 18, napiš "Zletilý", jinak "Nezletilý".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Jméno", "Město", "Věk", "Status"],
        ["2", "Adam", "Praha", "22", "❓"],
        ["3", "Lucie", "Brno", "16", ""],
        ["4", "David", "Ostrava", "18", ""],
      ],
    },
    answerCell: "D2",
    hint: '=IF(C2>=18,"Zletilý","Nezletilý")',
    checkFn: (f) =>
      normalizeFormula(f) === 'IF(C2>=18,"ZLETILÝ","NEZLETILÝ")' ||
      normalizeFormula(f) === 'IF(C2>=18,"ZLETILY","NEZLETILY")',
    correctFormula: '=IF(C2>=18,"Zletilý","Nezletilý")',
    expectedResult: '"Zletilý"',
  },

  // --- VLOOKUP ---
  {
    funcId: "VLOOKUP",
    desc: 'V buňce G2 najdi cenu produktu "Klávesnice" (G1) v tabulce A1:B5. Cena je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "F", "G"],
      rows: [
        ["1", "Produkt", "Cena", "", "Hledám:", "Klávesnice"],
        ["2", "Monitor", "5990", "", "Cena:", "❓"],
        ["3", "Klávesnice", "890", "", "", ""],
        ["4", "Myš", "450", "", "", ""],
        ["5", "Headset", "1290", "", "", ""],
      ],
    },
    answerCell: "G2",
    hint: "=VLOOKUP(hledaná_hodnota, tabulka, číslo_sloupce, 0)\n→ =VLOOKUP(G1,A2:B5,2,0)",
    checkFn: (f) =>
      normalizeFormula(f) === "VLOOKUP(G1,A2:B5,2,0)" ||
      normalizeFormula(f) === "VLOOKUP(G1,A1:B5,2,0)",
    correctFormula: "=VLOOKUP(G1,A2:B5,2,0)",
    expectedResult: "890",
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce G2 najdi cenu produktu "Myš" (G1) v tabulce A3:B7. Cena je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "E", "F", "G"],
      rows: [
        ["1", "", "", "", "Hledám:", "Myš", ""],
        ["2", "", "", "", "Cena:", "❓", ""],
        ["3", "Monitor", "5990", "", "", "", ""],
        ["4", "Klávesnice", "890", "", "", "", ""],
        ["5", "Myš", "450", "", "", "", ""],
        ["6", "Headset", "1290", "", "", "", ""],
        ["7", "Webkamera", "890", "", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A3:B7,2,0)",
    checkFn: (f) =>
      normalizeFormula(f) === "VLOOKUP(F1,A3:B7,2,0)" ||
      normalizeFormula(f) === "VLOOKUP(F1,A3:B7,2,0)",
    correctFormula: "=VLOOKUP(F1,A3:B7,2,0)",
    expectedResult: "450",
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce F2 najdi telefonní číslo pro "Jan Novák" (F1) v tabulce A2:B6. Číslo je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "E", "F"],
      rows: [
        ["1", "Jméno", "Telefon", "", "Hledám:", "Jan Novák"],
        ["2", "Jan Novák", "777 123 456", "", "Telefon:", "❓"],
        ["3", "Petr Černý", "777 789 012", "", "", ""],
        ["4", "Eva Benešová", "605 111 222", "", "", ""],
        ["5", "Josef Dvořák", "724 333 444", "", "", ""],
        ["6", "Marie Poláková", "602 555 666", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A2:B6,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(F1,A2:B6,2,0)",
    correctFormula: "=VLOOKUP(F1,A2:B6,2,0)",
    expectedResult: '"777 123 456"',
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce F2 najdi cenu pro "Chléb" (F1) v tabulce A2:B7. Cena je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "E", "F"],
      rows: [
        ["1", "Potravina", "Cena", "", "Hledám:", "Chléb"],
        ["2", "Mléko", "25", "", "Cena:", "❓"],
        ["3", "Chléb", "38", "", "", ""],
        ["4", "Máslo", "45", "", "", ""],
        ["5", "Sýr", "89", "", "", ""],
        ["6", "Šunka", "120", "", "", ""],
        ["7", "Jogurt", "18", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A2:B7,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(F1,A2:B7,2,0)",
    correctFormula: "=VLOOKUP(F1,A2:B7,2,0)",
    expectedResult: "38",
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce F2 najdi skóre pro hráče "Lucie" (F1) v tabulce A2:B6. Skóre je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "E", "F"],
      rows: [
        ["1", "Hráč", "Skóre", "", "Hledám:", "Lucie"],
        ["2", "Tomáš", "4200", "", "Skóre:", "❓"],
        ["3", "Petra", "5800", "", "", ""],
        ["4", "Lucie", "6100", "", "", ""],
        ["5", "Martin", "5500", "", "", ""],
        ["6", "Eva", "4750", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A2:B6,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(F1,A2:B6,2,0)",
    correctFormula: "=VLOOKUP(F1,A2:B6,2,0)",
    expectedResult: "6 100",
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce G2 najdi oddělení pro "Petr Černý" v tabulce A2:C6. Oddělení je ve 3. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "C", "", "F", "G"],
      rows: [
        ["1", "Jméno", "ID", "Oddělení", "", "Hledám:", "Petr Černý"],
        ["2", "Jan Novák", "E001", "IT", "", "Oddělení:", "❓"],
        ["3", "Petr Černý", "E002", "HR", "", "", ""],
        ["4", "Eva Benešová", "E003", "Finance", "", "", ""],
        ["5", "Josef Dvořák", "E004", "IT", "", "", ""],
        ["6", "Marie Poláková", "E005", "Marketing", "", "", ""],
      ],
    },
    answerCell: "G2",
    hint: "=VLOOKUP(G1,A2:C6,3,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(G1,A2:C6,3,0)",
    correctFormula: "=VLOOKUP(G1,A2:C6,3,0)",
    expectedResult: '"HR"',
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce F2 najdi číslo skladu pro "XYZ-2024" (F1) v tabulce A2:B7. Sklad je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "E", "F"],
      rows: [
        ["1", "Produkt", "Sklad", "", "Hledám:", "XYZ-2024"],
        ["2", "ABC-001", "Sklad A", "", "Sklad:", "❓"],
        ["3", "DEF-2024", "Sklad B", "", "", ""],
        ["4", "XYZ-2024", "Sklad C", "", "", ""],
        ["5", "GHI-001", "Sklad A", "", "", ""],
        ["6", "JKL-2024", "Sklad B", "", "", ""],
        ["7", "MNO-001", "Sklad C", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A2:B7,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(F1,A2:B7,2,0)",
    correctFormula: "=VLOOKUP(F1,A2:B7,2,0)",
    expectedResult: '"Sklad C"',
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce G2 najdi cenu pro ID "P003" (G1) v tabulce A2:B6. Cena ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "F", "G"],
      rows: [
        ["1", "ID", "Cena", "", "Hledám:", "P003"],
        ["2", "P001", "299", "", "Cena:", "❓"],
        ["3", "P002", "599", "", "", ""],
        ["4", "P003", "399", "", "", ""],
        ["5", "P004", "899", "", "", ""],
        ["6", "P005", "149", "", "", ""],
      ],
    },
    answerCell: "G2",
    hint: "=VLOOKUP(G1,A2:B6,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(G1,A2:B6,2,0)",
    correctFormula: "=VLOOKUP(G1,A2:B6,2,0)",
    expectedResult: "399",
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce F2 najdi zemi pro kód "CZ" (F1) v tabulce A2:B8. Země je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "E", "F"],
      rows: [
        ["1", "Kód", "Země", "", "Hledám:", "CZ"],
        ["2", "CZ", "Česká republika", "", "Země:", "❓"],
        ["3", "SK", "Slovensko", "", "", ""],
        ["4", "PL", "Polsko", "", "", ""],
        ["5", "DE", "Německo", "", "", ""],
        ["6", "AT", "Rakousko", "", "", ""],
        ["7", "HU", "Maďarsko", "", "", ""],
        ["8", "FR", "Francie", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A2:B8,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(F1,A2:B8,2,0)",
    correctFormula: "=VLOOKUP(F1,A2:B8,2,0)",
    expectedResult: '"Česká republika"',
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce F2 najdi hodnocení pro film "Film D" (F1) v tabulce A2:B6. Hodnocení je ve 2. sloupci.',
    table: {
      headers: ["", "A", "B", "", "E", "F"],
      rows: [
        ["1", "Film", "Hodnocení", "", "Hledám:", "Film D"],
        ["2", "Film A", "8.5", "", "Hodnocení:", "❓"],
        ["3", "Film B", "7.2", "", "", ""],
        ["4", "Film C", "9.1", "", "", ""],
        ["5", "Film D", "6.8", "", "", ""],
        ["6", "Film E", "8.0", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A2:B6,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(F1,A2:B6,2,0)",
    correctFormula: "=VLOOKUP(F1,A2:B6,2,0)",
    expectedResult: "6,8",
  },
  {
    funcId: "VLOOKUP",
    desc: 'V buňce F2 najdi barvu pro "XL" (F1) v tabulce A2:B6. Barva je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ["", "A", "B", "", "E", "F"],
      rows: [
        ["1", "Velikost", "Barva", "", "Hledám:", "XL"],
        ["2", "S", "Bílá", "", "Barva:", "❓"],
        ["3", "M", "Černá", "", "", ""],
        ["4", "L", "Modrá", "", "", ""],
        ["5", "XL", "Červená", "", "", ""],
        ["6", "XXL", "Zelená", "", "", ""],
      ],
    },
    answerCell: "F2",
    hint: "=VLOOKUP(F1,A2:B6,2,0)",
    checkFn: (f) => normalizeFormula(f) === "VLOOKUP(F1,A2:B6,2,0)",
    correctFormula: "=VLOOKUP(F1,A2:B6,2,0)",
    expectedResult: '"Červená"',
  },

  // --- COUNTA ---
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik studentů je zapsáno v seznamu (A2:A8) – i prázdné buňky přeskoč. Výsledek do B1.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Studenti", "❓"],
        ["2", "Novák", ""],
        ["3", "", ""],
        ["4", "Procházka", ""],
        ["5", "Svobodová", ""],
        ["6", "", ""],
        ["7", "Dvořák", ""],
        ["8", "Kratochvíl", ""],
      ],
    },
    answerCell: "B1",
    hint: "=COUNTA(A2:A8) počítá neprázdné buňky (text i čísla)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(A2:A8)",
    correctFormula: "=COUNTA(A2:A8)",
    expectedResult: "5",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik položek je vyplněno v inventárním seznamu (A2:A9). Výsledek do B1.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "Položky", "❓"],
        ["2", "Monitor", ""],
        ["3", "Klávesnice", ""],
        ["4", "Myš", ""],
        ["5", "", ""],
        ["6", "Repro", ""],
        ["7", "", ""],
        ["8", "Kabel HDMI", ""],
        ["9", "Tablet", ""],
      ],
    },
    answerCell: "B1",
    hint: "=COUNTA(A2:A9)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(A2:A9)",
    correctFormula: "=COUNTA(A2:A9)",
    expectedResult: "6",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik zaměstnanců je zapsáno v databázi (B2:B10). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "ID", "Jméno", "Počet zaměstnanců", "❓"],
        ["2", "001", "Novák Jan", "", ""],
        ["3", "002", "", "", ""],
        ["4", "003", "Benešová Eva", "", ""],
        ["5", "004", "Černý Petr", "", ""],
        ["6", "005", "", "", ""],
        ["7", "006", "Dvořák Josef", "", ""],
        ["8", "007", "Poláková Jana", "", ""],
        ["9", "008", "", "", ""],
        ["10", "009", "Kovář Tomáš", "", ""],
      ],
    },
    answerCell: "D1",
    hint: "=COUNTA(B2:B10)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(B2:B10)",
    correctFormula: "=COUNTA(B2:B10)",
    expectedResult: "6",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik účastníků se zapsalo na kurz (E2:E10). Výsledek do G1.",
    table: {
      headers: ["", "D", "E", "F", "G"],
      rows: [
        ["1", "Kurz", "Účastník", "Zapsáno", "❓"],
        ["2", "K001", "Jan Novák", "", ""],
        ["3", "K001", "", "", ""],
        ["4", "K001", "Petr Černý", "", ""],
        ["5", "K002", "Eva Benešová", "", ""],
        ["6", "K002", "Josef Dvořák", "", ""],
        ["7", "K002", "", "", ""],
        ["8", "K003", "", "", ""],
        ["9", "K003", "Marie Poláková", "", ""],
        ["10", "K003", "Tomáš Kovář", "", ""],
      ],
    },
    answerCell: "G1",
    hint: "=COUNTA(E2:E10)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(E2:E10)",
    correctFormula: "=COUNTA(E2:E10)",
    expectedResult: "6",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik produktů má vyplněný popis (B2:B10). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Produkt", "Popis", "Počet popisů", "❓"],
        ["2", "Tričko", "Bavlněné tričko", "", ""],
        ["3", "Kalhoty", "Džíny", "", ""],
        ["4", "Bunda", "", "", ""],
        ["5", "Čepice", "Kšiltovka", "", ""],
        ["6", "Ponožky", "", "", ""],
        ["7", "Mikina", "Bavlněná mikina", "", ""],
        ["8", "Šála", "Krkavice", "", ""],
        ["9", "Rukavice", "", "", ""],
        ["10", "Kabát", "Zimní kabát", "", ""],
      ],
    },
    answerCell: "D1",
    hint: "=COUNTA(B2:B10)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(B2:B10)",
    correctFormula: "=COUNTA(B2:B10)",
    expectedResult: "6",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik e-mailů je v adresáři (A2:A12). Výsledek do B1.",
    table: {
      headers: ["", "A", "B"],
      rows: [
        ["1", "E-maily", "❓"],
        ["2", "jan@email.cz", ""],
        ["3", "petr@seznam.cz", ""],
        ["4", "", ""],
        ["5", "eva@email.cz", ""],
        ["6", "", ""],
        ["7", "", ""],
        ["8", "josef@email.cz", ""],
        ["9", "marie@seznam.cz", ""],
        ["10", "", ""],
        ["11", "tomas@email.cz", ""],
        ["12", "", ""],
      ],
    },
    answerCell: "B1",
    hint: "=COUNTA(A2:A12)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(A2:A12)",
    correctFormula: "=COUNTA(A2:A12)",
    expectedResult: "6",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik vozidel má vyplněnou SPZ (B2:B9). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Vozidlo", "SPZ", "Počet SPZ", "❓"],
        ["2", "Škoda Octavia", "1AB 1234", "", ""],
        ["3", "VW Golf", "", "", ""],
        ["4", "BMW X5", "2CD 5678", "", ""],
        ["5", "Audi A4", "3EF 9012", "", ""],
        ["6", "Ford Focus", "", "", ""],
        ["7", "Škoda Fabia", "4GH 3456", "", ""],
        ["8", "Toyota Corolla", "", "", ""],
        ["9", "Mercedes C", "5IJ 7890", "", ""],
      ],
    },
    answerCell: "D1",
    hint: "=COUNTA(B2:B9)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(B2:B9)",
    correctFormula: "=COUNTA(B2:B9)",
    expectedResult: "5",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik receptů má uvedené ingredience (B2:B10). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Recept", "Ingredience", "Počet", "❓"],
        ["2", "Svíčková", "Maso, smetana, zelenina", "", ""],
        ["3", "Řízek", "Maso, strouhanka, vejce", "", ""],
        ["4", "Guláš", "", "", ""],
        ["5", "Knedlíky", "Mouka, vejce, mléko", "", ""],
        ["6", "Polévka", "Zelenina, vývar", "", ""],
        ["7", "Bramborák", "", "", ""],
        ["8", "Salát", "Zelenina, dresink", "", ""],
        ["9", "Palačinky", "Mouka, mléko, vejce", "", ""],
        ["10", "Zmrzlina", "", "", ""],
      ],
    },
    answerCell: "D1",
    hint: "=COUNTA(B2:B10)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(B2:B10)",
    correctFormula: "=COUNTA(B2:B10)",
    expectedResult: "6",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik knih v seznamu má přiřazeného autora (B2:B12). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Kniha", "Autor", "Počet autorů", "❓"],
        ["2", "Kniha 1", "Autor A", "", ""],
        ["3", "Kniha 2", "", "", ""],
        ["4", "Kniha 3", "Autor B", "", ""],
        ["5", "Kniha 4", "Autor C", "", ""],
        ["6", "Kniha 5", "", "", ""],
        ["7", "Kniha 6", "Autor D", "", ""],
        ["8", "Kniha 7", "Autor B", "", ""],
        ["9", "Kniha 8", "", "", ""],
        ["10", "Kniha 9", "Autor E", "", ""],
        ["11", "Kniha 10", "", "", ""],
        ["12", "Kniha 11", "Autor F", "", ""],
      ],
    },
    answerCell: "D1",
    hint: "=COUNTA(B2:B12)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(B2:B12)",
    correctFormula: "=COUNTA(B2:B12)",
    expectedResult: "7",
  },
  {
    funcId: "COUNTA",
    desc: "Spočítej kolik filmů má v databázi zapsaný žánr (C2:C10). Výsledek do E1.",
    table: {
      headers: ["", "A", "B", "C", "D", "E"],
      rows: [
        ["1", "Název", "Rok", "Žánr", "Počet žánrů", "❓"],
        ["2", "Film 1", "2020", "Komedie", "", ""],
        ["3", "Film 2", "2021", "", "", ""],
        ["4", "Film 3", "2019", "Drama", "", ""],
        ["5", "Film 4", "2022", "", "", ""],
        ["6", "Film 5", "2020", "Akční", "", ""],
        ["7", "Film 6", "2021", "Drama", "", ""],
        ["8", "Film 7", "2022", "", "", ""],
        ["9", "Film 8", "2023", "Komedie", "", ""],
        ["10", "Film 9", "2023", "", "", ""],
      ],
    },
    answerCell: "E1",
    hint: "=COUNTA(C2:C10)",
    checkFn: (f) => normalizeFormula(f) === "COUNTA(C2:C10)",
    correctFormula: "=COUNTA(C2:C10)",
    expectedResult: "5",
  },

  // --- COUNTIF ---
  {
    funcId: "COUNTIF",
    desc: 'V buňce D2 spočítej kolikrát se v B2:B8 vyskytuje hodnocení "Výborný".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Žák", "Hodnocení", "Hledám:", "Výborný"],
        ["2", "A. K.", "Výborný", "Počet:", "❓"],
        ["3", "B. N.", "Dobrý", "", ""],
        ["4", "C. P.", "Výborný", "", ""],
        ["5", "D. S.", "Dostatečný", "", ""],
        ["6", "E. M.", "Výborný", "", ""],
        ["7", "F. H.", "Dobrý", "", ""],
        ["8", "G. V.", "Výborný", "", ""],
      ],
    },
    answerCell: "D2",
    hint: '=COUNTIF(rozsah, kritérium) → =COUNTIF(B2:B8,"Výborný") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) =>
      normalizeFormula(f) === 'COUNTIF(B2:B8,"VÝBORNÝ")' ||
      normalizeFormula(f) === "COUNTIF(B2:B8,D1)",
    correctFormula: '=COUNTIF(B2:B8,"Výborný")',
    expectedResult: "4",
  },
  {
    funcId: "COUNTIF",
    desc: 'Spočítej kolik objednávek je ve stavu "Dokončeno" (B2:B8). Výsledek do D2.',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Objednávka", "Stav", "", "Počet Dokončeno"],
        ["2", "OBJ-001", "Dokončeno", "", "❓"],
        ["3", "OBJ-002", "Zpracovává se", "", ""],
        ["4", "OBJ-003", "Dokončeno", "", ""],
        ["5", "OBJ-004", "Stornováno", "", ""],
        ["6", "OBJ-005", "Dokončeno", "", ""],
        ["7", "OBJ-006", "Dokončeno", "", ""],
        ["8", "OBJ-007", "Zpracovává se", "", ""],
      ],
    },
    answerCell: "D2",
    hint: '=COUNTIF(B2:B8,"Dokončeno")',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"DOKONČENO")',
    correctFormula: '=COUNTIF(B2:B8,"Dokončeno")',
    expectedResult: "4",
  },
  {
    funcId: "COUNTIF",
    desc: 'Spočítej kolik studentů má prospěch "1" (A2:A9). Výsledek do C1.',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Prospěch", "Student", "❓"],
        ["2", "1", "Novák", ""],
        ["3", "2", "Beneš", ""],
        ["4", "1", "Černá", ""],
        ["5", "3", "Dvořák", ""],
        ["6", "1", "Polák", ""],
        ["7", "2", "Svoboda", ""],
        ["8", "1", "Kovář", ""],
        ["9", "4", "Procházka", ""],
      ],
    },
    answerCell: "C1",
    hint: '=COUNTIF(A2:A9,1) nebo =COUNTIF(A2:A9,"1")',
    checkFn: (f) =>
      normalizeFormula(f) === "COUNTIF(A2:A9,1)" ||
      normalizeFormula(f) === 'COUNTIF(A2:A9,"1")',
    correctFormula: "=COUNTIF(A2:A9,1)",
    expectedResult: "4",
  },
  {
    funcId: "COUNTIF",
    desc: "Spočítej kolik zaměstnanců má odpracováno více než 40 hodin (sloupec B). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Zaměstnanec", "Hodiny", "Počet >40", "❓"],
        ["2", "Novák", "42", "", ""],
        ["3", "Beneš", "38", "", ""],
        ["4", "Černá", "45", "", ""],
        ["5", "Dvořák", "40", "", ""],
        ["6", "Polák", "50", "", ""],
        ["7", "Svoboda", "36", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=COUNTIF(B2:B7,">40") počítá hodnoty větší než 40',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B7,">40")',
    correctFormula: '=COUNTIF(B2:B7,">40")',
    expectedResult: "3",
  },
  {
    funcId: "COUNTIF",
    desc: "Spočítej kolik výrobků má cenu nižší než 1000 Kč (B2:B8). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Výrobek", "Cena", "Počet <1000", "❓"],
        ["2", "Tričko", "299", "", ""],
        ["3", "Kalhoty", "899", "", ""],
        ["4", "Bunda", "1490", "", ""],
        ["5", "Ponožky", "89", "", ""],
        ["6", "Čepice", "149", "", ""],
        ["7", "Mikina", "1190", "", ""],
        ["8", "Šála", "249", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=COUNTIF(B2:B8,"<1000")',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"<1000")',
    correctFormula: '=COUNTIF(B2:B8,"<1000")',
    expectedResult: "5",
  },
  {
    funcId: "COUNTIF",
    desc: 'Spočítej kolik skladeb je žánru "Rock" (C2:C9). Výsledek do E1.',
    table: {
      headers: ["", "A", "B", "C", "D", "E"],
      rows: [
        ["1", "Název", "Umělec", "Žánr", "Počet Rock", "❓"],
        ["2", "Song A", "Umělec 1", "Rock", "", ""],
        ["3", "Song B", "Umělec 2", "Pop", "", ""],
        ["4", "Song C", "Umělec 3", "Rock", "", ""],
        ["5", "Song D", "Umělec 1", "Jazz", "", ""],
        ["6", "Song E", "Umělec 4", "Rock", "", ""],
        ["7", "Song F", "Umělec 2", "Pop", "", ""],
        ["8", "Song G", "Umělec 5", "Rock", "", ""],
        ["9", "Song H", "Umělec 3", "Rock", "", ""],
      ],
    },
    answerCell: "E1",
    hint: '=COUNTIF(C2:C9,"Rock")',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(C2:C9,"ROCK")',
    correctFormula: '=COUNTIF(C2:C9,"Rock")',
    expectedResult: "5",
  },
  {
    funcId: "COUNTIF",
    desc: "Spočítej kolik dní byla teplota nad 30 °C (B2:B11). Výsledek do D1.",
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Den", "Teplota", "Počet >30", "❓"],
        ["2", "1.7.", "32", "", ""],
        ["3", "2.7.", "28", "", ""],
        ["4", "3.7.", "35", "", ""],
        ["5", "4.7.", "31", "", ""],
        ["6", "5.7.", "27", "", ""],
        ["7", "6.7.", "33", "", ""],
        ["8", "7.7.", "36", "", ""],
        ["9", "8.7.", "29", "", ""],
        ["10", "9.7.", "34", "", ""],
        ["11", "10.7.", "30", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=COUNTIF(B2:B11,">30")',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B11,">30")',
    correctFormula: '=COUNTIF(B2:B11,">30")',
    expectedResult: "6",
  },
  {
    funcId: "COUNTIF",
    desc: 'Spočítej kolik zákazníků je z města "Praha" (B2:B8). Výsledek do D1.',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Zákazník", "Město", "Počet Praha", "❓"],
        ["2", "Novák", "Praha", "", ""],
        ["3", "Beneš", "Brno", "", ""],
        ["4", "Černá", "Praha", "", ""],
        ["5", "Dvořák", "Ostrava", "", ""],
        ["6", "Polák", "Praha", "", ""],
        ["7", "Svoboda", "Praha", "", ""],
        ["8", "Kovář", "Brno", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=COUNTIF(B2:B8,"Praha")',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"PRAHA")',
    correctFormula: '=COUNTIF(B2:B8,"Praha")',
    expectedResult: "4",
  },
  {
    funcId: "COUNTIF",
    desc: 'Spočítej kolik závodníků dokončilo závod (sloupec B = "Ano"). Výsledek do D1.',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Závodník", "Dokončil", "Počet", "❓"],
        ["2", "Závodník 1", "Ano", "", ""],
        ["3", "Závodník 2", "Ne", "", ""],
        ["4", "Závodník 3", "Ano", "", ""],
        ["5", "Závodník 4", "Ano", "", ""],
        ["6", "Závodník 5", "Ne", "", ""],
        ["7", "Závodník 6", "Ano", "", ""],
        ["8", "Závodník 7", "Ano", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=COUNTIF(B2:B8,"Ano")',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"ANO")',
    correctFormula: '=COUNTIF(B2:B8,"Ano")',
    expectedResult: "5",
  },
  {
    funcId: "COUNTIF",
    desc: 'Spočítej kolik faktur je po splatnosti (sloupec C = "Po splatnosti"). Výsledek do E1.',
    table: {
      headers: ["", "A", "B", "C", "D", "E"],
      rows: [
        ["1", "Faktura", "Částka", "Status", "Počet po splatnosti", "❓"],
        ["2", "FAKT-001", "15000", "Zaplaceno", "", ""],
        ["3", "FAKT-002", "8000", "Po splatnosti", "", ""],
        ["4", "FAKT-003", "22000", "Zaplaceno", "", ""],
        ["5", "FAKT-004", "5000", "Po splatnosti", "", ""],
        ["6", "FAKT-005", "12000", "Po splatnosti", "", ""],
        ["7", "FAKT-006", "30000", "Zaplaceno", "", ""],
        ["8", "FAKT-007", "18000", "Po splatnosti", "", ""],
      ],
    },
    answerCell: "E1",
    hint: '=COUNTIF(C2:C8,"Po splatnosti")',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(C2:C8,"PO SPLATNOSTI")',
    correctFormula: '=COUNTIF(C2:C8,"Po splatnosti")',
    expectedResult: "4",
  },

  // --- SUMIF ---
  {
    funcId: "SUMIF",
    desc: 'V buňce E2 spočítej celkový prodej pouze pro region "Sever" (A2:A7) ze sloupce C2:C7.',
    table: {
      headers: ["", "A", "B", "C", "D", "E"],
      rows: [
        ["1", "Region", "Zástupce", "Prodej", "Hledám:", "Sever"],
        ["2", "Sever", "Kovář", "45000", "Součet:", "❓"],
        ["3", "Jih", "Beneš", "32000", "", ""],
        ["4", "Sever", "Pospíšil", "38000", "", ""],
        ["5", "Západ", "Nová", "27000", "", ""],
        ["6", "Sever", "Kolář", "51000", "", ""],
        ["7", "Jih", "Šimek", "29000", "", ""],
      ],
    },
    answerCell: "E2",
    hint: '=SUMIF(rozsah_kriterií, kriterium, rozsah_součtu)\n→ =SUMIF(A2:A7,"Sever",C2:C7)',
    checkFn: (f) =>
      normalizeFormula(f) === 'SUMIF(A2:A7,"SEVER",C2:C7)' ||
      normalizeFormula(f) === "SUMIF(A2:A7,E1,C2:C7)",
    correctFormula: '=SUMIF(A2:A7,"Sever",C2:C7)',
    expectedResult: "134 000 Kč",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej součet prodejů pro region "Jih" (sloupec A). Rozsah součtu je C2:C7. Výsledek do E3.',
    table: {
      headers: ["", "A", "B", "C", "D", "E"],
      rows: [
        ["1", "Region", "Zástupce", "Prodej", "Hledám:", "Jih"],
        ["2", "Sever", "Kovář", "45000", "Součet:", ""],
        ["3", "Jih", "Beneš", "32000", "", "❓"],
        ["4", "Jih", "Nová", "27000", "", ""],
        ["5", "Západ", "Pospíšil", "38000", "", ""],
        ["6", "Sever", "Kolář", "51000", "", ""],
        ["7", "Jih", "Šimek", "29000", "", ""],
      ],
    },
    answerCell: "E3",
    hint: '=SUMIF(A2:A7,"Jih",C2:C7)',
    checkFn: (f) =>
      normalizeFormula(f) === 'SUMIF(A2:A7,"JIH",C2:C7)' ||
      normalizeFormula(f) === "SUMIF(A2:A7,E2,C2:C7)",
    correctFormula: '=SUMIF(A2:A7,"Jih",C2:C7)',
    expectedResult: "88 000 Kč",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej celkový bonus pro zaměstnance s oddělením "IT" (B2:B9). Bonusy jsou v D2:D9. Výsledek do F1.',
    table: {
      headers: ["", "A", "B", "C", "D", "E", "F"],
      rows: [
        ["1", "Zaměstnanec", "Oddělení", "", "Bonus", "CELKEM IT", "❓"],
        ["2", "Novák", "IT", "", "12000", "", ""],
        ["3", "Benešová", "HR", "", "8000", "", ""],
        ["4", "Svoboda", "IT", "", "15000", "", ""],
        ["5", "Černý", "Finance", "", "10000", "", ""],
        ["6", "Dvořák", "IT", "", "14000", "", ""],
        ["7", "Poláková", "HR", "", "9000", "", ""],
        ["8", "Kovář", "IT", "", "11000", "", ""],
        ["9", "Procházka", "Finance", "", "13000", "", ""],
      ],
    },
    answerCell: "F1",
    hint: '=SUMIF(B2:B9,"IT",D2:D9)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(B2:B9,"IT",D2:D9)',
    correctFormula: '=SUMIF(B2:B9,"IT",D2:D9)',
    expectedResult: "52 000 Kč",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej celkovou délku trvání u úkolů se statusem "Hotovo" (C2:C8). Délka je v B2:B8. Výsledek do E1.',
    table: {
      headers: ["", "A", "B", "C", "D", "E"],
      rows: [
        ["1", "Úkol", "Délka (h)", "Status", "Celkem hotovo", "❓"],
        ["2", "Úkol A", "5", "Hotovo", "", ""],
        ["3", "Úkol B", "3", "Probíhá", "", ""],
        ["4", "Úkol C", "8", "Hotovo", "", ""],
        ["5", "Úkol D", "2", "Nezahájeno", "", ""],
        ["6", "Úkol E", "6", "Hotovo", "", ""],
        ["7", "Úkol F", "4", "Probíhá", "", ""],
        ["8", "Úkol G", "7", "Hotovo", "", ""],
      ],
    },
    answerCell: "E1",
    hint: '=SUMIF(C2:C8,"Hotovo",B2:B8)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(C2:C8,"HOTOVO",B2:B8)',
    correctFormula: '=SUMIF(C2:C8,"Hotovo",B2:B8)',
    expectedResult: "26 h",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej tržby za produkt "Tablet" (A2:A6). Tržby jsou v B2:B6. Výsledek do D1.',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Produkt", "Tržby", "Součet Tablet", "❓"],
        ["2", "Notebook", "50000", "", ""],
        ["3", "Tablet", "15000", "", ""],
        ["4", "Telefon", "30000", "", ""],
        ["5", "Tablet", "12000", "", ""],
        ["6", "Tablet", "18000", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=SUMIF(A2:A6,"Tablet",B2:B6)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A6,"TABLET",B2:B6)',
    correctFormula: '=SUMIF(A2:A6,"Tablet",B2:B6)',
    expectedResult: "45 000 Kč",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej celkové odpracované hodiny pro směnu "Noční" (D2:D10). Hodiny jsou v E2:E10. Výsledek do G1.',
    table: {
      headers: ["", "C", "D", "E", "F", "G"],
      rows: [
        ["1", "Zaměstnanec", "Směna", "Hodiny", "Noční celkem", "❓"],
        ["2", "Novák", "Ranní", "8", "", ""],
        ["3", "Beneš", "Noční", "12", "", ""],
        ["4", "Svoboda", "Ranní", "8", "", ""],
        ["5", "Kovář", "Noční", "10", "", ""],
        ["6", "Polák", "Odpolední", "6", "", ""],
        ["7", "Dvořák", "Noční", "12", "", ""],
        ["8", "Černá", "Ranní", "8", "", ""],
        ["9", "Procházka", "Noční", "10", "", ""],
        ["10", "Veselý", "Odpolední", "6", "", ""],
      ],
    },
    answerCell: "G1",
    hint: '=SUMIF(D2:D10,"Noční",E2:E10)',
    checkFn: (f) =>
      normalizeFormula(f) === 'SUMIF(D2:D10,"NOČNÍ",E2:E10)' ||
      normalizeFormula(f.replace(/NO[CČ]NÍ/, "NOČNÍ")) ===
        'SUMIF(D2:D10,"NOČNÍ",E2:E10)',
    correctFormula: '=SUMIF(D2:D10,"Noční",E2:E10)',
    expectedResult: "44 h",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej počet kusů produktu "XYZ" (A2:A7) na skladě v B2:B7. Výsledek do D1.',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Produkt", "Kusy", "Celkem XYZ", "❓"],
        ["2", "ABC", "50", "", ""],
        ["3", "XYZ", "30", "", ""],
        ["4", "DEF", "20", "", ""],
        ["5", "XYZ", "45", "", ""],
        ["6", "XYZ", "15", "", ""],
        ["7", "GHI", "10", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=SUMIF(A2:A7,"XYZ",B2:B7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"XYZ",B2:B7)',
    correctFormula: '=SUMIF(A2:A7,"XYZ",B2:B7)',
    expectedResult: "90 ks",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej náklady na projekty s prioritou "Vysoká" (C2:C6). Náklady jsou v D2:D6. Výsledek do F1.',
    table: {
      headers: ["", "A", "B", "C", "D", "E", "F"],
      rows: [
        [
          "1",
          "Projekt",
          "Vedoucí",
          "Priorita",
          "Náklady",
          "Celkem vysoká",
          "❓",
        ],
        ["2", "Alpha", "Novák", "Vysoká", "200000", "", ""],
        ["3", "Beta", "Beneš", "Střední", "120000", "", ""],
        ["4", "Gamma", "Černá", "Vysoká", "300000", "", ""],
        ["5", "Delta", "Dvořák", "Nízká", "80000", "", ""],
        ["6", "Epsilon", "Polák", "Vysoká", "150000", "", ""],
      ],
    },
    answerCell: "F1",
    hint: '=SUMIF(C2:C6,"Vysoká",D2:D6)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(C2:C6,"VYSOKÁ",D2:D6)',
    correctFormula: '=SUMIF(C2:C6,"Vysoká",D2:D6)',
    expectedResult: "650 000 Kč",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej celkovou výměru pozemků typu "Les" (B2:B7). Výměra v ha v C2:C7. Výsledek do E1.',
    table: {
      headers: ["", "A", "B", "C", "D", "E"],
      rows: [
        ["1", "Parcela", "Typ", "Výměra (ha)", "Celkem les", "❓"],
        ["2", "1", "Orná", "12", "", ""],
        ["3", "2", "Les", "25", "", ""],
        ["4", "3", "Pastvina", "8", "", ""],
        ["5", "4", "Les", "30", "", ""],
        ["6", "5", "Les", "15", "", ""],
        ["7", "6", "Orná", "20", "", ""],
      ],
    },
    answerCell: "E1",
    hint: '=SUMIF(B2:B7,"Les",C2:C7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(B2:B7,"LES",C2:C7)',
    correctFormula: '=SUMIF(B2:B7,"Les",C2:C7)',
    expectedResult: "70 ha",
  },
  {
    funcId: "SUMIF",
    desc: 'Spočítej celkový počet bodů za kategorii "A" (A2:A9) ve sloupci B. Výsledek do D1.',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Kategorie", "Body", "Celkem A", "❓"],
        ["2", "A", "85", "", ""],
        ["3", "B", "72", "", ""],
        ["4", "A", "90", "", ""],
        ["5", "C", "65", "", ""],
        ["6", "A", "78", "", ""],
        ["7", "B", "88", "", ""],
        ["8", "A", "95", "", ""],
        ["9", "C", "55", "", ""],
      ],
    },
    answerCell: "D1",
    hint: '=SUMIF(A2:A9,"A",B2:B9)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A9,"A",B2:B9)',
    correctFormula: '=SUMIF(A2:A9,"A",B2:B9)',
    expectedResult: "348",
  },

  // --- ROUND ---
  {
    funcId: "ROUND",
    desc: "Zaokrouhli výsledek z buňky B2 (průměr 3.7456) na 2 desetinná místa. Výsledek vlož do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Průměr", "3.7456", "❓"],
        ["3", "Podíl", "8.2189", ""],
        ["4", "DPH koef.", "0.9167", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(číslo, počet_míst) → =ROUND(B2,2)",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,2)",
    correctFormula: "=ROUND(B2,2)",
    expectedResult: "3,75",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli B2 (3.14159) na 1 desetinné místo. Výsledek do C3.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Pi", "3.14159", ""],
        ["3", "Euler", "2.71828", "❓"],
        ["4", "Zlatý řez", "1.61803", ""],
      ],
    },
    answerCell: "C3",
    hint: "=ROUND(B3,1)",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B3,1)",
    correctFormula: "=ROUND(B3,1)",
    expectedResult: "2,7",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli sazbu DPH (B2) na 0 desetinných míst. Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "DPH sazba", "0.21", "❓"],
        ["3", "Koeficient", "0.9167", ""],
        ["4", "Marže", "0.375", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,0)",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,0)",
    correctFormula: "=ROUND(B2,0)",
    expectedResult: "0",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli podíl (B2) na 3 desetinná místa. Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Podíl", "0.66666", "❓"],
        ["3", "Odmocnina", "1.41421", ""],
        ["4", "Faktoriál", "0.83333", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,3)",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,3)",
    correctFormula: "=ROUND(B2,3)",
    expectedResult: "0,667",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli objednávku (B2) na stovky (záporné místo). Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Objednávka", "1249", "❓"],
        ["3", "Tržba", "3670", ""],
        ["4", "Rozpočet", "9876", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,-2) zaokrouhlí na stovky",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,-2)",
    correctFormula: "=ROUND(B2,-2)",
    expectedResult: "1 200",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli spotřebu (B2) na celé číslo. Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Spotřeba L", "36.78", "❓"],
        ["3", "Vzdálenost km", "142.3", ""],
        ["4", "Váha kg", "5.52", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,0)",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,0)",
    correctFormula: "=ROUND(B2,0)",
    expectedResult: "37",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli kurz (B2) na 2 desetinná místa. Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Kurz EUR", "25.1678", "❓"],
        ["3", "Kurz USD", "22.5543", ""],
        ["4", "Kurz GBP", "29.8156", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,2)",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,2)",
    correctFormula: "=ROUND(B2,2)",
    expectedResult: "25,17",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli rozpočet (B2) na tisíce. Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Rozpočet", "124567", "❓"],
        ["3", "Výdaje", "98765", ""],
        ["4", "Zisk", "45678", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,-3) zaokrouhlí na tisíce",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,-3)",
    correctFormula: "=ROUND(B2,-3)",
    expectedResult: "125 000",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli procento (B2) na 1 desetinné místo. Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Procento", "87.456", "❓"],
        ["3", "Procento", "33.333", ""],
        ["4", "Procento", "66.789", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,1)",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,1)",
    correctFormula: "=ROUND(B2,1)",
    expectedResult: "87,5",
  },
  {
    funcId: "ROUND",
    desc: "Zaokrouhli celkovou váhu (B2) na desítky. Výsledek do C2.",
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Položka", "Hodnota", "Zaokrouhleno"],
        ["2", "Váha kg", "1234", "❓"],
        ["3", "Váha kg", "567", ""],
        ["4", "Váha kg", "89", ""],
      ],
    },
    answerCell: "C2",
    hint: "=ROUND(B2,-1) zaokrouhlí na desítky",
    checkFn: (f) => normalizeFormula(f) === "ROUND(B2,-1)",
    correctFormula: "=ROUND(B2,-1)",
    expectedResult: "1 230",
  },

  // --- CONCATENATE ---
  {
    funcId: "CONCATENATE",
    desc: 'Spoj příjmení (A2) a jméno (B2) s mezerou mezi nimi do C2. Výsledek: "Novák Jan".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Příjmení", "Jméno", "Celé jméno"],
        ["2", "Novák", "Jan", "❓"],
        ["3", "Svobodová", "Eva", ""],
        ["4", "Procházka", "Tomáš", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2," ",B2) nebo =A2&" "&B2',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2," ",B2)' ||
      normalizeFormula(f) === 'A2&" "&B2',
    correctFormula: '=CONCATENATE(A2," ",B2)',
    expectedResult: '"Novák Jan"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj město (A2) a PSČ (B2) s čárkou do C2. Výsledek: "Praha, 11000".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Město", "PSČ", "Lokalita"],
        ["2", "Praha", "11000", "❓"],
        ["3", "Brno", "60200", ""],
        ["4", "Ostrava", "70200", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2,", ",B2)',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2,", ",B2)' ||
      normalizeFormula(f) === 'A2&", "&B2',
    correctFormula: '=CONCATENATE(A2,", ",B2)',
    expectedResult: '"Praha, 11000"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj zkratku (A2) a název (B2) s tečkou do C2. Výsledek: "CZ. Česká republika".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Zkratka", "Název", "Celý"],
        ["2", "CZ", "Česká republika", "❓"],
        ["3", "SK", "Slovensko", ""],
        ["4", "PL", "Polsko", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2,". ",B2)',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2,". ",B2)' ||
      normalizeFormula(f) === 'A2&". "&B2',
    correctFormula: '=CONCATENATE(A2,". ",B2)',
    expectedResult: '"CZ. Česká republika"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj jméno (A2), zavináč a doménu (B2) do C2. Výsledek: "jan.novak@firma.cz".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Jméno", "Doména", "E-mail"],
        ["2", "jan.novak", "firma.cz", "❓"],
        ["3", "eva.cerna", "firma.cz", ""],
        ["4", "petr.prochazka", "email.cz", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2,"@",B2)',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2,"@",B2)' ||
      normalizeFormula(f) === 'A2&"@"&B2',
    correctFormula: '=CONCATENATE(A2,"@",B2)',
    expectedResult: '"jan.novak@firma.cz"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj číslo objednávky (A2) a datum (B2) do C2. Výsledek: "OBJ-001 ze dne 1.3.2024".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Objednávka", "Datum", "Info"],
        ["2", "OBJ-001", "1.3.2024", "❓"],
        ["3", "OBJ-002", "15.4.2024", ""],
        ["4", "OBJ-003", "30.6.2024", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2," ze dne ",B2)',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2," ZE DNE ",B2)' ||
      normalizeFormula(f) === 'A2&" ZE DNE "&B2',
    correctFormula: '=CONCATENATE(A2," ze dne ",B2)',
    expectedResult: '"OBJ-001 ze dne 1.3.2024"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj značku (A2) a model (B2) s mezerou do C2. Výsledek: "Škoda Octavia".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Značka", "Model", "Vůz"],
        ["2", "Škoda", "Octavia", "❓"],
        ["3", "Volkswagen", "Golf", ""],
        ["4", "BMW", "X5", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2," ",B2)',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2," ",B2)' ||
      normalizeFormula(f) === 'A2&" "&B2',
    correctFormula: '=CONCATENATE(A2," ",B2)',
    expectedResult: '"Škoda Octavia"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj den (A2), tečku, měsíc (B2), tečku a rok (C2) do D2. Výsledek: "1.1.2024".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Den", "Měsíc", "Rok", "Datum"],
        ["2", "1", "1", "2024", "❓"],
        ["3", "15", "6", "2024", ""],
        ["4", "24", "12", "2024", ""],
      ],
    },
    answerCell: "D2",
    hint: '=CONCATENATE(A2,".",B2,".",C2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,".",B2,".",C2)',
    correctFormula: '=CONCATENATE(A2,".",B2,".",C2)',
    expectedResult: '"1.1.2024"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj ulici (A2), č.p. (B2) a město (C2) do D2 s čárkami. Výsledek: "Hlavní, 123, Praha".',
    table: {
      headers: ["", "A", "B", "C", "D"],
      rows: [
        ["1", "Ulice", "Č.p.", "Město", "Adresa"],
        ["2", "Hlavní", "123", "Praha", "❓"],
        ["3", "Dlouhá", "45", "Brno", ""],
        ["4", "Krátká", "7", "Plzeň", ""],
      ],
    },
    answerCell: "D2",
    hint: '=CONCATENATE(A2,", ",B2,", ",C2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,", ",B2,", ",C2)',
    correctFormula: '=CONCATENATE(A2,", ",B2,", ",C2)',
    expectedResult: '"Hlavní, 123, Praha"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj typ (A2) a ID (B2) s pomlčkou do C2. Výsledek: "FAKT-2024-001".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Typ", "ID", "Kód"],
        ["2", "FAKT", "2024-001", "❓"],
        ["3", "OBJ", "2024-045", ""],
        ["4", "POP", "2024-012", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2,"-",B2)',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2,"-",B2)' ||
      normalizeFormula(f) === 'A2&"-"&B2',
    correctFormula: '=CONCATENATE(A2,"-",B2)',
    expectedResult: '"FAKT-2024-001"',
  },
  {
    funcId: "CONCATENATE",
    desc: 'Spoj budovu (A2), lomítko a místnost (B2) do C2. Výsledek: "A/205".',
    table: {
      headers: ["", "A", "B", "C"],
      rows: [
        ["1", "Budova", "Místnost", "Umístění"],
        ["2", "A", "205", "❓"],
        ["3", "B", "312", ""],
        ["4", "C", "101", ""],
      ],
    },
    answerCell: "C2",
    hint: '=CONCATENATE(A2,"/",B2)',
    checkFn: (f) =>
      normalizeFormula(f) === 'CONCATENATE(A2,"/",B2)' ||
      normalizeFormula(f) === 'A2&"/"&B2',
    correctFormula: '=CONCATENATE(A2,"/",B2)',
    expectedResult: '"A/205"',
  },
];

// ===== HELPERS =====
function normalizeFormula(raw) {
  return raw.trim().replace(/^=/, "").toUpperCase().replace(/\s+/g, "");
}

function setTeacherMood(elId, moodKey) {
  const el = document.getElementById(elId);
  if (!el) return;
  // swap mood border/glow class
  el.classList.remove(...Object.keys(MOODS).map((k) => `mood-${k}`));
  el.classList.add(`mood-${moodKey}`);
  // swap image with fade
  let img = el.querySelector("img");
  if (!img) {
    img = document.createElement("img");
    img.alt = moodKey;
    img.style.transition = "opacity 0.15s";
    el.appendChild(img);
  }
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = MOOD_IMAGES[moodKey];
    img.style.opacity = "1";
  }, 150);
  // bounce animation
  el.classList.remove("teacher-bounce");
  void el.offsetWidth;
  el.classList.add("teacher-bounce");
  setTimeout(() => el.classList.remove("teacher-bounce"), 500);
}

// ===== GAME STATE =====
let state = {
  selectedFuncs: [],
  difficulty: "easy",
  questions: [],
  currentQ: 0,
  score: 0,
  correct: 0,
  wrong: 0,
  totalTime: 0,
  timerSeconds: 20,
  timerInterval: null,
  answered: false,
  consecutiveCorrect: 0,
  startTime: null,
  currentMood: "medium",
};

const DIFF_CONFIG = {
  easy:   { count: 5,  time: 40 },
  medium: { count: 10, time: 30 },
  hard:   { count: 20, time: 25 },
};

// ===== INIT HOME =====
// Track last clicked index for Shift-range selection
let lastClickedIndex = -1;

function initHome() {
  const grid = document.getElementById("function-selector");
  grid.innerHTML = "";

  ALL_FUNCTIONS.forEach((fn, idx) => {
    const chip = document.createElement("button");
    chip.className =
      "func-chip" + (state.selectedFuncs.includes(fn.id) ? " selected" : "");
    chip.textContent = fn.label;
    chip.dataset.id = fn.id;
    chip.dataset.idx = idx;

    // Shift+hover: preview the range that would be selected
    chip.addEventListener("mouseenter", (e) => {
      if (!e.shiftKey || lastClickedIndex === -1) return;
      const chips = [...document.querySelectorAll(".func-chip")];
      const from = Math.min(lastClickedIndex, idx);
      const to = Math.max(lastClickedIndex, idx);
      chips.forEach((c, i) => {
        c.classList.toggle(
          "range-preview",
          i >= from && i <= to && !c.classList.contains("selected"),
        );
      });
    });
    chip.addEventListener("mouseleave", () => {
      document
        .querySelectorAll(".func-chip.range-preview")
        .forEach((c) => c.classList.remove("range-preview"));
    });

    chip.addEventListener("click", (e) => {
      e.preventDefault();
      const chips = [...document.querySelectorAll(".func-chip")];
      const clickedIdx = parseInt(chip.dataset.idx);

      if (e.shiftKey && lastClickedIndex !== -1) {
        // === SHIFT: select range from last clicked to this ===
        const from = Math.min(lastClickedIndex, clickedIdx);
        const to = Math.max(lastClickedIndex, clickedIdx);
        chips.forEach((c, i) => {
          if (i >= from && i <= to) {
            const fid = ALL_FUNCTIONS[i].id;
            if (!state.selectedFuncs.includes(fid)) {
              state.selectedFuncs.push(fid);
            }
            c.classList.add("selected");
            c.classList.remove("range-preview");
          }
        });
        // don't update lastClickedIndex on shift (Excel behaviour)
      } else if (e.ctrlKey || e.metaKey) {
        // === CTRL: toggle individual item ===
        toggleFuncById(fn.id, chip);
        lastClickedIndex = clickedIdx;
      } else {
        // === Normal click: toggle individual (no modifier) ===
        toggleFuncById(fn.id, chip);
        lastClickedIndex = clickedIdx;
      }

      updateSpeechBubble();
    });

    grid.appendChild(chip);
  });

  document.querySelectorAll(".diff-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.diff === state.difficulty);
    btn.addEventListener("click", () => {
      state.difficulty = btn.dataset.diff;
      document
        .querySelectorAll(".diff-btn")
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.diff === state.difficulty),
        );
    });
  });

  document.getElementById("start-btn").addEventListener("click", startGame);
  setTeacherMood("home-teacher", "medium");
  updateSpeechBubble();
}

function toggleFuncById(id, chip) {
  const idx = state.selectedFuncs.indexOf(id);
  if (idx === -1) {
    state.selectedFuncs.push(id);
    chip.classList.add("selected");
  } else {
    state.selectedFuncs.splice(idx, 1);
    chip.classList.remove("selected");
  }
}

const SPEECH_ZERO = [
  "Vyberte si funkce, které chcete procvičit, a pojďme na to!",
  "Tak co, na co se dneska vrhneme?",
  "Bez funkce to nepůjde. Vyber jednu nebo víc!",
  "Neboj, žádná funkce není moc složitá.",
  "Excel čeká na svého mistra.",
  "Kuboo sakra ale to máš umět!!",
  "Děcka musíte se více hlásit..",
  "Gigabitový internet do každé domácnosti",
  "Já si koupím ostrov a budu tam mít vlastní Excelový ráj",
  "Pokud nebudeš umět funkce, tak tě pošlu si sednout ven za narkomanama na lavičku!!",
];

const SPEECH_ONE = [
  "Vybrána 1 funkce. Dobrá volba!",
  "Jedna funkce – pěkná výzva. Zvládneš to!",
  "Soustředíš se na jednu funkci. Dobrý plán!",
  "Jedna funkce k procvičení, pořádně do hloubky.",
  "Začínáme s jednou funkcí. Ideální na rozjezd!",
];

const SPEECH_MANY = [
  "Vybráno ${n} funkcí. Šikovný výběr – jdeme na to!",
  "Paráda, ${n} funkcí v jednom kole!",
  "${n} funkcí? To bude jízda!",
  "Hodně odvážný výběr – ${n} funkcí!",
  "${n} funkcí najednou. Líbí se mi tvůj styl!",
];

function updateSpeechBubble() {
  const bubble = document.querySelector(".speech-bubble");
  if (!bubble) return;
  const n = state.selectedFuncs.length;
  let msgs;
  if (n === 0) {
    msgs = SPEECH_ZERO;
  } else if (n === 1) {
    msgs = SPEECH_ONE;
  } else {
    msgs = SPEECH_MANY.map((s) => s.replace(/\$\{n\}/g, n));
  }
  // Pick a random message, but different from current one
  let pick;
  do {
    pick = msgs[Math.floor(Math.random() * msgs.length)];
  } while (pick === bubble.textContent && msgs.length > 1);
  bubble.textContent = pick;
}

// ===== START GAME =====
function startGame() {
  // Musí být vybrána alespoň jedna funkce
  if (state.selectedFuncs.length === 0) {
    shakeStartBtn();
    return;
  }

  const cfg = DIFF_CONFIG[state.difficulty];

  // Filter questions by selected functions
  let pool = ALL_QUESTIONS.filter((q) =>
    state.selectedFuncs.includes(q.funcId),
  );

  if (pool.length === 0) {
    shakeStartBtn();
    return;
  }

  // Pad pool with reshuffled copies if we have fewer questions than needed
  while (pool.length < cfg.count) {
    pool = pool.concat(shuffle([...pool]));
  }
  // Shuffle and pick, no consecutive duplicates
  pool = shuffle(pool);
  state.questions = pool.slice(0, cfg.count);
  state.currentQ = 0;
  state.score = 0;
  state.correct = 0;
  state.wrong = 0;
  state.totalTime = 0;
  state.consecutiveCorrect = 0;
  state.currentMood = "medium";
  state.startTime = Date.now();

  showScreen("screen-game");
  setTeacherMood("game-teacher", "medium");
  document.getElementById("mood-label").textContent = "Připraven!";

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

  document.getElementById("check-btn").addEventListener("click", checkAnswer);
  document.getElementById("formula-input").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const overlay = document.getElementById("result-overlay");
    const overlayVisible = overlay && overlay.style.display !== "none";
    if (overlayVisible) {
      // Overlay je otevřený → Enter = pokračovat
      nextQuestion();
    } else {
      // Overlay zavřený → Enter = odevzdat vzorec
      checkAnswer();
    }
  });
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  document.getElementById("home-btn").addEventListener("click", () => {
    stopTimer();
    showScreen("screen-home");
  });
  document.getElementById("retry-btn").addEventListener("click", () => {
    showScreen("screen-home");
    startGame();
  });
  document.getElementById("menu-btn2").addEventListener("click", () => {
    showScreen("screen-home");
  });
}

// ===== LOAD QUESTION =====
function loadQuestion() {
  const q = state.questions[state.currentQ];
  state.answered = false;

  document.getElementById("task-desc").textContent = q.desc;
  document.getElementById("task-badge").textContent =
    `ÚKOL ${state.currentQ + 1}`;
  const cellRefEl = document.getElementById("cell-ref");
  cellRefEl.textContent = q.answerCell;
  cellRefEl.classList.remove("has-range");
  const progressPct = ((state.currentQ + 1) / state.questions.length) * 100;
  document.getElementById("progress-fill").style.width = `${progressPct}%`;
  document.getElementById("progress-text").textContent =
    `${state.currentQ + 1} / ${state.questions.length}`;
  document.getElementById("score-value").textContent = state.score;

  const input = document.getElementById("formula-input");
  input.value = "";
  input.className = "formula-input";
  input.focus();

  document.getElementById("hint-area").style.display = "none";
  document.getElementById("result-overlay").style.display = "none";

  renderTable(q);
  startTimer();
}

// ===== CELL SELECTION STATE =====
const cellSel = {
  anchor: null, // { col, row } – first clicked cell
  active: null, // last hovered/clicked cell
  isSelecting: false,
  mode: null, // 'range' | 'multi'
};

// Map col letter to index and back
function colLetterToIdx(letter) {
  return letter.toUpperCase().charCodeAt(0) - 64; // A=1, B=2 …
}
function idxToColLetter(idx, headers) {
  // headers[0] is row-num col, headers[1..] are column letters
  return headers[idx]; // idx is 1-based data column index
}

function renderTable(q) {
  const container = document.getElementById("excel-container");
  const { headers, rows } = q.table;
  // column letters (skip first empty header)
  const colLetters = headers.slice(1); // e.g. ['A','B'] or ['B','C']

  let html = '<table class="excel-table" id="game-table"><thead><tr>';
  html += `<th class="row-header">&nbsp;</th>`;
  colLetters.forEach((h) => {
    html += `<th data-col="${h}">${h}</th>`;
  });
  html += "</tr></thead><tbody>";

  rows.forEach((row, rowIdx) => {
    const rowNum = row[0]; // '1','2'…
    html += "<tr>";
    html += `<td class="row-num">${rowNum}</td>`;
    row.slice(1).forEach((cell, colIdx) => {
      const colLetter = colLetters[colIdx];
      const cellAddr = `${colLetter}${rowNum}`;
      const isAnswer = cell === "❓";
      const isHeaderRow = rowIdx === 0;
      const isNum = !isNaN(cell.replace(/\s/g, "")) && cell !== "" && !isAnswer;

      let cls = "selectable";
      if (isAnswer) cls += " answer-cell";
      else if (isHeaderRow) cls += " header-cell";
      else if (isNum) cls += " num-cell";

      const displayVal = isAnswer ? q.answerCell : cell;
      html += `<td class="${cls}" data-addr="${cellAddr}" data-col="${colLetter}" data-row="${rowNum}">${displayVal}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  container.innerHTML = html;

  // Wire up selection events
  initCellSelection(q);
}

function initCellSelection(q) {
  const table = document.getElementById("game-table");
  if (!table) return;

  // Reset selection state
  cellSel.anchor = null;
  cellSel.active = null;
  cellSel.isSelecting = false;
  cellSel.mode = null;

  // Prevent text selection while dragging
  table.addEventListener("selectstart", (e) => {
    if (cellSel.isSelecting) e.preventDefault();
  });

  table.addEventListener("mousedown", (e) => {
    const td = e.target.closest("td.selectable");
    if (!td) return;
    e.preventDefault();

    const addr = td.dataset.addr;
    if (!addr) return;

    if (e.shiftKey && cellSel.anchor) {
      // Shift+click: extend range from anchor
      cellSel.mode = "range";
      cellSel.active = parseAddr(addr);
      updateSelection(q);
      writeRangeToFormula(q);
    } else if (e.ctrlKey || e.metaKey) {
      // Ctrl+click: toggle single cell into multi-selection
      cellSel.mode = "multi";
      toggleCellInMulti(td, addr, q);
    } else {
      // Plain click: start fresh range drag
      cellSel.mode = "range";
      cellSel.anchor = parseAddr(addr);
      cellSel.active = parseAddr(addr);
      cellSel.isSelecting = true;
      clearAllSelected(table);
      td.classList.add("cell-selected");
      writeRangeToFormula(q);
    }
  });

  table.addEventListener("mousemove", (e) => {
    if (!cellSel.isSelecting || cellSel.mode !== "range") return;
    const td = e.target.closest("td.selectable");
    if (!td || !td.dataset.addr) return;
    const p = parseAddr(td.dataset.addr);
    if (
      !cellSel.active ||
      p.col !== cellSel.active.col ||
      p.row !== cellSel.active.row
    ) {
      cellSel.active = p;
      updateSelection(q);
      writeRangeToFormula(q);
    }
  });

  document.addEventListener(
    "mouseup",
    () => {
      cellSel.isSelecting = false;
    },
    { once: false },
  );
}

function parseAddr(addr) {
  // e.g. "B3" -> { col: "B", row: 3, colIdx: 2 }
  const col = addr.match(/[A-Z]+/)[0];
  const row = parseInt(addr.match(/\d+/)[0]);
  return { col, row, colIdx: col.charCodeAt(0) - 64 };
}

function clearAllSelected(table) {
  table.querySelectorAll(".cell-selected, .cell-anchor").forEach((td) => {
    td.classList.remove("cell-selected", "cell-anchor");
  });
}

function updateSelection(q) {
  const table = document.getElementById("game-table");
  if (!table || !cellSel.anchor || !cellSel.active) return;

  clearAllSelected(table);

  const minCol = Math.min(cellSel.anchor.colIdx, cellSel.active.colIdx);
  const maxCol = Math.max(cellSel.anchor.colIdx, cellSel.active.colIdx);
  const minRow = Math.min(cellSel.anchor.row, cellSel.active.row);
  const maxRow = Math.max(cellSel.anchor.row, cellSel.active.row);

  table.querySelectorAll("td.selectable[data-addr]").forEach((td) => {
    const p = parseAddr(td.dataset.addr);
    if (
      p.colIdx >= minCol &&
      p.colIdx <= maxCol &&
      p.row >= minRow &&
      p.row <= maxRow
    ) {
      td.classList.add("cell-selected");
      if (p.col === cellSel.anchor.col && p.row === cellSel.anchor.row) {
        td.classList.add("cell-anchor");
      }
    }
  });
}

// Returns "B2:B5" or "B2" from current selection
function getRangeString() {
  if (!cellSel.anchor || !cellSel.active) return "";
  const a = cellSel.anchor;
  const b = cellSel.active;
  if (a.col === b.col && a.row === b.row) return `${a.col}${a.row}`;

  const minCol = String.fromCharCode(64 + Math.min(a.colIdx, b.colIdx));
  const maxCol = String.fromCharCode(64 + Math.max(a.colIdx, b.colIdx));
  const minRow = Math.min(a.row, b.row);
  const maxRow = Math.max(a.row, b.row);
  if (minCol === maxCol) return `${minCol}${minRow}:${maxCol}${maxRow}`;
  return `${minCol}${minRow}:${maxCol}${maxRow}`;
}

// Multi-selection state (Ctrl)
const multiSelected = new Set();

function toggleCellInMulti(td, addr, q) {
  if (multiSelected.has(addr)) {
    multiSelected.delete(addr);
    td.classList.remove("cell-selected", "cell-anchor");
  } else {
    multiSelected.add(addr);
    td.classList.add("cell-selected");
  }
  writeMultiToFormula(q);
}

function updateCellRef(text) {
  const ref = document.getElementById("cell-ref");
  if (!ref) return;
  ref.textContent = text;
  ref.classList.toggle("has-range", text.includes(":") || text.length > 2);
}

function writeRangeToFormula(q) {
  multiSelected.clear();
  const range = getRangeString();
  if (!range) return;

  // Update the cell-ref box
  updateCellRef(range);

  const input = document.getElementById("formula-input");
  const cur = input.value;

  // If formula already has opening paren – replace the argument inside
  const parenOpen = cur.indexOf("(");
  if (parenOpen !== -1) {
    const before = cur.slice(0, parenOpen + 1);
    const after = cur.includes(")") ? cur.slice(cur.lastIndexOf(")")) : ")";
    input.value = before + range + after;
  } else if (cur === "" || cur === "=") {
    input.value = cur + range;
  } else {
    // Replace a trailing cell reference / range if present
    input.value = cur.replace(/[A-Z]+\d+(:[A-Z]+\d+)?$/, "") + range;
  }
  // Highlight the range text inside the input
  const start = input.value.lastIndexOf(range);
  input.focus();
  if (start !== -1) input.setSelectionRange(start, start + range.length);
}

function writeMultiToFormula(q) {
  if (multiSelected.size === 0) return;
  const addrs = [...multiSelected].join(";");
  updateCellRef(addrs);

  const input = document.getElementById("formula-input");
  const cur = input.value;
  const parenOpen = cur.indexOf("(");
  if (parenOpen !== -1) {
    const before = cur.slice(0, parenOpen + 1);
    const after = cur.includes(")") ? cur.slice(cur.lastIndexOf(")")) : ")";
    input.value = before + addrs + after;
  } else {
    input.value = (cur || "") + addrs;
  }
  const start = input.value.lastIndexOf(addrs);
  input.focus();
  if (start !== -1) input.setSelectionRange(start, start + addrs.length);
}
// ===== TIMER =====
function startTimer() {
  stopTimer();
  const cfg = DIFF_CONFIG[state.difficulty];
  let timeLeft = cfg.time;
  const arc = document.getElementById("timer-arc");
  const circumference = 213.6;
  const totalTime = cfg.time;

  function updateTimer() {
    document.getElementById("timer-text").textContent = timeLeft;
    const offset = circumference * (1 - timeLeft / totalTime);
    arc.style.strokeDashoffset = offset;

    arc.classList.remove("warning", "danger");
    if (timeLeft <= totalTime * 0.25) arc.classList.add("danger");
    else if (timeLeft <= totalTime * 0.5) arc.classList.add("warning");
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
  const input = document.getElementById("formula-input");
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
    const timeLeft = parseInt(
      document.getElementById("timer-text").textContent,
    );
    const timeBonus = Math.round((timeLeft / cfg.time) * 10);
    const points = 10 + timeBonus + (state.consecutiveCorrect > 2 ? 5 : 0);
    state.score += points;

    input.classList.add("correct");
    updateMood(true, false);
    showResult(true, false);
  } else {
    state.wrong++;
    state.consecutiveCorrect = 0;
    input.classList.add("wrong");

    // Show hint after wrong
    const hintArea = document.getElementById("hint-area");
    document.getElementById("hint-text").textContent = "💡 " + q.hint;
    hintArea.style.display = "block";

    updateMood(false, false);
    showResult(false, false);
  }

  document.getElementById("score-value").textContent = state.score;
}

// ===== MOOD LOGIC =====
function updateMood(correct, timeout) {
  const ratio = state.correct / (state.currentQ + 1);

  let mood;
  if (timeout) {
    mood = state.currentMood === "very-bad" ? "very-bad" : "bad";
  } else if (correct) {
    if (state.consecutiveCorrect >= 3) mood = "very-good";
    else if (ratio >= 0.8) mood = "good";
    else mood = "medium";
  } else {
    if (ratio < 0.3) mood = "very-bad";
    else if (ratio < 0.5) mood = "bad";
    else mood = "medium";
  }

  state.currentMood = mood;
  setTeacherMood("game-teacher", mood);
  document.getElementById("mood-label").textContent = MOODS[mood].label;
}

// ===== SHOW RESULT =====
function showResult(correct, timeout) {
  const q = state.questions[state.currentQ];
  const overlay = document.getElementById("result-overlay");
  const card = document.getElementById("result-card");

  document.getElementById("result-overlay").style.display = "flex";

  if (correct) {
    card.className = "result-card";
    document.getElementById("result-icon").textContent = "✅";
    document.getElementById("result-msg").textContent = getCorrectMsg();
    document.getElementById("result-answer").textContent =
      `Správně: ${q.correctFormula} → ${q.expectedResult}`;
  } else if (timeout) {
    card.className = "result-card wrong-card";
    document.getElementById("result-icon").textContent = "⏰";
    document.getElementById("result-msg").textContent = "Čas vypršel!";
    document.getElementById("result-answer").textContent =
      `Správný vzorec: ${q.correctFormula}`;
  } else {
    card.className = "result-card wrong-card";
    document.getElementById("result-icon").textContent = "❌";
    document.getElementById("result-msg").textContent = getWrongMsg();
    document.getElementById("result-answer").textContent =
      `Správný vzorec: ${q.correctFormula}`;
  }
}

function getCorrectMsg() {
  const msgs = ["SPRÁVNĚ!", "BRAVO!", "VÝBORNĚ!", "PŘESNĚ TAK!", "SUPER!"];
  return msgs[Math.floor(Math.random() * msgs.length)];
}
function getWrongMsg() {
  const msgs = ["ZKUS ZNOVU", "ŠPATNĚ!", "CHYBA!", "NE TAKHLE..."];
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
  document.getElementById("progress-fill").style.width = "100%";
  const elapsed = Math.round((Date.now() - state.startTime) / 1000);
  const total = state.questions.length;
  const ratio = state.correct / total;

  let moodKey, grade, comment;
  if (ratio >= 0.9) {
    moodKey = "very-good";
    grade = "Jednička s hvězdičkou ⭐";
    comment = "Fantastický výkon! Jsi mistr excelových tabulek!! 🏆";
  } else if (ratio >= 0.7) {
    moodKey = "good";
    grade = "Chvalitebný 😊";
    comment = "Výborná práce! Jen ještě trochu trénovat.";
  } else if (ratio >= 0.5) {
    moodKey = "medium";
    grade = "Dobrý 😐";
    comment = "Základ zvládáš, ale ještě je co zlepšovat.";
  } else if (ratio >= 0.3) {
    moodKey = "bad";
    grade = "Dostatečný 😟";
    comment = "Ne každej může být chytrej jako já...";
  } else {
    moodKey = "very-bad";
    grade = "Nedostatečný 😤";
    comment = "COPT čeká...";
  }

  showScreen("screen-results");
  setTeacherMood("results-teacher", moodKey);
  document.getElementById("results-title").textContent = "Výsledky";
  document.getElementById("results-grade").textContent = grade;
  document.getElementById("stat-correct").textContent = state.correct;
  document.getElementById("stat-wrong").textContent = state.wrong;
  document.getElementById("stat-time").textContent = elapsed + "s";
  document.getElementById("stat-score").textContent = state.score;
  document.getElementById("results-comment").textContent = comment;
}

// ===== SCREEN SWITCHING =====
function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ===== BOOTSTRAP =====
function shakeStartBtn() {
  const btn = document.getElementById("start-btn");
  const hint = document.getElementById("no-func-hint");
  // Shake animation
  btn.classList.remove("btn-shake");
  void btn.offsetWidth;
  btn.classList.add("btn-shake");
  // Show inline hint
  if (hint) {
    hint.style.opacity = "1";
    clearTimeout(hint._hideTimer);
    hint._hideTimer = setTimeout(() => {
      hint.style.opacity = "0";
    }, 2800);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initHome();

  // Difficulty buttons re-init (since initHome sets listeners)
  document.querySelectorAll(".diff-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.difficulty = btn.dataset.diff;
      document
        .querySelectorAll(".diff-btn")
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.diff === state.difficulty),
        );
    });
  });
});
