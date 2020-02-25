import express from 'express';
import { errorWrapper } from './../errorWrapper';

const router = express.Router();

router.post(
  '/signup',
  errorWrapper(async (req, res) => {
    res.status(200).send('OK');
  }),
);

export { router as signup };
