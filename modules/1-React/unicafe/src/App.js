import { useState } from "react";
import Button from './components/Button'
import Statistics from "./components/Statistics";
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return(
    <div>
      <h1>Give feedback</h1>
      <Button text="good" setFunction = {() => setGood(good + 1)}/>
      <Button text="neutral" setFunction = {() => setNeutral(neutral + 1)}/>
      <Button text="bad" setFunction = {() => setBad(bad + 1)}/>
      
      <Statistics text="good" value={good}/>
      <Statistics text="bad" value={bad}/>
      <Statistics text="neutral" value={neutral}/>
      <Statistics text="all" value={good + bad + neutral}/>
      <Statistics text="positive" value={(good)/(good+bad+neutral)}/>
    </div>
  )
}
export default App;
