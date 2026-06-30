import type { Metadata } from "next";
import { generateAll } from "@/lib/fontStyles";
import { SITE_URL } from "@/lib/site";

export type FontVariant = {
  label: string;
  text: string;
};

export type PopularName = {
  plain: string;
  variants: FontVariant[];
};

export type LetterFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type LetterCrossLink = {
  href: string;
  title: string;
  description: string;
};

export type LetterConfig = {
  letter: "S" | "M" | "J";
  slug: string;
  /** Placeholder + default pre-rendered name shown before the user types. */
  placeholder: string;
  title: string;
  description: string;
  h1: string;
  /** Keyword the intro paragraph must lead with. */
  introVariant: "s" | "m" | "j";
  howToHeading: string;
  popularHeading: string;
  popularIntro: string;
  faqHeading: string;
  popularNames: PopularName[];
  faq: LetterFaqItem[];
  itemListName: string;
  relatedTools: LetterCrossLink[];
  webAppName: string;
  webAppDescription: string;
  /** Letter-specific lead paragraph for the "stylish-friendly letters" section. */
  letterProfileLead: string;
  /** A longer name from this page used in length-checking advice. */
  longNameExample: string;
  /** Unique editorial section about this letter's names (duplicate-content guard). */
  aboutHeading: string;
  aboutParagraphs: string[];
  /** Letter-specific note shown inside the rendering-reliability section. */
  renderingNote: string;
};

export type StyleReliabilityRow = {
  style: string;
  games: string;
  social: string;
  tier: "Safest" | "Usually safe" | "Risky" | "Riskiest";
};

/** Section 1 — how each of the 10 showcase styles holds up by platform. */
export const STYLE_RELIABILITY: StyleReliabilityRow[] = [
  { style: "Sans Bold", games: "Reliable", social: "Reliable", tier: "Safest" },
  { style: "Small Caps", games: "Reliable", social: "Reliable", tier: "Safest" },
  {
    style: "Monospace",
    games: "Reliable",
    social: "Reliable",
    tier: "Safest",
  },
  {
    style: "Bold Cursive",
    games: "Usually fine",
    social: "Reliable",
    tier: "Usually safe",
  },
  {
    style: "Sans Italic",
    games: "Thin — can blur under HUD",
    social: "Reliable",
    tier: "Usually safe",
  },
  {
    style: "Double Struck",
    games: "Tofu risk on old Android",
    social: "Usually fine",
    tier: "Risky",
  },
  {
    style: "Circled",
    games: "Often boxed in games",
    social: "Usually fine",
    tier: "Risky",
  },
  {
    style: "Squared",
    games: "Often boxed in games",
    social: "Usually fine",
    tier: "Risky",
  },
  {
    style: "Fraktur Gothic",
    games: "High tofu risk",
    social: "Usually fine on modern apps",
    tier: "Riskiest",
  },
  {
    style: "Bold Fraktur",
    games: "High tofu risk",
    social: "Usually fine on modern apps",
    tier: "Riskiest",
  },
];

export type LetterComparisonRow = {
  letter: string;
  best: string;
  avoid: string;
  note: string;
};

/** Section 2 — shared comparison table across the three letters. */
export const LETTER_STYLE_COMPARISON: LetterComparisonRow[] = [
  {
    letter: "S",
    best: "Almost all — Bold Cursive, Double Struck, Sans Bold",
    avoid: "None major",
    note: "A simple single-curve shape that stays legible in every Unicode set.",
  },
  {
    letter: "M",
    best: "Bold Cursive, Sans Bold, Small Caps",
    avoid: "Circled, Squared (look stretched)",
    note: "M is a wide letter, so enclosed styles add even more width and long M names look stretched.",
  },
  {
    letter: "J",
    best: "Bold Cursive, Double Struck, Sans Bold",
    avoid: "Fraktur Gothic, Bold Fraktur (cramped J)",
    note: "The capital J in many Fraktur sets is small and heavily stylised, so J names can look cramped.",
  },
];

export type UseCaseRow = {
  context: string;
  pick: string;
  note: string;
};

