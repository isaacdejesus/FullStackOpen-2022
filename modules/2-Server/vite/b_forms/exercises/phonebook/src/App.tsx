import { useState } from 'react'
import {Record} from './types'
import Form from './components/Form'
import Display from './components/Display'
const App = () => {
  const [persons, set_persons] = useState<Record[]>([
    { id: 1, name: 'Arto Hellas', number: '713-009-0000' },
    { id: 2, name: 'Joey Potato', number: '333-229-0000' },
    { id: 3, name: 'Great PotatoMan', number: '813-349-0000' }
  ]) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Display persons={persons}/>
      <Form record={persons} set_person={set_persons} />
    </div>
  )
}

export default App
