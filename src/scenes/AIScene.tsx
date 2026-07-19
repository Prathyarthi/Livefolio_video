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
  { name: "Minimal", file: "minimal.webp", accent: C.ink },
  { name: "Developer", file: "developer.webp", accent: C.green },
  { name: "Retro", file: "retro.webp", accent: C.yellow },
  { name: "Space", file: "space.webp", accent: "#6F67D9" },
] as const;

const TemplateCard: React.FC<{
  name: string;
  file: string;
  accent: string;
  index: number;
}> = ({ name, file, accent, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - 16 - index * 8,
    fps,
    config: { damping: 20, stiffness: 95 },
  });
  const selected = Math.min(3, Math.floor(Math.max(0, frame - 38) / 24)) === index;
  const selectedP = spring({
    frame: frame - 38 - index * 24,
    fps,
    config: { damping: 18, stiffness: 125 },
  });
  const lift = selected
    ? interpolate(selectedP, [0, 1], [0, -12])
    : interpolate(selectedP, [0, 1], [0, 3]);

  return (
    <div style={{
      width: 240,
      padding: 8,
      borderRadius: 15,
      background: C.surface,
      border: `2px solid ${selected ? accent : C.border}`,
      boxShadow: selected
        ? `0 18px 45px ${accent}28`
        : "0 5px 18px rgba(42,39,68,0.07)",
      opacity: interpolate(entrance, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(entrance, [0, 1], [36, lift])}px)`,
    }}>
      <div style={{
        height: 260,
        overflow: "hidden",
        borderRadius: 9,
        border: `1px solid ${C.borderLight}`,
        background: C.sunken,
      }}>
        <Img
          src={staticFile(`templates/${file}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
      <div style={{
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 4px 0",
        fontFamily: FONT_BODY,
      }}>
        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{name}</span>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: accent,
          boxShadow: selected ? `0 0 0 4px ${accent}20` : "none",
        }} />
      </div>
    </div>
  );
};

export const AIScene: React.FC = () => (
  <AbsoluteFill>
    <GradientBg tint="brand" />
    <SceneLogo />
    <AbsoluteFill style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "66px 96px 44px",
    }}>
      <AnimatedText delay={0} direction="up" style={{ marginBottom: 27 }}>
        <div style={{
          color: C.brand,
          fontFamily: FONT_DISPLAY,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}>
          Same story. Your personality.
        </div>
        <div style={{
          color: C.text,
          fontFamily: FONT_DISPLAY,
          fontSize: 43,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.12,
        }}>
          Switch the style.{" "}
          <span style={{ color: C.brand }}>Keep every detail.</span>
        </div>
        <div style={{
          color: C.textSub,
          fontFamily: FONT_BODY,
          fontSize: 15,
          marginTop: 9,
        }}>
          Preview a new look without rebuilding your portfolio.
        </div>
      </AnimatedText>

      <div style={{ display: "flex", gap: 16 }}>
        {TEMPLATES.map((template, index) => (
          <TemplateCard key={template.name} {...template} index={index} />
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
