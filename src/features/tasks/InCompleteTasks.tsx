import { useAppSelector } from "../../store";
import { selectIncompleteTasks } from "../../store";
import styles from "../../assets/style/tasks/tasksContainer.module.css";
import Task from "./Task";
// defining IncompleteTasks component , which will render incomplete Tasks
function IncompleteTasks() {
  const tasks = useAppSelector(selectIncompleteTasks);

  // map through the task to create Task component for each task object
  const tasksList = tasks.map((task) => (
    <Task key={task.id} id={task.id}></Task>
  ));

  if (tasks.length === 0)
    return <div className={styles.tasksContainer}>No Incomplete Task</div>;
  return <div className={styles.tasksContainer}>{tasksList}</div>;
}

export default IncompleteTasks;
