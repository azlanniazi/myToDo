import {
  createSlice,
  createEntityAdapter,
  EntityState,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TaskType } from "../../types";
import store, { RootState, useAppSelector } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { toast } from "react-toastify";
import { closeCompleteTaskPrompt, closeTaskForm } from "../UISlice";
// reference

// defining type of state of tasksSlice
interface TaskSliceType {
  tasks: EntityState<TaskType>;
  currentTask: string | null;
  asyncIntervalId: NodeJS.Timer | null;
  totalDuration: number;
  totalElapsedTime: number;
  intervalId: NodeJS.Timer | null;
  updatingTaskId: null | string;
  fetchingStatus: "idle" | "fetching" | "fullfilled" | "rejected";
  error: string | null;
  crudStatus: "idle" | "pending" | "deleting";
  withoutBreak: number;
}

// creating normalized tasks data
const tasksAdapter = createEntityAdapter<TaskType>({
  selectId: (task) => task.id,
});

// adding dummy tasks to normalized tasks data
// defining initialstate of tasksSlice
const initialState: TaskSliceType = {
  tasks: tasksAdapter.getInitialState(),
  currentTask: null,
  asyncIntervalId: null,
  totalDuration: 7200000,
  updatingTaskId: null,
  totalElapsedTime: 0,
  intervalId: null,
  fetchingStatus: "idle",
  crudStatus: "idle",
  error: null,
  withoutBreak: 0,
};

// createing tasksSlice
const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    // actions which is dispatched every seconds if task is running which update elapsed time
    // of the particular task
    updateTimer(state, action: PayloadAction<{ id: string; time: number }>) {
      const { id, time } = action.payload;
      const currentTask = state.tasks.entities[id]!;
      state.withoutBreak += time;
      tasksAdapter.updateOne(state.tasks, {
        id,
        changes: { elapsedTime: currentTask.elapsedTime + time },
      });
    },
    setUpdatingTask(state, action) {
      const id = action.payload;
      state.updatingTaskId = id;
    },

    // action to set current task to running task and IntervalId to id of setInterval dispatching updateTime
    setCurrentTaskandIntervalId(
      state,
      action: PayloadAction<{
        intervalId: NodeJS.Timer;
        currentTask: string;
        asyncIntervalId: NodeJS.Timer;
      }>
    ) {
      const { intervalId, currentTask, asyncIntervalId } = action.payload;
      state.intervalId = intervalId;
      state.asyncIntervalId = asyncIntervalId;
      state.currentTask = currentTask;
    },
    stopTask(state) {
      if (state.intervalId && state.asyncIntervalId) {
        clearInterval(state.intervalId);
        clearInterval(state.asyncIntervalId);
      }
      state.withoutBreak = 0;
      state.asyncIntervalId = null;
      state.currentTask = null;
      state.intervalId = null;
    },

    resetWithoutBreak(state) {
      state.withoutBreak = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.fetchingStatus = "fetching";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const tasks = action.payload!;
        tasksAdapter.upsertMany(state.tasks, tasks);
        state.fetchingStatus = "fullfilled";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        const error = action.payload;
        state.fetchingStatus = "rejected";
      })
      .addCase(deleteTask.pending, (state) => {
        state.crudStatus = "deleting";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id } = action.payload!;
        tasksAdapter.removeOne(state.tasks, id);
        state.crudStatus = "idle";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        const error = action.payload as string;
        state.crudStatus = "idle";
        toast.error(error);
      })
      .addCase(createTask.pending, (state) => {
        state.crudStatus = "pending";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const task = action.payload!;
        tasksAdapter.addOne(state.tasks, task);
        state.crudStatus = "idle";
        toast.success("Task Created Successfully");
      })
      .addCase(createTask.rejected, (state, action) => {
        const error = action.payload as string;
        state.crudStatus = "idle";
        toast.error(error);
      })
      .addCase(updateTask.pending, (state) => {
        state.crudStatus = "pending";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, field, value } = action.payload!;
        state.crudStatus = "idle";
        state.updatingTaskId = null;
        if (field === "completed") {
          state.currentTask = null;
          if (state.intervalId) {
            clearInterval(state.intervalId);
          }
        }
        tasksAdapter.updateOne(state.tasks, {
          id,
          changes: { [field]: value },
        });
        toast.success("Updated Tasks Successfully");
      })
      .addCase(updateTask.rejected, (state, action) => {
        const error = action.payload as string;
        state.crudStatus = "idle";
        toast.error(error);
      });
  },
});

// defining Thunk functions

