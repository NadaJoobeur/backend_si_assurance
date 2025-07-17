// src/modules/reglement/reglement.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Reglement = sequelize.define('Reglement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numeroSinistre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  natureReglement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  montantReglement: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  dateReglement: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'reglements',
  timestamps: true,
});

export default Reglement;
