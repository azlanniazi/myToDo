import { createSlice } from "@reduxjs/toolkit";
import { useActionData } from "react-router-dom";
import { RootState } from "./store";

// defining UISlice state Interface
interface UISliceState {
  showCompleteTaskPrompt: boolean;
  currentNoteId: string | null;
  showNoteForm: boolean;
  showTaskForm: boolean;
  showProjectForm: boolean;
  showNotes: boolean;
  showSingleNote: boolean;
  showEditNoteForm: boolean;
  showMobileMenu: boolean;
}

// defining initial state of UISlice
const initialState: UISliceState = {
  showCompleteTaskPrompt: false,
  currentNoteId: null,
  showNoteForm: false,
  showNotes: false,
  showProjectForm: false,
  showTaskForm: false,
  showSingleNote: false,
  showEditNoteForm: false,
  showMobileMenu: false,
};

// creating UIslice
const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    openTaskForm(state) {
      state.showTaskForm = true;
    },
    openCompleteTaskPrompt(state) {
      state.showCompleteTaskPrompt = true;
    },
    closeCompleteTaskPrompt(state) {
      state.showCompleteTaskPrompt = false;
    },

    openProjectForm(state) {
      state.showProjectForm = true;
    },
    openNoteForm(state) {
      state.showNoteForm = true;
    },
    openNotes(state) {
      state.showNotes = true;
    },
    closeNotes(state) {
      state.showNotes = false;
    },
    closeNoteForm(state) {
      state.showNoteForm = false;
    },
    closeTaskForm(state) {
      state.showTaskForm = false;
    },
    closeProjectForm(state) {
      state.showProjectForm = false;
    },
    openSingleNote(state, action) {
      const { id } = action.payload;
      state.showSingleNote = true;
      state.currentNoteId = id;
    },
    closeSingleNote(state) {
      state.showSingleNote = false;
      state.currentNoteId = null;
    },
    openEditNoteForm(state, action) {
      const { id } = action.payload;
      state.currentNoteId = id;
      state.showEditNoteForm = true;
    },
    closeEditNoteForm(state) {
      state.showEditNoteForm = false;
    },
    openMobileMenu(state) {
      state.showMobileMenu = true;
    },
    closeMobileMenu(state) {
      state.showMobileMenu = false;
    },
  },
});

// exporting selectors
export const getShowNoteForm = (state: RootState) => state.UI.showNoteForm;
export const getShowProjectForm = (state: RootState) =>
  state.UI.showProjectForm;
export const getShowTaskFrom = (state: RootState) => state.UI.showTaskForm;
export const getShowMobileNav = (state: RootState) => state.UI.showMobileMenu;
export const getShowNotes = (state: RootState) => state.UI.showNotes;
export const getShowSingleNotes = (state: RootState) => state.UI.showSingleNote;
export const getCurrentNote = (state: RootState) => state.UI.currentNoteId;
export const getShowNoteEditForm = (state: RootState) =>
  state.UI.showEditNoteForm;

export const getShowCompleteTaskPrompt = (state: RootState) =>
  state.UI.showCompleteTaskPrompt;
// export UIslice actions
export const {
  openNoteForm,
  openNotes,
  openEditNoteForm,
  openMobileMenu,
  openProjectForm,
  openTaskForm,
  closeNoteForm,
  closeCompleteTaskPrompt,
  openCompleteTaskPrompt,
  closeMobileMenu,
  closeNotes,
  closeProjectForm,
  closeTaskForm,
  openSingleNote,
  closeSingleNote,
  closeEditNoteForm,
} = UISlice.actions;

// export UISlice reducers object
export default UISlice.reducer;
