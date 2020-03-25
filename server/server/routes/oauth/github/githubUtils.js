import axios from 'axios';
import { githubConfig } from './oauthGithubConfig';
import { checkGithubUserExists, createGithubUser } from '../../../db/queries/auth/github';

/* eslint-disable camelcase */

const { client_id, client_secret, redirect_uri, resource_api, userEmailApi, userProfileApi } = githubConfig;

export const githubUrl = csrfToken => `
    https://github.com/login/oauth/authorize?
    client_id=${client_id}&
    redirect_uri=${redirect_uri}&
    scope=user:email%20read:user&
    state=${csrfToken}&
    allow_signup=true
`;

// use access token to call github resource server apis to retrieve profile name and email
export async function getUserData(accessToken) {
  const emailData = await axios({
    method: 'get',
    url: userEmailApi,
    headers: { Accept: 'application/json', Authorization: `token ${accessToken}` },
  });
  const profileData = await axios({
    method: 'get',
    url: userProfileApi,
    headers: { Accept: 'application/json', Authorization: `token ${accessToken}` },
  });
  const [{ email }] = emailData.data.filter(emailObj => emailObj.primary === true);
  const name = profileData.data.name || profileData.data.login;
  const modifiedName = name.substring(0, 30).trim();
  return { name: modifiedName, email };
}

// use code to call github api for access token
export function getAccessToken(code, state) {
  return axios({
    method: 'post',
    url: resource_api,
    data: {
      client_id,
      client_secret,
      code,
      redirect_uri,
      state,
    },
    headers: { Accept: 'application/json' },
  });
}

// checks if authenticated github user is a new user, if so then proceeds to create user
export async function validateUser({ name, email }) {
  const userExist = (await checkGithubUserExists(email)).length > 0;
  if (!userExist) await createGithubUser({ name, email });
}
