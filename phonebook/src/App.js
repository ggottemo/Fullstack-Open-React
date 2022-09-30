import axios from "axios";
import { useEffect, useState } from "react";
import { Contact_list } from "./components/contact";
import Filter from "./components/filter";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "Enter Name",
    number: "Enter Number",
  });
  const [current_id, setCurrent_id] = useState(4);
  const [filter, setFilter] = useState("");
  // Effects
  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);
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
      <Filter filter={filter} setFilter={setFilter} />
      <form>
        <div>
          <hr></hr>
          <label>New Contact: </label>
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
      <Contact_list class="test" contacts={persons} filter={filter} />
    </div>
  );
};

export default App;
