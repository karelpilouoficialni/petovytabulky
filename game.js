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
  {
    funcId: 'SUM',
    desc: 'Sečti měsíční tržby za celý rok (B2:B13). Výsledek vlož do B14.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Měsíc', 'Tržba (Kč)'],
        ['2', 'Leden', '42000'],
        ['3', 'Únor',  '38500'],
        ['4', 'Březen','47100'],
        ['5', 'Duben', '43900'],
        ['6', 'Květen','51200'],
        ['7', 'Červen','49800'],
        ['8', 'Červenec','52300'],
        ['9', 'Srpen',  '54700'],
        ['10','Září',   '46100'],
        ['11','Říjen',  '43400'],
        ['12','Listopad','39800'],
        ['13','Prosinec','57200'],
        ['14','CELKEM', '❓'],
      ],
    },
    answerCell: 'B14',
    hint: '=SUM(B2:B13) – roční tržby',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B13)',
    correctFormula: '=SUM(B2:B13)',
    expectedResult: '566 000 Kč',
  },
  {
    funcId: 'SUM',
    desc: 'Vypočítej celkovou ujetou vzdálenost (B2:B7). Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Den',  'km'],
        ['2', 'Po',   '85'],
        ['3', 'Út',   '120'],
        ['4', 'St',   '95'],
        ['5', 'Čt',   '110'],
        ['6', 'Pá',   '75'],
        ['7', 'So',   '145'],
        ['8', 'CELKEM','❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=SUM(B2:B7) – celková vzdálenost',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B7)',
    correctFormula: '=SUM(B2:B7)',
    expectedResult: '630 km',
  },
  {
    funcId: 'SUM',
    desc: 'Sečti celkový počet odpracovaných hodin na projektu (B2:B9). Výsledek do B10.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Zaměstnanec', 'Hodiny'],
        ['2', 'Novák',       '152'],
        ['3', 'Černá',       '168'],
        ['4', 'Procházka',   '145'],
        ['5', 'Svobodová',   '172'],
        ['6', 'Dvořák',      '138'],
        ['7', 'Beneš',       '155'],
        ['8', 'Kovář',       '149'],
        ['9', 'Marek',       '163'],
        ['10','CELKEM',      '❓'],
      ],
    },
    answerCell: 'B10',
    hint: '=SUM(B2:B9) – celkový počet hodin',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B9)',
    correctFormula: '=SUM(B2:B9)',
    expectedResult: '1 242 h',
  },
  {
    funcId: 'SUM',
    desc: 'Vypočítej celkový kalorický příjem za den (B2:B7). Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Jídlo',     'Kalorie'],
        ['2', 'Snídaně',   '650'],
        ['3', 'Svačina',   '220'],
        ['4', 'Oběd',      '850'],
        ['5', 'Svačina',   '180'],
        ['6', 'Večeře',    '720'],
        ['7', 'Druhá večeře','310'],
        ['8', 'CELKEM',    '❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=SUM(B2:B7) – celkové kalorie',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B7)',
    correctFormula: '=SUM(B2:B7)',
    expectedResult: '2 930 kcal',
  },
  {
    funcId: 'SUM',
    desc: 'Sečti celkový počet hlasů ve volbách (B2:B7). Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Kandidát', 'Hlasy'],
        ['2', 'Novák',    '15200'],
        ['3', 'Černá',    '23100'],
        ['4', 'Procházka','18400'],
        ['5', 'Svobodová','9700'],
        ['6', 'Dvořák',   '12800'],
        ['7', 'Beneš',    '5600'],
        ['8', 'CELKEM',   '❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=SUM(B2:B7) – celkový počet hlasů',
    checkFn: (f) => normalizeFormula(f) === 'SUM(B2:B7)',
    correctFormula: '=SUM(B2:B7)',
    expectedResult: '84 800',
  },
  {
    funcId: 'SUM',
    desc: 'Vypočítej celkové náklady na kancelářské potřeby (C2:C7). Výsledek do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Položka',    'Cena (Kč)'],
        ['2', 'Papír A4',   '850'],
        ['3', 'Tonery',     '3200'],
        ['4', 'Sešívačky',  '450'],
        ['5', 'Propisky',   '620'],
        ['6', 'Lepicí pásky','280'],
        ['7', 'Desky',      '540'],
        ['8', 'CELKEM',     '❓'],
      ],
    },
    answerCell: 'C8',
    hint: '=SUM(C2:C7) – celkové náklady',
    checkFn: (f) => normalizeFormula(f) === 'SUM(C2:C7)',
    correctFormula: '=SUM(C2:C7)',
    expectedResult: '5 940 Kč',
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
  {
    funcId: 'AVERAGE',
    desc: 'Vypočítej průměrnou výšku hráčů basketbalu (B2:B7). Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Hráč',  'Výška (cm)'],
        ['2', 'Jan',   '195'],
        ['3', 'Petr',  '202'],
        ['4', 'Tomáš', '188'],
        ['5', 'Lukáš', '210'],
        ['6', 'David', '196'],
        ['7', 'Ondřej','204'],
        ['8', 'Průměr','❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=AVERAGE(B2:B7) – průměrná výška',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(B2:B7)',
    correctFormula: '=AVERAGE(B2:B7)',
    expectedResult: '199,17 cm',
  },
  {
    funcId: 'AVERAGE',
    desc: 'Spočítej průměrnou měsíční spotřebu elektřiny (B2:B8). Výsledek do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Měsíc', 'Spotřeba (kWh)'],
        ['2', 'Leden', '320'],
        ['3', 'Únor',  '280'],
        ['4', 'Březen','260'],
        ['5', 'Duben', '210'],
        ['6', 'Květen','190'],
        ['7', 'Červen','180'],
        ['8', 'Červenec','200'],
        ['9', 'Průměr','❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=AVERAGE(B2:B8) – průměrná spotřeba',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(B2:B8)',
    correctFormula: '=AVERAGE(B2:B8)',
    expectedResult: '234,29 kWh',
  },
  {
    funcId: 'AVERAGE',
    desc: 'Vypočítej průměrnou rychlost jízdy (B2:B6). Výsledek do B7.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Úsek',     'Rychlost (km/h)'],
        ['2', 'D1 km 0-50','68'],
        ['3', 'D1 km 50-100','72'],
        ['4', 'D1 km 100-150','65'],
        ['5', 'D1 km 150-200','71'],
        ['6', 'D1 km 200-250','69'],
        ['7', 'Průměr',   '❓'],
      ],
    },
    answerCell: 'B7',
    hint: '=AVERAGE(B2:B6) – průměrná rychlost',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(B2:B6)',
    correctFormula: '=AVERAGE(B2:B6)',
    expectedResult: '69 km/h',
  },
  {
    funcId: 'AVERAGE',
    desc: 'Spočítej průměrnou hodnotu nákupního košíku (C2:C7). Výsledek do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Zákazník', 'Nákup (Kč)'],
        ['2', 'Jan',      '850'],
        ['3', 'Eva',      '1240'],
        ['4', 'Petr',     '520'],
        ['5', 'Lucie',    '1980'],
        ['6', 'Tomáš',    '760'],
        ['7', 'Klára',    '1430'],
        ['8', 'Průměr',   '❓'],
      ],
    },
    answerCell: 'C8',
    hint: '=AVERAGE(C2:C7) – průměrný nákup',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(C2:C7)',
    correctFormula: '=AVERAGE(C2:C7)',
    expectedResult: '1 130 Kč',
  },
  {
    funcId: 'AVERAGE',
    desc: 'Vypočítej průměrnou mzdu zaměstnanců (B2:B8). Výsledek do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Zaměstnanec', 'Mzda (Kč)'],
        ['2', 'Novák',       '45000'],
        ['3', 'Černá',       '52000'],
        ['4', 'Procházka',   '38000'],
        ['5', 'Svobodová',   '47000'],
        ['6', 'Dvořák',      '55000'],
        ['7', 'Beneš',       '41000'],
        ['8', 'Kovář',       '49000'],
        ['9', 'Průměr',      '❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=AVERAGE(B2:B8) – průměrná mzda',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(B2:B8)',
    correctFormula: '=AVERAGE(B2:B8)',
    expectedResult: '46 714 Kč',
  },
  {
    funcId: 'AVERAGE',
    desc: 'Spočítej průměrnou denní návštěvnost (B2:B8). Výsledek do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Den',  'Návštěvníci'],
        ['2', 'Po',   '245'],
        ['3', 'Út',   '198'],
        ['4', 'St',   '312'],
        ['5', 'Čt',   '287'],
        ['6', 'Pá',   '423'],
        ['7', 'So',   '568'],
        ['8', 'Ne',   '489'],
        ['9', 'Průměr','❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=AVERAGE(B2:B8) – průměrná návštěvnost',
    checkFn: (f) => normalizeFormula(f) === 'AVERAGE(B2:B8)',
    correctFormula: '=AVERAGE(B2:B8)',
    expectedResult: '360,29',
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
  {
    funcId: 'MIN',
    desc: 'Najdi nejrychlejší čas v závodě (C2:C8, nejnižší číslo = nejrychlejší). Výsledek do C9.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Závodník', 'Čas (s)'],
        ['2', 'Tomáš',    '12.5'],
        ['3', 'Petr',     '11.8'],
        ['4', 'Lucie',    '13.2'],
        ['5', 'Eva',      '12.1'],
        ['6', 'Jan',      '14.0'],
        ['7', 'Klára',    '11.5'],
        ['8', 'Martin',   '12.8'],
        ['9', 'Minimum',  '❓'],
      ],
    },
    answerCell: 'C9',
    hint: '=MIN(C2:C8) – nejnižší čas (nejrychlejší)',
    checkFn: (f) => normalizeFormula(f) === 'MIN(C2:C8)',
    correctFormula: '=MIN(C2:C8)',
    expectedResult: '11,5 s',
  },
  {
    funcId: 'MIN',
    desc: 'Zjisti nejnižší skóre v testu (B2:B8). Výsledek do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Student', 'Skóre'],
        ['2', 'Adam',    '85'],
        ['3', 'Bára',    '42'],
        ['4', 'Cyril',   '73'],
        ['5', 'Dana',    '38'],
        ['6', 'Eva',     '91'],
        ['7', 'Filip',   '55'],
        ['8', 'Gábina',  '68'],
        ['9', 'Minimum', '❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=MIN(B2:B8) – nejnižší skóre',
    checkFn: (f) => normalizeFormula(f) === 'MIN(B2:B8)',
    correctFormula: '=MIN(B2:B8)',
    expectedResult: '38',
  },
  {
    funcId: 'MIN',
    desc: 'Najdi nejmenší velikost souboru v MB (B2:B7). Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Soubor',    'Velikost (MB)'],
        ['2', 'foto.jpg',  '4.2'],
        ['3', 'video.mp4', '850'],
        ['4', 'doc.pdf',   '2.1'],
        ['5', 'audio.mp3', '8.5'],
        ['6', 'data.xlsx', '0.8'],
        ['7', 'preze.pptx','15.3'],
        ['8', 'Minimum',   '❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=MIN(B2:B7) – nejmenší soubor',
    checkFn: (f) => normalizeFormula(f) === 'MIN(B2:B7)',
    correctFormula: '=MIN(B2:B7)',
    expectedResult: '0,8 MB',
  },
  {
    funcId: 'MIN',
    desc: 'Najdi nejnižší cenu v katalogu produktů (B2:B9). Výsledek do B10.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Produkt',    'Cena (Kč)'],
        ['2', 'Notebook',   '15990'],
        ['3', 'Myš',        '449'],
        ['4', 'Monitor',    '5290'],
        ['5', 'Klávesnice', '1090'],
        ['6', 'Sluchátka',  '1590'],
        ['7', 'Podložka',   '199'],
        ['8', 'Kabel USB',  '89'],
        ['9', 'Reproduktor','2190'],
        ['10','Minimum',    '❓'],
      ],
    },
    answerCell: 'B10',
    hint: '=MIN(B2:B9) – nejlevnější produkt',
    checkFn: (f) => normalizeFormula(f) === 'MIN(B2:B9)',
    correctFormula: '=MIN(B2:B9)',
    expectedResult: '89 Kč',
  },
  {
    funcId: 'MIN',
    desc: 'Zjisti minimální věk účastníka kurzu (B2:B8). Výsledek do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Účastník', 'Věk'],
        ['2', 'Jan',      '25'],
        ['3', 'Eva',      '22'],
        ['4', 'Petr',     '31'],
        ['5', 'Lucie',    '19'],
        ['6', 'Tomáš',    '28'],
        ['7', 'Klára',    '24'],
        ['8', 'Martin',   '35'],
        ['9', 'Minimum',  '❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=MIN(B2:B8) – nejnižší věk',
    checkFn: (f) => normalizeFormula(f) === 'MIN(B2:B8)',
    correctFormula: '=MIN(B2:B8)',
    expectedResult: '19',
  },
  {
    funcId: 'MIN',
    desc: 'Najdi nejmenší objednané množství (B2:B8). Výsledek do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Položka',  'Množství'],
        ['2', 'Notebook', '5'],
        ['3', 'Myš',      '25'],
        ['4', 'Monitor',  '3'],
        ['5', 'Klávesnice','15'],
        ['6', 'Tablet',   '8'],
        ['7', 'Tiskárna', '2'],
        ['8', 'Router',   '12'],
        ['9', 'Minimum',  '❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=MIN(B2:B8) – nejmenší množství',
    checkFn: (f) => normalizeFormula(f) === 'MIN(B2:B8)',
    correctFormula: '=MIN(B2:B8)',
    expectedResult: '2',
  },
  {
    funcId: 'MIN',
    desc: 'Zjisti minimální rozpočet projektu (C2:C7). Výsledek do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Projekt', 'Rozpočet (Kč)'],
        ['2', 'Alfa',    '150000'],
        ['3', 'Beta',    '250000'],
        ['4', 'Gama',    '80000'],
        ['5', 'Delta',   '320000'],
        ['6', 'Epsilon', '95000'],
        ['7', 'Zeta',    '210000'],
        ['8', 'Minimum', '❓'],
      ],
    },
    answerCell: 'C8',
    hint: '=MIN(C2:C7) – nejnižší rozpočet',
    checkFn: (f) => normalizeFormula(f) === 'MIN(C2:C7)',
    correctFormula: '=MIN(C2:C7)',
    expectedResult: '80 000 Kč',
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
  {
    funcId: 'MAX',
    desc: 'Zjisti nejvyšší teplotu naměřenou v týdnu (B2:B8). Výsledek vlož do B9.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Den', 'Teplota (°C)'],
        ['2', 'Po',  '28'],
        ['3', 'Út',  '31'],
        ['4', 'St',  '29'],
        ['5', 'Čt',  '33'],
        ['6', 'Pá',  '30'],
        ['7', 'So',  '27'],
        ['8', 'Ne',  '32'],
        ['9', 'Maximum', '❓'],
      ],
    },
    answerCell: 'B9',
    hint: '=MAX(B2:B8) – nejvyšší teplota',
    checkFn: (f) => normalizeFormula(f) === 'MAX(B2:B8)',
    correctFormula: '=MAX(B2:B8)',
    expectedResult: '33 °C',
  },
  {
    funcId: 'MAX',
    desc: 'Najdi nejdelší řeku v tabulce podle délky (B2:B7). Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Řeka',    'Délka (km)'],
        ['2', 'Vltava',  '430'],
        ['3', 'Labe',    '1154'],
        ['4', 'Morava',  '353'],
        ['5', 'Odra',    '855'],
        ['6', 'Berounka','139'],
        ['7', 'Sázava',  '225'],
        ['8', 'Maximum', '❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=MAX(B2:B7) – nejdelší řeka',
    checkFn: (f) => normalizeFormula(f) === 'MAX(B2:B7)',
    correctFormula: '=MAX(B2:B7)',
    expectedResult: '1 154 km',
  },
  {
    funcId: 'MAX',
    desc: 'Zjisti nejvyšší tepovou frekvenci během cvičení (C2:C8). Výsledek do C9.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Minuta', 'Tep (bpm)'],
        ['2', '1',      '72'],
        ['3', '5',      '118'],
        ['4', '10',     '145'],
        ['5', '15',     '162'],
        ['6', '20',     '158'],
        ['7', '25',     '170'],
        ['8', '30',     '165'],
        ['9', 'Maximum','❓'],
      ],
    },
    answerCell: 'C9',
    hint: '=MAX(C2:C8) – max. tepová frekvence',
    checkFn: (f) => normalizeFormula(f) === 'MAX(C2:C8)',
    correctFormula: '=MAX(C2:C8)',
    expectedResult: '170 bpm',
  },
  {
    funcId: 'MAX',
    desc: 'Najdi nejvyšší horu podle nadmořské výšky (B2:B7). Výsledek do B8.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Hora',     'Výška (m n.m.)'],
        ['2', 'Sněžka',   '1603'],
        ['3', 'Luční hora','1555'],
        ['4', 'Praděd',   '1491'],
        ['5', 'Kralický Sněžník','1424'],
        ['6', 'Klínovec', '1244'],
        ['7', 'Radhošť', '1129'],
        ['8', 'Maximum',  '❓'],
      ],
    },
    answerCell: 'B8',
    hint: '=MAX(B2:B7) – nejvyšší hora',
    checkFn: (f) => normalizeFormula(f) === 'MAX(B2:B7)',
    correctFormula: '=MAX(B2:B7)',
    expectedResult: '1 603 m',
  },
  {
    funcId: 'MAX',
    desc: 'Zjisti největší rozpočet projektu (C2:C7). Výsledek do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Projekt', 'Rozpočet (Kč)'],
        ['2', 'Alfa',    '150000'],
        ['3', 'Beta',    '250000'],
        ['4', 'Gama',    '180000'],
        ['5', 'Delta',   '320000'],
        ['6', 'Epsilon', '95000'],
        ['7', 'Zeta',    '210000'],
        ['8', 'Maximum', '❓'],
      ],
    },
    answerCell: 'C8',
    hint: '=MAX(C2:C7) – nejvyšší rozpočet',
    checkFn: (f) => normalizeFormula(f) === 'MAX(C2:C7)',
    correctFormula: '=MAX(C2:C7)',
    expectedResult: '320 000 Kč',
  },
  {
    funcId: 'MAX',
    desc: 'Najdi nejrychlejší kolo závodu (C2:C8). Výsledek do C9.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Jezdec',  'Čas kola (s)'],
        ['2', 'Verstappen','72.4'],
        ['3', 'Hamilton',  '71.8'],
        ['4', 'Leclerc',   '73.1'],
        ['5', 'Norris',    '72.9'],
        ['6', 'Sainz',     '72.6'],
        ['7', 'Russell',   '73.4'],
        ['8', 'Pérez',     '72.1'],
        ['9', 'Maximum',   '❓'],
      ],
    },
    answerCell: 'C9',
    hint: '=MAX(C2:C8) – nejrychlejší kolo (nejvyšší už je pomalejší, tady hledáme max číslo)',
    checkFn: (f) => normalizeFormula(f) === 'MAX(C2:C8)',
    correctFormula: '=MAX(C2:C8)',
    expectedResult: '73,4 s',
  },
  {
    funcId: 'MAX',
    desc: 'Zjisti kolik maximálně lidí se vešlo na koncert (C2:C7). Výsledek do C8.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Koncert',    'Návštěvnost'],
        ['2', 'Praha',      '18500'],
        ['3', 'Brno',       '12500'],
        ['4', 'Ostrava',    '9800'],
        ['5', 'Plzeň',      '7200'],
        ['6', 'Liberec',    '5400'],
        ['7', 'Č. Budějovice','6100'],
        ['8', 'Maximum',    '❓'],
      ],
    },
    answerCell: 'C8',
    hint: '=MAX(C2:C7) – max. návštěvnost',
    checkFn: (f) => normalizeFormula(f) === 'MAX(C2:C7)',
    correctFormula: '=MAX(C2:C7)',
    expectedResult: '18 500',
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
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik studentů odevzdalo domácí úkol (A2:A9, číselné hodnocení). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Student', '❓'],
        ['2', '85',      ''],
        ['3', '92',      ''],
        ['4', '–',       ''],
        ['5', '78',      ''],
        ['6', '–',       ''],
        ['7', '95',      ''],
        ['8', '88',      ''],
        ['9', '74',      ''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNT(A2:A9) – počítá pouze čísla',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(A2:A9)',
    correctFormula: '=COUNT(A2:A9)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik objednávek má vyplněné množství (číselné hodnoty v B2:B10). Výsledek do B11.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Objednávka', 'Množství'],
        ['2', 'OBJ-001',    '5'],
        ['3', 'OBJ-002',    ''],
        ['4', 'OBJ-003',    '12'],
        ['5', 'OBJ-004',    '3'],
        ['6', 'OBJ-005',    ''],
        ['7', 'OBJ-006',    '8'],
        ['8', 'OBJ-007',    ''],
        ['9', 'OBJ-008',    '15'],
        ['10','OBJ-009',    '7'],
        ['11','Počet',      '❓'],
      ],
    },
    answerCell: 'B11',
    hint: '=COUNT(B2:B10) – objednávky s číslem',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(B2:B10)',
    correctFormula: '=COUNT(B2:B10)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik závodníků má změřený čas (C2:C9, číselné hodnoty). Výsledek do C10.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Závodník', 'Čas (min)'],
        ['2', 'Tomáš',    '15.2'],
        ['3', 'Eva',      '18.7'],
        ['4', 'Petr',     '–'],
        ['5', 'Lucie',    '16.4'],
        ['6', 'Martin',   '–'],
        ['7', 'Klára',    '19.1'],
        ['8', 'Jan',      '14.8'],
        ['9', 'Hana',     '17.5'],
        ['10','Počet',    '❓'],
      ],
    },
    answerCell: 'C10',
    hint: '=COUNT(C2:C9) – jen změřené časy',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(C2:C9)',
    correctFormula: '=COUNT(C2:C9)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik výrobků má evidovanou hmotnost (číselné hodnoty v D2:D9). Výsledek do D10.',
    table: {
      headers: ['', 'C', 'D'],
      rows: [
        ['1', 'Výrobek', 'Hmotnost (g)'],
        ['2', 'V-001',   '250'],
        ['3', 'V-002',   ''],
        ['4', 'V-003',   '180'],
        ['5', 'V-004',   ''],
        ['6', 'V-005',   '320'],
        ['7', 'V-006',   '450'],
        ['8', 'V-007',   ''],
        ['9', 'V-008',   '150'],
        ['10','Počet',   '❓'],
      ],
    },
    answerCell: 'D10',
    hint: '=COUNT(D2:D9) – výrobky s hmotností',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(D2:D9)',
    correctFormula: '=COUNT(D2:D9)',
    expectedResult: '5',
  },
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik zaměstnanců má vyplněný plat (B2:B9, číselné hodnoty). Výsledek do B10.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Zaměstnanec', 'Plat (Kč)'],
        ['2', 'Novák',       '45000'],
        ['3', 'Černá',       ''],
        ['4', 'Procházka',   '52000'],
        ['5', 'Dvořák',      '38000'],
        ['6', 'Svobodová',   ''],
        ['7', 'Beneš',       '47000'],
        ['8', 'Kovář',       ''],
        ['9', 'Marek',       '41000'],
        ['10','Počet',       '❓'],
      ],
    },
    answerCell: 'B10',
    hint: '=COUNT(B2:B9) – zaměstnanci s platem',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(B2:B9)',
    correctFormula: '=COUNT(B2:B9)',
    expectedResult: '5',
  },
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik vozidel má najeté kilometry (číselné hodnoty v C2:C9). Výsledek do C10.',
    table: {
      headers: ['', 'B', 'C'],
      rows: [
        ['1', 'Vozidlo', 'Najeto (km)'],
        ['2', '1H5 1234','85200'],
        ['3', '2A7 5678',''],
        ['4', '3B9 9012','124500'],
        ['5', '4C1 3456','65300'],
        ['6', '5D3 7890',''],
        ['7', '6E5 1234','98700'],
        ['8', '7F7 5678',''],
        ['9', '8G9 9012','71200'],
        ['10','Počet',   '❓'],
      ],
    },
    answerCell: 'C10',
    hint: '=COUNT(C2:C9) – vozidla s kilometry',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(C2:C9)',
    correctFormula: '=COUNT(C2:C9)',
    expectedResult: '5',
  },
  {
    funcId: 'COUNT',
    desc: 'Spočítej kolik faktur má zapsanou částku (číselné hodnoty v B2:B9). Výsledek do B10.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Faktura', 'Částka (Kč)'],
        ['2', 'FV-001',  '12500'],
        ['3', 'FV-002',  ''],
        ['4', 'FV-003',  '8900'],
        ['5', 'FV-004',  '15600'],
        ['6', 'FV-005',  ''],
        ['7', 'FV-006',  '7200'],
        ['8', 'FV-007',  '23200'],
        ['9', 'FV-008',  ''],
        ['10','Počet',   '❓'],
      ],
    },
    answerCell: 'B10',
    hint: '=COUNT(B2:B9) – faktury s částkou',
    checkFn: (f) => normalizeFormula(f) === 'COUNT(B2:B9)',
    correctFormula: '=COUNT(B2:B9)',
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
  {
    funcId: 'IF',
    desc: 'V buňce C2 napiš: Pokud je teplota v B2 větší než 30, napiš "Horko", jinak "Normál".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Město', 'Teplota (°C)', 'Stav'],
        ['2', 'Praha', '32',           '❓'],
        ['3', 'Brno',  '28',           ''],
        ['4', 'Plzeň', '35',           ''],
        ['5', 'Ostrava','25',          ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(B2>30,"Horko","Normál")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2>30,"HORKO","NORMÁL")',
    correctFormula: '=IF(B2>30,"Horko","Normál")',
    expectedResult: '"Horko"',
  },
  {
    funcId: 'IF',
    desc: 'V buňce C2 rozhodni: Pokud váha v B2 >= 100, napiš "Těžká", jinak "Lehká".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Zásilka', 'Váha (kg)', 'Kategorie'],
        ['2', 'Z-001',   '120',       '❓'],
        ['3', 'Z-002',   '45',        ''],
        ['4', 'Z-003',   '98',        ''],
        ['5', 'Z-004',   '150',       ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(B2>=100,"Těžká","Lehká")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2>=100,"TĚŽKÁ","LEHKÁ")',
    correctFormula: '=IF(B2>=100,"Těžká","Lehká")',
    expectedResult: '"Těžká"',
  },
  {
    funcId: 'IF',
    desc: 'V buňce C2 napiš: Pokud je rychlost v B2 větší než 130, napiš "Pokuta", jinak "V pořádku".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Jméno',  'Rychlost (km/h)', 'Výsledek'],
        ['2', 'Petr',   '145',             '❓'],
        ['3', 'Eva',    '118',             ''],
        ['4', 'Tomáš',  '96',              ''],
        ['5', 'Klára',  '132',             ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(B2>130,"Pokuta","V pořádku")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2>130,"POKUTA","V POŘÁDKU")',
    correctFormula: '=IF(B2>130,"Pokuta","V pořádku")',
    expectedResult: '"Pokuta"',
  },
  {
    funcId: 'IF',
    desc: 'V buňce C2 napiš: Pokud je skóre v B2 >= 70, napiš "Prospěl", jinak "Neprospěl".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Student', 'Skóre', 'Výsledek'],
        ['2', 'Adam',    '85',    '❓'],
        ['3', 'Bára',    '62',    ''],
        ['4', 'Cyril',   '45',    ''],
        ['5', 'Dana',    '91',    ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(B2>=70,"Prospěl","Neprospěl")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2>=70,"PROSPĚL","NEPROSPĚL")',
    correctFormula: '=IF(B2>=70,"Prospěl","Neprospěl")',
    expectedResult: '"Prospěl"',
  },
  {
    funcId: 'IF',
    desc: 'V buňce C2 napiš: Pokud je známka v B2 = 1, napiš "Výborný", jinak "Nevýborný".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Student', 'Známka', 'Hodnocení'],
        ['2', 'Jan',     '1',      '❓'],
        ['3', 'Eva',     '3',      ''],
        ['4', 'Petr',    '1',      ''],
        ['5', 'Lucie',   '2',      ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(B2=1,"Výborný","Nevýborný")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2=1,"VÝBORNÝ","NEVÝBORNÝ")',
    correctFormula: '=IF(B2=1,"Výborný","Nevýborný")',
    expectedResult: '"Výborný"',
  },
  {
    funcId: 'IF',
    desc: 'V buňce C2 napiš: Pokud je prodej v B2 >= 50000, napiš "Bonus", jinak "Bez bonusu".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Prodejce', 'Tržba (Kč)', 'Výsledek'],
        ['2', 'Kovář',    '65000',      '❓'],
        ['3', 'Beneš',    '32000',      ''],
        ['4', 'Černá',    '48000',      ''],
        ['5', 'Novák',    '72000',      ''],
      ],
    },
    answerCell: 'C2',
    hint: '=IF(B2>=50000,"Bonus","Bez bonusu")',
    checkFn: (f) => normalizeFormula(f) === 'IF(B2>=50000,"BONUS","BEZ BONUSU")',
    correctFormula: '=IF(B2>=50000,"Bonus","Bez bonusu")',
    expectedResult: '"Bonus"',
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
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi oddělení zaměstnance "Procházka" (F2) v tabulce A2:B7. Oddělení je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Příjmení', 'Oddělení', '', 'Hledám:', 'Procházka'],
        ['2', 'Novák',    'IT',       '', 'Odděl.:', '❓'],
        ['3', 'Černá',    'HR',       '', '',         ''],
        ['4', 'Dvořák',   'Finance',  '', '',         ''],
        ['5', 'Procházka','Marketing','', '',         ''],
        ['6', 'Svoboda',  'IT',       '', '',         ''],
        ['7', 'Beneš',    'HR',       '', '',         ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B7,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B7,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B7,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B7,2,0)',
    expectedResult: 'Marketing',
  },
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi cenu knihy "Nemesis" (F2) v tabulce A2:B6. Cena je ve 2. sloupci, přesná shoda.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Název',         'Cena', '', 'Hledám:', 'Nemesis'],
        ['2', 'Pyramida',      '349',  '', 'Cena:',   '❓'],
        ['3', 'Nemesis',       '279',  '', '',         ''],
        ['4', 'Ztracený symbol','399', '', '',         ''],
        ['5', 'Pravda',        '329',  '', '',         ''],
        ['6', 'Andělé a démoni','299', '', '',         ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B6,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B6,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B6,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B6,2,0)',
    expectedResult: '279 Kč',
  },
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi manažera pro region "Východ" (F2) v tabulce A2:B5. Manažer je ve 2. sloupci.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Region',  'Manažer',  '', 'Hledám:',  'Východ'],
        ['2', 'Sever',   'Kovář',    '', 'Manažer:', '❓'],
        ['3', 'Jih',     'Beneš',    '', '',          ''],
        ['4', 'Východ',  'Nováková', '', '',          ''],
        ['5', 'Západ',   'Černý',    '', '',          ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B5,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B5,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B5,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B5,2,0)',
    expectedResult: 'Nováková',
  },
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi skóre hráče "Martin" (F2) v tabulce A2:B7. Skóre je ve 2. sloupci.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Hráč',  'Skóre', '', 'Hledám:','Martin'],
        ['2', 'Tomáš', '4200',  '', 'Skóre:', '❓'],
        ['3', 'Petra', '5800',  '', '',        ''],
        ['4', 'Ondřej','3900',  '', '',        ''],
        ['5', 'Lucie', '6100',  '', '',        ''],
        ['6', 'Martin','5500',  '', '',        ''],
        ['7', 'Eva',   '4750',  '', '',        ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B7,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B7,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B7,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B7,2,0)',
    expectedResult: '5 500',
  },
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi dodavatele materiálu "OC-022" (F2) v tabulce A2:B5. Dodavatel je ve 2. sloupci.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Kód mat.', 'Dodavatel', '', 'Hledám:', 'OC-022'],
        ['2', 'OC-001',   'Ferona',    '', 'Dodav.:', '❓'],
        ['3', 'OC-022',   'Ferona',    '', '',         ''],
        ['4', 'PL-005',   'Plastcomp', '', '',         ''],
        ['5', 'RU-100',   'Rubberco',  '', '',         ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B5,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B5,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B5,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B5,2,0)',
    expectedResult: 'Ferona',
  },
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi počet obyvatel města "Brno" (F2) v tabulce A2:B5. Počet je ve 2. sloupci.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Město',  'Obyvatel', '', 'Hledám:', 'Brno'],
        ['2', 'Praha',  '1300000',  '', 'Počet:',  '❓'],
        ['3', 'Brno',   '380000',   '', '',         ''],
        ['4', 'Ostrava','280000',   '', '',         ''],
        ['5', 'Plzeň',  '170000',   '', '',         ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B5,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B5,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B5,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B5,2,0)',
    expectedResult: '380 000',
  },
  {
    funcId: 'VLOOKUP',
    desc: 'V buňce G2 najdi skladové množství produktu "M-03" (F2) v tabulce A2:B6. Množství je ve 2. sloupci.',
    table: {
      headers: ['', 'A', 'B', '', 'F', 'G'],
      rows: [
        ['1', 'Kód',  'Skladem', '', 'Hledám:','M-03'],
        ['2', 'N-01', '15',      '', 'Ks:',    '❓'],
        ['3', 'T-02', '8',       '', '',        ''],
        ['4', 'M-03', '42',      '', '',        ''],
        ['5', 'K-04', '25',      '', '',        ''],
        ['6', 'D-05', '3',       '', '',        ''],
      ],
    },
    answerCell: 'G2',
    hint: '=VLOOKUP(F2,A2:B6,2,0)',
    checkFn: (f) => normalizeFormula(f) === 'VLOOKUP(F2,A2:B6,2,0)' || normalizeFormula(f) === 'VLOOKUP(F2,A1:B6,2,0)',
    correctFormula: '=VLOOKUP(F2,A2:B6,2,0)',
    expectedResult: '42',
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
  {
    funcId: 'COUNTA',
    desc: 'Spočítej kolik e-mailových adres je zadáno v seznamu (A2:A9). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'E-mail',            '❓'],
        ['2', 'novak@firma.cz',    ''],
        ['3', '',                  ''],
        ['4', 'cerna@firma.cz',    ''],
        ['5', 'prochazka@firma.cz',''],
        ['6', '',                  ''],
        ['7', 'dvorak@firma.cz',   ''],
        ['8', '',                  ''],
        ['9', 'svoboda@firma.cz',  ''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A9) – počet vyplněných e-mailů',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A9)',
    correctFormula: '=COUNTA(A2:A9)',
    expectedResult: '5',
  },
  {
    funcId: 'COUNTA',
    desc: 'Zjisti kolik členů klubu vyplnilo přihlášku (text v A2:A10). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Člen',    '❓'],
        ['2', 'Jan N.',  ''],
        ['3', 'Eva Č.',  ''],
        ['4', '',        ''],
        ['5', 'Petr P.', ''],
        ['6', 'Lucie S.',''],
        ['7', '',        ''],
        ['8', 'Tomáš K.', ''],
        ['9', '',        ''],
        ['10','Klára M.',''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A10) – počet přihlášených členů',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A10)',
    correctFormula: '=COUNTA(A2:A10)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNTA',
    desc: 'Spočítej kolik položek je na skladě (A2:A10, vyplněný název). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Položka',    '❓'],
        ['2', 'Papír A4',   ''],
        ['3', 'Tonery',     ''],
        ['4', 'Sešívačky',  ''],
        ['5', '',           ''],
        ['6', 'Lepicí pásky',''],
        ['7', 'Kancelářský nůž', ''],
        ['8', '',           ''],
        ['9', 'Nůžky',      ''],
        ['10','Razítka',    ''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A10) – skladové položky s názvem',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A10)',
    correctFormula: '=COUNTA(A2:A10)',
    expectedResult: '7',
  },
  {
    funcId: 'COUNTA',
    desc: 'Spočítej kolik respondentů vyplnilo anketu (text ve sloupci A2:A9). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Respondent', '❓'],
        ['2', 'Ano',        ''],
        ['3', 'Ano',        ''],
        ['4', '',           ''],
        ['5', 'Ano',        ''],
        ['6', '',           ''],
        ['7', 'Ne',         ''],
        ['8', 'Ano',        ''],
        ['9', '',           ''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A9) – počet odpovědí v anketě',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A9)',
    correctFormula: '=COUNTA(A2:A9)',
    expectedResult: '5',
  },
  {
    funcId: 'COUNTA',
    desc: 'Zjisti kolik knih je zapsáno v knihovním katalogu (A2:A10). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Název knihy',      '❓'],
        ['2', 'Pyramida',          ''],
        ['3', 'Nemesis',           ''],
        ['4', '',                  ''],
        ['5', 'Ztracený symbol',   ''],
        ['6', 'Ďáblova čísla',     ''],
        ['7', '',                  ''],
        ['8', 'Pravda',            ''],
        ['9', '',                  ''],
        ['10','Andělé a démoni',   ''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A10) – knihy v katalogu',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A10)',
    correctFormula: '=COUNTA(A2:A10)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNTA',
    desc: 'Spočítej kolik studentů se zúčastnilo exkurze (jméno v A2:A9). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Student',  '❓'],
        ['2', 'Adam',     ''],
        ['3', 'Bára',     ''],
        ['4', 'Cyril',    ''],
        ['5', '',         ''],
        ['6', 'Eva',      ''],
        ['7', '',         ''],
        ['8', 'Gustav',   ''],
        ['9', 'Hana',     ''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A9) – účastníci exkurze',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A9)',
    correctFormula: '=COUNTA(A2:A9)',
    expectedResult: '6',
  },
  {
    funcId: 'COUNTA',
    desc: 'Zjisti kolik aktivních uživatelů je v databázi (login v A2:A9). Výsledek do B1.',
    table: {
      headers: ['', 'A', 'B'],
      rows: [
        ['1', 'Login',  '❓'],
        ['2', 'jann',   ''],
        ['3', 'evac',   ''],
        ['4', '',       ''],
        ['5', 'petrp',  ''],
        ['6', 'lucies', ''],
        ['7', '',       ''],
        ['8', 'tomas',  ''],
        ['9', '',       ''],
      ],
    },
    answerCell: 'B1',
    hint: '=COUNTA(A2:A9) – aktivní uživatelé',
    checkFn: (f) => normalizeFormula(f) === 'COUNTA(A2:A9)',
    correctFormula: '=COUNTA(A2:A9)',
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
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik mužů je v seznamu (B2:B8, hodnota="Muž").',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Jméno',  'Pohlaví', 'Hledám:', 'Muž'],
        ['2', 'Jan',    'Muž',     'Počet:',  '❓'],
        ['3', 'Eva',    'Žena',    '',         ''],
        ['4', 'Petr',   'Muž',     '',         ''],
        ['5', 'Lucie',  'Žena',    '',         ''],
        ['6', 'Tomáš',  'Muž',     '',         ''],
        ['7', 'Klára',  'Žena',    '',         ''],
        ['8', 'Martin', 'Muž',     '',         ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,"Muž") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"MUŽ")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"Muž")',
    expectedResult: '4',
  },
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik produktů stojí přes 1000 Kč (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Produkt',  'Cena (Kč)','Podmínka:', '>1000'],
        ['2', 'Notebook', '25990',    'Počet:',    '❓'],
        ['3', 'Myš',      '890',      '',           ''],
        ['4', 'Monitor',  '5990',     '',           ''],
        ['5', 'Tričko',   '450',      '',           ''],
        ['6', 'Tablet',   '8990',     '',           ''],
        ['7', 'Čepice',   '149',      '',           ''],
        ['8', 'Klávesnice','1490',    '',           ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,">1000") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,">1000")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,">1000")',
    expectedResult: '4',
  },
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik studentů bydlí v "Praha" (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Student', 'Město',  'Hledám:', 'Praha'],
        ['2', 'Jan N.',  'Praha',  'Počet:',  '❓'],
        ['3', 'Eva Č.',  'Brno',   '',         ''],
        ['4', 'Petr P.', 'Praha',  '',         ''],
        ['5', 'Lucie S.','Plzeň',  '',         ''],
        ['6', 'Tomáš K.','Praha',  '',         ''],
        ['7', 'Klára M.','Brno',   '',         ''],
        ['8', 'Martin D.','Praha', '',         ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,"Praha") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"PRAHA")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"Praha")',
    expectedResult: '4',
  },
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik projektů má status "Dokončeno" (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Projekt', 'Status',      'Hledám:', 'Dokončeno'],
        ['2', 'Proj A',  'Dokončeno',   'Počet:',  '❓'],
        ['3', 'Proj B',  'Probíhá',     '',         ''],
        ['4', 'Proj C',  'Dokončeno',   '',         ''],
        ['5', 'Proj D',  'Zrušeno',     '',         ''],
        ['6', 'Proj E',  'Dokončeno',   '',         ''],
        ['7', 'Proj F',  'Probíhá',     '',         ''],
        ['8', 'Proj G',  'Dokončeno',   '',         ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,"Dokončeno") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"DOKONČENO")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"Dokončeno")',
    expectedResult: '4',
  },
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik studentů mělo skóre méně než 50 (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Student', 'Skóre', 'Podmínka:','<50'],
        ['2', 'Adam',    '85',    'Počet:',   '❓'],
        ['3', 'Bára',    '42',    '',          ''],
        ['4', 'Cyril',   '73',    '',          ''],
        ['5', 'Dana',    '38',    '',          ''],
        ['6', 'Eva',     '91',    '',          ''],
        ['7', 'Filip',   '55',    '',          ''],
        ['8', 'Gábina',  '28',    '',          ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,"<50") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"<50")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"<50")',
    expectedResult: '3',
  },
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik zaměstnanců je z oddělení "IT" (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Jméno',  'Oddělení', 'Hledám:', 'IT'],
        ['2', 'Novák',  'IT',       'Počet:',  '❓'],
        ['3', 'Černá',  'HR',       '',         ''],
        ['4', 'Procházka','IT',     '',         ''],
        ['5', 'Dvořák', 'Finance',  '',         ''],
        ['6', 'Svoboda','IT',       '',         ''],
        ['7', 'Beneš',  'HR',       '',         ''],
        ['8', 'Kovář',  'IT',       '',         ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,"IT") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"IT")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"IT")',
    expectedResult: '4',
  },
  {
    funcId: 'COUNTIF',
    desc: 'V buňce D2 spočítej kolik výrobků má hodnocení "A" (B2:B8).',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Výrobek', 'Třída', 'Hledám:','A'],
        ['2', 'V-001',   'A',     'Počet:', '❓'],
        ['3', 'V-002',   'B',     '',        ''],
        ['4', 'V-003',   'A',     '',        ''],
        ['5', 'V-004',   'C',     '',        ''],
        ['6', 'V-005',   'A',     '',        ''],
        ['7', 'V-006',   'B',     '',        ''],
        ['8', 'V-007',   'A',     '',        ''],
      ],
    },
    answerCell: 'D2',
    hint: '=COUNTIF(B2:B8,"A") nebo =COUNTIF(B2:B8,D1)',
    checkFn: (f) => normalizeFormula(f) === 'COUNTIF(B2:B8,"A")' || normalizeFormula(f) === 'COUNTIF(B2:B8,D1)',
    correctFormula: '=COUNTIF(B2:B8,"A")',
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
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkový objem objednávek pro prodejce "Kovář" (A2:A7) z D2:D7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Prodejce', 'Zákazník', 'Město',  'Objem', 'Hledám:', 'Kovář'],
        ['2', 'Kovář',    'ABC s.r.o.','Praha',  '15000', 'Součet:', '❓'],
        ['3', 'Beneš',    'XYZ a.s.',  'Brno',   '22000', '',        ''],
        ['4', 'Kovář',    'LMN v.o.s.','Ostrava','18000', '',        ''],
        ['5', 'Nováková', 'DEF s.r.o.','Plzeň',  '12000', '',        ''],
        ['6', 'Kovář',    'GHI a.s.',  'Praha',  '25000', '',        ''],
        ['7', 'Beneš',    'JKL s.r.o.','Liberec','9000',  '',        ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A7,E1,D2:D7) – součet objemů pro "Kovář"',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,E1,D2:D7)' || normalizeFormula(f) === 'SUMIF(A2:A7,"KOVÁŘ",D2:D7)',
    correctFormula: '=SUMIF(A2:A7,E1,D2:D7)',
    expectedResult: '58 000',
  },
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkové tržby pouze pro město "Praha" (A2:A7) z C2:C7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Město',  'Pobočka', 'Tržba', 'Hledám:', 'Praha'],
        ['2', 'Praha',  'Centrum',  '340000','Součet:', '❓'],
        ['3', 'Brno',   'Střed',   '220000','',        ''],
        ['4', 'Praha',  'Sever',   '180000','',        ''],
        ['5', 'Ostrava','Jih',     '150000','',        ''],
        ['6', 'Praha',  'Jih',     '290000','',        ''],
        ['7', 'Plzeň',  'Centrum', '110000','',        ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A7,"Praha",C2:C7) nebo =SUMIF(A2:A7,E1,C2:C7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"PRAHA",C2:C7)' || normalizeFormula(f) === 'SUMIF(A2:A7,E1,C2:C7)',
    correctFormula: '=SUMIF(A2:A7,"Praha",C2:C7)',
    expectedResult: '810 000 Kč',
  },
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkové tržby za kategorii "Nápoje" (A2:A8) z C2:C8.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Kategorie', 'Produkt',  'Tržba', 'Hledám:', 'Nápoje'],
        ['2', 'Nápoje',   'Kola',     '12500', 'Součet:', '❓'],
        ['3', 'Potraviny', 'Chléb',   '8800',  '',        ''],
        ['4', 'Nápoje',   'Džus',     '9500',  '',        ''],
        ['5', 'Ostatní',  'Párek',    '4200',  '',        ''],
        ['6', 'Nápoje',   'Voda',     '7200',  '',        ''],
        ['7', 'Potraviny', 'Sýr',     '6300',  '',        ''],
        ['8', 'Nápoje',   'Čaj',      '5100',  '',        ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A8,"Nápoje",C2:C8) nebo =SUMIF(A2:A8,E1,C2:C8)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A8,"NÁPOJE",C2:C8)' || normalizeFormula(f) === 'SUMIF(A2:A8,E1,C2:C8)',
    correctFormula: '=SUMIF(A2:A8,"Nápoje",C2:C8)',
    expectedResult: '34 300 Kč',
  },
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkové tržby za 1. čtvrtletí (A2:A7="Q1") z B2:B7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Kvartál', 'Tržba',  'Hledám:','Q1'],
        ['2', 'Q1',      '45000',  'Součet:','❓'],
        ['3', 'Q2',      '52000',  '',       ''],
        ['4', 'Q1',      '38000',  '',       ''],
        ['5', 'Q3',      '47000',  '',       ''],
        ['6', 'Q1',      '51000',  '',       ''],
        ['7', 'Q4',      '49000',  '',       ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A7,"Q1",B2:B7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"Q1",B2:B7)' || normalizeFormula(f) === 'SUMIF(A2:A7,E1,B2:B7)',
    correctFormula: '=SUMIF(A2:A7,"Q1",B2:B7)',
    expectedResult: '134 000 Kč',
  },
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkové body pro hodnocení "A" (A2:A7) ze sloupce C2:C7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Hodnocení', 'Popis',   'Body', 'Hledám:','A'],
        ['2', 'A',         'Výborný', '95',   'Součet:','❓'],
        ['3', 'B',         'Dobrý',   '78',   '',       ''],
        ['4', 'A',         'Výborný', '92',   '',       ''],
        ['5', 'C',         'Dostač.','65',    '',       ''],
        ['6', 'A',         'Výborný', '88',   '',       ''],
        ['7', 'B',         'Dobrý',   '82',   '',       ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A7,"A",C2:C7) nebo =SUMIF(A2:A7,E1,C2:C7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"A",C2:C7)' || normalizeFormula(f) === 'SUMIF(A2:A7,E1,C2:C7)',
    correctFormula: '=SUMIF(A2:A7,"A",C2:C7)',
    expectedResult: '275',
  },
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkové náklady na projekt "Alfa" (A2:A7) z D2:D7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Projekt', 'Měsíc', 'Typ',     'Náklad', 'Hledám:','Alfa'],
        ['2', 'Alfa',    'Led',   'Materiál','45000',  'Součet:','❓'],
        ['3', 'Beta',    'Led',   'Mzdy',    '62000',  '',       ''],
        ['4', 'Alfa',    'Úno',   'Mzdy',    '55000',  '',       ''],
        ['5', 'Gama',    'Led',   'Materiál','28000',  '',       ''],
        ['6', 'Alfa',    'Bře',   'Služby',  '38000',  '',       ''],
        ['7', 'Beta',    'Úno',   'Materiál','31000',  '',       ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A7,"Alfa",D2:D7) nebo =SUMIF(A2:A7,E1,D2:D7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"ALFA",D2:D7)' || normalizeFormula(f) === 'SUMIF(A2:A7,E1,D2:D7)',
    correctFormula: '=SUMIF(A2:A7,"Alfa",D2:D7)',
    expectedResult: '138 000 Kč',
  },
  {
    funcId: 'SUMIF',
    desc: 'V buňce E2 spočítej celkový počet přesčasových hodin pro oddělení "Výroba" (A2:A7) z C2:C7.',
    table: {
      headers: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['1', 'Oddělení', 'Zaměstnanec', 'Přesčasy','Hledám:','Výroba'],
        ['2', 'Výroba',   'Kříž',        '12',      'Součet:','❓'],
        ['3', 'Admin',    'Nová',        '5',       '',       ''],
        ['4', 'Výroba',   'Svoboda',     '8',       '',       ''],
        ['5', 'Logistika','Bartoš',      '3',       '',       ''],
        ['6', 'Výroba',   'Marek',       '15',      '',       ''],
        ['7', 'Admin',    'Černá',       '2',       '',       ''],
      ],
    },
    answerCell: 'E2',
    hint: '=SUMIF(A2:A7,"Výroba",C2:C7) nebo =SUMIF(A2:A7,E1,C2:C7)',
    checkFn: (f) => normalizeFormula(f) === 'SUMIF(A2:A7,"VÝROBA",C2:C7)' || normalizeFormula(f) === 'SUMIF(A2:A7,E1,C2:C7)',
    correctFormula: '=SUMIF(A2:A7,"Výroba",C2:C7)',
    expectedResult: '35 h',
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
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli průměrnou známku 2.56 z B2 na 1 desetinné místo. Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Položka',    'Hodnota', 'Zaokrouhleno'],
        ['2', 'Prům. známka','2.56',   '❓'],
        ['3', 'Medián',     '3.14',    ''],
        ['4', 'Modus',      '1.88',    ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,1) zaokrouhlí na 1 desetinné místo',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,1)',
    correctFormula: '=ROUND(B2,1)',
    expectedResult: '2,6',
  },
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli cenu 374 Kč z B2 na desítky (na -1 místě). Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Produkt',  'Cena (Kč)', 'Zaokrouhleno'],
        ['2', 'Tričko',   '374',       '❓'],
        ['3', 'Mikina',   '649',       ''],
        ['4', 'Bunda',    '1250',      ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,-1) zaokrouhlí na desítky',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,-1)',
    correctFormula: '=ROUND(B2,-1)',
    expectedResult: '370',
  },
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli roční obrat 57380 Kč z B2 na stovky (na -2). Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Rok',    'Obrat (Kč)', 'Zaokrouhleno'],
        ['2', '2023',   '57380',      '❓'],
        ['3', '2024',   '81240',      ''],
        ['4', '2025',   '64790',      ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,-2) zaokrouhlí na stovky',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,-2)',
    correctFormula: '=ROUND(B2,-2)',
    expectedResult: '57 400',
  },
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli koeficient 0.9167 z B2 na 4 desetinná místa. Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Položka',  'Hodnota', 'Zaokrouhleno'],
        ['2', 'DPH koef.','0.9167',  '❓'],
        ['3', 'Sazba',    '0.2153',  ''],
        ['4', 'Přepočet', '1.0825',  ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,4) – čtyři desetinná místa',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,4)',
    correctFormula: '=ROUND(B2,4)',
    expectedResult: '0,9167',
  },
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli kurz eura 24.8567 z B2 na 2 des. místa (běžné zaokrouhlení měny). Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Měna', 'Kurz',   'Zaokrouhleno'],
        ['2', 'EUR',  '24.8567','❓'],
        ['3', 'USD',  '22.4319',''],
        ['4', 'GBP',  '28.6542',''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,2) – zaokrouhlení měny na 2 des. místa',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,2)',
    correctFormula: '=ROUND(B2,2)',
    expectedResult: '24,86',
  },
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli celkovou váhu 85.7 kg z B2 na celé číslo. Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Položka',    'Hodnota', 'Zaokrouhleno'],
        ['2', 'Váha (kg)',  '85.7',    '❓'],
        ['3', 'Výška (cm)', '182.4',   ''],
        ['4', 'Objem (l)',  '12.3',    ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,0) zaokrouhlí na celé číslo',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,0)',
    correctFormula: '=ROUND(B2,0)',
    expectedResult: '86',
  },
  {
    funcId: 'ROUND',
    desc: 'Zaokrouhli vzdálenost 153.67 km z B2 na 1 desetinné místo. Výsledek do C2.',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Trasa',   'Vzdálenost', 'Zaokrouhleno'],
        ['2', 'Praha–Brno','153.67',   '❓'],
        ['3', 'Brno–Ostrava','87.43',  ''],
        ['4', 'Praha–Plzeň','87.95',   ''],
      ],
    },
    answerCell: 'C2',
    hint: '=ROUND(B2,1) na 1 desetinné místo',
    checkFn: (f) => normalizeFormula(f) === 'ROUND(B2,1)',
    correctFormula: '=ROUND(B2,1)',
    expectedResult: '153,7',
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
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj titul (A2), jméno (B2) a příjmení (C2) s mezerami do D2. Výsledek: "Ing. Jan Novák".',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Titul', 'Jméno', 'Příjmení', 'Celé jméno'],
        ['2', 'Ing.',  'Jan',   'Novák',    '❓'],
        ['3', 'Mgr.',  'Eva',   'Černá',    ''],
        ['4', 'Bc.',   'Tomáš', 'Procházka',''],
      ],
    },
    answerCell: 'D2',
    hint: '=CONCATENATE(A2," ",B2," ",C2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2," ",B2," ",C2)',
    correctFormula: '=CONCATENATE(A2," ",B2," ",C2)',
    expectedResult: '"Ing. Jan Novák"',
  },
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj ulici (A2), číslo (B2) a město (C2) do D2. Výsledek: "Hlavní 123, Praha".',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Ulice',  'Č. p.', 'Město', 'Adresa'],
        ['2', 'Hlavní', '123',   'Praha', '❓'],
        ['3', 'Dlouhá', '45',    'Brno',  ''],
        ['4', 'Krátká', '7',     'Plzeň', ''],
      ],
    },
    answerCell: 'D2',
    hint: '=CONCATENATE(A2," ",B2,", ",C2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2," ",B2,", ",C2)',
    correctFormula: '=CONCATENATE(A2," ",B2,", ",C2)',
    expectedResult: '"Hlavní 123, Praha"',
  },
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj den (A2), měsíc (B2) a rok (C2) s tečkami do D2. Výsledek: "15.1.2024".',
    table: {
      headers: ['', 'A', 'B', 'C', 'D'],
      rows: [
        ['1', 'Den', 'Měsíc', 'Rok',  'Datum'],
        ['2', '15',  '1',     '2024', '❓'],
        ['3', '3',   '6',     '2024', ''],
        ['4', '24',  '12',    '2023', ''],
      ],
    },
    answerCell: 'D2',
    hint: '=CONCATENATE(A2,".",B2,".",C2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,".",B2,".",C2)',
    correctFormula: '=CONCATENATE(A2,".",B2,".",C2)',
    expectedResult: '"15.1.2024"',
  },
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj název (A2) a množství (B2) s pomlčkou do C2 pro skladový kód. Výsledek: "Notebook-5ks".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Produkt',  'Množství', 'Skladový kód'],
        ['2', 'Notebook', '5',        '❓'],
        ['3', 'Mobil',    '12',       ''],
        ['4', 'Myš',      '25',       ''],
      ],
    },
    answerCell: 'C2',
    hint: '=CONCATENATE(A2,"-",B2,"ks") nebo =A2&"-"&B2&"ks"',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,"-",B2,"KS")' || normalizeFormula(f) === 'A2&"-"&B2&"KS"',
    correctFormula: '=CONCATENATE(A2,"-",B2,"ks")',
    expectedResult: '"Notebook-5ks"',
  },
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj předvolbu (A2) a telefon (B2) do C2. Výsledek: "+420 777 123 456".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Předvolba', 'Telefon',      'Celý tel.'],
        ['2', '+420',      '777 123 456',  '❓'],
        ['3', '+421',      '905 987 654',  ''],
        ['4', '+420',      '602 456 789',  ''],
      ],
    },
    answerCell: 'C2',
    hint: '=CONCATENATE(A2," ",B2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2," ",B2)' || normalizeFormula(f) === 'A2&" "&B2',
    correctFormula: '=CONCATENATE(A2," ",B2)',
    expectedResult: '"+420 777 123 456"',
  },
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj označení (A2) a číslo faktury (B2) do C2. Výsledek: "FV-2024/00123".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Označení', 'Číslo',   'Faktura'],
        ['2', 'FV-2024',  '00123',   '❓'],
        ['3', 'FV-2024',  '00124',   ''],
        ['4', 'FV-2024',  '00125',   ''],
      ],
    },
    answerCell: 'C2',
    hint: '=CONCATENATE(A2,"/",B2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,"/",B2)' || normalizeFormula(f) === 'A2&"/"&B2',
    correctFormula: '=CONCATENATE(A2,"/",B2)',
    expectedResult: '"FV-2024/00123"',
  },
  {
    funcId: 'CONCATENATE',
    desc: 'Spoj kategorii (A2), dvojtečku a název (B2) do C2. Výsledek: "Elektronika: Notebook".',
    table: {
      headers: ['', 'A', 'B', 'C'],
      rows: [
        ['1', 'Kategorie',  'Název',     'Položka'],
        ['2', 'Elektronika','Notebook',   '❓'],
        ['3', 'Oblečení',  'Tričko',     ''],
        ['4', 'Potraviny', 'Chléb',      ''],
      ],
    },
    answerCell: 'C2',
    hint: '=CONCATENATE(A2,": ",B2)',
    checkFn: (f) => normalizeFormula(f) === 'CONCATENATE(A2,": ",B2)' || normalizeFormula(f) === 'A2&": "&B2',
    correctFormula: '=CONCATENATE(A2,": ",B2)',
    expectedResult: '"Elektronika: Notebook"',
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
