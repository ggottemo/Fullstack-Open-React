import React from "react";

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

const LogoutButton = ({ setUserToken }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUserToken(null);
  };

  return (
    <button onClick={handleLogout} style={LogoutButtonStyle}>
      logout
    </button>
  );
};

export default LogoutButton;
