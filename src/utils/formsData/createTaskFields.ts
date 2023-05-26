import { InputFieldType } from "../../types";

// defining interface for the Form of create Task
interface CreateTaskFormType {
  title: InputFieldType;
  projectId: InputFieldType;
  duration: InputFieldType;
}

// defining fields of form of create Task

const createTaskFields: CreateTaskFormType = {
  title: {
    label: "Task Title:",
    id: "title",
    error:
      "Title of Task must contain 5 - 16 letters, Title can include white spaces and numbers. Special characters are not allowed",
    pattern: /^(?=[a-zA-Z0-9\s]{4,16}$)[a-zA-Z0-9\s]*$/,
    type: "text",
  },
  duration: {
    label: "duration:",
    id: "duration",
    error: "duration of a task must be atleast 5 minutes",
    pattern: "s",
    type: "number",
  },
  projectId: {
    label: "Project Name:",
    id: "projectId",
    error: "Select a project",
    pattern: /^[^-]*$/,
    type: "select",
  },
};

export default createTaskFields;
