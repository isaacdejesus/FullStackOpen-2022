## Running app
- npm intall
- npm run server
- npm run dev
- Both server and App should be running for app to work properly
## REST
- Json server acts as REST/RESTful API for our data
- In REST data such as /notes are considered resources
- Each resource has a unique address associated with it/it's URL
    - /notes/3 is note with id = 3
- Resources are fetched using HTTP GET request. 
    - HTTP GET to notes/3 would return note with id = 3
    - HTTP GET to /notes would return all notes
- Creating new resources is done using HTTP POST request
    - Request is made to url using REST convention
    - Data for new resource is sent in body of request
    - Json server requires data to be sent in JSON format
    - Content-Type header with value application/json
## Sending data to server
```javascript
import {useState} from 'react'
import {Notes} from '../types'
import axios from 'axios'
const Form = ({notes, set_notes}:{notes: Notes[], set_notes: (arg0: Notes[])=> void} ) => {
    const [new_note, add_new_note] = useState<string>('a new note...')
    const on_change = (event:any) => {
        event.preventDefault();
        add_new_note(event.target.value)
    }
    const submit_handler =(event: any) => {
        event.preventDefault();
        const note_object = {
            content: new_note,
            important: Math.random() < .5,
        }
        axios
            .post('http://localhost:3001/notes', note_object)
            .then((response: any) => {
                set_notes(notes.concat(response.data));
                add_new_note('');
            })
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
- The axious post request is placed in the submit_handler function. 
- Newly created note/object is placed in the post request. 
- Server returns the newly created note resource in response.data
- Note/data returned from server is used to update state/notes which causes component
  to re-render displaying the newly updated data
- NOTE: data returned from server must be saved to state in order to new content to be
  displayed
- dev tools, network tab can be used to data transfers between front and backend
- Network > Header tab returns: Status 201 created if POST request was successful
- Network > Request tab shows json content sent to server
- Network > Response shows json content returned by server. Content in response.data
- visiting localhost:3001/notes can be used to revify POST request was successful
- Note: No longer adding id to the new object/note bc server will create assign it an id
  .:. server will return newly created note with id created at server side
  - For some reason json server is returning ids as strings so had to change type of id to string
## HTTP PUT to update data on server
```javascript
import {Notes} from '../types';
import axios from 'axios'
const Note = ({note, notes, set_notes}:{note: Notes, notes: Notes[], set_notes: (arg0: Notes[])=> void} ) => {
    const toggle_importance = (id: string) => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n=> n.id === id)
        if(note)
        {
            const changed_noted = {...note, important: !note.important}
            axios.put(url, changed_noted). then(response => {
                set_notes(notes.map(n => n.id !== id ? n : response.data))
            })
        }
    }
    const label = note.important
        ? 'Make not important' : 'Make important'
    return(
        <li>{note.content}
                <button onClick={()=>toggle_importance(note.id)}>{label}</button>
        </li>
    )
}
export default Note;
```
- toogle_importance handler function is called whenever button is clicked with switches importance of
  note. The handler takes id and uses it to find the given note, then making necessary changes in this
  case change importance of note then using HTTP PUT to send updates note to server and finally, taking 
  response returned from server and adding note to state
- I really don't understand why the following is needed.
```javascript
<button onClick={()=>toggle_importance(note.id)}>{label}</button>
```
- Is it bc function takes argument? Other handler functions take arg but it's event so not something
  we need to manually pass as arg. Ugh
- NOTE: Both PUT and POST take url and object content as args. However, POST URL is /notes
  meanwhile PUT URL is specific resource to be mofied /notes/id
```javascript
    const toggle_importance = (id: string) => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n=> n.id === id)
        if(note)
        {
            const changed_noted = {...note, important: !note.important}
            axios.put(url, changed_noted). then(response => {
                set_notes(notes.map(n => n.id !== id ? n : response.data))
            })
        }
    }
```
- First line is url of resource/note to be updates
- Second line declares a variable to look for and hold note to be updated
- Next if note is found, a new note with contents of existing note is made and changes made
  to new copied note
  ```javascript
   const changed_noted = {...note, important: !note.important}
  ```
- Recall {...note} creates a new object with copies of all properties of original note object
  to be changed
```javascript
   const changed_noted = {...note, important: !note.important}
