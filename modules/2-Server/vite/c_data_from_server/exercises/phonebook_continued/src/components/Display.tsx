import {Record} from '../types'
import Profile from './Profile'
const Display = ({persons}: {persons: Record[]}) => {
    return(
      <div>
            {persons.map((person:Record) => 
                <Profile key={person.id} profile={person}/>
        )}
      </div>

    )
}
export default Display

