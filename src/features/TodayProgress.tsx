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
      <div className={styles.remaining}>
        {showMobileNav && <p>Remaining Time:</p>}
        <AvTimerOutlinedIcon className="classGray"></AvTimerOutlinedIcon>
        <TaskTimeTrackor time={timeRemaining}></TaskTimeTrackor>
      </div>
      <div className={styles.worked}>
        {showMobileNav && <p>Worked Today:</p>}
        <AccessTimeOutlinedIcon className="classGray"></AccessTimeOutlinedIcon>
        <TaskTimeTrackor time={totalElapsedTime}></TaskTimeTrackor>
      </div>
      <div className={styles.withoutBreak}>
        {showMobileNav && <p>Without Break:</p>}
        <TimerOutlinedIcon className="classGray"></TimerOutlinedIcon>
        <TaskTimeTrackor time={withoutBreak}></TaskTimeTrackor>
      </div>
    </Card>
  );
}

export default TodayProgress;
