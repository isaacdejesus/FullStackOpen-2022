const Hello = ({name, age}: {name: string, age: number}) => {
    return(
        <div>
            <p> Hello {name}, you are {age} years old</p>
        </div>
    )
}
const App = () => {
    const name = "Joe"
    const age = 18
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name='Isaac' age= {26 + 10}/>
            <Hello name= {name} age= {age}/>
        </div>
    )
}
export default App
