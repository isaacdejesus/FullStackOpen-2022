## run app
```javascript
npm install
npm run dev
```
## Saving data to component state
```typescript
import { useState } from 'react';
import {Notes} from './types';
import Note from './components/Note';
const App = ({notes_}: {notes_: Notes[]}) => {
    const [notes, set_notes] = useState<Notes[]>(notes_)
    return (
        <div>
        <h1>Notes</h1>
            <ul>
                {notes.map((note: Notes) => 
                    <Note key={note.id} note={note} />
                )}
            </ul>
        </div>
    )
}
export default App
```
- Saves the incoming notes data to state
- Saving working data/notes to state is needed to add functionally such as adding
  new notes. Changes to the state will re-render component/page so newly updated
  notes are displayed

## Adding functional form with ability to add content via form/user submission
- Called controlled component
- As explained above. Need to keep track of Notes/content being manipulated on state
- Whenever user uses form to submit new Note/content, it gets added to state which 
  results in re-rendering of page, updating content being displayed
```typescript
import { useState } from 'react';
import {Notes} from './types';
import Note from './components/Note';
import Form from './components/Form'
const App = ({notes_}: {notes_: Notes[]}) => {
    const [notes, set_notes] = useState<Notes[]>(notes_)
    return (
        <div>
        <h1>Notes</h1>
            <ul>
                {notes.map((note: Notes) => 
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <Form notes={notes} set_notes={set_notes}  />
        </div>
    )
}
export default App
```
- .. means bc
- .. Form component is own module, need to pass notes from state and function needed to update state
  to Form component so they can be used by Form component
```typescript
import {useState} from 'react'
import {Notes} from '../types'
const Form = ({notes, set_notes}:{notes: Notes[], set_notes: (arg0: Notes[])=> void} ) => {
    const [new_note, add_new_note] = useState<string>('a new note...')
    const on_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        add_new_note(event.target.value)
    }
    const submit_handler =(event: React.SyntheticEvent) => {
        event.preventDefault();
        const note_object = {
            content: new_note,
            important: Math.random() < .5,
            id: notes.length +  1
        }
        set_notes(notes.concat(note_object));
        add_new_note('');
    }
    return(
        <form onSubmit={submit_handler}>
            <input 
                value={new_note}
                onChange={on_change}
        />
            <button type="submit">save</button>
        </form>
    )
}
export default Form
```
- input is linked to state and on_change function which updates value of state whenever
  input field changes. 
- submit_handler() is triggered when button is clicked. It grabs input which is saved in state, creates a 
  new object which includes grabbed input from state and adds object to notes state using the 
  set_notes() function. Finally, input field is set to '' using the add_new_note state function

