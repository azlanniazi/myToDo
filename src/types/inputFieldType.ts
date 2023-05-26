import NoteType from "./noteType";
import ProjectType from "./projectType";
import TaskType from "./taskType";

// defining type of data Input Fields could get
interface InputFieldType {
  id: string;
  pattern?: RegExp | string;
  label: string;
  type: "text" | "textarea" | "email" | "password" | "number" | "select";
  error: string;
  options?: TaskType[] | ProjectType[] | NoteType[];
}
export default InputFieldType;
