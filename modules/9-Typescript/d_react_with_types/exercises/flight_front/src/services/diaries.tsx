import axios from 'axios';
import {Diary_Entry, NewEntry} from '../types';
const base_url = "http://localhost:3000/api/diaries";
const get_all = () => {
    const request = axios.get<Diary_Entry[]>(base_url);
    return request.then(response => response.data)
}
const create_diary = (object: NewEntry) => {
    return axios
        .post<Diary_Entry>(base_url, object)
        .then(response => response.data)
}
export default {get_all, create_diary}

