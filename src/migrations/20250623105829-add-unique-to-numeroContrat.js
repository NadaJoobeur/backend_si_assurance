export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('contrats', 'numeroContrat', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('contrats', 'numeroContrat', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  });
}