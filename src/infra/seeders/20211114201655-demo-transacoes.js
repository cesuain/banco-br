"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Transacoes",
      [
        {
          idConta: 1,
          valor: 500.0,
          createdAt: "2015-04-10",
          updatedAt: "2015-04-10",
        },
        {
          idConta: 1,
          valor: -100.0,
          createdAt: "2015-05-10",
          updatedAt: "2015-05-10",
        },
        {
          idConta: 1,
          valor: -100.0,
          createdAt: "2016-12-10",
          updatedAt: "2016-12-10",
        },
        {
          idConta: 2,
          valor: 1000.0,
          createdAt: "2016-03-30",
          updatedAt: "2016-03-30",
        },
        {
          idConta: 2,
          valor: 2500.0,
          createdAt: "2016-10-10",
          updatedAt: "2016-10-10",
        },
        {
          idConta: 2,
          valor: -500.0,
          createdAt: "2016-12-10",
          updatedAt: "2016-12-10",
        },
        {
          idConta: 3,
          valor: 2500.0,
          createdAt: "2017-12-10",
          updatedAt: "2017-12-10",
        },
        {
          idConta: 4,
          valor: 4000.0,
          createdAt: "2021-09-11",
          updatedAt: "2021-09-11",
        },
        {
          idConta: 4,
          valor: -250.0,
          createdAt: "2021-09-15",
          updatedAt: "2021-09-15",
        },
        {
          idConta: 4,
          valor: -250.0,
          createdAt: "2021-10-10",
          updatedAt: "2021-10-10",
        },
        {
          idConta: 5,
          valor: 16500.0,
          createdAt: "2021-08-12",
          updatedAt: "2021-08-12",
        },
        {
          idConta: 5,
          valor: -500.0,
          createdAt: "2021-08-20",
          updatedAt: "2021-08-20",
        },
        {
          idConta: 5,
          valor: -500.0,
          createdAt: "2021-09-05",
          updatedAt: "2021-09-05",
        },
        {
          idConta: 5,
          valor: -500.0,
          createdAt: "2021-09-10",
          updatedAt: "2021-09-10",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Transacoes", null, {});
  },
};
