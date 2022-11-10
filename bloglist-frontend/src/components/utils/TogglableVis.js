import React, { forwardRef, useImperativeHandle, useState } from "react";

const TogglableVis = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // Expose the toggleVisibility function to the parent component
  useImperativeHandle(refs, () => {
    return toggleVisibility;
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

TogglableVis.displayName = "TogglableVis";

export default TogglableVis;
