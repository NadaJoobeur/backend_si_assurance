// src/modules/devis/devis.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import Contrat from '../contrat/contrat.model.js';

const Devis = db.define('Devis', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numeroContrat: { type: DataTypes.STRING, allowNull: false },
  dateCreation: { type: DataTypes.DATEONLY },
  dateEffet: { type: DataTypes.DATEONLY },
  dateExpiration: { type: DataTypes.DATEONLY },
  typeFractionnement: { type: DataTypes.STRING },
  typeRenouvellement: { type: DataTypes.STRING }
}, {
  tableName: 'devis',
  timestamps: false,
});

// FK
Devis.belongsTo(Contrat, { foreignKey: 'numeroContrat', targetKey: 'numeroContrat' });

export default Devis;
