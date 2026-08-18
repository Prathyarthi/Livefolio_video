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

const TEMPLATES = [
  { name: "Minimal", file: "minimal.webp", accent: C.ink, rotate: -3.5 },
  { name: "Developer", file: "developer.webp", accent: C.green, rotate: -1.2 },
  { name: "Retro", file: "retro.webp", accent: C.yellow, rotate: 1.4 },
  { name: "Space", file: "space.webp", accent: "#6F67D9", rotate: 3.2 },
] as const;

const TemplateCard: React.FC<{
  name: string; file: string; accent: string;
  index: number; rotate: number;
}> = ({ name, file, accent, index, rotate }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - 12 - index * 8,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const selected = Math.min(3, Math.floor(Math.max(0, frame - 42) / 22)) === index;
  const selectedP = spring({
    frame: frame - 42 - index * 22,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const lift = selected ? interpolate(selectedP, [0, 1], [0, -16]) : 0;
  const tilt = selected ? 0 : rotate;

  return (
    <div style={{
      width: 230,
      flexShrink: 0,
      padding: 6,
      borderRadius: 14,
      background: C.surface,
      border: `2px solid ${selected ? accent : C.border}`,
      boxShadow: selected
        ? `0 22px 48px ${accent}28`
        : "0 8px 24px rgba(42,39,68,0.08)",
      opacity: interpolate(entrance, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(entrance, [0, 1], [36, lift])}px) rotate(${tilt}deg)`,
      zIndex: selected ? 4 : index,
    }}>
      <div style={{
        height: 248, overflow: "hidden", borderRadius: 8,
        border: `1px solid ${C.borderLight}`, background: C.sunken,
      }}>
        <Img
          src={staticFile(`templates/${file}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "7px 4px 2px", fontFamily: FONT_BODY,
      }}>
        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{name}</span>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: accent,
          boxShadow: selected ? `0 0 0 4px ${accent}22` : "none",
        }} />
      </div>
    </div>
  );
};

export const AIScene: React.FC = () => (
  <AbsoluteFill>
    <GradientBg tint="ink" />
    <SceneLogo />
    <AbsoluteFill style={{
      display: "flex",
      flexDirection: "column",
      padding: "80px 56px 28px",
    }}>
      <AnimatedText delay={0} direction="up" style={{ marginBottom: 22 }}>
        <div style={{
          color: C.brand, fontFamily: FONT_DISPLAY, fontSize: 11,
          fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
        }}>Templates</div>
        <div style={{
          color: C.text, fontFamily: FONT_DISPLAY, fontSize: 34,
          fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.15,
        }}>
          Four distinct looks.{" "}
          <span style={{ color: C.brand }}>One click to switch.</span>
        </div>
        <div style={{ color: C.textSub, fontFamily: FONT_BODY, fontSize: 14, marginTop: 6 }}>
          Your content stays — only the design changes.
        </div>
      </AnimatedText>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 16,
        flex: 1,
      }}>
        {TEMPLATES.map((template, index) => (
          <TemplateCard key={template.name} {...template} index={index} />
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
