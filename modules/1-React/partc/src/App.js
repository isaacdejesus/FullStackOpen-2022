import {useState } from 'react'

//example of passing an array as state and conditional rendering
//allClicks array keeps track of L/R clicks
const History = (props) => { //component uses conditional rendering
    if (props.allClicks.length === 0){
        return (
            <div>
                The app is used by pressing buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div> //join returns a string with spaces between elements
    )
}
const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>
        {text}
    </button>
)
const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([]) //keeps track of L/R clicks
    const handleLeftClick = () => {  //Update both array and left click count states
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }
    return (
        <div>
            {left}
            <Button handleClick = {handleLeftClick} text = "left"/>
            <Button handleClick = {handleRightClick}text = "right"/>
            {right}
            <History allClicks={allClicks}/>
        </div> //
    )
}
/* Uncomment for example of passing an object as state
//We use an object with 2 attributes instead of using two different hooks
//Object spread syntax makes a cp of the entire object, while only updating the value of the attribute stated.
//{...clicks, right: clicks.right + 1}
//...clicks means cp the remainder of the object as is
//right: clicks.right + 1 means this is the attribute we update by 1 while rest remains untouched
const App = () => {
    const [clicks, setClicks] = useState({ //create a single hook to control state of two different buttons
        left: 0, right: 0   //Here, the function takes in an object {left:0, right:0}
    })
    const handleLeftClick = () => 
        setClicks({...clicks, left: clicks.left + 1}) //spread syntax. Makes cp of object and adds + 1 to left
    
    const handleRightClick = () => 
        setClicks({...clicks, right: clicks.right + 1})
    return (
        <div>
            {clicks.left}
            <button onClick = {handleLeftClick}>left</button>
            <button onClick = {handleRightClick}>right</button>
            {clicks.right}
        </div>
    )
}*/
//uncomment for example of hooks and event handlers
/*const Display = ({ counter }) => (<div>{counter}</div>)
const Button = ({ onClick, text }) => (
        <button onClick = {onClick}>
            {text}
        </button>
    )

const App = () => {
    const [counter, setCounter] = useState(0)  //creates hook and sets value to 0
    //Everytime SetCounter modifies state the component re-renders in order to reflect changes
    //setCounter is a state modifying function. 
    //Everytime setCounter is called the App component is re-rendered to show changes
    const increeaseByOne = () => setCounter(counter + 1); //function to change state/increase counter by one
    const decreaseByOne = () => setCounter(counter - 1);
    const setToZero = () => setCounter(0);  //resets count to 0
    return (
        <div>
            <Display counter = {counter}/>
            <Button
                onClick = {increeaseByOne}
                text = 'Plus'
            />
            <Button
                onClick = {setToZero}
                text = "Zero"
            />
            <Button
                onClick = {decreaseByOne}
                text = "Minus"
            />
        </div>
    )
}*/
/* uncomment to see deconstruction and helper function in action
const Hello = ({name, age}) => { //deconstructs the props object and assigns values into vars name and age
    //const {name, age} = props  //since props is an object, can use deconstruction to assign values to const. use above method instead
    //props objects has the form
    //props = {
    //name: "isaaccc",
    //age: 33,
    //}
    //Above, we deconstruct prop into vars to be used instead of passing entire prop
    const bornYear = () =>  new Date().getFullYear() - age
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
        </p>
        <p> So you were probably born in {bornYear()}</p>
        </div>
    )
}
const App = () =>{
    const name = 'Isaac'
    const age = 23
  return (
      <div>
        <h1>Greetings</h1>
        <Hello name = "Maya" age={26 + 10}/>
        <Hello name = {name} age = {age}/>
      </div>
  );
}
*/
export default App;
