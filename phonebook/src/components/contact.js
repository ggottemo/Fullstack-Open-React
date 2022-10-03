import PropTypes from "prop-types";
import React from "react";
import contactService from "../services/contact";
export const Contact = ({ name, number }) => {
  return (
    <p>
      {name} {number}{" "}
      <button
        type="submit"
        onClick={() => {
          if (window.confirm(`Delete ${name}?`)) {
            console.log(`Deleting ${name}`);
            contactService.remove(name).then((result) => {
              console.log(
                `⚙ ~ file: contact.js ~ line 18 ~ .then ~ result`,
                result
              );
              return result;
            });
          }
        }}
      >
        delete
      </button>
    </p>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

// Contacts

export const Contact_list = ({ contacts, filter }) => {
  return (
    <div id="list">
      {contacts.map((contact) => {
        if (contact.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <Contact
              key={contact.name}
              name={contact.name}
              number={contact.number}
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
