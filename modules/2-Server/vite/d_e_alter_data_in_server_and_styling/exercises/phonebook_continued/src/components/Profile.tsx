import {Record} from '../types'
import persons_service from '../services/records'
const Profile = ({profile, records, set_person}: {profile: Record, records: Record[], set_person: (arg0: Record[])=> void }) => {
    const handle_delete = (id: string) => {
        const delete_record = window.confirm("Do you really want to delete this record?") 
        if(!delete_record)
            return;
        const record_to_delete = records.find(person => person.id === id);
        persons_service
            .remove(id)
            .then(person_to_delete => {
                if(record_to_delete)
                {
                    const updated_records = records.filter(person => person.id !== person_to_delete.id);
                    //set_person(records.filter(person => person.id !== record_to_delete.id))
                    console.log(updated_records);
                    set_person(updated_records);
                }
                console.log(person_to_delete);
            })
            .catch(error => {
                if(record_to_delete)
                {
                    alert(`Record '${record_to_delete.name}' has already been deleted`)
                    set_person(records.filter(person => person.id !== record_to_delete.id))
                }
                console.log(error);
            })
    }
    return(
        <p>{profile.name} {profile.number} <button onClick={()=> handle_delete(profile.id)}>Delete Record</button></p>
    ) 
}
export default Profile
