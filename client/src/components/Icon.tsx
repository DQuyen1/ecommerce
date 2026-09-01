import type { CSSProperties } from "react";

type IconProps = { className?: string; style?: CSSProperties };

/** Stroke icons on a 24x24 grid — they inherit color and size from CSS. */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function IconArrowRight({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowLeft({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function IconArrowUp({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function IconBox({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </svg>
  );
}

export function IconCarton({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M3 7h18v13H3z" />
      <path d="M3 7 5.5 3h13L21 7M12 7v13M9 11h6" />
    </svg>
  );
}

export function IconRigid({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M4 9h16v11H4z" />
      <path d="M2 5h20v4H2zM10 13h4" />
    </svg>
  );
}

export function IconLayers({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </svg>
  );
}

export function IconShield({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M12 3 5 6v6c0 4.4 3 8.2 7 9 4-.8 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconLeaf({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-5 15-9 15Z" />
      <path d="M4 21c2-5 5-8 9-10" />
    </svg>
  );
}

export function IconGem({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M6 3h12l3 6-9 12L3 9l3-6Z" />
      <path d="M3 9h18M9 3l-3 6 6 12 6-12-3-6" />
    </svg>
  );
}

export function IconSliders({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M4 7h6M14 7h6M4 17h10M18 17h2" />
      <circle cx="12" cy="7" r="2.2" />
      <circle cx="16" cy="17" r="2.2" />
    </svg>
  );
}

export function IconTruck({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </svg>
  );
}

export function IconSpark({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

export function IconPhone({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M15.5 21c-7 0-12.5-5.5-12.5-12.5V6a2 2 0 0 1 2-2h2l2 5-2 1.5a11 11 0 0 0 5 5L14 13l5 2v2a2 2 0 0 1-2 2h-1.5Z" />
    </svg>
  );
}

export function IconMail({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M3 6h18v12H3z" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconPin({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconCheckCircle({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function IconAlert({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16h.01" />
    </svg>
  );
}

export function IconClipboard({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M9 4h6v3H9zM7 5H5v16h14V5h-2" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

export function IconGift({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M3 11h18v10H3zM3 7h18v4H3zM12 7v14" />
      <path d="M12 7S9.5 3 7.5 4.2 9 7 12 7s4.5-1.6 4.5-2.8S12 7 12 7Z" />
    </svg>
  );
}

export function IconUsers({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0M16.5 5.2a3.2 3.2 0 0 1 0 5.6M18 20a6 6 0 0 0-2.5-4.9" />
    </svg>
  );
}

export function IconSend({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style} aria-hidden="true">
      <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3Z" />
    </svg>
  );
}

export function IconQuote({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M9.4 5.2c-3.4 1.7-5.4 4.6-5.4 8.5 0 3.2 1.8 5.1 4.2 5.1 2.1 0 3.7-1.6 3.7-3.6 0-2-1.4-3.4-3.2-3.4-.4 0-.8.1-1 .2.4-1.9 2-3.5 3.9-4.4l-2.2-2.4Zm10.2 0c-3.4 1.7-5.4 4.6-5.4 8.5 0 3.2 1.8 5.1 4.2 5.1 2.1 0 3.7-1.6 3.7-3.6 0-2-1.4-3.4-3.2-3.4-.4 0-.8.1-1 .2.4-1.9 2-3.5 3.9-4.4l-2.2-2.4Z" />
    </svg>
  );
}

export function IconStar({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z" />
    </svg>
  );
}

/**
 * Isometric stack of cartons on an orbiting ring — the hero illustration.
 * The `ha-*` classes are animated in the stylesheet so reduced motion can
 * switch them all off in one place.
 */
export function HeroArtwork() {
  return (
    <svg viewBox="0 0 340 360" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ha-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0cda1" />
          <stop offset="100%" stopColor="#c68e4f" />
        </linearGradient>
        <linearGradient id="ha-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b3783f" />
          <stop offset="100%" stopColor="#8d5c2c" />
        </linearGradient>
        <linearGradient id="ha-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8e5d2e" />
          <stop offset="100%" stopColor="#67421e" />
        </linearGradient>
        <linearGradient id="ha-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8bd85" stopOpacity=".9" />
          <stop offset="55%" stopColor="#a9713c" stopOpacity=".25" />
          <stop offset="100%" stopColor="#e8bd85" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ha-halo">
          <stop offset="0%" stopColor="#e8bd85" stopOpacity=".55" />
          <stop offset="100%" stopColor="#e8bd85" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ha-shadow">
          <stop offset="0%" stopColor="#7f5326" stopOpacity=".3" />
          <stop offset="100%" stopColor="#7f5326" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* glow behind the stack */}
      <circle cx="170" cy="180" r="132" fill="url(#ha-halo)" className="ha-halo" />

      {/* orbiting rings */}
      <g className="ha-orbit" style={{ transformOrigin: "170px 190px" }}>
        <ellipse
          cx="170"
          cy="190"
          rx="150"
          ry="66"
          stroke="url(#ha-ring)"
          strokeWidth="1.6"
          strokeDasharray="7 11"
        />
      </g>
      <g className="ha-orbit ha-orbit-slow" style={{ transformOrigin: "170px 190px" }}>
        <ellipse
          cx="170"
          cy="190"
          rx="118"
          ry="52"
          stroke="url(#ha-ring)"
          strokeWidth="1.2"
          strokeDasharray="3 9"
        />
      </g>

      {/* contact shadow on the ground */}
      <ellipse cx="170" cy="320" rx="112" ry="26" fill="url(#ha-shadow)" />

      <g className="ha-stack">
        {/* lower carton */}
        <path d="M80 202v60l90 50v-60l-90-50Z" fill="url(#ha-left)" />
        <path d="M260 202v60l-90 50v-60l90-50Z" fill="url(#ha-right)" />
        <path d="M170 152l90 50-90 50-90-50 90-50Z" fill="url(#ha-top)" />
        <path d="M170 152l-90 50 90 50V152Z" fill="#fff" opacity=".08" />

        {/* upper carton, seated centred on the lid below */}
        <g className="ha-lid">
          <path d="M116 152v50l54 30v-50l-54-30Z" fill="url(#ha-left)" />
          <path d="M224 152v50l-54 30v-50l54-30Z" fill="url(#ha-right)" />
          <path d="M170 122l54 30-54 30-54-30 54-30Z" fill="url(#ha-top)" />
          <path d="M170 122l-54 30 54 30V122Z" fill="#fff" opacity=".14" />
        </g>
      </g>

      {/* accent chips, each drifting on its own clock */}
      <circle cx="292" cy="104" r="9" fill="#e8bd85" className="ha-chip" />
      <circle cx="48" cy="146" r="6" fill="#c89154" className="ha-chip ha-chip-2" />
      <circle cx="300" cy="248" r="5" fill="#a9713c" className="ha-chip ha-chip-3" />
      <circle cx="58" cy="266" r="4" fill="#e8bd85" className="ha-chip ha-chip-4" />
    </svg>
  );
}

/**
 * Abstract capability panel for the showcase section — a rising bar chart
 * behind a quality badge. The `sa-*` classes carry the entrance animation.
 */
export function ShowcaseArtwork() {
  return (
    <svg viewBox="0 0 400 320" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sa-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#a9713c" stopOpacity=".35" />
          <stop offset="100%" stopColor="#e8bd85" />
        </linearGradient>
        <linearGradient id="sa-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c08a4c" />
          <stop offset="100%" stopColor="#7f5326" />
        </linearGradient>
        <linearGradient id="sa-sheet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f6ece1" />
        </linearGradient>
      </defs>

      {/* back sheet */}
      <rect x="34" y="30" width="332" height="230" rx="20" fill="url(#sa-sheet)" opacity=".65" />
      <rect
        x="52"
        y="52"
        width="332"
        height="230"
        rx="20"
        fill="url(#sa-sheet)"
        stroke="#e8ded3"
      />

      {/* bars, growing from the baseline */}
      <g style={{ transformOrigin: "0px 244px" }}>
        <rect x="86" y="184" width="34" height="60" rx="9" fill="url(#sa-bar)" className="sa-bar" />
        <rect x="136" y="150" width="34" height="94" rx="9" fill="url(#sa-bar)" className="sa-bar sa-bar-2" />
        <rect x="186" y="118" width="34" height="126" rx="9" fill="url(#sa-bar)" className="sa-bar sa-bar-3" />
        <rect x="236" y="86" width="34" height="158" rx="9" fill="url(#sa-bar)" className="sa-bar sa-bar-4" />
      </g>
      <path d="M76 250h250" stroke="#e8ded3" strokeWidth="2" strokeLinecap="round" />

      {/* trend line drawn over the bars */}
      <path
        d="M103 176 153 142 203 110 253 78"
        stroke="#a9713c"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="220"
        className="sa-line"
      />

      {/* quality badge */}
      <g className="sa-badge">
        <circle cx="312" cy="232" r="44" fill="url(#sa-badge)" />
        <circle cx="312" cy="232" r="44" fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="1.5" />
        <path
          d="m294 232 12 12 24-24"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
