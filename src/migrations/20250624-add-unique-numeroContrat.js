'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('contrats', {
      fields: ['numeroContrat'],
      type: 'unique',
      name: 'unique_numeroContrat_constraint'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('contrats', 'unique_numeroContrat_constraint');
  }
};
