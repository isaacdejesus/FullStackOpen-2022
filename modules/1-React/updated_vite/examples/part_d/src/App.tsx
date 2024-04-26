import { useState } from 'react'

const History = ({clicks_data}: {clicks_data: string[]}) => {
    if (clicks_data.length === 0){
        return (
            <div>
                App is used by pressing buttons
            </div>
        )
    }
    return (
        <div>
            Button press history: {clicks_data.join(' ')};
        </div>
    )
}
const App = () => {
    const [left, set_left] = useState<number>(0)
    const [right, set_right] = useState<number>(0)
    const [all_clicks, set_all_clicks] = useState<string[]>([])
    const [total, set_total] = useState<number>(0)
    const handle_left_click = () => {
        set_all_clicks(all_clicks.concat('L'));
        const updated_left = left + 1;
        set_left(updated_left);
        set_total(updated_left + right)
    }
    const handle_right_click = () => {
        set_all_clicks(all_clicks.concat('R'));
        const updated_right =  right + 1
        set_right(updated_right);
        set_total(left + updated_right)
    }
    return (

        <div>
            {left}
            <button onClick={handle_left_click}>Left</button>
            <button onClick={handle_right_click}>Right</button>
            {right}
        <History clicks_data={all_clicks} />
            <p>Total: {total}</p>
        </div>
    )
}


export default App
