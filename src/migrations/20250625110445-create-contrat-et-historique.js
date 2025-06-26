export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('contrats', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroContrat: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    branche: Sequelize.STRING,
    codeBranche: Sequelize.STRING,
    offreCommerciale: Sequelize.STRING,
    codeOffreCommerciale: Sequelize.STRING,
    immatriculation: Sequelize.STRING,
    statutContrat: Sequelize.STRING,
    primeAnnuelle: Sequelize.STRING,
    echeanceContractuelle: Sequelize.STRING,
    codeAgence: Sequelize.STRING,
    libelleAgence: Sequelize.STRING,
    dateExpiration: Sequelize.STRING,
    dateEffet: Sequelize.STRING,
    fractionnement: Sequelize.STRING,
    nature: Sequelize.STRING,
    indicateurSouscripteur: Sequelize.BOOLEAN,
    indicateurAssure: Sequelize.BOOLEAN,
    numeroIdentification: Sequelize.STRING,
  });

  await queryInterface.createTable('HistoriqueContrats', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroContrat: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'contrats',
        key: 'numeroContrat',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    data: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('HistoriqueContrats');
  await queryInterface.dropTable('contrats');
}
