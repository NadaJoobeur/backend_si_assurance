'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addConstraint('HistoriqueContrats', {
    fields: ['numeroContrat'],
    type: 'foreign key',
    name: 'fk_historique_contrat_numero_contrat',
    references: {
      table: 'contrats',
      field: 'numeroContrat'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeConstraint('HistoriqueContrats', 'fk_historique_contrat_numero_contrat');
}
