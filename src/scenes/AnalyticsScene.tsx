import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { C, FONT_BODY, FONT_DISPLAY, GradientBg } from "../components/GradientBg";
import { SceneLogo } from "../components/SceneLogo";

const Shot: React.FC<{
  file: string; delay: number; flex?: number;
}> = ({ file, delay, flex = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 85 } });

  return (
    <div style={{
      flex,
      minWidth: 0,
      minHeight: 0,
      borderRadius: 16,
      overflow: "hidden",
      border: `1px solid ${C.border}`,
      background: C.surface,
      boxShadow: "0 14px 40px rgba(42,39,68,0.10)",
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`,
    }}>
      <Img
        src={staticFile(file)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top left",
        }}
      />
    </div>
  );
};

export const AnalyticsScene: React.FC = () => (
  <AbsoluteFill>
    <GradientBg tint="none" />
    <SceneLogo />
    <AbsoluteFill style={{
      display: "flex",
      flexDirection: "column",
      padding: "76px 44px 26px",
      gap: 14,
    }}>
      <AnimatedText delay={0} direction="up">
        <div style={{
          fontSize: 11, fontWeight: 700, color: C.brand,
          letterSpacing: "0.14em", textTransform: "uppercase",
          fontFamily: FONT_DISPLAY, marginBottom: 8,
        }}>Most requested · Now live</div>
        <div style={{
          fontSize: 32, fontWeight: 800, color: C.text,
          fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em", lineHeight: 1.15,
        }}>
          Portfolio Analytics.{" "}
          <span style={{ color: C.brand }}>It&apos;s here.</span>
        </div>
        <div style={{
          fontSize: 14, color: C.textSub, fontFamily: FONT_BODY, marginTop: 6,
        }}>
          See visits, peak hours, busiest day, and traffic trends — and yes, it&apos;s free.
        </div>
      </AnimatedText>

      <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}>
        <Shot file="product/analytics-cards.png" delay={12} flex={1.15} />
        <Shot file="product/analytics-charts.png" delay={20} flex={0.95} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
