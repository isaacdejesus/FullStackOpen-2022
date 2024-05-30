import {course_part} from '../types';
import Part from './Part';
const Content = ({courses}: {courses: course_part[] }) => {
    return (
        <div>
        {courses.map((course: course_part) =>
            <Part
                key={course.exerciseCount}
                course={course}
            />
        )}
        </div>
    )
}

export default Content;
