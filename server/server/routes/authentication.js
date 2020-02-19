import express from 'express';

const router = express.Router();
const headers = {};
//TODO read links for headers: shorturl.at/FITZ0 & shorturl.at/ftABK and look into CSP header configs and cache control
//FIXME make all routes asynchronous, heres an example: https://zellwk.com/blog/async-await-express/
router.post('/login', (req, res, next) => {
  decode(req.get('Authorization')).then(val => {
    const [username, password] = val;
    console.log(username, password);
    res.status(200).send('OK');
  });
});

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  res.send('works');
});

router.get('/logout', (req, res, next) => {
  res.send();
});

export default router;

async function decode(string) {
  const [, encodedString] = string.split(' ');
  const base64Decoded = Buffer.from(encodedString, 'base64').toString();
  return base64Decoded.split(':');
}
