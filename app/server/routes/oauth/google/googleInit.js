import { OAuth2Client } from 'google-auth-library';
import { oauthSecretGoogleConfig } from './oauthGoogleConfig';

// secret config data that contains google secret key and client id, set up with google api console
const config = oauthSecretGoogleConfig;

// google api where token will be sent to in order to retrieve users email and name
export const apiUrl = 'https://openidconnect.googleapis.com/v1/userinfo';

// client object from google's official NodeJs Oauth library, set up with out private config data
export const oauthClient = new OAuth2Client(config.client_id, config.client_secret, config.redirect_uri);

// generated url that will point users to sign on with google, requests read access to email and profile
export const authorizeUrl = oauthClient.generateAuthUrl({
  scope: 'openid profile email',
});
