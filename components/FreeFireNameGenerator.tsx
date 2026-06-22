"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateFreeFireAll,
  type FreeFireStyleResult,
} from "@/lib/fontStyles";
import {
  FREE_FIRE_NAME_LIMIT,
  FREE_FIRE_SYMBOLS,
} from "@/lib/freeFireSymbols";

const FF_APPLY_STEPS = [
  {
    text: (
      <>
        Open <strong>Profile</strong> from the lobby, then tap the yellow{" "}
        <strong>edit icon</strong> (pencil and notebook) in the bottom-right
        corner of your player info card.
      </>
    ),
    image: "/free-fire/step-1-profile.png",
    alt: "Free Fire profile screen with the edit icon highlighted on the player info card",
  },
  {
    text: (
      <>
        In the <strong>PLAYER INFO</strong> window, select the{" "}
        <strong>BASIC</strong> tab, then tap the <strong>pencil icon</strong>{" "}
        next to your current nickname.
      </>
    ),
    image: "/free-fire/step-2-player-info.png",
    alt: "Free Fire Player Info screen with the Basic tab and nickname edit button highlighted",
  },
  {
    text: (
      <>
        Paste your copied <strong>stylish Free Fire name</strong> into the
        nickname field, check the preview for boxes or truncation, then tap{" "}
        <strong>CONFIRM</strong> to use a Name Change Card or pay diamonds to
        finalize.
      </>
    ),
    image: "/free-fire/step-3-change-nickname.png",
    alt: "Free Fire Change Nickname dialog with the input field and Confirm button",
  },
] as const;

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
  style,
  index,
}: {
  style: FreeFireStyleResult;
  index: number;
}) {
  const overLimit = [...style.text].length > FREE_FIRE_NAME_LIMIT;

  return (
    <article
      className="style-card flex flex-col gap-3 rounded-xl p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="style-label">{style.name}</span>
        <span
          className={`style-compat-badge ${style.ffCompatible ? "style-compat-badge--ok" : "style-compat-badge--warn"}`}
        >
          {style.ffCompatible ? "✓ Works in FF" : "⚠️ May not render"}
        </span>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="converted-name min-w-0">{style.text}</p>
        <CopyButton text={style.text} />
      </div>
      {overLimit && (
        <p className="char-limit-warning" role="status">
          This style may exceed Free Fire&apos;s character limit.
        </p>
      )}
    </article>
  );
}

function FreeFirePreview({ previewText }: { previewText: string }) {
  const display = previewText.trim() || "YourName";

  return (
    <div className="bgmi-preview" aria-label="Free Fire name preview mockup">
      <div className="bgmi-preview__phone">
        <div className="bgmi-preview__notch" aria-hidden="true" />
        <div className="bgmi-preview__screen">
          <span className="bgmi-preview__label">Profile Name</span>
          <p className="bgmi-preview__name">{display}</p>
        </div>
      </div>
      <p className="bgmi-preview__caption">Free Fire Preview</p>
    </div>
  );
}

export default function FreeFireNameGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<FreeFireStyleResult[]>(() =>
    generateFreeFireAll(""),
  );
  const [previewStyle, setPreviewStyle] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runGenerate = useCallback((value: string) => {
    setResults(generateFreeFireAll(value));
    setPreviewStyle(0);
  }, []);

  const handleInput = (value: string) => {
    const trimmed = value.slice(0, 30);
    setInput(trimmed);
    runGenerate(trimmed);
  };

  const insertSymbol = (symbol: string) => {
    const el = inputRef.current;
    if (!el) return;

    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    const next = `${input.slice(0, start)}${symbol}${input.slice(end)}`.slice(
      0,
      30,
    );

    setInput(next);
    runGenerate(next);

    requestAnimationFrame(() => {
      const pos = start + symbol.length;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  const inputLength = [...input].length;
  const previewText = results[previewStyle]?.text ?? (input || "YourName");

  return (
    <>
    <section
      className="tool-section w-full"
      aria-label="Free Fire name generator tool"
    >
      <p className="tool-instruction mb-2 text-sm leading-relaxed">
        Type your nickname below, tap symbols to decorate, then copy paste your
        favourite style into Free Fire or Free Fire MAX — both use the same name
        system.
      </p>
      <p className="tool-instruction mb-4 text-sm leading-relaxed">
        This <strong>Free Fire stylish name maker</strong> filters fonts for
        the in-game name field. Styles marked{" "}
        <strong>✓ Works in FF</strong> are safe to paste;{" "}
        <strong>⚠️ May not render</strong> styles are experimental.
      </p>

      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Type your Free Fire name..."
              maxLength={30}
              className="name-input min-h-12 flex-1 rounded-xl px-4 text-base"
              aria-label="Enter your Free Fire name"
            />
            <button
              type="button"
              onClick={() => runGenerate(input)}
              className="generate-btn min-h-12 rounded-xl px-8 text-sm font-semibold transition-all active:scale-95 sm:shrink-0"
            >
              Generate
            </button>
          </div>

          <div
            className={`char-counter ${inputLength > FREE_FIRE_NAME_LIMIT ? "char-counter--warn" : ""}`}
            aria-live="polite"
          >
            {inputLength} / {FREE_FIRE_NAME_LIMIT} characters
            {inputLength > FREE_FIRE_NAME_LIMIT && (
              <span className="char-counter__note">
                — raw input exceeds Free Fire limit
              </span>
            )}
          </div>

          <div className="symbol-picker mt-4">
            <p className="symbol-picker__label">Insert symbol at cursor</p>
            <div
              className="symbol-picker__grid"
              role="group"
              aria-label="Free Fire symbols"
            >
              {FREE_FIRE_SYMBOLS.map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  className="symbol-picker__btn"
                  onClick={() => insertSymbol(symbol)}
                  aria-label={`Insert ${symbol}`}
                  title={`Insert ${symbol}`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="results-grid grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
        {results.map((style, index) => (
          <div
            key={style.id}
            onMouseEnter={() => setPreviewStyle(index)}
            onFocus={() => setPreviewStyle(index)}
          >
            <StyleCard style={style} index={index} />
          </div>
        ))}
      </div>
    </section>

    <section
      aria-labelledby="ff-apply-heading"
      className="article-content mt-14"
    >
      <h2 id="ff-apply-heading" className="article-heading">
        How to Apply Your New Name Style in Free Fire
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-[var(--cream-faint)]">
        After you copy a styled name from the generator above, follow these
        in-game steps in Free Fire or Free Fire MAX — both clients use the same
        profile rename flow.
      </p>
      <ol className="how-steps gap-6">
        {FF_APPLY_STEPS.map((step, index) => (
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
    </section>
    </>
  );
}
