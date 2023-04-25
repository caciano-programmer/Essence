import bcrypt from 'bcryptjs';
import postgres from 'pg';
import { DuplicateEmailError, InvalidCredentialError } from '../error/errorHandler.js';

const isDevelopment = process.env.NODE_ENV === 'development';

const pool = new postgres.Pool({
  user: isDevelopment ? 'postgres' : process.env.USER,
  password: isDevelopment ? 'postgres' : process.env.PGPASSWORD,
  host: isDevelopment ? 'localhost' : process.env.PGHOST,
  database: 'essence',
  port: 5432,
});

/* queries */
const InsertUser = 'INSERT INTO users (name, email, password) VALUES($1, $2, $3)';
const LoginUser = 'SELECT id, email, name, password FROM users WHERE email=$1';

type userLoginData = { id: number; name: string; email: string };

export async function login(email: string, password: string): Promise<userLoginData> {
  let id, name, hash;

  try {
    ({ id, name, password: hash } = (await pool.query({ text: LoginUser, values: [email] })).rows[0]);
    const passwordMatchesHash = await bcrypt.compare(password, hash);
    if (hash === undefined || !passwordMatchesHash || name === undefined || id === undefined)
      throw InvalidCredentialError;
  } catch (err) {
    throw InvalidCredentialError;
  }

  return { id, name, email };
}

export async function createUser(name: string, email: string, password: string) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    await pool.query({ text: InsertUser, values: [name, email, hash] });
  } catch (err) {
    throw DuplicateEmailError;
  }
}
