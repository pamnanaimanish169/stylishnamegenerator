export const RENDERING_COMPAT_TABLE = [
  {
    style: "Sans Bold / Small Caps",
    safeOn: "iOS, Android 10+, WhatsApp, Instagram, Discord",
    riskyOn: "Very old MIUI/ColorOS skins with stripped Latin Extended",
  },
  {
    style: "Bold Cursive",
    safeOn: "Modern iOS, flagship Android, Instagram bio text",
    riskyOn: "Low-RAM Android 8–9 devices; some in-game HUDs",
  },
  {
    style: "Bold Fraktur / Squared",
    safeOn: "Desktop browsers, recent flagship phones",
    riskyOn: "Older Android (tofu □ boxes); compressed lobby UIs",
  },
  {
    style: "Fullwidth Latin",
    safeOn: "Discord desktop, modern web apps",
    riskyOn: "Discord mobile near markdown chars; some game validators",
  },
  {
    style: "BGMI / Star borders + script core",
    safeOn: "Gaming lobbies on mid-range+ devices when core word is short",
    riskyOn: "Notification banners; apps that truncate decorated strings",
  },
  {
    style: "Upside Down / Strikethrough",
    safeOn: "One-off social posts, aesthetic bios",
    riskyOn: "Kill feeds, search fields, copy-paste from screenshots",
  },
] as const;

export const PLATFORM_CODEPOINT_TABLE = [
  {
    platform: "Instagram display name",
    visibleLimit: "~30 characters",
    codePointBehaviour:
      "Counts combining marks, borders (꧁ ꧂), and emoji; BMP+SMP letters often = 1 each, but decorated strings fill faster than they look",
    riskyStyles: "Heavy borders, stacked emoji, long cursive chains",
  },
  {
    platform: "WhatsApp display name",
    visibleLimit: "~25 characters (soft)",
    codePointBehaviour:
      "Saved name may truncate in push notifications and group headers separately from profile view",
    riskyStyles: "Wide fullwidth text, multi-symbol prefixes",
  },
  {
    platform: "Discord username / nick",
    visibleLimit: "32 characters (server nick)",
    codePointBehaviour:
      "Markdown and role colour layers can clash with fullwidth or combining-heavy strings",
    riskyStyles: "Fullwidth near formatting chars, strikethrough stacks",
  },
  {
    platform: "BGMI profile name",
    visibleLimit: "16 characters (game counter)",
    codePointBehaviour:
      "Counts Unicode code units, not visible glyphs — some letters consume 2 slots",
    riskyStyles: "Fraktur, enclosed letters, double borders",
  },
  {
    platform: "Free Fire profile name",
    visibleLimit: "20 characters (game counter)",
    codePointBehaviour:
      "Similar byte/slot counting to BGMI; guild field is shorter and stricter",
    riskyStyles: "Squared, fullwidth, experimental Unicode blocks",
  },
] as const;

export const NICKNAME_MYTHS_TABLE = [
  {
    myth: "Any Unicode nickname works on any platform",
    reality:
      "Rendering depends on device OS, font stack, and app version. Some styles show as boxes on older Android.",
    whyItMatters:
      "Test on the same phone your audience uses before spending rename currency or publishing a brand name.",
  },
  {
    myth: "Longer, more decorated names look more impressive in-game",
    reality:
      "Kill feeds and lobby lists compress or truncate over-decorated strings. A clean 8-character name with one border reads stronger than a 20-character wall of symbols.",
    whyItMatters:
      "Lobby presence is about instant recognition, not maximum decoration.",
  },
  {
    myth: "Fancy text is just a different font",
    reality:
      "It is different Unicode characters that look like styled letters — no font install needed, but environments without those glyphs cannot render them.",
    whyItMatters:
      "Explains both why copy-paste works everywhere in theory and why it sometimes fails in practice.",
  },
  {
    myth: "Changing your nickname frequently keeps you fresh",
    reality:
      "Frequent display-name changes hurt recognition on WhatsApp and Instagram and can trigger spam heuristics on some platforms.",
    whyItMatters:
      "Stability helps friends find you; save experiments for alt accounts.",
  },
  {
    myth: "The rarest-looking style is always the best choice",
    reality:
      "When 40% of a lobby uses Fraktur borders, rarity collapses — minimal styles can stand out more in a saturated meta.",
    whyItMatters:
      "Choose deliberately for context, not maximum ornament by default.",
  },
] as const;

export const UNICODE_VARIANT_EXAMPLES = [
  {
    label: "Plain Latin",
    display: "Shadow",
    codePoints: "U+0053 U+0068 U+0061 U+0064 U+006F U+0077",
    notes: "Standard ASCII — every platform, every search field.",
  },
  {
    label: "Mathematical Bold Script",
    display: "𝓢𝓱𝓪𝓭𝓸𝔀",
    codePoints: "U+1D4E2 U+1D4BB U+1D4B6 U+1D4B9 U+1D4BC U+1D4D0",
    notes: "SMP range — looks like a font, counts as distinct characters.",
  },
  {
    label: "Mixed fingerprint (example)",
    display: "Shαdow",
    codePoints: "U+0053 U+0068 U+03B1 U+0064 U+006F U+0077",
    notes:
      "Latin + Greek alpha (U+03B1) — visually similar, technically a different string.",
  },
] as const;
