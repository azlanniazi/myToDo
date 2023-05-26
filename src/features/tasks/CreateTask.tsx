import { ChangeEvent, FormEvent, useReducer } from "react";
import { Card, Modal } from "../../components/UI";
import Input from "../../components/UI/Input";
import { FieldState, FormReducerActionType } from "../../types";

import { createTaskFields } from "../../utils/formsData";
import DurationPicker from "./DurationPicker";
import {
  closeTaskForm,
  selectAllProjects,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { createTask } from "../../store";
import { auth } from "../../firebase.config";

interface FormStateType {
  title: FieldState;
  projectId: FieldState;
  duration: { value: number; isValid: false };
}

const initialState: FormStateType = {
  title: { value: "", isValid: false },
  projectId: { value: "-", isValid: false },
  duration: { value: 0, isValid: false },
};
const formReducer = (state: FormStateType, action: FormReducerActionType) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: { value: action.value, isValid: action.isValid },
      };

    case "RESET":
      return initialState;
    case "DURATION_CHANGE":
      return {
        ...state,
        [action.field]: { value: action.value, isValid: action.isValid },
      };
    default:
      return state;
  }
};

// createTask component to create new Tasks
function CreateTask() {
  const projects = useAppSelector(selectAllProjects);
  const [formData, formDispatch] = useReducer(formReducer, initialState);
  const dispatch = useAppDispatch();

  // checkin whether all the input fields are valid
  const isFormValid =
    formData.duration.isValid &&
    formData.projectId.isValid &&
    formData.title.isValid;

  // onChange function which will be transferred down as Prop to Input Component, to get e object , isValid value
  const onChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
    isValid: boolean
  ) => {
    formDispatch({
      type: "CHANGE",
      field: e.target.id,
      value: e.target.value,
      isValid,
    });
  };

  const handleDurationChange = (value: number, isValid: boolean) => {
    formDispatch({
      type: "DURATION_CHANGE",
      field: "duration",
      value,
      isValid,
    });
  };

  // callback function to close the form
  const handleCloseTaskForm = () => {
    dispatch(closeTaskForm());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const duration = formData.duration.value;
      const title = formData.title.value;
      const projectId = formData.projectId.value;

      const taskData = {
        duration,
        title,
        projectId,
        completed: false,
        elapsedTime: 0,
        userRef: auth.currentUser?.uid!,
      };
      dispatch(createTask(taskData));
    }
  };

  return (
    <Modal onClose={handleCloseTaskForm}>
      <Card className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="formTitle">Create Task</h2>
          <Input
            {...createTaskFields["title"]}
            onChange={onChange}
            value={formData["title"].value}
          ></Input>
          <Input
            {...createTaskFields["projectId"]}
            onChange={onChange}
            options={projects}
            value={formData["projectId"].value}
          ></Input>
          <div className="formGroup">
            <DurationPicker onChange={handleDurationChange}></DurationPicker>
          </div>
          <div className="formActions">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn" onClick={handleCloseTaskForm}>
              Close
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default CreateTask;
