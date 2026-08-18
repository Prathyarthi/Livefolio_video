import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { SceneLogo } from "../components/SceneLogo";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countP = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 55, mass: 1.4 } });
  const textP = spring({ frame: frame - 20, fps, config: { damping: 22, stiffness: 100 } });
  const ringP = spring({ frame: frame - 4, fps, config: { damping: 20, stiffness: 70 } });

  return (
    <AbsoluteFill>
      <GradientBg tint="ink" />
      <SceneLogo />
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        padding: "88px 72px 48px 96px",
        gap: 56,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            opacity: interpolate(textP, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textP, [0, 1], [24, 0])}px)`,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.green,
              letterSpacing: "0.16em", textTransform: "uppercase",
              fontFamily: FONT_DISPLAY, marginBottom: 16,
            }}>livefolio.me</div>
            <div style={{
              fontSize: 46, fontWeight: 800, lineHeight: 1.12,
              fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em",
              color: C.text, marginBottom: 18,
            }}>
              Creators are shipping portfolios{" "}
              <span style={{ color: C.brand }}>faster than ever.</span>
            </div>
            <div style={{
              fontSize: 17, color: C.textSub, fontFamily: FONT_BODY,
              lineHeight: 1.5, maxWidth: 460,
            }}>
              Resume import, live integrations, templates, custom colors, and analytics — all in one place.
            </div>
          </div>
        </div>

        <div style={{ position: "relative", width: 280, height: 280, flexShrink: 0 }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: `2px solid ${C.brand}25`,
            transform: `scale(${interpolate(ringP, [0, 1], [0.7, 1])})`,
            opacity: interpolate(ringP, [0, 1], [0, 1]),
          }} />
          <div style={{
            position: "absolute", inset: 20, borderRadius: "50%",
            background: `linear-gradient(145deg, ${C.brandLight}, ${C.surface})`,
            border: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: `0 24px 60px ${C.brand}18`,
            opacity: interpolate(countP, [0, 1], [0, 1]),
            transform: `scale(${interpolate(countP, [0, 1], [0.6, 1])})`,
          }}>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 68, fontWeight: 800,
              color: C.brand, letterSpacing: "-0.05em", lineHeight: 1,
            }}>200+</div>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700,
              color: C.textSub, marginTop: 6, letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>users</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
