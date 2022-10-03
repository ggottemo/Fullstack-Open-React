import PropTypes from "prop-types";
import React from "react";
import contactService from "../services/contact";
import SuccessMessage from "./SuccessMessage";
export const Contact = ({ name, number, set }) => {
  return (
    <p className="container_horizontal">
      {name} {number}{" "}
      <button
        className="delete"
        type="submit"
        onClick={() => {
          if (window.confirm(`Delete ${name}?`)) {
            console.log(`Deleting ${name}`);
            contactService
              .remove(name)
              .then(() => {
                set(`Deleted ${name}`);
                setTimeout(() => {
                  set(null);
                }, 5000);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }}
      >
        Delete
      </button>
    </p>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  set: PropTypes.func,
};

// Contacts

export const Contact_list = ({ contacts, filter }) => {
  const [successMsg, setSuccessMsg] = React.useState("");
  const msg = (message) => setSuccessMsg(message);
  return (
    <div id="list">
      {successMsg && <SuccessMessage message={successMsg} />}
      {contacts.map((contact) => {
        if (contact.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <Contact
              key={contact.name}
              name={contact.name}
              number={contact.number}
              set={msg}
            />
          );
        }
      })}
    </div>
  );
};
Contact_list.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};
