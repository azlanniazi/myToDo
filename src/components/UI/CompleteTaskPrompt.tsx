import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import Modal from "./Modal";
import Card from "./Card";
import {
  closeCompleteTaskPrompt,
  getCurrentTask,
  selectTaskById,
  updateTask,
  useAppDispatch,
  useAppSelector,
} from "../../store";

function CompleteTaskPrompt() {
  const currentTaskId = useAppSelector(getCurrentTask)!;
  const dispatch = useAppDispatch();
  const handleOnClose = () => {
    dispatch(closeCompleteTaskPrompt());
  };

  const handleOnMarkComplete = () => {
    dispatch(
      updateTask({ id: currentTaskId, field: "completed", value: true })
    );
  };
  return (
    <Modal onClose={handleOnClose}>
      <Card className={"prompt"}>
        <h3>The allotted time for the task has expired.</h3>
        <div className="actions">
          <button className="btn" onClick={handleOnMarkComplete}>
            <DoneOutlinedIcon></DoneOutlinedIcon>
            Mark Done
          </button>
          <button className="btn" onClick={handleOnClose}>
            <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
            Continue
          </button>
        </div>
      </Card>
    </Modal>
  );
}

export default CompleteTaskPrompt;
