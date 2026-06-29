import {
  type DecorationPattern,
  MARATHI_DECORATION_PATTERNS,
} from "@/lib/marathiPageData";

/**
 * Arabic and Urdu are right-to-left scripts, so the border pairs used on the
 * Devanagari pages must be mirrored: the symbol that opens on the left for
 * Hindi/Marathi must open on the right here.
 *
 *   Devanagari:  ꧁ राहुल ꧂
 *   Arabic/Urdu: ꧂ رحیم ꧁   ← opening/closing symbols are swapped
 *
 * We derive the RTL patterns from the existing Marathi set by swapping the
 * trimmed prefix/suffix glyphs while keeping a single space next to the text.
 */
function mirrorPattern(pattern: DecorationPattern): DecorationPattern {
  const leftGlyph = pattern.prefix.trim();
  const rightGlyph = pattern.suffix.trim();
  return {
    id: pattern.id,
    name: pattern.name,
    prefix: `${rightGlyph} `,
    suffix: ` ${leftGlyph}`,
  };
}

export const ARABIC_DECORATION_PATTERNS: DecorationPattern[] =
  MARATHI_DECORATION_PATTERNS.map(mirrorPattern);

const ARABIC_SCRIPT_RE =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

function hasArabicScript(text: string): boolean {
  return ARABIC_SCRIPT_RE.test(text);
}

/**
 * Phonetic Roman → Arabic/Urdu transliteration for the decorated tool.
 *
 * Names are typed in English (e.g. "Manish", "Ayesha") far more often than in
 * native script, so we map Latin sounds onto Arabic letters and write the long
 * vowels as their mater-lectionis forms (ا و ی) to keep the output readable.
 * Multi-letter sounds are matched first so "sh", "kh", etc. resolve correctly.
 */
const ARABIC_DIGRAPHS: ReadonlyArray<readonly [string, string]> = [
  ["sch", "ش"],
  ["tch", "چ"],
  ["sh", "ش"],
  ["ch", "چ"],
  ["kh", "خ"],
  ["gh", "غ"],
  ["th", "ت"],
  ["ph", "ف"],
  ["dh", "د"],
  ["bh", "بھ"],
  ["zh", "ژ"],
  ["aa", "ا"],
  ["ee", "ی"],
  ["ie", "ی"],
  ["oo", "و"],
  ["ou", "و"],
  ["oa", "و"],
  ["ai", "ائی"],
  ["ay", "ای"],
  ["ei", "ی"],
  ["ey", "ی"],
  ["au", "او"],
  ["aw", "او"],
  ["ck", "ک"],
  ["qu", "کو"],
];

const ARABIC_SINGLES: Record<string, string> = {
  a: "ا",
  b: "ب",
  c: "ک",
  d: "د",
  e: "ی",
  f: "ف",
  g: "گ",
  h: "ہ",
  i: "ی",
  j: "ج",
  k: "ک",
  l: "ل",
  m: "م",
  n: "ن",
  o: "و",
  p: "پ",
  q: "ق",
  r: "ر",
  s: "س",
  t: "ت",
  u: "و",
  v: "و",
  w: "و",
  x: "کس",
  y: "ی",
  z: "ز",
};

export function transliterateToArabic(input: string): string {
  const lower = input.toLowerCase();
  let result = "";
  let i = 0;

  while (i < lower.length) {
    const pair = ARABIC_DIGRAPHS.find(([latin]) =>
      lower.startsWith(latin, i),
    );
    if (pair) {
      result += pair[1];
      i += pair[0].length;
      continue;
    }

    const ch = lower[i];
    result += ARABIC_SINGLES[ch] ?? ch;
    i += 1;
  }

  return result;
}

export function generateDecoratedArabic(input: string) {
  const trimmed = input.trim();
  // Arabic/Urdu typed directly passes through unchanged. Latin input is
  // transliterated so the decorated styles always render in Arabic script.
  const source = trimmed || "اردو";
  const text = hasArabicScript(source)
    ? source
    : transliterateToArabic(source);

  return ARABIC_DECORATION_PATTERNS.map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    text: `${pattern.prefix}${text}${pattern.suffix}`,
  }));
}

export type PremadeSnippet = {
  id: string;
  text: string;
};

export type PremadeCategory = {
  id: string;
  title: string;
  description: string;
  items: PremadeSnippet[];
};

/**
 * Section C — 25 pre-styled Arabic/Urdu snippets in three categories.
 * All text is RTL; the rendering component wraps each card body in
 * `dir="rtl"` so it displays correctly inside the LTR card frame.
 * Border pairs are already mirrored for RTL (꧂ … ꧁).
 */
