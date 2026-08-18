import "./index.css";
import { Composition } from "remotion";
import { LivefolioVideo } from "./VaiuVideo";

// ~36 seconds @ 30fps = 1070 frames
// TransitionSeries total = sum(scenes) - sum(transitions)
// = (120+165+145+155+145+135+155+190) - (7×20) = 1210 - 140 = 1070

export const RemotionRoot: React.FC = () => (
  <Composition
    id="LivefolioDemo"
    component={LivefolioVideo}
    durationInFrames={1070}
    fps={30}
    width={1280}
    height={720}
  />
);
