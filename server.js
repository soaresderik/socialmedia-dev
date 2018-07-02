const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoLAB conectado"))
  .catch(err => console.log("error: ", err));

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
