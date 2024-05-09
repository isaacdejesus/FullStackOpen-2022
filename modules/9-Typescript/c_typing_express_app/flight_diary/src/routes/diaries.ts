import express from 'express';
import diary_service from '../services/diary_service'
import to_New_Diary_Entry from '../utils'

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
    try{
        const new_diary_entry = to_New_Diary_Entry(req.body);
        const newly_added_entry = diary_service.add_diary(new_diary_entry);
        res.json(newly_added_entry);
    }
    catch (error: unknown){
        let error_message = 'Something went wrong';
        if(error instanceof Error)
            error_message += ' Error: ' + error.message;
        res.status(400).send(error_message);
    }
});

export default router;
