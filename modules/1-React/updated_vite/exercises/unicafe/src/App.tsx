import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'
const App = () => {
    const [good, set_good] = useState<number> (0);
    const [neutral, set_neutral] = useState<number> (0);
    const [bad, set_bad] = useState<number> (0);
    const good_handler = () => {set_good(good + 1)};
    const neutral_handler = () => {set_neutral(neutral + 1)};
    const bad_handler = () => {set_bad(bad + 1)};
    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handler_function={good_handler} text={'good'}/>
            <Button handler_function={neutral_handler} text={'neutral'}/>
            <Button handler_function={bad_handler} text={'bad'}/>
            <h1>Statics</h1>
            <Statistics value={good} text='Good'/>
            <Statistics value={neutral} text='Neutral'/>
            <Statistics value={bad} text='Bad'/>
            <Statistics value={(good + neutral + bad) / 3} text='average'/>
            <Statistics value={(good)/(good + neutral + bad)} text='Good'/>
        </div>
    )
}

export default App
