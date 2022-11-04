import React from "react";

const Notification = ({ message }) => {
  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
};

const style = {
  padding: "5px 5px 5px 5px",
  border: "2px dotted blue",
  color: "blue",
  margins: "10px 10px 10px 10px",
  fontSize: "20px",
  textAlign: "center",
};

export default Notification;
