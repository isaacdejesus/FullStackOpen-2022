/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diary_service from '../services/diary_service'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diary_service.get_non_sensitive_diary_entries());
});

router.get('/:id', (req, res) =>{
    const diary = diary_service.find_by_id(Number(req.params.id));
    if(diary)
        res.send(diary);
    else
        res.sendStatus(404);
});

router.post('/', (req, res) => {
    const { date, weather, visibility, comment } = req.body;
    const new_entry = diary_service.add_diary({
        date, 
        weather,
        visibility,
        comment,
    });
    res.json(new_entry);
});

export default router;
