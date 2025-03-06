import express from 'express';
import patients_service from '../services/patients_service';
import to_New_Patient_Entry from '../utils';
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patients_service.get_non_sensitive_patients());
});
router.post('/', (req, res) => {
    try {
        const new_patient_entry = to_New_Patient_Entry(req.body);
        const newly_added_patient = patients_service.add_patient(new_patient_entry);
        res.json(newly_added_patient);
    }
    catch (error: unknown){
        let error_msg = 'Something went wrong';
        if(error instanceof Error)
            error_msg += ' Error: ' + error.message;
        res.status(400).send(error_msg);
    }
});

export default router;
