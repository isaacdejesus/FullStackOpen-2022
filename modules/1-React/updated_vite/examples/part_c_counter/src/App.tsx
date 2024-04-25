import { useState } from 'react'
const Display = ({counter}: {counter: number}) => {
    return (
        <div>{counter}</div>
    )
}
const Button = ({click_handler, text}: {click_handler: ()=> void, text: string}) => {
    return(
        <button onClick={click_handler}>
            {text}
        </button>
    )
}
const App = () => {
    const [counter , set_counter] = useState<number>(0);
    const increase = () => set_counter(counter + 1);
    const decrease = () => set_counter(counter - 1);
    const reset = () => set_counter(0)
    return (
        <div>
            <Display counter={counter} />
            <Button
                click_handler={increase}
                text='increase'
            />
            <Button
                click_handler={decrease}
                text='decrease'
            />
            <Button
                click_handler={reset}
                text='reset'
            />
        </div>
    )
}
export default App
