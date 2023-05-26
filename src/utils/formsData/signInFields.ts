import { InputFieldType } from "../../types";

// defining interface of signInFields
interface SignInFieldsType {
  email: InputFieldType;
  password: InputFieldType;
}

const signInFields: SignInFieldsType = {
  email: {
    id: "email",
    type: "text",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    label: "Email:",
    error: "Enter a valid email address",
  },
  password: {
    id: "password",
    type: "password",
    pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s]{6,}$/,
    error:
      '"Password must be at least 6 characters long and contain at least one uppercase letter and one number. Special characters are not allowed.',
    label: "Password",
  },
};

export default signInFields;
