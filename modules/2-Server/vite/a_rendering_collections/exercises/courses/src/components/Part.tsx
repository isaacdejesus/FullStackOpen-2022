import {Parts} from '../types'

const Part = ({part} : {part: Parts}) => {
    return(
        <p>{part.name} {part.exercises}</p>    
    )
}
export default Part
