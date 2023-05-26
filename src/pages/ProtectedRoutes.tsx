import { Navigate, Outlet } from "react-router-dom";
import { CompleteTaskPrompt, Layout, Spinner } from "../components/UI";
import {
  getProjectCrudStatus,
  getCurrentNote,
  getShowNoteEditForm,
  getShowNoteForm,
  getShowNotes,
  getShowProjectForm,
  getShowSingleNotes,
  getShowTaskFrom,
  useAppSelector,
  getNoteCrudStatus,
  getTaskCrudStatus,
  getShowCompleteTaskPrompt,
} from "../store";
import CreateTask from "../features/tasks/CreateTask";
import { useAuthStatus, useGetData } from "../hooks";
import CreateProject from "../features/projects/CreateProject";
import { CreateNote } from "../features/notes";
import NoteContent from "../features/notes/NoteContent";
import EditNoteForm from "../features/notes/EditNoteForm";

function ProtectedRoutes() {
  const [isLoggedIn, checkingUserStatus] = useAuthStatus();
  const fetchingData = useGetData(isLoggedIn);
  const showTaskForm = useAppSelector(getShowTaskFrom);
  const showProjectForm = useAppSelector(getShowProjectForm);
  const showCompleteTaskPrompt = useAppSelector(getShowCompleteTaskPrompt);
  const projectCrudStatus = useAppSelector(getProjectCrudStatus);
  const noteCrudStatus = useAppSelector(getNoteCrudStatus);
  const taskCrudStatus = useAppSelector(getTaskCrudStatus);
  const showEditNoteForm = useAppSelector(getShowNoteEditForm);
  const showNoteForm = useAppSelector(getShowNoteForm);
  const showSingleNote = useAppSelector(getShowSingleNotes);
  const currentNoteId = useAppSelector(getCurrentNote);

  // load spinner while check if user is logged in
  if (checkingUserStatus) return <Spinner type="wholePage"></Spinner>;

  const pendingCRUDoperation =
    projectCrudStatus === "pending" ||
    taskCrudStatus === "pending" ||
    noteCrudStatus === "pending";
  let content;
  // load spinner if data is being fetched or crud operation is pending
  if (fetchingData) {
    content = <Spinner type="wholePage"></Spinner>;
  } else {
    // load content if there is no pending async task
    content = (
      <>
        {showTaskForm && <CreateTask></CreateTask>}
        {pendingCRUDoperation && <Spinner type="modal"></Spinner>}
        {showProjectForm && <CreateProject></CreateProject>}
        {showNoteForm && <CreateNote></CreateNote>}
        {showSingleNote && currentNoteId && (
          <NoteContent id={currentNoteId}></NoteContent>
        )}
        {showEditNoteForm && currentNoteId && (
          <EditNoteForm id={currentNoteId}></EditNoteForm>
        )}
        {showCompleteTaskPrompt && <CompleteTaskPrompt></CompleteTaskPrompt>}
        <Layout>
          <Outlet></Outlet>
        </Layout>
      </>
    );
  }
  return isLoggedIn ? content : <Navigate to={"/signin"}></Navigate>;
}

export default ProtectedRoutes;
