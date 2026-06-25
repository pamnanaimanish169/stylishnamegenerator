"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FacebookBioTypographySection,
  FacebookCrossPlatformSection,
  FacebookMessengerGapSection,
  FacebookMythsSection,
  FacebookRejectionPatternsSection,
} from "@/components/FacebookExpertArticle";
import Breadcrumb from "@/components/Breadcrumb";
import FacebookFontGenerator from "@/components/FacebookFontGenerator";
import RelatedTools from "@/components/RelatedTools";
import {
  FACEBOOK_BIO_TEMPLATES,
  FAQ_ITEMS,
  FB_RELATED_TOOLS,
} from "@/lib/facebookPageData";

const OG_IMAGE = "/facebook-stylish-name-generator-fb-fonts.svg";

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

export default function FacebookStylishNameContent() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="reveal mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Facebook Stylish Name Generator" },
          ]}
        />
      </div>

      <div className="reveal mb-4 flex flex-wrap items-center gap-2">
        <span className="hero-badge inline-block rounded-full px-3 py-1">
          Facebook · FB Name · Copy Paste
        </span>
      </div>

      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="article-h1 reveal reveal-delay-1 mb-6">
          Facebook Stylish Name Generator — FB Fancy Fonts
        </h1>

        <p className="intro-text reveal reveal-delay-2 mb-8 max-w-3xl">
          Our <strong>Facebook stylish name generator</strong> turns any name
          into fancy Unicode fonts you can <strong>copy paste</strong> straight
          into your FB profile — no app needed. Use this{" "}
          <strong>FB stylish name maker</strong> to preview{" "}
          <strong>fancy Facebook fonts</strong> tested for compatibility before
          you change your display name. Also try our{" "}
          <Link href="/" className="intro-link">
            stylish name generator
          </Link>{" "}
          for all platforms, or{" "}
          <Link href="/instagram-stylish-fonts" className="intro-link">
            Instagram stylish fonts
          </Link>{" "}
          for bio and caption styles.
        </p>

        <div className="reveal reveal-delay-3 mb-14">
          <FacebookFontGenerator />
        </div>
      </section>

      <section
        aria-labelledby="how-to-heading"
        className="article-content reveal reveal-delay-4 mb-14"
      >
        <h2 id="how-to-heading" className="article-heading">
          How to Change Your Facebook Name to a Stylish Font
        </h2>
        <p>
          Facebook does not have a built-in fancy font picker, but it accepts
          Unicode characters in display names. Generate your style above, copy
          the result, then open Facebook and go to{" "}
          <strong>Settings &amp; privacy → Settings → Personal details →
          Name</strong>. Tap your current name, paste the styled text into the
          First name or Last name field, and save. The same text works in
          Messenger on any device.
        </p>
        <p>
          For status updates and bio text, paste styled fonts directly into the
          post composer or About section — no character limit like the 50-character
          name field. Pick a style marked{" "}
          <strong>✅ Works on Facebook</strong> for the most reliable results
          across web and mobile.
        </p>
        <Image
          src={OG_IMAGE}
          alt="Facebook stylish name generator showing fancy Unicode fonts for FB profile name — copy paste ready"
          width={640}
          height={400}
          sizes="(max-width: 768px) 100vw, 640px"
          className="mt-6 w-full max-w-2xl rounded-xl border border-[var(--border)]"
        />
      </section>

      <section
        aria-labelledby="compat-heading"
        className="article-content reveal reveal-delay-4 mb-14"
      >
        <h2 id="compat-heading" className="article-heading">
          Facebook-Compatible Font Styles
        </h2>
        <p>
          Facebook&apos;s web and app rendering strips or mangles certain
          Unicode styles that work fine on Instagram or in games. Heavily
          combining-character styles like strikethrough and underline can look
          broken in Facebook&apos;s name field, and some Mathematical Unicode
          blocks do not render in older Android Facebook app versions. Styles
          marked <strong>✅ Works on Facebook</strong> are tested to render
          correctly; <strong>⚠️ May vary</strong> styles work on web but can
          show as boxes on some mobile apps. Each font card in the{" "}
          <strong>facebook stylish name generator</strong> above is labelled
          so you know what to expect before you paste.
        </p>
      </section>

      <FacebookRejectionPatternsSection />
      <FacebookMessengerGapSection />

      <section
        aria-labelledby="bio-templates-heading"
        className="tool-section reveal reveal-delay-4 mb-14"
      >
        <h2 id="bio-templates-heading" className="article-heading mb-4">
          Stylish Facebook Bio &amp; Status Text
        </h2>
        <p className="tool-instruction mb-6 text-sm leading-relaxed">
          Ready-made status and bio templates in fancy Unicode fonts. Tap any
          card to copy the full text with line breaks intact — paste directly
          into your Facebook status, bio, or Messenger chat.
        </p>

        {FACEBOOK_BIO_TEMPLATES.map((category, index) => (
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
      </section>

      <FacebookBioTypographySection />
      <FacebookMythsSection />
      <FacebookCrossPlatformSection />

      <section
        aria-labelledby="faq-heading"
        className="article-content article-faq reveal reveal-delay-4 mb-14"
      >
        <h2 id="faq-heading" className="article-heading">
          Frequently Asked Questions About Facebook Stylish Names
        </h2>
        <dl className="space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="faq-item">
              <dt className="mb-2">{item.question}</dt>
              <dd>
                {item.question ===
                "Can I use these fonts for my Facebook status and bio too?" ? (
                  <>
                    Yes. All fonts on this page paste into Facebook status
                    updates, bio text, comments, and Messenger chats — not just
                    your display name. Status and bio fields have no strict
                    character limit like the 50-character name field, so you can
                    use longer styled text or copy one of our ready-made bio
                    templates above. For Instagram-specific bio styles, try our{" "}
                    <Link
                      href="/instagram-stylish-fonts"
                      className="intro-link"
                    >
                      Instagram stylish fonts
                    </Link>{" "}
                    page. For gaming nicknames, use the{" "}
                    <Link
                      href="/freestyle-nickname-generator"
                      className="intro-link"
                    >
                      freestyle nickname generator
                    </Link>
                    .
                  </>
                ) : item.question ===
                  "How do I change my FB name to a stylish font?" ? (
                  <>
                    Type your name in the{" "}
                    <strong>FB stylish name generator</strong> above, pick a
                    style marked with a green checkmark, and tap Copy. Open
                    Facebook → tap your profile picture → Settings &amp; privacy
                    → Settings → Personal details → Name. Tap your name, paste
                    the styled text into the First name or Last name field, and
                    save. The same styled text works in Messenger. If Facebook
                    rejects the name, try Cursive Script or Sans Bold — the most
                    reliable on all devices.
                  </>
                ) : (
                  item.answer
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-[var(--cream-faint)]">
          More font tools:{" "}
          <Link href="/hindi-stylish-fonts-generator" className="intro-link">
            Hindi stylish fonts
          </Link>
          {" · "}
          <Link href="/arabic-font-generator" className="intro-link">
            Urdu stylish name maker
          </Link>
        </p>
      </section>

      <div className="reveal reveal-delay-5 mt-12">
        <RelatedTools tools={[...FB_RELATED_TOOLS]} />
      </div>
    </main>
  );
}
