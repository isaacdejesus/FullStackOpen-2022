import {Courses, } from './types';
const App = () => {
    const course: Courses = {
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
const Header = ({course_object}:{course_object: Courses}) => {
    return(
        <h1> {course_object.name}</h1>
    )
}
const Content = ({course_object}: {course_object: Courses}) => {
    return(
        <>
            <Part_ part={course_object.parts[0].name} exercise={course_object.parts[0].exercises}/>
            <Part_ part={course_object.parts[1].name} exercise={course_object.parts[1].exercises}/>
            <Part_ part={course_object.parts[2].name} exercise={course_object.parts[2].exercises}/>
        </>
    )
}
const Total = ({course_object}: {course_object: Courses}) => {
    return(
        <p> Number of exercises {course_object.parts[0].exercises + course_object.parts[1].exercises + course_object.parts[2].exercises}</p>
    )
}
const Part_ = ({part, exercise}: {part: string, exercise: number}) => {
    return(
       <p>{part} {exercise}</p> 
    )
}
export default App


