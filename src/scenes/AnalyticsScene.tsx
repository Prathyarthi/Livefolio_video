import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { AnalyticsMockup } from "../components/AnalyticsMockup";
import { SceneLogo } from "../components/SceneLogo";

const MetricChip: React.FC<{
  label: string; value: string; delay: number; accent: string;
}> = ({ label, value, delay, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 110 } });

  return (
    <div style={{
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 10,
      background: "rgba(255,255,255,0.08)",
      border: `1px solid ${accent}45`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px)`,
    }}>
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 800, color: accent }}>{value}</span>
      <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{label}</span>
    </div>
  );
};

export const AnalyticsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgP = spring({ frame, fps, config: { damping: 30, stiffness: 60 } });

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 70% 30%, ${C.green}18, transparent 60%),
          radial-gradient(ellipse at 20% 80%, ${C.brand}12, transparent 50%)`,
        opacity: interpolate(bgP, [0, 1], [0, 1]),
      }} />
      <SceneLogo size={34} variant="light" />
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        padding: "76px 48px 28px",
        gap: 14,
      }}>
        <AnimatedText delay={0} direction="up">
          <div style={{
            fontSize: 11, fontWeight: 700, color: C.green,
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: FONT_DISPLAY, marginBottom: 8,
          }}>Most requested · Now live</div>
          <div style={{
            fontSize: 32, fontWeight: 800, color: "#fff",
            fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em", lineHeight: 1.15,
          }}>
            Portfolio Analytics{" "}
            <span style={{ color: C.brand }}>is here.</span>
          </div>
        </AnimatedText>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <MetricChip label="views" value="1,284" delay={16} accent={C.brand} />
          <MetricChip label="peak hours" value="2–4 PM" delay={22} accent={C.green} />
          <MetricChip label="busiest day" value="Friday" delay={28} accent="#9B94E8" />
          <MetricChip label="growth" value="+34%" delay={34} accent={C.yellow} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "flex-start" }}>
          <AnalyticsMockup delay={12} scale={0.76} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
