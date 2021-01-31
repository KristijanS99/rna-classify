import express from 'express';
import {startTraining, classify} from '../brain';
import Sequence from '../models/Sequence';

const router = express.Router();

// Adds RNA sequency to FaunaDB RNA collection
router.post('/data', async (req, res) => {
  try {
    const {type, sequence} = req.body;
    const rna = new Sequence(type, sequence);
    // Validate RNA sequence
    const validate:any = rna.validate();
    if (validate.invalid) {
      console.error(validate.error);
      return res.status(400).send(validate.error);
    }
    // Store the sequence in FaunaDb
    const result = await rna.save();
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

router.get('/train', async (req, res) => {
  const result:any = await startTraining();
  if (result.status === 'OK') {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.post('/classify', async (req, res) => {
  try {
    const {type, sequence} = req.body;
    const rna = new Sequence(type, sequence);
    // Validate RNA sequence
    const validate:any = rna.validate();
    if (validate.invalid) {
      console.error(validate.error);
      return res.status(400).send(validate.error);
    }
    // Run prediction
    const result = classify(rna.sequence);
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

export default router;
