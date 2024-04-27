import { useState } from 'react';
import {Notes} from './types';
import Note from './components/Note';
import Form from './components/Form'
const App = ({notes_}: {notes_: Notes[]}) => {
    const [notes, set_notes] = useState<Notes[]>(notes_)
    const [show_all, set_show_all] = useState<boolean>(true);
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
