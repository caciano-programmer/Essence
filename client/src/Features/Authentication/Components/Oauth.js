import React from 'react';
import { oauthService as oauth } from '../../../Api/Oauth';

export const Oauth = () => (
  <>
    <div className="row">
      <button type="button" onClick={redirectGoogle}>
        Log in with Google
      </button>
    </div>
    <div className="row">
      <button type="button" onClick={redirectGithub}>
        Log in with Github
      </button>
    </div>
  </>
);

async function redirectGithub() {
  const url = await oauth.github();
  window.location.replace(url);
}

async function redirectGoogle() {
  const url = await oauth.google();
  window.location.replace(url);
}
