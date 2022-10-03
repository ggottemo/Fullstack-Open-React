import PropTypes from "prop-types";
import React from "react";

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={successStyle}>{message}</div>;
};

SuccessMessage.propTypes = {
  message: PropTypes.string,
};

export default SuccessMessage;
