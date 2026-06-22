import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CuratedNameGrid from "@/components/CuratedNameGrid";
import FreestyleNicknameGenerator from "@/components/FreestyleNicknameGenerator";
import RelatedTools from "@/components/RelatedTools";
import { FREESTYLE_CURATED_NAMES } from "@/lib/freestyleCuratedNames";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/freestyle-nickname-generator";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = "/freestyle-nickname-generator-fancy-fonts.svg";

const TITLE =
  "Freestyle Nickname Generator ✨ Fancy & Stylish Nicknames (2025)";
const DESCRIPTION =
  "Generate creative freestyle nicknames in stylish Unicode fonts instantly. Copy paste fancy nicknames for gaming, Instagram, WhatsApp and more — 100+ styles free.";

const FAQ_ITEMS = [
  {
    question: "What is a freestyle nickname generator?",
    answer:
      "A freestyle nickname generator turns any word or phrase into dozens of styled Unicode nicknames you can copy and paste instantly. Unlike game-specific tools with character limits, a freestyle nickname generator has no cap — type anything from a one-word gamertag to a full display name and preview fancy fonts in real time. Our tool groups styles by vibe so you can match your personality before copying.",
  },
  {
    question: "What makes a good freestyle nickname for gaming?",
    answer:
      "The best gaming nicknames are short, readable at a glance, and memorable in a kill feed or lobby list. Pick a bold style from the Gaming / Aggressive vibe bucket — Bold Fraktur, BGMI Border, or Star Style work well — and keep the core word under 12 characters so it does not truncate in-game. For platform-specific limits, use our BGMI name generator or Free Fire name generator after you find a style you like here.",
  },
  {
    question: "What is a fancy nickname generator?",
    answer:
      "A fancy nickname generator converts plain text into decorative Unicode letterforms — cursive script, circled letters, fullwidth characters, and more — without installing fonts. It is the same technology behind stylish social media bios and gaming names, but focused on creative nicknames rather than a single platform. This page is a fancy nickname generator with vibe-based browsing so you can explore styles by mood, not just font name.",
  },
  {
    question: "Can I use these nicknames on WhatsApp and Instagram?",
    answer:
      "Yes. Unicode nicknames paste into WhatsApp display names, Instagram bios, Telegram usernames, and most chat apps that accept special characters. Instagram profile names have a 30-character limit, so shorter nicknames work best there. For caption and bio-only fonts, browse our fancy fonts for Instagram page — it covers styles optimized for social feeds rather than usernames.",
  },
] as const;

function renderFaqAnswer(question: string) {
  switch (question) {
    case "What makes a good freestyle nickname for gaming?":
      return (
        <>
          The best gaming nicknames are short, readable at a glance, and
          memorable in a kill feed or lobby list. Pick a bold style from the
          Gaming / Aggressive vibe bucket — Bold Fraktur, BGMI Border, or Star
          Style work well — and keep the core word under 12 characters so it
          does not truncate in-game. For platform-specific limits, use our{" "}
          <Link href="/bgmi-name-generator" className="article-link">
            BGMI name generator
          </Link>{" "}
          or{" "}
          <Link href="/free-fire-name-generator" className="article-link">
            Free Fire name generator
          </Link>{" "}
          after you find a style you like here.
        </>
      );
    case "Can I use these nicknames on WhatsApp and Instagram?":
      return (
        <>
          Yes. Unicode nicknames paste into WhatsApp display names, Instagram
          bios, Telegram usernames, and most chat apps that accept special
          characters. Instagram profile names have a 30-character limit, so
          shorter nicknames work best there. For caption and bio-only fonts,
          browse our{" "}
          <Link href="/instagram-stylish-fonts" className="article-link">
            fancy fonts for Instagram
          </Link>{" "}
          page — it covers styles optimized for social feeds rather than
          usernames.
        </>
      );
    default:
      return FAQ_ITEMS.find((item) => item.question === question)?.answer;
  }
}

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
        alt: "Freestyle nickname generator showing fancy Unicode font styles for gaming and social media",
      },
    ],
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Freestyle Nickname Generator",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Generate creative freestyle nicknames in stylish Unicode fonts for gaming, Instagram, WhatsApp and more.",
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
      name: "Freestyle Nickname Generator",
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

