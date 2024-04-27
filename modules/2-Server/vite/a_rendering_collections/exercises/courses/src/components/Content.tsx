import { Parts} from '../types'
import Part from './Part'
const Content = ({parts} : {parts: Parts[]}) => {
    return(
        <div>
            {parts.map((part: Parts) => 
                <Part key={part.id} part={part}/>        
            )}
        </div>
    )
}
export default Content
