//export type Gender = 'male' | 'female' | 'other';
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string
    gender: Gender;
    occupation: string;
}

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export type Non_Sensitive_Patient_Entry = Omit<Patient, 'ssn'>;
export type New_Patient_Entry = Omit<Patient, 'id'>;