```
- {...note, important: true} means copy all properties of object to be modified but only modify the
  important property
- Recall we make a copy of the object and make changes to it bc it isn't good to mutate state objects
  directly. 
- Finally the updated note is sent to server using PUT method and returned note is added to state
## Extracting communication with backend to separate module
- Create new dir within src/ called services and a file called notes.tsx
- notes.tsx will contain all logic to communicate with server in form of functions
```javascript
import axios from 'axios'
import { Note_To_Server} from '../types'
const base_url = "http://localhost:3001/notes"
const get_all = () => {
    const request = axios.get(base_url);
    return request.then(response => response.data);
}
const create = (new_object: Note_To_Server) => {
    const request = axios.post(base_url, new_object);
    return request.then(response => response.data);
}
const update = (id: string, new_object: Note_To_Server) => {
    const request = axios.put(`${base_url}/${id}`, new_object);
    return request.then(response => response.data);
}
export default {get_all, create, update}
```
- The module contains:
    - get_all() function which sends GET request to server and returns request.data or all notes
    - create() function which sends POST request to server and returns newly created note as promise
    - update() function which takes the resource/note we want to modify can sends PUT request to server  and
      returns modified resource/note
- At end of module, we export the functions to be used in other files
## Using the server communication module functions
- Code to fetch notes from server becomes/send GET request
```javascript
    useEffect(() => {
        note_service
            .get_all()
            .then(initial_notes => {
                set_notes(initial_notes)
            })
    }, [])
```
- Code to send POST request to server becomes
```javascript
    const submit_handler =(event: any) => {
        event.preventDefault();
        const note_object = {
            content: new_note,
            important: Math.random() < .5,
        }
        note_service
            .create(note_object)
            .then(returned_noted => {
                set_notes(notes.concat(returned_noted));
                add_new_note('');
            })
    }
```
- Code to update resource/note or send PUT request becomes
```javascript
    const toggle_importance = (id: string) => {
        const note = notes.find(n=> n.id === id)
        if(note)
        {
            const changed_noted = {...note, important: !note.important}
            note_service
                .update(id, changed_noted)
                .then(returned_note => {
                set_notes(notes.map(n => n.id !== id ? n : returned_note))
            })
        }
    }
```
## Promises and errors
- Suppose users were able to delete notes and then tried to change importance of a deleted note
  would lead to errors. Such errors can be caught by placing .catch methods at end of promise chain
- Recall .then callback method is used to obtain result of promise, if result of promise is
  rejected/failed, the .catch callback method can be used to handle error
- If a request fails, the event handler registered with the catch method is called
- .catch method is placed at end of promise chain.
- Making HTTP requests creates a promise chain
```javascript
axios
  .put(`${baseUrl}/${id}`, newObject)
  .then(response => response.data)
  .then(changedNote => {
    // ...
  })
  .catch(error => {
    console.log('fail')
  })
```
- Above is a promise chain of .then callbacks followed by .catch to handle error
```javascripts
    const toggle_importance = (id: string) => {
        const note = notes.find(n=> n.id === id)
        if(note)
        {
            const changed_noted = {...note, important: !note.important}
            note_service
                .update(id, changed_noted)
                .then(returned_note => {
                set_notes(notes.map(n => n.id !== id ? n : returned_note))
            })
            .catch(error => {
                alert(
                    `The note '${note.content}' was already deleted from server`
                    )
                set_notes(notes.filter(n => n.id !== id))
            })
        }
    }
```
## Reading material for async js and promises
- https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch3.md
- https://javascript.info/promise-chaining
- https://github.com/getify/You-Dont-Know-JS/tree/1st-ed?tab=readme-ov-file
## Styling react apps
- Create index.css in src folder
- import to main.tsx 
```javascript
import './index.css'
```
- styling can then be created in index.css
```css
h1 {
    color: green;
    font-style: italic;
}
li {
    color: grey;
    padding-top: 3px;
    font-size: 15px;
}

