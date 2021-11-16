const database = require("../infra/models");

class ContasValidation {
  static async validaBloqueioConta(req, res, next) {
    const { id } = req.params;
    try {
      const conta = await database.Contas.findOne({
        where: { id: Number(id) },
      });

      if (conta.flagAtivo === false) {
        return res.status(400).json({
          error: "Essa conta já está bloqueada.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async validaDesbloqueioConta(req, res, next) {
    const { id } = req.params;
    try {
      const conta = await database.Contas.findOne({
        where: { id: Number(id) },
      });

      if (conta.flagAtivo === true) {
        return res.status(400).json({
          error: "Essa conta já está desbloqueada.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = ContasValidation;
