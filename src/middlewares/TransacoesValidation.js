const database = require("../infra/models");
const moment = require("moment");
const { Op } = require("sequelize");

class TransacoesValidation {
  static async validarSaque(req, res, next) {
    const { idConta } = req.params;
    const { valor } = req.body;
    try {
      const conta = await database.Contas.findOne({
        where: { id: Number(idConta) },
      });

      const todosSaquesDiarios = await database.Transacoes.findAll({
        where: {
          idConta: Number(idConta),
          valor: { [Op.lt]: 0 },
          createdAt: { [Op.gte]: moment().format("YYYY-MM-DD") },
        },
      });

      const totalValoresSaquesDarios = todosSaquesDiarios.reduce(
        (totalValorSaquesDarios, todosSaquesDiarios) =>
          totalValorSaquesDarios + Math.abs(todosSaquesDiarios.valor),
        0
      );

      if (conta.flagAtivo !== true) {
        return res.status(400).json({
          error: "Essa conta está bloqueada e não pode ser utilizada.",
        });
      } else if (totalValoresSaquesDarios + valor > conta.limiteSaqueDiario) {
        return res.status(400).json({
          error:
            "O limite de saque diario já foi atingido, favor tentar amanhã.",
        });
      } else if (valor > conta.saldo) {
        return res.status(400).json({
          error: "A conta não tem o limite suficiente para realizar o saque.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async validarDeposito(req, res, next) {
    const { idConta } = req.params;
    try {
      const conta = await database.Contas.findOne({
        where: { id: Number(idConta) },
      });

      if (conta.flagAtivo !== true) {
        return res.status(400).json({
          error: "Essa conta está bloqueada e não pode ser utilizada.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = TransacoesValidation;
