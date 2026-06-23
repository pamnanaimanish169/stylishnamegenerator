/** BGMI name generator page — expert article tables and frameworks. */

export const BGMI_FONT_STACK_TABLE = [
  {
    styleBlock: "Mathematical Bold (𝐀–𝐳)",
    breaksOn: "Rarely breaks — BMP block, covered by Noto on Android 8+",
    deviceTier: "Safe on budget (Redmi, Tecno) and flagship alike",
  },
  {
    styleBlock: "Mathematical Bold Script (𝓐–𝔃)",
    breaksOn: "Occasional boxes on Android 8–9 with stripped fonts",
    deviceTier: "Safe on most 2020+ devices; test on squad's oldest phone",
  },
  {
    styleBlock: "Fraktur Gothic (𝔄–𝔷)",
    breaksOn: "Frequent □ boxes on MIUI 12–14 low-RAM devices",
    deviceTier: "Risky on budget Android; safer on iOS and Pixel stock",
  },
  {
    styleBlock: "Double Struck (𝔸–𝕫)",
    breaksOn: "Supplementary plane — fails on stripped ColorOS / older MIUI",
    deviceTier: "Mid-to-high risk on Indian budget segment (~40% of BGMI)",
  },
  {
    styleBlock: "Enclosed Alphanumerics (Ⓟ)",
    breaksOn: "Usually survives; occasional missing glyphs on Android 9",
    deviceTier: "Generally safe across device tiers",
  },
  {
    styleBlock: "Decorative borders (꧁ ꧂ ༺ ༻)",
    breaksOn: "BMP symbols — rarely break; patch swaps can affect rare pairs",
    deviceTier: "Safe; prefer over exotic SMP decorations",
  },
  {
    styleBlock: "Rare SMP symbols (𓆩 𓆪 etc.)",
    breaksOn: "Often missing on any device without extended font pack",
    deviceTier: "High risk — avoid for cross-squad readability",
  },
] as const;

export const BGMI_CODEPOINT_TIER_TABLE = [
  {
    category: "Basic Latin + ASCII",
    codePointsPerChar: "1",
    charsIn14Slots: "14 visible characters",
    tier: "Safe",
  },
  {
    category: "Mathematical Bold / Italic (BMP)",
    codePointsPerChar: "1",
    charsIn14Slots: "Up to 14 styled letters",
    tier: "Safe",
  },
  {
    category: "Enclosed / Circled (Ⓟ ○)",
    codePointsPerChar: "1",
    charsIn14Slots: "Up to 14 enclosed glyphs",
    tier: "Safe",
  },
  {
    category: "Decorative borders (꧁ ꧂ ★ 彡)",
    codePointsPerChar: "1 each",
    charsIn14Slots: "Budget 6 slots for borders → 8 left for core",
    tier: "Safe",
  },
  {
    category: "Bold Script / Fraktur / Double Struck (SMP)",
    codePointsPerChar: "2 (UTF-16 surrogate pair)",
    charsIn14Slots: "7 SMP letters max in 14 slots",
    tier: "Expensive",
  },
  {
    category: "Hangul Filler invisible (ㅤ U+3164)",
    codePointsPerChar: "1",
    charsIn14Slots: "Counts as a slot despite being invisible",
    tier: "Use sparingly",
  },
  {
    category: "Zero-width joiners (U+200C / U+200D)",
    codePointsPerChar: "1 each",
    charsIn14Slots: "Patch-dependent — some versions reject silently",
    tier: "Risky",
  },
] as const;

export const BGMI_CODEPOINT_EXAMPLES = [
  {
    label: "Plain + borders",
    display: "꧁Pro꧂",
    visibleChars: "7",
    estimatedSlots: "~9 (2 borders + 3 ASCII letters)",
    note: "Fits easily — best for rename-card safety",
  },
  {
    label: "Bold Script core",
    display: "꧁𝓟𝓻𝓸꧂",
    visibleChars: "5",
    estimatedSlots: "~11 (2 borders + 3 SMP letters × 2)",
    note: "Looks short, counts long — common rename-card trap",
  },
  {
    label: "Full Fraktur + heavy borders",
    display: "꧁༒𝕯𝖆𝖗𝖐༒꧂",
    visibleChars: "8",
    estimatedSlots: "14+ — likely rejected or truncated",
    note: "Exceeds limit despite looking compact in preview",
  },
] as const;

