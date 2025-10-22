// Offisiell sorteringsinformasjon basert på Miljødirektoratets retningslinjer
// Kilde: miljodirektoratet.no

const WASTE_CATEGORIES = {
  matavfall: {
    name: "Matavfall",
    color: "#4CAF50",
    icon: "🥕",
    description: "Mat og matrester som kan bli til ny jord"
  },
  papir: {
    name: "Papir og Papp",
    color: "#2196F3",
    icon: "📦",
    description: "Tørt papir og papp som kan bli til nytt papir"
  },
  plast: {
    name: "Plast",
    color: "#FF9800",
    icon: "🧴",
    description: "Plastemballasje og plastgjenstander som kan resirkuleres"
  },
  glass: {
    name: "Glass og Metall",
    color: "#9C27B0",
    icon: "🥫",
    description: "Glass- og metallemballasje"
  },
  tekstil: {
    name: "Tekstiler",
    color: "#E91E63",
    icon: "👕",
    description: "Klær og tekstiler som kan gjenbrukes eller resirkuleres"
  },
  restavfall: {
    name: "Restavfall",
    color: "#757575",
    icon: "🗑️",
    description: "Det som ikke kan sorteres i andre kategorier"
  },
  farlig: {
    name: "Farlig avfall",
    color: "#F44336",
    icon: "⚠️",
    description: "Farlig avfall til miljøstasjon"
  }
};

// NIVÅ 1: Grunnleggende gjenstander (åpenbare)
const LEVEL_1_ITEMS = [
  {
    name: "Bananskall",
    emoji: "🍌",
    category: "matavfall",
    difficulty: 1,
    fact: "Matavfall blir til biogass og gjødsel!"
  },
  {
    name: "Epleskrott",
    emoji: "🍎",
    category: "matavfall",
    difficulty: 1,
    fact: "Frukt og grønt er perfekt kompost"
  },
  {
    name: "Brødskorpe",
    emoji: "🍞",
    category: "matavfall",
    difficulty: 1,
    fact: "Gammelt brød går i matavfall"
  },
  {
    name: "Eggeskall",
    emoji: "🥚",
    category: "matavfall",
    difficulty: 1,
    fact: "Eggeskall er rik på kalsium og passer perfekt i kompost"
  },
  {
    name: "Appelsinskall",
    emoji: "🍊",
    category: "matavfall",
    difficulty: 1,
    fact: "Sitrusskall brytes ned og blir til næringsrik jord"
  },
  {
    name: "Tepose",
    emoji: "🍵",
    category: "matavfall",
    difficulty: 1,
    fact: "Brukte teposer og te går i matavfall"
  },
  {
    name: "Kyllingbein",
    emoji: "🍗",
    category: "matavfall",
    difficulty: 1,
    fact: "Kjøttbein og matrester går i matavfall"
  },
  {
    name: "Pappeske",
    emoji: "📦",
    category: "papir",
    difficulty: 1,
    fact: "Papp kan resirkuleres minst 7 ganger"
  },
  {
    name: "Konvolutt",
    emoji: "📮",
    category: "papir",
    difficulty: 1,
    fact: "Konvolutter og brev kan resirkuleres som papir"
  },
  {
    name: "Avis",
    emoji: "📰",
    category: "papir",
    difficulty: 1,
    fact: "Norske aviser lages av 80% resirkulert papir"
  },
  {
    name: "Skriveark",
    emoji: "📄",
    category: "papir",
    difficulty: 1,
    fact: "Husk å bruke begge sider før du kaster!"
  },
  {
    name: "Plastflaske",
    emoji: "🧴",
    category: "plast",
    difficulty: 1,
    fact: "En plastflaske kan bli til en ny flaske!"
  },
  {
    name: "Plastpose",
    emoji: "🛍️",
    category: "plast",
    difficulty: 1,
    fact: "Ta med handleposer til butikken for resirkulering"
  },
  {
    name: "Yoghurtbeger",
    emoji: "🥛",
    category: "plast",
    difficulty: 1,
    fact: "Skyll plasten før du kaster den"
  },
  {
    name: "Plastkopp",
    emoji: "🥤",
    category: "plast",
    difficulty: 1,
    fact: "Engangskrus av plast kan resirkuleres"
  },
  {
    name: "Bleie",
    emoji: "🩲",
    category: "restavfall",
    difficulty: 1,
    fact: "Bleier inneholder flere materialer og går i restavfall"
  },
  {
    name: "Q-tips",
    emoji: "🦴",
    category: "restavfall",
    difficulty: 1,
    fact: "Vattpinner er for små til å sorteres og går i restavfall"
  },
  {
    name: "Smokk",
    emoji: "👶",
    category: "restavfall",
    difficulty: 1,
    fact: "Blandingsmaterialer går i restavfall"
  },
  {
    name: "Sigarettstump",
    emoji: "🚬",
    category: "restavfall",
    difficulty: 1,
    fact: "Sigarettstumper inneholder giftstoffer og skal i restavfall"
  },
  {
    name: "Snuspose",
    emoji: "🟤",
    category: "restavfall",
    difficulty: 1,
    fact: "Snusposer går i restavfall, ikke matavfall"
  },
  {
    name: "Støvsugerpose",
    emoji: "💼",
    category: "restavfall",
    difficulty: 1,
    fact: "Støvsugerposer med innhold går i restavfall"
  },
  {
    name: "Plaster",
    emoji: "🩹",
    category: "restavfall",
    difficulty: 1,
    fact: "Brukte plaster er hygieneavfall og går i restavfall"
  }
];