const FREESTYLE_RELATED_TOOLS = [
  {
    href: "/",
    title: "Stylish Name Generator",
    description: "Every Unicode font style in one place — all platforms.",
  },
  {
    href: "/bgmi-name-generator",
    title: "BGMI Name Generator",
    description: "Stylish BGMI fonts and symbols with a 16-char counter.",
  },
  {
    href: "/free-fire-name-generator",
    title: "Free Fire Name Generator",
    description: "FF-compatible fonts, symbols, and a 20-char counter.",
  },
] as const;

export default function FreestyleNicknameGeneratorPage() {
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

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="reveal mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Freestyle Nickname Generator" },
            ]}
          />
        </div>

        <div className="reveal mb-4">
          <span className="hero-badge inline-block rounded-full px-3 py-1">
            Freestyle · Unicode · Copy Paste
          </span>
        </div>

        <h1 className="article-h1 reveal reveal-delay-1 mb-6">
          Freestyle Nickname Generator — Fancy &amp; Stylish Nicknames
        </h1>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          Our <strong>freestyle nickname generator</strong> turns any word into
          a <strong>fancy nickname</strong> or{" "}
          <strong>stylish nickname</strong> in seconds — no character limit, no
          platform lock-in. Pick a vibe, copy your favourite{" "}
          <strong>freestyle name style</strong>, and paste it into gaming,
          chat, or social apps. Also try our{" "}
          <Link href="/bgmi-name-generator" className="intro-link">
            BGMI name generator
          </Link>
          ,{" "}
          <Link href="/free-fire-name-generator" className="intro-link">
            Free Fire name generator
          </Link>
          , or browse every font on our{" "}
          <Link href="/" className="intro-link">
            stylish name generator
          </Link>
          .
        </p>

        <section
          aria-labelledby="how-to-heading"
          className="reveal reveal-delay-2 mb-8 max-w-3xl"
        >
          <h2 id="how-to-heading" className="article-heading">
            How to Create Your Perfect Freestyle Nickname
          </h2>
          <ol className="how-steps">
            <li className="how-step">
              Type your nickname in the box below — one word or a short phrase.
            </li>
            <li className="how-step">
              Browse the vibe buckets and pick a style that matches your mood:
              gaming, aesthetic, minimal, or weird.
            </li>
            <li className="how-step">
              Hit Copy on your favourite result, or tap Surprise me for a random
              combo.
            </li>
            <li className="how-step">
              Paste into WhatsApp, Instagram, Discord, BGMI, Free Fire, or any app
              that accepts Unicode text.
            </li>
          </ol>
        </section>

        <div className="reveal reveal-delay-3 mb-10">
          <FreestyleNicknameGenerator />
        </div>

        <article className="article-content reveal reveal-delay-4">
          <section aria-labelledby="vibe-styles-heading">
            <h2 id="vibe-styles-heading" className="article-heading">
              Fancy Nickname Styles — Pick Your Vibe
            </h2>
            <p>
              Not sure which <strong>freestyle name style</strong> fits you?
              Start with a personality bucket instead of scrolling every font.
              Aggressive borders for gaming lobbies, soft script for aesthetic
              profiles, clean sans for minimal vibes, and weird Unicode for
              names nobody else has.
            </p>
          </section>

          <section aria-labelledby="nickname-ideas-heading">
            <h2 id="nickname-ideas-heading" className="article-heading">
              Nickname Ideas by Category
            </h2>
            <p>
              Need inspiration before you type? Browse 40 pre-styled{" "}
              <strong>stylish nickname</strong> ideas below — gamer tags,
              attitude names, cute girl nicknames, and short one-word picks.
              Click copy to grab any name instantly, or scroll up to{" "}
              <a href="#nickname-tool" className="article-link">
                generate your own version
              </a>
              . For Instagram bios and captions, see our{" "}
              <Link href="/instagram-stylish-fonts" className="article-link">
                fancy fonts for Instagram
              </Link>
              ; for wavy decorative text, try the{" "}
              <Link href="/wavy-text-generator" className="article-link">
                wavy text generator
              </Link>
              .
            </p>
            <CuratedNameGrid
              categories={FREESTYLE_CURATED_NAMES}
              toolAnchorId="nickname-tool"
            />
          </section>

          <section aria-labelledby="faq-heading" className="article-faq">
            <h2 id="faq-heading" className="article-heading">
              Frequently Asked Questions About Freestyle Nicknames
            </h2>
            <dl className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="faq-item">
                  <dt className="mb-2">{item.question}</dt>
                  <dd>{renderFaqAnswer(item.question)}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <div className="reveal reveal-delay-5 mt-12">
          <RelatedTools tools={[...FREESTYLE_RELATED_TOOLS]} />
        </div>
      </main>
    </>
  );
}
