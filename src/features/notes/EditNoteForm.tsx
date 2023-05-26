import { ChangeEvent, FormEvent, useReducer } from "react";
import styles from "../../assets/style/notes/noteContent.module.css";
import { Card, Input, Modal } from "../../components/UI";
import {
  closeEditNoteForm,
  selectNotesbyId,
  updateNote,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { FormReducerActionType } from "../../types";

interface EditNoteForm {
  id: string;
}

interface FormState {
  content: { isValid: boolean; value: string };
}

// Reducer function
const formReducer = (state: FormState, action: FormReducerActionType) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: { isValid: action.isValid, value: action.value },
      };
    case "RESET":
      return {
        content: { isValid: true, value: "" },
      };
    default:
      return state;
  }
};

function EditNoteForm({ id }: EditNoteForm) {
  const note = useAppSelector((state) => selectNotesbyId(state, id))!;
  const initialState = { content: { isValid: true, value: note.note } };
  const [formData, formDispatch] = useReducer(formReducer, initialState);

  const dispatch = useAppDispatch();
  const handleOncClose = () => {
    dispatch(closeEditNoteForm());
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isValid: boolean
  ): void => {
    formDispatch({
      type: "CHANGE",
      field: e.target.id,
      isValid,
      value: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValid = formData.content.isValid;
    if (formValid) {
      dispatch(
        updateNote({ id, field: "note", value: formData.content.value })
      );
    }
  };
  return (
    <Modal onClose={handleOncClose}>
      <Card className={styles.noteContent}>
        <div className={styles.noteTitle}>
          <CloseOutlinedIcon
            onClick={handleOncClose}
            className="classIcon"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              fontSize: "1.25rem",
            }}
          ></CloseOutlinedIcon>
          <p>{note.title}</p>
          <div className={styles.noteActions}>
            <DeleteForeverOutlinedIcon
              className="classRed classIcon"
              fill="#e35284"
            ></DeleteForeverOutlinedIcon>
          </div>
        </div>
        <form className="noteForm" onSubmit={handleOnSubmit}>
          <div className={styles.content}>
            <Input
              edit={true}
              id="content"
              label="Content"
              type="textarea"
              error="Enter Note"
              pattern={/.{1,}/}
              value={formData["content"].value}
              onChange={handleOnChange}
            ></Input>
            <div className="formActions">
              <button className="btn" type="submit" onClick={handleOncClose}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditNoteForm;
