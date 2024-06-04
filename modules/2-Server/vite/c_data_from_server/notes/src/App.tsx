import { useState, useEffect} from 'react';
import axios from 'axios'
import {Notes} from './types';
import Note from './components/Note';
import Form from './components/Form'
const App = () => {
    const [notes, set_notes] = useState<Notes[]>([])
    const [show_all, set_show_all] = useState<boolean>(true);
    useEffect(() => {
        axios
            .get<Notes[]>('http://localhost:3001/notes')
            .then(response => {
                set_notes(response.data)
            })
    }, [])
    console.log('render', notes.length, 'notes');
    const notes_to_show = show_all
        ? notes
        : notes.filter((note:Notes)=> note.important === true)
    return (
        <div>
        <h1>Notes</h1>
        <div>
            <button onClick={()=> set_show_all(!show_all)}>

                Show {show_all ? 'important' : 'all'}
            </button>
        </div>
            <ul>
                {notes_to_show.map((note: Notes) => 
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <Form notes={notes} set_notes={set_notes}  />
        </div>
    )
}
export default App

