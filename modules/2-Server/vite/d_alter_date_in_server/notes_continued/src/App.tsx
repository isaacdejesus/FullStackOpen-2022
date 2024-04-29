import { useState, useEffect} from 'react';
import {Notes} from './types';
import Note from './components/Note';
import Form from './components/Form'
import note_service from './services/notes'
const App = () => {
    const [notes, set_notes] = useState<Notes[]>([])
    const [show_all, set_show_all] = useState<boolean>(true);
    useEffect(() => {
        note_service
            .get_all()
            .then(initial_notes => {
                set_notes(initial_notes)
            })
    }, [])
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
                    <Note 
                        key={note.id} 
                        note={note} 
                        notes={notes}
                        set_notes={set_notes}
                    />
                )}
            </ul>
            <Form notes={notes} set_notes={set_notes}  />
        </div>
    )
}
export default App
