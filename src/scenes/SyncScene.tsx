import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { SceneLogo } from "../components/SceneLogo";

const Step: React.FC<{
  num: string; title: string; body: string; delay: number; accent: string; last?: boolean;
}> = ({ num, title, body, delay, accent, last }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 95 } });

  return (
    <div style={{
      display: "flex", gap: 16, alignItems: "flex-start",
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateX(${interpolate(p, [0, 1], [-30, 0])}px)`,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11,
          background: `${accent}15`, border: `2px solid ${accent}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 800, color: accent,
        }}>{num}</div>
        {!last && (
          <div style={{
            width: 2, height: 36, marginTop: 4,
            background: `linear-gradient(${accent}, ${C.border})`,
          }} />
        )}
      </div>
      <div style={{ paddingTop: 6, paddingBottom: last ? 0 : 16, minWidth: 0 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.textSub, lineHeight: 1.45 }}>{body}</div>
      </div>
    </div>
  );
};

export const SyncScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardP = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 80 } });

  return (
    <AbsoluteFill>
      <GradientBg tint="green" />
      <SceneLogo />
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        padding: "88px 72px 48px",
        gap: 48,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatedText delay={0} direction="up">
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.green,
              letterSpacing: "0.14em", textTransform: "uppercase",
              fontFamily: FONT_DISPLAY, marginBottom: 12,
            }}>Resume → Portfolio</div>
            <div style={{
              fontSize: 40, fontWeight: 800, color: C.text,
              fontFamily: FONT_DISPLAY, letterSpacing: "-0.03em", lineHeight: 1.12,
              marginBottom: 12,
            }}>
              Live in{" "}
              <span style={{ color: C.brand }}>seconds,</span>
              <br />not weekends.
            </div>
            <div style={{ fontSize: 15, color: C.textSub, fontFamily: FONT_BODY, lineHeight: 1.5, maxWidth: 420 }}>
              AI reads your resume and builds a structured draft you can refine instantly.
            </div>
          </AnimatedText>
        </div>

        <div style={{ width: 400, flexShrink: 0 }}>
          <div style={{
            opacity: interpolate(cardP, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardP, [0, 1], [20, 0])}px)`,
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 18, padding: "22px 24px",
            boxShadow: "0 16px 48px rgba(42,39,68,0.08)",
          }}>
            <Step num="01" title="Drop your resume" body="PDF upload — experience, skills, projects extracted." delay={18} accent={C.brand} />
            <Step num="02" title="AI builds your draft" body="Sections, layout, and copy structured automatically." delay={32} accent={C.green} />
            <Step num="03" title="Connect & publish" body="Link GitHub, pick a template, go live on your subdomain." delay={46} accent="#6F67D9" last />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
