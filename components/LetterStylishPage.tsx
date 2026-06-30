"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import LetterExpertSections from "@/components/LetterExpertSections";
import RelatedTools from "@/components/RelatedTools";
import { generateAll, type FontStyleResult } from "@/lib/fontStyles";
import type {
  LetterConfig,
  LetterFaqItem,
  PopularName,
} from "@/lib/letterStylishPageData";

const TOOL_ANCHOR_ID = "letter-tool";

function CopyButton({
  text,
  small = false,
}: {
  text: string;
  small?: boolean;
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

  const sizing = small
    ? "min-h-9 px-4 py-2 text-sm"
    : "min-h-11 px-5 py-2.5";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${text}`}
      className={`copy-btn shrink-0 rounded-lg font-medium transition-all active:scale-95 ${sizing} ${copied ? "copy-btn--success" : ""}`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

function StyleCard({
  style,
  index,
}: {
  style: FontStyleResult;
  index: number;
}) {
  return (
    <article
      className="style-card flex flex-col gap-3 rounded-xl p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <span className="style-label">{style.name}</span>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="converted-name min-w-0">{style.text}</p>
        <CopyButton text={style.text} />
      </div>
    </article>
  );
}

function WhatsAppShareButton({ text }: { text: string }) {
  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-share-btn flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-all active:scale-95"
      aria-label={`Share ${text} on WhatsApp`}
      title="Share on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01ZM12.04 20.15h-.003a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
      <span>Share</span>
    </a>
  );
}

function PopularNameCard({
  name,
  index,
}: {
  name: PopularName;
  index: number;
}) {
  const styled = name.variants[0]?.text ?? name.plain;

  return (
    <article
      className="style-card flex flex-col gap-3 rounded-xl p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(index * 0.03, 0.5)}s` }}
    >
      <span className="style-label">{name.plain}</span>
      <p className="converted-name min-w-0 text-lg sm:text-xl">{styled}</p>
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton text={styled} />
        <WhatsAppShareButton text={styled} />
      </div>
    </article>
  );
}

function IntroParagraph({
  config,
}: {
  config: LetterConfig;
}) {
  const homeLink = (
    <Link href="/" className="intro-link">
      stylish name generator
    </Link>
  );
  const freestyleLink = (
    <Link href="/freestyle-nickname-generator" className="intro-link">
      freestyle nickname generator
    </Link>
  );

  if (config.introVariant === "m") {
    return (
      <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
        Looking for a <strong>myself stylish name</strong> starting with M?
        This generator creates fancy Unicode versions of any M name instantly —
        type yours above and copy your favourite <strong>m stylish name</strong>{" "}
        in one tap. Whether you searched &ldquo;m style name&rdquo;,
        &ldquo;myself stylish name&rdquo;, or just want a fancy font for your
        profile, you&apos;re in the right place. It&apos;s powered by our{" "}
        {homeLink} and {freestyleLink}, and the styled text pastes straight into
        Instagram, BGMI and WhatsApp.
      </p>
    );
  }

  if (config.introVariant === "j") {
    return (
      <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
        Need a cool <strong>j stylish name</strong> that pops? This{" "}
        <strong>stylish J name</strong> maker converts any name starting with J
        into dozens of fancy fonts you can copy and paste instantly. Enter your
        own J name above, or pick from our hand-picked J name ideas below.
        Running on the same engine as our {homeLink} and {freestyleLink}, every
        fancy font works across Instagram, BGMI, WhatsApp and more.
      </p>
    );
  }

  return (
    <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
      Want an eye-catching <strong>s style name</strong> that stands out? This{" "}
      <strong>stylish S name</strong> generator turns any name starting with S
      into dozens of fancy fonts you can copy and paste in one tap. Type your
      own name above, or browse our curated S name ideas below. Built on the
      same engine as our {homeLink} and {freestyleLink}, it works on Instagram,
      BGMI, WhatsApp and more.
    </p>
  );
}

