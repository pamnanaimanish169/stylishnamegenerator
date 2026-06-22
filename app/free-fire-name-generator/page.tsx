import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CuratedNameGrid from "@/components/CuratedNameGrid";
import FreeFireNameGenerator from "@/components/FreeFireNameGenerator";
import RelatedTools from "@/components/RelatedTools";
import {
  FREE_FIRE_CURATED_NAMES,
  getAllCuratedNames,
} from "@/lib/freeFireCuratedNames";
import {
  FF_BROKEN_SYMBOLS,
  FF_MAX_SYNC_TABLE,
  FF_NAME_FIELD_TABLE,
  FREE_FIRE_TESTED_VERSION,
} from "@/lib/freeFirePageData";
import { FREE_FIRE_SYMBOLS } from "@/lib/freeFireSymbols";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/free-fire-name-generator";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = "/free-fire-name-generator-stylish-fonts.webp";

const TITLE =
  "Free Fire Name Generator 🔥 Stylish FF Names Copy Paste (2026)";
const DESCRIPTION =
  "Create stylish Free Fire names with fancy Unicode fonts. Copy paste instantly into your FF account — 100+ name styles, symbols, and unique name ideas for Free Fire MAX.";

const FAQ_ITEMS = [
  {
    question:
      "Does my stylish name carry over between Free Fire and Free Fire MAX?",
    answer:
      "Yes — since both versions share the same account and server backend, your styled name syncs automatically once you link your account. You don't need to rename separately in FF MAX.",
  },
  {
    question: "Can I get a free rename card without spending diamonds?",
    answer:
      "Garena occasionally distributes free rename vouchers during OB (Operation Battlefield) update events or through redeem codes. Check the in-game events tab before buying a paid rename card.",
  },
  {
    question: "Will a stylish name get my Free Fire account banned?",
    answer:
      "No, stylish Unicode names are not bannable on their own. Free Fire's restriction system targets impersonation, slurs, and trademark misuse — not font style. However, names mimicking Garena staff or pro players can trigger a manual review.",
  },
  {
    question:
      "Does my guild name support the same fonts as my profile name?",
    answer:
      "Mostly, but guild names have a shorter limit and some Unicode fonts that fit your profile name may get truncated in the guild tag field. Test the guild name separately before finalizing.",
  },
  {
    question: "Why does my Free Fire name look different on a friend's phone?",
    answer:
      "This usually happens with font substitution — older Android versions or heavily customized UI skins (like some MIUI builds) render certain Unicode blocks (especially Fraktur or Squared) inconsistently.",
  },
] as const;

const curatedNames = getAllCuratedNames();

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
        alt: "Free Fire name generator showing stylish Unicode font styles for FF and Free Fire MAX",
      },
    ],
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Fire Name Generator",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Android, iOS",
  description:
    "Generate stylish Free Fire names using Unicode fonts. Copy paste directly into your FF account.",
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
      name: "Free Fire Name Generator",
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
  name: "Free Fire Name Gallery",
  description:
    "Curated guild names, girl gamer names, short FF names, and region-specific styles",
  numberOfItems: curatedNames.length,
  itemListElement: curatedNames.map((name, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
  })),
};

const FF_RELATED_TOOLS = [
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
    href: "/freestyle-nickname-generator",
    title: "Freestyle Nickname Generator",
    description: "Creative nicknames with vibe buckets — no character limit.",
  },
] as const;

