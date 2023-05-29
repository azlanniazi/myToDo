import { Card, TaskTimeTrackor } from "../components/UI";
import styles from "../assets/style/todayProgress.module.css";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
  getShowMobileNav,
  getTotalDuration,
  getTotalElapsedTime,
  openMobileMenu,
  useAppSelector,
} from "../store";
import { getWithoutBreak } from "../store";

function TodayProgress() {
  const totalElapsedTime = useAppSelector(getTotalElapsedTime);
  const totalTasksDuration = useAppSelector(getTotalDuration);
  const timeRemaining = totalTasksDuration - totalElapsedTime;
  const showMobileNav = useAppSelector(getShowMobileNav);
  const withoutBreak = useAppSelector(getWithoutBreak);

  return (
    <Card className={styles.todayProgress}>
      <div className={styles.progressChild}>
        <AvTimerOutlinedIcon className="classGray"></AvTimerOutlinedIcon>
        <p className={styles.progressTitle}>Remaining Time:</p>

        <TaskTimeTrackor fontSize="big" time={timeRemaining}></TaskTimeTrackor>
      </div>
      <div className={styles.progressChild}>
        <AccessTimeOutlinedIcon className="classGray"></AccessTimeOutlinedIcon>
        <p className={styles.progressTitle}>Worked Today:</p>
        <TaskTimeTrackor
          fontSize="big"
          time={totalElapsedTime}
        ></TaskTimeTrackor>
      </div>
      <div className={styles.progressChild}>
        <TimerOutlinedIcon className="classGray"></TimerOutlinedIcon>
        <p className={styles.progressTitle}>Without Break:</p>
        <TaskTimeTrackor fontSize="big" time={withoutBreak}></TaskTimeTrackor>
      </div>
    </Card>
  );
}

export default TodayProgress;
