import express from 'express';
import { hash, verifyHash } from '../auth/hash';

const router = express.Router();
const headers = {};
//TODO read links for headers: shorturl.at/FITZ0 & shorturl.at/ftABK and look into CSP header configs and cache control
//TODO make custom error handling
router.post(
  '/login',
  errorWrapper(async (req, res) => {
    const [username, password] = await decode(req.get('Authorization'));
    const result = await hash(username, password);
    console.log(result);
    const compared = await verifyHash(username, password);
    console.log(compared);
    res.status(200).send('OK');
  })
);

router.post('/signup', (req, res) => {
  console.log(req.body);
  res.send('works');
});

router.get('/logout', (req, res) => {
  res.send();
});

export default router;

async function decode(string) {
  const [, encodedString] = string.split(' ');
  const base64Decoded = Buffer.from(encodedString, 'base64').toString();
  return base64Decoded.split(':');
}

function errorWrapper(callback) {
  return (req, res, next) => {
    callback(req, res, next).catch(next);
  };
}
