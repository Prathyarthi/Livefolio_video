import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { HookScene }       from "./scenes/HookScene";
import { BrandScene }      from "./scenes/BrandScene";
import { SyncScene }       from "./scenes/SyncScene";
import { DashboardScene }  from "./scenes/DashboardScene";
import { AIScene }         from "./scenes/AIScene";
import { ColorsScene }     from "./scenes/ColorsScene";
import { AnalyticsScene }  from "./scenes/AnalyticsScene";
import { CTAScene }        from "./scenes/CTAScene";

// ~36s @ 30fps = 1070 total frames
// 7 transitions × 20f = 140 overlap frames
// Scene frames sum to 1210 → net 1070

const TRANSITION_FRAMES = 20;

const timing = (durationInFrames = TRANSITION_FRAMES) =>
  springTiming({ durationInFrames, config: { damping: 200, stiffness: 80 } });

export const LivefolioVideo: React.FC = () => (
  <AbsoluteFill style={{ background: "#FBFAF7" }}>
    <TransitionSeries>
      {/* Hook — 120f */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <HookScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-right" })}
        timing={timing()}
      />

      {/* Brand reveal — 165f */}
      <TransitionSeries.Sequence durationInFrames={165}>
        <BrandScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={timing()}
      />

      {/* Resume → portfolio in seconds — 145f */}
      <TransitionSeries.Sequence durationInFrames={145}>
        <SyncScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={timing()}
      />

      {/* Edit + live preview — 155f */}
      <TransitionSeries.Sequence durationInFrames={155}>
        <DashboardScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={timing()}
      />

      {/* Templates — 145f */}
      <TransitionSeries.Sequence durationInFrames={145}>
        <AIScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={timing()}
      />

      {/* Custom colors — 135f */}
      <TransitionSeries.Sequence durationInFrames={135}>
        <ColorsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={timing()}
      />

      {/* Portfolio analytics — 155f */}
      <TransitionSeries.Sequence durationInFrames={155}>
        <AnalyticsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={timing()}
      />

      {/* CTA — 190f */}
      <TransitionSeries.Sequence durationInFrames={190}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
