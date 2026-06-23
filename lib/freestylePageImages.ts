/**
 * Freestyle page image slots — swap-in guide
 *
 * 1. Drop your asset into /public at the path listed in `src`.
 * 2. Set `active: true` on that slot below.
 * 3. Update `alt` and `caption` if your final image differs from the brief.
 * 4. For the OG/social hero, also set OG_IMAGE in page.tsx to the same `src`.
 *
 * Any image works — filenames are suggestions. Keep dark bg (#141210) and
 * neon accents (pink #ff2d95, lime #c8ff00, cyan #00e8ff) for brand match.
 */

export type PageImageSlot = {
  id: string;
  /** Flip to true once the file exists in /public */
  active: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  caption?: string;
  brief: string;
  specs: readonly string[];
};

export const FREESTYLE_PAGE_IMAGES = {
  hero: {
    id: "hero",
    active: false,
    src: "/freestyle-nickname-generator-fancy-fonts.webp",
    alt: "Freestyle nickname generator showing fancy Unicode font styles for gaming and social media",
    width: 1200,
    height: 630,
    title: "Hero / OG social preview",
    caption:
      "Pick a vibe, copy a styled freestyle nickname, and paste it anywhere.",
    brief:
      "Dark hero card with a central phone mockup showing one styled nickname (e.g. ꧁𝓢𝓱𝓪𝓭𝓸𝔀꧂). Four vibe chips around it: Gaming, Soft, Cool, Weird. Neon gradient bar at bottom.",
    specs: [
      "Use 1200×630 for Open Graph (safe crop) or 640×400 to match other tool pages",
      "Also used as og:image — update OG_IMAGE in page.tsx when active",
      "Target file size: under 120 KB",
    ],
  },
  renderingComparison: {
    id: "rendering-comparison",
    active: false,
    src: "/freestyle-nickname-rendering-comparison.webp",
    alt: "Same freestyle nickname rendered correctly on iPhone and as broken tofu boxes on older Android",
    width: 960,
    height: 400,
    title: "Rendering comparison (Section 1)",
    caption:
      "Same Unicode string — different font stacks. What you see is not always what they see.",
    brief:
      "Three-panel graphic: iPhone (clean render) · Android flagship (clean) · older Android (□□□□ tofu boxes). Label each panel. Example nickname consistent across all three.",
    specs: [
      "Place under “Why Your Freestyle Nickname May Look Broken…”",
      "Horizontal layout, scrolls on mobile",
      "Target file size: under 80 KB",
    ],
  },
  codepointLimits: {
    id: "codepoint-limits",
    active: false,
    src: "/freestyle-nickname-codepoint-limits.webp",
    alt: "How Instagram and WhatsApp count Unicode nickname characters differently from visible letters",
    width: 800,
    height: 450,
    title: "Code point limits infographic (Section 2)",
    caption:
      "Platforms count code points, not visible letters — decorated names fill limits faster than they look.",
    brief:
      "One example nickname (e.g. ꧁𝓟𝓻𝓸꧂) with side-by-side bars: “Looks like 5 chars” vs “Instagram counts ~12” vs “WhatsApp counts ~10”. Optional BGMI 16-slot callout.",
    specs: [
      "Place after the expert note in the character-limits section",
      "Simple bars or stacked blocks — no complex chart needed",
      "Target file size: under 80 KB",
    ],
  },
  vibeMatrix: {
    id: "vibe-matrix",
    active: false,
    src: "/freestyle-nickname-vibe-matrix.webp",
    alt: "Freestyle nickname vibe picker: gaming aggressive, soft aesthetic, cool minimal, and weird unique styles",
    width: 800,
    height: 800,
    title: "Vibe decision matrix (Section 3)",
    caption:
      "Match discoverability need and aesthetic priority to one of the four vibe buckets.",
    brief:
      "2×2 grid matching tool buckets: 🔥 Gaming (bold border sample) · 🌸 Soft (cursive) · 😎 Cool (sans bold) · 🎭 Weird (upside-down or circled). One styled word per cell.",
    specs: [
      "Place above the Rarity vs Readability decision matrix",
      "Square 1:1 works well; collapses to full width on mobile",
      "Target file size: under 80 KB",
    ],
  },
  platformPaste: {
    id: "platform-paste",
    active: false,
    src: "/freestyle-nickname-platform-paste.webp",
    alt: "Pasting a fancy freestyle nickname into WhatsApp and Instagram display name fields",
    width: 960,
    height: 360,
    title: "Platform paste flow (How-to / FAQ)",
    caption:
      "Copy from the generator → paste into WhatsApp, Instagram, or Discord name field → preview before saving.",
    brief:
      "3-step illustrated flow (generic UI mockups, not real app screenshots): Generator + Copy · Name field + Paste · Final preview. Avoid trademarked UI — use blurred/generic frames.",
    specs: [
      "Place at end of the How-to section or near FAQ Q4",
      "Wide horizontal strip; optional split WhatsApp + Instagram",
      "Target file size: under 80 KB",
    ],
  },
} as const satisfies Record<string, PageImageSlot>;

export type FreestylePageImageKey = keyof typeof FREESTYLE_PAGE_IMAGES;
