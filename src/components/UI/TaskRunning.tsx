import { selectTaskById, useAppSelector } from "../../store";

function TaskRunning({ id }: { id: string }) {
  const task = useAppSelector((state) => selectTaskById(state, id));
  return;
}

export default TaskRunning;
