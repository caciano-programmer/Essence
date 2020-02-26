import express from 'express';
import { hash, authenticateLogin } from '../../auth/hash';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';
import { validateLogin } from '../../auth/validate';

const router = express.Router();

router.post(
  '/login',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    await validateLogin({ email, password });
    await hash(email, password);
    res.status(200).send('OK');
  }),
);

export { router as login };
