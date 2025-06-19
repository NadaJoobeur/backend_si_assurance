// database.js
import { Sequelize } from 'sequelize'
import { db } from './env.js'

const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
  }
)

export default sequelize