// NIVÅ 2: Middels vanskelig (krever litt kunnskap)
const LEVEL_2_ITEMS = [
  ...LEVEL_1_ITEMS,
  {
    name: "Drikkekartonger",
    emoji: "🧃",
    category: "papir",
    difficulty: 2,
    fact: "Melkekartonger går i papir/papp, ikke plast!"
  },
  {
    name: "Tomatboks",
    emoji: "🥫",
    category: "glass",
    difficulty: 2,
    fact: "Metallbokser kan resirkuleres i det uendelige!"
  },
  {
    name: "Sylteglass",
    emoji: "🫙",
    category: "glass",
    difficulty: 2,
    fact: "Glass kan smeltes og brukes om og om igjen"
  },
  {
    name: "Aluminiumsfolie",
    emoji: "📄",
    category: "glass",
    difficulty: 2,
    fact: "Aluminiumsfolie går sammen med metallemballasje"
  },
  {
    name: "Hermetikkboks",
    emoji: "🥫",
    category: "glass",
    difficulty: 2,
    fact: "Hermetikkbokser av metall kan resirkuleres i det uendelige!"
  },
  {
    name: "Potetskrell",
    emoji: "🥔",
    category: "matavfall",
    difficulty: 2,
    fact: "Både rå og kokte grønnsaker går i matavfall"
  },
  {
    name: "Kaffefilter",
    emoji: "☕",
    category: "matavfall",
    difficulty: 2,
    fact: "Brukt kaffefilter med kaffe går i matavfall"
  },
  {
    name: "Gavepapir",
    emoji: "🎁",
    category: "papir",
    difficulty: 2,
    fact: "Vanlig gavepapir går i papir, men ikke glitrete!"
  }
];

