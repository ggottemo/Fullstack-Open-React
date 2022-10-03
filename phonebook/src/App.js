import { useEffect, useState } from "react";
import { Contact_list } from "./components/contact";
import Filter from "./components/filter";
import contactService from "./services/contact";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

  const [filter, setFilter] = useState("");
  // Effects
  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  });
  // Handlers
  const handleAddUser = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook. Would you like to update the number to ${newPerson.number}?`
        )
      ) {
        contactService.update(newPerson.name, newPerson).then((result) => {
          // Loop through to update the number
          setPersons(
            persons.map((person) =>
              person.name === newPerson.name ? result : person
            )
          );
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
        console.log(`⚙ ~ file: App.js ~ line 29 ~ .then ~ result`, result);
        return setPersons(persons.concat(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <form>
        <div>
          <hr></hr>
          <label>New Contact: </label>
          <input
            value={newPerson.name}
            placeholder="Name"
            onChange={(event) => {
              event.preventDefault();
              return setNewPerson({ ...newPerson, name: event.target.value });
            }}
          />
          <input
            value={newPerson.number}
            placeholder="Number"
            onChange={(event) => {
              event.preventDefault();
              return setNewPerson({ ...newPerson, number: event.target.value });
            }}
          />
        </div>
        <div>
          <button type="submit" onClick={handleAddUser}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contact_list class="test" contacts={persons} filter={filter} />
    </div>
  );
};

export default App;
