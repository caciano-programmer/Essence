/*
  Your secret config data goes here.
  You must register your application with google through googles developer console.
  For more information go to: https://developers.google.com/identity/protocols/OAuth2
  Look at example below for reference 

  Please insert your apps client id and client secret below
*/

export const oauthSecretGoogleConfig = {
  // insert your client id below
  client_id: 'your apps google client id goes here',

  // insert your client secret below
  client_secret: 'your apps google client secret goes here',
  
  redirect_uri: 'http://localhost:4000/oauth/google/response',
};