export default function FreeFireNameGeneratorPage() {
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
              { label: "Free Fire Name Generator" },
            ]}
          />
        </div>

        <div className="reveal mb-4 flex flex-wrap items-center gap-2">
          <span className="hero-badge inline-block rounded-full px-3 py-1">
            Free Fire · Unicode · Copy Paste
          </span>
          <span
            className="inline-block rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--cream-faint)]"
            title="Compatibility data on this page is re-checked after major OB patches"
          >
            Last tested on Free Fire v{FREE_FIRE_TESTED_VERSION}
          </span>
        </div>

        <h1 className="article-h1 reveal reveal-delay-1 mb-6">
          Free Fire Name Generator — Stylish FF Fonts &amp; Symbols
        </h1>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          Our <strong>Free Fire name generator</strong> helps you craft{" "}
          <strong>stylish Free Fire names</strong> with fancy Unicode fonts in
          seconds. Whether you need a guild tag, a short lobby name, or a{" "}
          <strong>ff stylish name</strong> for ranked, pick a style and{" "}
          <strong>copy paste</strong> it into Free Fire or Free Fire MAX — both
          share the same account name. Need other games? Try our{" "}
          <Link href="/bgmi-name-generator" className="intro-link">
            BGMI name generator
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
            How to Set a Stylish Name in Free Fire
          </h2>
          <ol className="how-steps">
            <li className="how-step">Type your nickname in the box below.</li>
            <li className="how-step">
              Tap symbols to decorate, then pick a styled result marked ✓ Works
              in FF.
            </li>
            <li className="how-step">
              Hit Copy, open Free Fire → Profile → Edit Name, and paste.
            </li>
            <li className="how-step">
              Confirm the preview before saving — profile names allow up to 20
              characters, four more than BGMI.
            </li>
          </ol>
        </section>

        <div className="reveal reveal-delay-3 mb-10">
          <FreeFireNameGenerator />
        </div>

        <article className="article-content reveal reveal-delay-4">
          <section aria-labelledby="font-styles-heading">
            <h2 id="font-styles-heading" className="article-heading">
              Free Fire Compatible Font Styles
            </h2>
            <p>
              Only fonts that render inside Free Fire&apos;s name field are
              marked <strong>✓ Works in FF</strong> — bold, cursive, fraktur,
              circled, and small caps all work. This{" "}
              <strong>free fire names generator</strong> also shows experimental
              styles with a warning label so you don&apos;t waste diamonds on
              text that shows as boxes. Every compatible style is pre-filtered
              for Free Fire and Free Fire MAX.
            </p>
          </section>

          <section aria-labelledby="character-limit-heading">
            <h2 id="character-limit-heading" className="article-heading">
              Character Limit: 20 (How FF Differs from BGMI)
            </h2>
            <p>
              Free Fire profile names allow a <strong>20-character maximum</strong>{" "}
              — four more than BGMI&apos;s 16-character cap. That extra room
              matters when you wrap a short word in border symbols like ꧁ and
              ꧂, or stack a guild-style prefix before your nickname. The live
              counter above tracks your raw input; after you pick a styled
              result, check the generated output length too, because Unicode
              letters can consume slots differently than plain ASCII.
            </p>
            <p>
              Practical tip: keep the readable core of your name under 12
              characters and use the remaining slots for one symbol pair. Names
              that look fine in our preview can still feel cramped on smaller
              FF MAX HUD layouts, so favour shorter styles when you play
              primarily on MAX.
            </p>
          </section>

          <section aria-labelledby="rename-diamonds-heading">
            <h2 id="rename-diamonds-heading" className="article-heading">
              Diamond Cost &amp; Free Rename Cards
            </h2>
            <p>
              After your starter rename allowance runs out, changing your
              profile name typically costs diamonds or a{" "}
              <strong>Rename Card</strong> from the in-game shop. Buy cards
              under <strong>Shop → Items</strong>, or wait for event rewards
              before spending. Garena often drops free rename vouchers during OB
              update celebrations, anniversary login events, and limited redeem
              code campaigns — check the Events tab and official social channels
              before paying full price.
            </p>
            <p>
              Guild renames are separate: only the guild leader can change the
              guild name, and that action uses its own diamond cost or Guild
              Rename Card. Never assume a profile rename card works on your
              guild — they are different inventory items.
            </p>
          </section>

          <section aria-labelledby="ff-max-sync-heading">
            <h2 id="ff-max-sync-heading" className="article-heading">
              Free Fire MAX vs Original — Do Names Sync?
            </h2>
            <p>
              This is the question every FF MAX player asks first: if I style my
              name in regular Free Fire, does it appear in MAX too? Both clients
              pull from the same Garena account backend, so your profile name,
              guild tag, and level badge should match once you link MAX to your
              existing FF account. You do not need to rename twice — but you
              should still preview your styled text inside MAX itself, because
              the higher-resolution client sometimes renders certain Unicode
              fonts at a slightly larger size in the lobby HUD.
            </p>
          </section>

          <section aria-labelledby="garena-rendering-heading">
            <h2 id="garena-rendering-heading" className="article-heading">
              Garena vs Non-Garena Server Name Rendering
            </h2>
            <p>
              Garena-operated regions (India, Indonesia, Brazil, and others) run
              the official client with consistent Unicode font fallbacks. Names
              you copy from this generator generally render the same across
              Garena servers because they share one account database. Differences
              appear when friends use unofficial repacks, sideloaded APKs, or
              heavily modded Android skins — those builds substitute system
              fonts differently, so fraktur and squared letters may show as
              empty boxes even though your Garena client looks perfect.
            </p>
            <p>
              If your squad spans multiple regions, stick to high-compatibility
              styles (bold cursive, small caps, simple borders) rather than
              squared or fullwidth Latin. Those blocks are the first to break on
              non-standard clients.
            </p>
          </section>

          <section aria-labelledby="guild-vs-profile-heading">
            <h2 id="guild-vs-profile-heading" className="article-heading">
              Guild Name vs Profile Name Rules
            </h2>
            <p>
              Free Fire treats guild identity separately from your personal
              profile. Your profile name appears in kill feeds, friend lists,
              and match results; your guild name shows on the lobby badge and
              guild roster. They use different character limits, different
              rename costs, and different validation rules — a font combination
              that saves cleanly on your profile can truncate or reject in the
              guild field. Always paste and preview guild names inside the guild
              edit screen before spending diamonds.
            </p>
          </section>

          <section aria-labelledby="symbols-heading">
            <h2 id="symbols-heading" className="article-heading">
              Popular Free Fire Name Symbols
            </h2>
            <p>
              Border brackets and clan-style symbols are what make FF names stand
              out in Indian and Southeast Asian lobbies. Click any symbol in the
              picker above to insert it at your cursor.
            </p>
            <div className="symbol-showcase" aria-hidden="true">
              {FREE_FIRE_SYMBOLS.slice(0, 16).map((symbol) => (
                <span key={symbol} className="symbol-showcase__item">
                  {symbol}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="known-breaks-heading">
            <h2 id="known-breaks-heading" className="article-heading">
              FF-Specific Symbols &amp; Styles That Show as Boxes
            </h2>
            <p>
              These styles are flagged <strong>⚠️ May not render</strong> in
              the generator above. We re-test them after each OB patch — see the
              version badge at the top of this page for our last verified build.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {FF_BROKEN_SYMBOLS.map((entry) => (
                <li key={entry.item}>
                  <strong>{entry.item}</strong> — example:{" "}
                  <span className="converted-name text-base">{entry.example}</span>
                  . {entry.status}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="ff-max-table-heading">
            <h2 id="ff-max-table-heading" className="article-heading">
              FF vs FF MAX Name Sync &amp; Rendering
            </h2>
            <p>
              The table below is the single most FF-specific compatibility
              reference on this site — BGMI has no MAX equivalent. We update it
              after every major OB test session.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Aspect
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Free Fire (Original)
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Free Fire MAX
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FF_MAX_SYNC_TABLE.map((row) => (
                    <tr key={row.aspect}>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {row.aspect}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {row.freeFire}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {row.freeFireMax}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="name-field-table-heading">
            <h2 id="name-field-table-heading" className="article-heading">
              Profile Name vs Guild Name — Limits &amp; Costs
            </h2>
            <p>
              Guild and profile fields follow different rules. Use this table
              before you finalize a styled guild tag or spend diamonds on a
              rename.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Rule
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Profile Name
                    </th>
                    <th className="border border-[var(--border)] px-3 py-2 text-left">
                      Guild Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FF_NAME_FIELD_TABLE.map((row) => (
                    <tr key={row.rule}>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {row.rule}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {row.profileName}
                      </td>
                      <td className="border border-[var(--border)] px-3 py-2">
                        {row.guildName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-[var(--cream-faint)]">
              Cells marked &quot;pending verification&quot; will be confirmed
              after our next in-game test pass.
            </p>
          </section>

          <section aria-labelledby="name-gallery-heading">
            <h2 id="name-gallery-heading" className="article-heading">
              Free Fire Name Gallery
            </h2>
            <p>
              Browse pre-styled names organized for how FF players actually
              search — guild tags, girl gamer names popular in South and
              Southeast Asia, short names for FF&apos;s compact HUD, and
              region-specific styles from the Indian FF community versus global
              meta. Click copy and paste directly into your profile or guild
              field.
            </p>
            <CuratedNameGrid categories={FREE_FIRE_CURATED_NAMES} />
          </section>

          <section aria-labelledby="faq-heading" className="article-faq">
            <h2 id="faq-heading" className="article-heading">
              Free Fire Name FAQ
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
          <RelatedTools tools={[...FF_RELATED_TOOLS]} />
        </div>
      </main>
    </>
  );
}
