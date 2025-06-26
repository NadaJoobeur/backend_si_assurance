// migration
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('packs', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroContrat: {
      type: Sequelize.STRING,
      allowNull: false
    },
    codePack: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('packs');
}
