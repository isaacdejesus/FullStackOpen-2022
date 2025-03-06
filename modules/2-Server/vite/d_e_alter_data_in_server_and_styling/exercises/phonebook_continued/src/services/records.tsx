import {Record_To_Server, Record} from '../types'
import axios from 'axios'
const base_url = "http://localhost:3001/persons"
const get_all = () => {
    const request = axios.get<Record[]>(base_url);
    return request.then(response => response.data);
}

const create = (new_object: Record_To_Server) => {
    const request = axios.post<Record>(base_url, new_object);
    return request.then(response => response.data);
}

const update = (id: string, new_object: Record_To_Server) => {
    const request = axios.put<Record>(`${base_url}/${id}`, new_object);
    return request.then(response => response.data);
}

const remove = (id: string) => {
    const request = axios.delete(`${base_url}/${id}`);
    return request.then(response => response.data);
}

export default {get_all, create, update, remove}
