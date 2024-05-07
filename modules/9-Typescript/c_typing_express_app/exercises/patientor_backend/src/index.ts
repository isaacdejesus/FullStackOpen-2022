import express from 'express';
import diagnoses_router from './routes/diagnoses'
import patients_router from './routes/patients'
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoses_router);
app.use('/api/patients', patients_router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
