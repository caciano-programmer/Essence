import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';
import { validateSignup } from '../../auth/validate';
import { createUser } from '../../db/queries/auth/account';
import { addJwtCookie } from '../cookies';

const router = express.Router();

router.post(
  '/signup',
  errorWrapper(async (req, res) => {
    console.log(req.cookies);
    const [email, password] = await decode(req.get('Authorization'));
    const signUp = { ...req.body, email, password };
    const uuid = uuidv4();
    await validateSignup(signUp);
    await createUser(signUp);
    await addJwtCookie(res, email, uuid);
    res.set('csrf-token', uuid);
    res.status(200).send();
  }),
);

export { router as signup };
