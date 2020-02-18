import axios from 'axios';

const WebAddress = 'localhost:3001';
const header = {};

export const login = credentials =>
  axios({
    method: 'post',
    url: `${WebAddress}/login`,
    headers: header,
    data: credentials
  });

export const signup = credentials =>
  axios({
    method: 'post',
    url: `${WebAddress}/signup`,
    headers: header,
    data: credentials
  });

export const logout = () => {};
