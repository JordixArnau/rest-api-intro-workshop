const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");
const cors = require("cors");
const CONFIG = require("./config/config");

const { UserRouter } = require("./routes/user-routes");

const app = express();

app.use(helmet());
app.use(json());
app.use(cors({ origin: CONFIG.client.URL }));

app.use(UserRouter);

app.get("/", (req, res) => {
  res.status(200).send("Henlo default potato");
});

module.exports = app;
