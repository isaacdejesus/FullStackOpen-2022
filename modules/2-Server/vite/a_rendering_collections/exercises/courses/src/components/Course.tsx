import {Courses} from '../types'
import Content from './Content'
import Header from './Header'
import Total from './Total'
const Course = ({course} : {course: Courses}) => {
    console.log(course)
    console.log("logs here")
    return(
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}
export default Course
