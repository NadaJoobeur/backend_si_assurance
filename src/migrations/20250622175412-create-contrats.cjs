'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contrats', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      numeroContrat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      branche: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      codeBranche: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      offreCommerciale: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      codeOffreCommerciale: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      immatriculation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      statutContrat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primeAnnuelle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      echeanceContractuelle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      codeAgence: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      libelleAgence: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateExpiration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateEffet: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fractionnement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nature: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      indicateurSouscripteur: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      indicateurAssure: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      numeroIdentification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contrats');
  },
};
