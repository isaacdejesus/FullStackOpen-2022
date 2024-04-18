import {Courses, Part} from '../types';
const App = () => {
    const course = {
        name: 'Half Stack Application development',
        parts : [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'using props to pass data',
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
            <Header course_object={course} />
            <Content course_object={course} />
            <Total course_object={course} />
        </div>
    )
}
const Header = (props:Courses) => {
    return(
        <h1> {props.course_object.name}</h1>
    )
}
const Content = (props:Courses) => {
    return(
        <>
            <Part_ part={props.course_object.parts[0].name} exercise={props.course_object.parts[0].exercises}/>
            <Part_ part={props.course_object.parts[1].name} exercise={props.course_object.parts[1].exercises}/>
            <Part_ part={props.course_object.parts[2].name} exercise={props.course_object.parts[2].exercises}/>
        </>
    )
}
const Total = (props:Courses) => {
    return(
        <p> Number of exercises {props.course_object.parts[0].exercises + props.course_object.parts[1].exercises + props.course_object.parts[2].exercises}</p>
    )
}
const Part_ = (props:Part) => {
    return(
       <p>{props.part} {props.exercise}</p> 
    )
}
export default App


