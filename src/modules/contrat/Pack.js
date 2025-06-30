// src/modules/pack/pack.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import Devis from '../devis/devis.model.js';
const Pack = db.define('Pack', {
  numeroContrat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codePack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_devis: { // ✅ Nouvelle colonne
    type: DataTypes.INTEGER,
    references: {
      model: 'devis',
      key: 'id'
    }
  }
}, {
  tableName: 'packs',
  timestamps: false
});

// ✅ Définir la relation One-to-Many (si un devis peut avoir plusieurs packs)
Pack.belongsTo(Devis, { foreignKey: 'id_devis' });
Devis.hasOne(Pack, { foreignKey: 'id_devis' });

export default Pack;
