const Hello = ({name, age}: {name: string, age: number}) => {
    const born_year = () => new Date().getFullYear()
    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
            </p>
            <p>So you were probably born in {born_year()}</p>
        </div>
    )
}
const App = () => {
    const name = "isaac";
    const age = 28;
    return (
        <div>
            <h1>Greetins </h1>
            <Hello name="joe" age={25 + 8}/>
            <Hello name={name} age={age}/>
        </div>
    )
}
export default App

