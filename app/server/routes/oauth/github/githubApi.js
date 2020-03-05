import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../../errorWrapper';
import { githubConfig as config } from './oauthGithubConfig';
import { addCsrfCookie, addJwtCookie } from '../../cookies';
import { checkGithubUserExists, createGithubUser } from '../../../db/queries/auth/github';

/* eslint-disable camelcase */

const githubCsrfTokens = new Set();
const { client_id, client_secret, redirect_uri, resource_api } = config;
const githubUrl = csrfToken => `
    https://github.com/login/oauth/authorize?
    client_id=${config.client_id}&
    redirect_uri=${redirect_uri}&
    scope=user:email%20read:user&
    state=${csrfToken}&
    allow_signup=true
`;
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
    if (!githubCsrfTokens.delete(req.query.state)) throw new Error('Server error');
    const { data } = await getAccessToken(req.query.code);
    const { name, email } = await getUserData(data.access_token);
    await validateUser({ name, email });
    const uuid = uuidv4();
    await addCsrfCookie(res, uuid);
    await addJwtCookie(res, email, uuid);
    res.status(200).redirect('/');
  }),
);

export { router as github };

// use code to call github api for access token
function getAccessToken(code) {
  return axios({
    method: 'post',
    url: resource_api,
    data: {
      client_id,
      client_secret,
      code,
      redirect_uri,
      state: 'default',
    },
    headers: { Accept: 'application/json' },
  });
}

// use access token to call github resource server apis to retrieve profile name and email
async function getUserData(accessToken) {
  const emailData = await axios({
    method: 'get',
    url: 'https://api.github.com/user/emails',
    headers: { Accept: 'application/json', Authorization: `token ${accessToken}` },
  });
  const profileData = await axios({
    method: 'get',
    url: 'https://api.github.com/user',
    headers: { Accept: 'application/json', Authorization: `token ${accessToken}` },
  });
  const [{ email }] = emailData.data.filter(emailObj => emailObj.primary === true);
  const name = profileData.data.name || profileData.data.login;
  const modifiedName = name.substring(0, 30).trim();
  return { name: modifiedName, email };
}

// checks if authenticated github user is a new user, if so then proceeds to create user
async function validateUser({ name, email }) {
  const userExist = (await checkGithubUserExists(email)).length > 0;
  if (!userExist) await createGithubUser({ name, email });
}
