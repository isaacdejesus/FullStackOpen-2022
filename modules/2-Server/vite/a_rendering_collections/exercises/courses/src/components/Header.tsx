import {Courses} from '../types'
const Header = ({course} : {course: Courses}) => {
    return(
        <div>
            <h1>{course.name}</h1> 
        </div>
    )
}
export default Header
