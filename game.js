// ========================================
// EXCEL VÝZVA – Game Logic
// ========================================

// ===== TEACHER MOODS =====
const MOODS = {
  'very-bad':  { label: 'Katastrofa!',  score: 0 },
  'bad':       { label: 'Slabé...',     score: 1 },
  'medium':    { label: 'Ujde to.',     score: 2 },
  'good':      { label: 'Dobře!',       score: 3 },
  'very-good': { label: 'Výborně!!',    score: 4 },
};

// ===== TEACHER IMAGES =====
// To use your own PNG photos, replace the SVG files in the teacher/ folder with:
//   very-bad.png  bad.png  medium.png  good.png  very-good.png
// Then change the extension below from .svg to .png
const MOOD_IMAGES = {
  'very-bad':  'teacher/very-bad.png',
  'bad':       'teacher/bad.png',
  'medium':    'teacher/medium.png',
  'good':      'teacher/good.png',
  'very-good': 'teacher/very-good.png',
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
  {
    funcId: 'SUM',
    desc: 'V buňce B6 spočítej celkovou kvartální tržbu – sečti hodnoty v B2:B5.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Měsíc',  'Tržba (Kč)'],
        ['2', 'Leden',  '34000'],
        ['3', 'Únor',   '28500'],
        ['4', 'Březen', '39700'],
        ['5', 'Duben',  '31200'],
        ['6', 'CELKEM', '❓'],
      ],
    },
    answerCell: 'B6',
    hint: 'Sečti celý sloupec: =SUM(B2:B5)',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B5)',
    correctFormula: '=SUM(B2:B5)',
    expectedResult: '133 400 Kč',
  },
  {
    funcId: 'SUM',
    desc: 'Vypočítej celkový počet odpracovaných hodin za týden (B2:B6) do buňky B7.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Den',    'Hodiny'],
        ['2', 'Pondělí','8.5'],
        ['3', 'Úterý',  '7.75'],
        ['4', 'Středa', '9'],
        ['5', 'Čtvrtek','8'],
        ['6', 'Pátek',  '6.5'],
        ['7', 'CELKEM', '❓'],
      ],
    },
    answerCell: 'B7',
    hint: 'Součet hodin =SUM(B2:B6)',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B6)',
    correctFormula: '=SUM(B2:B6)',
    expectedResult: '39,75 h',
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
  {
    funcId: 'AVERAGE',
    desc: 'Vypočítej průměrné měsíční srážky ze sloupce B. Výsledek vlož do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Měsíc', 'Srážky (mm)'],
        ['2', 'Leden', '45'],
        ['3', 'Únor',  '38'],
        ['4', 'Březen','52'],
        ['5', 'Duben', '41'],
        ['6', 'Květen','63'],
        ['7', 'Červen','57'],
        ['8', 'Průměr','❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=AVERAGE(B2:B7) spočítá průměr',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(B2:B7)',
    correctFormula: '=AVERAGE(B2:B7)',
    expectedResult: '49,33 mm',
  },
  {
    funcId: 'AVERAGE',
    desc: 'Spočítej průměrnou cenu prodaných vstupenek (C2:C6). Výsledek do C7.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Sektor',  'Cena (Kč)'],
        ['2', 'Stání',   '250'],
        ['3', 'Tribuna', '480'],
        ['4', 'VIP',     '1200'],
        ['5', 'Lóže',    '2500'],
        ['6', 'Dětský',  '150'],
        ['7', 'Průměr',  '❓'],
      ],
    },
    answerCell: 'C7',
    hint: '=AVERAGE(C2:C6) – průměrná cena vstupenky',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(C2:C6)',
    correctFormula: '=AVERAGE(C2:C6)',
    expectedResult: '916 Kč',
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
  {
    funcId: 'MIN',
    desc: 'Najdi nejkratší dobu dodání (ve dnech) ve sloupci C. Výsledek vlož do C9.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Objednávka', 'Dodání (dny)'],
        ['2', '#1001',      '3'],
        ['3', '#1002',      '5'],
        ['4', '#1003',      '2'],
        ['5', '#1004',      '7'],
        ['6', '#1005',      '4'],
        ['7', '#1006',      '3'],
        ['8', '#1007',      '6'],
        ['9', 'Minimum',    '❓'],
      ],
    },
    answerCell: 'C9',
    hint: '=MIN(C2:C8) najde nejmenší číslo',
    checkFn: (f) => normalizeFormula(f) === 'MIN(C2:C8)',
    correctFormula: '=MIN(C2:C8)',
    expectedResult: '2 dny',
  },
  {
    funcId: 'MIN',
    desc: 'Zjisti nejnižší naměřenou teplotu v týdnu (B2:B8). Výsledek do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Den', 'Teplota (°C)'],
        ['2', 'Po',  '-2'],
        ['3', 'Út',  '0'],
        ['4', 'St',  '3'],
        ['5', 'Čt',  '-1'],
        ['6', 'Pá',  '-5'],
        ['7', 'So',  '1'],
        ['8', 'Ne',  '4'],
        ['9', 'Minimum', '❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=MIN(B2:B8) – nejnižší teplota',
    checkFn: (f) => normalizeFormula(f) === 'MIN(B2:B8)',
    correctFormula: '=MIN(B2:B8)',
    expectedResult: '-5 °C',
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
  {
    funcId: 'MAX',
    desc: 'Najdi nejvyšší prodejní cenu produktu ve sloupci B. Výsledek vlož do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Produkt',    'Cena (Kč)'],
        ['2', 'Notebook',   '25990'],
        ['3', 'Tablet',     '8990'],
        ['4', 'Mobil',      '15990'],
        ['5', 'Sluchátka',  '3290'],
        ['6', 'Reproduktor','2190'],
        ['7', 'Myš',        '890'],
        ['8', 'Klávesnice', '1490'],
        ['9', 'Maximum',    '❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=MAX(B2:B8) – nejdražší produkt',
    checkFn: (f) => normalizeFormula(f) === 'MAX(B2:B8)',
    correctFormula: '=MAX(B2:B8)',
    expectedResult: '25 990 Kč',
  },
  {
    funcId: 'MAX',
    desc: 'Zjisti maximální počet diváků na zápase (C2:C7). Výsledek do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Zápas',      'Diváci'],
        ['2', 'Česko–Slovensko','18450'],
        ['3', 'Česko–Polsko','21200'],
        ['4', 'Česko–Německo','19580'],
        ['5', 'Česko–Rakousko','12340'],
        ['6', 'Česko–Maďarsko','16780'],
        ['7', 'Česko–Švédsko','20100'],
        ['8', 'Maximum',    '❓'],
      ],
    },
    answerCell: 'C8',
    hint: '=MAX(C2:C7) – nejvyšší návštěva',
    checkFn: (f) => normalizeFormula(f) === 'MAX(C2:C7)',
    correctFormula: '=MAX(C2:C7)',
    expectedResult: '21 200',
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
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik účastníků odevzdalo test (číselné skóre v C2:C10). Výsledek do C11.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Účastník','Skóre'],
        ['2', 'Jan',     '85'],
        ['3', 'Eva',     '92'],
        ['4', 'Petr',    '–'],
        ['5', 'Lucie',   '78'],
        ['6', 'Tomáš',   '–'],
        ['7', 'Klára',   '95'],
        ['8', 'Marek',   '–'],
        ['9', 'Ivana',   '88'],
        ['10','Radek',   '74'],
        ['11','Počet',   '❓'],
      ],
    },
    answerCell: 'C11',
    hint: '=COUNT(C2:C10) počítá jen číselné buňky',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(C2:C10)',
    correctFormula: '=COUNT(C2:C10)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik zakázek má přiřazenou cenu (číselné hodnoty v D2:D9). Výsledek do D10.',
    table: {
      headers: ['', 'C', 'D'],
      rows: [
        ['1', 'Zakázka',  'Cena (Kč)'],
        ['2', 'Z-001',    '15000'],
        ['3', 'Z-002',    ''],
        ['4', 'Z-003',    '8200'],
        ['5', 'Z-004',    ''],
        ['6', 'Z-005',    '23500'],
        ['7', 'Z-006',    '4100'],
        ['8', 'Z-007',    ''],
        ['9', 'Z-008',    '9700'],
        ['10','Počet',    '❓'],
      ],
    },
    answerCell: 'D10',
    hint: '=COUNT(D2:D9) – pouze buňky s číslem',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(D2:D9)',
    correctFormula: '=COUNT(D2:D9)',
    expectedResult: '5',
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
  {
    funcId: 'IF',
    desc: 'V buňce C2 napiš vzorec: Pokud je prodej v B2 alespoň 10000, napiš "Splněno", jinak "Nesplněno".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Prodejce', 'Prodej (Kč)', 'Status'],
        ['2', 'A. K.',    '12500',       '❓'],
        ['3', 'B. N.',    '8700',        ''],
        ['4', 'C. P.',    '11200',       ''],
        ['5', 'D. S.',    '9400',        ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(B2>=10000,"Splněno","Nesplněno")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2>=10000,"SPLNĚNO","NESPLNĚNO")',
    correctFormula: '=IF(B2>=10000,"Splněno","Nesplněno")',
    expectedResult: '"Splněno"',
  },
  {
    funcId: 'IF',
    desc: 'V buňce D2 rozhodni: Pokud je věk v C2 alespoň 18, napiš "Dospělý", jinak "Dítě".',
    table: {
      headers: ['', 'B', 'C', 'D'],
      rows: [
        ['1', 'Jméno', 'Věk', 'Kategorie'],
        ['2', 'Petr',  '22',  '❓'],
        ['3', 'Anna',  '16',  ''],
        ['4', 'Martin','19',  ''],
        ['5', 'Eva',   '14',  ''],
      ],
    },
    answerCell: 'D2',
    hint: '=IF(C2>=18,"Dospělý","Dítě")',
    checkFn: (f) => normalizeFormula(f) === 'IF(C2>=18,"DOSPĚLÝ","DÍTĚ")',
    correctFormula: '=IF(C2>=18,"Dospělý","Dítě")',
    expectedResult: '"Dospělý"',
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
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi telefonní číslo zaměstnance "Černá" (F2) v tabulce A2:C6. Telefon je ve 3. sloupci, přesná shoda.',
    table: {
      headers: ['', 'A', 'B', 'C', '', 'F', 'G'],
      rows: [
        ['1', 'Příjmení', 'Oddělení', 'Telefon',  '', 'Hledám:',  'Černá'],
        ['2', 'Novák',    'IT',       '774 123',  '', 'Telefon:',  '❓'],
        ['3', 'Černá',    'HR',       '775 456',  '', '',          ''],
        ['4', 'Procházka','IT',       '776 789',  '', '',          ''],
        ['5', 'Svobodová','Marketing','777 012',  '', '',          ''],
        ['6', 'Dvořák',   'HR',       '778 345',  '', '',          ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:C6,3,0) – hledej ve 3. sloupci tabulky',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:C6,3,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:C6,3,0)',
    correctFormula: '=VLOOKUP(F2,A2:C6,3,0)',
    expectedResult: '775 456',
  },
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi známku studenta "Novotný" (F2) v tabulce A2:B6. Známka je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Student',   'Známka', '', 'Hledám:', 'Novotný'],
        ['2', 'Novák',     '2',      '', 'Známka:', '❓'],
        ['3', 'Svobodová', '1',      '', '',        ''],
        ['4', 'Novotný',   '3',      '', '',        ''],
        ['5', 'Procházka', '2',      '', '',        ''],
        ['6', 'Černá',     '1',      '', '',        ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B6,2,0) – přesná shoda',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B6,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B6,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B6,2,0)',
    expectedResult: '3',
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
  {
    funcId: 'COUNTA',
    desc: 'Spočítej kolik produktů je skladem (má název ve sloupci A2:A9). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Produkt',    '❓'],
        ['2', 'Notebook',   ''],
        ['3', '',           ''],
        ['4', 'Tablet',     ''],
        ['5', 'Myš',        ''],
        ['6', '',           ''],
        ['7', 'Klávesnice', ''],
        ['8', 'Monitor',    ''],
        ['9', 'Reproduktor',''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A9) – počet vyplněných buněk',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A9)',
    correctFormula: '=COUNTA(A2:A9)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNTA',
    desc: 'Zjisti kolik hostů potvrdilo účast (jméno ve sloupci A2:A11). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Host',     '❓'],
        ['2', 'Petr K.',  ''],
        ['3', 'Jana S.',  ''],
        ['4', '',         ''],
        ['5', 'Tomáš M.', ''],
        ['6', 'Eva N.',   ''],
        ['7', '',         ''],
        ['8', '',         ''],
        ['9', 'Klára P.', ''],
        ['10','Lukáš R.', ''],
        ['11','Martina D.',''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A11) – neprázdné buňky',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A11)',
    correctFormula: '=COUNTA(A2:A11)',
    expectedResult: '7',
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
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik studentů mělo skóre alespoň 60 bodů (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Student', 'Skóre', 'Podmínka:', '>=60'],
        ['2', 'A. K.',   '85',    'Počet:',    '❓'],
        ['3', 'B. N.',   '42',    '',           ''],
        ['4', 'C. P.',   '73',    '',           ''],
        ['5', 'D. S.',   '38',    '',           ''],
        ['6', 'E. M.',   '91',    '',           ''],
        ['7', 'F. H.',   '55',    '',           ''],
        ['8', 'G. V.',   '68',    '',           ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,">=60") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,">=60")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,">=60")',
    expectedResult: '4',
  },
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik objednávek je ve stavu "Hotovo" (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Zakázka', 'Stav',    'Hledám:', 'Hotovo'],
        ['2', 'Z-001',   'Hotovo',  'Počet:',  '❓'],
        ['3', 'Z-002',   'Výroba',  '',         ''],
        ['4', 'Z-003',   'Hotovo',  '',         ''],
        ['5', 'Z-004',   'Čeká',    '',         ''],
        ['6', 'Z-005',   'Hotovo',  '',         ''],
        ['7', 'Z-006',   'Výroba',  '',         ''],
        ['8', 'Z-007',   'Hotovo',  '',         ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,"Hotovo") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"HOTOVO")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"Hotovo")',
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
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkové tržby za kategorii "Elektronika" (A2:A8) z tržeb v C2:C8.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Kategorie',  'Produkt',    'Tržba', 'Hledám:',   'Elektronika'],
        ['2', 'Elektronika','Notebook',   '45000', 'Součet:',   '❓'],
        ['3', 'Potraviny',  'Chléb',      '3200',  '',           ''],
        ['4', 'Elektronika','Mobil',      '22000', '',           ''],
        ['5', 'Oblečení',   'Tričko',     '4500',  '',           ''],
        ['6', 'Elektronika','Tablet',     '18000', '',           ''],
        ['7', 'Potraviny',  'Mléko',      '2800',  '',           ''],
        ['8', 'Elektronika','Sluchátka',  '5600',  '',           ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A8,"Elektronika",C2:C8) nebo =SUMIF(A2:A8,E1,C2:C8)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A8,"ELEKTRONIKA",C2:C8)' || normalizeFormula(f) === 'SUMIF(A2:A8,E1,C2:C8)',
    correctFormula: '=SUMIF(A2:A8,"Elektronika",C2:C8)',
    expectedResult: '90 600 Kč',
  },
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkový počet dnů dovolené pro oddělení "IT" (A2:A7) ze sloupce C2:C7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Oddělení', 'Zaměstnanec', 'Dny',     'Hledám:', 'IT'],
        ['2', 'IT',       'Novák',       '5',       'Součet:', '❓'],
        ['3', 'HR',       'Černá',       '3',       '',        ''],
        ['4', 'IT',       'Procházka',   '4',       '',        ''],
        ['5', 'Marketing', 'Svobodová',  '2',       '',        ''],
        ['6', 'IT',       'Dvořák',      '5',       '',        ''],
        ['7', 'HR',       'Beneš',       '4',       '',        ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A7,"IT",C2:C7) nebo =SUMIF(A2:A7,E1,C2:C7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"IT",C2:C7)' || normalizeFormula(f) === 'SUMIF(A2:A7,E1,C2:C7)',
    correctFormula: '=SUMIF(A2:A7,"IT",C2:C7)',
    expectedResult: '14 dnů',
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
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli hodnotu DPH z B2 (0.9357) na celé číslo (0 desetinných míst). Výsledek vlož do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Položka',  'Hodnota', 'Zaokrouhleno'],
        ['2', 'DPH koef.','0.9357',  '❓'],
        ['3', 'Sazba',    '0.2153',  ''],
        ['4', 'Přepočet', '1.0825',  ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,0) zaokrouhlí na celé číslo',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,0)',
    correctFormula: '=ROUND(B2,0)',
    expectedResult: '1',
  },
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli číslo pí z B2 (3.14159) na 3 desetinná místa. Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Konstanta', 'Hodnota', 'Zaokrouhleno'],
        ['2', 'Pí (π)',   '3.14159', '❓'],
        ['3', 'e',        '2.71828', ''],
        ['4', '√2',       '1.41421', ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,3) zaokrouhlí na 3 des. místa',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,3)',
    correctFormula: '=ROUND(B2,3)',
    expectedResult: '3,142',
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
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj název města (A2) a stát (B2) s čárkou a mezerou do C2. Výsledek: "Praha, Česko".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Město', 'Stát',  'Lokalita'],
        ['2', 'Praha', 'Česko', '❓'],
        ['3', 'Brno',  'Česko', ''],
        ['4', 'Liberec','Česko',''],
      ],
    },
    answerCell: 'C2',
    hint: '=CONCATENATE(A2,", ",B2) nebo =A2&", "&B2',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,", ",B2)' || normalizeFormula(f) === 'A2&", "&B2',
    correctFormula: '=CONCATENATE(A2,", ",B2)',
    expectedResult: '"Praha, Česko"',
  },
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj kód produktu (A2), pomlčku a barvu (B2) do C2. Výsledek: "NB-01-Černá".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Kód',    'Barva',  'Celkem'],
        ['2', 'NB-01',  'Černá',  '❓'],
        ['3', 'TB-02',  'Bílá',   ''],
        ['4', 'MB-03',  'Modrá',  ''],
      ],
    },
    answerCell: 'C2',
    hint: '=CONCATENATE(A2,"-",B2) nebo =A2&"-"&B2',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,"-",B2)' || normalizeFormula(f) === 'A2&"-"&B2',
    correctFormula: '=CONCATENATE(A2,"-",B2)',
    expectedResult: '"NB-01-Černá"',
  },
];

