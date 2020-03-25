/*
  Github config goes here.
  For more info visit: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
  For reference see example below.

  For this to work please register your app with github and then insert your client id and client secret
*/

export const githubConfig = {
  // insert your githubs oauth client id
  client_id: 'your client id goes here',
  
  // insert your githubs client secret here
  client_secret: 'your github client secret',

  redirect_uri: 'http://localhost:4000/oauth/github/response',
  resource_api: 'https://github.com/login/oauth/access_token',
  userEmailApi: 'https://api.github.com/user/emails',
  userProfileApi: 'https://api.github.com/user',
};
