import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Nothing to animate when the observer API is missing. Deliberately does
 * NOT check `prefersReducedMotion()` — a scroll-triggered fade is a one-shot,
 * low-amplitude entrance, not the kind of continuous motion that preference
 * exists to suppress. See the reduced-motion block in index.css for the
 * animations that do respect it.
 */
function showImmediately(): boolean {
  return typeof IntersectionObserver === "undefined";
}

/**
 * Adds `is-visible` once the element scrolls into view, so `.reveal` in the
 * stylesheet can animate it. Reveals only once — content never fades back out.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(showImmediately);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, visible]);

  return { ref, visible };
}

/** Counts from 0 up to `target` once the element is on screen. */
export function useCountUp(target: number, duration = 1600) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutQuart — fast start, gentle landing
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, target, duration]);

  return { ref, value };
}
