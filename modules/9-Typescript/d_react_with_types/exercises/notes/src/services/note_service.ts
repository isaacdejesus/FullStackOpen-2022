import axios from 'axios';
import { Note, New_Note } from '../types';
const base_url = 'http://localhost:3001/notes'
export const get_all_notes = () => {
    return axios
        .get<Note[]>(base_url)
        .then(response => response.data)
}
export const create_note = (object: New_Note) => {
    return axios
        .post<Note>(base_url, object)
        .then(response => response.data)
}
