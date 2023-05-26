import { Link, useLocation } from "react-router-dom";
import styles from "../../assets/style/UI/sideBar.module.css";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import {
  selectAllProjects,
  openProjectForm,
  useAppDispatch,
  useAppSelector,
  selectAllTasks,
} from "../../store";
import { closeMobileMenu, getShowMobileNav } from "../../store/UISlice";
import IconButton from "./IconButton";

const SideBar = function () {
  const totalTasks = useAppSelector(selectAllTasks).length;
  const showMobileNav = useAppSelector(getShowMobileNav);
  const className = showMobileNav
    ? `${styles.sideBar} showMobileNav`
    : `${styles.sideBar}`;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const handleShowProjectForm = () => {
    dispatch(openProjectForm());
  };
  const pathMatchRoute = (route: string) => {
    if (route === location.pathname) {
      return true;
    }
  };
  const projects = useAppSelector(selectAllProjects);

  const handleCloseSidebar = () => {
    dispatch(closeMobileMenu());
  };
  return (
    <div className={className} style={showMobileNav ? { display: "flex" } : {}}>
      <div className={styles.closeSideBar}>
        <IconButton onClick={handleCloseSidebar} tip="Close Sidebar">
          <CloseOutlinedIcon></CloseOutlinedIcon>
        </IconButton>
      </div>
      <div className={`${styles.timeline} ${styles.sideBarChild}`}>
        <Link to={"./"} className={styles.today}>
          <CalendarTodayOutlinedIcon></CalendarTodayOutlinedIcon> Total Tasks
          <p>{totalTasks}</p>
        </Link>
      </div>
      <div className={`${styles.projectLinks} ${styles.sideBarChild}`}>
        <h3>Projects</h3>
        <button className="btn actionBtn" onClick={handleShowProjectForm}>
          <AddOutlinedIcon fontWeight={300} fontSize="small"></AddOutlinedIcon>
          Create Project
        </button>
        <Link to={"projects"} className="btn actionBtn">
          <FormatListNumberedOutlinedIcon
            className={pathMatchRoute("/projects") ? "primaryIcon" : undefined}
            fontWeight={300}
            fontSize="medium"
          ></FormatListNumberedOutlinedIcon>
          ManageProjects
        </Link>
        {projects.map((project) => (
          <Link
            key={project.id}
            className="btn actionBtn"
            to={`projects/${project.id}`}
          >
            <ListOutlinedIcon
              className={
                pathMatchRoute(`/projects/${project.id}`)
                  ? "primaryIcon"
                  : undefined
              }
              fontSize="medium"
              fontWeight="300"
            ></ListOutlinedIcon>
            {project.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SideBar;
