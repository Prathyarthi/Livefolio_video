import { AbsoluteFill } from "remotion";
import { GradientBg, C, FONT_DISPLAY } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { DashboardMockup } from "../components/DashboardMockup";
import { SceneLogo } from "../components/SceneLogo";

export const DashboardScene: React.FC = () => (
  <AbsoluteFill>
    <GradientBg tint="none" />
    <SceneLogo />
    <AbsoluteFill style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 40px", gap: 22,
    }}>
      <AnimatedText delay={0} direction="up" style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: C.brand,
          letterSpacing: "0.14em", textTransform: "uppercase",
          fontFamily: FONT_DISPLAY, marginBottom: 12,
        }}>Make it unmistakably yours</div>
        <div style={{
          fontSize: 44, fontWeight: 800, color: C.text,
          fontFamily: FONT_DISPLAY,
          letterSpacing: "-0.025em", lineHeight: 1.15,
        }}>
          Edit on the left.{" "}
          <span style={{ color: C.brand }}>See it live on the right.</span>
        </div>
      </AnimatedText>
      <DashboardMockup delay={12} />
    </AbsoluteFill>
  </AbsoluteFill>
);
