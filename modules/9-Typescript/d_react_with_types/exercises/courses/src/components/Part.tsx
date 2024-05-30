import {course_part} from '../types';
const Part = ({course} : {course: course_part}) => {
    const assert_never = (value: never): never => {
        throw new Error(
            `unhandled union member: ${JSON.stringify(value)}`
        )
    }
    const course_type = (course: course_part) => {
        switch(course.kind)
        {
            case "basic":
                return(
                    <div>
                        <p>
                            <b>{course.name}</b>
                            <br />
                            Exercises: {course.exerciseCount} 
                            <br />
                            {course.description}
                        </p>
                    </div>
                );
                break;
            case "group":
                return(
                    <div>
                        <p>
                            <b>{course.name}</b>
                            <br />
                            Exercises: {course.exerciseCount}
                            <br />
                            Group projects {course.groupProjectCount}
                        </p>
                    </div>
                );
                break;
            case "background":
                return(
                    <div>
                        <p>
                            <b>{course.name}</b>
                            <br />
                            {course.description}
                            < br />
                            Exercises: {course.exerciseCount}
                            < br />
                            More Reading: {course.backgroundMaterial}
                        </p>
                    </div>
                );
                break;
            case "special":
                return(
                    <div>
                        <p>
                            <b>{course.name}</b>
                            <br />
                            {course.description}
                            <br />
                            Exercises: {course.exerciseCount}
                            < br />
                            Skills required: {course.requirements.join(", ")
                                }
                        </p>
                    </div>
                );
                break;
            default:
                return assert_never(course)
                break;
        }
    }
    return (
        <div>
            {course_type(course)}
        </div>
    )
}

export default Part;
