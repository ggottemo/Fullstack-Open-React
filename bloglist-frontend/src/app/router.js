/* eslint-disable react/jsx-key */
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
// Import store to use outside of component
import store from "./store";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/dashboard"
      // Navigate to redirect if user not logged in
      element={store.getState().user ? <App /> : <Navigate to={"login"} />}
    />,
    <Route path="login" element={<Login />} />,
    <Route path="/" element={<Login />} />,
  ])
);

export default router;
