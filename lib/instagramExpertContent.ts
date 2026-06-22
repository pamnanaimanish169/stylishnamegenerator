export const FONT_COMPATIBILITY_ROWS = [
  {
    style: "Cursive Script",
    bio: "Yes",
    name: "Caution",
    feedCaption: "Yes",
    stories: "No",
    tofuRisk: "Low–Medium",
    note: "iOS renders slightly rounder than Android on older devices.",
  },
  {
    style: "Bold Cursive",
    bio: "Yes",
    name: "Caution",
    feedCaption: "Yes",
    stories: "No",
    tofuRisk: "Low–Medium",
    note: "Same Mathematical Alphanumeric block as Cursive Script.",
  },
  {
    style: "Small Caps",
    bio: "Yes",
    name: "Yes",
    feedCaption: "Yes",
    stories: "No",
    tofuRisk: "Low",
    note: "IPA-based small caps — widely supported on Android 8+.",
  },
  {
    style: "Sans Italic",
    bio: "Yes",
    name: "Yes",
    feedCaption: "Yes",
    stories: "No",
    tofuRisk: "Low",
    note: "Among the safest styles in our generator.",
  },
  {
    style: "Fullwidth",
    bio: "Yes",
    name: "Caution",
    feedCaption: "Yes",
    stories: "No",
    tofuRisk: "Low–Medium",
    note: "Pre-Android 10 devices may show spacing gaps.",
  },
  {
    style: "Double Struck",
    bio: "Yes",
    name: "Yes",
    feedCaption: "Yes",
    stories: "No",
    tofuRisk: "Low",
    note: "Mathematical Alphanumeric Symbols — best-tested block.",
  },
  {
    style: "Circled",
    bio: "Yes",
    name: "No",
    feedCaption: "Yes",
    stories: "No",
    tofuRisk: "Medium",
    note: "Enclosed Alphanumerics — higher tofu risk on MIUI & old Android.",
  },
] as const;

export const OS_COMPATIBILITY_ROWS = [
  {
    platform: "iOS 15+",
    rendering: "Excellent",
    tofuRisk: "Rare",
    notes: "Native Apple Color Emoji + strong Unicode stack.",
  },
  {
    platform: "iOS 12–14",
    rendering: "Good",
    tofuRisk: "Low",
    notes: "Some combining marks clip differently in bio field.",
  },
  {
    platform: "Android 12+",
    rendering: "Good",
    tofuRisk: "Low",
    notes: "Noto fonts cover most Mathematical Alphanumeric ranges.",
  },
  {
    platform: "Android 10–11",
    rendering: "Fair",
    tofuRisk: "Medium",
    notes: "Circled and Fullwidth may show gaps on budget phones.",
  },
  {
    platform: "Android 9 and below",
    rendering: "Poor",
    tofuRisk: "High",
    notes: "Avoid Circled; stick to Double Struck or Sans Italic.",
  },
] as const;

export const CHAR_BREAKDOWN_ROWS = [
  { segment: "Line 1 (styled text)", visible: "Dreamer by day 🌙", counted: "18", notes: "Each fancy letter = 1 code point" },
  { segment: "Line break", visible: "(invisible)", counted: "1", notes: "Newline consumes 1 character" },
  { segment: "Line 2 (styled text)", visible: "Stargazer by night", counted: "18", notes: "Plain Latin in example; styled = same count" },
  { segment: "Moon emoji 🌙", visible: "1 glyph", counted: "1", notes: "Simple emoji = 1 code point" },
  { segment: "Rainbow flag 🏳️‍🌈", visible: "1 glyph", counted: "4–5", notes: "ZWJ sequence — counts as multiple" },
  { segment: "Sparkle combo ✨", visible: "1 glyph", counted: "1", notes: "Single-code-point emoji" },
] as const;

export const MYTH_REALITY_ROWS = [
  {
    myth: "Any font generator works the same way",
    reality:
      "Generators using Mathematical Alphanumeric Unicode (like ours) work across platforms. Tools that substitute Cyrillic or obscure look-alike letters may look fine visually but break search indexing and screen readers.",
    why: "Your bio becomes unreadable to accessibility tools and Instagram's name search index.",
  },
  {
    myth: "Stylish fonts hurt your Instagram reach",
    reality:
      "The algorithm ranks on engagement, not font rendering. However, if your display name is entirely fancy Unicode, Instagram's search may not match plain-text queries for your real name.",
    why: "Reach is unaffected; discoverability via name search is the real nuance.",
  },
  {
    myth: "You need a separate app for each platform",
    reality:
      "The same Unicode characters paste into Instagram, TikTok, X, WhatsApp, and Facebook bios. The Unicode standard is universal — the platform doesn't change the characters.",
    why: "One generator output works everywhere — no per-app workflow needed.",
  },
  {
    myth: "Fancy fonts work reliably in Instagram DMs",
    reality:
      "DMs render plain text. Unicode may display styled on the sender's phone but show as boxes or plain letters on the recipient's device depending on their OS font stack.",
    why: "DMs are an inconsistent use case — bios and captions are reliable; DMs are not.",
  },
  {
    myth: "More stylish = more followers",
    reality:
      "Bio aesthetics influence first-impression follow decisions, but font complexity has zero correlation with follower growth. Clarity and value proposition matter more than decoration.",
    why: "Treat fonts as formatting, not a growth strategy.",
  },
  {
    myth: "A stylish display name helps Instagram SEO",
    reality:
      "Instagram indexes your display name for in-app search. If your name is entirely Mathematical Bold Unicode, searches for your real name in plain Latin may not surface your profile.",
    why: "Reserve plain readable keywords in the name field; save fancy styles for the bio.",
  },
] as const;

export const CREATOR_FRAMEWORK_LINES = [
  {
    line: "Line 1 — Identity",
    example: "✨ 𝒟𝓇𝑒𝒶𝓂𝑒𝓇 · Content Creator",
    font: "Bold Cursive or Cursive Script",
    purpose: "Who you are — styled to grab attention above the fold.",
  },
  {
    line: "Line 2 — Value",
    example: "ꜰʀᴇᴇ ᴛɪᴘꜱ ᴏɴ ɢʀᴏᴡᴛʜ & ᴀᴇꜱᴛʜᴇᴛɪᴄꜱ",
    font: "Small Caps",
    purpose: "What followers get — readable at a glance, less decorative.",
  },
  {
    line: "Line 3 — CTA",
    example: "↓ Latest reel pinned ↓",
    font: "Plain text or light Unicode",
    purpose: "What to do next — clarity beats decoration on the action line.",
  },
] as const;

export const UNICODE_STACK_EXAMPLES = [
  {
    label: "Bold-cursive A with underline",
    chars: "𝓐\u0332",
    description: "Base character 𝓐 (U+1D4D0) + combining low line (U+0332).",
  },
  {
    label: "Bold-cursive A with double strike",
    chars: "𝓐\u0336\u0335",
    description: "Base + combining long stroke overlay + combining short stroke.",
  },
  {
    label: "Plain A with dot above",
    chars: "A\u0307",
    description: "Latin A + combining dot above (U+0307) — works on any letter.",
  },
] as const;

export const CONSOLE_EXAMPLE = String.raw`'\u{1D4D0}' + '\u0332' + '\u0305'`;
