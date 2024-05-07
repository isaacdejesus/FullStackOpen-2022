import express from 'express';
import patients_service from '../services/patients_service';
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patients_service.get_non_sensitive_patients());
});

export default router;
