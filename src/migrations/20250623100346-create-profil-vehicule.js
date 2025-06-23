// src/migrations/XXXXXXXXXXXXXX-create-profil-vehicule.js

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('profil_vehicules', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroContrat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numeroImmatriculation: Sequelize.STRING,
    ChargeUtile: Sequelize.STRING,
    poidsTotalEnCharge: Sequelize.STRING,
    nombreDePlaces: Sequelize.STRING,
    datePremiereMise: Sequelize.STRING,
    typeVehicule: Sequelize.STRING,
    natureVehicule: Sequelize.STRING,
    valeurVenale: Sequelize.STRING,
    dateObtentionPermis: Sequelize.STRING,
    numeroSerie: Sequelize.STRING,
    bonusMalus: Sequelize.STRING,
    indicSouscObligatoire: Sequelize.STRING,
    marque: Sequelize.STRING,
    constructeur: Sequelize.STRING,
    puissanceFiscale: Sequelize.STRING,
    valeurCatalogue: Sequelize.STRING,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('profil_vehicules');
}
