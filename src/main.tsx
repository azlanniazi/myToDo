import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import {
  Home,
  ManageProjects,
  Project,
  ProtectRoutes,
  SignIn,
  SignUp,
} from "./pages";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <ProtectRoutes></ProtectRoutes>,
        children: [
          {
            path: "/",
            element: <Home></Home>,
          },
          {
            path: "projects/",
            element: <ManageProjects></ManageProjects>,
          },
          {
            path: "projects/:projectId",
            element: <Project></Project>,
          },
        ],
      },
      { path: "signin", element: <SignIn></SignIn> },
      { path: "signup", element: <SignUp></SignUp> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer></ToastContainer>
    </Provider>
  </React.StrictMode>
);
