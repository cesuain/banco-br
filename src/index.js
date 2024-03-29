const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(process.env.PORT, () => console.log("API ON!"));

module.exports = app;
