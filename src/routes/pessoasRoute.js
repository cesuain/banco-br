const { Router } = require("express");
const router = Router();

const PessoasController = require("../controllers/PessoasController");
const PessoasValidation = require("../middlewares/PessoasValidation");

router
  .post(
    "/pessoas/",
    PessoasValidation.validarPessoa,
    PessoasController.criarPessoa
  )
  .get("/pessoas/", PessoasController.obterTodasAsPessoas)
  .get("/pessoas/:id", PessoasController.obterPessoaPorId)
  .put("/pessoas/:id", PessoasController.atualizarPessoa);

module.exports = router;
