import { configureStore } from "@reduxjs/toolkit";
import { UIReducer, projectReducer, tasksReducer } from ".";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { notesReducer } from ".";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    UI: UIReducer,
    projects: projectReducer,
    note: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
