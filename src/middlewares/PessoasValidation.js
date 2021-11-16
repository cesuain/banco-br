const database = require("../infra/models");

class PessoasValidation {
  static async validarPessoa(req, res, next) {
    const { nome, cpf } = req.body;

    try {
      const pessoa = await database.Pessoas.findOne({
        where: { cpf: cpf },
      });

      if (nome.length < 5) {
        return res.status(400).json({
          erro: "Favor inserir o nome completo.",
        });
      } else if (cpf.length !== 11) {
        return res.status(400).json({
          erro: "Favor inserir somente 11 digitos.",
        });
      } else if (pessoa) {
        return res.status(400).json({
          erro: "Já possui um usuário cadastrado com esse CPF.",
        });
      }
      next();
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = PessoasValidation;
