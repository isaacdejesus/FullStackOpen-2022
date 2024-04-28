import {Record} from '../types'
const Profile = ({profile}: {profile: Record}) => {
    return(
        <p>{profile.name} {profile.number}</p>
    ) 
}
export default Profile

