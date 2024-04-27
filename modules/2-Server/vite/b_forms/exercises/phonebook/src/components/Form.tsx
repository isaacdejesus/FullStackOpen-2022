import {useState} from 'react'
import {Record} from '../types'
const Form = ({record, set_person}: {record: Record[], set_person:(arg0: Record[]) => void }) => {
    const [new_name, set_new_name] = useState<string>('Enter a name')
    const [new_number, set_new_number] = useState<string>('Enter a phone number')
    const submit_handler = (event:any) => {
        event.preventDefault() 
        const new_object = {
            id: record.length + 1,
            name: new_name,
            number: new_number

        }
        //check if record/person already in phonebook
        const in_phonebook = record.find((person:Record) => person.name === new_object.name);
        if(in_phonebook)   //if already in throw alert msg
            alert(`${new_name} already in phonebook`);
        else  //add to phonebook
        {
            set_person(record.concat(new_object))
            set_new_name('')
        }
    }
    const name_change_handler = (event:any) => {
        set_new_name(event.target.value) ;
    }
    const number_change_handler = (event:any) => {
        set_new_number(event.target.value) ;
    }
    return(
        <form onSubmit={submit_handler}>
            <div>
                Name: <input 
                           value={new_name} 
                            onChange={name_change_handler}
                      />
            </div>
            <div>
                Number: <input 
                           value={new_number} 
                            onChange={number_change_handler}
                      />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        )
}
export default Form
