// src/modules/contrat/profilVehicule.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import Contrat from './contrat.model.js';
const ProfilVehicule = db.define('ProfilVehicule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numeroContrat: { type: DataTypes.STRING, allowNull: false },
  numeroImmatriculation: { type: DataTypes.STRING, allowNull: true },
  ChargeUtile: { type: DataTypes.STRING, allowNull: true },
  poidsTotalEnCharge: { type: DataTypes.STRING, allowNull: true },
  nombreDePlaces: { type: DataTypes.STRING, allowNull: true },
  datePremiereMise: { type: DataTypes.STRING, allowNull: true },
  typeVehicule: { type: DataTypes.STRING, allowNull: true },
  natureVehicule: { type: DataTypes.STRING, allowNull: true },
  valeurVenale: { type: DataTypes.STRING, allowNull: true },
  dateObtentionPermis: { type: DataTypes.STRING, allowNull: true },
  numeroSerie: { type: DataTypes.STRING, allowNull: true },
  bonusMalus: { type: DataTypes.STRING, allowNull: true },
  indicSouscObligatoire: { type: DataTypes.STRING, allowNull: true },
  marque: { type: DataTypes.STRING, allowNull: true },
  constructeur: { type: DataTypes.STRING, allowNull: true },
  puissanceFiscale: { type: DataTypes.STRING, allowNull: true },
  valeurCatalogue: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'profils_vehicule',
  timestamps: false,
});
// Association : un contrat peut avoir plusieurs profils véhicules
ProfilVehicule.belongsTo(Contrat, { foreignKey: 'numeroContrat', targetKey: 'numeroContrat' });
Contrat.hasMany(ProfilVehicule, { foreignKey: 'numeroContrat', sourceKey: 'numeroContrat' });

export default ProfilVehicule;


