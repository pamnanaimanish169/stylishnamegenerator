import type { Metadata } from "next";
import InstagramStylishFontsContent from "@/components/InstagramStylishFontsContent";
import { FAQ_ITEMS, getAllBioTemplateNames } from "@/lib/instagramPageData";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/instagram-stylish-fonts";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = "/instagram-stylish-fonts-bio-generator.svg";

const TITLE =
  "Instagram Stylish Fonts & Bio Generator ✨ Copy Paste (2025)";
const DESCRIPTION =
  "Generate stylish Instagram fonts and copy paste bio text instantly. Fancy Unicode fonts, emoji bios, and stylish captions — works directly in Instagram bio, posts and stories.";

const bioTemplateNames = getAllBioTemplateNames();

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
        alt: "Instagram stylish fonts generator showing fancy Unicode bio text and emoji for Instagram profile",
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
  name: "Instagram Stylish Fonts Generator",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Generate stylish Instagram fonts and bio text. Copy paste Unicode fonts and emoji bios directly into Instagram.",
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
      name: "Instagram Stylish Fonts",
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
  name: "Stylish Instagram Bio Templates",
  description:
    "Ready-made copy paste Instagram bio templates in fancy Unicode fonts",
  numberOfItems: bioTemplateNames.length,
  itemListElement: bioTemplateNames.map((name, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
  })),
};

export default function InstagramStylishFontsPage() {
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

      <InstagramStylishFontsContent />
    </>
  );
}
