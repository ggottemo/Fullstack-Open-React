import React from "react";

// Notification component - for displaying error and success messages
// Props:
// message: { text: string, status: string }
// text: message to display
// status: "s" for success, "e" for error
const Notification = ({ message, status }) => {
  if (message === "" || status === "") {
    return null;
  }
  if (message === null || status === null) {
    return null;
  }

  return (
    <div style={status === "s" ? successStyle : errorStyle}>{message}</div>
  );
};

const successStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const errorStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

export default Notification;
