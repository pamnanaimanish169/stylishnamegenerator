import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BgmiNameGenerator from "@/components/BgmiNameGenerator";
import Breadcrumb from "@/components/Breadcrumb";
import CuratedNameGrid from "@/components/CuratedNameGrid";
import RelatedTools from "@/components/RelatedTools";
import {
  BGMI_CURATED_NAMES,
  BGMI_LAST_TESTED_VERSION,
  getAllBgmiCuratedNames,
} from "@/lib/bgmiCuratedNames";
import { BGMI_SYMBOLS } from "@/lib/bgmiSymbols";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/bgmi-name-generator";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const TITLE =
  "BGMI Name Generator 🎮 Stylish Fonts & Symbols Copy Paste (2026)";
const DESCRIPTION =
  "Generate stylish BGMI names using fancy Unicode fonts and symbols. Copy paste in one click — works directly in Battlegrounds Mobile India. 100+ styles including ꧁borders༺ and special characters.";

const FAQ_ITEMS = [
  {
    question: "How to change the BGMI Game Profile name?",
    answer:
      "Open BGMI, go to your profile, and tap the edit icon near your current name. Paste a style from this generator, verify the preview, and confirm with a rename card. Keep the final name within 16 characters including symbols.",
  },
  {
    question: "Can I use stylish names in BGMI clan tags?",
    answer:
      "Yes, but treat clan tags and profile names as separate fields. Clan tags usually need short, readable text and may reject some decorative combinations that work in the main name field. Test the tag in the clan edit flow before finalizing.",
  },
  {
    question: "Does BGMI filter certain Unicode characters after updates?",
    answer:
      "Yes. BGMI compatibility can change after game patches and client font updates. Characters that previously rendered can turn into blank boxes or be blocked at save time, so always test one rename candidate after major version updates.",
  },
  {
    question: "Will my stylish name reset if I reinstall BGMI?",
    answer:
      "Normally no. Your in-game name is tied to your BGMI account data, not the local app install. Reinstalling the app usually keeps the same name after login unless there is an account issue or enforcement action.",
  },
  {
    question: "Can BGMI ban my account for using a stylish name?",
    answer:
      "Stylish Unicode itself is not automatically bannable, but names violating policy can trigger forced rename or penalties. Avoid impersonation, hate speech, sexual content, threats, or trademark abuse. Follow Krafton ToS and community rules when choosing your final name.",
  },
  {
    question:
      "Why does my stylish name show as boxes on my friend's screen?",
    answer:
      "That usually means font fallback differences across devices or an unsupported Unicode block after an update. A style may render on your phone but not on another Android build. Pick simpler Unicode styles if cross-device readability matters.",
  },
] as const;

const PENDING_VERIFICATION = "Pending verification";

