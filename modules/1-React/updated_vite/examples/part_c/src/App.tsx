const Hello = (props: person) => {
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
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

interface person {
    name: string
    age: number
}