// defining Thunk which will dispatch an startTask action every second to update elapsedTime
export const startTask = ({ id }: { id: string }) => {
  return (dispatch: typeof store.dispatch) => {
    // defining now which is time at which asyncStartfunction was dispatched it must be outside
    // as if it is inside it will be changed at every interval to Date.now()
    let now = Date.now();
    // assgning identifer to set Interval which dispatches id of the task as well as time
    const intervalId = setInterval(() => {
      const update = Date.now();
      const time = update - now;
      dispatch(updateTimer({ id, time }));
      now = update;
    }, 1000);
    // assgning identifier to set interval which synchronise the time lapsed of any task
    // with firestore

    let asyncNow = Date.now();
    const asyncIntervalId = setInterval(async () => {
      try {
        const taskRef = doc(db, "tasks", id);
        const taskSnap = await getDoc(taskRef);
        const task = taskSnap.data()!;
        const update = Date.now() + 60000;
        const time = update - now;
        const elapsedTime = task.elapsedTime;
        const updatedTime = elapsedTime + time;
        await updateDoc(taskRef, { elapsedTime: updatedTime });
        const differniatial = Date.now() - update;
        asyncNow = update - differniatial;
      } catch (error) {
        console.log("Failed To Update Elapsed Time");
      }
    }, 60000);

    // dispatch an action to change the current task and taskIntervalId when the aysncStartTask is dispatched
    dispatch(
      setCurrentTaskandIntervalId({
        intervalId,
        currentTask: id,
        asyncIntervalId,
      })
    );
  };
};

// thunk function for fetching tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("userRef", "==", auth.currentUser?.uid));
      const tasksSnap = await getDocs(q);

      let tasks: TaskType[] = [];
      tasksSnap.forEach((taskSnap) => {
        const { title, projectId, userRef, duration, elapsedTime, completed } =
          taskSnap.data();
        return tasks.push({
          id: taskSnap.id,
          title,
          projectId,
          userRef,
          elapsedTime,
          duration,
          completed,
        });
      });
      return tasks;
    } catch (err) {
      const error = "Failed to Fetch Tasks";
      return rejectWithValue(error);
    }
  }
);

// thunk function for updating task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    {
      id,
      field,
      value,
    }: { id: string; field: string; value: number | string | boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(setUpdatingTask(id));
      if (field === "completed") dispatch(closeCompleteTaskPrompt());
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { [field]: value });

      return { id, field, value };
    } catch (error) {
      return rejectWithValue("Failed to Update Task");
    }
  }
);

// thunk function for deleting Task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setUpdatingTask(id));
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);

      return { id };
    } catch (e) {
      const error = "Failed to Delete the Task";
      return rejectWithValue(error);
    }
  }
);

// thunk function to create Task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: Omit<TaskType, "id">, { rejectWithValue, dispatch }) => {
    try {
      dispatch(closeTaskForm());
      const tasksRef = collection(db, "tasks");
      const taskSnap = await addDoc(tasksRef, taskData);
      return { ...taskData, id: taskSnap.id };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
// exporting tasksSlice Selectors
export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  tasksAdapter.getSelectors((state: RootState) => state.tasks.tasks);

// defining selectCompleteTasks , this selector will be used to select tasks which are complete
export const selectCompleteTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => task.completed === true)
);

// defining selectincomplete , this selector will be used to select tasks which are incomplete
export const selectIncompleteTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => task.completed === false)
);

//   defining selectTaskByProject selector it will return a list of task with a same ProjectId
export const selectTasksByProject = createSelector(
  selectAllTasks,
  (_: RootState, projectId: string) => projectId,
  (tasks: TaskType[], projectId: string) =>
    tasks.filter((task) => task.projectId === projectId) || null
);

// selector for getting current Task
export const getCurrentTask = (state: RootState) => state.tasks.currentTask;

// selector for getting IntervalId
export const getIntervalId = (state: RootState) => state.tasks.intervalId;

// exporting tasksSlice reducer object
export const tasksReducer = tasksSlice.reducer;

// exporting selector for total number of tasks
export const getTotalTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.length
);

// exporting selector for get total duration of all tasks
export const getTotalDuration = createSelector(selectAllTasks, (tasks) => {
  let totalDuration = 0;
  tasks.forEach((task) => (totalDuration += task.duration));
  return totalDuration;
});

// exporting selector for getting total elapsed time of all tasks
export const getTotalElapsedTime = createSelector(selectAllTasks, (tasks) => {
  let totalElapsedTime = 0;
  tasks.forEach((task) => {
    totalElapsedTime += task.elapsedTime;
  });

  return totalElapsedTime;
});
// exporting selector for getting time without break
export const getWithoutBreak = (state: RootState) => state.tasks.withoutBreak;

// exporting selector for getting task Crud Status
export const getTaskCrudStatus = (state: RootState) => state.tasks.crudStatus;

// exporting selector for getting fetching task
export const getFetchingTasks = (state: RootState) =>
  state.tasks.fetchingStatus;

// exporting selector for getting id of task to be updated
export const getUpdatingTask = (state: RootState) => state.tasks.updatingTaskId;

// exporting tasksSlice Action
export const {
  setCurrentTaskandIntervalId,
  stopTask,
  updateTimer,
  setUpdatingTask,
  resetWithoutBreak,
} = tasksSlice.actions;
