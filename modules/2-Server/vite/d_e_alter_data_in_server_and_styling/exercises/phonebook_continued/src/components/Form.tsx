import {useState} from 'react'
import {Record} from '../types'
import persons_service from '../services/records'
const Form = ({record, set_person}: {record: Record[], set_person:(arg0: Record[]) => void }) => {
    const [new_name, set_new_name] = useState<string>('Enter a name')
    const [new_number, set_new_number] = useState<string>('Enter a phone number')
    const submit_handler = (event:any) => {
        event.preventDefault() 
        //check if record/person already in phonebook
        const in_phonebook = record.find((person:Record) => person.name === new_name);
        if(in_phonebook){   //if already in throw alert msg
            const update_record = window.confirm(`${new_name} already in phonebook, would you like to update phone numbers?`);
            if(!update_record)
                    return;  //don't update record
            else {  //proceed and update phone #
                const updated_record = {...in_phonebook, number: new_number}                
                persons_service
                    .update(in_phonebook.id, updated_record)
                    .then(returned_record => {
                        set_person(record.map(person => person.id !== in_phonebook.id ? person : returned_record))
                        set_new_name('');
                        set_new_number('');
                    })
            }
        }
        else  //add to phonebook
        {
            const new_record = {
            name: new_name,
            number: new_number
        }
            persons_service
                .create(new_record)
                .then(returned_record => {
                    set_person(record.concat(returned_record));
                    set_new_name('');
                    set_new_number('');
                })
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


