import { initDB as db } from '../../dbConfig';

export const createGithubUser = ({ name, email }) => db('Github_Users').insert({ name, email });

export const checkGithubUserExists = email =>
  db('Github_Users')
    .where({ email })
    .select('email');
