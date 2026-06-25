export const UNICODE_REALITY_ROWS = [
  {
    usersCallIt: "Cursive Marathi font",
    actuallyIs: "Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF) — separate Unicode characters, not font styling",
    whyItMatters:
      "𝓜 and M are as different in Unicode as A and B. They survive copy-paste because they are characters, not font changes.",
  },
  {
    usersCallIt: "Bold Marathi text",
    actuallyIs:
      "Either a font rendering trick (breaks on paste), heavy decorative borders, or Latin transliteration in bold Unicode",
    whyItMatters:
      "There is no Unicode-native bold Devanagari. True bold Marathi cannot be copy-pasted across apps.",
  },
  {
    usersCallIt: "Decorated Marathi font",
    actuallyIs:
      "Devanagari script wrapped in Unicode homoglyphs and decorative character sets from multiple script blocks",
    whyItMatters:
      "Borders from Tai Tham (꧁), Tibetan (༺), or Cham (ꫝ) are unrelated scripts used as decoration — not Marathi typography.",
  },
  {
    usersCallIt: "Stylish font download",
    actuallyIs:
      "No installable font file — a string of Unicode code points that render differently per device",
    whyItMatters:
      "You cannot download these as .ttf files. The generator output IS the final product.",
  },
  {
    usersCallIt: "Marathi text for Google search",
    actuallyIs:
      "Mathematical symbols when using Latin Unicode styles (𝔐𝔞𝔯𝔞𝔱𝔥𝔦)",
    whyItMatters:
      "Search engines read styled Latin as symbols, not Marathi words — reducing profile discoverability.",
  },
] as const;

export const FONT_BREAK_FIX_ROWS = [
  {
    problem: "Boxes instead of ꧁ ꧂ borders",
    platform: "WhatsApp Web on Windows Chrome",
    fix: "Switch to ★, ═, or • frames — ASCII-adjacent symbols with reliable Chromium Devanagari fallback",
  },
  {
    problem: "Missing ꧁ or ༺ characters",
    platform: "Samsung One UI 2.x and below (Galaxy J/M series 2019–2021)",
    fix: "Use ★ Star Frame or ═ Double Line — stripped Noto Sans Devanagari drops rare Unicode blocks",
  },
  {
    problem: "Anusvara (ं) or visarga (ः) disappears",
    platform: "Instagram bio save via Android clipboard",
    fix: "Type Devanagari directly with Gboard Marathi keyboard; paste only surrounding decoration from clipboard",
  },
  {
    problem: "Group name cuts off mid-word",
    platform: "WhatsApp group name (25 char limit)",
    fix: "Budget 4 chars for ꧁ ꧂ before your text starts — use ★ or no border on short names",
  },
  {
    problem: "Same text looks bold on one PC, light on another",
    platform: "Windows 11 (Noto Sans Devanagari) vs Windows 10 (Mangal)",
    fix: "Preview on target devices; avoid relying on weight differences for emphasis",
  },
] as const;

export const SOCIAL_CONTEXT_ROWS = [
  {
    context: "Religious / devotional (श्री गणेशाय नमः, puja groups)",
    recommended: "Minimal — plain Devanagari or single ☬/ॐ with care",
    avoid: "ꫝ Cham borders, ༒ Tibetan trident, generic sparkle wraps around sacred text",
    safer: "Plain text, or ★ frame with no borrowed-script decoration",
  },
  {
    context: "Government / corporate WhatsApp groups",
    recommended: "Semi-formal at most — simple star frames",
    avoid: "🔥 Fire Style, ░▒▓ shade borders, heavy emoji stacks",
    safer: "★ Star Frame or unadorned Marathi text",
  },
  {
    context: "Obituary / condolence messages",
    recommended: "None — plain respectful Marathi only",
    avoid: "🌸 Floral frames, 💐 bouquets, ✦ sparkles, 🔥 fire emojis",
    safer: "Unstyled Devanagari; शांतिप्रार्थना or condolence text without decoration",
  },
  {
    context: "Regional political / public Marathi pages",
    recommended: "Devanagari-first; minimal Latin Unicode for romanised names",
    avoid: "Tibetan ༺ or Tai Tham ꧁ borrowed-script borders around Marathi identity text",
    safer: "★ or ═ simple frames; keep Marathi script visually dominant",
  },
  {
    context: "School / college parent-teacher groups",
    recommended: "Clean group names from teacher/admin accounts",
    avoid: "Heavy decoration on official announcements or group titles",
    safer: "School name in plain Marathi; save decoration for student personal status only",
  },
] as const;

