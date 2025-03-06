import { New_Patient_Entry, Gender} from './types'

const parse_name = (name: unknown): string => {
    if(!name || !is_string(name))
        throw new Error('Incorrect or missing name');
    return name;
}
const is_string = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parse_dob = (dateOfBirth: unknown): string => {
    if(!dateOfBirth || !is_string(dateOfBirth)|| !is_date(dateOfBirth))
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    return dateOfBirth;
} 
const is_date = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parse_ssn = (ssn: unknown): string => {
    if(!ssn || !is_string(ssn))
        throw new Error('Incorrect or missing ssn');
    return ssn;
}
const parse_gender = (gender: unknown): Gender => {
    if(!gender || !is_string(gender) || !is_gender(gender))
        throw new Error("Incorrect or missing gender: " + gender);
    return gender;
}
const is_gender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}
const parse_occupation = (occupation: unknown): string => {
    if(!occupation || !is_string(occupation))
        throw new Error("Incorrect or missing occupation");
    return occupation;
}
type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
const to_New_Patient_Entry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): New_Patient_Entry => {
    const new_patient: New_Patient_Entry = {
        name: parse_name(name),
        dateOfBirth: parse_dob(dateOfBirth),
        ssn: parse_ssn(ssn),
        gender: parse_gender(gender),
        occupation: parse_occupation(occupation)
    };
    return new_patient;
};
export default to_New_Patient_Entry;
