import { useParams } from "react-router-dom";
import styles from "../assets/style/tasks/tasksContainer.module.css";

import {
  selectProjectById,
  selectTasksByProject,
  useAppSelector,
} from "../store";
import { Task } from "../features/tasks";

function Project() {
  const params = useParams();
  const projectId = params.projectId!;

  const project = useAppSelector((state) =>
    selectProjectById(state, projectId)
  );

  const tasks = useAppSelector((state) =>
    selectTasksByProject(state, projectId)
  );
  const tasksList = tasks.map((task) => (
    <Task key={task.id} id={task.id}></Task>
  ));

  return (
    <div className="content">
      <h3 className="title">{project?.title}</h3>
      <div className={styles.tasksContainer}>{tasksList}</div>;
    </div>
  );
}

export default Project;
