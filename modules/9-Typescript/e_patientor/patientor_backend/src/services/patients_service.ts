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
