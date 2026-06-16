import Link from "next/link";
import NameGenerator from "@/components/NameGenerator";
import HomeSeoArticle from "@/components/HomeSeoArticle";

const marqueeStyles = [
  "𝓢𝓽𝔂𝓵𝓲𝓼𝓱",
  "𝕊𝕥𝕪𝕝𝕚𝕤𝕙",
  "🆂🆃🆈🅻🅸🆂🅷",
  "ⓢⓣⓨⓛⓘⓢⓗ",
  "🇸🇹🇾🇱🇮🇸🇭",
  "ꜱᴛʏʟɪꜱʜ",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a stylish name generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A tool that converts plain text into Unicode fancy font characters you copy and paste. No install. Works anywhere that supports those characters.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work in BGMI and Free Fire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many styles do; some don't. Platform rules change. Use our game-focused pages and always test before committing to a paid rename.",
      },
    },
    {
      "@type": "Question",
      name: "Is it the same as LingoJam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Same underlying Unicode idea. Different experience — we're a dedicated stylish-name home, not one converter among fifty.",
      },
    },
    {
      "@type": "Question",
      name: "Are styled names free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On our site, yes. No signup, no per-copy fee.",
      },
    },
    {
      "@type": "Question",
      name: "What about coloured names?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "True per-letter colour in game tags is rare. Emoji and platform-specific tricks are the realistic option; readability still comes first.",
      },
    },
  ],
};

export default function Home() {
  const marqueeContent = [...marqueeStyles, ...marqueeStyles];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="marquee-strip reveal" aria-hidden="true">
        <div className="marquee-strip__track">
          {marqueeContent.map((text, i) => (
            <span key={i} className="marquee-strip__item">
              {text}
            </span>
          ))}
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="reveal mb-4">
          <span className="hero-badge inline-block rounded-full px-3 py-1">
            Unicode · Instant · Free
          </span>
        </div>

        <h1 className="article-h1 reveal reveal-delay-1 mb-6">
          Stylish Name Generator: How I Learned Copy-Paste Beats Game Settings
          (And Built One Place for Every Style)
        </h1>

        <div className="article-lead reveal reveal-delay-2 mb-10 max-w-3xl space-y-5">
          <p>
            The first time I noticed a <strong>stylish name generator</strong>,
            I wasn&apos;t on a website. I was in Counter-Strike — CS:GO —
            watching players in the lobby with names that looked typed in a
            completely different font. Curved letters. Bold symbols. Names that
            stood out while mine sat there in plain text.
          </p>
          <p>
            I did what a lot of people probably do. I opened settings. Graphics,
            interface, profile, anything that looked like it could change how my
            name displayed. I spent hours on it. Nothing worked the way I
            expected.
          </p>
          <p>
            Only after a long Google session did I find the answer: you
            don&apos;t generate those names inside the game. You copy them from a
            website and paste them in. That single discovery is why{" "}
            <strong>stylishnamegenerator.in</strong> exists today — and why this
            guide is written differently from the usual &ldquo;here are 50
            fonts&rdquo; posts.
          </p>
          <p>
            If you&apos;re searching for a <strong>stylish name maker</strong>, a{" "}
            <strong>stylish name writer</strong>, or even{" "}
            <strong>myself stylish name</strong> because you want{" "}
            <em>your</em> name to look sharp on{" "}
            <Link href="/free-fire-name-generator" className="article-link">
              Free Fire name generator
            </Link>
            , BGMI, or Instagram, you&apos;re in the right place. I&apos;ll share what I learned
            building the tool, what I&apos;d avoid, and what I&apos;d pick
            instead.
          </p>
        </div>

        <div className="reveal reveal-delay-3">
          <NameGenerator />
        </div>

        <div className="reveal reveal-delay-4">
          <HomeSeoArticle />
        </div>
      </main>
    </>
  );
}
