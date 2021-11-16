'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transacoes.belongsTo(models.Contas, {
        foreignKey: 'idConta'
      })
    }
  };
  Transacoes.init({
    valor: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Transacoes',
  });
  return Transacoes;
};