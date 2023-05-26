import styles from "../assets/style/projects/project.module.css";
import ProjectContainer from "../features/projects/ProjectContainer";

import {
  getProjectCrudStatus,
  getProjectToBeUpdated,
  selectAllProjects,
  useAppSelector,
} from "../store";

function ManageProjects() {
  const projects = useAppSelector(selectAllProjects);
  const projectsList = projects.map((project) => (
    <ProjectContainer key={project.id} id={project.id}></ProjectContainer>
    ));
    
     
  return (
    <div className="content gap-1">
      <h3 className="title">Manage Projects</h3>
      <div className={styles.projectList}>{projectsList}</div>
    </div>
  );
}

export default ManageProjects;
