import { initDB as db } from './dbConfig';
import { hash, passwordsMatch } from '../auth/hash';

export const createUser = async ({ name, email, password }) => {
  const hashedPassword = await hash(password);
  return db()('users')
    .insert({ email, name, password: hashedPassword })
    .catch(() => {
      throw new Error('Email already exist');
    });
};

export const authenticateUser = async (email, password) => {
  const [storedPassword] = await db()
    .select('password')
    .from('users')
    .where({ email });
  if (storedPassword == null) throw new Error('Email does not exist, plase check spelling');
  const result = await passwordsMatch(password, storedPassword.password);
  if (!result) throw new Error('Password is incorrect, please try again');
};
