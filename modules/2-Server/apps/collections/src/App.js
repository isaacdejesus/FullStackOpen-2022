import { useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes.js'
import Notification from './components/Notification.js'
//const App = ({ notes }) => { //props is an array of objects passed from index to App
    //above we deconstruct props into notes
    //const { notes } = props //destruction props object into notes 
const App = () => {
    //const [notes_, setNotes] = useState(notes)
    const [notes_, setNotes] = useState([])
    const [newNote, setNewNote] = useState(' ')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('Some error happened')
    //Use effect is combined with axios to connect and retrieve data from database
    //EffectHooks ini after components have rendered
    //axios.get begings fetching data from server
    //.then.response data arrives in response
    //setNotes(response.data) we finally assign data obtained to data_ array
    //useEffect() takes two parameters: effect function and how often effect should run
    //in our case the second parameter is [] which means only run effect during first render of component
    /* Old way using axios in code 
      useEffect(() => { //this entire function is first parameter
        console.log('effect')
        axios
            .get('http://localhost:3001/notes') //get promise from url
            .then(response => {                 //obtain response from url
                console.log('promise fulfilled')
                setNotes(response.data)         //assign data obtained from db to data_ array
            })
    }, []) //[] second parameter
    console.log('render', notes_.length, 'notes_')
    const addNote = (event) => {
        event.preventDefault() //need to prevent default because default behavior is to submit and refresh page
        /* old version without json
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes_.length + 1,
        }
        setNotes(notes_.concat(noteObject))
        setNewNote('')*/
        /* Old way using axios in code
        const noteObject = {
            content: newNote,
            date: new Date(),
            important: Math.random() < 0.5,
            //server generates own id
        }
        axios //.post means we are sending data into json
            .post('http://localhost:3001/notes', noteObject) //we send noteObject to url
            .then(response => { //data sent stored in data property of response object/json
                setNotes(notes_.concat(response.data))
                setNewNote('')
            })
    }
        const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/notes/${id}`  //grab url + id
        const note = notes_.find(n=> n.id ===id)  //find note using id
        const changedNote = { ...note, important: !note.important }  //use spread syntax to cp object and only change the important property
        axios.put(url, changedNote).then(response => {
            setNotes(notes_.map(note => note.id !== id ? note: response.data))
        })
    }


    */

    //new way with axios as outside module
    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])
    const toggleImportanceOf = id => {
        const note = notes_.find( n => n.id === id)
        const changedNote = {...note, important: !note.important}
        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes_.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '$(note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes_.filter(n=> n.id !== id))
            })
    } 
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNewNote('')
            })
    }
    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }
    const notesToShow = showAll
        ? notes_
        : notes_.filter(note => note.important === true)
        return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={()=> setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => //list items created by map must have unique key id
                    <Note 
                    key = {note.id} 
                    note = {note}
                    toggleImportance={() => toggleImportanceOf(note.id)}/>
                    )}
            </ul> 
        <form onSubmit = {addNote}>
            <input 
                value = {newNote}
                onChange = {handleNoteChange}/>
            <button type="submit">save</button>
        </form>
        </div>//map takes note object and returns a li with information obtained from note object

    )
}
export default App;
