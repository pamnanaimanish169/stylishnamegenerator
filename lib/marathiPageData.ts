export type DecorationPattern = {
  id: string;
  name: string;
  prefix: string;
  suffix: string;
};

export const MARATHI_DECORATION_PATTERNS: DecorationPattern[] = [
  { id: "royal-bracket", name: "Royal Bracket", prefix: "꧁ ", suffix: " ꧂" },
  { id: "corner-quotes", name: "Corner Quotes", prefix: "『 ", suffix: " 』" },
  { id: "star-frame", name: "Star Frame", prefix: "★ ", suffix: " ★" },
  { id: "wing-bracket", name: "Wing Bracket", prefix: "༺ ", suffix: " ༻" },
  { id: "fire-style", name: "Fire Style", prefix: "🔥 ", suffix: " 🔥" },
  { id: "sparkle-frame", name: "Sparkle Frame", prefix: "✦ ", suffix: " ✦" },
  { id: "floral-bracket", name: "Floral Bracket", prefix: "ꫝ ", suffix: " ꫝ" },
  { id: "line-frame", name: "Line Frame", prefix: "彡 ", suffix: " 彡" },
  { id: "square-bracket", name: "Square Bracket", prefix: "【 ", suffix: " 】" },
  { id: "tortoise-shell", name: "Tortoise Shell", prefix: "〔 ", suffix: " 〕" },
  { id: "guillemets", name: "Guillemets", prefix: "« ", suffix: " »" },
  { id: "heavy-bracket", name: "Heavy Bracket", prefix: "❰ ", suffix: " ❱" },
  { id: "khanda-frame", name: "Khanda Frame", prefix: "☬ ", suffix: " ☬" },
  { id: "flower-frame", name: "Flower Frame", prefix: "✿ ", suffix: " ✿" },
  { id: "blossom-frame", name: "Blossom Frame", prefix: "❁ ", suffix: " ❁" },
  { id: "crown-frame", name: "Crown Frame", prefix: "♛ ", suffix: " ♛" },
  { id: "fleur-de-lis", name: "Fleur-de-lis", prefix: "⚜ ", suffix: " ⚜" },
  { id: "aesthetic-wrap", name: "Aesthetic Wrap", prefix: "⋆｡°✩ ", suffix: " ✩°｡⋆" },
  { id: "arch-quotes", name: "Arch Quotes", prefix: "˗ˏˋ ", suffix: " ˎˊ˗" },
  { id: "line-border", name: "Line Border", prefix: "━━ ", suffix: " ━━" },
  { id: "double-line", name: "Double Line", prefix: "══ ", suffix: " ══" },
  { id: "shade-border", name: "Shade Border", prefix: "░▒▓ ", suffix: " ▓▒░" },
  { id: "hibiscus", name: "Hibiscus", prefix: "🌺 ", suffix: " 🌺" },
  { id: "cherry-blossom", name: "Cherry Blossom", prefix: "🌸 ", suffix: " 🌸" },
  { id: "bouquet", name: "Bouquet", prefix: "💐 ", suffix: " 💐" },
  { id: "sanskrit-bracket", name: "Sanskrit Bracket", prefix: "࿐ ", suffix: " ࿐" },
  { id: "trident-frame", name: "Trident Frame", prefix: "༒ ", suffix: " ༒" },
  { id: "diamond-frame", name: "Diamond Frame", prefix: "◈ ", suffix: " ◈" },
];

export const MARATHI_STATIC_SAMPLES = [
  { name: "Bold Devanagari", text: "मराठी" },
  { name: "Outlined", text: "𝕄𝕣𝕒𝕥𝕙𝕚" },
  { name: "Bold Cursive", text: "𝓜𝓻𝓪𝓽𝓱𝓲" },
] as const;

export type SymbolItem = {
  char: string;
  label: string;
};

export type SymbolCategory = {
  title: string;
  items: SymbolItem[];
};

