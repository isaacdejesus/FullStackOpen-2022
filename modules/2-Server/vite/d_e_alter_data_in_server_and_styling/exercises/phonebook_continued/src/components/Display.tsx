import {Record} from '../types'
import Profile from './Profile'
const Display = ({persons, set_person}: {persons: Record[], set_person: (arg0: Record[])=> void}) => {
    return(
      <div>
            {persons.map((person:Record) => 
                <Profile key={person.id} profile={person} records={persons} set_person={set_person}/>
        )}
      </div>

    )
}
export default Display


