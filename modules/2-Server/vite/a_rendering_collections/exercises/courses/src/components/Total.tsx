import { Parts} from '../types'
const Total = ({parts} : {parts: Parts[]}) => {
    return(
        <p>
        Number of exercices: {parts.reduce(function(sum: number, part:Parts){
            return sum + part.exercises
        }, 0)}
        </p>
    )
}
export default Total
