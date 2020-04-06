import axios from 'axios';

export const oauthService = {
  github,
  google,
};

function github() {
  return axios({
    method: 'GET',
    url: '/oauth/github',
  }).then(response => response.data.url);
}

function google() {
  return axios({
    method: 'GET',
    url: '/oauth/google',
  }).then(response => response.data.url);
}
