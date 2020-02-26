import express from 'express';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';

const router = express.Router();

router.post(
  '/signup',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    const signUp = { ...req.body, email, password };
    res.status(200).send('OK');
  }),
);

export { router as signup };