/** Section 3 — choosing a style by where it will be used. */
export const USE_CASE_GUIDE: UseCaseRow[] = [
  {
    context: "Gaming (BGMI / Free Fire)",
    pick: "Sans Bold, Small Caps, star-bordered core",
    note: "Name tags are tiny and overlap the HUD. Avoid thin strokes (Sans Italic) and Fraktur, which blur or box out.",
  },
  {
    context: "Instagram bio / caption",
    pick: "Anything — Bold Cursive, Fraktur, Circled",
    note: "Bio text is forgiving, so reserve your heaviest styling here where it is purely decorative.",
  },
  {
    context: "Instagram username / display name",
    pick: "Light styling only (Sans Bold)",
    note: "Heavily styled names do not appear in Instagram's search, so discoverability suffers. Balance aesthetics against being findable.",
  },
  {
    context: "WhatsApp display name",
    pick: "Bold Cursive, Sans Bold, Small Caps",
    note: "Works well, but contacts on older phones or the WhatsApp Business API may see boxes — keep it readable for professional use.",
  },
  {
    context: "Professional (LinkedIn, email, resume)",
    pick: "Plain text — no styling",
    note: "Screen readers cannot read mathematical Unicode, and recruiters' search tools ignore it. Styling here hurts accessibility and discoverability.",
  },
];

export type ToolComparisonRow = {
  feature: string;
  ours: string;
  lingojam: string;
};

/** Section 4 — balanced comparison vs LingoJam (verified June 2026). */
export const TOOL_COMPARISON: ToolComparisonRow[] = [
  {
    feature: "Generation speed",
    ours: "Instant, client-side as you type",
    lingojam: "Instant typing, but pages also load a comments section and ads",
  },
  {
    feature: "Mobile experience",
    ours: "Touch-friendly Copy button on every style card",
    lingojam: "Works on mobile, but the two-box, long-scroll layout is desktop-first",
  },
  {
    feature: "Font variety",
    ours: "A focused, curated set of reliable styles",
    lingojam: "Dozens of fonts — more variety if you are willing to scroll",
  },
  {
    feature: "Curated name ideas",
    ours: "Letter-specific S / M / J name lists, pre-styled",
    lingojam: "None — a single generic converter, no name suggestions",
  },
  {
    feature: "Platform guidance",
    ours: "Reliability tiers and per-platform advice (this page)",
    lingojam: "General notes about boxes, no platform-specific tiering",
  },
  {
    feature: "Registration",
    ours: "None required",
    lingojam: "None required",
  },
];

/** Pre-render a set of styled variants once at build time (no client-side generation). */
function styledVariants(name: string, styleIds: string[]): FontVariant[] {
  const all = generateAll(name);
  return styleIds
    .map((id) => all.find((style) => style.id === id))
    .filter((style): style is (typeof all)[number] => Boolean(style))
    .map((style) => ({ label: style.name, text: style.text }));
}

/** One widely-compatible fancy variant per curated name. */
const POPULAR_STYLE_IDS = ["bold-cursive"];

function buildPopular(names: string[]): PopularName[] {
  return names.map((plain) => ({
    plain,
    variants: styledVariants(plain, POPULAR_STYLE_IDS),
  }));
}

const S_NAMES = [
  "Sara",
  "Shreya",
  "Sahil",
  "Sneha",
  "Siddharth",
  "Sanjana",
  "Suresh",
  "Simran",
  "Shivam",
  "Sonia",
  "Saurabh",
  "Sakshi",
  "Sumit",
  "Swati",
  "Sachin",
  "Sunil",
  "Shruti",
  "Sameer",
  "Snehal",
  "Sandeep",
  "Sapna",
  "Shyam",
];

const M_NAMES = [
  "Mohit",
  "Meera",
  "Manish",
  "Mansi",
  "Mahesh",
  "Mehak",
  "Mukesh",
  "Mayank",
  "Manya",
  "Megha",
  "Manoj",
  "Mamta",
  "Mihir",
  "Madhuri",
  "Mohan",
  "Mira",
  "Mukul",
  "Monika",
  "Madhav",
  "Maya",
  "Mitali",
  "Munish",
];

