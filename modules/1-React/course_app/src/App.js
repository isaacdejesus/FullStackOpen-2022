const Header = (props) => {
    return (
        <h1>{props.entireObject.name}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.entireObject.parts[0].name} exercise = {props.entireObject.parts[0].exercises} />
            <Part part={props.entireObject.parts[1].name} exercise = {props.entireObject.parts[1].exercises}/>
            <Part part={props.entireObject.parts[2].name} exercise = {props.entireObject.parts[2].exercises}/>
            <Part />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.entireObject.parts[0].exercises + props.entireObject.parts[1].exercises + props.entireObject.parts[2].exercises}</p>
    )
}

const Part = (props) => {
    return(
        <p>{props.part} {props.exercise}</p>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {

                name:'Fundamentals of React',
                exercises: 10
        },
        {
                name:'Using props to pass data',
                exercises: 7
        },
        {
                name: 'State of a component',
                exercises: 14
        }    
    ]
    }
    return (
        <div>
            <Header entireObject={course}/>
            <Content entireObject = {course}/>
            <Total entireObject = {course}/>
        </div>
    )
}

export default App;
