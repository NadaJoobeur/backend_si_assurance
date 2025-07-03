// src/modules/contrat/garantieContrat.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';

const ResultatDevis = db.define('ResultatDevis', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  montantPrimeNette: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  montantComission: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  montantFrais: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  montantTaxe: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  montantPrimeTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

  id_devis: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'ResultatDevis', // supprimé l’espace
  timestamps: false
});

export default ResultatDevis;
