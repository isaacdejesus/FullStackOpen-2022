import React from 'react'
const Header = ({course_title}) => {
    return (
        <h1> {course_title}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <>
        {parts.map(part =>
            <Part key = {part.id} part_name = {part.name} part_exercises = {part.exercises} />)}
        </>
    )
}

const Part = ({part_name,  part_exercises}) => {
    return (
        <p> {part_name} {part_exercises} </p>
    )
}
const Total =({ parts }) => {
    return (
        <p> Number of exercises {parts.reduce(function(sum, item){
            return sum + item.exercises}, 0)} </p>

    ) 
}
const Course = ({ course }) => {
    return (
        <>
        <Header course_title = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
        </>
    )
}

export default Course
