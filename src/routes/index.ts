import express from 'express';
// import {startTraining} from '../brain';
import client, {q} from '../faunadb';
import schema from '../validators';

const router = express.Router();
const RNA_COLLECTION = 'RNA';

// Adds RNA sequency to FaunaDB RNA collection
router.post('/data', async (req, res) => {
  try {
    const rna = {
      ...req.body,
    };
    // Validate RNA sequence
    const {error} = schema.validate(rna);
    if (error) {
      console.error(error);
      return res.status(400).send(error);
    }
    // Store the sequence in FaunaDb
    const result = await client.query(
        q.Create(
            q.Collection(RNA_COLLECTION),
            {
              data: rna},
        ),
    );
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

// router.get('/train', async (req, res) => {
//   await startTraining();
//   res.send('Training started');
// });

export default router;
