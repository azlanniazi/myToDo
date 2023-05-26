import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Layout } from "./components/UI";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./store";

function App() {
  return <Outlet></Outlet>;
}

export default App;
