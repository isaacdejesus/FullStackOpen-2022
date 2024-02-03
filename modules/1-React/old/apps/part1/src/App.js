const Hello = (props) => {
    return (
        <div>
        <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    const name = "Peter"
    const age = 10
    return (
        <div>
            <h1> Greetings</h1>
        <Hello name= "Teresa" age = { 18 + 5 }/>  /*Calling component Hello defined above*/
        <Hello name= {name} age = {age}/>
        </div>
    )
}

/*const App = () => {  //defines App component using arrow notation
    const now = new Date()
    const a = 10
    const b = 20
    return(
      <div>
        <p> Hello, the time now is {now.toString()}</p> 
        <p>
        {a} plus {b} is {a + b}  //js within {} is eval and result embedded into html/component
        </p>
      </div>
    )
}*/

export default App;
