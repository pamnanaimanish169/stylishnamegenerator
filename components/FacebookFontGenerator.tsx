"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FACEBOOK_NAME_LIMIT,
  generateFacebookAll,
  type FacebookCompatLevel,
  type FacebookStyleResult,
} from "@/lib/fontStyles";

const COMPAT_LABELS: Record<
  FacebookCompatLevel,
  { short: string; detail: string; className: string }
> = {
  ok: {
    short: "✅ Works on Facebook",
    detail: "Tested — works on Facebook web and app",
    className: "fb-compat-badge--ok",
  },
  vary: {
    short: "⚠️ May vary",
    detail:
      "Inconsistent — works on web, may appear as boxes on older Android app",
    className: "fb-compat-badge--warn",
  },
};

function CompatBadge({ level }: { level: FacebookCompatLevel }) {
  const [expanded, setExpanded] = useState(false);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const { short, detail, className } = COMPAT_LABELS[level];

  useEffect(() => {
    if (!expanded) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (
        badgeRef.current &&
        !badgeRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [expanded]);

  return (
    <button
      ref={badgeRef}
      type="button"
      className={`fb-compat-badge ${className} ${expanded ? "fb-compat-badge--expanded" : ""}`}
      onClick={() => setExpanded((prev) => !prev)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-expanded={expanded}
      aria-label={`${short}. ${detail}`}
    >
      <span className="fb-compat-badge__short">{short}</span>
      {expanded && (
        <span className="fb-compat-badge__detail" role="tooltip">
          {detail}
        </span>
      )}
    </button>
  );
}

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
  style: FacebookStyleResult;
  index: number;
}) {
  const overLimit = [...style.text].length > FACEBOOK_NAME_LIMIT;

  return (
    <article
      className="style-card style-card--compat relative flex flex-col gap-3 rounded-xl p-4 sm:p-5"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <CompatBadge level={style.fbCompat} />
      <span className="style-label pr-24">{style.name}</span>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <p className="converted-name min-w-0">{style.text}</p>
        <CopyButton text={style.text} />
      </div>
      {overLimit && (
        <p className="char-limit-warning" role="status">
          This style may exceed Facebook&apos;s 50-character name limit.
        </p>
      )}
    </article>
  );
}

export default function FacebookFontGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<FacebookStyleResult[]>(() =>
    generateFacebookAll(""),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runGenerate = useCallback((value: string) => {
    setResults(generateFacebookAll(value));
  }, []);

  const handleInput = (value: string) => {
    const trimmed = value.slice(0, 50);
    setInput(trimmed);
    runGenerate(trimmed);
  };

  const inputLength = [...input].length;

  return (
    <section
      className="tool-section w-full"
      aria-label="FB stylish name maker"
    >
      <p className="tool-instruction mb-4 text-sm leading-relaxed">
        Type your name below to generate fancy Facebook fonts. Each style shows
        a compatibility badge — green means tested on Facebook web and app,
        yellow means it may look different on some devices.
      </p>

      <div className="mb-3 flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Type your Facebook name..."
          maxLength={50}
          className="name-input min-h-12 flex-1 rounded-xl px-4 text-base"
          aria-label="Enter your Facebook name"
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
        className={`char-counter ${inputLength > FACEBOOK_NAME_LIMIT ? "char-counter--warn" : ""}`}
        aria-live="polite"
      >
        {inputLength} / {FACEBOOK_NAME_LIMIT} characters
      </div>

      <p className="tool-disclaimer mt-3 text-xs leading-relaxed text-[var(--cream-faint)]">
        Note: Facebook allows name changes once every 60 days. Some characters
        may not be accepted by Facebook&apos;s name policy.
      </p>

      <div className="results-grid mt-6 grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
        {results.map((style, index) => (
          <StyleCard key={style.id} style={style} index={index} />
        ))}
      </div>
    </section>
  );
}
