// src/modules/devis/devis.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import Contrat from '../contrat/contrat.model.js';

const Devis = db.define('Devis', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dateCreation: { type: DataTypes.DATEONLY },
  dateEffet: { type: DataTypes.DATEONLY },
  dateExpiration: { type: DataTypes.DATEONLY },
  typeFractionnement: { type: DataTypes.STRING },
  typeRenouvellement: { type: DataTypes.STRING },
  statut: { 
    type: DataTypes.STRING, // ex: "EN_ATTENTE", "VALIDÉ", "EXPIRÉ"
    allowNull: false,
    defaultValue: 'EN_ATTENTE'
  }
}, {
  tableName: 'devis',
  timestamps: false,
});

export default Devis;
