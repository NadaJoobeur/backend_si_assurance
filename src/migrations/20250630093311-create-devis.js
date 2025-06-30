'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('devis', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    dateCreation: { type: Sequelize.DATEONLY },
    dateEffet: { type: Sequelize.DATEONLY },
    dateExpiration: { type: Sequelize.DATEONLY },
    typeFractionnement: { type: Sequelize.STRING },
    typeRenouvellement: { type: Sequelize.STRING }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('devis');
}