const J_NAMES = [
  "Jay",
  "Jaya",
  "Jatin",
  "Juhi",
  "Jeevan",
  "Jagdish",
  "Jiya",
  "Jagat",
  "Jasmine",
  "Jignesh",
  "Janvi",
  "Jitesh",
  "Jyoti",
  "Jagriti",
  "Jaideep",
  "Jhanvi",
  "Jeet",
  "Jaspreet",
  "Jayesh",
  "Jagjit",
  "Jasleen",
  "Jitendra",
];

const HOME_LINK: LetterCrossLink = {
  href: "/",
  title: "Stylish Name Generator",
  description: "Every Unicode font style in one place — all platforms.",
};

const FREESTYLE_LINK: LetterCrossLink = {
  href: "/freestyle-nickname-generator",
  title: "Freestyle Nickname Generator",
  description: "Creative nicknames with no character limit, grouped by vibe.",
};

const S_LINK: LetterCrossLink = {
  href: "/s-stylish-name",
  title: "S Stylish Names",
  description: "Fancy fonts and 20+ name ideas starting with S.",
};

const M_LINK: LetterCrossLink = {
  href: "/m-stylish-name",
  title: "M Stylish Names",
  description: "Myself stylish name ideas and fancy M name fonts.",
};

const J_LINK: LetterCrossLink = {
  href: "/j-stylish-name",
  title: "J Stylish Names",
  description: "Fancy fonts and 20+ name ideas starting with J.",
};

export const S_CONFIG: LetterConfig = {
  letter: "S",
  slug: "/s-stylish-name",
  placeholder: "Sara",
  title:
    "S Stylish Name Generator ✨ S Style Names Copy Paste (2025)",
  description:
    "Generate stylish names starting with S in fancy Unicode fonts. Copy paste S style names for Instagram, BGMI, WhatsApp and more — 50+ name ideas included.",
  h1: "S Stylish Name — Fancy Fonts & Name Ideas",
  introVariant: "s",
  howToHeading: "How to Create a Stylish S Name",
  popularHeading: "Popular S Stylish Names",
  popularIntro:
    "Hand-picked names starting with S, each pre-styled in two fancy fonts. Tap Copy on any version to use it instantly — or type your own S name in the tool above.",
  faqHeading: "Frequently Asked Questions About S Stylish Names",
  popularNames: buildPopular(S_NAMES),
  itemListName: "Popular S Stylish Names",
  webAppName: "S Stylish Name Generator",
  webAppDescription:
    "Generate stylish S names in fancy Unicode fonts. S style name ideas with copy paste.",
  letterProfileLead:
    "Good news if your name starts with S: it is one of the most forgiving letters across all ten styles. The capital S is a simple single curve, so it stays clean and readable whether you pick Fraktur, Double Struck, or Sans Bold — there is no style that visibly breaks an S name.",
  longNameExample: "Siddharth",
  aboutHeading: "Why S Names Are So Popular for Stylish Profiles",
  aboutParagraphs: [
    "S is statistically one of the most common starting letters in Indian names — surnames like Sharma, Singh, and Shah, plus first names like Sara, Shreya, Suresh, and Simran. Because so many people share an S name, a distinctive stylish S name genuinely helps you stand out, whether it is a BGMI lobby full of similar tags or an Instagram search full of plain text.",
    "The capital S is also one of the most style-friendly letters in Unicode. Its smooth single curve survives almost every transformation cleanly, so an S name gives you more usable options than trickier letters like J or W. Cursive S (𝓢), double-struck S (𝕊), and small-caps ꜱ all stay instantly recognisable, which means you can pick a font purely on looks rather than worrying whether the first letter will read correctly.",
    "One practical note for S names: short picks like Sam, Sia, and Sky shine inside strict game name fields, while longer ones such as Siddharth and Shubham look best in lighter styles where the extra width does not push you past a character limit.",
  ],
  renderingNote:
    "Because the capital S is such a clean shape, S names rarely tofu-box even in the riskier styles — the bigger thing to watch is any heavy border or symbol you wrap around the name, since those decorations are what most often fail on older devices.",
  relatedTools: [HOME_LINK, FREESTYLE_LINK, M_LINK, J_LINK],
  faq: [
    {
      id: "what-is",
      question: "What is an S stylish name generator?",
      answer:
        "An S stylish name generator is a free tool that converts any name starting with S into fancy Unicode fonts you can copy and paste. Type a name like Sara or Shivam and it instantly rewrites it in styles such as bold cursive, double-struck, and Fraktur. There is no app to install — the styled text is standard Unicode, so it pastes straight into Instagram, BGMI, and WhatsApp.",
    },
    {
      id: "popular",
      question: "What are popular names starting with S?",
      answer:
        "Common Indian names starting with S include Sara, Shreya, Sahil, Sneha, Siddharth, Sanjana, Simran, Shivam, Suresh, and Swati. Our popular S names section lists more than twenty of them, each shown in two ready-to-copy fancy fonts. If your name is not listed, just type it into the tool above to style it the same way.",
    },
    {
      id: "platforms",
      question: "Can I use an S stylish name for Instagram or BGMI?",
      answer:
        "Yes. The S style names here are Unicode, so they paste into Instagram bios and display names, BGMI and Free Fire profiles, and WhatsApp. Shorter styles render most reliably in games with strict name fields. For platform-specific tips and character counters, use our Instagram stylish fonts page and BGMI name generator.",
    },
    {
      id: "short-s",
      question: "Which stylish style works best for a short S name like Sam or Sia?",
      answer:
        "For short S names like Sam, Sia, or Sky, bold high-contrast styles work best because there are fewer letters to carry the look. Sans Bold and Bold Cursive give a clean result, or add a star border for a gaming feel. Short S names are ideal for BGMI and Free Fire too, where tight character limits reward names that stay readable without extra width.",
    },
  ],
};

