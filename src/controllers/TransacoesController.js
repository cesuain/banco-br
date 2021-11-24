const database = require("../infra/models");
const moment = require("moment");
const modernAsync = require("modern-async");
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

      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(conta.idPessoa) },
      });

      conta.idPessoa = pessoa;
      conta.saldo = novoSaldo;
      transacaoCriada.idConta = conta;

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

      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(conta.idPessoa) },
      });

      conta.idPessoa = pessoa;
      conta.saldo = novoSaldo;
      transacaoCriada.idConta = conta;

      return res.status(200).json(transacaoCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async transferir(req, res) {
    const { idContaSaida, idContaEntrada } = req.params;
    const { valor } = req.body;
    try {
      const transacaoSaidaCriada = await database.Transacoes.create({
        idConta: Number(idContaSaida),
        valor: -valor,
      });

      const transacaoEntradaCriada = await database.Transacoes.create({
        idConta: Number(idContaEntrada),
        valor: valor,
      });

      const contaSaida = await database.Contas.findOne({
        where: { id: Number(idContaSaida) },
      });

      const contaEntrada = await database.Contas.findOne({
        where: { id: Number(idContaEntrada) },
      });

      const novoSaldoSaida = Number(contaSaida.saldo) - valor;
      const novoSaldoEntrada = Number(contaEntrada.saldo) + valor;

      await database.Contas.update(
        { saldo: novoSaldoSaida },
        {
          where: {
            id: Number(idContaSaida),
          },
        }
      );

      const pessoaSaida = await database.Pessoas.findOne({
        where: { id: Number(contaSaida.idPessoa) },
      });

      const pessoaEntrada = await database.Pessoas.findOne({
        where: { id: Number(contaEntrada.idPessoa) },
      });

      contaSaida.idPessoa = pessoaSaida;
      contaEntrada.idPessoa = pessoaEntrada;
      contaSaida.saldo = novoSaldoSaida;
      contaEntrada.saldo = novoSaldoEntrada;
      transacaoSaidaCriada.idConta = contaSaida;
      transacaoEntradaCriada.idConta = contaEntrada;

      await database.Contas.update(
        { saldo: novoSaldoEntrada },
        {
          where: {
            id: Number(idContaEntrada),
          },
        }
      );

      return res.status(200).json({
        ExtratoSaida: transacaoSaidaCriada,
        ExtratoEntrada: transacaoEntradaCriada,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTodasAsTransacoes(req, res) {
    try {
      const todasAsTransacoes = await database.Transacoes.findAll({
        order: [["createdAt", "DESC"]],
      });
      await modernAsync.map(todasAsTransacoes, async (transacao) => {
        const conta = await database.Contas.findOne({
          where: { id: transacao.idConta },
        });

        const pessoa = await database.Pessoas.findOne({
          where: { id: Number(conta.idPessoa) },
        });

        transacao.idConta = conta;
        conta.idPessoa = pessoa;

        return conta;
      });
      return res.status(200).json(todasAsTransacoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTransacaoPorId(req, res) {
    const { id } = req.params;
    try {
      const transacao = await database.Transacoes.findOne({
        where: { id: Number(id) },
      });
      const conta = await database.Contas.findOne({
        where: { id: transacao.idConta },
      });

      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(conta.idPessoa) },
      });
      transacao.idConta = conta;
      conta.idPessoa = pessoa;
      return res.status(200).json(transacao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTransacoesPorConta(req, res) {
    const { idConta } = req.params;
    try {
      const conta = await database.Contas.findOne({
        where: { id: idConta },
      });

      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(conta.idPessoa) },
      });

      const transacoesPorConta = await database.Transacoes.findAll({
        where: { idConta: Number(idConta) },
      });

      conta.idPessoa = pessoa;

      return res.status(200).json({
        Conta: conta,
        Transacoes: transacoesPorConta,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTransacoesPorPeriodo(req, res) {
    const { dataInicio, dataFim } = req.body;
    try {
      const dataInicioConvertida = moment(dataInicio, "DD/MM/YYYY").format(
        "YYYY-MM-DD 00:00:00"
      );
      const dataFimConvertida = moment(dataFim, "DD/MM/YYYY").format(
        "YYYY-MM-DD 23:59:59"
      );

      const transacoes = await database.Transacoes.findAll({
        where: {
          createdAt: {
            [Op.between]: [dataInicioConvertida, dataFimConvertida],
          },
        },
      });

      await modernAsync.map(transacoes, async (transacao) => {
        const conta = await database.Contas.findOne({
          where: { id: transacao.idConta },
        });

        const pessoa = await database.Pessoas.findOne({
          where: { id: Number(conta.idPessoa) },
        });

        transacao.idConta = conta;
        conta.idPessoa = pessoa;

        return conta;
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
        "YYYY-MM-DD 00:00:00"
      );
      const dataFimConvertida = moment(dataFim, "DD/MM/YYYY").format(
        "YYYY-MM-DD 23:59:59"
      );

      const conta = await database.Contas.findOne({
        where: { id: idConta },
      });

      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(conta.idPessoa) },
      });

      const transacoesPorConta = await database.Transacoes.findAll({
        where: { idConta: Number(idConta) },
      });

      conta.idPessoa = pessoa;

      return res.status(200).json({
        Conta: conta,
        Periodo: {
          Inicio: dataInicio,
          Fim: dataFim,
        },
        Transacoes: transacoesPorConta,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TransacoesController;
