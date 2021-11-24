const database = require("../infra/models");
const modernAsync = require("modern-async");

class ContasController {
  static async criarConta(req, res) {
    const { idPessoa, tipoConta } = req.body;
    try {
      const configPrimeiraConta = {
        saldo: 0.0,
        limiteSaqueDiario: 500.0,
        flagAtivo: true,
      };
      const contaCriada = await database.Contas.create({
        idPessoa,
        tipoConta,
        ...configPrimeiraConta,
      });

      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(contaCriada.idPessoa) },
      });

      contaCriada.idPessoa = pessoa;
      return res.status(200).json(contaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTodasAsContas(req, res) {
    try {
      const todasAsContas = await database.Contas.findAll();
      await modernAsync.map(todasAsContas, async (conta) => {
        const pessoa = await database.Pessoas.findOne({
          where: { id: conta.idPessoa },
        });
        conta.idPessoa = pessoa;
        return conta;
      });
      return res.status(200).json(todasAsContas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterContaPorId(req, res) {
    const { id } = req.params;
    try {
      const conta = await database.Contas.findOne({
        where: { id: Number(id) },
      });
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(conta.idPessoa) },
      });

      conta.idPessoa = pessoa;

      return res.status(200).json(conta);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarConta(req, res) {
    const { id } = req.params;
    const contaParaSerAtualizada = req.body;
    try {
      await database.Contas.update(contaParaSerAtualizada, {
        where: { id: Number(id) },
      });
      const contaAtualizada = await database.Contas.findOne({
        where: { id: Number(id) },
      });

      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(contaAtualizada.idPessoa) },
      });

      contaAtualizada.idPessoa = pessoa;

      return res.status(200).json(contaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async bloquearConta(req, res) {
    const { id } = req.params;
    try {
      await database.Contas.update(
        { flagAtivo: false },
        {
          where: {
            id: Number(id),
          },
        }
      );
      return res
        .status(200)
        .json({ mensagem: `A conta número ${id} foi bloqueada.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async desbloquearConta(req, res) {
    const { id } = req.params;
    try {
      await database.Contas.update(
        { flagAtivo: true },
        {
          where: {
            id: Number(id),
          },
        }
      );
      return res
        .status(200)
        .json({ mensagem: `A conta número ${id} foi desbloqueada.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterSaldoPorId(req, res) {
    const { id } = req.params;
    try {
      const conta = await database.Contas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json({ saldo: conta.saldo });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ContasController;
