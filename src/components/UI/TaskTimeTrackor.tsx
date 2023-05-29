import { useAppSelector } from "../../store";
import { selectTaskById } from "../../store/tasksSlice/tasksSlice";
import { formatTime } from "../../utils";
import styles from "../../assets/style/tasks/timeTracker.module.css";

interface TaskTimeTrackerProps {
  time: number;
  fontSize: "small" | "big";
}

function TaskTimeTracker({ time, fontSize }: TaskTimeTrackerProps) {
  // formating the task duration and task Elapsed Time
  const duration = formatTime(time);
  const font = fontSize === "small" ? styles.small : styles.big;
  return (
    <div>
      <p className={styles.trackerText}>{duration}</p>
    </div>
  );
}
export default TaskTimeTracker;
