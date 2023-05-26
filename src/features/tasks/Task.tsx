import {
  Card,
  IconButton,
  Spinner,
  TaskTimeTrackor,
} from "../../components/UI";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

import styles from "../../assets/style/tasks/tasks.module.css";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  startTask,
  selectTaskById,
  stopTask,
  getCurrentTask,
  getIntervalId,
  deleteTask,
  updateTask,
  getTaskCrudStatus,
  getUpdatingTask,
  setUpdatingTask,
} from "../../store/tasksSlice/tasksSlice";
import { useEffect } from "react";

// define props of Task Component
interface TaskProps {
  id: string;
}

// defining Task Component , which will render tasks
function Task({ id }: TaskProps) {
  const crudStatus = useAppSelector(getTaskCrudStatus);
  const taskToBeUpdated = useAppSelector(getUpdatingTask);

  // getting currentTaskId
  const currentTaskId = useAppSelector(getCurrentTask);

  const intervalId = useAppSelector(getIntervalId);
  const thisTaskRunning = currentTaskId === id;
  const classes = thisTaskRunning
    ? `${styles.tasks} ${styles.currentTask}`
    : styles.tasks;

  const dispatch = useAppDispatch();

  // selecting the task by its id using selectTaskbyId selector
  const task = useAppSelector((state) => selectTaskById(state, id))!;
  const deletingThisTask = taskToBeUpdated === id && crudStatus === "deleting";

  useEffect(() => {
    dispatch(setUpdatingTask(id));
  }, [taskToBeUpdated]);

  useEffect(() => {
    if (currentTaskId === task.id) {
      if (task.elapsedTime > task.duration) {
        console.log("completed");
        console.log(task.completed);
        dispatch(updateTask({ id, field: "completed", value: true }));
      }
    }
  }, [task.duration, task.elapsedTime]);

  // callback function to start task when start button is clicked
  const handleStartTask = () => {
    if (intervalId) {
      dispatch(stopTask());
    }
    dispatch(startTask({ id }));
  };

  // callback function to stop task when stop button is clicked
  const handleStopTask = () => {
    dispatch(stopTask());
  };

  // callback function to delete task when delete button is clicked
  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
  };

  // callback function to mark task as done
  const handleOnComplete = () => {
    dispatch(updateTask({ id, field: "completed", value: true }));
  };

  if (deletingThisTask) {
    return (
      <Card className={classes}>
        <Spinner type="insideContainer"></Spinner>
      </Card>
    );
  }

  return (
    <>
      <Card className={classes}>
        <div className={styles.taskTitleAndPlay}>
          <div>
            {thisTaskRunning && (
              <PlayArrowIcon
                className={
                  thisTaskRunning ? "primaryIcon classIcon" : "classIcon"
                }
                fontSize="medium"
                fontWeight="400"
              ></PlayArrowIcon>
            )}
          </div>
          <p>{task.title}</p>
        </div>
        {/* rendering elapsed time and duration of a task using TaskTimeTrackor
        component */}
        <div className={styles.taskDuration}>
          <TaskTimeTrackor time={task.duration}></TaskTimeTrackor>
          <span>/</span>
          <TaskTimeTrackor time={task.elapsedTime}></TaskTimeTrackor>
        </div>
        {/* Actions of Task */}
        <div className="actions">
          {thisTaskRunning ? (
            <IconButton
              // onMouseDown={}
              onClick={handleStopTask}
              tip="Stop Task"
            >
              <PauseOutlinedIcon className="classIcon"></PauseOutlinedIcon>
            </IconButton>
          ) : (
            <>
              <IconButton tip="Start Task" onClick={handleStartTask}>
                <PlayArrowOutlinedIcon
                  id="startTask"
                  className="classPrimary classIcon"
                  style={{ fontSize: "1.75rem" }}
                ></PlayArrowOutlinedIcon>
              </IconButton>
            </>
          )}
          <IconButton tip="Mark Done" onClick={handleOnComplete}>
            <DoneOutlinedIcon></DoneOutlinedIcon>
          </IconButton>
          <IconButton tip="Delete Task" onClick={handleDeleteTask}>
            <DeleteForeverOutlinedIcon className="classRed classIcon"></DeleteForeverOutlinedIcon>
          </IconButton>
        </div>
      </Card>
    </>
  );
}

export default Task;
