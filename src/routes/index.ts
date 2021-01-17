import express from 'express';
import {startTraining} from '../brain';

const router = express.Router();

router.get('/train', async (req, res) => {
  await startTraining();
  res.send('Training started');
});

export default router;
