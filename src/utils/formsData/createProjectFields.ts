import { InputFieldType } from "../../types";

// defining createProjectFields type
interface CreateProjectFieldsType {
  title: InputFieldType;
}

// create createProjectFields
const createProjectFields: CreateProjectFieldsType = {
  title: {
    id: "title",
    type: "text",
    error:
      "Title must be 5-16 characters long and contain only alphanumeric characters and spaces",
    pattern: /^(?=[a-zA-Z0-9\s]{4,16}$)[a-zA-Z0-9\s]*$/,

    label: "Project Title:",
  },
};

export default createProjectFields;
