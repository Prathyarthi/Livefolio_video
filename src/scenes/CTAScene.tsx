import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { LivefolioLogo, SceneLogo } from "../components/SceneLogo";

const Pill: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 24, stiffness: 120 } });
  return (
    <div style={{
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px)`,
      padding: "7px 16px", borderRadius: 100,
      background: C.surface, border: `1px solid ${C.border}`,
      fontSize: 13, color: C.textSub, fontWeight: 600,
      fontFamily: FONT_BODY,
      whiteSpace: "nowrap",
    }}>{label}</div>
  );
};

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoP = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 60, mass: 1.3 } });
  const tagP  = spring({ frame: frame - 18, fps, config: { damping: 20, stiffness: 100 } });
  const ctaP  = spring({ frame: frame - 34, fps, config: { damping: 20, stiffness: 90 } });
  const urlP  = spring({ frame: frame - 50, fps, config: { damping: 22, stiffness: 100 } });

  return (
    <AbsoluteFill>
      <GradientBg tint="brand" />
      <SceneLogo />
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 64px 40px",
      }}>
        <div style={{
          opacity: interpolate(logoP, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoP, [0, 1], [0.5, 1])})`,
          marginBottom: 22,
        }}>
          <LivefolioLogo markSize={64} />
        </div>

        <div style={{
          opacity: interpolate(tagP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(tagP, [0, 1], [18, 0])}px)`,
          marginBottom: 10,
          maxWidth: 640,
        }}>
          <div style={{
            fontSize: 32, fontWeight: 700, textAlign: "center",
            fontFamily: FONT_DISPLAY,
            color: C.text, letterSpacing: "-0.01em", lineHeight: 1.2,
          }}>
            Find out who&apos;s viewing your portfolio{" "}
            <span style={{ color: C.brand }}>👀</span>
          </div>
        </div>

        <div style={{
          opacity: interpolate(tagP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(tagP, [0, 1], [14, 0])}px)`,
          marginBottom: 28,
          fontSize: 15, color: C.textMuted, textAlign: "center",
          fontFamily: FONT_BODY, maxWidth: 480, lineHeight: 1.5,
        }}>
          Join 200+ creators on livefolio.me — build, customize, and track your reach.
        </div>

        <div style={{
          opacity: interpolate(ctaP, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaP, [0, 1], [0.9, 1])})`,
          marginBottom: 16,
          padding: "14px 40px", borderRadius: 10,
          background: C.brand,
          fontSize: 17, fontWeight: 700, color: "#fff",
          fontFamily: FONT_BODY,
          letterSpacing: "-0.01em",
          boxShadow: `0 4px 20px ${C.brand}40`,
        }}>
          Start building — it&apos;s free
        </div>

        <div style={{
          opacity: interpolate(urlP, [0, 1], [0, 1]),
          fontSize: 18, fontWeight: 800, color: C.ink,
          fontFamily: FONT_DISPLAY,
          letterSpacing: "0.03em", marginBottom: 22,
        }}>
          livefolio.me
        </div>

        <div style={{ display: "flex", flexWrap: "nowrap", gap: 8, justifyContent: "center" }}>
          <Pill label="Resume import" delay={68} />
          <Pill label="Templates" delay={74} />
          <Pill label="Integrations" delay={80} />
          <Pill label="Custom colors" delay={86} />
          <Pill label="Analytics" delay={92} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
