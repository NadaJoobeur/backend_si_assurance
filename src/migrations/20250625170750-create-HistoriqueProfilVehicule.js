'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('HistoriqueProfilVehicule', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    numeroContrat: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'contrats',
        key: 'numeroContrat'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  await queryInterface.dropTable('HistoriqueProfilVehicule');
}
