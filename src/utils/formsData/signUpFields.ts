import { InputFieldType } from "../../types";

// defining interface of signUpFields
interface SignUpFieldsType {
  email: InputFieldType;
  password: InputFieldType;
  password2: InputFieldType;
  userName: InputFieldType;
}

const signUpFields: SignUpFieldsType = {
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
    label: "Password:",
  },
  password2: {
    id: "password2",
    type: "password",
    error: "Password do not match!",
    label: "Confirm Password:",
  },
  userName: {
    id: "userName",
    type: "text",
    error:
      "User Name must be 5-16 characters long and contain only alphanumeric characters and spaces",
    pattern: /^(?=[a-zA-Z0-9]{5,16}$)[a-zA-Z0-9\s]*$/,
    label: "User Name:",
  },
};

export default signUpFields;
