import styles from "../../assets/style/UI/navBar.module.css";
import {
  getCurrentTask,
  openMobileMenu,
  selectTaskById,
  openTaskForm,
  useAppDispatch,
  useAppSelector,
  openNotes,
} from "../../store";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import IconButton from "./IconButton";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// Defining NavBar component to render Navbar
const NavBar = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentTaskId = useAppSelector(getCurrentTask);

  // function that handles opening and closing of create Task Form
  const handleShowTaskForm = () => {
    dispatch(openTaskForm());
  };

  const handleOnOpenMenu = () => {
    dispatch(openMobileMenu());
  };

  const handleOpenNote = () => {
    dispatch(openNotes());
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/signin");
  };
  return (
    <nav className={styles.mainNav}>
      <div className={styles.hamburger}>
        <IconButton
          tip="Open Menu"
          onClick={handleOnOpenMenu}
          style={{ right: "-300%" }}
        >
          <MenuOutlinedIcon></MenuOutlinedIcon>
        </IconButton>
      </div>
      <h1>Logo</h1>
      <div className={styles.navLinks}>
        <div className={styles.taskStatus}>
          {currentTaskId ? (
            <TaskRunning id={currentTaskId}></TaskRunning>
          ) : (
            <PlayCircleFilledOutlinedIcon
              style={{ fontSize: "2.5rem" }}
              className={`primaryIcon`}
            ></PlayCircleFilledOutlinedIcon>
          )}
        </div>
        <IconButton tip="Add Task" onClick={handleShowTaskForm}>
          <AddOutlinedIcon></AddOutlinedIcon>
        </IconButton>
        <IconButton onClick={handleOpenNote} tip="Open Notes">
          <SpeakerNotesOutlinedIcon></SpeakerNotesOutlinedIcon>
        </IconButton>
        <IconButton tip="Log Out" onClick={handleLogout}>
          <LogoutOutlinedIcon></LogoutOutlinedIcon>
        </IconButton>
      </div>
    </nav>
  );
};
export default NavBar;

function TaskRunning({ id }: { id: string }) {
  const task = useAppSelector((state) => selectTaskById(state, id));
  return (
    <div className={styles.taskRunning}>
      <div className={styles.taskRunningTitle}>
        <span>{task?.title}</span>
      </div>
      <PauseCircleFilledOutlinedIcon
        style={{ fontSize: "2.5rem", zIndex: "2", color: "#6d28d9" }}
      ></PauseCircleFilledOutlinedIcon>
    </div>
  );
}
