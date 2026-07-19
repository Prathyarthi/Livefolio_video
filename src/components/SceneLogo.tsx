import { Img, staticFile } from "remotion";
import { C, FONT_DISPLAY } from "./GradientBg";

type Props = { size?: number };

export const BrandMark: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Img
    src={staticFile("logo.svg")}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      display: "block",
      flexShrink: 0,
    }}
  />
);

export const LivefolioLogo: React.FC<{ markSize?: number; color?: string }> = ({
  markSize = 40,
  color = C.ink,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <BrandMark size={markSize} />
    <span style={{
      color,
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: markSize * 0.54,
      letterSpacing: "-0.045em",
    }}>
      Livefolio<span style={{ color: C.brand }}>.</span>
    </span>
  </div>
);

export const SceneLogo: React.FC<Props> = ({ size = 38 }) => (
  <div style={{
    position: "absolute",
    top: 28,
    left: 36,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
  }}>
    <LivefolioLogo markSize={size} />
  </div>
);

// Small bottom-right watermark variant
export const LogoWatermark: React.FC = () => (
  <div style={{
    position: "absolute",
    bottom: 24,
    right: 32,
    zIndex: 100,
    opacity: 0.4,
  }}>
    <LivefolioLogo markSize={28} />
  </div>
);
