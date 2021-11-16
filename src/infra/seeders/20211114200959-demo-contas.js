"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Contas",
      [
        {
          idPessoa: 1,
          saldo: 300.0,
          limiteSaqueDiario: 500.0,
          flagAtivo: true,
          tipoConta: 1,
          createdAt: "2015-03-10",
          updatedAt: "2015-03-10",
        },
        {
          idPessoa: 2,
          saldo: 3000.0,
          limiteSaqueDiario: 500.0,
          flagAtivo: true,
          tipoConta: 1,
          createdAt: "2015-05-10",
          updatedAt: "2015-05-10",
        },
        {
          idPessoa: 3,
          saldo: 2500.0,
          limiteSaqueDiario: 500.0,
          flagAtivo: true,
          tipoConta: 1,
          createdAt: "2017-10-10",
          updatedAt: "2017-10-10",
        },
        {
          idPessoa: 4,
          saldo: 3500.0,
          limiteSaqueDiario: 500.0,
          flagAtivo: true,
          tipoConta: 2,
          createdAt: "2021-09-10",
          updatedAt: "2021-09-10",
        },
        {
          idPessoa: 5,
          saldo: 15000.0,
          limiteSaqueDiario: 500.0,
          flagAtivo: true,
          tipoConta: 2,
          createdAt: "2021-08-10",
          updatedAt: "2021-08-10",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Contas", null, {});
  },
};
