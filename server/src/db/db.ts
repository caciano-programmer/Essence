import bcrypt from 'bcryptjs';
import postgres from 'pg';

const salt = bcrypt.genSaltSync(10);
const isDevelopment = process.env.NODE_ENV === 'development';
const pool = new postgres.Pool({
  user: isDevelopment ? 'postgres' : process.env.USER,
  password: isDevelopment ? 'postgres' : process.env.PGPASSWORD,
  host: isDevelopment ? 'localhost' : process.env.PGHOST,
  database: 'essence',
  port: 5432,
});

/** queries */
const InsertUser = 'INSERT INTO users (name, email, password) VALUES($1, $2, $3)';

export async function createUser(name: string, email: string, password: string) {
  const client = await pool.connect();
  try {
    const result = await client.query({ text: InsertUser, values: [name, email, password] });
    return result.rows;
  } catch (err) {
    if (err instanceof Error) throw err.message;
  } finally {
    client.release();
  }
}
