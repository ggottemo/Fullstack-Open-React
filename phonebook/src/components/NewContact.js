import PropTypes from "prop-types";
import React from "react";

const DropDown = ({
  newPerson,
  setNewPerson,
  setSuccessMsg,
  handleAddUser,
}) => {
  const [show, setShow] = React.useState(false);
  const showWhenVisible = { display: show ? "" : "none" };
  const hideWhenVisible = { display: show ? "none" : "" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setShow(true)}>Add New Contact</button>
      </div>
      <div style={showWhenVisible}>
        <form>
          <div>
            <label>New Contact: </label>
            <input
              value={newPerson.name}
              placeholder="Name"
              type="text"
              onChange={(event) => {
                event.preventDefault();
                return setNewPerson({ ...newPerson, name: event.target.value });
              }}
            />
            <input
              value={newPerson.number}
              placeholder="Number"
              type="text"
              onChange={(event) => {
                event.preventDefault();

                return setNewPerson({
                  ...newPerson,
                  number: event.target.value,
                });
              }}
            />
          </div>
          <div>
            <button type="submit" onClick={handleAddUser}>
              add
            </button>
          </div>
        </form>
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    </div>
  );
};

DropDown.propTypes = {
  newPerson: PropTypes.object.isRequired,
  setNewPerson: PropTypes.func.isRequired,
  setSuccessMsg: PropTypes.func.isRequired,
  handleAddUser: PropTypes.func.isRequired,
};

export default DropDown;
