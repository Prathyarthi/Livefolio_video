import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { SceneLogo } from "../components/SceneLogo";

const StatCard: React.FC<{
  value: string; label: string; delay: number;
}> = ({ value, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 90, mass: 1.1 } });

  return (
    <div style={{
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [22, 0])}px)`,
      padding: "18px 22px",
      borderRadius: 16,
      background: C.surface,
      border: `1px solid ${C.border}`,
      boxShadow: "0 10px 28px rgba(42,39,68,0.07)",
    }}>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 800,
        color: C.brand, letterSpacing: "-0.04em", lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600,
        color: C.textSub, marginTop: 8,
      }}>{label}</div>
    </div>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const textP = spring({ frame: frame - 8, fps, config: { damping: 22, stiffness: 100 } });

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
              fontSize: 44, fontWeight: 800, lineHeight: 1.12,
              fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em",
              color: C.text, marginBottom: 16,
            }}>
              A live portfolio with{" "}
              <span style={{ color: C.brand }}>real reach.</span>
            </div>
            <div style={{
              fontSize: 17, color: C.textSub, fontFamily: FONT_BODY,
              lineHeight: 1.5, maxWidth: 460,
            }}>
              Upload your resume, pick a template, set your colors, and see who visits — all on livefolio.me.
            </div>
          </div>
        </div>

        <div style={{
          width: 280,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <StatCard value="5,000+" label="page views" delay={18} />
          <StatCard value="200+" label="users" delay={28} />
          <StatCard value="40+" label="companies" delay={38} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