export const MYTH_REALITY_ROWS = [
  {
    myth: "These fonts look the same for everyone",
    reality:
      "Rendering is entirely device and OS dependent. The same decorated string looks different on Pixel 8 (Google Noto), Samsung Galaxy (modified Noto), and iPhone (Apple Devanagari in San Francisco fallback). There is no canonical correct appearance.",
    why: "Always preview on the platform and device your audience actually uses.",
  },
  {
    myth: "You can make any Marathi text stylish",
    reality:
      "Devanagari conjunct characters (jodakshar — क्ष, त्र, ज्ञ) rely on complex glyph shaping. Borders can disrupt shaping on some platforms, splitting conjuncts into component letters (क् + ष instead of क्ष).",
    why: "Test conjunct-heavy words like क्षेत्र or त्र्यंबक before publishing.",
  },
  {
    myth: "Bold Devanagari Unicode exists",
    reality:
      "It does not. The Mathematical Alphanumeric block covers only Latin, Greek, and digits. Any bold Marathi you see is a font trick, weight illusion from heavy borders, or Latin transliteration in bold Unicode.",
    why: "Do not hunt for a bold Marathi font file — it cannot exist in Unicode.",
  },
  {
    myth: "Instagram supports all Unicode Marathi characters",
    reality:
      "Instagram compresses and re-encodes text in some regions. Devanagari base characters are stable, but combining marks (anusvara, visarga) and rare decorative blocks are not guaranteed to survive every save.",
    why: "Type Devanagari directly in Instagram when possible; paste decoration only.",
  },
  {
    myth: "Adding more decoration makes it more stylish",
    reality:
      "Heavy decoration reduces readability in Devanagari because the script already has vertical complexity — the shirorekha top bar plus stacked consonants create inherent visual density. Single-element frames outperform compound borders.",
    why: "One ★ or ═ frame beats ꧁✦🔥मराठी🔥✦꧂ for both readability and cross-platform safety.",
  },
] as const;

export const STYLE_STACK_ELEMENTS = [
  {
    element: "Primary frame",
    role: "Display name / group title",
    example: "꧁ मराठी ꧂",
    note: "Pick one border style and use it everywhere — your visual signature",
  },
  {
    element: "Secondary accent",
    role: "Status / bio highlight",
    example: "🌺",
    note: "One emoji accent repeated across platforms for recognition",
  },
  {
    element: "Latin Unicode style",
    role: "Romanised name in captions",
    example: "𝓟𝓻𝓪𝓽𝓲𝓴 (Bold Cursive)",
    note: "For English transliterations only — Devanagari stays in plain or framed script",
  },
] as const;

export const PLATFORM_CONSTRAINT_ROWS = [
  {
    platform: "WhatsApp display name",
    limit: "25 characters",
    strategy: "Build style system around this — most constrained field",
  },
  {
    platform: "WhatsApp About",
    limit: "139 characters",
    strategy: "Room for one frame + short Marathi status message",
  },
  {
    platform: "Instagram bio",
    limit: "150 characters",
    strategy: "Secondary accent emoji + framed tagline works well here",
  },
  {
    platform: "Facebook page name",
    limit: "75 characters",
    strategy: "Expand decoration outward from WhatsApp name constraints",
  },
] as const;
