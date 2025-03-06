## Run app
- npm install
- npm run dev
## App showcases:
- Complex state
- Arrays
- Conditional rendering
## Complex state:
- Suppose need to keep track of 2+ states. Could create a hook for each state
```typescript
const [left, set_left] = useState(0);
const [right, set_right] = useState(0);
```
- However, a more efficient way is to create state as an object containing both hooks
```typescript
const [clicks, set_click] = useState({left: 0, right: 0})
```
## Neater way to update complex/object state
```typescript
const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}

const handleRightClick = () => {
  const newClicks = { 
    ...clicks, 
    right: clicks.right + 1 
  }
  setClicks(newClicks)
}
```
- `{clicks}` creates a new object that copies all properties from clicks object. Can then
  modify a given property: 
    - `{...clicks, right: 1}` : Means we want to copy all properties of
      original object and only update the value of right property to 1.
    - `{...clicks, right: clicks.right + 1}` : Means copy all properties of original object and
      only update the value of right property by incrementing by 1
- Above can be further simplified into:
```typescript
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })
```
- NOTE: Mutating state directly should be avoided due to unexpected side effetcs. .:. following 
  does work but shouldn't be done
```typescript
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}
```
- NOTE: If possible avoid storing state in an object bc in this case there was no real benefit
## Arrays as state
```typescript
const App = () => {
    const [left, set_left] = useState<number>(0)
    const [right, set_right] = useState<number>(0)
    const [all_clicks, set_all_clicks] = useState<string[]>([])
    const handle_left_click = () => {
        set_all_clicks(all_clicks.concat('L'));
        set_left(left + 1);
    }
    const handle_right_click = () => {
        set_all_clicks(all_clicks.concat('R'));
        set_right(right + 1);
    }
    return (

        <div>
            {left}
            <button onClick={handle_left_click}>Left</button>
            <button onClick={handle_right_click}>Right</button>
            {right}
            <p>{all_clicks.join(' ')}</p>
        </div>
    )
}
```
- all_clicks is an arr of strings, ini to '[]'
- Handler functions now add 'L' or 'R' depending on click type, when updating state
- NOTE: As stated before, state should not be modified directly .:. concat is used instead of push
## State is updated Async
```typescript
const App = () => {
    const [left, set_left] = useState<number>(0)
    const [right, set_right] = useState<number>(0)
    const [all_clicks, set_all_clicks] = useState<string[]>([])
    const [total, set_total] = useState<number>(0)
    const handle_left_click = () => {
        set_all_clicks(all_clicks.concat('L'));
        set_left(left + 1);
        set_total(left + right)
    }
    const handle_right_click = () => {
        set_all_clicks(all_clicks.concat('R'));
        set_right(right + 1);
        set_total(left + right)
    }
    return (

        <div>
            {left}
            <button onClick={handle_left_click}>Left</button>
            <button onClick={handle_right_click}>Right</button>
            {right}
            <p>{all_clicks.join(' ')}</p>
            <p>Total: {total}</p>
        </div>
    )
}
```
- Above would result in total always being less than actual. Ex. LR will display total: 1
  Happens bc state is async, state will update at some point before component is rendered 
  != immediately. Meaning flow of code might not return in order it was writen
  ```typescript
    const handle_right_click = () => {
        set_all_clicks(all_clicks.concat('R'));
        set_right(right + 1);
        set_total(left + right)
    }
  ```
  - For example, above, set_total() might run before set_right() runs, resulting in set_total()
    using old value/prior to being updated
- Fix is to manually update value to be updated and set by state function. This makes sure updated
  value is passed to functions depending on updated value.
  <honestly, idk if this explanation is correct. It makes sense but haha,idk>
- Following code fixes the error:
```typescript
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
```
## Conditional rendering
```typescript
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
- History component is conditionally rendering depending on size of clicks_data array.
    - If there are clicks/data to display it will display contents of array
    - Else it displays a message informing user of how to use the app
```
## Debugging
- Ctrl + Shift + i to open console
- React dev tools extension to chrome gives access to the "components" tab within console
  Components tab can be used to check props and value of hooks/state
## Rules of Hooks/State
- useState and useEffect should NOT be called inside a loop, a conditional statement or
  any place that is not a function defining a component! Bc want hooks to be called in 
  same order
- .:. Hooks/state should only be called from inside function body trhat defined a rect
  component
```typescript
    const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
    }
```
## Event handling 
- Event handlers should always be:
    - A function/Inline function
        ```typescript
            <button onClick={()=> set_value(0)}>button</button>
        ```
    - A reference to a function
        ```typescript
            <button onClick={handler_function}>button</button>
        ```

## Event handler can be a function that calls another function

```typescript
    const App = () => {
        const [value, setValue] = useState(10)
        const hello = () => {
        const handler = () => console.log('hello world')
            return handler
  }
    return (
        <div>
            {value}
            <button onClick={hello()}>button</button>
        </div>
        )
    }
```
- Kinda pointless. Used to define a single function that handles dif states but 
  not exactly a must. 
## Don't define components within components
```typescript
// This is the right place to define a component
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // Do not define components inside another component

  const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```
- Causes optimization problems
