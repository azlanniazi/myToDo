import { TodayProgress } from "../features";
import { CompletedTasks, InCompletedTasks } from "../features/tasks";

function Home() {
  return (
    <div className="content gap-3">
      <TodayProgress></TodayProgress>
      <InCompletedTasks></InCompletedTasks>

      <CompletedTasks></CompletedTasks>
    </div>
  );
}
export default Home;
