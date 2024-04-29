import {useState} from 'react'
import {Notes } from '../types'
import note_service from '../services/notes'
const Form = ({notes, set_notes}:{notes: Notes[], set_notes: (arg0: Notes[])=> void} ) => {
    const [new_note, add_new_note] = useState<string>('a new note...')
    const on_change = (event:any) => {
        event.preventDefault();
        add_new_note(event.target.value)
    }
    const submit_handler =(event: any) => {
        event.preventDefault();
        const note_object = {
            content: new_note,
            important: Math.random() < .5,
        }
        note_service
            .create(note_object)
            .then(returned_noted => {
                set_notes(notes.concat(returned_noted));
                add_new_note('');
            })
    }
    return(
        <form onSubmit={submit_handler}>
            <input 
                value={new_note}
                onChange={on_change}
        />
            <button type="submit">save</button>
        </form>
    )
}
export default Form

