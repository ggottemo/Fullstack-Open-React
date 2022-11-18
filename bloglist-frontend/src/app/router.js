import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../components/Login";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/dashboard" element={<App />} />,
    <Route path="/" element={<Login />} />,
  ])
);

export default router;
