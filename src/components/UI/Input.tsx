import { ChangeEvent, FocusEvent, FocusEventHandler, useState } from "react";
import { InputFieldType } from "../../types";

// defining props for input components which include all the attributes type of inputField type
// along with onChange function type and value type
interface InputProps extends InputFieldType {
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isValid: boolean
  ) => void;
  value: string;
  edit?: boolean;
}

// defining Input component which will be used to render different form Fields
function Input(props: InputProps) {
  const { id, onChange, value, type, label, pattern, error, edit } = props;
  const [isFocused, setisFocused] = useState(false);
  const [valueValid, setValueValid] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [initialEdit, setInitialEdit] = useState(true);
  const hasError = isFocused && isBlurred && !valueValid;
  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (edit && initialEdit) {
      setValueValid(true);
      setInitialEdit(false);
    }
    setisFocused(true);
  };

  const handleBlurr = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setIsBlurred(true);
  };

  const validate = (
    value: string,
    pattern: RegExp | string | undefined
  ): boolean => {
    if (pattern) {
      if (typeof pattern === "string") {
        return value === pattern;
      } else {
        return pattern.test(value);
      }
    }
    return true;
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const isValid = validate(e.target.value, pattern);
    setValueValid(isValid);
    onChange(e, isValid);
  };

  let inputType;
  switch (type) {
    case "textarea":
      inputType = (
        <textarea
          id={id}
          onChange={handleChange}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlurr}
        ></textarea>
      );
      break;
    case "number":
      inputType = (
        <input
          onFocus={handleFocus}
          onBlur={handleBlurr}
          id={id}
          type={type}
          onChange={handleChange}
          value={value}
        ></input>
      );
      break;
    case "select":
      inputType = (
        <select
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlurr}
          onChange={handleChange}
        >
          {label}
          <option value={"-"}>-</option>;
          {props.options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputType = (
        <input
          type={type}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlurr}
          id={id}
          onChange={handleChange}
        ></input>
      );
      break;
  }
  return (
    <div className={"formGroup"}>
      <label>{label}</label>
      {inputType}
      <p className={!hasError ? "noShow" : "showError"}>{error}</p>
    </div>
  );
}

export default Input;
