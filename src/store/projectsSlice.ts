import {
  createSlice,
  EntityState,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { ProjectType } from "../types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { RootState, useAppSelector } from "./store";
import { toast } from "react-toastify";
import { setUpdatingTask } from "./tasksSlice/tasksSlice";
import { closeProjectForm } from "./UISlice";
import { Root } from "react-dom/client";

// defining type of Project Slice State
interface ProjectSliceType {
  projects: EntityState<ProjectType>;
  updatingProject: string | null;
  error: unknown | null;
  fetchingStatus: "idle" | "fetching" | "fulfilled" | "rejected";
  crudStatus: "idle" | "pending" | "deleting";
}

// creating normalized projects
const projectAdapter = createEntityAdapter<ProjectType>({
  selectId: (project) => project.id,
});

// adding dummy projects to normalized projects data
const initialProjects: EntityState<ProjectType> = projectAdapter.addMany(
  projectAdapter.getInitialState(),
  [{ id: "project1", userRef: "user1", title: "project1" }]
);
// defining initial project state
const initialState: ProjectSliceType = {
  projects: initialProjects,
  error: null,
  updatingProject: null,
  fetchingStatus: "idle",
  crudStatus: "idle",
};

// create project slice
const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState,
  reducers: {
    setUpdatingProject(state, action) {
      const { id } = action.payload;
      state.updatingProject = id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.fetchingStatus = "fetching";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        const projects = action.payload!;
        projectAdapter.upsertMany(state.projects, projects);
        state.fetchingStatus = "fulfilled";
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        const error = action.payload as string;
        state.fetchingStatus = "rejected";
        toast.error(error);
      })
      .addCase(createProject.pending, (state) => {
        state.crudStatus = "pending";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        const project = action.payload;
        state.crudStatus = "idle";
        toast.success("Project Created Successfully!");
        projectAdapter.addOne(state.projects, project);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.crudStatus = "idle";
        const err = action.payload as string;
        toast.error(err);
      })
      .addCase(deleteProject.pending, (state) => {
        state.crudStatus = "deleting";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const id = action.payload;
        state.crudStatus = "idle";
        toast.success("Deleted Project Successfully!");
        projectAdapter.removeOne(state.projects, id);
      })
      .addCase(deleteProject.rejected, (state) => {
        state.crudStatus = "idle";
        toast.error("Failed to Delete Project");
      })
      .addCase(updateProject.pending, (state) => {
        state.crudStatus = "idle";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { id, value, field } = action.payload!;
        projectAdapter.updateOne(state.projects, {
          id,
          changes: { [field]: value },
        });
        state.fetchingStatus = "fulfilled";
        toast.success("Update Project Successfully");
      })
      .addCase(updateProject.rejected, (state, action) => {
        const error = action.payload as string;
        state.crudStatus = "idle";
        toast.error(error);
      });
  },
});

// defining a thunk for fetching projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const projectsRef = collection(db, "projects");
      const q = query(
        projectsRef,
        where("userRef", "==", auth.currentUser?.uid)
      );
      const projectsSnap = await getDocs(q);
      let projects: ProjectType[] = [];
      projectsSnap.forEach((doc) => {
        const { title, userRef } = doc.data();
        return projects.push({ title, userRef, id: doc.id });
      });
      return projects;
    } catch (err) {
      const error = "Failed to Fetch Project";
      return rejectWithValue(error);
    }
  }
);

// thunk for creating a project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (
    projectData: Omit<ProjectType, "id">,
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(closeProjectForm());
      const projectsRef = collection(db, "projects");
      const projectSnap = await addDoc(projectsRef, projectData);
      return { ...projectData, id: projectSnap.id };
    } catch (error) {
      const err = "Failed to Create Project";
      return rejectWithValue(err);
    }
  }
);

// thunk for deleting a project
export const deleteProject = createAsyncThunk(
  "project/deleteproject",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setUpdatingProject({ id }));
      const taskRef = doc(db, "projects", id);
      await deleteDoc(taskRef);

      return id;
    } catch (err) {
      const error = "Failed to Delete Project";
      return rejectWithValue(error);
    }
  }
);

// thunk function for updating projects
export const updateProject = createAsyncThunk(
  "projects/update",
  async (
    {
      id,
      field,
      value,
    }: { id: string; field: string; value: string | boolean | number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(setUpdatingProject(id));

      const projectsRef = doc(db, "projects", id);
      await updateDoc(projectsRef, { [field]: value });

      return { id, field, value };
    } catch (err) {
      const error = "Failed To Update Project";
      return rejectWithValue(error);
    }
  }
);

// exporting actions of projectsSlice
export const { setUpdatingProject } = projectsSlice.actions;

// exporting selector for getting project crud status
export const getProjectCrudStatus = (state: RootState) =>
  state.projects.crudStatus;

// exporting selector for getting project fetching status
export const getProjectFetchingStatus = (state: RootState) =>
  state.projects.fetchingStatus;

// exporting selector for project Entity Adapter
export const { selectAll: selectAllProjects, selectById: selectProjectById } =
  projectAdapter.getSelectors((state: RootState) => state.projects.projects);

// exporting selector for getting Project to be updated or deleted
export const getProjectToBeUpdated = (state: RootState) =>
  state.projects.updatingProject;

// exporting reducer object of projectsSlice
export default projectsSlice.reducer;
