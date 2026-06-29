import type { Metadata } from "next";
import ArabicFontsContent from "@/components/ArabicFontsContent";
import { ARABIC_FAQ_ITEMS } from "@/lib/arabicPageData";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/arabic-font-generator";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = "/arabic-urdu-font-generator-stylish-text.webp";

const TITLE =
  "Arabic & Urdu Font Generator 🌙 Stylish Arabic Text Copy Paste (2026)";
const DESCRIPTION =
  "Generate stylish Arabic and Urdu fonts instantly — fancy Unicode text for WhatsApp, Instagram bio and Facebook. Copy paste on any device. اردو اسٹائلش فونٹ";

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
    images: [
      {
        url: OG_IMAGE,
        width: 640,
        height: 400,
        alt: "Arabic and Urdu font generator — اردو اسٹائلش فونٹ for WhatsApp and Instagram copy paste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Arabic & Urdu Font Generator",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Generate stylish Arabic and Urdu fonts for WhatsApp, Instagram and Facebook. RTL-aware Unicode text decoration with copy paste.",
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
      name: "Arabic & Urdu Font Generator",
      item: PAGE_URL,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ARABIC_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const languageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Arabic Font Generator",
    inLanguage: "ar",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Urdu Stylish Name Maker",
    inLanguage: "ur",
    url: PAGE_URL,
  },
];

export default function ArabicFontGeneratorPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(languageJsonLd) }}
      />

      <ArabicFontsContent />
    </>
  );
}
