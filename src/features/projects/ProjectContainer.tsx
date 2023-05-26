import {
  deleteProject,
  selectProjectById,
  getProjectCrudStatus,
  getProjectToBeUpdated,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { Card, IconButton, Spinner } from "../../components/UI";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import styles from "../../assets/style/projects/project.module.css";

function ProjectContainer({ id }: { id: string }) {
  const project = useAppSelector((state) => selectProjectById(state, id));
  const projectToBeUpdated = useAppSelector(getProjectToBeUpdated);
  const crudStatus = useAppSelector(getProjectCrudStatus);
  const deletingThisProject =
    projectToBeUpdated === id && crudStatus === "deleting";

  if (deletingThisProject) {
    return (
      <Card className={styles.project}>
        <Spinner type="insideContainer"></Spinner>
      </Card>
    );
  }

  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    dispatch(deleteProject(id));
  };
  return (
    <Card className={styles.project}>
      <p>{project?.title}</p>
      <div className="actions">
        <IconButton tip="Delete Project" onClick={handleOnClick}>
          <DeleteForeverOutlinedIcon className="classRed"></DeleteForeverOutlinedIcon>
        </IconButton>
      </div>
    </Card>
  );
}

export default ProjectContainer;
