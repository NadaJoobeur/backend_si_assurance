import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 3000;

export const db = {
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_NAME,
  port: process.env.PG_PORT,
  dialect: 'postgres',
};
