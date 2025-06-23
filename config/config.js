import { db } from '../src/config/env.js';

export default {
  development: {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    port: db.port,
    dialect: db.dialect
  }
};
