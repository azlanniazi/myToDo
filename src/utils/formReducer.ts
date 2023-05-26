// import { FieldNumberState, FieldState, FormReducerActionType } from "../types";

// // type FormState<T extends Record<string, FieldState | FieldNumberState>> = {
// //   [K in keyof T]: T[K] extends {value: number }? FieldNumberState : FieldState;
// // }

// type FormState<T extends Record<string, FieldState | FieldNumberState>> = {
//     [key: string]: T 
// }
// interface stateType {
//     [key: string]: FieldNumberState | FieldState
//     title:FieldState
// }

// const state: FormState<stateType> = {
//     title: {isValid: true, value: 's'}
// }


// const formReducer (
//   state: ,
//   action: FormReducerActionType
// ): void => {
//   switch (action.type) {
//     case "CHANGE":
//       return { ...state };
//   }
// };
