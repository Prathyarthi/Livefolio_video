import "./index.css";
import { Composition } from "remotion";
import { LivefolioVideo } from "./VaiuVideo";

// 30 seconds @ 30fps = 900 frames
// TransitionSeries total = sum(scenes) - sum(transitions)
// = (130+180+160+175+155+200) - (5×20) = 1000 - 100 = 900 ✓

export const RemotionRoot: React.FC = () => (
  <Composition
    id="LivefolioDemo"
    component={LivefolioVideo}
    durationInFrames={900}
    fps={30}
    width={1280}
    height={720}
  />
);
