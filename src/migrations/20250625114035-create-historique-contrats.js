'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('HistoriqueContrats', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numeroContrat: {
      type: Sequelize.STRING,
      allowNull: false
    },
    data: {
      type: Sequelize.JSONB,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('HistoriqueContrats');
}
