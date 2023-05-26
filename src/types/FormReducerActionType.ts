type FormReducerActionType =
  | {
      type: "CHANGE";
      field: string;
      isValid: boolean;
      value: string;
    }
  | { type: "RESET" }
  | {
      type: "DURATION_CHANGE";
      field: string;
      isValid: boolean;
      value: number;
    };

export default FormReducerActionType;
