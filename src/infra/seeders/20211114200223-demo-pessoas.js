"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          nome: "Jéssica Vidal",
          cpf: "11111111111",
          dataNascimento: "1996-12-15",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Cesar Augusto",
          cpf: "12312312312",
          dataNascimento: "1996-04-26",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Felipe Pompeu",
          cpf: "14725836912",
          dataNascimento: "1994-09-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Marisa Fonseca",
          cpf: "36985214721",
          dataNascimento: "1987-11-07",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Isolene Gallo",
          cpf: "15935745635",
          dataNascimento: "1996-06-09",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Pessoas", null, {});
  },
};
