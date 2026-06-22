export type VibeBucket = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  styleIds: readonly string[];
};

export const FREESTYLE_VIBE_BUCKETS: VibeBucket[] = [
  {
    id: "gaming",
    label: "Gaming / Aggressive",
    emoji: "🔥",
    description: "Bold borders and fire accents built for lobby presence.",
    styleIds: ["bold-fraktur", "bgmi-border", "fire-style", "star-style"],
  },
  {
    id: "soft",
    label: "Soft / Aesthetic",
    emoji: "🌸",
    description: "Flowing script and delicate caps for a gentle vibe.",
    styleIds: ["cursive-script", "bold-cursive", "small-caps"],
  },
  {
    id: "cool",
    label: "Cool / Minimal",
    emoji: "😎",
    description: "Clean sans and monospace — understated but sharp.",
    styleIds: ["sans-bold", "sans-italic", "monospace", "fullwidth"],
  },
  {
    id: "weird",
    label: "Weird / Unique",
    emoji: "🎭",
    description: "Upside-down, struck-through, and enclosed letters that stand out.",
    styleIds: ["upside-down", "strikethrough", "circled", "squared"],
  },
];

export const FREESTYLE_STYLE_IDS = FREESTYLE_VIBE_BUCKETS.flatMap(
  (bucket) => bucket.styleIds,
);
