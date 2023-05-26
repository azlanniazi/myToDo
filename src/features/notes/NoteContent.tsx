import styles from "../../assets/style/notes/noteContent.module.css";
import { Card, Modal } from "../../components/UI";
import { selectNotesbyId, useAppDispatch, useAppSelector } from "../../store";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { closeSingleNote } from "../../store";
import { useState } from "react";

interface NoteContentProps {
  id: string;
}

function NoteContent({ id }: NoteContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const note = useAppSelector((state) => selectNotesbyId(state, id))!;
  const dispatch = useAppDispatch();
  const handleOncClose = () => {
    dispatch(closeSingleNote());
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
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
            <BorderColorOutlinedIcon
              onClick={onEdit}
              className="classIcon"
            ></BorderColorOutlinedIcon>

            <DeleteForeverOutlinedIcon
              className="classRed classIcon"
              fill="#e35284"
            ></DeleteForeverOutlinedIcon>
          </div>
        </div>
        <form className="noteForm">
          <div className={styles.content}>
            <label>Note: </label>
            <textarea
              style={{ height: "20rem", width: "100%" }}
              value={note.note}
              disabled={!isEditing}
            ></textarea>
            {isEditing && (
              <div className="formActions">
                <button className="btn" onClick={onCancelEdit}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default NoteContent;
