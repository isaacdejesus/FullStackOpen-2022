import {Diary_Entry} from '../types';
const Entry = ({entry}: {entry: Diary_Entry}) => {
    return (
        <div>
            <h5>{entry.date}</h5>
            <p>{entry.visibility}</p>
            <p>{entry.weather}</p>
            <p>{entry.comment}</p>
        </div>
    )
}
export default Entry;
