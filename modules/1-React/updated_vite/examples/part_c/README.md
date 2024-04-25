[+] Props
=======================================================================
    - props are passed as an object
    [example]
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
    ---------------------------------------
    - In above example props is an object such:
    props = {
        name: 'isaac',
        age: 22,
    }
    - props object can be destructured into variables
    [example]
    const hello = ({name, age}:{name: string, age: number}) => { //ts 
        return (
            <p>Hello {name}, your are {age} years old</p>
               )
    }
    - Can also define functions withint component/function and call it when 
      component is rendered
    [example]
    const hello = ({name, age}:{name: string, age: number}) => { //ts 
    const born_year = () => new Date().getFullYear() - age;
        return (
            <p>Hello {name}, your are {age} years old</p>
            <p>You were probaly born in {born_year()}</p>  //call func at render time

               )
    }

