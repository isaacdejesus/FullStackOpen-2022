import { New_Diary_Entry, Weather, Visibility} from './types';
const parse_comment = (comment: unknown): string => {
    if(!comment || !is_string(comment)){
        throw new Error('Incorrect or missing comment');
    }
    return comment;
} 
const is_string = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const is_date = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parse_date = (date: unknown): string => {
    if(!date || !is_string(date) || !is_date(date)){
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parse_weather = (weather: unknown): Weather => {
    if(!weather || !is_string(weather) || !is_weather(weather)){
        throw new Error('Incorrect or missing weather: ' + weather);
    };
    return weather;
};

const is_weather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
};

const is_Visibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
};
const parse_visibility = (visibility: unknown): Visibility => {
    if(!visibility || !is_string(visibility) || !is_Visibility(visibility)){
        throw new Error('Incorrect or missing Visibility: ' + visibility);
    }
    return visibility;
};
type Fields = {comment: unknown, date: unknown, weather: unknown, visibility: unknown};
const to_New_Diary_Entry = ({comment, date, weather, visibility}: Fields): New_Diary_Entry => {
    const new_entry: New_Diary_Entry = {
        comment: parse_comment(comment),
        date: parse_date(date),
        weather: parse_weather(weather),
        visibility: parse_visibility(visibility)
    };
    return new_entry;
};
/* Doesn't work
const to_New_Diary_Entry = (object: unknown): New_Diary_Entry => {
    if( !object || typeof object !== 'object' )
        throw new Error('Incorrect or missing data');
    if('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)
    {
    const new_entry: New_Diary_Entry = {
        comment: parse_comment(object.comment),
        date: parse_date(object.date),
        weather: parse_weather(object.weather),
        visibility: parse_visibility(object.visibility)
    };
    return new_entry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
*/
export default to_New_Diary_Entry;
