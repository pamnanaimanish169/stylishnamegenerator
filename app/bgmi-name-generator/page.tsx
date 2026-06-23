import type { Metadata } from "next";
import BgmiNameStylePageContent from "@/components/BgmiNameStylePageContent";
import { getAllBgmiCuratedNames } from "@/lib/bgmiCuratedNames";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/bgmi-name-generator";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const TITLE =
  "BGMI Name Style 2026: 1000+ Cool, Stylish Nicknames to Copy";
const DESCRIPTION =
  "Looking for the best BGMI name style? Use our free tool to create cool, stylish names with symbols. Copy and paste trending fonts directly into BGMI in one click!";

const FAQ_ITEMS = [
  {
    question:
      "Why do some symbols look like boxes or question marks in the game?",
    answer:
      "BGMI renders names through the device OS font stack, not a custom in-game typeface. When your phone lacks a glyph for a Unicode block — common with Fraktur, enclosed letters, or rare decorative symbols — Android and iOS substitute a missing-glyph box (□) or a question mark. Krafton also ships font updates with patches, so a style that worked on BGMI v3.8 may break on v3.9 for players on older MIUI, ColorOS, or low-RAM devices. Test on the same Android version your squad uses, and prefer simpler border + cursive combinations if cross-device readability matters.",
  },
  {
    question: "How can I add an invisible space to my BGMI name style?",
    answer:
      "Some players insert the Hangul Filler character (U+3164, ㅤ) to create visual padding without visible text. It occupies one encoding slot in BGMI's character counter even though it renders blank on most screens. Paste it between symbols and letters to widen spacing — for example, ꧁ㅤProㅤ꧂ — but use sparingly: BGMI's validator may reject strings with multiple consecutive fillers, and invisible characters can push you past the ~14-slot visible limit (16 UTF-16 units) without obvious feedback. Always verify the final count in the in-game rename preview before confirming.",
  },
  {
    question: "How many times can I change my style using a Rename Card?",
    answer:
      "Each Rename Card allows exactly one profile name change. New accounts typically receive one or two free renames through starter missions or level rewards, but these are not renewable. After free renames are used, every additional change requires purchasing a Rename Card from Shop → Treasures/Items (usually around 180 UC, subject to event pricing). Cards stack in your inventory — buying three cards means three separate renames — but there is no bulk discount for unused cards. Clan tag renames use a separate Clan Rename Card and do not share inventory with profile Rename Cards.",
  },
] as const;

const bgmiCuratedNames = getAllBgmiCuratedNames();

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: "Stylish Name Generator",
    locale: "en_IN",
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BGMI Name Style Generator",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Android, iOS",
  description:
    "Create cool BGMI name styles with Unicode fonts and symbols. Copy paste directly into Battlegrounds Mobile India.",
  offers: { "@type": "Offer", price: "0" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "BGMI Name Style",
      item: PAGE_URL,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BGMI Name Style Gallery",
  description:
    "Trending BGMI name styles, cool names for boys, stylish names for girls, and clan name styles",
  numberOfItems: bgmiCuratedNames.length,
  itemListElement: bgmiCuratedNames.map((name, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
  })),
};

export default function BgmiNameGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <BgmiNameStylePageContent />
    </>
  );
}
