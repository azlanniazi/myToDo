import { useEffect, useState } from "react";
import {
  fetchNotes,
  fetchProjects,
  fetchTasks,
  getFetchingTasks,
  getNoteFetchingStatus,
  getProjectFetchingStatus,
  useAppDispatch,
  useAppSelector,
} from "../store";

export default function useGetData(isLoggedIn: boolean) {
  const dispatch = useAppDispatch();
  const projectFetchingStatus = useAppSelector(getProjectFetchingStatus);
  const taskFetchingStatus = useAppSelector(getFetchingTasks);
  const noteFetchingStatus = useAppSelector(getNoteFetchingStatus);

  const fetching =
    projectFetchingStatus === "fetching" ||
    taskFetchingStatus === "fetching" ||
    noteFetchingStatus === "fetching";

  const idle =
    projectFetchingStatus === "idle" ||
    taskFetchingStatus === "idle" ||
    noteFetchingStatus === "idle";

  useEffect(() => {
    if (isLoggedIn && idle) {
      dispatch(fetchNotes());
      dispatch(fetchProjects());
      dispatch(fetchTasks());
    }
  }, [dispatch, isLoggedIn, idle]);

  return fetching;
}