export const M_CONFIG: LetterConfig = {
  letter: "M",
  slug: "/m-stylish-name",
  placeholder: "Mohit",
  title:
    "M Stylish Name Generator ✨ M Style Names Copy Paste (2025)",
  description:
    "Generate stylish names starting with M in fancy Unicode fonts. Copy paste M style names for Instagram, BGMI, WhatsApp and more — 50+ name ideas included.",
  h1: "Myself Stylish Name — M Style Fancy Fonts & Ideas",
  introVariant: "m",
  howToHeading: "How to Create a Stylish M Name",
  popularHeading: "Popular Myself Stylish Names — M Style Name Ideas",
  popularIntro:
    "A myself stylish name simply means a fancy version of your own name. Here are popular names starting with M, each pre-styled in two fancy fonts — tap Copy, or type your own M name in the tool above.",
  faqHeading: "Frequently Asked Questions About M Stylish Names",
  popularNames: buildPopular(M_NAMES),
  itemListName: "Popular M Stylish Names",
  webAppName: "M Stylish Name Generator",
  webAppDescription:
    "Generate stylish M names in fancy Unicode fonts. Myself stylish name ideas with copy paste.",
  letterProfileLead:
    "M is a wide letter, and that matters more than you would expect. In Circled and Squared styles every character is forced to equal width, so an M-heavy name like Mukesh or Mansi ends up looking stretched and harder to read. Bold Cursive, Sans Bold, and Small Caps keep M names tight and clean — test those first.",
  longNameExample: "Madhuri",
  aboutHeading: "Myself Stylish Name — Why This Search Is So Common",
  aboutParagraphs: [
    "Of every keyword tied to the letter M, \u201cmyself stylish name\u201d is by far the most searched — far more than \u201cm stylish name\u201d itself. It is broken English, typed mostly by Hindi-speaking users who mean \u201ca stylish name for myself\u201d or \u201cmy own name in style.\u201d If that is how you landed here, this tool does exactly that: it styles your own name, whatever it happens to be.",
    "The phrase only starts with M by coincidence, but it fits this page naturally. The same users often search \u201cstyle mein name\u201d (Hinglish for \u201cname in style\u201d) and \u201cstylish name for myself,\u201d so this M page is built to answer all three intents at once rather than treating them as separate tools.",
    "Beyond the search quirk, M is a genuinely popular starting letter for Indian names — Mohit, Meera, Manish, and Mahesh are everywhere. But M is also a wide letter, so it behaves differently in styled fonts than narrow letters do. Check the styling notes below before you commit to a font for a longer M name.",
  ],
  renderingNote:
    "M names are wide, so in games with tight name fields a styled M name in Circled or Squared can both box out on older devices and overflow the character limit — a double reason to lean on Sans Bold or Small Caps for an M name.",
  relatedTools: [HOME_LINK, FREESTYLE_LINK, S_LINK, J_LINK],
  faq: [
    {
      id: "what-is",
      question: "What is an M stylish name generator?",
      answer:
        "An M stylish name generator is a free tool that turns any name starting with M into fancy Unicode fonts ready to copy and paste. Enter a name like Mohit or Meera and it instantly produces an m style name in bold cursive, double-struck, Fraktur and more. The output is plain Unicode, so it works on Instagram, BGMI, and WhatsApp with no install needed.",
    },
    {
      id: "myself-meaning",
      question: 'What does "myself stylish name" mean?',
      answer:
        '"Myself stylish name" is a very common search phrase used by Hindi-speaking users who want a stylish version of their own name — essentially "a fancy name for myself." It is non-native English phrasing for "my own stylish name." If that is what you searched for, you are in the right place: type your name into the tool above and copy it in any fancy font you like.',
    },
    {
      id: "platforms",
      question: "Can I use an M stylish name for Instagram or BGMI?",
      answer:
        "Yes. Every M style name here is Unicode text, so it pastes into Instagram bios and names, BGMI and Free Fire profiles, and WhatsApp. Simple bold or small-caps styles render most reliably inside game name fields. For platform-specific guidance and character counters, see our Instagram stylish fonts page and BGMI name generator.",
    },
    {
      id: "style-mein-meaning",
      question: 'What does "style mein name" mean?',
      answer:
        '"Style mein name" is Hinglish (Hindi written in English letters) meaning "name in style" — people search it when they want their name written in a stylish font. It means the same thing as a stylish or fancy name, so yes, this generator does exactly that. Type your name above and pick any style mein name version to copy.',
    },
  ],
};

