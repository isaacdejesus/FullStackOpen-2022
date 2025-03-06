## Using uuid library to create string id
- https://github.com/uuidjs/uuid
- npm install uuid
- npm install @types/uuid
- uuid can then be used as follows to create string ids
```typescript
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```
```typescript
import patients_data from '../../data/patients'
import { Patient, Non_Sensitive_Patient_Entry, New_Patient_Entry} from '../types';
import {v4 as uuidv4} from 'uuid';
const patients: Patient[] = patients_data as Patient[];
const get_patients = (): Patient[] => {
    return patients;
}
const get_non_sensitive_patients = (): Non_Sensitive_Patient_Entry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation,
    }));
}
const add_patient = (new_pt : New_Patient_Entry): Patient => {
    const new_patient = {
        id: uuidv4(), 
        ...new_pt
    };
    patients.push(new_patient);
    return new_patient
}


export default {
    get_patients,
    get_non_sensitive_patients,
    add_patient,
};

```
## NOTE on installing types
- "could not find decaclaration file for module NAME" it is a 3rd party library and need to install
  types for it.
- npm install @types/module_name
- https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
