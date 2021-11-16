const database = require("../infra/models");
const moment = require("moment");
const { Op } = require("sequelize");

class TransacoesController {
  static async depositar(req, res) {
    const { idConta } = req.params;
    const { valor } = req.body;
    try {
      const transacaoCriada = await database.Transacoes.create({
        idConta: Number(idConta),
        valor: Number(valor),
      });
      const conta = await database.Contas.findOne({
        where: { id: Number(idConta) },
      });
      const novoSaldo = Number(conta.saldo) + Number(valor);

      await database.Contas.update(
        { saldo: novoSaldo },
        {
          where: {
            id: Number(idConta),
          },
        }
      );

      return res.status(200).json(transacaoCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async sacar(req, res) {
    const { idConta } = req.params;
    const { valor } = req.body;
    try {
      const transacaoCriada = await database.Transacoes.create({
        idConta: Number(idConta),
        valor: -valor,
      });
      const conta = await database.Contas.findOne({
        where: { id: Number(idConta) },
      });
      const novoSaldo = conta.saldo - valor;

      await database.Contas.update(
        { saldo: novoSaldo },
        {
          where: {
            id: Number(idConta),
          },
        }
      );

      return res.status(200).json(transacaoCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTodasAsTransacoes(req, res) {
    try {
      const todasAsTransacoes = await database.Transacoes.findAll({
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(todasAsTransacoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTransacaoPorId(req, res) {
    const { id } = req.params;
    try {
      const transacoes = await database.Transacoes.findAll({
        where: { id: Number(id) },
      });
      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTransacoesPorConta(req, res) {
    const { idConta } = req.params;
    try {
      const transacoes = await database.Transacoes.findAll({
        where: { idConta: Number(idConta) },
      });
      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTransacoesPorPeriodo(req, res) {
    const { dataInicio, dataFim } = req.body;
    console.log("oi");
    try {
      const dataInicioConvertida = moment(dataInicio, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      const dataFimConvertida = moment(dataFim, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      const transacoes = await database.Transacoes.findAll({
        where: {
          createdAt: {
            [Op.between]: [dataInicioConvertida, dataFimConvertida],
          },
        },
      });
      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTransacoesPorContaEPeriodo(req, res) {
    const { idConta } = req.params;
    const { dataInicio, dataFim } = req.body;
    try {
      const dataInicioConvertida = moment(dataInicio, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      const dataFimConvertida = moment(dataFim, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      const transacoes = await database.Transacoes.findAll({
        where: {
          createdAt: {
            [Op.between]: [dataInicioConvertida, dataFimConvertida],
          },
          idConta: Number(idConta),
        },
      });
      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TransacoesController;
