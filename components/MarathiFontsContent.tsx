"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  MarathiBrandVoiceSection,
  MarathiFontsBreakSection,
  MarathiMythsSection,
  MarathiSocialContextSection,
  MarathiUnicodeRealitySection,
} from "@/components/MarathiExpertArticle";
import RelatedTools from "@/components/RelatedTools";
import { generateMarathiLatin } from "@/lib/fontStyles";
import {
  FAQ_ITEMS,
  generateDecoratedMarathi,
  MARATHI_RELATED_TOOLS,
  MARATHI_STATIC_SAMPLES,
  MARATHI_SYMBOL_CATEGORIES,
} from "@/lib/marathiPageData";

function CopyButton({ text }: { text: string }) {
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
      className={`copy-btn min-h-11 shrink-0 rounded-lg px-5 py-2.5 font-medium transition-all active:scale-95 ${copied ? "copy-btn--success" : ""}`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

function StyleCard({
  name,
  text,
  index,
}: {
  name: string;
  text: string;
  index: number;
}) {
  return (
    <article
      className="style-card flex flex-col gap-3 rounded-xl p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <span className="style-label">{name}</span>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="converted-name min-w-0">{text}</p>
        <CopyButton text={text} />
      </div>
    </article>
  );
}

function SymbolChip({ char, label }: { char: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(char);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [char]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`symbol-picker__btn flex min-h-12 min-w-12 items-center justify-center text-xl transition-all active:scale-95 ${copied ? "ring-2 ring-[var(--neon-lime)]" : ""}`}
      aria-label={`Copy ${label}`}
      title={copied ? "Copied!" : `Copy ${label}`}
    >
      {copied ? "✓" : char}
    </button>
  );
}

export default function MarathiFontsContent() {
  const [marathiInput, setMarathiInput] = useState("");
  const [latinInput, setLatinInput] = useState("");
  const marathiInputRef = useRef<HTMLInputElement>(null);

  const decoratedResults = useMemo(
    () => generateDecoratedMarathi(marathiInput),
    [marathiInput],
  );

  const latinResults = useMemo(
    () => generateMarathiLatin(latinInput),
    [latinInput],
  );

  useEffect(() => {
    marathiInputRef.current?.focus();
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="reveal mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Stylish Marathi Fonts" },
          ]}
        />
      </div>

      <p
        className="reveal mb-3 text-center text-sm tracking-wide text-[var(--cream-faint)] sm:text-left"
        lang="mr"
      >
        मराठी फॉन्ट कॉपी करा
      </p>

      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="article-h1 reveal reveal-delay-1 mb-6">
          Stylish Marathi Fonts — Copy Paste Unicode Text
        </h1>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          Looking for <strong>stylish Marathi fonts copy paste</strong> for
          WhatsApp and Instagram? This page gives you 50+ Unicode Marathi text
          styles you can grab instantly — decorated Devanagari script, Marathi
          stylish text in fancy Latin fonts, and symbols for Facebook too. No
          app needed; works on any device. Also try our{" "}
          <Link href="/" className="intro-link">
            stylish name generator
          </Link>{" "}
          for all platforms, or{" "}
          <Link
            href="/hindi-stylish-fonts-generator"
            className="intro-link"
          >
            Hindi stylish fonts
          </Link>{" "}
          for Devanagari styles in Hindi.
        </p>
      </section>

      <section
        aria-labelledby="how-to-heading"
        className="article-content reveal reveal-delay-3 mb-14"
      >
        <h2 id="how-to-heading" className="article-heading">
          How to Use Stylish Marathi Fonts
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-[var(--cream-muted)]">
          <li>Browse the font styles below and find one you like</li>
          <li>Click the Copy button next to any style</li>
          <li>
            Paste directly into WhatsApp, Instagram, Facebook or any app
          </li>
        </ol>
      </section>

      <section
        aria-labelledby="font-styles-heading"
        className="tool-section reveal reveal-delay-4 mb-14"
      >
        <h2 id="font-styles-heading" className="article-heading mb-6">
          Marathi Font Styles — Browse &amp; Copy
        </h2>

        <div className="mb-8 overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-raised)]">
                <th className="px-4 py-3 font-medium text-[var(--cream-faint)]">
                  Style name
                </th>
                <th className="px-4 py-3 font-medium text-[var(--cream-faint)]">
                  Marathi text sample
                </th>
                <th className="px-4 py-3 font-medium text-[var(--cream-faint)]">
                  Copy
                </th>
              </tr>
            </thead>
            <tbody>
              {MARATHI_STATIC_SAMPLES.map((sample) => (
                <tr
                  key={sample.name}
                  className="border-b border-[var(--border)] last:border-b-0"
                >
                  <td className="px-4 py-3 text-[var(--cream-muted)]">
                    {sample.name}
                  </td>
                  <td className="converted-name px-4 py-3 text-base">
                    {sample.text}
                  </td>
                  <td className="px-4 py-3">
                    <CopyButton text={sample.text} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="article-subheading mb-2">
          Decorated Marathi text
        </h3>
        <p className="tool-instruction mb-4 text-sm leading-relaxed">
          Type any Marathi word or name below — all decorated Marathi copy paste
          fonts update instantly. Perfect for Marathi WhatsApp fonts and status
          messages.
        </p>

        <div className="mb-6">
          <label htmlFor="marathi-decorated-input" className="sr-only">
            Enter Marathi text for decorated styles
          </label>
          <input
            ref={marathiInputRef}
            id="marathi-decorated-input"
            type="text"
            value={marathiInput}
            onChange={(e) => setMarathiInput(e.target.value.slice(0, 40))}
            placeholder="Type your Marathi word — e.g. मराठी"
            maxLength={40}
            className="name-input min-h-12 w-full rounded-xl px-4 text-base"
          />
        </div>

        <div className="results-grid mb-10 grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
          {decoratedResults.map((style, index) => (
            <StyleCard
              key={style.id}
              name={style.name}
              text={style.text}
              index={index}
            />
          ))}
        </div>

        <h3 className="article-subheading mb-2">
          Style your name in fancy English fonts
        </h3>
        <p className="tool-instruction mb-4 text-sm leading-relaxed">
          Write your name in English, style it in fancy fonts — ideal when you
          romanise your Marathi name (e.g. Pratik, Sneha). These Marathi Unicode
          text generator styles work in bios and captions too.
        </p>

        <div className="mb-6">
          <label htmlFor="marathi-latin-input" className="sr-only">
            Enter your name in English for fancy Latin fonts
          </label>
          <input
            id="marathi-latin-input"
            type="text"
            value={latinInput}
            onChange={(e) => setLatinInput(e.target.value.slice(0, 30))}
            placeholder="Type your name in English..."
            maxLength={30}
            className="name-input min-h-12 w-full rounded-xl px-4 text-base"
          />
        </div>

        <div className="results-grid grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
          {latinResults.map((style, index) => (
            <StyleCard
              key={style.id}
              name={style.name}
              text={style.text}
              index={index}
            />
          ))}
        </div>

        {/* <Image
          src="/stylish-marathi-fonts-copy-paste-whatsapp.svg"
          alt="Stylish Marathi fonts copy paste — decorated Unicode Marathi text for WhatsApp and Instagram"
          width={640}
          height={400}
          sizes="(max-width: 768px) 100vw, 640px"
          className="mt-10 w-full max-w-2xl rounded-xl border border-[var(--border)]"
        /> */}
      </section>

      <section
        aria-labelledby="symbols-heading"
        className="article-content reveal reveal-delay-4 mb-14"
      >
        <h2 id="symbols-heading" className="article-heading">
          Marathi Unicode Symbols &amp; Decorative Text
        </h2>
        <p>
          Click any symbol below to copy it — then paste around your Marathi text
          for Marathi Facebook fonts, Instagram bios, or WhatsApp status. Mix
          borders, flowers, and sparkles with the decorated generator above.
        </p>

        {MARATHI_SYMBOL_CATEGORIES.map((category) => (
          <div key={category.title} className="mt-8">
            <h3 className="article-subheading">{category.title}</h3>
            <div
              className="symbol-picker__grid"
              role="group"
              aria-label={category.title}
            >
              {category.items.map((item) => (
                <SymbolChip
                  key={`${category.title}-${item.char}`}
                  char={item.char}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <MarathiFontsBreakSection />
      <MarathiUnicodeRealitySection />
      <MarathiSocialContextSection />
      <MarathiMythsSection />
      <MarathiBrandVoiceSection />

      <section
        aria-labelledby="faq-heading"
        className="article-content article-faq reveal reveal-delay-4 mb-14"
      >
        <h2 id="faq-heading" className="article-heading">
          Frequently Asked Questions About Marathi Fonts
        </h2>
        <dl className="space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="faq-item">
              <dt className="mb-2">{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-[var(--cream-faint)]">
          More font tools:{" "}
          <Link href="/" className="intro-link">
            stylish name generator for WhatsApp
          </Link>
          {" · "}
          <Link href="/instagram-stylish-fonts" className="intro-link">
            Instagram stylish fonts
          </Link>
        </p>
      </section>

      <div className="reveal reveal-delay-5 mt-12">
        <RelatedTools tools={[...MARATHI_RELATED_TOOLS]} />
      </div>
    </main>
  );
}
