import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { LivefolioLogo } from "../components/SceneLogo";

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
    }}>{label}</div>
  );
};

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoP = spring({ frame, fps, config: { damping: 14, stiffness: 60, mass: 1.3 } });
  const tagP  = spring({ frame: frame - 16, fps, config: { damping: 20, stiffness: 100 } });
  const ctaP  = spring({ frame: frame - 32, fps, config: { damping: 20, stiffness: 90 } });
  const urlP  = spring({ frame: frame - 50, fps, config: { damping: 22, stiffness: 100 } });

  return (
    <AbsoluteFill>
      <GradientBg tint="brand" />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Logo — full size, centered */}
        <div style={{
          opacity: interpolate(logoP, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoP, [0, 1], [0.5, 1])})`,
          marginBottom: 30,
        }}>
          <LivefolioLogo markSize={82} />
        </div>

        {/* Tagline */}
        <div style={{
          opacity: interpolate(tagP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(tagP, [0, 1], [18, 0])}px)`,
          marginBottom: 10,
        }}>
          <div style={{
            fontSize: 34, fontWeight: 700, textAlign: "center",
            fontFamily: FONT_DISPLAY,
            color: C.text, letterSpacing: "-0.01em",
          }}>
            Your work is ready to be <span style={{ color: C.brand }}>seen.</span>
          </div>
        </div>

        <div style={{
          opacity: interpolate(tagP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(tagP, [0, 1], [14, 0])}px)`,
          marginBottom: 36,
          fontSize: 15, color: C.textMuted, textAlign: "center",
          fontFamily: FONT_BODY,
        }}>
          From resume to a live portfolio — without starting from scratch.
        </div>

        {/* CTA */}
        <div style={{
          opacity: interpolate(ctaP, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaP, [0, 1], [0.9, 1])})`,
          marginBottom: 20,
          padding: "14px 48px", borderRadius: 10,
          background: C.brand,
          fontSize: 17, fontWeight: 700, color: "#fff",
          fontFamily: FONT_BODY,
          letterSpacing: "-0.01em",
          boxShadow: `0 4px 20px ${C.brand}40`,
        }}>
          Build your portfolio — it&apos;s free
        </div>

        {/* URL */}
        <div style={{
          opacity: interpolate(urlP, [0, 1], [0, 1]),
          fontSize: 20, fontWeight: 800, color: C.ink,
          fontFamily: FONT_DISPLAY,
          letterSpacing: "0.03em", marginBottom: 28,
        }}>
          livefolio.me
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Pill label="Upload your resume" delay={68} />
          <Pill label="Pick your style" delay={76} />
          <Pill label="Connect your work" delay={84} />
          <Pill label="Go live" delay={92} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
