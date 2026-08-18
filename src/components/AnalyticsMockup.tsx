import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_BODY, FONT_DISPLAY } from "./GradientBg";
import { BrandMark } from "./SceneLogo";

const NAV = ["Overview", "Analytics", "Edit", "Templates", "Preview"];

const Bar: React.FC<{ height: number; delay: number; highlight?: boolean }> = ({ height, delay, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 100 } });
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 4,
    }}>
      <div style={{
        width: "100%",
        height: interpolate(p, [0, 1], [0, height]),
        borderRadius: "4px 4px 0 0",
        background: highlight ? C.brand : C.border,
        opacity: highlight ? 1 : 0.7,
      }} />
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; sub: string; delay: number; accent?: string }> = ({
  label, value, sub, delay, accent = C.brand,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 115 } });

  return (
    <div style={{
      flex: 1,
      padding: "12px 14px",
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      background: C.surface,
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)`,
    }}>
      <div style={{ fontSize: 8, color: C.textMuted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 800, color: accent, letterSpacing: "-0.03em" }}>{value}</div>
      <div style={{ fontSize: 8, color: C.textSub, marginTop: 2 }}>{sub}</div>
    </div>
  );
};

export const AnalyticsMockup: React.FC<{ delay?: number; scale?: number }> = ({ delay = 0, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mount = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 70 } });
  const mountScale = interpolate(mount, [0, 1], [0.96, 1]);

  const barHeights = [32, 44, 26, 54, 36, 66, 48];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
        }}>livefolio.me/dashboard/analytics</div>
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
              background: item === "Analytics" ? C.brandLight : "transparent",
              color: item === "Analytics" ? C.brandMid : C.textSub,
              fontSize: 10,
              fontWeight: item === "Analytics" ? 700 : 500,
            }}>
              <span style={{ opacity: 0.75 }}>{item === "Analytics" ? "◉" : "○"}</span>
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

        <main style={{ flex: 1, padding: "16px 20px", background: C.bg, minWidth: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18, color: C.text }}>Portfolio Analytics</div>
              <div style={{ fontSize: 9, color: C.textMuted, marginTop: 3 }}>See how many people visit your portfolio and when</div>
            </div>
            <div style={{
              padding: "5px 10px", borderRadius: 6,
              background: C.greenLight, color: C.green,
              fontSize: 9, fontWeight: 700,
            }}>Free</div>
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <StatCard label="Total views" value="1,284" sub="Last 30 days" delay={delay + 18} />
            <StatCard label="Unique visitors" value="892" sub="Last 30 days" delay={delay + 24} accent={C.green} />
            <StatCard label="Busiest day" value="Friday" sub="Peak traffic day" delay={delay + 30} accent={C.ink} />
            <StatCard label="Peak hours" value="2–4 PM" sub="Most visits" delay={delay + 36} accent="#6F67D9" />
          </div>

          <div style={{
            padding: "16px 18px",
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            background: C.surface,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 800, color: C.text }}>Traffic trends</div>
              <div style={{ fontSize: 8, color: C.textMuted }}>This week</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 78 }}>
              {barHeights.map((h, i) => (
                <div key={days[i]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <Bar height={h} delay={delay + 40 + i * 4} highlight={i === 5} />
                  <span style={{ fontSize: 7, color: C.textMuted }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {[
              { time: "9 AM", pct: 8 },
              { time: "12 PM", pct: 22 },
              { time: "3 PM", pct: 38 },
              { time: "6 PM", pct: 18 },
              { time: "9 PM", pct: 14 },
            ].map(({ time, pct }, i) => {
              const p = spring({ frame: frame - delay - 55 - i * 4, fps, config: { damping: 24, stiffness: 120 } });
              return (
                <div key={time} style={{
                  flex: 1,
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 7, color: C.textMuted }}>{time}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 800, color: pct >= 30 ? C.brand : C.textSub }}>{pct}%</div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};
