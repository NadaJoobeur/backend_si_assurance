'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('garanties_contrat', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      numeroContrat: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      libelleGarantie: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capitalAssure: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      franchise: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rangAffichage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      codeGarantie: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('garanties_contrat');
  }
};
