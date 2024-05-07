import patients_data from '../../data/patients'
import { Patient, Non_Sensitive_Patient_Entry } from '../types';
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

export default {
    get_patients,
    get_non_sensitive_patients,
};
