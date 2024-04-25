## To run the app
 - npm install
 - npm run dev
---------------------------------------------------------------------------------------------------
## App showcases usage of state, event handling and passing props to child components
---------------------------------------------------------------------------------------------------
## State
```js
const App = () => {
    const [counter , set_counter] = useState<number>(0);
    setTimeout(  //invoke set timeout function
        () => set_counter(counter + 1),
            1000
            )
    return (
        <div>
            {counter}
        </div>
    )
}
```
- ```js const [counter, set_counter] = useState<number>(0);```
Defines state: counter is set to initial value of 0 and set_counter function is used to 
modify state/update counter value
- Next invoke the setTimeout function 
```js
setTimeout(  //invoke set timeout function
    () => set_counter(counter + 1),
    1000
)
```
- Above function calls the set_counter every seconds and updates the counter + 1
  set_counter updates the state/ the value of counter which in turn causes component/page to
  re-render
---------------------------------------------------------------------------------------------------
## Event Handling
- Event handler are linked to a function that is triggered in respose to user interaction. 
  [Example]
  ```js 
  import { useState } from 'react'
  const App = () => {
    const [counter , set_counter] = useState<number>(0);
    const handle_click = () => {
        set_counter(counter + 1)
            }
    return (
        <div>
            <div>{counter}</div>
            <button onClick={handle_click}>   //calling reference to event handler function
                Increment
            </button>
            <button onClick={() => set_counter(0)}>  //defining handler function inline
                Reset
            </button>
        </div>
    )
}
  ```
- Note: There are 2 ways to pass event handlers. 
- See "Increment": Can pass a reference to a funtion. This is the prefered way to handle
  events
- See "Reset": Can define an inline function
    - Note: Event handlers are functions! .:. the following is not allowed:
    ```js
        <button onClick={set_counter(counter + 1)}>   //Not valid bc handler must be a function
            Increment
        </button>
    ```
    ```js
        <button onClick={()=> set_counter(counter + 1)}>   //valid inline handler function
            Increment
        </button>
    ```
---------------------------------------------------------------------------------------------------
## Passing state to child components
===================================================================================================
- It is recommended to create small & reusable components. 
- Best practice for passing state is to lift state to closest common ancestor
- handler function can be passed as props to child component to call when action is triggered
- See code: Created <Button /> Component and pass handler function and text to be displayed 
  as props: ```js <Button handler={handler_func} text="text" />```
---------------------------------------------------------------------------------------------------
[+] IMPORTANT!
===================================================================================================
    - Changes to state cause re-rendering of component/page
---------------------------------------------------------------------------------------------------
