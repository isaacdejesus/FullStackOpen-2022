import diary_data  from '../../data/diaries';
import {Diary_Entry, Non_Sensitive_Diary_Entry, New_Diary_Entry} from '../types'
const diaries: Diary_Entry[] = diary_data as Diary_Entry[];

const getEntries = (): Diary_Entry[] => {
  return diaries;
};

const get_non_sensitive_diary_entries = (): Non_Sensitive_Diary_Entry[] => {
    return diaries.map(({id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const find_by_id = (id: number): Diary_Entry | undefined => {
    const entry = diaries.find(d => d.id === id)
    return entry;
}

const add_diary = (entry: New_Diary_Entry): Diary_Entry => {
        const new_diary_entry = {
            id: Math.max(...diaries.map(d => d.id)) + 1,
            ...entry
        };
        diaries.push(new_diary_entry);
        return new_diary_entry;
};


export default {
    getEntries,
    add_diary,
    get_non_sensitive_diary_entries,
    find_by_id,
};
