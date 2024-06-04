## Typing hooks/state
- Start fresh notes app
- https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#usestate
```typescript
import { useState } from 'react'
const App = () => 
{
    const [new_note, set_new_note] = useState("");
    const [notes, set_notes] = useState([]);
    return null;
}
export default App
```
- By default the new_note state will infer the data type to be string
- However, notes will not be able to infer the type of items in notes arr. .:. need to create
  a type in order to type the state.
```typescript
import { useState } from 'react'
interface Note {
    id: number;
    content: string;
}
const App = () => 
{
    const [new_note, set_new_note] = useState<string>("");
    const [notes, set_notes] = useState<Note[]>([]);
    return null;
}
export default App
```
## Adding data to test state
```typescript
import { useState } from 'react'
import {Note} from './types'
const App = () => 
{
    const [new_note, set_new_note] = useState<string>("");
    const [notes, set_notes] = useState<Note[]>([
        {id: 1, content: 'testing'}
    ]);
    return (
        <div>
            <ul>
                {notes.map(note => 
                    <li key={note.id}>{note.content}</li>     
                )}
            </ul>
        </div>
    )
}

export default App
```
## Forms and typing events
```typescript
import { useState } from 'react'
import {Note} from './types'
const App = () => 
{
    const [new_note, set_new_note] = useState<string>("");
    const [notes, set_notes] = useState<Note[]>([
        {id: 1, content: 'testing'}
    ]);
    const create_note = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const note_to_add = {
            content: new_note,
            id: notes.length + 1
        }
        set_notes(notes.concat(note_to_add));
        set_new_note('');
    };
    const on_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        set_new_note(event.target.value);
    }
    return (
        <div>
            <form onSubmit={create_note}>
                <input
                    value={new_note}
                    //onChange={(event) => set_new_note(event.target.value)}
                    onChange={on_change}
                />
            </form>
            <ul>
                {notes.map(note => 
                    <li key={note.id}>{note.content}</li>     
                )}
            </ul>
        </div>
    )
}
export default App
```
- Note *event* doesn't need to be typed if inline function is used
- *event* does need to be typed if reference to a function is passed to handle event
- https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
- To determine type of event write inline function, hover over event and type of event will be given. 
  then used that to type the event on the outside function to replace inline function
- Different events have different types
## Typing data obtained from server
- set up json server to serve the notes from db.json
- Attempting to obtain data from server informs that data is of type any
```typescript
    useEffect(() => {
        axios.get('http://localhost:3001/notes').then(response => {
            console.log(response.data);
        })
    }, [])
```
- response.data is of type *any*
- https://upmostly.com/typescript/how-to-use-axios-in-your-typescript-apps
- Data from server can be typed as follows
```typescript
    useEffect(() => {
        axios.get<Note[]>('http://localhost:3001/notes').then(response => {
            console.log(response.data);
        })
    }, [])
```
- .:. axios.get can be typed like everything else. However, note that bc ts doesn't exist at runtime, there is 
  no real validation that checks that data returned from server is of the correct/expected type. .:. Only type
  axios.get if 100% sure data coming from server is of correct type. 
- If want to to be 100% sure data coming from server is of correct type, create functions to check that every
  property of object is of expected type like it was done on backend when recieving data from front end. See
  proofing requests from part c or https://fullstackopen.com/en/part9/typing_an_express_app#proofing-requests
- .:. typing axios.get can be dangerous bc we are just telling the compiler to trust the data to be of correct
  type. Typing axios.get is as safe as using type assertion:
```typescript
  useEffect(() => {
    axios.get('http://localhost:3001/notes').then(response => {
      // response.body is of type any
      setNotes(response.data as Note[])
    })
  }, [])
```
## Refactoring 
- types.ts
```typescript
export interface Note {
    id: number;
    content: string;
}
export type New_Note = Omit<Note, 'id'>
```
- note_service.ts
```typescript
import axios from 'axios';
import { Note, New_Note } from '../types';
const base_url = 'http://localhost:3001/notes'
export const get_all_notes = () => {
    return axios
        .get<Note[]>(base_url)
        .then(response => response.data)
}
export const create_note = (object: New_Note) => {
    return axios
        .post<Note>(base_url, object)
        .then(response => response.data)
}
```
- App.tsx becomes
```typescript
import { useState, useEffect} from 'react';
import {Note} from './types';
import {get_all_notes, create_note} from './services/note_service';
const App = () => 
{
    const [new_note, set_new_note] = useState<string>("");
    const [notes, set_notes] = useState<Note[]>([]);
    useEffect(() => {
        get_all_notes().then(data => {
            set_notes(data)
        })
    }, [])
    const create_new_note = (event: React.SyntheticEvent) => {
        event.preventDefault();
        create_note({content: new_note}).then(data => {
            set_notes(notes.concat(data))
        })
        set_new_note('');
    };
    const on_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        set_new_note(event.target.value);
    }
    return (
        <div>
            <form onSubmit={create_new_note}>
                <input
                    value={new_note}
                    //onChange={(event) => set_new_note(event.target.value)}
                    onChange={on_change}
                />
            </form>
            <ul>
                {notes.map(note => 
                    <li key={note.id}>{note.content}</li>     
                )}
            </ul>
        </div>
    )
}
export default App
```
# interfaces vs types
- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
- It is recommended to use interfaces in most cases.
- If multiple interfaces have same name their types will be merged.
- type are unique so if attempt to create multiple with same name, there will be errors
