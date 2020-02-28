import express from 'express';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';
import { validateLogin } from '../../auth/validate';
import { authenticateUser } from '../../db/queries';

const router = express.Router();

router.post(
  '/login',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    await validateLogin({ email, password });
    await authenticateUser(email, password);
    res.status(200).send();
  }),
);

export { router as login };
