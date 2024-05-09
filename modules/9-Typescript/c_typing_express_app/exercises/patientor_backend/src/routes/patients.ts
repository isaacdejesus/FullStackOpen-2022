import express from 'express';
import patients_service from '../services/patients_service';
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patients_service.get_non_sensitive_patients());
});
router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation} = req.body;
    const new_patient = patients_service.add_patient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });
    res.json(new_patient);
})

export default router;
