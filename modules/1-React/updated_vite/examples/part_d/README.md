## Run app
- npm install
- npm run dev
---------------------------------------------------------------------------------------------------
## App showcases:
- Complex state
- Arrays
- Conditional rendering
---------------------------------------------------------------------------------------------------
## Complex state:
- Suppose need to keep track of 2+ states. Could create a hook for each state
[example]
```js
const [left, set_left] = useState(0);
const [right, set_right] = useState(0);
```
- However, a more efficient way is to create state as an object containing both hooks
```js
const [clicks, set_click] = useState({left: 0, right: 0})
```
---------------------------------------------------------------------------------------------------
