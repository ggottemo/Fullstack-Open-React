import PropTypes from "prop-types";
import React from "react";
export const Contact = ({ name, number }) => {
  return (
    <p>
      {name} {number}{" "}
    </p>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

// Contacts

export const Contact_list = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.id} name={contact.name} number={contact.number} />
      ))}
    </div>
  );
};
Contact_list.propTypes = {
  contacts: PropTypes.array.isRequired,
};
