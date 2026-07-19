import { useCurrentFrame } from "remotion";

// Livefolio "Studio Notebook" palette — mirrored from the product tokens.
export const C = {
  bg:          "#FBFAF7",
  surface:     "#FFFFFF",
  sunken:      "#F3F1EC",
  border:      "#E8E5DF",
  borderLight: "#F0EDE7",
  text:        "#1A1828",
  textSub:     "#5E5A6E",
  textMuted:   "#8A8593",
  brand:       "#E86A5A",
  brandMid:    "#D95A4B",
  brandLight:  "#FBEAE6",
  ink:         "#2A2744",
  inkLight:    "#EEECEF",
  green:       "#43A88F",
  greenLight:  "#E8F7F2",
  red:         "#D84332",
  redLight:    "#FEF0EE",
  yellow:      "#C8952D",
  yellowLight: "#FFF8E6",
  github:      "#24292F",
};

export const FONT_DISPLAY = '"JetBrains Mono", "SFMono-Regular", Consolas, monospace';
export const FONT_BODY = '"Source Sans 3", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

type Props = { tint?: "none" | "brand" | "green" | "ink" };

export const GradientBg: React.FC<Props> = ({ tint = "none" }) => {
  const frame = useCurrentFrame();
  const ox = Math.sin(frame / 120) * 18;
  const oy = Math.cos(frame / 140) * 12;

  const tintColor =
    tint === "brand" ? "rgba(232,106,90,0.13)" :
    tint === "green" ? "rgba(67,168,143,0.09)" :
    tint === "ink" ? "rgba(42,39,68,0.09)" : "transparent";

  return (
    <div style={{ position: "absolute", inset: 0, background: C.bg, overflow: "hidden" }}>
      {tint !== "none" && (
        <>
          <div style={{
            position: "absolute", width: 700, height: 700, borderRadius: "50%",
            background: tintColor, filter: "blur(90px)",
            top: -260 + oy, right: -100 + ox,
          }} />
          <div style={{
            position: "absolute", width: 440, height: 440, borderRadius: "50%",
            background: "rgba(42,39,68,0.045)", filter: "blur(80px)",
            bottom: -210 - oy, left: -100 - ox,
          }} />
        </>
      )}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${C.borderLight} 1px, transparent 1px),
          linear-gradient(90deg, ${C.borderLight} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        opacity: 0.42,
      }} />
    </div>
  );
};
