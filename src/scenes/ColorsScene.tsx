import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { SceneLogo } from "../components/SceneLogo";

const PALETTE = [
  { label: "Accent", color: "#E86A5A" },
  { label: "Background", color: "#FBFAF7" },
  { label: "Text", color: "#2A2744" },
  { label: "Highlight", color: "#43A88F" },
  { label: "Muted", color: "#6F67D9" },
];

const ACCENTS = ["#E86A5A", "#43A88F", "#6F67D9"] as const;

const PreviewPanel: React.FC<{ accent: string; bg: string; text: string; delay: number; caption: string }> = ({
  accent, bg, text, delay, caption,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 90 } });

  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      borderRadius: 16,
      overflow: "hidden",
      border: `1px solid ${C.border}`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`,
      boxShadow: "0 12px 40px rgba(42,39,68,0.1)",
      background: bg,
    }}>
      <div style={{ height: 8, background: accent }} />
      <div style={{ padding: "18px 20px" }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 800, color: text, marginBottom: 12, opacity: 0.45 }}>{caption}</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 800, color: text, lineHeight: 1.2, marginBottom: 8 }}>
          Alex Chen
        </div>
        <div style={{ fontSize: 12, color: text, opacity: 0.65, fontFamily: FONT_BODY, marginBottom: 14, lineHeight: 1.4 }}>
          Full-stack engineer building tools people love.
        </div>
        <div style={{
          display: "inline-block", padding: "6px 12px", borderRadius: 6,
          background: accent, color: "#fff", fontSize: 10, fontWeight: 700,
          fontFamily: FONT_BODY,
        }}>View work →</div>
      </div>
    </div>
  );
};

export const ColorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cycle = Math.max(0, Math.floor(Math.max(0, frame - 24) / 36)) % ACCENTS.length;
  const accent = ACCENTS[cycle];

  return (
    <AbsoluteFill>
      <GradientBg tint="brand" />
      <SceneLogo />
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        padding: "80px 56px 36px",
      }}>
        <AnimatedText delay={0} direction="up" style={{ marginBottom: 22 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: C.brand,
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: FONT_DISPLAY, marginBottom: 8,
          }}>New · Custom colors</div>
          <div style={{
            fontSize: 36, fontWeight: 800, color: C.text,
            fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em", lineHeight: 1.12,
          }}>
            Your Livefolio,{" "}
            <span style={{ color: accent }}>your colors.</span>
          </div>
        </AnimatedText>

        <div style={{ display: "flex", gap: 18, flex: 1, minHeight: 0, alignItems: "stretch" }}>
          <div style={{
            width: 248,
            flexShrink: 0,
            padding: "18px 18px 10px",
            borderRadius: 16,
            background: C.surface,
            border: `1px solid ${C.border}`,
            boxShadow: "0 8px 32px rgba(42,39,68,0.06)",
          }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.1em", marginBottom: 14 }}>
              COLOR PICKER
            </div>
            {PALETTE.map((item, i) => {
              const p = spring({ frame: frame - 14 - i * 5, fps, config: { damping: 24, stiffness: 120 } });
              const active = item.label === "Accent";
              return (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  marginBottom: 10, opacity: interpolate(p, [0, 1], [0, 1]),
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: active ? accent : item.color,
                    border: `2px solid ${active ? accent : C.border}`,
                    boxShadow: active ? `0 0 0 3px ${accent}30` : "none",
                  }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 700, color: C.text }}>{item.label}</div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, color: C.textMuted }}>{active ? accent : item.color}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <PreviewPanel accent={accent} bg="#FBFAF7" text="#2A2744" delay={22} caption="LIGHT PREVIEW" />
          <PreviewPanel accent={accent} bg="#1A1828" text="#FBFAF7" delay={30} caption="DARK PREVIEW" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
