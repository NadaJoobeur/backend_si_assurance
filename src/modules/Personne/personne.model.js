import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Personne = sequelize.define('Personne', {
  //  Identifiant du propriétaire
  ownerId: {
    type: DataTypes.INTEGER, // ou STRING si UUID
    allowNull: false,
    comment: "Identifiant de l'utilisateur propriétaire de cette personne"
  },

  //  Informations de la personne
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  raisonSociale: { type: DataTypes.STRING },
  dateDeNaissance: { type: DataTypes.STRING }, // ex. "1990-04-01"
  activite: { type: DataTypes.STRING },

  //  Liste des adresses (objet JSON)
  listeAdresse: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    /*
      [
        {
          numRue: 12,
          nomRue: "Rue Ibn Khaldoun",
          contactParDefaut: true,
          codePostal: "4000",
          libelleCodePostal: "Sousse Erriadh",
          delegation: "Sousse"
        }
      ]
    */
  },

  //  Liste des téléphones
  listeTelephone: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    /*
      [
        {
          numeroTelephone: "22123456",
          typeTelephone: "mobile", // ou "fixe", "fax", etc.
          contactParDefaut: false
        }
      ]
    */
  },

  //  Liste des e-mails
  listeMails: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    /*
      [
        {
          adresseMail: "exemple@mail.com",
          contactParDefaut: true
        }
      ]
    */
  },
  blackList: { type: DataTypes.BOOLEAN, defaultValue: false }
});

export default Personne;
