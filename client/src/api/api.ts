import axios from 'axios';
import type { User } from '../constants/constants';

/** Development Url Info */
const localhost = '127.0.0.1';
const dev_port = 4000;

/** Production Url Info */
const URL = 'UrlServerLocation';
const SERVER_PORT = 8080;

const dev_mode = import.meta.env.DEV;
const host = dev_mode ? localhost : URL;
const port = dev_mode ? dev_port : SERVER_PORT;

const instance = axios.create({
  baseURL: `http${dev_mode ? '' : 's'}://${host}:${port}/api`,
});

export function authenticate({ name, email, password }: User) {
  if (name === '') return login(email, password);
  return createUser(name, email, password);
}

function createUser(name: string, email: string, password: string) {
  return instance({
    method: 'post',
    url: '/create',
    data: { name, email, password },
  });
}

function login(email: string, password: string) {
  return instance({
    method: 'post',
    url: '/login',
    data: { email, password },
  });
}
