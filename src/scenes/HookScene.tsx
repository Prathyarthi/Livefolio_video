import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { SceneLogo } from "../components/SceneLogo";

const Word: React.FC<{ text: string; delay: number; accent?: boolean }> = ({ text, delay, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 90, mass: 1.1 } });
  return (
    <span style={{
      display: "inline-block",
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [32, 0])}px)`,
      color: accent ? C.brand : C.text,
      marginRight: 15,
    }}>
      {text}
    </span>
  );
};

const PainLine: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 130 } });
  return (
    <div style={{
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateX(${interpolate(p, [0, 1], [-24, 0])}px)`,
      display: "flex", alignItems: "center", gap: 14, marginBottom: 16,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 7, background: C.sunken,
        border: `1px solid ${C.border}`, display: "flex", alignItems: "center",
        justifyContent: "center", color: C.brand, fontSize: 12, fontWeight: 800,
        flexShrink: 0,
      }}>↗</div>
      <span style={{ fontSize: 20, color: C.textSub, fontFamily: FONT_BODY }}>
        {text}
      </span>
    </div>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineP = spring({ frame: frame - 44, fps, config: { damping: 22, stiffness: 110 } });

  return (
    <AbsoluteFill>
      <GradientBg tint="ink" />
      <SceneLogo />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 120px" }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: C.brand,
          letterSpacing: "0.14em", textTransform: "uppercase",
          fontFamily: FONT_DISPLAY, marginBottom: 18,
          opacity: interpolate(spring({ frame, fps, config: { damping: 22, stiffness: 120 } }), [0, 1], [0, 1]),
        }}>Your work deserves better</div>

        <div style={{
          fontSize: 62, fontWeight: 800, lineHeight: 1.12,
          fontFamily: FONT_DISPLAY,
          letterSpacing: "-0.03em", marginBottom: 12, overflow: "hidden",
        }}>
          <Word text="Your best work" delay={0} />
          <br />
          <Word text="shouldn’t stay" delay={14} />
          <Word text="buried." delay={14} accent />
        </div>

        <div style={{
          height: 2, width: interpolate(lineP, [0, 1], [0, 280]),
          background: C.brand, borderRadius: 2, marginBottom: 36,
          opacity: interpolate(lineP, [0, 1], [0, 1]),
        }} />

        <PainLine text="Experience locked inside a PDF." delay={58} />
        <PainLine text="Projects scattered across GitHub and the web." delay={70} />
        <PainLine text="A portfolio that’s always one update behind." delay={82} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
