import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { HookScene }      from "./scenes/HookScene";
import { BrandScene }     from "./scenes/BrandScene";
import { SyncScene }      from "./scenes/SyncScene";
import { DashboardScene } from "./scenes/DashboardScene";
import { AIScene }        from "./scenes/AIScene";
import { CTAScene }       from "./scenes/CTAScene";

// 30s @ 30fps = 900 total frames
// 5 transitions × 20f = 100 overlap frames
// Scene frames must sum to 1000 → net 900

const TRANSITION_FRAMES = 20;

const timing = (durationInFrames = TRANSITION_FRAMES) =>
  springTiming({ durationInFrames, config: { damping: 200, stiffness: 80 } });

export const LivefolioVideo: React.FC = () => (
  <AbsoluteFill style={{ background: "#FBFAF7" }}>
    <TransitionSeries>
      {/* Hook — 130f (4.3s) */}
      <TransitionSeries.Sequence durationInFrames={130}>
        <HookScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-right" })}
        timing={timing()}
      />

      {/* Brand reveal — 180f (6s) */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <BrandScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={timing()}
      />

      {/* GitHub sync — 160f (5.3s) */}
      <TransitionSeries.Sequence durationInFrames={160}>
        <SyncScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={timing()}
      />

      {/* Dashboard mockup — 175f (5.8s) */}
      <TransitionSeries.Sequence durationInFrames={175}>
        <DashboardScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={timing()}
      />

      {/* Template showcase — 155f (5.2s) */}
      <TransitionSeries.Sequence durationInFrames={155}>
        <AIScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={timing()}
      />

      {/* CTA — 200f (6.7s) */}
      <TransitionSeries.Sequence durationInFrames={200}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
