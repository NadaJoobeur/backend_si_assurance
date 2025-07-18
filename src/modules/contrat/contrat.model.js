// src/modules/contrat/contrat.model.js
import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import Devis from '../devis/devis.model.js';


const Contrat = db.define('Contrat', {
  numeroContrat: DataTypes.STRING,
  branche: DataTypes.STRING,
  codeBranche: DataTypes.STRING,
  offreCommerciale: DataTypes.STRING,
  codeOffreCommerciale: DataTypes.STRING,
  immatriculation: DataTypes.STRING,
  statutContrat: DataTypes.STRING,
  primeAnnuelle: DataTypes.STRING,
  echeanceContractuelle: DataTypes.STRING,
  codeAgence: DataTypes.STRING,
  libelleAgence: DataTypes.STRING,
  dateExpiration: DataTypes.STRING,
  dateEffet: DataTypes.STRING,
  fractionnement: DataTypes.STRING,
  nature: DataTypes.STRING,
  indicateurSouscripteur: DataTypes.BOOLEAN,
  indicateurAssure: DataTypes.BOOLEAN,
  numeroIdentification: DataTypes.STRING, 
  id_devis: {
  type: DataTypes.INTEGER,
  allowNull: true, // Permet NULL
  }// Clé d'identification du client
}, {
  tableName: 'contrats',
  timestamps: false
});


export default Contrat;
