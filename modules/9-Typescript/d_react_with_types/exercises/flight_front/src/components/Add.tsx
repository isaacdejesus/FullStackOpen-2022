import {Diary_Entry, NewEntry, Weather, Visibility} from '../types';
import {useState} from 'react';
import diaries_service from '../services/diaries'
import axios from 'axios';
const Add = ({entries, set_entries, set_msg} : {entries: Diary_Entry[], set_entries: (arg0: Diary_Entry[]) => void, 
    set_msg: (arg0: string | null) => void}) => {
    const [new_entry_date, set_new_entry_date] = useState<string>('2024-06-04');
    const [new_entry_visibility,set_new_entry_visibility] = useState<string>('');
    const [new_entry_weather, set_new_entry_weather] = useState<string>('');
    const [new_entry_comment, set_new_entry_comment] = useState<string>('');
    const create_new_entry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const entry_to_add : NewEntry = {
            date: new_entry_date,
            weather: new_entry_weather as Weather,
            visibility: new_entry_visibility as Visibility,
            comment:new_entry_comment
        }
        diaries_service
            .create_diary(entry_to_add)
            .then(returned_entry => {
                set_entries(entries.concat(returned_entry));
                set_new_entry_date('');
                set_new_entry_weather('');
                set_new_entry_visibility('');
                set_new_entry_comment('');
            })
            .catch(error => {
                if(axios.isAxiosError(error))    
                {
                    if(error.response !== undefined)
                    {
                        set_msg(`${error.response.data}`);
                        setTimeout(() => {
                            set_msg(null);
                        }, 2000)
                    }
                }
            })
    }
    const on_change_date = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        set_new_entry_date(event.target.value);
    }
    const on_change_comment = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        set_new_entry_comment(event.target.value);
    }

    return (
        <div>
            <form onSubmit={create_new_entry}>
                <div>
                   Date:  <input type="date"
                        value={new_entry_date} 
                        onChange={on_change_date} 
                    />
                </div>
                <div>
                    Visibility: 
                        great <input type="radio" name="visibility"
                        onChange={()=> set_new_entry_visibility("great")} 
                        />
                        good <input type="radio" name="visibility"
                        onChange={()=> set_new_entry_visibility("good")} 
                        />
                        ok <input type="radio" name="visibility"
                        onChange={()=> set_new_entry_visibility("ok")} 
                        />
                        poor <input type="radio" name="visibility"
                        onChange={()=> set_new_entry_visibility("poor")} 
                        />
                </div>
                <div>
                    Weather: 
                        sunny <input type="radio" name="weather"
                        onChange={()=> set_new_entry_weather("sunny")} 
                        />
                        rainy <input type="radio" name="weather"
                        onChange={()=> set_new_entry_weather("rainy")} 
                        />
                        cloudy <input type="radio" name="weather"
                        onChange={()=> set_new_entry_weather("cloudy")} 
                        />
                        stormy <input type="radio" name="weather"
                        onChange={()=> set_new_entry_weather("stormy")} 
                        />
                        windy <input type="radio" name="weather"
                        onChange={()=> set_new_entry_weather("windy")} 
                        />
                </div>
                <div>
                   Comment: <input 
                        value={new_entry_comment} 
                        onChange={on_change_comment} 
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}
export default Add;
