"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Contas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idPessoa: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Pessoas",
          key: "id",
        },
      },
      saldo: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      limiteSaqueDiario: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      flagAtivo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      tipoConta: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Contas");
  },
};
