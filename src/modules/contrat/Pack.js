// src/modules/pack/pack.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';

const Pack = db.define('Pack', {
  numeroContrat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codePack: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'packs',
  timestamps: false
});

export default Pack;
