import express from 'express';
import { errorWrapper } from '../errorWrapper';
import { verifyJwt } from '../../auth/jwt';

const router = express.Router();
const error = new Error('authentication unsuccessful');

router.post(
  '/authorize',
  errorWrapper(async (req, res) => {
    if (req.cookies == null || req.cookies.jwt == null || req.cookies.csrfToken == null) throw error;
    const jwtPayload = await verifyJwt(req.cookies.jwt);
    await validateCsrf(req.header('csrf'), req.cookies.csrfToken, jwtPayload.uuid);
    res.status(200).send();
  }),
);

export { router as authorize };

async function validateCsrf(csrfHeader, csrfCookie, csrfJwt) {
  if (csrfHeader == null) throw error;
  const isEqual = csrfHeader === csrfCookie && csrfHeader === csrfJwt;
  if (!isEqual) throw error;
}