export const MARATHI_SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    title: "Borders & frames",
    items: [
      { char: "꧁", label: "Royal bracket left" },
      { char: "꧂", label: "Royal bracket right" },
      { char: "༺", label: "Wing bracket left" },
      { char: "༻", label: "Wing bracket right" },
      { char: "『", label: "Corner quote left" },
      { char: "』", label: "Corner quote right" },
      { char: "【", label: "Square bracket left" },
      { char: "】", label: "Square bracket right" },
      { char: "〔", label: "Tortoise shell left" },
      { char: "〕", label: "Tortoise shell right" },
      { char: "❰", label: "Heavy bracket left" },
      { char: "❱", label: "Heavy bracket right" },
    ],
  },
  {
    title: "Flowers & nature",
    items: [
      { char: "🌺", label: "Hibiscus" },
      { char: "🌸", label: "Cherry blossom" },
      { char: "🌼", label: "Blossom" },
      { char: "💐", label: "Bouquet" },
      { char: "🌻", label: "Sunflower" },
      { char: "🌿", label: "Leaf" },
      { char: "🍃", label: "Wind leaf" },
    ],
  },
  {
    title: "Stars & sparkles",
    items: [
      { char: "✦", label: "Sparkle" },
      { char: "✧", label: "Outline sparkle" },
      { char: "★", label: "Star" },
      { char: "☆", label: "Outline star" },
      { char: "✨", label: "Sparkles" },
      { char: "💫", label: "Dizzy star" },
      { char: "⭐", label: "Yellow star" },
    ],
  },
  {
    title: "Traditional & spiritual",
    items: [
      { char: "☬", label: "Khanda" },
      { char: "ॐ", label: "Om" },
      { char: "✿", label: "Flower" },
      { char: "❁", label: "Blossom" },
      { char: "卍", label: "Swastika symbol" },
      { char: "࿐", label: "Sanskrit sign" },
      { char: "༒", label: "Trident" },
    ],
  },
  {
    title: "Dots & lines",
    items: [
      { char: "•", label: "Bullet" },
      { char: "·", label: "Middle dot" },
      { char: "‣", label: "Triangular bullet" },
      { char: "─", label: "Horizontal line" },
      { char: "═", label: "Double horizontal line" },
      { char: "━", label: "Heavy horizontal line" },
      { char: "┊", label: "Vertical line" },
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: "What are stylish Marathi fonts?",
    answer:
      "Stylish Marathi fonts are decorative Unicode text styles you can copy and paste into WhatsApp, Instagram, and Facebook without installing a separate font app. They include Devanagari script wrapped in borders and symbols (like ꧁ मराठी ꧂), plus fancy Latin Unicode versions of transliterated Marathi names. Because they use standard Unicode characters, Marathi Unicode fonts work on any phone or computer that supports Devanagari script.",
  },
  {
    question: "How do I copy paste Marathi fonts on WhatsApp?",
    answer:
      "Type your Marathi word or name in the generator above, tap Copy on any decorated style you like, then open WhatsApp and paste into a chat message, group name, or your profile About section. Marathi WhatsApp fonts paste exactly like normal text — no special steps. If a border symbol does not show on an older phone, try a simpler style like ★ text ★.",
  },
  {
    question: "Do these Marathi fonts work on iPhone and Android?",
    answer:
      "Yes. Both iOS and Android support Unicode Marathi (Devanagari) and decorative symbols natively. Newer phones render all styles correctly; very old Android devices may show empty boxes for rare symbols — stick to common borders like ꧁ ꧂ or ★ if you notice missing glyphs. No app install is needed on either platform.",
  },
  {
    question: "Can I use these fonts in my Instagram bio in Marathi?",
    answer:
      "Absolutely. Instagram bios support Marathi Unicode text and decorative borders. Copy your styled Marathi text from this page, open Instagram → Edit Profile → Bio, long-press the field, and paste. Marathi Instagram bio fonts display the same on iOS and Android. Keep your bio under 150 characters when adding borders and emojis.",
  },
] as const;

export const MARATHI_RELATED_TOOLS = [
  {
    href: "/",
    title: "Stylish Name Generator",
    description: "Every Unicode font style in one place — all platforms.",
  },
  {
    href: "/hindi-stylish-fonts-generator",
    title: "Hindi Stylish Fonts",
    description: "Fancy Devanagari fonts for bios, captions, and status.",
  },
  {
    href: "/instagram-stylish-fonts",
    title: "Instagram Stylish Fonts",
    description: "Fancy Unicode bios, captions, and emoji for Instagram.",
  },
] as const;

export function generateDecoratedMarathi(input: string) {
  const text = input.trim() || "मराठी";

  return MARATHI_DECORATION_PATTERNS.map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    text: `${pattern.prefix}${text}${pattern.suffix}`,
  }));
}