.note {
    color: grey;
    padding-top: 5px;
    font-size: 15px;
}
```
- CSS rules are made up of selectors and declarations. 
    - Selector is element the rules/styling apply to
    - Declarations set property values to selector
    - A css rule can have many properties
    - Example. Above h1 is selector and color: green is property/declaration
- Class selector can be used to style a specific element
    - NOTE: Above ex, h1 styling applies to all styling but if wanted to only style a
      given h1 then class selector can be used.
    - Classes selectors are defined with .classname syntax
    - Class selectors are applied in app using className='classname'
    - .note above is example of class selector
## Improving error messages
- Convert alert error msg into own component
- Create Notification component
```javascript
const Notification = ({message}: {message: string | null}) => {
    if(message === null)
        return null;
    return (
        <div className='error'>
            {message}
        </div>
    )
}
export default Notification;
```
- Next component is place within app and state is created to capture the error msg
```javascript
import { useState, useEffect} from 'react';
import {Notes} from './types';
import Note from './components/Note';
import Form from './components/Form'
import Notification from './components/Notification'
import note_service from './services/notes'
const App = () => {
    const [notes, set_notes] = useState<Notes[]>([])
    const [show_all, set_show_all] = useState<boolean>(true);
    const [error_msg, set_error_msg] = useState<string | null>(null)
    useEffect(() => {
        note_service
            .get_all()
            .then(initial_notes => {
                set_notes(initial_notes)
            })
    }, [])
    const notes_to_show = show_all
        ? notes
        : notes.filter((note:Notes)=> note.important === true)
    return (
        <div>
        <h1>Notes</h1>
        <Notification message={error_msg} />
        <div>
            <button onClick={()=> set_show_all(!show_all)}>

                Show {show_all ? 'important' : 'all'}
            </button>
        </div>
            <ul>
                {notes_to_show.map((note: Notes) => 
                    <Note 
                        key={note.id} 
                        note={note} 
                        notes={notes}
                        set_notes={set_notes}
                        set_error_msg={set_error_msg}
                    />
                )}
            </ul>
            <Form notes={notes} set_notes={set_notes}  />
        </div>
    )
}
export default App
```
- NOTE: set_error_msg function is passed to component responsible for catching error
  so that error can be set to state
```javascript
import {Notes} from '../types';
import note_service from '../services/notes'
const Note = ({note, notes, set_notes, set_error_msg}:{note: Notes, notes: Notes[], set_notes: (arg0: Notes[])=> void, set_error_msg: (arg0: string | null)=> void} ) => {
    const toggle_importance = (id: string) => {
        const note = notes.find(n=> n.id === id)
        if(note)
        {
            const changed_noted = {...note, important: !note.important}
            note_service
                .update(id, changed_noted)
                .then(returned_note => {
                set_notes(notes.map(n => n.id !== id ? n : returned_note))
            })
            .catch(error => {
                set_error_msg(`The note '${note.content}' was already deleted from server`)
                setTimeout(() => {
                    set_error_msg(null)
                }, 5000)
                set_notes(notes.filter(n => n.id !== id))
            })
        }
    }
    const label = note.important
        ? 'Make not important' : 'Make important'
    return(
        <li>{note.content}
                <button onClick={()=>toggle_importance(note.id)}>{label}</button>
        </li>
    )
}
export default Note;
```
- Here, .catch function catches error and uses the set_error_smg function to set error to state
- Next a timeout function is set in order to reset the state of error smg to null which makes
  error flash away
- Finally notice the sevices GET function has been modified to contain a fake note not in server
  which is used to test the error msg
```javascript
import axios from 'axios'
import { Note_To_Server} from '../types'
const base_url = "http://localhost:3001/notes"
const get_all = () => {
    //const request = axios.get(base_url);
    //return request.then(response => response.data);
    const request = axios.get(base_url)
    const non_existent = {
        id: "22234",
        content: "not saved on server",
        important: true,
    }
    return request.then(response => response.data.concat(non_existent))
}

const create = (new_object: Note_To_Server) => {
    const request = axios.post(base_url, new_object);
    return request.then(response => response.data);
}

const update = (id: string, new_object: Note_To_Server) => {
    const request = axios.put(`${base_url}/${id}`, new_object);
    return request.then(response => response.data);
}
export default {get_all, create, update}
```
- get_all function adds a fake note at the end of Notes returned used to check error msg
## Inline styles
```javascript
const Footer = () => {
    const footer_style = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footer_style}>
            <br />
            <em>Note app...Footer</em>
        </div>
    )
}
export default Footer;
``` 
- Above is example of inline styling
## See section 2e important remarks for more intel on useEffect
