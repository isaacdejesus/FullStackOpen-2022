## Create React app using Vite
- npm create vite@latest NAME
  Allows to select template to use
- npm create vite@latest NAME -- --template react
  creates app from template
-----------------------------------------------------------------------
## Avoid <div> <p> errors
=======================================================================
- vim tsconfig.json
Change:
```javascript
"compilerOptions": {
    "moduleResolution": "node"
}

```
-----------------------------------------------------------------------
## Notes
=======================================================================
    - React component names should be capitalized. Ex. Footer instead of
      footer
    - React component needs a root element. Meaning content needs to be
      wrapped within a div or <> fragment
      ```javascript
      const App = () => { //stuff within return() needs to be within div or <>
          return (
          <>
            <h1>Gello</h1>
            <Hello name="isaac" />
          </>
                 )
      }

      ```
      - React can't render entire objects. Break object down to properties
        in order to render object
        ```javascript
        const App = () => {
            const friends = [
            {name: 'teresa', age: 24},
            {name: 'maya', age: 24},
            ]
            return (
                <div>
                    <p>{friends[0]}</p>  //won't render
                    <p>{friends[0].name} {friends[0].age}</p>  //will work
                </div> 
                )
        }

        ```
-----------------------------------------------------------------------
[+] Props
=======================================================================
    - props are passed as an object
    [example]
    ```javascript
    const hello = (props) => {
        return (
            <p>Hello {name}, your are {age} years old</p>
               )
    }
    const App = () => {
        const name = 'joe';
        const age = '35';
        return (
            <Hello name="isaac", age=22 />
            <Hello name={name}, age={age} />   //variables can be passed as props 
            )
    }
    ```
    - In above example props is an object such:
    ```javascript
    props = {
        name: 'isaac',
        age: 22,
    }
    ```
    - props object can be destructured into variables
    [example]
    ```javascript
    const hello = ({name, age}:{name: string, age: number}) => { //ts 
        return (
            <p>Hello {name}, your are {age} years old</p>
               )
    }
    ```
    - Can also define functions withint component/function and call it when 
      component is rendered
    [example]
    ```javascript
    const hello = ({name, age}:{name: string, age: number}) => { //ts 
    const born_year = () => new Date().getFullYear() - age;
        return (
            <p>Hello {name}, your are {age} years old</p>
            <p>You were probaly born in {born_year()}</p>  //call func at render time

               )
    }
    ```
