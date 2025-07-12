// src/modules/paiement/paiement.model.js

import { DataTypes } from 'sequelize';
import db from '../../config/database.js';

const Paiement = db.define('Paiement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codeAgence: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardholderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  depositAmount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  listeQuittances: {
    type: DataTypes.JSONB,  // Si PostgreSQL / JSON si MySQL
    allowNull: false,
  },
}, {
  tableName: 'paiements',
  timestamps: false, // ou true si tu veux createdAt, updatedAt
});

export default Paiement;