/** Updated frequently — replace pending cells after in-game patch testing. */
const BGMI_FONT_DISPLAY_TABLE = [
  "Double Struck",
  "Cursive Script",
  "Bold Cursive",
  "Fraktur Gothic",
  "Bold Fraktur",
  "Monospace",
  "Sans Bold",
  "Sans Italic",
  "Circled",
  "Small Caps",
  "BGMI Border",
  "Star Style",
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
  name: "BGMI Name Generator",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Android, iOS",
  description:
    "Generate stylish BGMI names using Unicode fonts and symbols. Copy paste directly into Battlegrounds Mobile India.",
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
      name: "BGMI Name Generator",
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
  name: "BGMI Name Gallery",
  description: "Curated stylish BGMI name ideas by playstyle and length",
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

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="reveal mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "BGMI Name Generator" },
            ]}
          />
        </div>

        <div className="reveal mb-4 flex flex-wrap items-center gap-2">
          <span className="hero-badge inline-block rounded-full px-3 py-1">
            BGMI · Unicode · Copy Paste
          </span>
          <span className="hero-badge inline-block rounded-full px-3 py-1">
            Last tested on BGMI v{BGMI_LAST_TESTED_VERSION}
          </span>
        </div>

        <h1 className="article-h1 reveal reveal-delay-1 mb-6">
          BGMI Name Generator — Stylish Fonts &amp; Symbols
        </h1>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          Our <strong>BGMI name generator</strong> helps you craft{" "}
          <strong>stylish BGMI names</strong> with fancy Unicode fonts and
          symbols in seconds. Pick a BGMI-friendly style, then{" "}
          <strong>copy paste</strong> it straight into Battlegrounds Mobile
          India — every <strong>BGMI name style</strong> here is filtered for
          the in-game name field. This <strong>BGMI stylish name generator</strong>{" "}
          also works as a <strong>BGMI font generator</strong> for bold, cursive,
          and bordered text. Need more platforms? Try our{" "}
          <Link href="/" className="intro-link">
            stylish name generator
          </Link>
          . Playing Free Fire too? Try our{" "}
          <Link href="/free-fire-name-generator" className="intro-link">
            Free Fire name generator
          </Link>
          .
        </p>

        <section
          aria-labelledby="how-to-heading"
          className="reveal reveal-delay-2 mb-8 max-w-3xl"
        >
          <h2 id="how-to-heading" className="article-heading">
            How to Change Your BGMI Name Using This Generator
          </h2>
          <ol className="how-steps">
            <li className="how-step">Type your nickname in the box above.</li>
            <li className="how-step">
              Tap symbols to decorate, then pick a styled result.
            </li>
            <li className="how-step">
              Hit Copy, open BGMI → Profile → Edit Name, and paste.
            </li>
            <li className="how-step">
              Confirm the preview looks right before saving.
            </li>
          </ol>
        </section>

        <div className="reveal reveal-delay-3 mb-10">
          <BgmiNameGenerator />
        </div>

        <figure className="reveal reveal-delay-3 mb-10 max-w-md">
          <Image
            src="/bgmi-name-generator-stylish-fonts.webp"
            alt="BGMI name generator showing stylish Unicode font styles for Battlegrounds Mobile India"
            width={640}
            height={400}
            className="rounded-xl border border-[var(--border)]"
            priority
          />
          <figcaption className="mt-2 text-center text-xs text-[var(--cream-faint)]">
            BGMI symbols and fonts in the name field
          </figcaption>
        </figure>

        <article className="article-content reveal reveal-delay-4">
          <section aria-labelledby="unicode-styles-heading">
            <h2 id="unicode-styles-heading" className="article-heading">
              BGMI-Compatible Unicode Styles
            </h2>
            <p>
              Only fonts that render inside BGMI&apos;s name field are shown
              above — bold, cursive, fraktur, circled, and small caps all work.
              This <strong>BGMI font generator</strong> skips strikethrough and
              underline because combining characters break in-game. Every{" "}
              <strong>BGMI name font style</strong> is pre-filtered so you
              don&apos;t waste a rename card on text that shows as boxes.
            </p>
          </section>

          <section aria-labelledby="character-limit-heading">
            <h2 id="character-limit-heading" className="article-heading">
              Character Limit: 16 (How to Use the Visual Counter)
            </h2>
            <p>
              BGMI profile names have a <strong>16-character maximum</strong>.
              The live counter above is your safety check: once it goes past 16,
              the warning state appears. Keep in mind that some stylish Unicode
              letters and symbol combinations consume more character slots than
              plain text, so always copy the final styled output and verify the
              count before spending a rename card.
            </p>
          </section>

          <section aria-labelledby="rename-card-heading">
            <h2 id="rename-card-heading" className="article-heading">
              Rename Card System in BGMI
            </h2>
            <p>
              New accounts typically get limited early rename opportunities from
              starter rewards or progression, but these are not unlimited. After
              free options are exhausted, additional name changes require a paid
              rename card, usually around <strong>180 UC</strong> in the in-game
              shop (subject to event pricing and store updates). You can buy it
              from <strong>Shop → Treasures/Items → Rename Card</strong> and use
              it from your profile edit screen.
            </p>
          </section>

          <section aria-labelledby="clan-tag-heading">
            <h2 id="clan-tag-heading" className="article-heading">
              Clan Tag Field vs Profile Name Field
            </h2>
            <p>
              BGMI treats clan tags separately from your profile name. Your
              profile name allows broader styling, while clan tags are typically
              shorter and need cleaner readability for team identity. In
              practice, certain heavy decorative sequences that pass in the
              profile field may fail or look cramped in clan tag usage, so test
              both fields independently.
            </p>
          </section>

          <section aria-labelledby="name-gallery-heading">
            <h2 id="name-gallery-heading" className="article-heading">
              BGMI Name Gallery
            </h2>
            <p>
              Browse pre-styled BGMI names organized by how you play — solo
              rank aggression, clan leadership, full squad identity, and short
              names that stay readable in lobby, kill feed, and squad UI.
            </p>
            <CuratedNameGrid categories={BGMI_CURATED_NAMES} />
          </section>

          <section aria-labelledby="symbols-heading">
            <h2 id="symbols-heading" className="article-heading">
              Popular BGMI Name Symbols
            </h2>
            <p>
              Border brackets and decorative symbols are what make BGMI names
              stand out in the lobby. Click any symbol in the picker above to
              insert it at your cursor.
            </p>
            <div className="symbol-showcase" aria-hidden="true">
              {BGMI_SYMBOLS.slice(0, 16).map((symbol) => (
                <span key={symbol} className="symbol-showcase__item">
                  {symbol}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="known-breaks-heading">
            <h2 id="known-breaks-heading" className="article-heading">
              Known Symbols/Styles That Break in BGMI
            </h2>
            <p>
              Based on compatibility checks used in this generator and user
              reports, these are the most common BGMI failures:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Combining marks like <code>̶</code> (strikethrough) and{" "}
                <code>̲</code> (underline) often fail or render as boxes.
              </li>
              <li>
                Over-stacked decorators and repeated invisible joins can break
                alignment or exceed the field validator.
              </li>
              <li>
                Some enclosed/emoji-style glyphs render inconsistently between
                BGMI versions and Android font packs.
              </li>
            </ul>
          </section>

          <section aria-labelledby="restriction-heading">
            <h2 id="restriction-heading" className="article-heading">
              BGMI Name Restrictions (Filter + ToS)
            </h2>
            <p>
              BGMI applies profanity and abuse filtering at save time, and
              Krafton policy can enforce action on names that are offensive,
              misleading, or rights-infringing even if they pass Unicode
              rendering. Treat stylish formatting as cosmetic only — policy
              checks still apply to the underlying meaning of your name.
            </p>
          </section>

          <section aria-labelledby="patch-history-heading">
            <h2 id="patch-history-heading" className="article-heading">
              Patch History: Unicode Rendering Changes
            </h2>
            <p>
              Recent BGMI updates have periodically changed how uncommon Unicode
              blocks render in profile fields. Community reports after major app
              updates often mention previously working variants turning into
              boxes or failing validation. We recommend re-testing your preferred
              style after each big patch and before using paid rename cards.
            </p>
          </section>

          <section aria-labelledby="font-display-table-heading">
            <h2 id="font-display-table-heading" className="article-heading">
              BGMI Font Style Display Compatibility
            </h2>
            <p>
              This table tracks how each Unicode font style renders across key
              BGMI UI surfaces. Compatibility cells are marked pending until
              verified in-game.
            </p>
            <p className="mb-4 text-sm text-[var(--cream-faint)]">
              Last tested on BGMI v{BGMI_LAST_TESTED_VERSION}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Font Style
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Lobby Display
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Kill Feed
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Squad List
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Spectator View
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Leaderboard
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BGMI_FONT_DISPLAY_TABLE.map((fontStyle) => (
                    <tr key={fontStyle}>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {fontStyle}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {PENDING_VERIFICATION}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {PENDING_VERIFICATION}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {PENDING_VERIFICATION}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {PENDING_VERIFICATION}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {PENDING_VERIFICATION}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-[var(--cream-faint)]">
              Legend (after verification): <strong>✓</strong> renders correctly,{" "}
              <strong>△</strong> partial or cramped, <strong>✗</strong> boxes or
              missing glyphs. Until then, cells show{" "}
              <strong>Pending verification</strong>.
            </p>
          </section>

          <section aria-labelledby="faq-heading" className="article-faq">
            <h2 id="faq-heading" className="article-heading">
              Frequently Asked Questions About BGMI Name Styles
            </h2>
            <dl className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="faq-item">
                  <dt className="mb-2">{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <div className="reveal reveal-delay-5 mt-12">
          <RelatedTools />
        </div>
      </main>
    </>
  );
}
