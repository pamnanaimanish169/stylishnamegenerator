"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyFreestyleStyleById,
  generateFreestyleAll,
  type FontStyleResult,
} from "@/lib/fontStyles";
import { FREESTYLE_SURPRISE_BASE_NAMES } from "@/lib/freestyleCuratedNames";
import { FREESTYLE_VIBE_BUCKETS } from "@/lib/freestyleVibeBuckets";

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

function VibeBucketSection({
  bucket,
  resultsById,
  hiddenOnMobile,
  isActiveTab,
}: {
  bucket: (typeof FREESTYLE_VIBE_BUCKETS)[number];
  resultsById: Map<string, FontStyleResult>;
  hiddenOnMobile: boolean;
  isActiveTab: boolean;
}) {
  const styles = bucket.styleIds
    .map((id) => resultsById.get(id))
    .filter((style): style is FontStyleResult => Boolean(style));

  return (
    <div
      className={`vibe-bucket ${hiddenOnMobile ? "vibe-bucket--hidden-mobile" : ""} ${isActiveTab ? "vibe-bucket--active-mobile" : ""}`}
      data-vibe={bucket.id}
    >
      <h3 className="vibe-bucket__heading">
        <span aria-hidden="true">{bucket.emoji}</span> {bucket.label}
      </h3>
      <p className="vibe-bucket__desc">{bucket.description}</p>
      <div className="results-grid grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
        {styles.map((style, index) => (
          <StyleCard key={style.id} style={style} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function FreestyleNicknameGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<FontStyleResult[]>(() =>
    generateFreestyleAll(""),
  );
  const [activeTab, setActiveTab] = useState(FREESTYLE_VIBE_BUCKETS[0]!.id);
  const [surpriseResult, setSurpriseResult] = useState<FontStyleResult | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const surpriseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runGenerate = useCallback((value: string) => {
    setResults(generateFreestyleAll(value));
    setSurpriseResult(null);
  }, []);

  const handleInput = (value: string) => {
    const trimmed = value.slice(0, 30);
    setInput(trimmed);
    runGenerate(trimmed);
  };

  const handleSurprise = () => {
    const baseName =
      FREESTYLE_SURPRISE_BASE_NAMES[
        Math.floor(Math.random() * FREESTYLE_SURPRISE_BASE_NAMES.length)
      ]!;
    const allStyleIds = FREESTYLE_VIBE_BUCKETS.flatMap((b) => b.styleIds);
    const randomStyleId =
      allStyleIds[Math.floor(Math.random() * allStyleIds.length)]!;

    const styled = applyFreestyleStyleById(baseName, randomStyleId);
    if (!styled) return;

    setInput(baseName);
    setResults(generateFreestyleAll(baseName));
    setSurpriseResult(styled);

    const bucket = FREESTYLE_VIBE_BUCKETS.find((b) =>
      b.styleIds.includes(randomStyleId),
    );
    if (bucket) setActiveTab(bucket.id);

    requestAnimationFrame(() => {
      surpriseRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const resultsById = new Map(results.map((style) => [style.id, style]));

  return (
    <section
      id="nickname-tool"
      className="tool-section w-full"
      aria-label="Freestyle nickname generator tool"
    >
      <p className="tool-instruction mb-4 text-sm leading-relaxed">
        Type any nickname below — this <strong>fancy nickname generator</strong>{" "}
        has no character limit, so go as creative as you like. Pick a vibe,
        copy your favourite style, and paste it anywhere.
      </p>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Type your nickname here..."
          maxLength={30}
          className="name-input min-h-12 flex-1 rounded-xl px-4 text-base"
          aria-label="Enter your nickname"
        />
        <button
          type="button"
          onClick={() => runGenerate(input)}
          className="generate-btn min-h-12 rounded-xl px-8 text-sm font-semibold transition-all active:scale-95 sm:shrink-0"
        >
          Generate
        </button>
        <button
          type="button"
          onClick={handleSurprise}
          className="surprise-btn min-h-12 rounded-xl px-8 text-sm font-semibold transition-all active:scale-95 sm:shrink-0"
        >
          Surprise me ✨
        </button>
      </div>

      {surpriseResult && (
        <div
          ref={surpriseRef}
          className="surprise-result mb-6 rounded-xl p-4 sm:p-5"
          role="status"
        >
          <p className="surprise-result__label">Your random freestyle nickname</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="converted-name min-w-0">{surpriseResult.text}</p>
            <CopyButton text={surpriseResult.text} />
          </div>
          <p className="surprise-result__meta">
            {surpriseResult.name} style applied to &ldquo;{input || "YourName"}&rdquo;
          </p>
        </div>
      )}

      <div
        className="vibe-tabs md:hidden"
        role="tablist"
        aria-label="Nickname vibe categories"
      >
        {FREESTYLE_VIBE_BUCKETS.map((bucket) => (
          <button
            key={bucket.id}
            type="button"
            role="tab"
            aria-selected={activeTab === bucket.id}
            className={`vibe-tabs__btn ${activeTab === bucket.id ? "vibe-tabs__btn--active" : ""}`}
            onClick={() => setActiveTab(bucket.id)}
          >
            <span aria-hidden="true">{bucket.emoji}</span> {bucket.label}
          </button>
        ))}
      </div>

      <div className="vibe-buckets mt-4">
        {FREESTYLE_VIBE_BUCKETS.map((bucket) => (
          <VibeBucketSection
            key={bucket.id}
            bucket={bucket}
            resultsById={resultsById}
            hiddenOnMobile={activeTab !== bucket.id}
            isActiveTab={activeTab === bucket.id}
          />
        ))}
      </div>
    </section>
  );
}
