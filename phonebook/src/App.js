import { useEffect, useState } from "react";
import { Contact_list } from "./components/contact";
import Filter from "./components/filter";
import NewContact from "./components/NewContact";
import contactService from "./services/contact";
const App = () => {
  //#region State
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("");
  // Effects
  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  });
  const updateMessage = (message) => {
    setSuccessMsg(message);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 5000);
  };
  //#endregion
  // Handlers

  const handleAddUser = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook. Would you like to update the number to ${newPerson.number}?`
        )
      ) {
        contactService
          .update(newPerson.name, newPerson)
          .then((result) => {
            // Loop through to update the number
            setPersons(
              persons.map((person) =>
                person.name === newPerson.name ? result : person
              )
            );
            updateMessage(`Added ${newPerson.name}`);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 404) {
              console.log("404");
              setErrorMsg(`Information has already been removed from server`);
              setTimeout(() => {
                setErrorMsg(null);
              }, 5000);
            }
          });
      }
      return;
    } else if (persons.find((person) => person.number === newPerson.number)) {
      alert(`${newPerson.number} is already added to phonebook`);
      return;
    }

    contactService
      .create({ id: newPerson.name, ...newPerson })
      .then((result) => {
        return setPersons(persons.concat(result));
      })
      .then(() => {
        updateMessage(`Added ${newPerson.name}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {(successMsg && <div className="success">{successMsg}</div>) ||
        (errorMsg && <div className="error">{errorMsg}</div>)}
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <hr></hr>

      <NewContact
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        handleAddUser={handleAddUser}
        setSuccessMsg={setSuccessMsg}
      />
      <h2>Numbers</h2>
      <Contact_list class="test" contacts={persons} filter={filter} />
    </div>
  );
};

export default App;
