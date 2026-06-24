"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import BgmiNameGenerator from "@/components/BgmiNameGenerator";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedTools from "@/components/RelatedTools";
import {
  BGMI_CURATED_NAMES,
  BGMI_LAST_TESTED_VERSION,
} from "@/lib/bgmiCuratedNames";
import {
  BGMI_CODEPOINT_EXAMPLES,
  BGMI_CODEPOINT_TIER_TABLE,
  BGMI_FONT_STACK_TABLE,
  BGMI_MYTHS_TABLE,
  BGMI_NAME_ARCHITECTURE,
  BGMI_NAME_LAYER_FRAMEWORK,
  BGMI_PLAY_STYLE_DECISION,
} from "@/lib/bgmiPageData";

const PENDING_VERIFICATION = "Pending verification";

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

const MICRO_SYMBOLS = [
  "亗",
  "么",
  "〆",
  "꧂",
  "𓆩",
  "𓆪",
  "♛",
  "👑",
  "꧁",
  "༺",
  "༻",
  "☬",
  "彡",
  "★",
  "⚔",
  "✿",
  "♚",
  "☠",
  "༒",
  "⚡",
  "❖",
  "✦",
  "✧",
  "᭄",
  "๛",
  "゛",
  "ꫝ",
  "々",
  "☯",
  "❀",
] as const;

