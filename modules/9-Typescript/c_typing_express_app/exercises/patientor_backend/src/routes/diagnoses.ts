import express from 'express';
import diagnoses_service from '../services/diagnoses_service'
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(diagnoses_service.get_diagnoses());
});

export default router;
