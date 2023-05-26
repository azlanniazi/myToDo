// exports from tasksSlice
export {
  tasksReducer,
  startTask,
  getTotalDuration,
  getTotalTasks,
  getTotalElapsedTime,
  stopTask,
  getCurrentTask,
  selectTasksByProject,
  selectAllTasks,
  selectCompleteTasks,
  selectIncompleteTasks,
  getFetchingTasks,
  selectTaskById,
  getTaskCrudStatus,
  getWithoutBreak,
  getIntervalId,
  setCurrentTaskandIntervalId,
  updateTimer,
  getUpdatingTask,
  fetchTasks,
  setUpdatingTask,
  deleteTask,
  createTask,
  updateTask,
} from "./tasksSlice/tasksSlice";

// exports from projectsSlice
export {
  default as projectReducer,
  setUpdatingProject,
  selectAllProjects,
  getProjectCrudStatus,
  getProjectFetchingStatus,
  selectProjectById,
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
  getProjectToBeUpdated,
} from "./projectsSlice";

// exports from UIslice
export {
  default as UIReducer,
  openNoteForm,
  openMobileMenu,
  closeMobileMenu,
  getShowMobileNav,
  openNotes,
  openProjectForm,
  openTaskForm,
  closeNoteForm,
  closeNotes,
  closeProjectForm,
  closeTaskForm,
  getShowCompleteTaskPrompt,
  openCompleteTaskPrompt,
  closeCompleteTaskPrompt,
  getShowNoteForm,
  getShowNotes,
  getShowProjectForm,
  getShowTaskFrom,
  openSingleNote,
  getCurrentNote,
  closeSingleNote,
  getShowSingleNotes,
  getShowNoteEditForm,
  openEditNoteForm,
  closeEditNoteForm,
} from "./UISlice";

export {
  default as notesReducer,
  createNote,
  getUpdatingNote,
  setCurrentNote,
  fetchNotes,
  deleteNote,
  getNoteFetchingStatus,
  updateNote,
  getNoteCrudStatus,
  selectAllNotes,
  selectNoteByTask,
  selectNotesbyId,
} from "./noteSlice";

// exports from store
export { default as store, useAppDispatch, useAppSelector } from "./store";
export type { RootState } from "./store";
