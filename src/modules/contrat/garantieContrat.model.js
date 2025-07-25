// src/modules/contrat/garantieContrat.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import Devis from '../devis/devis.model.js';



const GarantieContrat = db.define('GarantieContrat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numeroContrat: { type: DataTypes.STRING, allowNull: true },
  libelleGarantie: { type: DataTypes.STRING, allowNull: false },
  capitalAssure: { type: DataTypes.STRING, allowNull: true },
  franchise: { type: DataTypes.STRING, allowNull: true },
  rangAffichage: { type: DataTypes.INTEGER, allowNull: true },
  codeGarantie: { type: DataTypes.STRING, allowNull: false },
  id_devis: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'garanties_contrat',
  timestamps: false
});


export default GarantieContrat;
