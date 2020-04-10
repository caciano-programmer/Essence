import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../../errorWrapper';
import { addJwtCookie, addCsrfCookie } from '../../cookies';
import { githubUrl, getAccessToken, getUserData } from './githubUtils';
import { AccountTypes } from '../../../db/accountTypes';
import { oauthService } from '../../../db/queries/oauth/oauthService';

// A set that will hold collection of csrf state values, recommended by github api docs
const githubCsrfTokens = new Set();

const router = express.Router();

router.get(
  '/oauth/github',
  errorWrapper(async (req, res) => {
    const githubToken = uuidv4();
    githubCsrfTokens.add(githubToken);
    res.send({ url: githubUrl(githubToken) });
  }),
);

router.get(
  '/oauth/github/response',
  errorWrapper(async (req, res) => {
    const { state } = req.query;
    if (!githubCsrfTokens.delete(state)) throw new Error('Server error');
    const accessToken = await getAccessToken(req.query.code, state);
    const { name, email } = await getUserData(accessToken);
    await oauthService(AccountTypes.GITHUB).createWhenNewUser({ name, email });
    const uuid = uuidv4();
    await addJwtCookie(res, email, uuid);
    await addCsrfCookie(res, uuid);
    const redirectUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';
    res.redirect(redirectUrl);
  }),
);

export { router as github };
