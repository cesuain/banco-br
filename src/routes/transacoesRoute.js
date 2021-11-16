const { Router } = require("express");
const router = Router();

const TransacoesController = require("../controllers/TransacoesController");
const TransacoesValidation = require("../middlewares/TransacoesValidation");

router
  .post(
    "/transacoes/:idConta/depositar",
    TransacoesValidation.validarDeposito,
    TransacoesController.depositar
  )
  .post(
    "/transacoes/:idConta/sacar",
    TransacoesValidation.validarSaque,
    TransacoesController.sacar
  )
  .get("/transacoes/", TransacoesController.obterTodasAsTransacoes)
  .get("/transacoes/buscar/:id", TransacoesController.obterTransacaoPorId)
  .get(
    "/transacoes/conta/:idConta/",
    TransacoesController.obterTransacoesPorConta
  )
  .get("/transacoes/periodo/", TransacoesController.obterTransacoesPorPeriodo)
  .get(
    "/transacoes/periodo/conta/:idConta",
    TransacoesController.obterTransacoesPorContaEPeriodo
  );

module.exports = router;
