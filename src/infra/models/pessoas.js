'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Contas, {
        foreignKey: 'idPessoa'
      })
    }
  };
  Pessoas.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Pessoas',
  });
  return Pessoas;
};