import PropTypes from "prop-types";
import React from "react";
export const Contact = ({ name }) => {
  return <p>{name} </p>;
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
};

// Contacts

export const Contact_list = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.id} name={contact.name} />
      ))}
    </div>
  );
};
Contact_list.propTypes = {
  contacts: PropTypes.array.isRequired,
};
