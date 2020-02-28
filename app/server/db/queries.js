import { initDB as db } from './dbConfig';
import { hash } from '../auth/hash';

export const createUser = async ({ name, email, password }) => {
  const hashedPassword = await hash(password);
  return db()('users')
    .insert({ email, name, password: hashedPassword })
    .catch(() => {
      throw new Error('Email already exists, please use different email');
    });
};
