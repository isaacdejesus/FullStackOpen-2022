import {Diary_Entry} from './types';
import Entries from './components/Entries';
import Add from './components/Add';
import Notif from './components/Notif';
import {useState, useEffect} from 'react';
import diaries_service from './services/diaries';
const App = () => {
    const [entries, set_entries] = useState<Diary_Entry[]>([]);
    const [message, set_msg] = useState<string | null>(null);
    useEffect(() => {
        diaries_service
            .get_all()
            .then(initial_diaries => {
                set_entries(initial_diaries)
        })
},[])
    return(
        <div>
            <Notif message={message}/>
            <Add entries={entries} set_entries={set_entries} set_msg={set_msg}/>
            <Entries data={entries}/>
        </div>
    )
}
export default App
