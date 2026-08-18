import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_BODY, FONT_DISPLAY } from "./GradientBg";
import { BrandMark } from "./SceneLogo";

const NAV = ["Overview", "Edit", "Templates", "Import", "Preview"];
const SKILLS = ["TypeScript", "React", "Node.js", "PostgreSQL"];

const Line: React.FC<{ width: string; dark?: boolean }> = ({ width, dark }) => (
  <div style={{
    height: dark ? 8 : 6,
    width,
    borderRadius: 10,
    background: dark ? C.ink : C.border,
  }} />
);

const ProjectCard: React.FC<{ title: string; delay: number }> = ({ title, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 115 } });

  return (
    <div style={{
      flex: 1,
      border: `1px solid ${C.border}`,
      borderRadius: 9,
      padding: 11,
      background: C.surface,
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`,
    }}>
      <div style={{
        height: 42,
        borderRadius: 6,
        marginBottom: 9,
        background: `linear-gradient(135deg, ${C.inkLight}, ${C.brandLight})`,
      }} />
      <div style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 700, color: C.text, marginBottom: 5 }}>{title}</div>
      <div style={{ display: "flex", gap: 4 }}>
        <span style={{ fontSize: 6, padding: "2px 5px", borderRadius: 4, background: C.brandLight, color: C.brand }}>React</span>
        <span style={{ fontSize: 6, padding: "2px 5px", borderRadius: 4, background: C.sunken, color: C.textSub }}>TypeScript</span>
      </div>
    </div>
  );
};

export const DashboardMockup: React.FC<{ delay?: number; scale?: number }> = ({ delay = 0, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mount = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 70 } });
  const scan = interpolate(frame - delay, [24, 82], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mountScale = interpolate(mount, [0, 1], [0.96, 1]);

  return (
    <div style={{ width: 1020 * scale, height: 470 * scale, flexShrink: 0 }}>
    <div style={{
      opacity: interpolate(mount, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(mount, [0, 1], [18, 0])}px) scale(${mountScale * scale})`,
      transformOrigin: "top left",
      width: 1020,
      height: 470,
      overflow: "hidden",
      borderRadius: 16,
      border: `1px solid ${C.border}`,
      boxShadow: "0 22px 70px rgba(42,39,68,0.13), 0 3px 12px rgba(42,39,68,0.06)",
      background: C.surface,
      fontFamily: FONT_BODY,
    }}>
      <div style={{
        height: 38,
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "0 14px",
        borderBottom: `1px solid ${C.border}`,
        background: C.sunken,
      }}>
        {["#E86A5A", "#E8B84A", "#5CBFA8"].map((color) => (
          <span key={color} style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
        ))}
        <div style={{
          margin: "0 auto",
          width: 310,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          background: C.surface,
          border: `1px solid ${C.border}`,
          color: C.textMuted,
          fontSize: 9,
        }}>livefolio.me/dashboard/preview</div>
      </div>

      <div style={{ height: 432, display: "flex" }}>
        <aside style={{
          width: 156,
          padding: "16px 12px",
          borderRight: `1px solid ${C.border}`,
          background: "rgba(251,250,247,0.92)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
            <BrandMark size={28} />
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 13, color: C.ink }}>
              Livefolio<span style={{ color: C.brand }}>.</span>
            </span>
          </div>
          {NAV.map((item) => (
            <div key={item} style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 30,
              padding: "0 9px",
              marginBottom: 4,
              borderRadius: 7,
              background: item === "Preview" ? C.brandLight : "transparent",
              color: item === "Preview" ? C.brandMid : C.textSub,
              fontSize: 10,
              fontWeight: item === "Preview" ? 700 : 500,
            }}>
              <span style={{ opacity: 0.75 }}>{item === "Preview" ? "◉" : "○"}</span>
              {item}
            </div>
          ))}
          <div style={{
            marginTop: 48,
            padding: 9,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            background: C.surface,
          }}>
            <div style={{ fontSize: 8, color: C.textMuted, marginBottom: 3 }}>YOUR SITE</div>
            <div style={{ fontSize: 9, color: C.green, fontWeight: 700 }}>● Live</div>
            <div style={{ marginTop: 3, fontSize: 8, color: C.textSub }}>maya.livefolio.me</div>
          </div>
        </aside>

        <div style={{ width: 300, padding: 17, borderRight: `1px solid ${C.border}`, background: C.bg }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16, color: C.text }}>Edit portfolio</div>
          <div style={{ fontSize: 9, color: C.textMuted, marginTop: 3, marginBottom: 14 }}>Edit sections and preview your site</div>
          {[
            ["Profile", "Name, headline and summary"],
            ["Experience", "Roles and accomplishments"],
            ["Projects", "Your strongest work"],
            ["Skills", "Tools and technologies"],
          ].map(([title, subtitle], index) => {
            const p = spring({ frame: frame - delay - 14 - index * 6, fps, config: { damping: 24, stiffness: 120 } });
            return (
              <div key={title} style={{
                opacity: interpolate(p, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(p, [0, 1], [-12, 0])}px)`,
                padding: "11px 12px",
                marginBottom: 8,
                borderRadius: 8,
                border: `1px solid ${index === 0 ? `${C.brand}70` : C.border}`,
                background: index === 0 ? C.brandLight : C.surface,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 700, color: C.text }}>
                  {title}<span style={{ color: C.textMuted }}>›</span>
                </div>
                <div style={{ marginTop: 3, fontSize: 8, color: C.textMuted }}>{subtitle}</div>
              </div>
            );
          })}
          <button style={{
            width: "100%",
            marginTop: 3,
            border: 0,
            borderRadius: 8,
            padding: "10px 0",
            color: "#fff",
            background: C.brand,
            fontFamily: FONT_BODY,
            fontSize: 10,
            fontWeight: 700,
          }}>Save changes →</button>
        </div>

        <main style={{ position: "relative", flex: 1, padding: "18px 25px", overflow: "hidden", background: C.surface }}>
          <div style={{
            position: "absolute",
            top: `${scan}%`,
            left: 0,
            right: 0,
            height: 2,
            opacity: scan >= 100 ? 0 : 0.7,
            background: `linear-gradient(90deg, transparent, ${C.brand}, transparent)`,
            boxShadow: `0 0 16px ${C.brand}`,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 800, color: C.ink }}>MAYA PATEL</span>
            <div style={{ display: "flex", gap: 13, fontSize: 8, color: C.textSub }}>
              <span>Work</span><span>About</span><span>Contact</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 30 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 27, lineHeight: 1.12, fontWeight: 800, color: C.text, letterSpacing: "-0.04em" }}>
                Product engineer<br />building thoughtful<br /><span style={{ color: C.brand }}>digital experiences.</span>
              </div>
              <div style={{ display: "flex", gap: 7, marginTop: 15 }}>
                {SKILLS.map((skill) => (
                  <span key={skill} style={{
                    padding: "4px 7px",
                    borderRadius: 5,
                    background: C.sunken,
                    color: C.textSub,
                    fontSize: 7,
                  }}>{skill}</span>
                ))}
              </div>
            </div>
            <div style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: `linear-gradient(145deg, ${C.ink}, #504A70)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: FONT_DISPLAY,
              fontSize: 24,
              fontWeight: 800,
              boxShadow: `10px 10px 0 ${C.brandLight}`,
            }}>MP</div>
          </div>
          <div style={{ marginTop: 30 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, fontWeight: 800, color: C.text, marginBottom: 9 }}>SELECTED WORK</div>
            <div style={{ display: "flex", gap: 10 }}>
              <ProjectCard title="Pulse Analytics" delay={delay + 35} />
              <ProjectCard title="Orbit Commerce" delay={delay + 43} />
              <ProjectCard title="Canvas AI" delay={delay + 51} />
            </div>
          </div>
          <div style={{ position: "absolute", left: 25, right: 25, bottom: 14, display: "flex", gap: 7, alignItems: "center" }}>
            <Line width="15%" dark />
            <Line width="28%" />
            <Line width="20%" />
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};
