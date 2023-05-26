import { ChangeEvent, FormEvent, useReducer } from "react";
import { FieldState, FormReducerActionType, InputFieldType } from "../../types";
import { Card, Modal } from "../../components/UI";
import { createNoteFields } from "../../utils/formsData";
import Input from "../../components/UI/Input";
import {
  closeNoteForm,
  createNote,
  selectAllProjects,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { auth } from "../../firebase.config";

// defining type of state of create note form
interface CreateNoteState {
  projectId: FieldState;
  note: FieldState;
  title: FieldState;
}

// defining initial state of form Reducer function for state of create note form
const initialFormState: CreateNoteState = {
  projectId: { isValid: false, value: "-" },
  note: { isValid: false, value: "" },
  title: { isValid: false, value: "" },
};

// defining a reducer function to handle change in input fields
const formReducer = (
  state: CreateNoteState,
  action: FormReducerActionType
): CreateNoteState => {
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

// defining react Component to render form which will create Note
function CreateNote() {
  const [formData, formDispatch] = useReducer(formReducer, initialFormState);

  const projects = useAppSelector(selectAllProjects);

  // checking whether all the fields of form are valid
  const isFormValid =
    formData.note.isValid &&
    formData.projectId.isValid &&
    formData.title.isValid;

  const dispatch = useAppDispatch();
  // creating a callback function to be called in Input Component to get Event Object and isvalid
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isValid: boolean
  ): void => {
    formDispatch({
      type: "CHANGE",
      field: e.target.id,
      value: e.target.value,
      isValid,
    });
  };

  const handleOnClose = () => {
    dispatch(closeNoteForm());
  };

  // creating a callback function to handle submit event of form
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const note = formData.note.value;
    const title = formData.title.value;
    const projectId = formData.projectId.value;
    const userRef = auth.currentUser?.uid!;
    if (isFormValid) {
      dispatch(createNote({ note, title, projectId, userRef }));
    }
  };

  return (
    <Modal onClose={handleOnClose}>
      <Card className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="formTitle">Create Notes</h2>
          {Object.values(createNoteFields).map((field: InputFieldType) => {
            return (
              <Input
                options={field.type === "select" ? projects : undefined}
                key={field.id}
                {...field}
                onChange={onChange}
                value={formData[field.id as keyof CreateNoteState].value}
              ></Input>
            );
          })}
          <div className="formActions">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn" onClick={handleOnClose}>
              Close
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default CreateNote;
