// src/modules/agence/agence.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js' 

const Agence = sequelize.define('Agence', {
  id_agence: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code_agence: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  nom_agence: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ville: {
    type: DataTypes.STRING(50),
  },
  telephone: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(100),
    validate: { isEmail: true },
  },
  statut: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'active',
  }
}, {
  tableName: 'agences',
  timestamps: false
});

export default Agence;