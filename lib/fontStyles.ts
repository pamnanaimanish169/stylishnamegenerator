const LETTERS_LOWER = "abcdefghijklmnopqrstuvwxyz";
const LETTERS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function mapFromOffsets(
  lowerStart: number,
  upperStart: number,
  upperOverrides?: Record<string, number>,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    map[LETTERS_LOWER[i]!] = String.fromCodePoint(lowerStart + i);
    const upperChar = LETTERS_UPPER[i]!;
    const codePoint = upperOverrides?.[upperChar] ?? upperStart + i;
    map[upperChar] = String.fromCodePoint(codePoint);
  }
  return map;
}

const doubleStruck = mapFromOffsets(0x1d552, 0x1d538, {
  C: 0x2102,
  H: 0x210d,
  I: 0x2111,
  N: 0x2115,
  P: 0x2119,
  Q: 0x211a,
  R: 0x211d,
  Z: 0x2124,
});

const cursiveScript = mapFromOffsets(0x1d4b6, 0x1d49c);

const boldCursive = mapFromOffsets(0x1d482, 0x1d468);
const frakturGothic = mapFromOffsets(0x1d51e, 0x1d504);
const boldFraktur = mapFromOffsets(0x1d586, 0x1d56c);
const monospace = mapFromOffsets(0x1d68a, 0x1d670);
const sansBold = mapFromOffsets(0x1d5ee, 0x1d5d4);
const sansItalic = mapFromOffsets(0x1d622, 0x1d608);
const circled = mapFromOffsets(0x24d0, 0x24b6);
const squared = mapFromOffsets(0x1f150, 0x1f130);
const fullwidth = mapFromOffsets(0xff41, 0xff21);

const smallCaps: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "q",
  r: "ʀ",
  s: "ꜱ",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
  A: "ᴀ",
  B: "ʙ",
  C: "ᴄ",
  D: "ᴅ",
  E: "ᴇ",
  F: "ꜰ",
  G: "ɢ",
  H: "ʜ",
  I: "ɪ",
  J: "ᴊ",
  K: "ᴋ",
  L: "ʟ",
  M: "ᴍ",
  N: "ɴ",
  O: "ᴏ",
  P: "ᴘ",
  Q: "q",
  R: "ʀ",
  S: "ꜱ",
  T: "ᴛ",
  U: "ᴜ",
  V: "ᴠ",
  W: "ᴡ",
  X: "x",
  Y: "ʏ",
  Z: "ᴢ",
};

const upsideDownMap: Record<string, string> = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  A: "∀",
  B: "q",
  C: "Ɔ",
  D: "p",
  E: "Ǝ",
  F: "Ⅎ",
  G: "פ",
  H: "H",
  I: "I",
  J: "ſ",
  K: "ʞ",
  L: "˥",
  M: "W",
  N: "N",
  O: "O",
  P: "Ԁ",
  Q: "Q",
  R: "ɹ",
  S: "S",
  T: "┴",
  U: "∩",
  V: "Λ",
  W: "M",
  X: "X",
  Y: "⅄",
  Z: "Z",
};

function applyMap(text: string, map: Record<string, string>): string {
  return [...text]
    .map((char) => map[char] ?? char)
    .join("");
}

function applyCombining(text: string, mark: string): string {
  return [...text]
    .map((char) => (/[a-zA-Z0-9]/.test(char) ? char + mark : char))
    .join("");
}

function applyUpsideDown(text: string): string {
  return [...text]
    .map((char) => upsideDownMap[char] ?? char)
    .reverse()
    .join("");
}

export type FontStyleResult = {
  id: string;
  name: string;
  text: string;
};

