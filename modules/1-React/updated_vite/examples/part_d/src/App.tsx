import { useState } from 'react'

const App = () => {
    const [clicks, set_clicks] = useState<Clicks>({left:0, right: 0});
    const handle_left_click = () => {
        const new_clicks: Clicks = {
            left: clicks.left + 1,
            right: clicks.right
        }
        set_clicks(new_clicks);
    }
    const handle_right_click = () => {
        const new_clicks: Clicks = {
            left: clicks.left,
            right: clicks.right + 1
        }
        set_clicks(new_clicks);
    }
    return (

        <div>
            {clicks.left}
            <button onClick={handle_left_click}>Left</button>
            <button onClick={handle_right_click}>Right</button>
            {clicks.right}
        </div>
    )
}

interface Clicks{
    left: number;
    right: number;
}
export default App
