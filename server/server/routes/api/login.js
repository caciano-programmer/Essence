import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../errorWrapper';
import { decode } from '../../auth/decodeBase64';
import { validateLogin } from '../../auth/validate';
import { authenticateUser } from '../../db/queries/auth/account';
import { addJwtCookie, addCsrfCookie } from '../cookies';

const router = express.Router();

router.post(
  '/login',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    const uuid = uuidv4();
    await validateLogin({ email, password });
    await authenticateUser(email, password);
    await addJwtCookie(res, email, uuid);
    await addCsrfCookie(res, uuid);
    res.status(200).send();
  }),
);

export { router as login };