export function generateAll(input: string): FontStyleResult[] {
  const name = input.trim() || "YourName";

  const styles: FontStyleResult[] = [
    { id: "double-struck", name: "Double Struck", text: applyMap(name, doubleStruck) },
    { id: "cursive-script", name: "Cursive Script", text: applyMap(name, cursiveScript) },
    { id: "bold-cursive", name: "Bold Cursive", text: applyMap(name, boldCursive) },
    { id: "fraktur-gothic", name: "Fraktur Gothic", text: applyMap(name, frakturGothic) },
    { id: "bold-fraktur", name: "Bold Fraktur", text: applyMap(name, boldFraktur) },
    { id: "monospace", name: "Monospace", text: applyMap(name, monospace) },
    { id: "sans-bold", name: "Sans Bold", text: applyMap(name, sansBold) },
    { id: "sans-italic", name: "Sans Italic", text: applyMap(name, sansItalic) },
    { id: "circled", name: "Circled", text: applyMap(name, circled) },
    { id: "squared", name: "Squared", text: applyMap(name, squared) },
    { id: "small-caps", name: "Small Caps", text: applyMap(name, smallCaps) },
    { id: "fullwidth", name: "Fullwidth", text: applyMap(name, fullwidth) },
    { id: "upside-down", name: "Upside Down", text: applyUpsideDown(name) },
    {
      id: "strikethrough",
      name: "Strikethrough",
      text: applyCombining(name, "\u0336"),
    },
    {
      id: "underline",
      name: "Underline",
      text: applyCombining(name, "\u0332"),
    },
    {
      id: "bgmi-border",
      name: "BGMI Border",
      text: `꧁༺ ${applyMap(name, cursiveScript)} ༻꧂`,
    },
    {
      id: "fire-style",
      name: "Fire Style",
      text: `🔥 ${applyMap(name, sansBold)} 🔥`,
    },
    {
      id: "star-style",
      name: "Star Style",
      text: `★彡 ${applyMap(name, doubleStruck)} 彡★`,
    },
    {
      id: "ff-border",
      name: "FF Border",
      text: `꧁☬ ${applyMap(name, sansBold)} ☬꧂`,
    },
  ];

  return styles;
}

/** Unicode styles that render reliably in BGMI's 16-character name field. */
const BGMI_STYLE_IDS = [
  "double-struck",
  "cursive-script",
  "bold-cursive",
  "fraktur-gothic",
  "bold-fraktur",
  "monospace",
  "sans-bold",
  "sans-italic",
  "circled",
  "small-caps",
  "bgmi-border",
  "star-style",
] as const;

export function generateBgmiAll(input: string): FontStyleResult[] {
  return generateAll(input).filter((style) =>
    (BGMI_STYLE_IDS as readonly string[]).includes(style.id),
  );
}

export type FreeFireStyleResult = FontStyleResult & {
  ffCompatible: boolean;
};

/** Unicode styles shown on the Free Fire generator (wider set than BGMI). */
const FREE_FIRE_STYLE_IDS = [
  "double-struck",
  "cursive-script",
  "bold-cursive",
  "fraktur-gothic",
  "bold-fraktur",
  "monospace",
  "sans-bold",
  "sans-italic",
  "circled",
  "small-caps",
  "bgmi-border",
  "star-style",
  "ff-border",
  "fullwidth",
  "fire-style",
  "squared",
  "upside-down",
  "strikethrough",
  "underline",
] as const;

const FREE_FIRE_COMPATIBLE_IDS = new Set<string>([
  "double-struck",
  "cursive-script",
  "bold-cursive",
  "fraktur-gothic",
  "bold-fraktur",
  "monospace",
  "sans-bold",
  "sans-italic",
  "circled",
  "small-caps",
  "bgmi-border",
  "star-style",
  "ff-border",
  "fullwidth",
  "fire-style",
]);

export function generateFreeFireAll(input: string): FreeFireStyleResult[] {
  return generateAll(input)
    .filter((style) =>
      (FREE_FIRE_STYLE_IDS as readonly string[]).includes(style.id),
    )
    .map((style) => ({
      ...style,
      ffCompatible: FREE_FIRE_COMPATIBLE_IDS.has(style.id),
    }));
}

/** Aesthetic Unicode styles for Instagram bios, captions, and display names. */
const INSTAGRAM_STYLE_IDS = [
  "cursive-script",
  "bold-cursive",
  "small-caps",
  "sans-italic",
  "fullwidth",
  "double-struck",
  "circled",
] as const;

function applyMultiline(
  text: string,
  transform: (line: string) => string,
): string {
  return text
    .split("\n")
    .map((line) => (line.length === 0 ? line : transform(line)))
    .join("\n");
}

export function generateInstagramAll(input: string): FontStyleResult[] {
  const text = input.trim() === "" ? "YourName" : input;

  const styleMaps: Record<
    (typeof INSTAGRAM_STYLE_IDS)[number],
    { name: string; map: Record<string, string> }
  > = {
    "cursive-script": { name: "Cursive Script", map: cursiveScript },
    "bold-cursive": { name: "Bold Cursive", map: boldCursive },
    "small-caps": { name: "Small Caps", map: smallCaps },
    "sans-italic": { name: "Sans Italic", map: sansItalic },
    fullwidth: { name: "Fullwidth", map: fullwidth },
    "double-struck": { name: "Double Struck", map: doubleStruck },
    circled: { name: "Circled", map: circled },
  };

  return INSTAGRAM_STYLE_IDS.map((id) => {
    const { name, map } = styleMaps[id]!;
    return {
      id,
      name,
      text: applyMultiline(text, (line) => applyMap(line, map)),
    };
  });
}
