"use client";

import { useCallback, useEffect, useRef, useState } from "react";
type CuratedNameCategory = {
  title: string;
  names: string[];
};

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
      className={`copy-btn curated-name-grid__copy min-h-9 shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all active:scale-95 ${copied ? "copy-btn--success" : ""}`}
      aria-label={`Copy ${text}`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

export default function CuratedNameGrid({
  categories,
  toolAnchorId,
}: {
  categories: CuratedNameCategory[];
  toolAnchorId?: string;
}) {
  return (
    <div className="curated-name-grid">
      {categories.map((category) => (
        <div key={category.title} className="curated-name-grid__category">
          <h3 className="curated-name-grid__subtitle">{category.title}</h3>
          {toolAnchorId && (
            <p className="curated-name-grid__cta">
              <a href={`#${toolAnchorId}`} className="intro-link">
                Generate your own version ↑
              </a>
            </p>
          )}
          <ul className="curated-name-grid__list">
            {category.names.map((name) => (
              <li key={name} className="curated-name-grid__item">
                <span className="curated-name-grid__name">{name}</span>
                <CopyButton text={name} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