// NIVÅ 3: Avansert (vanskelige/tvetydige tilfeller)
const LEVEL_3_ITEMS = [
  ...LEVEL_2_ITEMS,
  {
    name: "Gammel t-skjorte",
    emoji: "👕",
    category: "tekstil",
    difficulty: 3,
    fact: "Selv slitt tøy kan bli til nye tekstiler eller isolasjon"
  },
  {
    name: "Strømpebukse",
    emoji: "🧦",
    category: "tekstil",
    difficulty: 3,
    fact: "Tekstiler skal ikke i restavfall fra 2025!"
  },
  {
    name: "Pizzaeske",
    emoji: "🍕",
    category: "papir",
    difficulty: 3,
    fact: "Pizzaesker med noe fett går fortsatt i papir! Men fjern matrester.",
    commonMistake: "Mange tror den skal i restavfall, men papir tåler litt fett"
  },
  {
    name: "Kvittering",
    emoji: "🧾",
    category: "restavfall",
    difficulty: 3,
    fact: "Kvitteringer er termopapir og går i restavfall, ikke papir!",
    commonMistake: "Ser ut som papir, men er behandlet med kjemikalier"
  },
  {
    name: "Knust drikkeglass",
    emoji: "🥃",
    category: "restavfall",
    difficulty: 3,
    fact: "Drikkeglass er ikke samme type glass som flasker - går i restavfall!",
    commonMistake: "Ikke all glass er likt! Kun glasSemballasje resirkuleres"
  },
  {
    name: "Porselenkopp",
    emoji: "☕",
    category: "restavfall",
    difficulty: 3,
    fact: "Porselæn og keramikk går i restavfall, ikke glass",
    commonMistake: "Må til gjenvinningsstasjonen hvis hel"
  },
  {
    name: "Kaffekapsler",
    emoji: "☕",
    category: "restavfall",
    difficulty: 3,
    fact: "Kaffekapsler er blandingsmateriale og går i restavfall",
    commonMistake: "Aluminium og kaffe gjør dem vanskelig å resirkulere"
  },
  {
    name: "Glitrete gavepapir",
    emoji: "✨",
    category: "restavfall",
    difficulty: 3,
    fact: "Plastbelagt gavepapir går i restavfall, ikke papir",
    commonMistake: "Det glitrete laget er plast som ødelegger papirresirkulering"
  },
  {
    name: "Plastemballasje fra kjøtt",
    emoji: "🥩",
    category: "plast",
    difficulty: 3,
    fact: "Kjøttbakker og plastemballasje fra kjøtt skal skylles og går i plast",
    commonMistake: "Mange kaster i restavfall, men de kan resirkuleres!"
  },
  {
    name: "Stearinlys",
    emoji: "🕯️",
    category: "restavfall",
    difficulty: 3,
    fact: "Stearin og parafinlys går i restavfall"
  },
  {
    name: "Tyggegummi",
    emoji: "🍬",
    category: "restavfall",
    difficulty: 3,
    fact: "Tyggegummi er en type plast og går i restavfall"
  },
  {
    name: "Batterier",
    emoji: "🔋",
    category: "farlig",
    difficulty: 3,
    fact: "Batterier er farlig avfall og må leveres til butikk eller miljøstasjon",
    commonMistake: "ALDRI i vanlig søppel!"
  }
];

