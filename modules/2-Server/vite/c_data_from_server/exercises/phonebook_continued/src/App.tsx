import { useState, useEffect } from 'react'
import axios from 'axios'
import {Record} from './types'
import Form from './components/Form'
import Display from './components/Display'
const App = () => {
    const [persons, set_persons] = useState<Record[]>([]) 
    useEffect(()=> {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                set_persons(response.data)
            })
    }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Display persons={persons}/>
      <Form record={persons} set_person={set_persons} />
    </div>
  )
}

export default App

