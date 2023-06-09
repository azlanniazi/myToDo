import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { Card, Spinner } from "../../components/UI";
import Input from "../../components/UI/Input";
import { FieldState, FormReducerActionType, InputFieldType } from "../../types";
import { signInFields } from "../../utils/formsData";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SignInFormStateType {
  email: FieldState;
  password: FieldState;
}

const initialFormState: SignInFormStateType = {
  email: { isValid: false, value: "" },
  password: { isValid: false, value: "" },
};

// defining form reducer to manage the state of sign in form
const formReducer = (
  state: SignInFormStateType,
  action: FormReducerActionType
) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: {
          value: action.value,
          isValid: action.isValid,
        },
      };
    case "RESET": {
      return initialFormState;
    }
    default: {
      return state;
    }
  }
};

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [formData, formDispatch] = useReducer(formReducer, initialFormState);
  const isFormValid = formData.email.isValid && formData.email.isValid;
  const navigate = useNavigate();
  const onChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
    isValid: boolean
  ): void => {
    formDispatch({
      type: "CHANGE",
      field: e.target.id,
      value: e.target.value,
      isValid,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const email = formData.email.value;
    const password = formData.password.value;

    if (isFormValid) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential.user) {
          navigate("/");
        }
      } catch (error) {
        toast.error("Failed to Log In");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    console.log("loading");
    return <Spinner type="wholePage"></Spinner>;
  }

  return (
    <Card className="authFormContainer">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="formTitle">Sign In</h2>
        {Object.values(signInFields).map((field: InputFieldType) => (
          <Input
            key={field.id}
            {...field}
            onChange={onChange}
            value={formData[field.id as keyof SignInFormStateType].value}
          ></Input>
        ))}

        <div className="formActions">
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <div className="registerLinkContainer">
        <p>Are You a new User ? </p>
        <Link to="/signup" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </Card>
  );
}
