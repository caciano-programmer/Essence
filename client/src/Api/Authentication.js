import axios from 'axios';

const sharedHeaders = (email, password) => ({
  'Content-Type': 'application/json',
  Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
});

export const authService = {
  login,
  signup,
  logout,
};

function signup(credentials) {
  return axios({
    method: 'post',
    url: '/signup',
    headers: sharedHeaders(credentials.email, credentials.password),
    data: { confirm: credentials.confirm, name: credentials.name },
  }).then(response => {
    localStorage.setItem('csrf-token', response.headers['csrf-token']);
    return response.statusText;
  });
}

function login(credentials) {
  return axios({
    method: 'post',
    url: '/login',
    headers: sharedHeaders(credentials.email, credentials.password),
  }).then(response => {
    localStorage.setItem('csrf-token', response.headers['csrf-token']);
    return response.statusText;
  });
}

function logout() {
  return axios({
    method: 'get',
    url: '/logout',
  }).then(data => data.statusText);
}
