import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GradientBg, C, FONT_BODY, FONT_DISPLAY } from "../components/GradientBg";
import { AnimatedText } from "../components/AnimatedText";
import { SceneLogo } from "../components/SceneLogo";

const DataPacket: React.FC<{ frame: number; offset: number; reverse?: boolean }> = ({ frame, offset, reverse }) => {
  const t = ((frame + offset) % 65) / 65;
  const x = reverse ? interpolate(t, [0, 1], [380, 0]) : interpolate(t, [0, 1], [0, 380]);
  const alpha = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1;
  return (
    <div style={{
      position: "absolute", left: x,
      width: 8, height: 8, borderRadius: "50%",
      background: reverse ? C.green : C.brand,
      opacity: alpha,
    }} />
  );
};

const PlatformCard: React.FC<{
  name: string; accentColor: string; delay: number; side: "left" | "right";
  items: string[]; symbol: string;
}> = ({ name, accentColor, delay, side, items, symbol }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 80 } });

  return (
    <div style={{
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateX(${interpolate(p, [0, 1], [side === "left" ? -50 : 50, 0])}px)`,
      background: C.bg, border: `1px solid ${C.border}`,
      borderRadius: 16, padding: "24px 28px", width: 240,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: C.surface, border: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: accentColor, fontFamily: FONT_DISPLAY }}>{symbol}</span>
        </div>
        <span style={{ fontSize: 20, fontWeight: 700, color: C.text, fontFamily: FONT_BODY }}>
          {name}
        </span>
      </div>
      {items.map((item, i) => (
        <div key={item} style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 9,
          opacity: interpolate(frame - delay - 10 - i * 6, [0, 12], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: C.textSub, fontFamily: FONT_BODY }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export const SyncScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <GradientBg tint="brand" />
      <SceneLogo />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "0 80px",
      }}>
        <AnimatedText delay={0} direction="up" style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: C.brand,
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: FONT_DISPLAY, marginBottom: 14,
          }}>Start with what you already have</div>
          <div style={{
            fontSize: 48, fontWeight: 800, color: C.text,
            fontFamily: FONT_DISPLAY,
            letterSpacing: "-0.025em", lineHeight: 1.15,
          }}>
            Drop in your resume.{" "}
            <span style={{ color: C.brand }}>Livefolio does the rest.</span>
          </div>
        </AnimatedText>

        <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 40 }}>
          <PlatformCard
            name="Resume PDF" accentColor={C.ink} delay={12} side="left" symbol="PDF"
            items={["Experience", "Education", "Skills", "Projects"]}
          />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", width: 380, height: 10, display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: C.surface, border: `1px solid ${C.border}` }} />
              {[0, 22, 44].map(o => <DataPacket key={o} frame={frame} offset={o} />)}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.textMuted,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: FONT_DISPLAY,
            }}>AI structures your story</div>
            <div style={{ position: "relative", width: 380, height: 10, display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: C.brandLight, border: `1px solid ${C.border}` }} />
              {[10, 33, 55].map(o => <DataPacket key={o} frame={frame} offset={o} reverse />)}
            </div>
          </div>

          <PlatformCard
            name="Livefolio" accentColor={C.brand} delay={18} side="right" symbol="LF"
            items={["Clean layout", "Editable sections", "Project cards", "Ready to publish"]}
          />
        </div>

        <AnimatedText delay={58} direction="up">
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {[
              { text: "Upload once → start with a complete draft", color: C.brand },
              { text: "Review everything → stay fully in control", color: C.green },
            ].map(({ text, color }) => (
              <div key={text} style={{
                padding: "10px 20px", borderRadius: 8,
                background: C.surface, border: `1px solid ${C.border}`,
                fontSize: 13, color: C.textSub,
                fontFamily: FONT_BODY,
                borderLeft: `3px solid ${color}`,
              }}>{text}</div>
            ))}
          </div>
        </AnimatedText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
