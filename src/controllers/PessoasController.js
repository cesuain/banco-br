const database = require("../infra/models");
const moment = require("moment");

class PessoasController {
  static async criarPessoa(req, res) {
    const { nome, cpf, dataNascimento } = req.body;
    try {
      const dataNascimentoConvertida = moment(
        dataNascimento,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      const pessoaCriada = await database.Pessoas.create({
        nome,
        cpf,
        dataNascimento: dataNascimentoConvertida,
      });
      return res.status(200).json(pessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async obterPessoaPorId(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(pessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarPessoa(req, res) {
    const { id } = req.params;
    const { nome, cpf, dataNascimento } = req.body;
    try {
      const dataNascimentoConvertida = moment(
        dataNascimento,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      await database.Pessoas.update(
        {
          nome,
          cpf,
          dataNascimento: dataNascimentoConvertida,
        },
        {
          where: { id: Number(id) },
        }
      );
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoasController;
