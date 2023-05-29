import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { Card, Spinner } from "../../components/UI";
import Input from "../../components/UI/Input";
import { FieldState, FormReducerActionType, InputFieldType } from "../../types";
import { signUpFields } from "../../utils/formsData";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createProject, useAppDispatch } from "../../store";
// defining interface of state of signup form
interface signUpStateType {
  email: FieldState;
  password: FieldState;
  password2: FieldState;
  userName: FieldState;
}

// defining initial state for input fields of signup Form
const initialFormState: signUpStateType = {
  email: { isValid: false, value: "" },
  password2: { isValid: false, value: "" },
  password: { isValid: false, value: "" },
  userName: { isValid: false, value: "" },
};

// createing Reducer function to manage the form state and check validation
const formReducer = (
  state: signUpStateType,
  action: FormReducerActionType
): signUpStateType => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: { isValid: action.isValid, value: action.value },
      };
    case "RESET": {
      return initialFormState;
    }
    default: {
      return state;
    }
  }
};

// react component to render signupForm
function SignUpFrom() {
  const [formData, formDispatch] = useReducer(formReducer, initialFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let isFormValid =
    formData.password2.isValid &&
    formData.password.isValid &&
    formData.userName.isValid;
  // defining onChange function which will be called in Input Componet onChange function which will then itself passed to input HTML tag onChange attribute, and will get us event object and isvalid
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isValid: boolean
  ) => {
    formDispatch({
      value: e.target.value,
      isValid,
      field: e.target.id,
      type: "CHANGE",
    });
  };

  // callback function to handle submit event of sign up form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log(formData);

      const email = formData.email.value;
      const password = formData.password.value;
      const username = formData.userName.value;

      setLoading(true);
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        const userRef = user.uid;
        updateProfile(user, { displayName: username });

        const userData = { email, password, username };
        const userDocRef = doc(db, "users", userRef);
        await setDoc(userDocRef, userData);

        formDispatch({ type: "RESET" });
        // navigate to main page
        navigate("/");
      } catch (error) {
        toast.error("Failed to Sign up ");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Spinner type="wholePage"></Spinner>;
  return (
    <Card className="authFormContainer">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="formTitle">Sign Up</h2>
        {Object.values(signUpFields).map(
          ({ pattern, id, ...field }: InputFieldType) => (
            <Input
              key={id}
              {...field}
              id={id}
              pattern={
                id === "password2" ? formData["password"].value : pattern
              }
              onChange={onChange}
              value={formData[id as keyof signUpStateType].value}
            ></Input>
          )
        )}

        <div className="formActions">
          <button className="btn btn-primary" type="submit">
            Sign up
          </button>
        </div>
      </form>
      <div className="registerLinkContainer">
        <p>Already a User?</p>
        <Link to="/signin" className="registerLink">
          Sign in Instead
        </Link>
      </div>
    </Card>
  );
}

export default SignUpFrom;
