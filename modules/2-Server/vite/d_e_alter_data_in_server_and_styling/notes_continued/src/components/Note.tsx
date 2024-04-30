import {Notes} from '../types';
import note_service from '../services/notes'
const Note = ({note, notes, set_notes}:{note: Notes, notes: Notes[], set_notes: (arg0: Notes[])=> void} ) => {
    const toggle_importance = (id: string) => {
        const note = notes.find(n=> n.id === id)
        if(note)
        {
            const changed_noted = {...note, important: !note.important}
            note_service
                .update(id, changed_noted)
                .then(returned_note => {
                set_notes(notes.map(n => n.id !== id ? n : returned_note))
            })
            .catch(error => {
                alert(
                    `The note '${note.content}' was already deleted from server`
                    )
                set_notes(notes.filter(n => n.id !== id))
            })
        }
    }
    const label = note.important
        ? 'Make not important' : 'Make important'
    return(
        <li>{note.content}
                <button onClick={()=>toggle_importance(note.id)}>{label}</button>
        </li>
    )
}
export default Note;


