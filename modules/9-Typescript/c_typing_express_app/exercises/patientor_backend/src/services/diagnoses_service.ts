import diagnoses_data from '../../data/diagnoses'
import { Diagnoses } from '../types';
const diagnoses: Diagnoses[] = diagnoses_data;
const get_diagnoses = (): Diagnoses[] => {
    return diagnoses;
}

export default {
    get_diagnoses,
};
