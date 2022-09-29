import { useState } from 'react'
import { Contact_list } from './components/contact'
const App = () => {
  
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
    
  ]) 
  const [newName, setNewName] = useState('Enter Name')
  const [current_id, setCurrent_id] = useState(1)

  return (
    
    <div>
      
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event)=> {
            event.preventDefault()
            return setNewName(event.target.value)
          }}/>
        </div>
        <div>
          <button type="submit" onClick={ (event) => {
            event.preventDefault()
            setCurrent_id(current_id + 1)
            return setPersons(persons.concat([{ name: newName, id: current_id+1 }]))
          }}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contact_list contacts={persons} />
    </div>
  )
}

export default App