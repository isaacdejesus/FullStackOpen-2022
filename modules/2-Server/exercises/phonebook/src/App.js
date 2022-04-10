import { useState } from 'react'
const PersonForm = ({newName, newPhone, handleNameChange, handleNumberChange, handleSubmit}) => {
    return(
        <form onSubmit = {handleSubmit}>
            <div>name: 
                <input 
                    value = {newName}
                    onChange = {handleNameChange}
                />
            </div>
            <div>number: 
                <input 
                    value={newPhone}
                    onChange = {handleNumberChange}
                />
            </div>
            <div>
                <button type = "submit">add</button>
            </div>
        </form>
    )
}
const Records = ({persons}) => {
    return(
        <>
        {persons.map(person => <p key= {person.id}> {person.name} {person.number}</p>)
        }    
        </>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        {name: "Isaac Reyes", number: "09-22722", id: 1},
        {name: "Teresa Mur", number: "08-22022", id: 2},
        {name: "Tristan Uno", number: "03-28222", id: 3},
        {name: "Joseph Roj", number: "07-22622", id: 4},
    ])
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")
    const handleNameChange = (event) => {
       setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewPhone(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newRecord = {
            name: newName,
            number: newPhone,
            id: persons.length + 1
        }
        const inBook = persons.find(person => person.name === newRecord.name)  //check if name already in book
        if(!inBook){
        setPersons(persons.concat(newRecord))
        setNewName("")
        setNewPhone("")
        }
        if(inBook){
            alert(`${newRecord.name} is already in the phonebook`)}
    }
    return(
        <div>
            <h2>Phonebook</h2>
            <PersonForm 
                newName = {newName}
                newPhone = {newPhone}                             
                handleNameChange = {handleNameChange}
                handleNumberChange = {handleNumberChange}
                handleSubmit = {handleSubmit}
        />
            <h2> Numbers...</h2>
            <Records persons = {persons}/>
        </div>
    )
}
export default App;
