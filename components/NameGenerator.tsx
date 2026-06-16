"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { generateAll, type FontStyleResult } from "@/lib/fontStyles";

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

export default function NameGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<FontStyleResult[]>(() =>
    generateAll(""),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runGenerate = useCallback((value: string) => {
    setResults(generateAll(value));
  }, []);

  const handleInput = (value: string) => {
    const trimmed = value.slice(0, 30);
    setInput(trimmed);
    runGenerate(trimmed);
  };

  return (
    <section
      className="tool-section w-full"
      aria-label="Stylish name generator tool"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Type your name here..."
          maxLength={30}
          className="name-input min-h-12 flex-1 rounded-xl px-4 text-base"
          aria-label="Enter your name"
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
  );
}
