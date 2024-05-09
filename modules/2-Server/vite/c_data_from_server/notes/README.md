## JSON server to fake retrieving data from db
- create db.json file and put data in it
```javascript
{
  "notes": [
    {
      "id": 1,
      "content": "HTML is easy",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "important": true
    }
  ]
}
```
- Above is mock data coming from server
- Next install json-server
```javascript
npm install -g json-server  //globally
npm install json-server   //for current project only
```
- run json server
```javascript
json-server --port 3001 --watch db.json
```
- install json lite extention on firefox to view json content on browser
- Can view content by visiting localhost:3001/notes
- NOTE: Saving content on json server is substitu for actual data coming form a server
  It it for learning purposes. DO NOT USE IN PRODUCTION. NEED A REAL SERVER
- json-server stores data in db.json file which acts as server. In real app this data
  should be saved to a database.
## Fetching data from server
- In Synchronous way of making requests the code will be executed line by line. Code will stop
  to wait for HTTP request before moving onto next line of code. 
- Javascript engines are single threaded but provide asynchronous abilities. Which allows 
  different requests to run in parallel. CPU starts a process and moves to the next one while
  waiting for result from previous process and so on. Eventuall all responces are obtained
  before function returns/ends
- npm(Node Package Manager) is used to manage packages needed by a javascript project
  Project dependencies are listed in the package.json file. When npm install is run at the
  beginning of project, npm checks package.json for project dependencies and installs them
- Install axios library/package for interacting with server
```javascript
npm install axios
```
- Example package.json: It has previously installed json-server and axios as dependencies
```javascript
{
  "name": "notes",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.8",
    "json-server": "^1.0.0-alpha.23",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
```
- json server can be saved as dev dependency only.
```javascript
npm install json-server --save-dev
```
- Then add the following to scripts section of package.json
```javascript
"server": "json-server -p3001 --watch db.json"
```
```javascript
{
  "name": "notes",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "server": "json-server -p3001 --watch db.json"   //add this to be able to run npm run server
  },
  "dependencies": {
    "axios": "^1.6.8",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "json-server": "^1.0.0-alpha.23",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
``` 
- Now can run below command and json server will auto start
```javascript
npm run server
```
- NOTE: db.json file must be in root dir. Not in src folder
- Run server: npm run server
- Run React app: npm run dev
- Different ways to install depedencies with npm: The first one is a dependency required by app to run
  the second one is a dev dependency not required by app to run. Only needed in dev mode
  - 
    ```javascript
    npm install axios
    ```
  - 
    ```javascript 
    npm install json-server --save-dev
    ```
## axios and promises
- axios is imported like other modules
```javascript
import axios from 'axios'
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)
```
- Axios GET returns a promise. A promise is an object that represents an asynch operation. Promise can have
  3 different states:
    - Pending: Means final value is not available yet.
    - Fulfilled/Resolved: Means op has been completed and final value is available
    - Rejected/Failed: Means error prevented final value from being determined
- Accessing the result of a promise is done via event handler using the then method
```javascript
const promise = axios.get('http://localhost:3001/notes')
promise.then(response => {
  console.log(response)
})
```
- Callback function registeered by then method returns a response object. response object contains
  essential data related to HTTP GET request such as data, status code and headers.
```javascript
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```
- Data returned by server is plain text. Server specifies data format to be application/json using
  content-type header. Axios library can be used to turn plain text to correct format.
- Code for fetching data from server using axios
```javascript
import { useState, useEffect} from 'react';
import axios from 'axios'
import {Notes} from './types';
import Note from './components/Note';
import Form from './components/Form'
const App = () => {
    const [notes, set_notes] = useState<Notes[]>([])
    const [show_all, set_show_all] = useState<boolean>(true);
    useEffect(() => {
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                set_notes(response.data)
            })
    }, [])
    console.log('render', notes.length, 'notes');
    const notes_to_show = show_all
        ? notes
        : notes.filter((note:Notes)=> note.important === true)
    return (
        <div>
        <h1>Notes</h1>
        <div>
            <button onClick={()=> set_show_all(!show_all)}>

                Show {show_all ? 'important' : 'all'}
            </button>
        </div>
            <ul>
                {notes_to_show.map((note: Notes) => 
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <Form notes={notes} set_notes={set_notes}  />
        </div>
    )
}
export default App
```
- useEffect() hook is required when fetching data from server
```javascript
const App = () => {
    const [notes, set_notes] = useState<Notes[]>([])
    const [show_all, set_show_all] = useState<boolean>(true);
    useEffect(() => {
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                set_notes(response.data)
            })
    }, [])
``` 
- First, the body function defining component is executed and component is rendered for first time
- Next useEffect() is executed after component/page renders
- Axios begins fetching data from server. 
- Once data fetched is returned/available from promise, it is stores to state
    ```javascript
        set_notes(response.data);
    ```
- useEffect() takes 2 parameters. Better visualized in code below
```javascript
const hook = () => {
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      setNotes(response.data)
    })
}
useEffect(hook, [])
``` 
- First parameter is a function/effect. By default effect runs after every completed render but second
  parameter can be used to fire effect only when certain values change.
- Second parameter specifies when or how often the effect should run. If second parameter is [], then 
  default behavior is to only run effect after first/initial render
- useEffect() can be written in following ways. But second way is preferable:
```javascript
useEffect(() => {
  const eventHandler = response => {
    setNotes(response.data)
  }
  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, [])
```
```javascript
useEffect(() => {
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      setNotes(response.data)
    })
}, [])
```

