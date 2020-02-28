import express from 'express';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';
import { validateSignup } from '../../auth/validate';
import { createUser } from '../../db/queries';

const router = express.Router();

router.post(
  '/signup',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    const signUp = { ...req.body, email, password };
    await validateSignup(signUp);
    await createUser(signUp);
    res.status(200).send();
  }),
);

export { router as signup };
