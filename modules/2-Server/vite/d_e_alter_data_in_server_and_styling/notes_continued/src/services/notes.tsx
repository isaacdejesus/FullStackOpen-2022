import axios from 'axios'
import { Note_To_Server, Notes} from '../types'
const base_url = "http://localhost:3001/notes"
const get_all = () => {
    //const request = axios.get(base_url);
    //return request.then(response => response.data);
    const request = axios.get<Notes[]>(base_url)
    const non_existent = {
        id: "22234",
        content: "not saved on server",
        important: true,
    }
    return request.then(response => response.data.concat(non_existent))
}

const create = (new_object: Note_To_Server) => {
    const request = axios.post<Notes>(base_url, new_object);
    return request.then(response => response.data);
}

const update = (id: string, new_object: Note_To_Server) => {
    const request = axios.put<Notes>(`${base_url}/${id}`, new_object);
    return request.then(response => response.data);
}
export default {get_all, create, update}
