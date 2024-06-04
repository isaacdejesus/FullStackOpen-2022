import {Diary_Entry} from '../types';
import Entry from './Entry';
const Entries = ({data}: {data: Diary_Entry[]}) => {
    return (
        <div>
        {data.map((entry: Diary_Entry) => 
            <Entry key={entry.id} entry={entry} />
        )}
        </div>
    )
}
export default Entries;
