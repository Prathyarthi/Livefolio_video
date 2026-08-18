import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { SceneLogo } from "../components/SceneLogo";

const FeatureTile: React.FC<{
  icon: string; label: string; desc: string; delay: number; accent: string;
}> = ({ icon, label, desc, delay, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 110 } });
  return (
    <div style={{
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`,
      padding: "14px 16px",
      borderRadius: 14,
      background: C.surface,
      border: `1px solid ${C.border}`,
      boxShadow: "0 4px 16px rgba(42,39,68,0.05)",
      minWidth: 0,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9, marginBottom: 8,
        background: `${accent}18`, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 16,
      }}>{icon}</div>
      <div style={{
        fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 3,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{label}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.textMuted, lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
};

export const BrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tagP = spring({ frame: frame - 8, fps, config: { damping: 20, stiffness: 100 } });

  const features = [
    { icon: "⚡", label: "Seconds to publish", desc: "Upload a resume, go live fast", accent: C.brand },
    { icon: "🎨", label: "Templates", desc: "Minimal to bold — pick your vibe", accent: C.green },
    { icon: "🔗", label: "Integrations", desc: "GitHub and more, always synced", accent: "#6F67D9" },
    { icon: "🎯", label: "Custom colors", desc: "Accent, background, text — yours", accent: C.yellow },
    { icon: "📊", label: "Analytics", desc: "Visits, peaks, trends at a glance", accent: C.ink },
    { icon: "🌐", label: "Custom domain", desc: "yourname.livefolio.me", accent: C.brandMid },
  ];

  return (
    <AbsoluteFill>
      <GradientBg tint="brand" />
      <SceneLogo />
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "92px 80px 48px",
      }}>
        <div style={{
          opacity: interpolate(tagP, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(tagP, [0, 1], [16, 0])}px)`,
          marginBottom: 28,
        }}>
          <div style={{
            fontSize: 34, fontWeight: 700, fontFamily: FONT_DISPLAY,
            color: C.text, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.15,
          }}>
            One platform for your entire{" "}
            <span style={{ color: C.brand }}>professional story.</span>
          </div>
          <div style={{ fontSize: 16, color: C.textSub, fontFamily: FONT_BODY }}>
            From first draft to live site — no code, no friction.
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
          width: "100%",
        }}>
          {features.map((f, i) => (
            <FeatureTile key={f.label} {...f} delay={28 + i * 7} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
