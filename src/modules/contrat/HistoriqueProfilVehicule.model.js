// src/modules/contrat/HistoriqueProfilVehicule.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const HistoriqueProfilVehicule = sequelize.define('HistoriqueProfilVehicule', {
  numeroContrat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  tableName: 'HistoriqueProfilVehicule',
  timestamps: true
});

export default HistoriqueProfilVehicule;
