import { ChangeEvent, FormEvent, useReducer } from "react";
import { Card, Modal } from "../../components/UI";
import { FieldState, FormReducerActionType, InputFieldType } from "../../types";
import { createProjectFields } from "../../utils/formsData";
import Input from "../../components/UI/Input";
import {
  closeProjectForm,
  createProject,
  useAppDispatch,
} from "../../store";
import { auth } from "../../firebase.config";

// defining types of create Project State
interface FormStateType {
  title: FieldState;
}

// defining initial state
const initialFormState: FormStateType = {
  title: { value: "", isValid: false },
};

// defining form Reducer function to manage state of create Note Form Component
const formReducer = (
  state: FormStateType,
  action: FormReducerActionType
): FormStateType => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: { value: action.value, isValid: action.isValid },
      };
    case "RESET": {
      return initialFormState;
    }
    default: {
      return state;
    }
  }
};

function CreateProject() {
  const [formData, formDispatch] = useReducer(formReducer, initialFormState);

  const dispatch = useAppDispatch();

  // checking whether form data is valid
  const isFormValid = formData.title.isValid;

  // defining callback function onChange to passed as prop to be called in Input Component so that Input Component can pass on Event Object and isValid
  const onChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>,
    isValid: boolean
  ): void => {
    formDispatch({
      type: "CHANGE",
      field: e.target.id,
      value: e.target.value,
      isValid,
    });
  };

  const handleCloseProjectForm = () => {
    dispatch(closeProjectForm());
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const title = formData.title.value;
    const userRef = auth.currentUser?.uid!;
    if (isFormValid) {
      console.log("submit");
      dispatch(createProject({ title, userRef }));
      formDispatch({ type: "RESET" });
    }
  };

  return (
    <Modal onClose={handleCloseProjectForm}>
      <Card className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="formTitle">Create Project</h2>
          {Object.values(createProjectFields).map((field: InputFieldType) => (
            <Input
              key={field.id}
              {...field}
              onChange={onChange}
              value={formData[field.id as keyof FormStateType].value}
            ></Input>
          ))}
          <div className="formActions">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn" onClick={handleCloseProjectForm}>
              Close
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default CreateProject;
