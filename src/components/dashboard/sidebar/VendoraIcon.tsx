// components/VendoraLogo.tsx
import React from "react";

type FontVariant = "caprasimo" | "luckiest" | "playwrite";

type Props = {
  /** Overall text size in px (affects everything proportionally) */
  size?: number;
  justify?: string;
  /** Text color (wheel stays brand blue) */
  color?: string;
  /** Choose the display font */
  font?: FontVariant;
  /** Fine-tune spacing between the wheel and "RA" (negative closes the gap) */
  tighten?: string; // e.g. "-0.12em"
  /** Slight vertical nudge of the wheel relative to text baseline */
  wheelNudgeY?: string; // e.g. "0.02em"
  /** Optional className passthrough */
  className?: string;
};

const FONT_CLASS: Record<FontVariant, React.CSSProperties> = {
  caprasimo: { fontFamily: `'Caprasimo', system-ui, sans-serif` },
  luckiest: { fontFamily: `'Luckiest Guy', system-ui, sans-serif` },
  playwrite: { fontFamily: `'Playwrite Espana', system-ui, sans-serif` },
};

const VendoraIcon: React.FC<Props> = ({
  size = 45,
  color = "#1E90FF",
  font = "caprasimo",
  tighten = "-0.12em",
  wheelNudgeY = "0.02em",
  className,
}) => {
  // Wheel scales to cap-height via em so it behaves like a real letter.
  // 0.92em looks right for display fonts; tweak if needed.
  const wheelEm = 0.92;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        paddingTop: "5px",
        alignItems: "baseline",
        fontWeight: 400,
        letterSpacing: "0.02em",
        lineHeight: 1,
        fontSize: `${size}px`,
        justifyContent: "center",
        color: "#1E90FF",
        ...FONT_CLASS[font],
      }}
    >
      <span style={{ display: "inline-block", color: "#0c3a9ea4" }}>VEND</span>

      {/* Wheel-as-O */}
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          transform: `translateY(${wheelNudgeY})`,
          margin: "0 0", // we close the right gap via negative margin on the "RA" span
        }}
      >
        <svg
          width={`${wheelEm}em`}
          height={`${wheelEm}em`}
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Vendora O"
          style={{ display: "block" }}
        >
          {/* Wheel group in brand blue */}
          <g transform="translate(110,150)">
            {/* Outer ring */}
            <circle r="96" fill="none" stroke="#0c3a9ea4" strokeWidth="24" />
            {/* Inner hub */}
            <circle r="26" fill="#0c3a9ea4" />
            {/* Corner blades (NE, NW, SW, SE) */}
            <g fill="#0c3a9ea4" transform="rotate(45)" className="vendoraIcon">
              {/* East */}
              <rect x="62" y="-16" width="56" height="32" rx="12" />
              {/* West */}
              <rect x="-118" y="-16" width="56" height="32" rx="12" />
              {/* North */}
              <rect x="-16" y="-118" width="32" height="56" rx="12" />
              {/* South */}
              <rect x="-16" y="62" width="32" height="56" rx="12" />
            </g>
          </g>
        </svg>
      </span>

      {/* Tighten the space to behave like a true glyph kerning */}
      <span style={{ display: "inline-block", marginLeft: tighten, color: "#0c3a9ea4" }}>RA</span>
    </div>
  );
};

export default VendoraIcon;
