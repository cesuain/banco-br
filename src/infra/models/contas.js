'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contas.hasMany(models.Transacoes, {
        foreignKey: 'idConta'
      })
      Contas.belongsTo(models.Pessoas, {
        foreignKey: 'idPessoa'
      })
    }
  };
  Contas.init({
    saldo: DataTypes.DECIMAL,
    limiteSaqueDiario: DataTypes.DECIMAL,
    flagAtivo: DataTypes.BOOLEAN,
    tipoConta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contas',
  });
  return Contas;
};