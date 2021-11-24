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
      } else if (valor === 0) {
        return res.status(400).json({
          error: "Você precisa inserir um valor.",
        });
      } else if (valor < 0) {
        return res.status(400).json({
          error: "Não é permitido sacar um valor negativo.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async validarDeposito(req, res, next) {
    const { idConta } = req.params;
    const { valor } = req.body;
    try {
      const conta = await database.Contas.findOne({
        where: { id: Number(idConta) },
      });

      if (conta.flagAtivo !== true) {
        return res.status(400).json({
          error: "Essa conta está bloqueada e não pode ser utilizada.",
        });
      } else if (valor === 0) {
        return res.status(400).json({
          error: "Você precisa inserir um valor.",
        });
      } else if (valor < 0) {
        return res.status(400).json({
          error: "Não é permitido depositar um valor negativo.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async validarTransferencia(req, res, next) {
    const { idContaSaida, idContaEntrada } = req.params;
    const { valor } = req.body;
    try {
      const contaSaida = await database.Contas.findOne({
        where: { id: Number(idContaSaida) },
      });
      const contaEntrada = await database.Contas.findOne({
        where: { id: Number(idContaEntrada) },
      });

      if (contaSaida.flagAtivo !== true) {
        return res.status(400).json({
          error: `A conta ${contaSaida.id} está bloqueada e não enviar uma transferencia.`,
        });
      } else if (contaEntrada.flagAtivo !== true) {
        return res.status(400).json({
          error: `A conta ${contaEntrada.id} está bloqueada e não pode receber uma transferencia.`,
        });
      } else if (valor > contaSaida.saldo) {
        return res.status(400).json({
          error: `A conta ${contaSaida.id} não tem o limite suficiente para realizar a transferencia.`,
        });
      } else if (valor === 0) {
        return res.status(400).json({
          error: "Você precisa inserir um valor.",
        });
      } else if (valor < 0) {
        return res.status(400).json({
          error: "Não é permitido transferir um valor negativo.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = TransacoesValidation;
