import { AbsoluteFill } from "remotion";
import { GradientBg, C, FONT_DISPLAY, FONT_BODY } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { DashboardMockup } from "../components/DashboardMockup";
import { SceneLogo } from "../components/SceneLogo";

export const DashboardScene: React.FC = () => (
  <AbsoluteFill>
    <GradientBg tint="none" />
    <SceneLogo />
    <AbsoluteFill style={{
      display: "flex",
      flexDirection: "column",
      padding: "80px 48px 32px",
      gap: 18,
    }}>
      <AnimatedText delay={0} direction="up">
        <div style={{
          fontSize: 11, fontWeight: 700, color: C.ink,
          letterSpacing: "0.14em", textTransform: "uppercase",
          fontFamily: FONT_DISPLAY, marginBottom: 8,
        }}>Live editor</div>
        <div style={{
          fontSize: 32, fontWeight: 800, color: C.text,
          fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em", lineHeight: 1.15,
        }}>
          Change it here.{" "}
          <span style={{ color: C.brand }}>See it there.</span>
        </div>
        <div style={{
          fontSize: 14, color: C.textSub, fontFamily: FONT_BODY, marginTop: 6,
        }}>
          Every edit updates your preview in real time — profile, projects, skills, all of it.
        </div>
      </AnimatedText>
      <div style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "flex-start" }}>
        <DashboardMockup delay={10} scale={0.78} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
