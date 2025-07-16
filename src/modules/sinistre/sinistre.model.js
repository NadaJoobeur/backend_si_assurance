// src/models/Sinistre.js

import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';  // chemin relatif + extension obligatoire

const Sinistre = sequelize.define('Sinistre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numeroContrat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numeroSinistre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  numeroImmatriculation: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateSinistre: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  optionReparation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  motifRejet: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lieuSinistre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  conducteur: {
    type: DataTypes.STRING,
    allowNull: true
  },
  typeConducteur: {
    type: DataTypes.STRING,
    allowNull: true
  },
  identifiantPrincipal: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'sinistres',
  timestamps: true // si tu veux createdAt / updatedAt sinon mets false
});

export default Sinistre;