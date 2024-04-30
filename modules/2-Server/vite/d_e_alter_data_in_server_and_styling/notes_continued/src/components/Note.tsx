import {Notes} from '../types';
import note_service from '../services/notes'
const Note = ({note, notes, set_notes, set_error_msg}:{note: Notes, notes: Notes[], set_notes: (arg0: Notes[])=> void, set_error_msg: (arg0: string | null)=> void} ) => {
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
                set_error_msg(`The note '${note.content}' was already deleted from server`)
                setTimeout(() => {
                    set_error_msg(null)
                }, 5000)
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


