export const RENDERING_MATRIX_ROWS = [
  {
    platform: "iOS (SF Arabic stack)",
    borderType: "Emoji-slot symbols (♛, ✦)",
    outcome: "⚠️ Partial",
    detail:
      "Render as full-colour emoji rather than flat glyphs, so the border size clashes with the Arabic letters around it.",
  },
  {
    platform: "Android stock (Noto Naskh Arabic)",
    borderType: "Rare symbols (♛, ༺)",
    outcome: "❌ Breaks",
    detail:
      "A stripped Noto build drops uncommon Unicode blocks — the symbol shows as a box (tofu) or vanishes entirely.",
  },
  {
    platform: "WhatsApp — pure Arabic/Urdu",
    borderType: "Asymmetric brackets (꧂ … ꧁)",
    outcome: "✅ Perfect",
    detail:
      "WhatsApp detects a mostly-RTL message, flips the bubble, and the mirrored borders read correctly right-to-left.",
  },
  {
    platform: "WhatsApp — Arabic + Latin name",
    borderType: "꧂ Rahim ꧁ (mixed script)",
    outcome: "❌ Breaks",
    detail:
      "One Latin word tips the RTL ratio, the bubble flips to LTR, and the mirrored borders end up reversed.",
  },
  {
    platform: "Instagram caption",
    borderType: "Multi-line Urdu status",
    outcome: "✅ Perfect",
    detail:
      "Captions honour your line breaks, so a 3-line Urdu poem stays 3 lines.",
  },
  {
    platform: "Instagram bio",
    borderType: "Multi-line Urdu status",
    outcome: "⚠️ Partial",
    detail:
      "The bio field has a tighter width cap — RTL Unicode wraps earlier, collapsing 3 lines into 5–6.",
  },
  {
    platform: "Samsung One UI keyboard/clipboard",
    borderType: "Text containing ZWNJ (می‌خواہم)",
    outcome: "❌ Breaks",
    detail:
      "Samsung's clipboard can silently strip the zero-width non-joiner on paste, breaking words that need explicit non-joining.",
  },
  {
    platform: "Telegram / older messengers",
    borderType: "Neutral symbol before Arabic (★ متن)",
    outcome: "⚠️ Partial",
    detail:
      "A different Bidi resolution path can flip a line that looks perfect in WhatsApp.",
  },
] as const;

export const SYMBOL_BIDI_ROWS = [
  {
    symbol: "🌙",
    bidiType: "Neutral",
    behaviour:
      "Direction inherited from surrounding text — safe between two Arabic words, risky at the start of a line.",
  },
  {
    symbol: "☪",
    bidiType: "Varies by OS",
    behaviour:
      "Treated differently across Unicode versions; on pre-Android 9 it can trigger a direction reset inside an Arabic string.",
  },
  {
    symbol: "✦ ★",
    bidiType: "Neutral / weak",
    behaviour:
      "Resolves from context — symmetric shape means a flip is invisible, so these are the safest borders for mixed text.",
  },
  {
    symbol: "꧁ ꧂ ༺ ༻",
    bidiType: "Neutral (asymmetric shape)",
    behaviour:
      "A flip is highly visible because the opening and closing glyphs differ — avoid when any Latin character is present.",
  },
  {
    symbol: "U+200F (RLM)",
    bidiType: "Strong RTL",
    behaviour:
      "An invisible anchor — placing it before Arabic content forces RTL regardless of surrounding neutral symbols.",
  },
] as const;

export const CALLIGRAPHY_COMPARISON_ROWS = [
  {
    aspect: "What it is",
    calligraphy:
      "Real typeface designs — Naskh, Nastaliq, Thuluth, Ruqah — drawn as font files.",
    unicode:
      "Standard Arabic letters wrapped in decorative Unicode border symbols; the letters themselves never change.",
  },
  {
    aspect: "How it works",
    calligraphy:
      "Contextual glyph shaping rendered by a font engine at design time.",
    unicode:
      "String concatenation — borders are added around plain Unicode text.",
  },
  {
    aspect: "Copy-paste ready",
    calligraphy: "No — the font must be installed in the destination app.",
    unicode: "Yes — it travels as plain text into any app.",
  },
  {
    aspect: "Urdu / Nastaliq support",
    calligraphy:
      "Yes — Nastaliq fonts (Jameel Noori Nastaleeq, Noto Nastaliq) are the native Urdu style.",
    unicode:
      "No — copy-paste tools cannot deliver Nastaliq; text renders in the app's default Naskh.",
  },
  {
    aspect: "Alternate letterforms",
    calligraphy: "Full — bold, swashes, ligatures are part of the typeface.",
    unicode:
      "Almost none — Arabic has no Mathematical Alphanumeric block like Latin, so only borders add flair.",
  },
  {
    aspect: "Best use case",
    calligraphy: "Wedding cards, logos, posters — anything designed in software.",
    unicode:
      "WhatsApp status, Instagram bios, display names — places where you cannot choose a font.",
  },
] as const;

