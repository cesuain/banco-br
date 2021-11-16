const pessoasRoute = require("./pessoasRoute");
const contasRoute = require("./contasRoute");
const transacoesRoute = require("./transacoesRoute");

module.exports = (app) => {
  app.use(pessoasRoute, contasRoute, transacoesRoute);
};
