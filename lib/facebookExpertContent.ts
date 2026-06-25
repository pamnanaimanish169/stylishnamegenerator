export const MESSENGER_RENDERING_ROWS = [
  {
    style: "Bold Cursive",
    fbWeb: "Correct",
    fbApp: "Correct",
    messengerApp: "Correct",
    note: "Broadly supported across Facebook surfaces and Messenger.",
  },
  {
    style: "Sans Bold",
    fbWeb: "Correct",
    fbApp: "Correct",
    messengerApp: "Correct",
    note: "Broadly supported; minor weight differences on older Android.",
  },
  {
    style: "Bold Fraktur",
    fbWeb: "Correct",
    fbApp: "Correct",
    messengerApp: "Varies",
    note: "Falls back to system font on Android Messenger below API 29.",
  },
  {
    style: "Double Struck",
    fbWeb: "Correct",
    fbApp: "Correct",
    messengerApp: "Correct",
    note: "Reliable on iOS Messenger; occasional spacing on budget Android.",
  },
  {
    style: "Small Caps",
    fbWeb: "Correct",
    fbApp: "Correct",
    messengerApp: "Correct",
    note: "IPA-based small caps — consistent on most devices.",
  },
  {
    style: "Border / frame styles",
    fbWeb: "Correct",
    fbApp: "Partial",
    messengerApp: "Clipped",
    note: "Push notifications truncate mid-character; group chats strip combining marks.",
  },
  {
    style: "Strikethrough / underline",
    fbWeb: "Partial",
    fbApp: "Broken",
    messengerApp: "Broken",
    note: "Combining-character stacks collapse in Messenger list views.",
  },
] as const;

export type MythVerdict = "Busted" | "Partially True" | "Context-Dependent";

export const MYTH_REALITY_ROWS = [
  {
    myth: "Any Unicode font works if it renders on your screen",
    reality:
      "Rendering on your screen uses your device's local font stack. What Facebook's servers store and what other users' devices render are entirely separate — a name can look perfect to you and appear as boxes to friends on older Android.",
    verdict: "Busted" as MythVerdict,
  },
  {
    myth: "Stylish names violate Facebook's real name policy",
    reality:
      "Facebook's authentic name policy prohibits fake identities, not Unicode letterforms. Legitimate script representations are permitted — the policy targets impersonation and fake personas, not font style.",
    verdict: "Busted" as MythVerdict,
  },
  {
    myth: "You can reset the 60-day timer by deactivating your account",
    reality:
      "The name change cooldown persists through deactivation and reactivation. The only documented reset is a successful appeal through Facebook's name support form with ID verification.",
    verdict: "Busted" as MythVerdict,
  },
  {
    myth: "Stylish names don't work on Facebook anymore after the 2023 update",
    reality:
      "Facebook changed its profile UI, not its name field Unicode handling. Existing stylish names appeared differently in the new header layout's smaller, bolder font — less legible, not actually broken.",
    verdict: "Partially True" as MythVerdict,
  },
  {
    myth: "All stylish name generators produce identical output",
    reality:
      "Underlying Unicode mapping varies. Some generators use Mathematical Bold Script; others use Letterlike Symbols or Enclosed Alphanumerics. Visual output looks similar but codepoints differ — with different Facebook compatibility results.",
    verdict: "Busted" as MythVerdict,
  },
] as const;

export const CROSS_PLATFORM_LIMIT_ROWS = [
  {
    platform: "Facebook display name",
    charLimit: "50 total (first + last)",
    byteNote: "Counts Unicode scalar values, not bytes",
    tightest: "Yes — plan here first",
  },
  {
    platform: "Instagram username",
    charLimit: "30 characters",
    byteNote: "Separate from 150-char bio",
    tightest: "Username only",
  },
  {
    platform: "Instagram display name",
    charLimit: "30 characters",
    byteNote: "Indexed for in-app search",
    tightest: "Keep readable keywords",
  },
  {
    platform: "X / Twitter display name",
    charLimit: "50 characters",
    byteNote: "Emoji count as 2 on some clients",
    tightest: "Moderate",
  },
  {
    platform: "WhatsApp display name",
    charLimit: "~25 visible characters",
    byteNote: "Truncates silently on long names",
    tightest: "Often the real constraint",
  },
  {
    platform: "Telegram display name",
    charLimit: "64 characters",
    byteNote: "Most permissive Unicode support",
    tightest: "Least restrictive",
  },
] as const;

