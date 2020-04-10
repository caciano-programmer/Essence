import axios from 'axios';

export const Authorize = () => {
  const csrf = getCsrfToken();
  if (!csrf) return Promise.reject(new Error('Please try signing in again'));
  return axios({
    method: 'POST',
    url: '/authorize',
    headers: { 'csrf-token': csrf },
  });
};

function getCsrfToken() {
  const [csrf] = document.cookie.match(/csrf=.*;|csrf=.*$/);
  return csrf ? csrf.replace('csrf=', '').replace(';', '') : '';
}
