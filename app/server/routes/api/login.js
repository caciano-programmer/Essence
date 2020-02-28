import express from 'express';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';
import { validateLogin } from '../../auth/validate';

const router = express.Router();

router.post(
  '/login',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    await validateLogin({ email, password });
    res.status(200).send();
  }),
);

export { router as login };
