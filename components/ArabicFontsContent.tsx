"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  ArabicAdvancedSection,
  ArabicBidiSection,
  ArabicCalligraphySection,
  ArabicMythsSection,
  ArabicRenderingSection,
} from "@/components/ArabicExpertArticle";
import RelatedTools from "@/components/RelatedTools";
import { generateArabicLatin } from "@/lib/fontStyles";
import {
  ARABIC_FAQ_ITEMS,
  ARABIC_PREMADE_CATEGORIES,
  ARABIC_RELATED_TOOLS,
  generateDecoratedArabic,
} from "@/lib/arabicPageData";

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

function WhatsAppShareButton({ text }: { text: string }) {
  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-share-btn flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-all active:scale-95"
      aria-label="Share this status on WhatsApp"
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

function StyleCard({
  name,
  text,
  index,
  rtl = false,
}: {
  name: string;
  text: string;
  index: number;
  rtl?: boolean;
}) {
  return (
    <article
      className="style-card flex flex-col gap-3 rounded-xl p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <span className="style-label">{name}</span>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="converted-name min-w-0"
          dir={rtl ? "rtl" : undefined}
          lang={rtl ? "ur" : undefined}
        >
          {text}
        </p>
        <CopyButton text={text} />
      </div>
    </article>
  );
}

function PremadeCard({ text, index }: { text: string; index: number }) {
  return (
    <article
      className="style-card flex flex-col gap-3 rounded-xl p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <span dir="rtl" lang="ur" className="premade-text min-w-0 whitespace-pre-line">
        {text}
      </span>
      <div className="flex items-center gap-2">
        <CopyButton text={text} />
        <WhatsAppShareButton text={text} />
      </div>
    </article>
  );
}

export default function ArabicFontsContent() {
  const [arabicInput, setArabicInput] = useState("");
  const [latinInput, setLatinInput] = useState("");
  const arabicInputRef = useRef<HTMLInputElement>(null);

  const decoratedResults = useMemo(
    () => generateDecoratedArabic(arabicInput),
    [arabicInput],
  );

  const latinResults = useMemo(
    () => generateArabicLatin(latinInput),
    [latinInput],
  );

  useEffect(() => {
    arabicInputRef.current?.focus();
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="reveal mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Arabic & Urdu Font Generator" },
          ]}
        />
      </div>

      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="article-h1 reveal mb-2">
          Arabic &amp; Urdu Font Generator — Stylish Text Copy Paste
        </h1>
        <p
          dir="rtl"
          lang="ur"
          className="reveal reveal-delay-1 mb-6 text-center text-lg text-[var(--neon-lime)] sm:text-xl"
        >
          اردو اسٹائلش فونٹ جنریٹر | عربی فونٹ جنریٹر
        </p>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          This <strong>Arabic font generator</strong> turns any Arabic or Urdu
          word or name into fancy Unicode text you can copy paste in seconds.
          It doubles as a <strong>Urdu stylish name maker</strong>, wrapping
          your text in RTL-aware borders so nothing looks reversed. Style names
          and status for WhatsApp and Instagram, or romanise your name in fancy
          Latin fonts — all instant, all free, copy paste on any device. Need
          another language? Try our{" "}
          <Link href="/hindi-stylish-fonts-generator" className="intro-link">
            Hindi stylish fonts
          </Link>{" "}
          page, or the all-in-one{" "}
          <Link href="/" className="intro-link">
            stylish name generator
          </Link>
          .
        </p>

        <figure className="article-figure reveal reveal-delay-2 w-full">
          <Image
            src="/arabic-urdu-hindi-stylish-text-comparison.png"
            alt="Stylish Arabic and Urdu text shared on WhatsApp next to a Hindi stylish status — ꧂ اپنے انداز میں جیتے ہیں ꧁ — showing the same decorated Unicode borders rendering correctly in right-to-left script."
            width={1024}
            height={806}
            sizes="(max-width: 1024px) 100vw, 960px"
            className="article-figure__img h-auto w-full"
          />
          <figcaption className="article-figure__caption">
            The same decorated borders work across scripts — an Urdu stylish
            status (right-to-left) beside a Hindi one — pasted straight into
            WhatsApp with the order preserved.
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="how-to-heading"
        className="article-content reveal reveal-delay-3 mb-14"
      >
        <h2 id="how-to-heading" className="article-heading">
          How to Use Arabic and Urdu Stylish Fonts
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-[var(--cream-muted)]">
          <li>
            Type your Arabic or Urdu word or name, or pick a ready-made status
            below
          </li>
          <li>Tap the Copy button next to any style you like</li>
          <li>
            Paste into WhatsApp, Instagram, Facebook — or tap the WhatsApp
            button to share instantly
          </li>
        </ol>
      </section>

      <section
        aria-labelledby="font-styles-heading"
        className="tool-section reveal reveal-delay-4 mb-14"
      >
        <h2 id="font-styles-heading" className="article-heading mb-6">
          Arabic Font Styles — Browse &amp; Copy
        </h2>

        <h3 className="article-subheading mb-2">Decorated Arabic/Urdu text</h3>
        <p className="tool-instruction mb-4 text-sm leading-relaxed">
          Type a name in Arabic/Urdu script <em>or</em> in English — English
          names are converted to Arabic script automatically (e.g. Manish →{" "}
          <span dir="rtl" lang="ur">
            مانیش
          </span>
          ), then every decorated style updates instantly. The input switches to
          right-to-left automatically and the borders are mirrored for RTL (꧂
          متن ꧁) so your text always reads correctly.
        </p>

        <div className="mb-6">
          <label htmlFor="arabic-decorated-input" className="sr-only">
            Enter Arabic or Urdu text for decorated styles
          </label>
          <input
            ref={arabicInputRef}
            id="arabic-decorated-input"
            type="text"
            dir="auto"
            lang="ur"
            value={arabicInput}
            onChange={(e) => setArabicInput(e.target.value.slice(0, 40))}
            placeholder="نام لکھیں or type in English — e.g. رحیم / Rahim"
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
              rtl
            />
          ))}
        </div>

        <h3 className="article-subheading mb-2">
          Type your name in English — اپنا نام انگریزی میں لکھیں
        </h3>
        <p className="tool-instruction mb-4 text-sm leading-relaxed">
          Write your Urdu or Arabic name in English (e.g. Rahim, Ayesha) and see
          it in 8 fancy Latin Unicode styles — ideal for bios and captions where
          you romanise your name.
        </p>

        <div className="mb-6">
          <label htmlFor="arabic-latin-input" className="sr-only">
            Enter your name in English for fancy Latin fonts
          </label>
          <input
            id="arabic-latin-input"
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
      </section>

      <section
        aria-labelledby="urdu-maker-heading"
        className="tool-section reveal reveal-delay-4 mb-14"
      >
        <h2 id="urdu-maker-heading" className="article-heading mb-3">
          Urdu Stylish Name Maker — اردو نام
        </h2>
        <p className="tool-instruction mb-8 text-sm leading-relaxed">
          Ready-to-use Urdu WhatsApp status, pre-styled Urdu names, and elegant
          Arabic phrases. Tap Copy to grab the text, or the green{" "}
          <span className="text-[#25d366]">WhatsApp</span> button to share it
          straight to your status. Every snippet is RTL-aware, so Arabic and
          Urdu text reads correctly inside the borders.
        </p>

        <figure className="article-figure mb-10 w-full">
          <Image
            src="/arabic-urdu-stylish-font-whatsapp-status.png"
            alt="A stylish Urdu WhatsApp status — ꧂ اپنے انداز میں جیتے ہیں ꧁ — sent in a chat, showing the decorated right-to-left text and mirrored borders displaying perfectly from the Arabic and Urdu font generator."
            width={1024}
            height={754}
            sizes="(max-width: 1024px) 100vw, 960px"
            className="article-figure__img h-auto w-full"
          />
          <figcaption className="article-figure__caption">
            Tap Copy or the green WhatsApp button on any card and your decorated
            Urdu status pastes into the chat exactly as shown — right-to-left and
            ready to send.
          </figcaption>
        </figure>

        {ARABIC_PREMADE_CATEGORIES.map((category) => (
          <div key={category.id} className="mb-10 last:mb-0">
            <h3 className="article-subheading mb-2">{category.title}</h3>
            <p className="tool-instruction mb-4 text-sm leading-relaxed">
              {category.description}
            </p>
            <div className="results-grid grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
              {category.items.map((item, index) => (
                <PremadeCard key={item.id} text={item.text} index={index} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <ArabicRenderingSection />
      <ArabicBidiSection />
      <ArabicCalligraphySection />
      <ArabicMythsSection />
      <ArabicAdvancedSection />

      <section
        aria-labelledby="faq-heading"
        className="article-content article-faq reveal reveal-delay-4 mb-14"
      >
        <h2 id="faq-heading" className="article-heading">
          Frequently Asked Questions About Arabic and Urdu Fonts
        </h2>
        <dl className="space-y-6">
          {ARABIC_FAQ_ITEMS.map((item) => (
            <div key={item.question} className="faq-item">
              <dt className="mb-2">{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-[var(--cream-faint)]">
          More font tools:{" "}
          <Link href="/stylish-marathi-fonts" className="intro-link">
            stylish Marathi fonts
          </Link>
          {" · "}
          <Link href="/instagram-stylish-fonts" className="intro-link">
            Instagram stylish fonts
          </Link>
          {" · "}
          <Link href="/facebook-stylish-name-generator" className="intro-link">
            Facebook stylish name generator
          </Link>
        </p>
      </section>

      <div className="reveal reveal-delay-5 mt-12">
        <RelatedTools tools={[...ARABIC_RELATED_TOOLS]} />
      </div>
    </main>
  );
}
