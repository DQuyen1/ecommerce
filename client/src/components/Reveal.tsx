import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  /** Stagger position — each step delays the animation by 80ms. */
  index?: number;
  variant?: "up" | "scale" | "left";
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const VARIANTS = {
  up: "",
  scale: " reveal-scale",
  left: " reveal-left",
};

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({
  children,
  index = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal${VARIANTS[variant]}${visible ? " is-visible" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={{ ...style, "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
