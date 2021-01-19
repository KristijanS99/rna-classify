import express from 'express';
import {startTraining, classify} from '../brain';
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

router.get('/train', async (req, res) => {
  const hasFinished = await startTraining();
  if (hasFinished) {
    res.send('Training finished');
  } else {
    res.status(500).send('An error occurred');
  }
});

router.post('/classify', async (req, res) => {
  try {
    const {sequence} = req.body;
    // Validate RNA sequence
    const {error} = schema.validate({
      sequence,
      type: '1',
    });
    if (error) {
      console.error(error);
      return res.status(400).send(error);
    }
    // Run prediction
    const result = classify(sequence);
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

export default router;
