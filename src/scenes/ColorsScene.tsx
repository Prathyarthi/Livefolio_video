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

export const ColorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shot = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 80 } });

  return (
    <AbsoluteFill>
      <GradientBg tint="ink" />
      <SceneLogo />
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        padding: "78px 48px 28px",
      }}>
        <AnimatedText delay={0} direction="up" style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: C.brand,
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: FONT_DISPLAY, marginBottom: 8,
          }}>New · Accent colors</div>
          <div style={{
            fontSize: 34, fontWeight: 800, color: C.text,
            fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em", lineHeight: 1.12,
          }}>
            Your Livefolio,{" "}
            <span style={{ color: C.brand }}>your colors.</span>
          </div>
          <div style={{
            fontSize: 15, color: C.textSub, fontFamily: FONT_BODY, marginTop: 6,
          }}>
            Preview any accent on your live site — then apply it in one click.
          </div>
        </AnimatedText>

        <div style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${C.border}`,
          boxShadow: "0 18px 50px rgba(42,39,68,0.14)",
          background: "#0B0B12",
          opacity: interpolate(shot, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(shot, [0, 1], [22, 0])}px)`,
        }}>
          <Img
            src={staticFile("product/accent-preview.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
