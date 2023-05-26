import { useState } from "react";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
  useCircularInputContext,
} from "react-circular-input";

function CustomComponent() {
  const { getPointFromValue, value } = useCircularInputContext();
  const point = getPointFromValue();
  if (!point) return null;
  return (
    <text
      {...point}
      textAnchor="middle"
      dy="0.35em"
      fill="rgb(61, 153, 255)"
      style={{ pointerEvents: "none", fontWeight: "bold" }}
    >
      {Math.round(value * 12)}
    </text>
  );
}

function CircleInput() {
  const [value, setValue] = useState(0);
  return (
    <CircularInput value={value} onChange={setValue}>
      <CircularTrack></CircularTrack>
      <CircularProgress></CircularProgress>
      <CircularThumb width={100}></CircularThumb>
      <CustomComponent />
    </CircularInput>
  );
}

export default CircleInput;
