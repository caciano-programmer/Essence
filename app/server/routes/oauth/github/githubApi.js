import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../../errorWrapper';
import { addCsrfCookie, addJwtCookie } from '../../cookies';
import { githubUrl, getAccessToken, getUserData, validateUser } from './githubUtils';

// A set that will hold collection of csrf state values, recommended by github api docs
const githubCsrfTokens = new Set();

const router = express.Router();

router.get(
  '/oauth/github',
  errorWrapper(async (req, res) => {
    const githubToken = uuidv4();
    githubCsrfTokens.add(githubToken);
    res.status(301).redirect(githubUrl(githubToken));
  }),
);

router.get(
  '/oauth/github/response',
  errorWrapper(async (req, res) => {
    const { state } = req.query;
    if (!githubCsrfTokens.delete(state)) throw new Error('Server error');
    const { data } = await getAccessToken(req.query.code, state);
    const { name, email } = await getUserData(data.access_token);
    await validateUser({ name, email });
    const uuid = uuidv4();
    await addCsrfCookie(res, uuid);
    await addJwtCookie(res, email, uuid);
    res.status(200).redirect('/');
  }),
);

export { router as github };
