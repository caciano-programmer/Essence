import bcrypt from 'bcryptjs';
import postgres from 'pg';
import { HttpError } from '../error/errorHandler.js';

const salt = bcrypt.genSaltSync(10);
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

export async function login(email: string, password: string) {}

export async function createUser(name: string, email: string, password: string) {
  try {
    await pool.query({ text: InsertUser, values: [name, email, password] });
  } catch (err) {
    if (err instanceof Error) throw new HttpError('Email already exists.', 400);
  }
}
