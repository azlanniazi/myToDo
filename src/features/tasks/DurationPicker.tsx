import { useEffect, useState } from "react";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
  useCircularInputContext,
} from "react-circular-input";
import { formatTime } from "../../utils";
import classes from "../../assets/style/tasks/durationPicker.module.css";



function HourComponent() {
  const { getPointFromValue, value } = useCircularInputContext();
  const point = getPointFromValue();
  if (!point) return null;
  return (
    <text
      {...point}
      textAnchor="middle"
      dy="0.35em"
      fontSize={".75rem"}
      fill="rgb(221, 214, 254)"
      style={{ pointerEvents: "none", fontWeight: "bold" }}
    >
      {Math.round(value * 12)}
    </text>
  );
}

// Component which show duration
function DisplayDuration() {
  const { value } = useCircularInputContext();
  const duration = Math.floor((value / 1) * 43200000);
  const formatedDuration = formatTime(duration);

  return (
    <text
      textAnchor="middle"
      dy="5.5rem"
      dx="5rem"
      fontSize={"1.5rem"}
      fill="rgb(109, 40, 217)"
      style={{ pointerEvents: "none", fontWeight: "bold" }}
    >
      {formatedDuration}
    </text>
  );
}

// duration Picker Props
interface DurationPickerProps {
  onChange: (value: number, isValid: boolean) => void;
}

function DurationPicker({ onChange }: DurationPickerProps) {
  const [value, setValue] = useState(0);
  const maxDuration = 43200000;
  const duration = Math.floor((value / 1) * 43200000);
  const isValid = duration > 300000;
  useEffect(() => {
    onChange(duration, isValid);
  }, [value]);

  return (
    <div className={classes.durationPicker}>
      <label> Pick Duration</label>

      <div className={classes.durationCircle}>
        <CircularInput radius={80} value={value} onChange={setValue}>
          <CircularTrack stroke="#cac0f3"></CircularTrack>
          <CircularProgress stroke="rgb(166, 125, 232)"></CircularProgress>
          <DisplayDuration></DisplayDuration>
          <CircularThumb fill=" rgb(109, 40, 217)" r={14}></CircularThumb>
          <HourComponent />
        </CircularInput>
      </div>
    </div>
  );
}

export default DurationPicker;
