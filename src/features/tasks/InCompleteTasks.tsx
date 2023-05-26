import { useAppSelector } from "../../store";
import { selectIncompleteTasks } from "../../store";
import classes from "../../assets/style/tasks/tasksContainer.module.css";
import Task from "./Task";
// defining IncompleteTasks component , which will render incomplete Tasks
function IncompleteTasks() {
  const tasks = useAppSelector(selectIncompleteTasks);

  // map through the task to create Task component for each task object
  const tasksList = tasks.map((task) => (
    <Task key={task.id} id={task.id}></Task>
  ));
  return <div className={classes.tasksContainer}>{tasksList}</div>;
}

export default IncompleteTasks;
