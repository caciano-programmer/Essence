import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { errorWrapper } from '../../errorWrapper';
import { githubConfig as config } from './oauthGithubConfig';

/* eslint-disable camelcase */

const { client_id, client_secret, redirect_uri, resource_api } = config;
const githubUrl = state => `
    https://github.com/login/oauth/authorize?
    client_id=${config.client_id}&
    redirect_uri=${redirect_uri}&
    scope=user:email%20read:user&
    state=${state || 'defualt'}&
    allow_signup=true
`;
const router = express.Router();

router.get(
  '/oauth/github',
  errorWrapper(async (req, res) => {
    res.status(301).send(githubUrl());
  }),
);
// fixme figure out a way if having random state for each call is possible
// todo finish saving github user in DB if new user and send cookies
router.get(
  '/oauth/github/response',
  errorWrapper(async (req, res) => {
    const { data } = await getAccessToken(req.query.code);
    const { name, email } = await getUserData(data.access_token);
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
  return { name, email };
}
