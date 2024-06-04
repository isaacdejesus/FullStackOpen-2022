import {Diary_Entry} from '../src/types'
import to_New_Diary_Entry from "../src/utils"
const diaryEntries  = 
[
    {
        "id": 1,
        "date": "2017-01-01",
        "weather": "rainy",
        "visibility": "poor",
        "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
        "id": 2,
        "date": "2017-04-01",
        "weather": "sunny",
        "visibility": "good",
        "comment": "Everything went better than expected, I'm learning much"
    },
    {
        "id": 3,
        "date": "2017-04-15",
        "weather": "windy",
        "visibility": "good",
        "comment": "I'm getting pretty confident although I hit a flock of birds"
    },
    {
        "id": 4,
        "date": "2017-05-11",
        "weather": "cloudy",
        "visibility": "good",
        "comment": "I almost failed the landing but I survived"
    }
];

const diary_entries: Diary_Entry [] = diaryEntries.map(obj => {
    const object = to_New_Diary_Entry(obj) as Diary_Entry;
    object.id = obj.id;
    return object;
});

export default diary_entries;
