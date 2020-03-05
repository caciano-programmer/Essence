import { initDB as db } from '../../dbConfig';

export const createGoogleUser = ({ name, email }) => db()('Google_Users').insert({ name, email });

export const checkGoogleUserExists = email =>
  db()('Google_Users')
    .where({ email })
    .select('email');