export const J_CONFIG: LetterConfig = {
  letter: "J",
  slug: "/j-stylish-name",
  placeholder: "Jay",
  title:
    "J Stylish Name Generator ✨ J Style Names Copy Paste (2025)",
  description:
    "Generate stylish names starting with J in fancy Unicode fonts. Copy paste J style names for Instagram, BGMI, WhatsApp and more — 50+ name ideas included.",
  h1: "J Stylish Name — Fancy Fonts & Name Ideas",
  introVariant: "j",
  howToHeading: "How to Create a Stylish J Name",
  popularHeading: "Popular J Stylish Names",
  popularIntro:
    "Hand-picked names starting with J, each pre-styled in two fancy fonts. Tap Copy on any version to use it instantly — or type your own J name in the tool above.",
  faqHeading: "Frequently Asked Questions About J Stylish Names",
  popularNames: buildPopular(J_NAMES),
  itemListName: "Popular J Stylish Names",
  webAppName: "J Stylish Name Generator",
  webAppDescription:
    "Generate stylish J names in fancy Unicode fonts. J style name ideas with copy paste.",
  letterProfileLead:
    "J is the trickiest of the three letters. In many Unicode Fraktur Gothic sets the capital J glyph is unusually small and heavily curled, so J names can look cramped or unclear there. Stick with Bold Cursive, Double Struck, or Sans Bold for a J name that reads cleanly at a glance.",
  longNameExample: "Jignesh",
  aboutHeading: "J Names — A Modern Favourite for Stylish Profiles",
  aboutParagraphs: [
    "J names have surged in popularity across India over the last decade. Short, punchy picks like Jay, Jiya, and Jeet sit alongside classics such as Jaya and Jagdish, and Bollywood-flavoured names like Jasmine keep the letter trendy. That brevity is a real advantage: many J names are short enough to read clearly in a fast-moving kill feed, which makes them popular for gaming tags.",
    "J is also the most distinctive of the three letters to style — and the trickiest. The capital J has a descender (the tail that drops below the line), and in some Fraktur sets the glyph is drawn unusually small, so not every font flatters a J name equally. The styling guide below points you to the fonts that keep a J open and legible.",
    "If your J name is on the longer side — Jignesh, Jayendra, Jaspreet — keep an eye on character limits in BGMI and Free Fire, because styled Unicode characters eat into the limit faster than plain letters do. A shorter J name in a bold style is often the safer choice for games.",
  ],
  renderingNote:
    "Watch the capital J specifically: in Fraktur and a few enclosed styles it can render as a tiny or boxed glyph on older devices even when the rest of the name looks fine — always preview a styled J name on a second phone before locking it in.",
  relatedTools: [HOME_LINK, FREESTYLE_LINK, S_LINK, M_LINK],
  faq: [
    {
      id: "what-is",
      question: "What is a J stylish name generator?",
      answer:
        "A J stylish name generator is a free tool that converts any name starting with J into fancy Unicode fonts you can copy and paste. Type a name like Jay or Jiya and it instantly restyles it in bold cursive, double-struck, Fraktur and more. Because the result is standard Unicode, it pastes directly into Instagram, BGMI, and WhatsApp without installing anything.",
    },
    {
      id: "popular",
      question: "What are popular names starting with J?",
      answer:
        "Popular Indian names starting with J include Jay, Jaya, Jatin, Juhi, Jeevan, Jiya, Jasmine, Jignesh, Jyoti, and Jaideep. Our popular J names section shows more than twenty of them in two ready-to-copy fancy fonts each. Not seeing your name? Type it into the tool above to style it the same way.",
    },
    {
      id: "platforms",
      question: "Can I use a J stylish name for Instagram or BGMI?",
      answer:
        "Yes. The J style names here are Unicode, so they paste into Instagram bios and display names, BGMI and Free Fire profiles, and WhatsApp. Shorter, simpler styles work most reliably in game name fields with tight limits. For platform-specific advice and character counters, visit our Instagram stylish fonts page and BGMI name generator.",
    },
    {
      id: "cramped-j",
      question: "Why does my J name look cramped or unclear in some fancy fonts?",
      answer:
        "The capital J in several Unicode Fraktur and Gothic sets is drawn unusually small and heavily curled, so J names can look cramped or hard to read in those styles. If your styled J name looks off, switch to Bold Cursive, Double Struck, or Sans Bold — these keep the J open and legible. It is a quirk of the J glyph itself, not an error in the generator.",
    },
  ],
};

export const LETTER_CONFIGS: Record<string, LetterConfig> = {
  s: S_CONFIG,
  m: M_CONFIG,
  j: J_CONFIG,
};

export function buildLetterMetadata(config: LetterConfig): Metadata {
  const pageUrl = `${SITE_URL}${config.slug}`;
  return {
    title: config.title,
    description: config.description,
    robots: { index: true, follow: true },
    alternates: { canonical: config.slug },
    openGraph: {
      title: config.title,
      description: config.description,
      url: pageUrl,
      type: "website",
      siteName: "Stylish Name Generator",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
  };
}

export function buildLetterJsonLd(config: LetterConfig) {
  const pageUrl = `${SITE_URL}${config.slug}`;

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.webAppName,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: config.webAppDescription,
    offers: { "@type": "Offer", price: "0" },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${config.letter} Stylish Name`,
        item: pageUrl,
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.itemListName,
    numberOfItems: config.popularNames.length,
    itemListElement: config.popularNames.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: name.variants[0]?.text ?? name.plain,
    })),
  };

  return { webApp, breadcrumb, faq, itemList };
}
