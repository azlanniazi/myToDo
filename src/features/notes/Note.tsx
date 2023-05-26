import { Card, IconButton, Spinner, Tooltip } from "../../components/UI";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import styles from "../../assets/style/notes/note.module.css";
import {
  deleteNote,
  getNoteCrudStatus,
  getUpdatingNote,
  selectNotesbyId,
  selectProjectById,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { openEditNoteForm, openSingleNote } from "../../store/UISlice";

interface NoteProp {
  id: string;
}

function Note({ id }: NoteProp) {
  const note = useAppSelector((state) => selectNotesbyId(state, id))!;
  const crudStatus = useAppSelector(getNoteCrudStatus);
  const dispatch = useAppDispatch();

  const noteToBeUpdated = useAppSelector(getUpdatingNote);
  const thisNoteDeleted = noteToBeUpdated === id && crudStatus === "deleting";
  if (thisNoteDeleted) {
    return (
      <Card className={styles.note}>
        <Spinner type="insideContainer"></Spinner>
      </Card>
    );
  }
  const handleOnClick = () => {
    dispatch(openSingleNote({ id }));
  };

  const handleOnEdit = () => {
    dispatch(openEditNoteForm({ id }));
  };

  const handleOnDelete = () => {
    dispatch(deleteNote(id));
  };
  return (
    <Card className={styles.note}>
      <div className={styles.noteTitle} onClick={handleOnClick}>
        <TextSnippetIcon
          data-tip=""
          style={{ fontSize: "1.125rem" }}
        ></TextSnippetIcon>
        <p>{note.title}</p>
      </div>
      <div className={styles.noteActions}>
        <IconButton tip="Edit Note" onClick={handleOnEdit}>
          <BorderColorOutlinedIcon
            style={{ fontSize: "1.125rem", color: "#4c1d95" }}
            className="classIcon"
          ></BorderColorOutlinedIcon>
        </IconButton>
        <IconButton tip="Delete Note" onClick={handleOnDelete}>
          <DeleteForeverOutlinedIcon
            className="classRed classIcon"
            style={{ fontSize: "1.125rem" }}
          ></DeleteForeverOutlinedIcon>
        </IconButton>
      </div>
    </Card>
  );
}

export default Note;
