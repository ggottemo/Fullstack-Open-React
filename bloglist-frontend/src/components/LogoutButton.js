import React from "react";

import { clear } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Style
const LogoutButtonStyle = {
  backgroundColor: "red",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "10px",
};

const LogoutButton = () => {
  // React Router
  const nav = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clear());
    nav("/");
  };

  return (
    <button onClick={handleLogout} style={LogoutButtonStyle}>
      logout
    </button>
  );
};

export default LogoutButton;
