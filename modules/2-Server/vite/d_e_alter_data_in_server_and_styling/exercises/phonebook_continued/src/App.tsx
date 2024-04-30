import { useState, useEffect } from 'react'
import {Record} from './types'
import Form from './components/Form'
import Display from './components/Display'
import persons_service from "./services/records"
const App = () => {
    const [persons, set_persons] = useState<Record[]>([]) 
    useEffect(()=> {
        persons_service
            .get_all()
            .then(initial_records => {
                set_persons(initial_records)
            })
    }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Display persons={persons} set_person={set_persons}/>
      <Form record={persons} set_person={set_persons} />
    </div>
  )
}

export default App


