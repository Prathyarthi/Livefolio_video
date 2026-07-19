import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { LivefolioLogo } from "../components/SceneLogo";

const Badge: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 120 } });
  return (
    <div style={{
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)`,
      padding: "8px 18px", borderRadius: 100,
      border: `1px solid ${C.border}`,
      background: C.brandLight,
      fontSize: 13, fontWeight: 650, color: C.ink,
      fontFamily: FONT_BODY,
    }}>{label}</div>
  );
};

export const BrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoP = spring({ frame, fps, config: { damping: 14, stiffness: 65, mass: 1.3 } });
  const tagP  = spring({ frame: frame - 18, fps, config: { damping: 20, stiffness: 100 } });
  const subP  = spring({ frame: frame - 32, fps, config: { damping: 22, stiffness: 100 } });

  return (
    <AbsoluteFill>
      <GradientBg tint="brand" />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          opacity: interpolate(subP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subP, [0, 1], [-10, 0])}px)`,
          display: "flex", alignItems: "center", gap: 12, marginBottom: 34,
          fontFamily: FONT_DISPLAY, fontSize: 13, color: C.textSub,
        }}>
          <span style={{ padding: "7px 12px", borderRadius: 7, background: C.surface, border: `1px solid ${C.border}` }}>resume.pdf</span>
          <span style={{ color: C.brand, fontWeight: 800 }}>→ parse → design →</span>
          <span style={{ padding: "7px 12px", borderRadius: 7, background: C.greenLight, color: C.green, border: `1px solid ${C.green}30` }}>yourname.livefolio.me</span>
        </div>

        <div style={{
          opacity: interpolate(logoP, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoP, [0, 1], [0.55, 1])})`,
          marginBottom: 26,
        }}>
          <LivefolioLogo markSize={86} />
        </div>

        {/* Tagline */}
        <div style={{
          opacity: interpolate(tagP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(tagP, [0, 1], [20, 0])}px)`,
          marginBottom: 12,
        }}>
          <div style={{
            fontSize: 34, fontWeight: 700, textAlign: "center",
            fontFamily: FONT_DISPLAY,
            color: C.text, letterSpacing: "-0.01em",
          }}>
            Your resume. Your portfolio.{" "}
            <span style={{ color: C.brand }}>Done.</span>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          opacity: interpolate(subP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subP, [0, 1], [14, 0])}px)`,
          marginBottom: 40,
          fontSize: 17, color: C.textSub, textAlign: "center",
          fontFamily: FONT_BODY,
        }}>
          Turn your experience into a polished portfolio in minutes.
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Badge label="AI resume import" delay={52} />
          <Badge label="Beautiful templates" delay={60} />
          <Badge label="Live integrations" delay={68} />
          <Badge label="Custom subdomain" delay={76} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
