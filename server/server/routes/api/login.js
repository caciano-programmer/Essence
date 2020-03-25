import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';
import { validateLogin } from '../../auth/validate';
import { authenticateUser } from '../../db/queries/auth/account';
import { addCsrfCookie, addJwtCookie } from '../cookies';

const router = express.Router();

router.post(
  '/login',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    const uuid = uuidv4();
    await validateLogin({ email, password });
    await authenticateUser(email, password);
    await addCsrfCookie(res, uuid);
    await addJwtCookie(res, email, uuid);
    res.status(200).send();
  }),
);

export { router as login };