export const ARABIC_PREMADE_CATEGORIES: PremadeCategory[] = [
  {
    id: "urdu-whatsapp-status",
    title: "Urdu WhatsApp Status",
    description:
      "Poetry, attitude, and Islamic stylish Urdu status — copy or share straight to WhatsApp.",
    items: [
      { id: "wa-1", text: "꧂ اپنے انداز میں جیتے ہیں ꧁" },
      { id: "wa-2", text: "🌙 خاموشی بھی ایک جواب ہے 🌙" },
      { id: "wa-3", text: "✦ محبت میں ہار بھی جیت ہے ✦" },
      { id: "wa-4", text: "☪ اللہ پر بھروسہ رکھو ☪" },
      { id: "wa-5", text: "༻ خواب وہ جو سونے نہ دیں ༺" },
      { id: "wa-6", text: "』 دل بڑا رکھو، سوچ اونچی رکھو 『" },
      { id: "wa-7", text: "❱ وقت بدلتا ہے، حوصلہ نہیں ❰" },
      {
        id: "wa-8",
        text: "💫 ہم وہ نہیں جو حالات سے ڈر جائیں\nہم وہ ہیں جو حالات بدل دیں 💫",
      },
      { id: "wa-9", text: "✿ مسکراتے رہو، آگے بڑھتے رہو ✿" },
      { id: "wa-10", text: "🌟 خود پر یقین رکھو، باقی سب بہانہ ہے 🌟" },
    ],
  },
  {
    id: "urdu-name-styles",
    title: "Urdu Name Styles",
    description:
      "Popular Urdu names pre-styled in RTL Unicode borders — copy your name instantly.",
    items: [
      { id: "nm-1", text: "꧂ رحیم ꧁" },
      { id: "nm-2", text: "🌙 فاطمہ 🌙" },
      { id: "nm-3", text: "✦ علی ✦" },
      { id: "nm-4", text: "༻ عائشہ ༺" },
      { id: "nm-5", text: "』 محمد 『" },
      { id: "nm-6", text: "❱ زینب ❰" },
      { id: "nm-7", text: "☪ حسن ☪" },
      { id: "nm-8", text: "♛ مریم ♛" },
      { id: "nm-9", text: "★ بلال ★" },
      { id: "nm-10", text: "✿ خدیجہ ✿" },
    ],
  },
  {
    id: "arabic-phrases",
    title: "Arabic Phrases",
    description:
      "Common Arabic phrases styled with elegant Unicode borders — ready to share on WhatsApp.",
    items: [
      { id: "ar-1", text: "꧂ بِسْمِ اللَّٰه ꧁" },
      { id: "ar-2", text: "🌙 مَا شَاءَ اللَّٰه 🌙" },
      { id: "ar-3", text: "✦ الْحَمْدُ لِلَّٰه ✦" },
      { id: "ar-4", text: "☪ سُبْحَانَ اللَّٰه ☪" },
      { id: "ar-5", text: "༻ اللَّٰهُ أَكْبَر ༺" },
    ],
  },
];

export const ARABIC_FAQ_ITEMS = [
  {
    question: "What is an Arabic font generator?",
    answer:
      "An Arabic font generator is a free online tool that turns plain Arabic text into decorative Unicode styles you can copy and paste anywhere. Our Arabic font generator wraps your word or name in mirrored right-to-left borders and symbols (like ꧂ رحیم ꧁) in real time, and also offers fancy Latin styles for Arabic names typed in English. Because everything is standard Unicode, the output works on WhatsApp, Instagram, and Facebook with no app to install.",
  },
  {
    question: "What is a Urdu stylish name maker?",
    answer:
      "A Urdu stylish name maker is a tool that styles your Urdu name or text in fancy Unicode borders and decorations ready to copy and paste. This stylish name maker urdu tool is RTL-aware, so your Urdu text and the border symbols stay in the correct right-to-left order (꧂ نام ꧁) instead of looking jumbled. Use it for WhatsApp status, Instagram bio, and Facebook — the styled Urdu text pastes like normal text on any modern phone.",
  },
  {
    question: "Do these Arabic and Urdu fonts work on WhatsApp?",
    answer:
      "Yes. Arabic and Urdu Unicode text and decorative symbols paste straight into WhatsApp chats, group names, and status. Tap Copy on any style, or tap the green WhatsApp button on a ready-made card to share it instantly. Line breaks are preserved, so multi-line Urdu poetry and Arabic phrases look the same in WhatsApp as they do here. WhatsApp is the most popular place to share these styles in Arabic and Urdu communities.",
  },
  {
    question: "Why does my Arabic text appear reversed or jumbled when I paste it?",
    answer:
      "Arabic and Urdu are right-to-left (RTL) scripts. The text you copy here is correct standard Unicode — but a few apps with weak RTL support (especially some older Android apps and older WhatsApp versions) may display it in the wrong direction or break the order of the border symbols. This is a display quirk in that app, not a problem with the text itself. Most modern apps, including current WhatsApp, Instagram, and Facebook, render it perfectly. If one app shows it reversed, try a simpler symmetric border like ✦ متن ✦ or paste into an updated app.",
  },
] as const;

export const ARABIC_RELATED_TOOLS = [
  {
    href: "/hindi-stylish-fonts-generator",
    title: "Hindi Stylish Fonts",
    description: "Fancy Devanagari fonts for bios, captions, and status.",
  },
  {
    href: "/stylish-marathi-fonts",
    title: "Stylish Marathi Fonts",
    description: "Decorated Marathi text and fancy Latin styles for WhatsApp.",
  },
  {
    href: "/instagram-stylish-fonts",
    title: "Instagram Stylish Fonts",
    description: "Fancy Unicode bios, captions, and emoji for Instagram.",
  },
] as const;
