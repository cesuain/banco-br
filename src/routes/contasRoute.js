const { Router } = require("express");
const router = Router();

const ContasController = require("../controllers/ContasController");
const ContasValidation = require("../middlewares/ContasValidation");

router
  .post("/contas/", ContasController.criarConta)
  .get("/contas/", ContasController.obterTodasAsContas)
  .get("/contas/:id", ContasController.obterContaPorId)
  .put("/contas/:id", ContasController.atualizarConta)
  .get("/contas/:id/saldo", ContasController.obterSaldoPorId)
  .put(
    "/contas/:id/bloquear/",
    ContasValidation.validaBloqueioConta,
    ContasController.bloquearConta
  )
  .put(
    "/contas/:id/debloquear/",
    ContasValidation.validaDesbloqueioConta,
    ContasController.desbloquearConta
  );

module.exports = router;
