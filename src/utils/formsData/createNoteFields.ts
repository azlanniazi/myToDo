import { InputFieldType } from "../../types";

// defining createNotes Fields type
interface CreateNoteFieldsType {
  projectId: InputFieldType;
  title: InputFieldType;
  note: InputFieldType;
}

// creating CreateNoteFields Object
const createNoteFields: CreateNoteFieldsType = {
  projectId: {
    type: "select",
    id: "projectId",
    pattern: /.{1,}/,
    error: "Please choose a project for which you would like to create notes.",
    label: "Select Project:",
  },
  title: {
    id: "title",
    type: "text",
    error:
      "Title must be 5-16 characters long and contain only alphanumeric characters and spaces",
    pattern: /^(?=[a-zA-Z0-9\s]{4,16}$)[a-zA-Z0-9\s]*$/,
    label: "Note Title:",
  },
  note: {
    id: "note",
    type: "textarea",
    pattern: /.*/,
    error: "",
    label: "Note:",
  },
};

export default createNoteFields;
