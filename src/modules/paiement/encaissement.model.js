// src/modules/paiement/encaissement.model.js

import { DataTypes } from 'sequelize';
import db from '../../config/database.js';

const Encaissement = db.define('Encaissement', {
  idEncaissement: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  paiementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  approvalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  errorCode: {
    type: DataTypes.STRING,
  },
  errorMessage: {
    type: DataTypes.STRING,
  },
  orderStatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiration: {
    type: DataTypes.STRING, // Format MM/YYYY
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'encaissements',
  timestamps: false,
});

export default Encaissement;
