import { useState, useEffect} from 'react';
import {Notes} from './types';
import Note from './components/Note';
import Form from './components/Form'
import Notification from './components/Notification'
import note_service from './services/notes'
import Footer from './components/Footer'
const App = () => {
    const [notes, set_notes] = useState<Notes[]>([])
    const [show_all, set_show_all] = useState<boolean>(true);
    const [error_msg, set_error_msg] = useState<string | null>(null)
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
        <Notification message={error_msg} />
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
                        set_error_msg={set_error_msg}
                    />
                )}
            </ul>
            <Form notes={notes} set_notes={set_notes}  />
        <Footer />
        </div>
    )
}
export default App
