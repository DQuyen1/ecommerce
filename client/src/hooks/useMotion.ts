import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./useReveal";

/** Touch devices never hover, so pointer-driven polish is skipped there. */
function isCoarsePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
}

/* Elements that get a cursor-following highlight. Listed here rather than
   wired per-component so every page picks the effect up for free. */
const SPOTLIGHT =
  ".card, .check-list > li, .contact-card, .detail-block, .quote-card, .form-card";

/** Buttons drift a few pixels toward the cursor while it is over them. */
const MAGNET = ".btn";

/**
 * One pointer listener for the whole app. Writes CSS custom properties on the
 * hovered element — `--mx`/`--my` for the highlight, `--pull-x`/`--pull-y` for
 * the magnetic drift — so the stylesheet owns what those values actually do.
 * Mounted once, in `Layout`.
 */
export function usePointerFx() {
  useEffect(() => {
    // No reduced-motion check: this is a brief, low-amplitude, user-driven
    // highlight, not the continuous motion that preference targets.
    if (isCoarsePointer()) return;

    let frame = 0;
    let latest: PointerEvent | null = null;
    const pulled = new Set<HTMLElement>();

    function release(element: HTMLElement) {
      element.style.removeProperty("--pull-x");
      element.style.removeProperty("--pull-y");
      pulled.delete(element);
    }

    function apply() {
      frame = 0;
      const event = latest;
      const target = event?.target;
      if (!event || !(target instanceof Element)) return;

      const spot = target.closest<HTMLElement>(SPOTLIGHT);
      if (spot) {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - box.left}px`);
        spot.style.setProperty("--my", `${event.clientY - box.top}px`);
      }

      const magnet = target.closest<HTMLElement>(MAGNET);
      pulled.forEach((element) => {
        if (element !== magnet) release(element);
      });

      if (magnet) {
        const box = magnet.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        magnet.style.setProperty("--pull-x", `${(dx * 0.16).toFixed(2)}px`);
        magnet.style.setProperty("--pull-y", `${(dy * 0.28).toFixed(2)}px`);
        pulled.add(magnet);
      }
    }

    function onMove(event: PointerEvent) {
      latest = event;
      if (!frame) frame = requestAnimationFrame(apply);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      pulled.forEach(release);
    };
  }, []);
}

/**
 * Tips an element toward the cursor. The listener sits on the nearest section
 * so the artwork reacts to the whole area around it, not just its own box.
 */
export function useTilt<T extends HTMLElement>(max = 9) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || isCoarsePointer()) return;

    const zone = node.closest("section") ?? node;
    let frame = 0;
    let latest: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!latest) return;
      const box = zone.getBoundingClientRect();
      // -0.5..0.5 from the centre of the zone
      const x = (latest.clientX - box.left) / box.width - 0.5;
      const y = (latest.clientY - box.top) / box.height - 0.5;
      node.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`);
      node.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`);
      node.style.setProperty("--tx", `${(x * 18).toFixed(2)}px`);
    };

    const onMove = (event: PointerEvent) => {
      latest = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      node.style.removeProperty("--rx");
      node.style.removeProperty("--ry");
      node.style.removeProperty("--tx");
    };

    zone.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}
