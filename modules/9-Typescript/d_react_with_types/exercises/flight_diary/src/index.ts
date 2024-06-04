import express from 'express';
import diary_router from './routes/diaries'
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/diaries', diary_router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