const FAQ_ITEMS = [
  {
    question: "Why do some symbols look like boxes or question marks in the game?",
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

const BGMI_APPLY_STEPS = [
  {
    text: (
      <>
        From the main lobby, tap <strong>INVENTORY</strong> in the bottom menu
        bar (far right).
      </>
    ),
    image: "/bgmi/step-1-inventory.png",
    alt: "BGMI main lobby with the Inventory button highlighted in the bottom menu",
  },
  {
    text: (
      <>
        Open the <strong>Treasures / Items</strong> tab — the crate icon at the
        bottom of the right-side inventory menu.
      </>
    ),
    image: "/bgmi/step-2-treasures-tab.png",
    alt: "BGMI inventory screen with the Treasures tab highlighted",
  },
  {
    text: (
      <>
        Select your <strong>Rename Card</strong> and tap <strong>Use</strong>.
      </>
    ),
    image: "/bgmi/step-3-rename-card.png",
    alt: "BGMI inventory showing the Rename Card selected with the Use button",
  },
  {
    text: (
      <>
        Paste your copied <strong>BGMI name style</strong> into the nickname
        field, check the preview for boxes or truncation, then tap{" "}
        <strong>OK</strong> to confirm.
      </>
    ),
    image: "/bgmi/step-4-name-change.png",
    alt: "BGMI Name Change dialog with the nickname input field and OK button",
  },
] as const;

function CopyPasteButton({
  text,
  className = "",
  children,
}: {
  text: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`style-card group flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left active:scale-[0.98] ${copied ? "border-[var(--neon-cyan)] shadow-[0_0_20px_var(--glow-cyan)]" : ""} ${className}`}
      aria-label={`Copy ${text}`}
    >
      <span className="converted-name min-w-0 truncate text-base">{children}</span>
      <span
        className={`copy-btn shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${copied ? "copy-btn--success" : ""}`}
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

function SymbolChip({ symbol }: { symbol: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(symbol);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [symbol]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`symbol-picker__btn flex min-h-12 min-w-12 items-center justify-center text-xl transition-all active:scale-95 ${copied ? "ring-2 ring-[var(--accent)]" : ""}`}
      aria-label={`Copy symbol ${symbol}`}
      title={copied ? "Copied!" : `Copy ${symbol}`}
    >
      {copied ? "✓" : symbol}
    </button>
  );
}

export default function BgmiNameStylePageContent() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="reveal mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "BGMI Name Style" },
          ]}
        />
      </div>

      <div className="reveal mb-4 flex flex-wrap items-center gap-2">
        <span className="hero-badge inline-block rounded-full px-3 py-1">
          BGMI Name Style · Copy Paste
        </span>
        <span className="hero-badge inline-block rounded-full px-3 py-1">
          Last tested on BGMI v{BGMI_LAST_TESTED_VERSION}
        </span>
      </div>

      {/* Section A: Hero & Generation Engine */}
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="article-h1 reveal reveal-delay-1 mb-6">
          BGMI Name Style: 1000+ Cool, Stylish &amp; Nickname Symbols (2026)
        </h1>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          Looking for the perfect <strong>BGMI name style</strong>? Type your
          nickname below and instantly generate cool, stylish names with symbols
          you can copy in one click. Every style on this page is tuned for
          Battlegrounds Mobile India&apos;s name field — paste directly into the
          game without trial-and-error renames.
        </p>

        <div className="reveal reveal-delay-3 mb-14">
          <BgmiNameGenerator />
        </div>
      </section>

      {/* Section B: Curated Copy-Paste Grid */}
      <section
        aria-labelledby="curated-heading"
        className="tool-section reveal reveal-delay-4 mb-14"
      >
        <p className="tool-instruction mb-8 text-sm leading-relaxed">
          Skip the typing — tap any pre-made{" "}
          <strong>BGMI name style</strong> below to copy it in one click.
        </p>
        {BGMI_CURATED_NAMES.map((category, index) => (
          <div
            key={category.title}
            className={
              index > 0
                ? "border-t border-[var(--border)] pt-8 mt-8"
                : undefined
            }
          >
            <h2
              id={index === 0 ? "curated-heading" : undefined}
              className="article-heading mb-4"
            >
              {category.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {category.names.map((name) => (
                <CopyPasteButton key={name} text={name}>
                  {name}
                </CopyPasteButton>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Expert article sections — E-E-A-T depth */}
      <article className="article-content reveal reveal-delay-4 mb-14">
        <section aria-labelledby="font-stack-heading">
          <h2 id="font-stack-heading" className="article-heading">
            Why Your BGMI Name Looks Different on Other Players&apos; Screens
            (The Font Stack Problem)
          </h2>
          <p>
            Every competing BGMI name guide treats rendering as solved —
            &quot;copy, paste, done.&quot; None explain why the same name looks
            like <span className="converted-name text-base">꧁𝓟𝓻𝓸꧂</span> on
            your Realme but renders as{" "}
            <span className="converted-name text-base">꧁□□□꧂</span> on your
            friend&apos;s Redmi. That frustration is real, recurring, and
            entirely about the OS font stack — not your name choice.
          </p>
          <p>
            BGMI does not ship its own Unicode renderer. It calls Android&apos;s
            or iOS&apos;s system font. On MIUI 14 (Xiaomi), the fallback
            chain differs from stock Android 14, which differs from ColorOS
            (OPPO). Fraktur (𝔄) fails most often on low-RAM MIUI devices;
            Mathematical Bold Script survives better because Noto covers it on
            most Android 8+ builds.
          </p>
          <p>
            <strong>The &quot;works on my phone&quot; trap:</strong> a name
            perfect on a Samsung Galaxy S23 may show boxes on a 3&nbsp;GB RAM
            device running Android 10. Cheap and older devices — still 40%+
            of BGMI&apos;s Indian playerbase — have stripped system fonts.
            Benchmark against your squad&apos;s lowest-spec phone, not your own.
          </p>
          <p>
            <strong>iOS vs Android:</strong> iOS handles most Unicode
            mathematical blocks cleanly because Apple ships comprehensive system
            fonts. Android fragmentation means the same name looks professional
            on a Pixel and broken on a Tecno — which is why YouTube &quot;copy
            this name&quot; videos often look different when viewers try them.
          </p>
          <p>
            <strong>Patch-to-patch regressions:</strong> Krafton occasionally
            updates embedded font subsets with patches. A style confirmed on
            v3.8 may silently break on v3.9 — not because your name changed,
            but because a font asset got swapped. That is why our{" "}
            <strong>Last tested on BGMI v{BGMI_LAST_TESTED_VERSION}</strong>{" "}
            badge is genuinely useful, not decorative.
          </p>
          <div className="article-table-wrap overflow-x-auto">
            <table className="article-table">
              <thead>
                <tr>
                  <th scope="col">Unicode style block</th>
                  <th scope="col">Breaks on</th>
                  <th scope="col">Device tier</th>
                </tr>
              </thead>
              <tbody>
                {BGMI_FONT_STACK_TABLE.map((row) => (
                  <tr key={row.styleBlock}>
                    <td>{row.styleBlock}</td>
                    <td>{row.breaksOn}</td>
                    <td>{row.deviceTier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="article-table-footnote">
            <strong className="text-[var(--cream)]">Cross-device test protocol:</strong>{" "}
            apply the name, then ask a squadmate on a different-brand phone to
            screenshot your lobby card. If it renders clean on a Redmi Note
            (common budget device), it renders clean for roughly 70% of your
            audience.
          </p>
        </section>

        <section aria-labelledby="char-limit-heading">
          <h2 id="char-limit-heading" className="article-heading">
            The 14/16 Character Confusion in BGMI — How Players Accidentally
            Waste Rename Cards
          </h2>
          <p>
            Most BGMI name articles say &quot;16 characters&quot; or &quot;14
            characters&quot; without explaining that <em>both numbers are
            technically correct</em> depending on what you count. This is one of
            the most Googled frustrations in the naming space — and it costs real
            Rename Cards.
          </p>
          <p>
            BGMI&apos;s UI shows a character counter that measures Unicode
            encoding slots, not visible glyphs. A single cursive letter like 𝓟
            is U+1D4DF — one visible character, but encoded as a UTF-16
            surrogate pair that consumes <strong>two slots</strong> in
            Android&apos;s Java layer (which BGMI likely validates against). A
            14-slot limit can therefore be hit at 7–8 <em>visible</em>{" "}
            characters when you use supplementary-plane styles.
          </p>
          <aside className="expert-note" role="note">
            <p className="expert-note__label">Expert note</p>
            <p>
              The generator counter above uses JavaScript code points (modern
              spread syntax). BGMI&apos;s validator on Android counts UTF-16
              code units — so your styled name may register as longer in-game
              than our counter shows. Always trust the in-game rename preview
              over any external tool.
            </p>
            <p>
              Before confirming a Rename Card, paste your styled name into
              WhatsApp&apos;s status field (character count visible on some
              builds) or inspect code points in your browser console. The
              in-game preview shows truncation but not a code-point warning.
            </p>
          </aside>
          <p>
            <strong>Invisible character traps:</strong> the Hangul Filler
            (U+3164, ㅤ) occupies one slot despite rendering blank. Zero Width
            Non-Joiner (U+200C) and Zero Width Joiner (U+200D) behave
            differently across BGMI versions — some patches accept them, others
            reject the entire name silently.
          </p>
          <div className="article-table-wrap overflow-x-auto">
            <table className="article-table">
              <thead>
                <tr>
                  <th scope="col">Style category</th>
                  <th scope="col">Code points per char</th>
                  <th scope="col">Fits in ~14 slots</th>
                  <th scope="col">Tier</th>
                </tr>
              </thead>
              <tbody>
                {BGMI_CODEPOINT_TIER_TABLE.map((row) => (
                  <tr key={row.category}>
                    <td>{row.category}</td>
                    <td>{row.codePointsPerChar}</td>
                    <td>{row.charsIn14Slots}</td>
                    <td>{row.tier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="article-subheading">Worked examples — same word, three styles</p>
          <ul className="unicode-variant-list">
            {BGMI_CODEPOINT_EXAMPLES.map((ex) => (
              <li key={ex.label} className="unicode-variant-list__item">
                <p className="unicode-variant-list__label">{ex.label}</p>
                <p className="unicode-variant-list__display">{ex.display}</p>
                <p className="unicode-variant-list__code">
                  Visible: {ex.visibleChars} · Estimated BGMI slots:{" "}
                  {ex.estimatedSlots}
                </p>
                <p className="unicode-variant-list__notes">{ex.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="play-style-heading">
          <h2 id="play-style-heading" className="article-heading">
            What Your BGMI Name Actually Communicates to Enemies and Teammates
            (And How to Use It)
          </h2>
          <p>
            Competing guides treat BGMI names as pure aesthetics. In practice,
            high-ranked players consciously choose names for psychological and
            social reasons — this is real insider knowledge from the competitive
            community, not SEO filler.
          </p>
          <p>
            <strong>The smurf signal:</strong> names with ꧁༒...༒꧂ borders and
            aggressive words (KILLER, DEATH, DEMON) are associated with new
            players trying to look intimidating or actual smurfs. Conqueror
            players often use clean, minimal names to avoid pre-targeting. A
            player under &quot;𝕮𝖑𝖆𝖓𝕭𝖔𝖘𝖘&quot; gets third-partied more than one
            under &quot;jay.&quot;
          </p>
          <p>
            <strong>Clan recruitment meta:</strong> structured prefixes like
            ꧁𝕮𝕷𝕬𝕹|𝓑𝓞𝓢꧂ signal organisation to recruits and opponents.
            Unstructured stylish names signal casual solo-queue play.
          </p>
          <p>
            <strong>Name-based targeting in scrims:</strong> tournament team
            managers use name patterns to identify opponent roles. A name
            containing &quot;Sniper&quot; or &quot;𝓢𝓷𝓲𝓹𝓮𝓻&quot; gets priority
            attention — discussed openly in Indian BGMI Discord servers.
          </p>
          <p>
            <strong>Pro player minimalism:</strong> India&apos;s top seasonal
            leaderboard names are overwhelmingly short and clean — often a real
            nickname or 3–5 character handle. The trend away from heavy borders
            tracks with rank progression (kill-feed readability, streaming
            identity, sponsor branding).
          </p>
          <p className="article-subheading">
            What&apos;s your primary goal?
          </p>
          <div className="decision-matrix" role="list">
            {BGMI_PLAY_STYLE_DECISION.map((item) => (
              <div key={item.goal} className="decision-matrix__cell" role="listitem">
                <p className="decision-matrix__title">{item.goal}</p>
                <h3 className="decision-matrix__heading">{item.approach}</h3>
                <p>{item.recommendation}</p>
                <p className="mt-2 text-sm">
                  Example:{" "}
                  <span className="converted-name text-sm">{item.example}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="myths-heading">
          <h2 id="myths-heading" className="article-heading">
            BGMI Name Style Myths vs Reality: What Actually Works in 2026
          </h2>
          <p>
            Myth-busting requires enough domain depth to know what the community
            actually believes. These five corrections come from competitive
            lobbies, r/BGMI rename threads, and post-patch compatibility
            reports — not content-farm copy.
          </p>
          <div className="article-table-wrap overflow-x-auto">
            <table className="article-table">
              <thead>
                <tr>
                  <th scope="col">Myth</th>
                  <th scope="col">Reality</th>
                  <th scope="col">How widely believed</th>
                </tr>
              </thead>
              <tbody>
                {BGMI_MYTHS_TABLE.map((row) => (
                  <tr key={row.myth}>
                    <td>{row.myth}</td>
                    <td>{row.reality}</td>
                    <td>{row.belief}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="engineering-heading">
          <h2 id="engineering-heading" className="article-heading">
            Advanced BGMI Name Engineering: How to Build a Name That Works Across
            Every Device, Patch, and Rank (Not for Beginners)
          </h2>
          <p>
            This level of analysis does not exist on any competing BGMI name
            page. It combines Unicode technical knowledge with patch observation
            and competitive community feedback — treat your name as a system with
            layers, fallbacks, and version control.
          </p>
          <p>
            <strong>Build in layers, not one string:</strong> construct Border
            (꧁...꧂), Decoration (彡, ★, ☬), and Core Name independently — test
            each before combining. When a patch breaks one layer, swap it without
            rebuilding the entire name. Keep a saved text file of tested layers
            for each Rename Card.
          </p>
          <p>
            <strong>The patch-proof core principle:</strong> Mathematical Bold
            Script (𝓐–𝔃) and Mathematical Bold (𝐀–𝐳) are the most consistently
            supported blocks across Android versions and BGMI patches. Fraktur,
            Enclosed Alphanumerics, and Circled Letters are more patch-fragile.
            Build your core in Bold Script; add fragile decorations at borders
            where box-rendering is less jarring.
          </p>
          <p>
            <strong>The 3-character border budget rule:</strong> allocate
            exactly 3 symbols per side (e.g. ꧁☬彡 on left, 彡☬꧂ on right). That
            costs 6 border slots and leaves 8 for the core — enough for a
            4-character SMP word (2 slots each) or a 6-character BMP word.
          </p>
          <ul className="power-user-checklist">
            {BGMI_NAME_LAYER_FRAMEWORK.map((step) => (
              <li key={step.step}>
                <strong className="text-[var(--cream)]">{step.step}:</strong>{" "}
                {step.description}{" "}
                <span className="text-[var(--cream-faint)]">
                  ({step.example})
                </span>
              </li>
            ))}
          </ul>
          <p className="article-subheading">Sample name architecture</p>
          <div className="name-example" aria-label="Layered BGMI name structure">
            <span className="text-[var(--cream-faint)]">[Border]</span>{" "}
            {BGMI_NAME_ARCHITECTURE.borderLeft}
            <span className="text-[var(--cream-faint)]"> · [Deco] </span>
            {BGMI_NAME_ARCHITECTURE.decoration}
            <span className="text-[var(--cream-faint)]"> · [Core] </span>
            {BGMI_NAME_ARCHITECTURE.core}
            <span className="text-[var(--cream-faint)]"> · [Deco] </span>
            {BGMI_NAME_ARCHITECTURE.decorationRight}
            <span className="text-[var(--cream-faint)]"> · [Border] </span>
            {BGMI_NAME_ARCHITECTURE.borderRight}
          </div>
          <p className="article-table-footnote">
            Slot budget: {BGMI_NAME_ARCHITECTURE.slotBudget}
          </p>
          <aside className="expert-note" role="note">
            <p className="expert-note__label">Patch-monitoring workflow</p>
            <p>
              Krafton patch notes mention &quot;UI improvements&quot; without
              specifying which Unicode blocks were affected. Follow 2–3
              BGMI name-focused YouTube creators who test compatibility within
              48 hours of each patch. The r/BGMI weekly thread surfaces broken
              styles within hours. Check compatibility before spending a Rename
              Card post-patch.
            </p>
            <p>
              Build a <strong>primary</strong> name (full aesthetic) and a{" "}
              <strong>fallback</strong> name (BMP-only + ASCII borders). When a
              patch breaks your primary — and it will — apply the fallback
              immediately without losing identity.
            </p>
          </aside>
        </section>
      </article>

      {/* Section D: Micro-Symbol Quick Reference Bank */}
      <section
        aria-labelledby="symbols-heading"
        className="article-content reveal reveal-delay-4 mb-14"
      >
        <h2 id="symbols-heading" className="article-heading">
          Unique Symbols for BGMI (Mix &amp; Match)
        </h2>
        <p>
          Build a custom <strong>BGMI name style</strong> by copying symbols
          one at a time, then stitching them around your nickname in the
          generator above. Click any character to copy it to your clipboard.
        </p>
        <div
          className="symbol-picker__grid mt-4"
          role="group"
          aria-label="BGMI symbol quick reference"
        >
          {MICRO_SYMBOLS.map((symbol) => (
            <SymbolChip key={symbol} symbol={symbol} />
          ))}
        </div>
      </section>

      {/* Section E: Detailed Technical FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="article-content article-faq reveal reveal-delay-4 mb-14"
      >
        <h2 id="faq-heading" className="article-heading">
          Frequently Asked Questions About BGMI Name Styles
        </h2>
        <dl className="space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="faq-item">
              <dt className="mb-2">{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Section F: Step-by-Step Guide */}
      <section
        aria-labelledby="apply-heading"
        className="article-content reveal reveal-delay-5 mb-14"
      >
        <h2 id="apply-heading" className="article-heading">
          How to Apply Your New Name Style in BGMI
        </h2>
        <ol className="how-steps gap-6">
          {BGMI_APPLY_STEPS.map((step, index) => (
            <li key={step.image} className="how-step">
              <p>
                <span className="sr-only">Step {index + 1}: </span>
                {step.text}
              </p>
              <Image
                src={step.image}
                alt={step.alt}
                width={1024}
                height={460}
                sizes="(max-width: 768px) 100vw, 640px"
                className="mt-3 w-full max-w-2xl rounded-xl border border-[var(--border)]"
              />
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-[var(--cream-faint)]">
          Need more platforms? Browse our{" "}
          <Link href="/" className="intro-link">
            stylish name generator
          </Link>{" "}
          or try the{" "}
          <Link href="/free-fire-name-generator" className="intro-link">
            Free Fire name generator
          </Link>
          .
        </p>
      </section>

      <div className="reveal reveal-delay-5 mt-12">
        <RelatedTools
          tools={[
            {
              href: "/",
              title: "Stylish Name Generator",
              description:
                "Every Unicode font style in one place — all platforms.",
            },
            {
              href: "/free-fire-name-generator",
              title: "Free Fire Name Generator",
              description:
                "Stylish FF fonts and symbols with copy-paste ready names.",
            },
            {
              href: "/instagram-stylish-fonts",
              title: "Instagram Stylish Fonts",
              description:
                "Fancy fonts for bios, captions, and display names.",
            },
          ]}
        />
      </div>
    </main>
  );
}
