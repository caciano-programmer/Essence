import express from 'express';
import { errorWrapper } from '../errorWrapper';

const router = express.Router();

router.get(
  '/logout',
  errorWrapper(async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send('OK');
  }),
);

export { router as logout };
