import { useState } from 'react';
import {Notes} from './types';
import Note from './components/Note';
const App = ({notes}: {notes: Notes[]}) => {
    return (
        <div>
        <h1>Notes</h1>
            <ul>
                {notes.map((note: Notes) => 
                    <Note key={note.id} note={note} />
                )}
            </ul>
        </div>
    )
}
export default App
