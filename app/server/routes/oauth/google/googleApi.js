import express from 'express';
import { errorWrapper } from '../../errorWrapper';
import { oauthClient, authorizeUrl, apiUrl } from './googleInit';
import { checkGoogleUserExists, createGoogleUser } from '../../../db/queries';

const router = express.Router();

// redirect user to sign on with google
router.get(
  '/oauth/google',
  errorWrapper(async (req, res) => {
    const url = authorizeUrl;
    res.status(200).send(url);
  }),
);

router.get(
  '/oauth/google/response',
  errorWrapper(async (req, res) => {
    if (req.query == null || req.query.code == null) throw new Error('Server failure');
    const { code } = req.query;
    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);
    await validateUser(oauthClient);
    res.redirect('/');
  }),
);

export { router as google };

// calls google api for user data and if user doesnt exist proceeds to creates user
async function validateUser(client) {
  const {
    data: { name, email },
  } = await client.request({ url: apiUrl });
  const modifiedName = name.substring(0, 30).trim();
  const userExist = (await checkGoogleUserExists(email)).length > 0;
  if (!userExist) await createGoogleUser({ name: modifiedName, email });
}
