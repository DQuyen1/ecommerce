import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  /** Stagger offset — pass the running word count so several runs flow as one line. */
  start?: number;
  className?: string;
}

/**
 * Renders text one word at a time so each can rise into place on its own beat.
 * The animation itself lives on `.split-word` in the stylesheet, which also
 * flattens it under `prefers-reduced-motion`.
 */
export function SplitText({ text, start = 0, className }: SplitTextProps) {
  return (
    <>
      {text
        .trim()
        .split(/\s+/)
        .map((word, index) => (
          <span
            key={`${index}-${word}`}
            className={`split-word${className ? ` ${className}` : ""}`}
            style={{ "--w": start + index } as CSSProperties}
          >
            {word}
          </span>
        ))}
    </>
  );
}