// ===== HELPERS =====
function normalizeFormula(raw) {
  return raw.trim().replace(/^=/, '').toUpperCase().replace(/\s+/g, '');
}

function setTeacherMood(elId, moodKey) {
  const el = document.getElementById(elId);
  if (!el) return;
  // swap mood border/glow class
  el.classList.remove(...Object.keys(MOODS).map(k => `mood-${k}`));
  el.classList.add(`mood-${moodKey}`);
  // swap image with fade
  let img = el.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.alt = moodKey;
    img.style.transition = 'opacity 0.15s';
    el.appendChild(img);
  }
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = MOOD_IMAGES[moodKey];
    img.style.opacity = '1';
  }, 150);
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
// Track last clicked index for Shift-range selection
let lastClickedIndex = -1;

function initHome() {
  const grid = document.getElementById('function-selector');
  grid.innerHTML = '';

  ALL_FUNCTIONS.forEach((fn, idx) => {
    const chip = document.createElement('button');
    chip.className = 'func-chip' + (state.selectedFuncs.includes(fn.id) ? ' selected' : '');
    chip.textContent = fn.label;
    chip.dataset.id = fn.id;
    chip.dataset.idx = idx;

    // Shift+hover: preview the range that would be selected
    chip.addEventListener('mouseenter', (e) => {
      if (!e.shiftKey || lastClickedIndex === -1) return;
      const chips = [...document.querySelectorAll('.func-chip')];
      const from = Math.min(lastClickedIndex, idx);
      const to   = Math.max(lastClickedIndex, idx);
      chips.forEach((c, i) => {
        c.classList.toggle('range-preview', i >= from && i <= to && !c.classList.contains('selected'));
      });
    });
    chip.addEventListener('mouseleave', () => {
      document.querySelectorAll('.func-chip.range-preview')
        .forEach(c => c.classList.remove('range-preview'));
    });

    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const chips = [...document.querySelectorAll('.func-chip')];
      const clickedIdx = parseInt(chip.dataset.idx);

      if (e.shiftKey && lastClickedIndex !== -1) {
        // === SHIFT: select range from last clicked to this ===
        const from = Math.min(lastClickedIndex, clickedIdx);
        const to   = Math.max(lastClickedIndex, clickedIdx);
        chips.forEach((c, i) => {
          if (i >= from && i <= to) {
            const fid = ALL_FUNCTIONS[i].id;
            if (!state.selectedFuncs.includes(fid)) {
              state.selectedFuncs.push(fid);
            }
            c.classList.add('selected');
            c.classList.remove('range-preview');
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

  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.diff === state.difficulty);
    btn.addEventListener('click', () => {
      state.difficulty = btn.dataset.diff;
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.toggle('active', b.dataset.diff === state.difficulty));
    });
  });

  document.getElementById('start-btn').addEventListener('click', startGame);
  setTeacherMood('home-teacher', 'medium');
  updateSpeechBubble();
}

function toggleFuncById(id, chip) {
  const idx = state.selectedFuncs.indexOf(id);
  if (idx === -1) {
    state.selectedFuncs.push(id);
    chip.classList.add('selected');
  } else {
    state.selectedFuncs.splice(idx, 1);
    chip.classList.remove('selected');
  }
}

function updateSpeechBubble() {
  const bubble = document.querySelector('.speech-bubble');
  if (!bubble) return;
  const n = state.selectedFuncs.length;
  if (n === 0) {
    bubble.textContent = 'Vyberte si funkce, které chcete procvičit, a pojďme na to!';
  } else if (n === 1) {
    bubble.textContent = `Vybrána 1 funkce. Připravuji příklady…`;
  } else {
    bubble.textContent = `Vybráno ${n} funkcí. Šikovný výběr – jdeme na to!`;
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
  initHome();

  // Difficulty buttons re-init (since initHome sets listeners)
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.difficulty = btn.dataset.diff;
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.toggle('active', b.dataset.diff === state.difficulty));
    });
  });
});