export const ARABIC_MYTH_REALITY_ROWS = [
  {
    myth: "Unicode stylish text looks the same everywhere",
    reality:
      "The glyph drawn for any code point depends on the OS font. A style looks different on iOS, Android, Windows and Gmail — and the variation is wider for Arabic because fewer fonts cover the full Arabic Extended block.",
    why: "Preview on the device and app your audience actually uses.",
  },
  {
    myth: "RTL just means reversing the border symbols",
    reality:
      "It's mirroring with context, not simple reversal. ꧁ and ꧂ are Khmer-origin symbols, not an officially mirrored Unicode pair — their RTL logic is a social convention. Engines that auto-mirror Bidi may not flip them; engines that don't will show them exactly as entered.",
    why: "Always insert the mirrored characters in the string yourself — never rely on the platform to swap them.",
  },
  {
    myth: "These are special Arabic fonts",
    reality:
      "There is no alternate Arabic Unicode letter block equivalent to Latin's Mathematical Alphanumeric set. You're getting decorative framing, not alternate letterforms — the Arabic letters are always standard.",
    why: "Stop hunting for a downloadable 'fancy Arabic font' — the framing is the product.",
  },
  {
    myth: "Stylish text can get your WhatsApp flagged",
    reality:
      "WhatsApp spam detection is based on mass-sending behaviour and reports, not Unicode composition. A status with borders is indistinguishable at the protocol level from any other text.",
    why: "This myth spreads on Urdu YouTube channels and causes needless fear — ignore it.",
  },
  {
    myth: "Urdu and Arabic stylish fonts are interchangeable",
    reality:
      "They share the Arabic script base but differ in letters and diacritics. Urdu adds ٹ، ڈ، ڑ، ں، ہ — a tool built only for the Arabic block silently drops or mangles them.",
    why: "Test any generator with Urdu-specific letters, not just Arabic ones.",
  },
] as const;

export type AdvancedInsight = {
  title: string;
  body: string;
  breaks: string;
};

export const ADVANCED_RTL_INSIGHTS: AdvancedInsight[] = [
  {
    title: "The naive implementation",
    body: "Most 'font generators' map each Latin character to a target Unicode block. Arabic has no parallel alphabet blocks, so a naive tool either outputs garbage or wraps the raw input in borders with no awareness of direction. Paste Arabic into a Latin-only generator and you'll see the failure instantly.",
    breaks:
      "Without script detection, Arabic input passes through unstyled or scrambled.",
  },
  {
    title: "RTL input & output detection",
    body: "A correct generator sets dir=\"rtl\" and lang=\"ar\"/\"ur\" on the input, and uses CSS unicode-bidi: plaintext on output rows so each line's direction comes from its content, not the LTR page. (This page uses dir=\"auto\" on the input and dir=\"rtl\" on every output row.)",
    breaks:
      "Without it, RTL text renders left-aligned with the cursor on the wrong side.",
  },
  {
    title: "Border-mirroring in the string, not CSS",
    body: "Maintain two border arrays — LTR (꧁ text ꧂) and RTL (꧂ text ꧁) — and write the mirrored characters into the correct string positions before rendering. Never use CSS direction to visually swap them: CSS is lost on copy, and only the raw string order survives into the destination app.",
    breaks:
      "CSS-only mirroring looks right on your page but pastes reversed everywhere else.",
  },
  {
    title: "Clipboard API & Bidi marks",
    body: "A professional implementation wraps copied Arabic with Right-to-Left Embedding (U+202B) at the start and Pop Directional Formatting (U+202C) at the end before writing to the clipboard, so the string carries its own direction context into any app.",
    breaks:
      "Without the embedding marks, mixed-script pastes flip direction in weaker apps.",
  },
  {
    title: "Urdu character-coverage testing",
    body: "Test output with Urdu-specific characters that sit outside the basic Arabic block — the presentation forms around U+FBxx and the Urdu forms of ہ and ی. A tool that passes Arabic tests but fails these is an Arabic generator with a Urdu label.",
    breaks:
      "Skipping Urdu test cases ships a tool that mangles ٹ ڈ ڑ ں ہ for real users.",
  },
] as const;

export const CLIPBOARD_BIDI_SNIPPET = `// Wrap RTL text so it carries its own direction into any app
const RLE = "\\u202B"; // Right-to-Left Embedding
const PDF = "\\u202C"; // Pop Directional Formatting

function copyRtl(decorated) {
  // decorated already has mirrored borders baked into the string
  const safe = RLE + decorated + PDF;
  navigator.clipboard.writeText(safe);
}`;
