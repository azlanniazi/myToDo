import styles from "../../assets/style/notes/notes.module.css";
import { IconButton } from "../../components/UI";
import {
  selectAllNotes,
  openNoteForm,
  useAppDispatch,
  useAppSelector,
  closeNotes,
} from "../../store";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Note from "./Note";

function Notes() {
  const notes = useAppSelector(selectAllNotes);
  const dispatch = useAppDispatch();
  const noteList = notes.map((note) => {
    return <Note key={note.id} id={note.id}></Note>;
  });
  const handleShowCreateNote = () => {
    dispatch(openNoteForm());
  };

  const handleCloseNotes = () => {
    dispatch(closeNotes());
  };

  return (
    <div className={styles.notes}>
      <div className={styles.closeNotes}>
        <IconButton onClick={handleCloseNotes} tip="Close Sidebar">
          <CloseOutlinedIcon></CloseOutlinedIcon>
        </IconButton>
      </div>
      Notes
      <button className="btn" onClick={handleShowCreateNote}>
        Add new Note
      </button>
      <div className={styles.notesContainer}>{noteList}</div>
    </div>
  );
}

export default Notes;
