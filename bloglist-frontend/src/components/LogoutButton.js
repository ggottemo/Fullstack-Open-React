import React from "react";

import { clear } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clear());
  };

  return (
    <button onClick={handleLogout} style={LogoutButtonStyle}>
      logout
    </button>
  );
};

export default LogoutButton;
