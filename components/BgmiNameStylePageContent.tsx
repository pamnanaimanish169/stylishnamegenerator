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
      "Some players insert the Hangul Filler character (U+3164, ㅤ) to create visual padding without visible text. It occupies a code point in BGMI's character counter even though it renders blank on most screens. Paste it between symbols and letters to widen spacing — for example, ꧁ㅤProㅤ꧂ — but use sparingly: BGMI's validator may reject strings with multiple consecutive fillers, and invisible characters can push you past the 14-character cap without obvious feedback. Always verify the final count in the in-game rename preview before confirming.",
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

      {/* Section C: Character Limit & Font Matrix */}
      <section
        aria-labelledby="char-limit-heading"
        className="article-content reveal reveal-delay-4 mb-14"
      >
        <h2 id="char-limit-heading" className="article-heading">
          BGMI Character Limit &amp; Font Compatibility Guide
        </h2>
        <p>
          BGMI enforces a strict <strong>14-character maximum</strong> for
          profile names. The live counter in the generator above tracks your
          raw input, but your final styled output can exceed the limit because
          decorative Unicode letters and symbol pairs consume multiple code
          points. Always copy the finished name and verify the in-game preview
          before spending a Rename Card.
        </p>
        <p
          className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--cream-faint)]"
          role="note"
        >
          <strong className="text-[var(--cream)]">Unicode slot warning:</strong>{" "}
          A single visible glyph — like a bold cursive letter or enclosed
          character — may count as two or more characters in BGMI&apos;s
          validator. Complex structures (꧁ + styled text + ꧂) use slots
          faster than plain ASCII, so short base words leave more room for
          borders.
        </p>
      </section>

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
              description: "FF-compatible fonts, symbols, and a 20-char counter.",
            },
            {
              href: "/freestyle-nickname-generator",
              title: "Freestyle Nickname Generator",
              description:
                "Creative nicknames with vibe buckets — no character limit.",
            },
          ]}
        />
      </div>
    </main>
  );
}
