import { useState, useEffect} from 'react';
import {Note} from './types';
import {get_all_notes, create_note} from './services/note_service';
const App = () => 
{
    const [new_note, set_new_note] = useState<string>("");
    const [notes, set_notes] = useState<Note[]>([]);
    useEffect(() => {
        get_all_notes().then(data => {
            set_notes(data)
        })
    }, [])
    const create_new_note = (event: React.SyntheticEvent) => {
        event.preventDefault();
        create_note({content: new_note}).then(data => {
            set_notes(notes.concat(data))
        })
        set_new_note('');
    };
    const on_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        set_new_note(event.target.value);
    }
    return (
        <div>
            <form onSubmit={create_new_note}>
                <input
                    value={new_note}
                    //onChange={(event) => set_new_note(event.target.value)}
                    onChange={on_change}
                />
            </form>
            <ul>
                {notes.map(note => 
                    <li key={note.id}>{note.content}</li>     
                )}
            </ul>
        </div>
    )
}

export default App
