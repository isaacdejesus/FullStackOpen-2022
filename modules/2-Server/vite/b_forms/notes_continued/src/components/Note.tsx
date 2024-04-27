import {Notes} from '../types';
const Note = ({note}: {note: Notes}) => {
    return(
        <li>{note.content}</li>
    )
}
export default Note;
