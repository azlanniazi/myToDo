import { useAppSelector } from "../../store";
import { selectCompleteTasks } from "../../store";
import styles from "../../assets/style/tasks/tasksContainer.module.css";
import Task from "./Task";

//defining CompletedTask component , it will render all the tasks that are complete
function CompletedTask() {
  const tasks = useAppSelector(selectCompleteTasks);

  // map through the task to create Task component for each task object
  const tasksList = tasks.map((task) => (
    <Task key={task.id} id={task.id}></Task>
  ));

  if (tasks.length === 0)
    return (
      <div className={styles.tasksContainer}>
        <p>No Completed Task</p>
      </div>
    );
  return (
    <div className={styles.completedTasks}>
      <h4>Completed Tasks</h4>
      <div className={styles.tasksContainer}>{tasksList}</div>;
    </div>
  );
}

export default CompletedTask;
