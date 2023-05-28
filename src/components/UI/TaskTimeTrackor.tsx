import { useAppSelector } from "../../store";
import { selectTaskById } from "../../store/tasksSlice/tasksSlice";
import { formatTime } from "../../utils";
import styles from "../../assets/style/tasks/timeTracker.module.css";

interface TaskTimeTrackerProps {
  time: number;
}

function TaskTimeTracker({ time }: TaskTimeTrackerProps) {
  // formating the task duration and task Elapsed Time
  const duration = formatTime(time);

  return (
    <div>
      <p className={styles.trackerText}>{duration}</p>
    </div>
  );
}
export default TaskTimeTracker;
