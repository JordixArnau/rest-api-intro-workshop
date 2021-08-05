const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");

const app = express();

app.use(helmet());
app.use(json());

app.get("/", (req, res) => {
  res.status(200).send("Henlo default potato");
});

module.exports = app;
