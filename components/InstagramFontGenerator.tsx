"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateInstagramAll,
  type FontStyleResult,
} from "@/lib/fontStyles";

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <p className="converted-name min-w-0 whitespace-pre-wrap">{style.text}</p>
        <CopyButton text={style.text} />
      </div>
    </article>
  );
}

export default function InstagramFontGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<FontStyleResult[]>(() =>
    generateInstagramAll(""),
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runGenerate = useCallback((value: string) => {
    setResults(generateInstagramAll(value));
  }, []);

  const handleInput = (value: string) => {
    setInput(value);
    runGenerate(value);
  };

  return (
    <section
      className="tool-section w-full"
      aria-label="Instagram stylish fonts generator"
    >
      <div className="mb-6 flex flex-col gap-3">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Type your bio, caption, or name here..."
          rows={3}
          className="name-input min-h-[5.5rem] w-full resize-y rounded-xl px-4 py-3 text-base leading-relaxed"
          aria-label="Enter text for Instagram stylish fonts"
        />
        <button
          type="button"
          onClick={() => runGenerate(input)}
          className="generate-btn min-h-12 w-full rounded-xl px-8 text-sm font-semibold transition-all active:scale-95 sm:w-auto sm:self-start"
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
