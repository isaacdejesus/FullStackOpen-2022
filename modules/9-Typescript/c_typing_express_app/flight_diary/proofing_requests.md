## src/routes/diaries.ts
```typescript
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diary_service from '../services/diary_service'
import to_New_Diary_Entry from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diary_service.get_non_sensitive_diary_entries());
});

router.get('/:id', (req, res) =>{
    const diary = diary_service.find_by_id(Number(req.params.id));
    if(diary)
        res.send(diary);
    else
        res.sendStatus(404);
});

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const new_entry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(addedEntry);
})
});

export default router;
```
## Problem: Taking data from outside sources
- !!!: Currently the diaries.ts route has disabled the "no-unsafe-assignment" rule to silence
  error that arises from:
```typescript
router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const new_entry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(addedEntry);
})
```
- Warning/Error comes from recieving data from outside source. In this case, data is taken directly 
  from req.body and used to create new entry without checking data is of correct type.

##Proofing requests
- Create utils.ts file which will contain to_New_Diary_Entry function which recieves req.body as
  parameter and checks that each field is of proper type and returns properly typed New_Entry object.
- The proofing function is applied to router/POST request as such
```typescript
import express from 'express';
import diary_service from '../services/diary_service'
import to_New_Diary_Entry from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diary_service.get_non_sensitive_diary_entries());
});

router.get('/:id', (req, res) =>{
    const diary = diary_service.find_by_id(Number(req.params.id));
    if(diary)
        res.send(diary);
    else
        res.sendStatus(404);
});

router.post('/', (req, res) => {
    try{
        const new_diary_entry = to_New_Diary_Entry(req.body);
        const newly_added_entry = diary_service.add_diary(new_diary_entry);
        res.json(newly_added_entry);
    }
    catch (error: unknown){
        let error_message = 'Something went wrong';
        if(error instanceof Error)
            error_message += ' Error: ' + error.message;
        res.status(400).send(error_message);
    }
});

export default router;
```
- The req.body/incoming outside data is passed to proofing function and if function returns
  a properly typed object, it is passed to add_diary function which adds it to db and returns
  newly_added_entry
```typescript
const new_diary_entry = to_New_Diary_Entry(req.body);
const newly_added_entry = diary_service.add_diary(new_diary_entry);
res.json(newly_added_entry);
```
- NOTE!!! The above is within a try block. If that fails, the catch block returns an error!
## Proofing function
```typescript
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
export default to_New_Diary_Entry;
```
- The proofing function takes fields and runs a function to check each field to make sure it is the
  correct type. If all fields validate to correct type then an object containing correctly typed
  data is returned!
- Following is final proofing function provided but doesn't work. Modified version above works.
```typescript
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
```
- Note: the function is expected to take an object as input. Object is typed unknown 
- unknown is similar to any but it is safer bc it doesn't allow to do anything with unknown value
  meaning can't run methods belonging to string, arr, etc bc it is typed unknown
### Validating `comment` field: `parse_comment` function
- comment must validate to type string
- Validating function takes value of type unknown and returns it as type string if it happens to 
  exist or be right type/string
```typescript
const parse_comment = (comment: unknown): string => {
    if(!comment || !is_string(comment)){
        throw new Error('Incorrect or missing comment');
    }
    return comment;
} 
const is_string = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
```
- `parse_comment`: checks if comment exists of if it is string. If it fails either check an error
   is thrown. Else, `comment` of string type is returned!
- `is_string` function is a type guard: meaning it returns boolean and has a `type predicate` as 
   return type. In this case type predicate is `text is string` 
- The general form of a type predicate is `parameter_name is type` where parameter_name is name
  of function parameter and type is the targeted type
- If type guard function returns true, compiler knows tested variable has type that was defined 
  in type predicate. bf type guard is called, type of variable `comment` is not known. af call
  if code makes it past exception compiler knows `comment` is of type string
- Type guard that returns a type predicate is a way of type narrowing. Meaning, give a variable 
  a more strict/accurate type.
- https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 ### Validating `date` field: `parse_date` function
 ```typescript
const parse_date = (date: unknown): string => {
    if(!date || !is_string(date) || !is_date(date)){
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const is_date = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
 ```
- `parse_date` takes data of type unknown. First checks it exists, if it exists then checks that it is
   a string, if it is a string then it is passed to `is_date` which checks that it is a Date object. 
   If all checks pass then date is returned as type string
### Validating `weather` field: `parse_weather` function
```typescript
const parse_weather = (weather: unknown): Weather => {
    if(!weather || !is_string(weather) || !is_weather(weather)){
        throw new Error('Incorrect or missing weather: ' + weather);
    };
    return weather;
};
const is_weather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
};
```
- Note: In order for `is_weather` to work properly, the Weather type must be changed to enum as follows
```typescript
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}
- Above allows to check input string is one of the accepted values and type guard written as:
```typescript
const is_weather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};
- Note: Need to take string representation of enum values for comparison. Required for mapping
- IMPORTANT: Changing Weather to enum causes errors in data/entries.ts bc string != enum. Fixed
  by data to Diary_Entry type with the to_New_Diary_Entry function:
```typescript
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
```
- Above we map the initial data to Diary_Entry type by feeding data to to_New_Diary_Entry() function
  function validates types and returns object of proper type
- Note: Since to_New_Diary_Entry() returns object of type New_Diary_Entry, it must be asserted to 
  Diary_Entry
## Validating `visibility` field: `parse_visibility` function
```typescript
const parse_visibility = (visibility: unknown): Visibility => {
    if(!visibility || !is_string(visibility) || !is_Visibility(visibility)){
        throw new Error('Incorrect or missing Visibility: ' + visibility);
    }
    return visibility;
};
const is_Visibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
};
```
- Visibility type must also be turned to enum
```typescript
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
``` 
- Finally all validator function have been written and final version of proofing function is
```typescript
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
```
- Note: Since object is type unknown, it doesn't allow operations, .:. accessing fields isn't possible.
  Can be fixed by type narrowing using type guards as shown above. First typeguard checks that object 
  exists and that it is type object. Second typeguard uses `in` operator to ensure object has expected
  fields. 
- Anyway, for some reason those typeguards don't work so had to modify function. Following is final
  result
```typescript
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
}
export default to_New_Diary_Entry;
```

## Final note
- If a field is optional, type narrowing should take than into account since field isn't required. 