export const BGMI_PLAY_STYLE_DECISION = [
  {
    goal: "Casual flex / fun with friends",
    approach: "Go decorative",
    recommendation:
      "Use star borders, cursive script cores, and squad-matching prefixes. Readability across every device matters less in casual lobbies — prioritise the wow factor your friends will screenshot.",
    example: "★彡𝓝𝓲𝓰𝓱𝓽彡★",
  },
  {
    goal: "Competitive ranked (Ace / Conqueror)",
    approach: "Go minimal",
    recommendation:
      "Short 3–6 character handles with zero or one subtle border. Heavy ꧁༒KILLER༒꧂ patterns signal casual play and can attract pre-targeting. India's top leaderboard names are overwhelmingly clean.",
    example: "jay or ☬Pro☬",
  },
  {
    goal: "Clan leader / recruitment",
    approach: "Go structured",
    recommendation:
      "Consistent prefix format across all members (e.g. ꧁𝕮𝕷𝕬𝕹|Name꧂) signals organisation to recruits and opponents. Unstructured decoration reads as solo-queue casual.",
    example: "꧁𝕮𝕷𝕬𝕹|𝓑𝓞𝓢꧂",
  },
  {
    goal: "Content creator / streamer",
    approach: "Go brand-stable",
    recommendation:
      "Treat your in-game name as a brand asset — coordinate with overlays and audience recognition. Build a primary aesthetic name and a BMP-only fallback for patch breaks. Avoid frequent renames that confuse subscribers.",
    example: "Primary: 𝓢𝓱𝓪𝓭𝓸𝔀 · Fallback: Shadow",
  },
] as const;

export const BGMI_MYTHS_TABLE = [
  {
    myth: "Longer names with more symbols look more pro",
    reality:
      "Top-ranked BGMI players use 4–8 character names. Heavy borders signal casual or new players in the high-rank community.",
    belief: "Very common",
  },
  {
    myth: "Special characters guarantee your name is unique",
    reality:
      "Viral combos like ꧁༺...༻꧂ are used by hundreds of thousands. Friend-search for ꧁𝓚𝓲𝓵𝓵𝓮𝓻꧂ returns dozens of matches.",
    belief: "Very common",
  },
  {
    myth: "Invisible characters make your name impossible to search",
    reality:
      "BGMI normalises some Unicode in friend search. Your numeric player ID is always searchable regardless of display name.",
    belief: "Common",
  },
  {
    myth: "You can use any Unicode character and it'll work",
    reality:
      "Krafton maintains a blocklist of ranges that caused crashes or impersonation issues. Rejection with no error message usually means you hit the blocklist.",
    belief: "Common",
  },
  {
    myth: "Rename Cards cost the same UC everywhere, anytime",
    reality:
      "UC pricing varies by region and payment method in India. Experienced players hold renames for 3–5 annual free events tracked on r/BGMI and Discord.",
    belief: "Moderate",
  },
] as const;

export const BGMI_NAME_LAYER_FRAMEWORK = [
  {
    step: "Layer 1 — Border",
    description:
      "Pick left and right border symbols independently (꧁...꧂). Test each side alone in the rename preview before combining.",
    example: "꧁☬彡 · · · 彡☬꧂",
  },
  {
    step: "Layer 2 — Decoration",
    description:
      "Add mid-tier symbols (★, 彡, ☬) between border and core. These are the first layer to swap when a patch breaks rendering.",
    example: "★ · ☬ · [core] · ☬ · ★",
  },
  {
    step: "Layer 3 — Core Name",
    description:
      "Build the core in Mathematical Bold Script or Bold (most patch-proof). Keep SMP-heavy Fraktur out of the core if cross-device survival matters.",
    example: "𝓟𝓻𝓸 or 𝐏𝐫𝐨",
  },
  {
    step: "Test Protocol",
    description:
      "Apply the combined name, then ask a squadmate on a different-brand phone to screenshot your lobby card. Redmi Note pass = ~70% of Indian BGMI audience covered.",
    example: "2-device screenshot test within 48h of any patch",
  },
  {
    step: "Fallback Plan",
    description:
      "Save a BMP-only version (plain Bold + ASCII borders) in your notes app. When a patch breaks your primary, switch immediately without losing identity.",
    example: "Primary: ꧁𝓟𝓻𝓸꧂ → Fallback: ꧁Pro꧂",
  },
] as const;

export const BGMI_NAME_ARCHITECTURE = {
  borderLeft: "꧁☬彡",
  decoration: "★",
  core: "𝓟𝓻𝓸",
  decorationRight: "★",
  borderRight: "彡☬꧂",
  slotBudget: "6 border + 6 core (3 SMP × 2) = 12 slots — 2 remaining",
} as const;
