import axios from 'axios';
import { githubConfig } from './oauthGithubConfig';

/* eslint-disable camelcase */

const { client_id, client_secret, redirect_uri, resource_api, userEmailApi, userProfileApi } = githubConfig;

export const githubUrl = csrfToken =>
  `
  https://github.com/login/oauth/authorize?\
  client_id=${client_id}&\
  redirect_uri=${redirect_uri}&\
  scope=user:email%20read:user&\
  state=${csrfToken}&\
  allow_signup=true
`.replace(/(\s)*/g, '');

// use access token to call github resource server apis to retrieve profile name and email
export async function getUserData(accessToken) {
  const accessTokenError = new Error('Server error getting github user data.');
  const emailData = await axios({
    method: 'get',
    url: userEmailApi,
    headers: { Accept: 'application/json', Authorization: `token ${accessToken}` },
  }).catch(() => {
    throw accessTokenError;
  });
  const profileData = await axios({
    method: 'get',
    url: userProfileApi,
    headers: { Accept: 'application/json', Authorization: `token ${accessToken}` },
  }).catch(() => {
    throw accessTokenError;
  });
  const [{ email }] = emailData.data.filter(emailObj => emailObj.primary === true);
  const name = profileData.data.name || profileData.data.login;
  const modifiedName = name.substring(0, 30).trim();
  return { name: modifiedName, email };
}

// use code to call github api for access token
export async function getAccessToken(code, state) {
  const { data } = await axios({
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
  if (data.error != null) throw new Error('Github authentication error, please try logging in again');
  return data.access_token;
}
