import express from 'express';
import { hash, verifyHash } from '../../auth/hash';
import { errorWrapper } from './../errorWrapper';

const router = express.Router();

router.post(
  '/login',
  errorWrapper(async (req, res) => {
    const [email, password] = await decode(req.get('Authorization'));
    await hash(email, password);
    res.status(200).send('OK');
  }),
);

export { router as login };

async function decode(string) {
  const [, encodedString] = string.split(' ');
  const base64Decoded = Buffer.from(encodedString, 'base64').toString();
  return base64Decoded.split(':');
}
