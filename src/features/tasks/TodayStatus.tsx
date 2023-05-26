import { Card } from "../../components/UI";
import style from "../../assets/style/tasks/todayStatus.module.css";

function TodayStatus() {
  return (
    <Card className={style.todayStatus}>
      <div className="remainingStatus">Remaining</div>
      <div className="spentStatus">Time Spent</div>
      <div className="breakStatus">Without a break</div>
    </Card>
  );
}

export default TodayStatus;
