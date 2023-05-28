import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { NoteType } from "../types";
import { RootState } from "./store";
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
import { toast } from "react-toastify";
import { closeEditNoteForm, closeNoteForm, openSingleNote } from "./UISlice";

// defining state type of noteSlice
interface NoteSliceState {
  notes: EntityState<NoteType>;
  currentNote: null | string;
  fetchingStatus: "idle" | "fetching" | "fulfilled" | "rejected";
  crudStatus: "idle" | "pending" | "deleting";
  error: unknown | null;
}

// creating normalized data strucutre for storing notes by using createEntityAdapter
const notesAdapter = createEntityAdapter<NoteType>();
// Dummy notes
const DUMMY_NOTES: NoteType[] = [
  {
    projectId: "task1",
    id: "note1",
    note: "this is test note1",
    userRef: "user1",
    title: "Note1",
  },
];

// defining a initial state of noteslice
const initialState: NoteSliceState = {
  notes: notesAdapter.getInitialState(),
  fetchingStatus: "idle",
  crudStatus: "idle",
  currentNote: null,
  error: null,
};

// create a note slice to handle state related with notes
const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setCurrentNote(state, action) {
      const id = action.payload;
      state.currentNote = id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.fetchingStatus = "fetching";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        const notes = action.payload;
        notesAdapter.upsertMany(state.notes, notes);
        state.fetchingStatus = "fulfilled";
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.fetchingStatus = "rejected";
      })
      .addCase(createNote.pending, (state) => {
        state.crudStatus = "pending";
      })
      .addCase(createNote.fulfilled, (state, action) => {
        const note = action.payload;
        notesAdapter.addOne(state.notes, note);
        state.crudStatus = "idle";
        toast.success("Note Created Successfully");
      })
      .addCase(createNote.rejected, (state, action) => {
        state.crudStatus = "idle";
        const error = action.error as string;
        toast.error(error);
      })
      .addCase(deleteNote.pending, (state, action) => {
        state.crudStatus = "deleting";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const { id } = action.payload!;
        notesAdapter.removeOne(state.notes, id);
        toast.success("Note Deleted Successfully");
      })
      .addCase(deleteNote.rejected, (state, action) => {
        const error = action.payload as string;
        toast.error(error);
      })
      .addCase(updateNote.pending, (state) => {
        state.crudStatus = "pending";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { id, field, value } = action.payload!;
        notesAdapter.updateOne(state.notes, {
          id,
          changes: { [field]: value },
        });
        state.crudStatus = "idle";
        toast.success("Updated Note Successfully!");
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.crudStatus = "idle";
        const error = action.payload as string;
        toast.error(error);
      });
  },
});

// defining a thunk for fetching notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const notesRef = collection(db, "notes");
      const q = query(notesRef, where("userRef", "==", auth.currentUser?.uid!));
      const notesSnap = await getDocs(q);
      let notes: NoteType[] = [];
      notesSnap.forEach((doc) => {
        const { note, userRef, title, projectId } = doc.data();

        return notes.push({ id: doc.id, note, userRef, title, projectId });
      });
      return notes;
    } catch (error) {
      return rejectWithValue("Failed to Fetched Notes");
    }
  }
);
// defining a thunk for creating notes
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData: Omit<NoteType, "id">, { rejectWithValue, dispatch }) => {
    try {
      dispatch(closeNoteForm());
      const notesRef = collection(db, "notes");
      const noteSnap = await addDoc(notesRef, noteData);

      return { ...noteData, id: noteSnap.id };
    } catch (error) {
      return rejectWithValue("failed to create Note");
    }
  }
);

// defining a thunk for updating notes
export const updateNote = createAsyncThunk(
  "notes/updatenote",
  async (
    {
      id,
      field,
      value,
    }: { id: string; field: string; value: string | boolean | number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(closeEditNoteForm());
      dispatch(openSingleNote(id));
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, { [field]: value });
      return { id, field, value };
    } catch (err) {
      console.log(err);
      const error = "Failed to Update Note";

      return rejectWithValue(error);
    }
  }
);

// defining a thunk function to delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setCurrentNote(id));
      const taskRef = doc(db, "notes", id);
      await deleteDoc(taskRef);
      return { id };
    } catch (error) {
      const err = "Failed to delete Note";
      return rejectWithValue(err);
    }
  }
);

// exporting note slice selector
export const { selectAll: selectAllNotes, selectById: selectNotesbyId } =
  notesAdapter.getSelectors((state: RootState) => state.note.notes);

export const selectNoteByTask = createSelector(
  selectAllNotes,
  (_: RootState, projectId: string) => projectId,
  (notes, projectId) => notes.filter((note) => note.projectId === projectId)
);

// exporting selector for getting note Crud Status
export const getNoteCrudStatus = (state: RootState) => state.note.crudStatus;

// exporting selector for getting fetching task status
export const getNoteFetchingStatus = (state: RootState) =>
  state.note.fetchingStatus;

// exporting selector for getting id of note to be updated
export const getUpdatingNote = (state: RootState) => state.note.currentNote;

// exporting note slice actions
export const { setCurrentNote } = noteSlice.actions;

// exporting note slice reducer objects
export default noteSlice.reducer;
