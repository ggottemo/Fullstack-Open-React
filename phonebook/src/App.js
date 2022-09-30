import { useState } from "react";
import { Contact_list } from "./components/contact";
const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "123-456-7890" },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "Enter Name",
    number: "Enter Number",
  });
  const [current_id, setCurrent_id] = useState(1);
  // Handlers
  const handleAddUser = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    } else if (persons.find((person) => person.number === newPerson.number)) {
      alert(`${newPerson.number} is already added to phonebook`);
      return;
    }

    setCurrent_id(current_id + 1);
    return setPersons(
      persons.concat([
        { name: newPerson.name, number: newPerson.number, id: current_id + 1 },
      ])
    );
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input
            value={newPerson.name}
            onChange={(event) => {
              event.preventDefault();
              return setNewPerson({ ...newPerson, name: event.target.value });
            }}
          />
          <input
            value={newPerson.number}
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
      <Contact_list contacts={persons} />
    </div>
  );
};

export default App;
