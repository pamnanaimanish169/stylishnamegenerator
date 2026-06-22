"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  InstagramCharCountSection,
  InstagramCreatorWorkflowSection,
  InstagramFontsBreakSection,
  InstagramMythsSection,
  InstagramUnicodeStackingSection,
} from "@/components/InstagramExpertArticle";
import Breadcrumb from "@/components/Breadcrumb";
import InstagramFontGenerator from "@/components/InstagramFontGenerator";
import RelatedTools from "@/components/RelatedTools";
import {
  FAQ_ITEMS,
  IG_RELATED_TOOLS,
  INSTAGRAM_BIO_TEMPLATES,
  INSTAGRAM_EMOJI_CATEGORIES,
  WHATSAPP_SHARE_TEXT,
} from "@/lib/instagramPageData";
import { SITE_URL } from "@/lib/site";

function CopyButton({
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
      aria-label="Copy bio template"
    >
      <span className="converted-name min-w-0 whitespace-pre-wrap text-base">
        {children}
      </span>
      <span
        className={`copy-btn shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${copied ? "copy-btn--success" : ""}`}
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

function EmojiChip({ char }: { char: string }) {
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
      aria-label={`Copy ${char}`}
      title={copied ? "Copied!" : `Copy ${char}`}
    >
      {copied ? "✓" : char}
    </button>
  );
}

const WHATSAPP_SHARE_URL = `https://wa.me/?text=${encodeURIComponent(`${WHATSAPP_SHARE_TEXT} ${SITE_URL}/instagram-stylish-fonts`)}`;

export default function InstagramStylishFontsContent() {
  const [emojiSearch, setEmojiSearch] = useState("");

  const filteredEmojiCategories = useMemo(() => {
    const query = emojiSearch.trim().toLowerCase();
    if (!query) return INSTAGRAM_EMOJI_CATEGORIES;

    return INSTAGRAM_EMOJI_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.char.includes(query) ||
          item.keywords.some((kw) => kw.includes(query)),
      ),
    })).filter((category) => category.items.length > 0);
  }, [emojiSearch]);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="reveal mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Instagram Stylish Fonts" },
          ]}
        />
      </div>

      <div className="reveal mb-4 flex flex-wrap items-center gap-2">
        <span className="hero-badge inline-block rounded-full px-3 py-1">
          Instagram · Bio · Caption · Copy Paste
        </span>
      </div>

      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="article-h1 reveal reveal-delay-1 mb-6">
          Instagram Stylish Fonts &amp; Bio Generator
        </h1>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          <strong>Instagram stylish fonts</strong> let you stand out with fancy
          Unicode text you can <strong>copy paste</strong> straight into your
          profile — no app install needed. Type any word below to get instant{" "}
          <strong>Instagram bio</strong> styles, stylish captions, or display
          name ideas using the same <strong>instagram font</strong> trick
          creators use every day. Also try our{" "}
          <Link href="/" className="intro-link">
            stylish name generator
          </Link>{" "}
          for all platforms, or the{" "}
          <Link href="/freestyle-nickname-generator" className="intro-link">
            freestyle nickname generator
          </Link>{" "}
          for gaming and chat apps.
        </p>

        <div className="reveal reveal-delay-3 mb-14">
          <InstagramFontGenerator />
        </div>
      </section>

      <section
        aria-labelledby="how-to-heading"
        className="article-content reveal reveal-delay-4 mb-14"
      >
        <h2 id="how-to-heading" className="article-heading">
          How to Use Stylish Fonts on Instagram
        </h2>
        <p>
          Instagram does not have a built-in font picker, but it fully supports
          Unicode characters — the same technology behind fancy text on every
          social platform. Generate your style above, copy the result, then open
          Instagram and go to <strong>Edit Profile</strong>. Tap the bio or name
          field, long-press, and select Paste. Your styled text appears instantly
          on both iOS and Android.
        </p>
        <p>
          For multiline bios, type each line in the generator or use a pre-made
          template below. <strong>Feed post captions</strong> accept pasted
          Unicode fonts the same way. Instagram&apos;s <strong>Story text
          sticker</strong> re-renders pasted text with its own fonts — fancy
          Unicode pasted into Story overlays usually won&apos;t keep the style.
        </p>
        <Image
          src="/instagram-stylish-fonts-bio-generator.svg"
          alt="Instagram stylish fonts generator showing fancy Unicode bio text and emoji for Instagram profile"
          width={640}
          height={400}
          sizes="(max-width: 768px) 100vw, 640px"
          className="mt-6 w-full max-w-2xl rounded-xl border border-[var(--border)]"
        />
      </section>

      <InstagramFontsBreakSection />
      <InstagramCharCountSection />

      <section
        aria-labelledby="bio-templates-heading"
        className="tool-section reveal reveal-delay-4 mb-14"
      >
        <h2 id="bio-templates-heading" className="article-heading mb-4">
          Instagram Bio Templates — Copy Paste Ready
        </h2>
        <p className="tool-instruction mb-6 text-sm leading-relaxed">
          Ready-made <strong>instagram bio copy and paste stylish</strong>{" "}
          templates in fancy Unicode fonts. Tap any card to copy the full bio
          with line breaks intact — paste directly into Instagram&apos;s bio
          field.
        </p>

        {INSTAGRAM_BIO_TEMPLATES.map((category, index) => (
          <div
            key={category.title}
            className={
              index > 0
                ? "mt-8 border-t border-[var(--border)] pt-8"
                : undefined
            }
          >
            <h3 className="article-subheading">{category.title}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {category.templates.map((template) => (
                <CopyButton key={template.text} text={template.text}>
                  {template.preview}
                </CopyButton>
              ))}
            </div>
          </div>
        ))}

        <p className="mt-8 text-center text-sm text-[var(--cream-muted)]">
          Found these useful? Share with a friend 👇{" "}
          <a
            href={WHATSAPP_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="intro-link"
          >
            Share on WhatsApp
          </a>
        </p>
      </section>

      <section
        aria-labelledby="emoji-heading"
        className="article-content reveal reveal-delay-4 mb-14"
      >
        <h2 id="emoji-heading" className="article-heading">
          Instagram Bio Emojis &amp; Symbols
        </h2>
        <p>
          Build the perfect bio with <strong>instagram bio emoji copy and paste</strong>{" "}
          symbols. Click any emoji or character below to copy it — then paste
          into your Instagram bio alongside stylish fonts from the generator
          above.
        </p>

        <div className="mt-4">
          <label htmlFor="emoji-search" className="sr-only">
            Search emojis and symbols
          </label>
          <input
            id="emoji-search"
            type="search"
            value={emojiSearch}
            onChange={(e) => setEmojiSearch(e.target.value)}
            placeholder="Search — try heart, star, flower..."
            className="name-input w-full rounded-xl px-4 py-3 text-base"
          />
        </div>

        {filteredEmojiCategories.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--cream-faint)]">
            No emojis match your search. Try &ldquo;heart&rdquo; or
            &ldquo;star&rdquo;.
          </p>
        ) : (
          filteredEmojiCategories.map((category) => (
            <div key={category.title} className="mt-8">
              <h3 className="article-subheading">{category.title}</h3>
              <div
                className="symbol-picker__grid"
                role="group"
                aria-label={category.title}
              >
                {category.items.map((item) => (
                  <EmojiChip key={item.char} char={item.char} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      <InstagramMythsSection />
      <InstagramCreatorWorkflowSection />
      <InstagramUnicodeStackingSection />

      <section
        aria-labelledby="faq-heading"
        className="article-content article-faq reveal reveal-delay-4 mb-14"
      >
        <h2 id="faq-heading" className="article-heading">
          Frequently Asked Questions About Instagram Fonts
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
          <Link href="/hindi-stylish-fonts-generator" className="intro-link">
            Hindi stylish fonts
          </Link>
          {" · "}
          <Link
            href="/facebook-stylish-name-generator"
            className="intro-link"
          >
            Facebook stylish name
          </Link>
        </p>
      </section>

      <div className="reveal reveal-delay-5 mt-12">
        <RelatedTools tools={[...IG_RELATED_TOOLS]} />
      </div>
    </main>
  );
}
