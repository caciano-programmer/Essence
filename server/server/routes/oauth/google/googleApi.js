import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../../errorWrapper';
import { oauthClient, authorizeUrl, apiUrl } from './googleInit';
import { addJwtCookie } from '../../cookies';
import { oauthService } from '../../../db/queries/oauth/oauthService';
import { AccountTypes } from '../../../db/accountTypes';

const router = express.Router();

// redirect user to sign on with google
router.get(
  '/oauth/google',
  errorWrapper(async (req, res) => {
    res.send({ url: authorizeUrl });
  }),
);

router.get(
  '/oauth/google/response',
  errorWrapper(async (req, res) => {
    const error = new Error('Google authentication failed, please try logging in again');
    if (req.query == null || req.query.code == null) throw error;
    const { code } = req.query;
    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);
    const email = await validateUser(oauthClient);
    const uuid = uuidv4();
    await addJwtCookie(res, email, uuid);
    res.set('csrf-token', uuid);
    const redirectUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';
    res.status(200).redirect(redirectUrl);
  }),
);

export { router as google };

// calls google api for user data and if user doesnt exist proceeds to creates user, returns email of user
async function validateUser(client) {
  const {
    data: { name, email },
  } = await client.request({ url: apiUrl });
  const modifiedName = name.substring(0, 30).trim();
  await oauthService(AccountTypes.GOOGLE).createWhenNewUser({ name: modifiedName, email });
  return email;
}
