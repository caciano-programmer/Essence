import knex from 'knex';

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.HOST || '127.0.0.1',
    user: 'root',
    password: process.env.PASSWORD || 'password',
    database: 'Essence',
  },
  pool: { min: 2, max: 10 },
  debug: process.env.NODE_ENV === 'development',
};

export const initDB = () => knex(config);
