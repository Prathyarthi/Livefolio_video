import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  config?: { damping: number; stiffness: number; mass?: number };
  style?: React.CSSProperties;
};

export const AnimatedText: React.FC<Props> = ({
  children, delay = 0, direction = "up", distance = 28,
  config = { damping: 20, stiffness: 110 }, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config });
  const opacity = interpolate(p, [0, 1], [0, 1]);
  const ty = direction === "up"   ? interpolate(p, [0, 1], [distance, 0])
           : direction === "down" ? interpolate(p, [0, 1], [-distance, 0]) : 0;
  const tx = direction === "left"  ? interpolate(p, [0, 1], [distance, 0])
           : direction === "right" ? interpolate(p, [0, 1], [-distance, 0]) : 0;
  return (
    <div style={{ opacity, transform: `translate(${tx}px,${ty}px)`, ...style }}>
      {children}
    </div>
  );
};
