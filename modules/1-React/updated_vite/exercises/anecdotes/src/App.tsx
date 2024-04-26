import { useState } from 'react'

const Button = ({handler_function, text}: {handler_function: ()=> void, text: string}) => {
    return(
        <button onClick={handler_function}>{text}</button>
    )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
    const [selected, set_selected] = useState<number>(0)
    const [points, set_points] = useState<number []>(new Array(8).fill(0));
    const select_anecdote = () => {
        const index = Math.floor(Math.random() * anecdotes.length);
        set_selected(index);
    }
    const update_points = () => {
        const updated_points: number[] = [...points];
        updated_points[selected] ++ ;
        set_points(updated_points)
    }
    const most_voted = Math.max(...points);
    const index_of_most_voted = points.indexOf(most_voted);
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <Button handler_function={select_anecdote} text={'Next Anecdote'}/>
      <Button handler_function={update_points} text={'Vote'}/>
      <h2> Anecdote with most votes</h2>
      <p>{anecdotes[index_of_most_voted]} </p>
      <p>Has {most_voted} votes </p>
    </div>
  )
}
export default App