export const CROSS_PLATFORM_FRAMEWORK_STEPS = [
  {
    step: "Pick an anchor style",
    detail:
      "Choose Sans Bold or Bold Cursive as your cross-platform anchor — broad Unicode support across Facebook, Instagram, WhatsApp, and Telegram. Use Fraktur or Double Struck only in bios and status text where rendering failures are lower-stakes.",
  },
  {
    step: "Budget against the tightest limit",
    detail:
      "Facebook allows 50 characters total across first + last name. Fancy Unicode characters are 4 bytes each in UTF-8 — a 10-glyph name can hit byte limits on platforms that count bytes, not glyphs. Design for WhatsApp's ~25 visible characters first.",
  },
  {
    step: "Compensate with profile imagery",
    detail:
      "When a stylish name renders inconsistently, experienced creators embed their name in the desired font inside their profile picture or cover image — bypassing Unicode rendering entirely. Keep the display name field simple; carry the visual brand in the image asset.",
  },
  {
    step: "Handle linked Meta accounts",
    detail:
      "Facebook and Instagram accounts linked through Meta may require passing Instagram handle availability checks when changing your Facebook name. If blocked, temporarily unlink accounts before the name change, then re-link after.",
  },
  {
    step: "Version-pin your codepoints",
    detail:
      "Keep a plain-text record of the exact Unicode codepoints in your chosen name — not just a visual copy. A screenshot re-type or memory paste can produce different codepoints that fail Facebook's validator.",
  },
] as const;

export const BIO_FRAMEWORK_LINES = [
  {
    line: "Line 1 — Identity",
    example: "𝓒𝓸𝓷𝓽𝓮𝓷𝓽 𝓒𝓻𝓮𝓪𝓽𝓸𝓻 ✨",
    font: "Bold Cursive (styled)",
    purpose: "Role or identity statement — styled selectively for contrast above the fold.",
  },
  {
    line: "Line 2 — Value",
    example: "Helping small businesses grow on social media",
    font: "Plain text",
    purpose: "What you do / who you serve — readable at a glance.",
  },
  {
    line: "Line 3 — Niche signal",
    example: "📍 Mumbai · Digital Marketing",
    font: "Emoji anchor + plain",
    purpose: "Location or niche — emoji creates scannable left-margin alignment.",
  },
  {
    line: "Line 4 — CTA",
    example: "↓ DM for collabs ↓",
    font: "Plain or small caps",
    purpose: "Contact or link anchor — clarity beats decoration on the action line.",
  },
] as const;

export const BIO_BEFORE_AFTER = {
  before: {
    label: "Before — font noise, no hierarchy",
    text: "𝓢𝓽𝓾𝓭𝓮𝓷𝓽\n𝕱𝕽𝔼𝔼𝕷𝔸ℕℂ𝔼ℝ\n★彡 𝓜𝓾𝓶𝓫𝓪𝓲 彡★\n𝓓𝓜 𝓶𝓮",
    problems:
      "Every line styled differently, borders waste character budget, no clear scan path.",
  },
  after: {
    label: "After — contrast stacking",
    text: "𝓢𝓽𝓾𝓭𝓮𝓷𝓽 & Freelancer ✨\nBuilding brands for local businesses\n📍 Mumbai · Marketing\nDM for collabs",
    problems:
      "One styled line, two plain lines, emoji anchor — scannable in 3 seconds on mobile.",
  },
} as const;