// Flervalg-spørsmål for vanskelige tilfeller
const QUIZ_QUESTIONS = [
  {
    question: "Hvor skal en pizzaeske med fettrester?",
    options: [
      { text: "Restavfall", correct: false, explanation: "Nei! Papir tåler litt fett. Fjern matrester og legg i papir." },
      { text: "Papir og papp", correct: true, explanation: "Riktig! Pizzaesker går i papir selv med noe fett. Bare fjern store matrester først." },
      { text: "Matavfall", correct: false, explanation: "Nei, esken selv er ikke mat. Fjern matrester og legg esken i papir." }
    ],
    level: 2
  },
  {
    question: "Du har en kvittering fra butikken. Hvor skal den?",
    options: [
      { text: "Papir og papp", correct: false, explanation: "Nei! Kvitteringer er termopapir med kjemikalier som ødelegger papirresirkulering." },
      { text: "Restavfall", correct: true, explanation: "Riktig! Kvitteringer er laget av termopapir og skal i restavfall, ikke papir." },
      { text: "Farlig avfall", correct: false, explanation: "Nei, det er ikke farlig avfall, men det går i restavfall." }
    ],
    level: 2
  },
  {
    question: "En melkekartong er tom. Hvor kaster du den?",
    options: [
      { text: "Plast", correct: false, explanation: "Nei! Selv om den er plastbelagt, regnes drikkekartonger som papp." },
      { text: "Papir og papp", correct: true, explanation: "Riktig! Drikkekartonger og melkekartonger går i papir/papp, ikke plast." },
      { text: "Restavfall", correct: false, explanation: "Nei, de kan resirkuleres og skal i papir/papp." }
    ],
    level: 2
  },
  {
    question: "Et drikkeglass har knust. Hvor skal glassbitene?",
    options: [
      { text: "Glass og metall", correct: false, explanation: "Nei! Drikkeglass og glasemballasje er ulike typer glass." },
      { text: "Restavfall", correct: true, explanation: "Riktig! Drikkeglass, krystall og porselæn har annet smeltepunkt enn flaskeglass." },
      { text: "Farlig avfall", correct: false, explanation: "Nei, det er ikke farlig avfall, men det går i restavfall (pakk det inn!)." }
    ],
    level: 3
  },
  {
    question: "Du skal kaste en gammel t-skjorte med hull. Hva gjør du?",
    options: [
      { text: "Restavfall", correct: false, explanation: "Nei! Fra 2025 skal tekstiler sorteres ut, selv om de er slitt." },
      { text: "Tekstiler", correct: true, explanation: "Riktig! Selv slitte tekstiler kan gjenbrukes til isolasjon eller nye fibre." },
      { text: "Papir og papp", correct: false, explanation: "Nei, tekstiler har egen sortering, selv om bomull kommer fra planter." }
    ],
    level: 2
  },
  {
    question: "Hvor skal brukte kaffefilter og kaffegrut?",
    options: [
      { text: "Restavfall", correct: false, explanation: "Nei! Kaffe og papirfilter er biologisk nedbrytbart." },
      { text: "Matavfall", correct: true, explanation: "Riktig! Både kaffe, te og papirfilter går i matavfall." },
      { text: "Papir og papp", correct: false, explanation: "Nei, våt papp går i matavfall når det er blandet med mat." }
    ],
    level: 2
  }
];

// "Finn feilen" oppgaver
const FIND_ERROR_TASKS = [
  {
    title: "Restavfall-bøtta hos familien Hansen",
    description: "Noe av dette hører ikke hjemme i restavfall!",
    items: [
      { name: "Bleie", emoji: "🍼", correct: true },
      { name: "Q-tips", emoji: "🦴", correct: true },
      { name: "Plastflaske", emoji: "🧴", correct: false, shouldBe: "plast", explanation: "Plastflasker skal i plasten!" },
      { name: "Støvsugerpose", emoji: "🧹", correct: true },
      { name: "Porselænskopp", emoji: "☕", correct: true },
      { name: "Pizzaeske", emoji: "🍕", correct: false, shouldBe: "papir", explanation: "Pizzaesker går i papir!" }
    ],
    level: 2
  },
  {
    title: "Papir og papp hos kontoret",
    description: "Noe har havnet feil!",
    items: [
      { name: "Konvolutt", emoji: "✉️", correct: true },
      { name: "Pappeske", emoji: "📦", correct: true },
      { name: "Kvittering", emoji: "🧾", correct: false, shouldBe: "restavfall", explanation: "Kvitteringer er termopapir og skal i restavfall!" },
      { name: "Avis", emoji: "📰", correct: true },
      { name: "Glitrete gavepapir", emoji: "✨", correct: false, shouldBe: "restavfall", explanation: "Plastbelagt papir går i restavfall!" },
      { name: "Notatblokk", emoji: "📓", correct: true }
    ],
    level: 3
  }
];

// Eksporter alt
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WASTE_CATEGORIES,
    LEVEL_1_ITEMS,
    LEVEL_2_ITEMS,
    LEVEL_3_ITEMS,
    QUIZ_QUESTIONS,
    FIND_ERROR_TASKS
  };
}