function renderFaqAnswer(item: LetterFaqItem) {
  if (item.id !== "platforms") return item.answer;

  // Split the canonical answer so the platform tool mentions become links,
  // keeping the rendered copy in sync with the FAQPage schema text.
  const [before, afterInstagram] = item.answer.split(
    "Instagram stylish fonts page",
  );
  const [middle, end] = (afterInstagram ?? "").split("BGMI name generator");

  return (
    <>
      {before}
      <Link href="/instagram-stylish-fonts" className="article-link">
        Instagram stylish fonts page
      </Link>
      {middle}
      <Link href="/bgmi-name-generator" className="article-link">
        BGMI name generator
      </Link>
      {end}
    </>
  );
}

export default function LetterStylishPage({
  config,
}: {
  config: LetterConfig;
}) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<FontStyleResult[]>(() =>
    generateAll(config.placeholder),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runGenerate = useCallback(
    (value: string) => {
      setResults(generateAll(value.trim() || config.placeholder));
    },
    [config.placeholder],
  );

  const handleInput = (value: string) => {
    const trimmed = value.slice(0, 30);
    setInput(trimmed);
    runGenerate(trimmed);
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="reveal mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: `${config.letter} Stylish Name` },
          ]}
        />
      </div>

      <div className="reveal mb-4">
        <span className="hero-badge inline-block rounded-full px-3 py-1">
          {config.letter} Names · Unicode · Copy Paste
        </span>
      </div>

      <h1 className="article-h1 reveal reveal-delay-1 mb-6">{config.h1}</h1>

      <IntroParagraph config={config} />

      <section
        aria-labelledby="how-to-heading"
        className="reveal reveal-delay-2 mb-10 max-w-3xl"
      >
        <h2 id="how-to-heading" className="article-heading">
          {config.howToHeading}
        </h2>
        <ol className="how-steps">
          <li className="how-step">
            Type a name starting with {config.letter} in the box below — or use
            the pre-filled {config.placeholder} example.
          </li>
          <li className="how-step">
            Compare the fancy font styles that appear instantly underneath.
          </li>
          <li className="how-step">
            Hit Copy on your favourite, then paste it into Instagram, BGMI,
            WhatsApp, or anywhere that accepts Unicode text.
          </li>
        </ol>
      </section>

      <section
        id={TOOL_ANCHOR_ID}
        className="tool-section reveal reveal-delay-3 w-full"
        aria-label={`${config.letter} stylish name generator tool`}
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={config.placeholder}
            maxLength={30}
            className="name-input min-h-12 flex-1 rounded-xl px-4 text-base"
            aria-label={`Enter a name starting with ${config.letter}`}
          />
          <button
            type="button"
            onClick={() => runGenerate(input)}
            className="generate-btn min-h-12 rounded-xl px-8 text-sm font-semibold transition-all active:scale-95 sm:shrink-0"
          >
            Generate
          </button>
        </div>

        <div className="results-grid grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
          {results.map((style, index) => (
            <StyleCard key={style.id} style={style} index={index} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="popular-heading"
        className="reveal reveal-delay-4 mt-14"
      >
        <h2 id="popular-heading" className="article-heading mb-3">
          {config.popularHeading}
        </h2>
        <p className="tool-instruction mb-6 max-w-3xl text-sm leading-relaxed">
          {config.popularIntro}
        </p>
        <div className="results-grid grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
          {config.popularNames.map((name, index) => (
            <PopularNameCard key={name.plain} name={name} index={index} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="about-heading"
        className="article-content reveal reveal-delay-4 mt-14"
      >
        <h2 id="about-heading" className="article-heading">
          {config.aboutHeading}
        </h2>
        {config.aboutParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <LetterExpertSections config={config} />

      <section
        aria-labelledby="faq-heading"
        className="article-content article-faq reveal reveal-delay-4 mt-14 mb-14"
      >
        <h2 id="faq-heading" className="article-heading">
          {config.faqHeading}
        </h2>
        <dl className="space-y-6">
          {config.faq.map((item) => (
            <div key={item.id} className="faq-item">
              <dt className="mb-2">{item.question}</dt>
              <dd>{renderFaqAnswer(item)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="reveal reveal-delay-5 mt-12">
        <RelatedTools tools={config.relatedTools} />
      </div>
    </main>
  );
}
