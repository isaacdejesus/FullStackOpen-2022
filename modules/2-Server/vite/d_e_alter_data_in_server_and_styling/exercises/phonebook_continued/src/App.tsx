import { useState, useEffect } from 'react'
import {Record} from './types'
import Form from './components/Form'
import Display from './components/Display'
import persons_service from "./services/records"
import Bad_Notification from './components/Bad_Notification'
import Good_Notification from './components/Good_Notif'
const App = () => {
    const [persons, set_persons] = useState<Record[]>([]);
    const [success_msg, set_success_msg] = useState<string | null>(null);
    const [error_msg, set_error_msg] = useState<string | null>(null);
    useEffect(()=> {
        persons_service
            .get_all()
            .then(initial_records => {
                set_persons(initial_records)
            })
    }, [])
  return (
    <div>
      <Bad_Notification message={error_msg}/>
      <Good_Notification message={success_msg}/>
      <h2>Phonebook</h2>
      <Display persons={persons} set_person={set_persons}/>
      <Form record={persons} set_person={set_persons} set_success_msg={set_success_msg} set_error_msg={set_error_msg}/>
    </div>
  )
}

export default App


